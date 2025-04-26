import { Badge, type ChatMessage } from '@/types'
import { generateFakeChatMessage } from '@/utils/helpes'
import { useState } from 'react'

const welcomeMessage: ChatMessage = {
  id: 'welcome-message',
  author: {
    id: 'chat-bot',
    rgbColor: 'darkorchid',
    badges: [Badge.moderator],
    username: 'ChatBot',
  },
  content: 'Welcome to the chat! Feel free to ask anything.',
}

const fakeMessages: ChatMessage[] = Array.from({ length: 10 }, () =>
  generateFakeChatMessage()
)

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    welcomeMessage,
    ...fakeMessages,
  ])

  return {
    messages,
    setMessages,
  }
}
