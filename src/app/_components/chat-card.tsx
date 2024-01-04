'use client'
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import { Chat } from '@/types'
import { Minus, Plus, Reply } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import { ChatList } from './chat-list'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { AddChatForm } from './add-chat-form'

import {
  CURRENT_USERNAME,
  deleteChatAction,
  disLikeChatAction,
  likeChatAction
} from '@/src/store/slices/chat.slice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ChatCardProps {
  chat: Chat
  isOverLay?: boolean
}
export function ChatCard({ chat }: ChatCardProps) {
  const dispatch = useAppDispatch()
  const [isReplying, setisReplying] = useState(false)
  const [isEditing, setisEditing] = useState(false)
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: chat.id,
    data: {
      type: 'chat',
      chat
    }
  })
  const style = useMemo(
    () => ({
      transition,
      transform: CSS.Transform.toString(transform)
    }),
    [transform, transition]
  )
  const { chats } = useAppSelector((s) => s.chats)
  const childChat = useMemo(() => {
    return chats.filter((c) => c.parentId === chat.id)
  }, [chats])
  const replying = useMemo(() => isReplying, [isReplying])
  const toggleReplying = useCallback(() => {
    setisReplying((prev) => !prev)
  }, [])
  const toggleEditing = useCallback(() => {
    setisEditing((prev) => !prev)
  }, [])
  const renderRepliedTo = useCallback(() => {
    if (!chat.parentId) {
      return
    }
    const parent = chats.find((c) => c.id === chat.parentId)
    if (!parent) {
      return null
    }
    return (
      <span className="font-bold text-blue-900 mr-3">@{parent?.username}</span>
    )
  }, [chats, chat])

  return (
    <div
      className={cn('ring-black space-y-3', {
        'opacity-50 ': isDragging
      })}
      style={style}
      ref={setNodeRef}
    >
      <div
        className={cn('p-3 border rounded-md  bg-white', {
          'border-none': chat.parentId
        })}
      >
        <div className="flex gap-5">
          <div className="bg-[#F9FAFB] rounded-xl p-2 border flex flex-col">
            <Plus
              className="cursor-pointer h-5 w-5 text-gray-500 shrink-0"
              onClick={() => {
                dispatch(
                  likeChatAction({
                    chatId: chat.id,
                    userId: 'salleh'
                  })
                )
              }}
            />
            <p className="text-center select-none">
              {chat.likes.length - chat.dislikes.length}
            </p>
            <Minus
              className="cursor-pointer h-5 w-5 text-gray-500 shrink-0"
              onClick={() => {
                dispatch(
                  disLikeChatAction({
                    chatId: chat.id,
                    userId: 'salleh'
                  })
                )
              }}
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={chat.profileImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-bold text-base">{chat.username}</h1>
                <p className="text-base text-gray-800">1 month ago</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="hover:bg-gray-200 w-10 h-10 rounded-md flex items-center justify-center">
                  <svg
                    className="cursor-grab fill-gray-500"
                    viewBox="0 0 20 20"
                    width="12"
                    {...attributes}
                    {...listeners}
                  >
                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                  </svg>
                </button>
                {chat.username === CURRENT_USERNAME ? (
                  <>
                    <button
                      onClick={toggleEditing}
                      className="text-blue-900 font-medium text-base bg-none hover:bg-none flex items-center hover:opacity-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          deleteChatAction({
                            chatId: chat.id
                          })
                        )
                      }}
                      className="text-red-900 font-medium text-base bg-none hover:bg-none flex items-center hover:opacity-50 transition"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={toggleReplying}
                    className="text-blue-900 font-medium text-base bg-none hover:bg-none flex items-center hover:opacity-50 transition"
                  >
                    <Reply className="cursor-pointer h-4 w-4 shrink-0 mr-2" />
                    Reply
                  </button>
                )}
              </div>
            </div>
            <p className="text-base text-black">
              {' '}
              {chat.parentId ? renderRepliedTo() : null}
              {chat.text}
            </p>
          </div>
        </div>
      </div>
      {childChat.length > 0 ? (
        <div className={cn('pl-10')}>
          <ChatList chats={childChat} />
        </div>
      ) : null}
      {replying || isEditing ? (
        <AddChatForm
          isRootForm={false}
          toggleReplying={toggleReplying}
          parentId={chat.parentId ?? chat.id}
          chatId={chat.id}
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          intialText={chat.text}
        />
      ) : null}
    </div>
  )
}
