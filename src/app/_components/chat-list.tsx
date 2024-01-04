'use client'
import React, { useMemo } from 'react'
import { ChatCard } from './chat-card'
import { Chat } from '@/types'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'
export function ChatList({ chats }: { chats: Chat[] }) {
  const sortableItems = useMemo(() => {
    return chats.map((c) => c.id)
  }, [chats])
  return (
    <div
      className={cn('space-y-5 shrink-0', {
        'border-l border-l-black pl-4 py-4': chats?.[0]?.parentId
      })}
    >
      <SortableContext
        items={sortableItems}
        strategy={verticalListSortingStrategy}
      >
        {chats.map((chat) => (
          <ChatCard chat={chat} key={chat.id} />
        ))}
      </SortableContext>
    </div>
  )
}
