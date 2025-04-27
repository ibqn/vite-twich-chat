import type { ChatMessage as ChatMessageType } from '@/types'
import { ChatMessage } from './chat-message'

type Props = {
  messages: ChatMessageType[]
}

export const ChatMessagesBox = ({ messages }: Props) => {
  const MessageList = messages.map((message) => (
    <ChatMessage key={message.id} message={message} className="mb-1" />
  ))

  return (
    <div className="flex h-[70vh] overflow-auto">
      <div className="flex flex-col gap-1 p-2">{MessageList}</div>
    </div>
  )
}
