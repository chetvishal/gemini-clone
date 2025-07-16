import React, { useMemo } from 'react'
import { MessageCircle, Plus, Search, Trash2 } from 'lucide-react'
import { useChatStore } from '../../store/chat'
import { useDebounce } from '../../hooks/useDebounce'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { ChatroomSkeleton } from '../ui/LoadingSkeleton'
import { formatTime, formatDate } from '../../lib/utils'
import { toast } from 'sonner'

interface ChatroomListProps {
  onNewChat: () => void
}

export function ChatroomList({ onNewChat }: ChatroomListProps) {
  const {
    chatrooms,
    currentChatroom,
    searchQuery,
    setCurrentChatroom,
    deleteChatroom,
    setSearchQuery,
  } = useChatStore()

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const filteredChatrooms = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return chatrooms
    
    return chatrooms.filter((room) =>
      room.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  }, [chatrooms, debouncedSearchQuery])

  const handleDeleteChatroom = (e: React.MouseEvent, chatroomId: string) => {
    e.stopPropagation()
    
    if (window.confirm('Are you sure you want to delete this chatroom?')) {
      deleteChatroom(chatroomId)
      toast.success('Chatroom deleted')
    }
  }

  const isLoading = false

  return (
    <div className="flex h-full flex-col border-r bg-muted/20">

      <div className="border-b p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Button onClick={onNewChat} size="sm" className="h-8 w-8" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>


      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <ChatroomSkeleton key={i} />
            ))}
          </div>
        ) : filteredChatrooms.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">
              {searchQuery ? 'No chats found' : 'No chats yet'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Start a new conversation to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={onNewChat} className="mt-4" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredChatrooms.map((chatroom) => (
              <div
                key={chatroom.id}
                onClick={() => setCurrentChatroom(chatroom.id)}
                className={`group relative flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent ${
                  currentChatroom === chatroom.id ? 'bg-accent' : ''
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate font-medium">{chatroom.title}</h3>
                    {chatroom.lastMessageTime && (
                      <span className="text-xs text-muted-foreground">
                        {formatTime(chatroom.lastMessageTime)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm text-muted-foreground">
                      {chatroom.lastMessage || 'No messages yet'}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(chatroom.createdAt)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => handleDeleteChatroom(e, chatroom.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}