import { useCallback } from 'react'
import { useChatStore } from '../store/chat'
import { getRandomAIResponse, sleep } from '../lib/utils'
import { toast } from 'sonner'

const AI_RESPONSE_DELAY = 2000 
const AI_TYPING_DELAY = 1500 

export function useAIResponse() {
  const { addMessage, setTyping } = useChatStore()

  const generateAIResponse = useCallback(async (chatroomId: string, userMessage: string) => {
    try {
      setTyping(true)
      
      await sleep(AI_TYPING_DELAY)
      
      setTyping(false)
      
      const aiResponse = getRandomAIResponse()
      addMessage(chatroomId, {
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      })
      
      if (Math.random() > 0.7) {
        await sleep(1000)
        setTyping(true)
        await sleep(AI_TYPING_DELAY)
        setTyping(false)
        
        addMessage(chatroomId, {
          content: "Is there anything specific you'd like me to elaborate on or any follow-up questions you have?",
          isUser: false,
          timestamp: new Date(),
        })
      }
    } catch (error) {
      setTyping(false)
      toast.error('Failed to get AI response')
    }
  }, [addMessage, setTyping])

  return { generateAIResponse }
}