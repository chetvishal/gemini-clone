export interface User {
  id: string
  phoneNumber: string
  countryCode: string
  createdAt: Date
}

export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  image?: string
}

export interface Chatroom {
  id: string
  title: string
  lastMessage?: string
  lastMessageTime?: Date
  messages: Message[]
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export interface ChatState {
  chatrooms: Chatroom[]
  currentChatroom: string | null
  isTyping: boolean
  searchQuery: string
  addChatroom: (title: string) => void
  deleteChatroom: (id: string) => void
  setCurrentChatroom: (id: string | null) => void
  addMessage: (chatroomId: string, message: Omit<Message, 'id'>) => void
  setTyping: (typing: boolean) => void
  setSearchQuery: (query: string) => void
  getChatroom: (id: string) => Chatroom | undefined
  getFilteredChatrooms: () => Chatroom[]
  reset?: () => void
}

export interface ThemeState {
  isDark: boolean
  toggle: () => void
}