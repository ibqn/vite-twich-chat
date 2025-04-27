import { ChatMessageForm } from '@/components/chat-message-form'
import { ChatMessagesBox } from '@/components/chat-messages-box'
import { useChatMessages } from '@/hooks/use-chat-messages'
import { socket } from '@/socket'
import { useEffect } from 'react'

export const Chat = () => {
  const { messages } = useChatMessages()

  useEffect(() => {
    socket.auth = {
      username: 'user',
    }
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="w-full max-w-[550px] rounded-md bg-slate-900/80 px-4 py-3">
      <ChatMessagesBox messages={messages} />
      <ChatMessageForm />
    </div>
  )
}
