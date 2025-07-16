import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

export function formatDate(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date)
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export const AI_RESPONSES = [
  "I understand your question. Let me help you with that.",
  "That's an interesting point. Here's what I think about it...",
  "Based on the information you've provided, I can suggest the following approach:",
  "Great question! Let me break this down for you step by step.",
  "I see what you're asking. Here's a detailed explanation:",
  "That's a complex topic. Let me provide you with a comprehensive answer.",
  "Thanks for sharing that. Here's my perspective on the matter:",
  "I'd be happy to help you understand this better. Let me explain:",
  "That's a good observation. Here's some additional context:",
  "Excellent question! This is something many people wonder about."
]

export function getRandomAIResponse(): string {
  return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
}