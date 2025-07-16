import React from 'react'
import { Moon, Sun, LogOut, Settings } from 'lucide-react'
import { useThemeStore } from '../../store/theme'
import { useAuthStore } from '../../store/auth'
import { Button } from '../ui/Button'
import { toast } from 'sonner'

export function Header() {
  const { isDark, toggle } = useThemeStore()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      
      
      localStorage.removeItem('chat-storage')
      
      logout()
      toast.success('Logged out successfully')
    }
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">G</span>
          </div>
          <h1 className="text-xl font-semibold">Gemini Chat</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span>{user?.countryCode} {user?.phoneNumber}</span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggle}>
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}