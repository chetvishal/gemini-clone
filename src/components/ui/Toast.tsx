import React from 'react'
import { Toaster } from 'sonner'
import { useThemeStore } from '../../store/theme'

export function ToastProvider() {
  const { isDark } = useThemeStore()
  
  return (
    <Toaster
      theme={isDark ? 'dark' : 'light'}
      position="top-right"
      richColors
      closeButton
    />
  )
}