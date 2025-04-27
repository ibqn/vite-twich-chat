export type ChatMessage = {
  id: string
  content: string
  user: User
}

export type User = {
  id: string
  username: string
  rgbColor: string
  badges: Badge[]
}

export const Badge = {
  moderator: 'moderator',
  vip: 'vip',
  prime: 'prime',
  turbo: 'turbo',
} as const

export type Badge = (typeof Badge)[keyof typeof Badge]
