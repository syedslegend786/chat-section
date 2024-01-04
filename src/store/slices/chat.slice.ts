import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define a type for the slice state
import { Chat } from '@/types'
import { chatInitialData } from '../../data'
import { arrayMove } from '@dnd-kit/sortable'
export const CURRENT_USERNAME = 'salleh'
interface ChatState {
  chats: Chat[]
}

// Define the initial state using that type
const initialState: ChatState = {
  chats: chatInitialData
}

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    handleDragEndAction(
      state,
      {
        payload: { parentId, activeId, overId }
      }: PayloadAction<{
        overId: string
        activeId: string
        parentId?: string
      }>
    ) {
      const overChat = state.chats.findIndex((c) => c.id === overId)
      const activeChat = state.chats.findIndex((c) => c.id === activeId)
      // if(overChat && activeChat){
      state.chats = arrayMove(state.chats, overChat, activeChat)
      // }
    },
    addChatAction(state, paylaod: PayloadAction<Chat>) {
      state.chats = [...state.chats, paylaod.payload]
    },
    likeChatAction(
      state,
      {
        payload: { chatId, userId }
      }: PayloadAction<{
        chatId: string
        userId: string
      }>
    ) {
      const findIndex = state.chats.findIndex((c) => c.id === chatId)
      const chat = state.chats[findIndex]
      const alreadyLiked = chat?.likes.find((c) => c === userId)
      if (chat && !alreadyLiked) {
        chat.likes = [...chat.likes, userId]
        chat.dislikes = chat.dislikes.filter((c) => c !== userId)
      }
    },
    disLikeChatAction(
      state,
      {
        payload: { chatId, userId }
      }: PayloadAction<{
        chatId: string
        userId: string
      }>
    ) {
      const chat = state.chats.find((c) => c.id === chatId)
      const alreadyDisliked = chat?.dislikes.find((c) => c === userId)
      if (chat && !alreadyDisliked) {
        chat.likes = chat.likes.filter((c) => c !== userId)
      }
    },
    deleteChatAction(
      state,
      data: PayloadAction<{
        chatId: string
      }>
    ) {
      state.chats = state.chats.filter((c) => c.id !== data.payload.chatId)
    },
    editChatAction(
      state,
      {
        payload: { chatId, text }
      }: PayloadAction<{
        chatId: string
        text: string
      }>
    ) {
      state.chats = state.chats.map((c) =>
        c.id === chatId ? { ...c, text } : c
      )
    }
  }
})

export const {
  handleDragEndAction,
  addChatAction,
  likeChatAction,
  disLikeChatAction,
  deleteChatAction,
  editChatAction
} = chatSlice.actions

export default chatSlice.reducer
