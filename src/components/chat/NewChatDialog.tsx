import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, MessageCircle } from 'lucide-react'
import { useChatStore } from '../../store/chat'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { toast } from 'sonner'

const chatSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title must be 50 characters or less')
    .trim(),
})

type ChatFormData = z.infer<typeof chatSchema>

interface NewChatDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function NewChatDialog({ isOpen, onClose }: NewChatDialogProps) {
  const { addChatroom, setCurrentChatroom } = useChatStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
  })

  const handleCreateChat = (data: ChatFormData) => {
    addChatroom(data.title)
    
    const chatrooms = useChatStore.getState().chatrooms
    const newChatroom = chatrooms[0] // Latest chatroom is first
    setCurrentChatroom(newChatroom.id)
    
    toast.success(`Chat "${data.title}" created`)
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">New Chat</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleCreateChat)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Chat Title</label>
            <Input
              {...register('title')}
              placeholder="e.g., Work Discussion, Personal Chat"
              className={errors.title ? 'border-destructive' : ''}
              autoFocus
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Chat
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}