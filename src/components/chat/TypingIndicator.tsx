import React from 'react'
import { Bot } from 'lucide-react'

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
        <Bot className="h-4 w-4" />
      </div>
      
      <div className="flex max-w-[80%] items-center">
        <div className="rounded-2xl bg-muted px-4 py-2">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
            </div>
            <span className="ml-2 text-sm text-muted-foreground">AI is typing...</span>
          </div>
        </div>
      </div>
    </div>
  )
}