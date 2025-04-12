import { ChatMessageForm } from '@/components/chat-message-form'
import { ChatMessagesBox } from '@/components/chat-messages-box'
import { useChatMessages } from '@/hooks/use-chat-messages'

export const Chat = () => {
  const { messages } = useChatMessages()
  return (
    <div className="w-full max-w-[550px] rounded-md bg-slate-900/80 px-4 py-3">
      <ChatMessagesBox messages={messages} />
      <ChatMessageForm />
    </div>
  )
}
