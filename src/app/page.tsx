'use client'
import React, { useCallback, useMemo, useState } from 'react'
import { ChatList } from './_components/chat-list'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter
} from '@dnd-kit/core'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { AddChatForm } from './_components/add-chat-form'
import { createPortal } from 'react-dom'
import { ChatCard } from './_components/chat-card'
import { handleDragEndAction } from '../store/slices/chat.slice'
import { Chat } from '@/types'

const Home = () => {
  const dispatch = useAppDispatch()
  const [currentDraggingChat, setcurrentDraggingChat] = useState<Chat | null>(
    null
  )
  const { chats } = useAppSelector((s) => s.chats)
  const parentChats = useMemo(() => {
    return chats.filter((c) => !c.parentId)
  }, [chats])
  const onDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.chat) {
      const currentChat = event.active.data.current?.chat
      setcurrentDraggingChat(currentChat)
    }
  }, [])
  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const isChild = !!event.active.data.current?.chat?.parentId
      const activeId = event.active.data.current?.chat?.id
      const overId = event.over?.data.current?.chat?.id
      const activeParent = event.active.data.current?.chat?.parentId
      const overParent = event.over?.data.current?.chat?.parentId
      if (overId && activeId && !isChild) {
        dispatch(
          handleDragEndAction({
            overId,
            activeId
          })
        )
      } else if (overId && activeId && activeParent === overParent && isChild) {
        dispatch(
          handleDragEndAction({
            overId,
            activeId
          })
        )
      }
    },
    [dispatch]
  )

  return (
    <div className="max-w-5xl mx-auto my-20 ">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <ChatList chats={parentChats} />
        {createPortal(
          <DragOverlay>
            {currentDraggingChat ? (
              <ChatCard isOverLay chat={currentDraggingChat} />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <AddChatForm />
    </div>
  )
}

export default Home
