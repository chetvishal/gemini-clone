import React from 'react'
import { cn } from '../../lib/utils'

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} />
  )
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-3 p-4">
      <LoadingSkeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton className="h-4 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export function ChatroomSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <LoadingSkeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton className="h-4 w-3/4" />
        <LoadingSkeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}