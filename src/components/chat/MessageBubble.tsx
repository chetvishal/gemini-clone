import React, { useState } from 'react'
import { Copy, Check, Bot, User } from 'lucide-react'
import { Message } from '../../types'
import { formatTime, copyToClipboard } from '../../lib/utils'
import { Button } from '../ui/Button'
import { toast } from 'sonner'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await copyToClipboard(message.content)
      setCopied(true)
      toast.success('Message copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy message')
    }
  }

  return (
    <div className={`group flex gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}>

      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
        message.isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted'
      }`}>
        {message.isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>


      <div className={`flex max-w-[80%] flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
        <div className={`relative rounded-2xl px-4 py-2 ${
          message.isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        }`}>
      
          {message.image && (
            <div className="mb-2">
              <img
                src={message.image}
                alt="Uploaded image"
                className="max-h-60 max-w-full rounded-lg object-cover"
              />
            </div>
          )}
          
       
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>

      
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className={`absolute -right-10 top-1/2 h-6 w-6 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 ${
              message.isUser 
                ? 'text-primary-foreground hover:bg-primary-foreground/20' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>

      
        <span className="mt-1 text-xs text-muted-foreground">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}