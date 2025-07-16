import React, { useState } from 'react'
import { Header } from './Header'
import { ChatroomList } from '../chat/ChatroomList'
import { ChatWindow } from '../chat/ChatWindow'
import { NewChatDialog } from '../chat/NewChatDialog'
import { useChatStore } from '../../store/chat'

export function Layout() {
  const [showNewChatDialog, setShowNewChatDialog] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const { currentChatroom } = useChatStore()

  const isMobile = window.innerWidth < 768
  const shouldShowSidebar = isMobile ? showSidebar && !currentChatroom : true
  const shouldShowChat = isMobile ? !showSidebar || currentChatroom : true

  return (
    <div className="flex h-screen flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
       
        {shouldShowSidebar && (
          <div className="w-full md:w-80">
            <ChatroomList
              onNewChat={() => setShowNewChatDialog(true)}
            />
          </div>
        )}

       
        {shouldShowChat && (
          <div className="flex-1">
            <ChatWindow
              onBackToList={() => {
                setShowSidebar(true)
                if (isMobile) {
                  useChatStore.getState().setCurrentChatroom(null)
                }
              }}
            />
          </div>
        )}
      </div>

      
      <NewChatDialog
        isOpen={showNewChatDialog}
        onClose={() => setShowNewChatDialog(false)}
      />
    </div>
  )
}