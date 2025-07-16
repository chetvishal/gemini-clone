import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChatState, Chatroom, Message } from '../types'
import { generateId } from '../lib/utils'

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      currentChatroom: null,
      isTyping: false,
      searchQuery: '',
      
      addChatroom: (title: string) => {
        const newChatroom: Chatroom = {
          id: generateId(),
          title,
          messages: [],
          createdAt: new Date(),
        }
        set((state) => ({
          chatrooms: [newChatroom, ...state.chatrooms]
        }))
      },
      
      deleteChatroom: (id: string) => {
        set((state) => ({
          chatrooms: state.chatrooms.filter((room) => room.id !== id),
          currentChatroom: state.currentChatroom === id ? null : state.currentChatroom
        }))
      },
      
      setCurrentChatroom: (id: string | null) => {
        set({ currentChatroom: id })
      },
      
      addMessage: (chatroomId: string, message: Omit<Message, 'id'>) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
        }
        
        set((state) => ({
          chatrooms: state.chatrooms.map((room) =>
            room.id === chatroomId
              ? {
                  ...room,
                  messages: [...room.messages, newMessage],
                  lastMessage: newMessage.content,
                  lastMessageTime: newMessage.timestamp,
                }
              : room
          )
        }))
      },
      
      setTyping: (typing: boolean) => {
        set({ isTyping: typing })
      },
      
      setSearchQuery: (query: string) => {
        set({ searchQuery: query })
      },
      
      getChatroom: (id: string) => {
        return get().chatrooms.find((room) => room.id === id)
      },
      
      getFilteredChatrooms: () => {
        const { chatrooms, searchQuery } = get()
        if (!searchQuery.trim()) return chatrooms
        
        return chatrooms.filter((room) =>
          room.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      },

      reset: () => {
        set({
          chatrooms: [],
          currentChatroom: null,
          isTyping: false,
          searchQuery: '',
        })
      },
    }),
    {
      name: 'chat-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.chatrooms) {
          state.chatrooms = state.chatrooms.map(room => ({
            ...room,
            createdAt: new Date(room.createdAt),
            lastMessageTime: room.lastMessageTime ? new Date(room.lastMessageTime) : undefined,
            messages: room.messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          }))
        }
      },
    }
  )
)