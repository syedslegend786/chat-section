'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import { addChatAction, editChatAction } from '@/src/store/slices/chat.slice'
import { Chat } from '@/types'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
interface AddChatFormProps {
  parentId?: string
  toggleReplying?: () => void
  isRootForm?: boolean
  isEditing?: boolean
  chatId?: string
  toggleEditing?: () => void
  intialText?: string
}
export function AddChatForm({
  parentId = '',
  toggleReplying = () => {},
  isRootForm = true,
  isEditing = false,
  chatId,
  toggleEditing = () => {},
  intialText = ''
}: AddChatFormProps) {
  const authState = useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()
  const [text, settext] = useState(() => {
    return isEditing ? intialText : ''
  })
  function createChat() {
    if (!text) {
      return alert('kindly enter the text.')
    }
    let newChat: Chat = {
      id: uuid(),
      text,
      username: authState.user.username,
      likes: [],
      dislikes: [],
      profileImage: authState.user.profileImage
    }
    if (parentId) {
      newChat.parentId = parentId
    }
    dispatch(addChatAction(newChat))
    if (parentId && toggleReplying) {
      toggleReplying()
    }
  }
  function updateChat() {
    if (!chatId) {
      return
    }
    dispatch(
      editChatAction({
        chatId,
        text
      })
    )
    toggleEditing()
  }
  function handleCancel() {
    if (isEditing) {
      toggleEditing()
    } else {
      toggleReplying()
    }
  }
  return (
    <div className="border border-black rounded-md mt-5 p-5 bg-white">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (isEditing && chatId) {
            updateChat()
          } else {
            createChat()
          }
          settext('')
        }}
      >
        <Textarea
          className="bg-[#F9FAFB]"
          placeholder="Write your thoughts here..."
          value={text}
          onChange={(e) => {
            settext(e.target.value)
          }}
          required
          rows={6}
        />
        <div className="flex items-center justify-between mt-3">
          <Avatar>
            <AvatarImage src={authState.user.profileImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            {!isRootForm && (
              <Button
                type="button"
                onClick={handleCancel}
                className="bg-blue-700 text-white hover:bg-blue-700 hover:opacity-50"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              className="bg-blue-700 text-white hover:bg-blue-700 hover:opacity-50"
            >
              {isEditing ? 'Update' : 'Comment'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
