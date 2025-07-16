import React, { useEffect, useRef } from 'react'
import { ArrowLeft, MoreVertical } from 'lucide-react'
import { useChatStore } from '../../store/chat'
import { useAIResponse } from '../../hooks/useAIResponse'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import { MessageInput } from './MessageInput'
import { Button } from '../ui/Button'

interface ChatWindowProps {
  onBackToList: () => void
}

export function ChatWindow({ onBackToList }: ChatWindowProps) {
  const {
    currentChatroom,
    getChatroom,
    addMessage,
    isTyping,
  } = useChatStore()
  
  const { generateAIResponse } = useAIResponse()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const chatroom = currentChatroom ? getChatroom(currentChatroom) : null

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatroom?.messages, isTyping])

  const handleSendMessage = async (content: string, image?: string) => {
    if (!currentChatroom) return

    addMessage(currentChatroom, {
      content,
      isUser: true,
      timestamp: new Date(),
      image,
    })

    await generateAIResponse(currentChatroom, content)
  }

  if (!chatroom) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-muted-foreground">
            Select a chat to start messaging
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">

      <div className="flex items-center gap-3 border-b p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackToList}
          className="md:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex-1">
          <h2 className="font-semibold">{chatroom.title}</h2>
          <p className="text-sm text-muted-foreground">
            {isTyping ? 'AI is typing...' : 'Online'}
          </p>
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>


      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="space-y-6">
          {chatroom.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">
                  Start a conversation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Send a message to begin chatting with AI
                </p>
              </div>
            </div>
          ) : (
            <>
              {chatroom.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              

              {isTyping && <TypingIndicator />}
            </>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>


      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  )
}