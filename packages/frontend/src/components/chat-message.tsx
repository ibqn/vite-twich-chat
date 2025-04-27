import type { ChatMessage as ChatMessageType } from '@/types'
import { cn } from '@/utils/class-names'
import type { ComponentProps } from 'react'

type Props = {
  message: ChatMessageType
} & ComponentProps<'div'>

export const ChatMessage = ({ className, message, ...props }: Props) => {
  const Badges = message.user.badges.map((badge, index) => (
    <img
      key={index}
      src={`/badges/${badge}.png`}
      alt={badge}
      className="size-4 self-center"
    />
  ))

  const User = (
    <span className="font-semibold" style={{ color: message.user.rgbColor }}>
      {message.user.username}
    </span>
  )

  return (
    <div
      {...props}
      className={cn(
        'rounded px-2 py-1 text-[15px] leading-6 hover:bg-gray-500/30',
        className
      )}
    >
      <div className="inline-flex items-baseline gap-1">
        {Badges}
        {User}
      </div>
      <span className="break-words text-slate-400">: {message.content}</span>
    </div>
  )
}
