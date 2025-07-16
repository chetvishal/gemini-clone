import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, User } from '../types'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => {
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
        localStorage.removeItem('chat-storage')
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state && !state.user) {
          state.isAuthenticated = false
        }
      },
    }
  )
)