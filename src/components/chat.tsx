import { ChatMessageForm } from '@/components/chat-message-form'
import { ChatMessagesBox } from '@/components/chat-messages-box'

export const Chat = () => {
  return (
    <div className="mx-w-[550px] bg-slate-900/80kk w-full rounded-md px-4 py-3">
      <ChatMessagesBox />
      <ChatMessageForm />
    </div>
  )
}
