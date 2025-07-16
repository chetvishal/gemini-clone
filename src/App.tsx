import React, { useEffect } from 'react'
import { useAuthStore } from './store/auth'
import { useThemeStore } from './store/theme'
import { useChatStore } from './store/chat'
import { LoginForm } from './components/auth/LoginForm'
import { Layout } from './components/layout/Layout'
import { ToastProvider } from './components/ui/Toast'

function App() {
  const { isAuthenticated } = useAuthStore()
  const { isDark } = useThemeStore()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    if (!isAuthenticated) {
      const resetChat = useChatStore.getState().reset
      if (resetChat) {
        resetChat()
      }
    }
  }, [isAuthenticated])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isAuthenticated ? (
        <Layout />
      ) : (
        <div className="flex min-h-screen items-center justify-center p-4">
          <LoginForm />
        </div>
      )}
      <ToastProvider />
    </div>
  )
}

export default App