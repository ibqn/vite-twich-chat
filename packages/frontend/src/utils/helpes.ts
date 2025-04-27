import { faker } from '@faker-js/faker'
import type { User, ChatMessage } from '@/types'
import { Badge } from '@/types'

export const generateFakeChatMessage = (): ChatMessage => {
  return {
    id: faker.string.uuid(),
    content: faker.lorem.sentence(),
    user: generateUser(),
  }
}

export const generateFakeBadges = (): Badge[] => {
  const badge = (badge: Badge, probability: number) =>
    faker.helpers.maybe(() => badge, { probability })

  return [
    badge(Badge.moderator, 0.1),
    badge(Badge.vip, 0.1),
    badge(Badge.prime, 0.2),
    badge(Badge.turbo, 0.1),
  ].filter(Boolean) as Badge[]
}

export const generateUser = (): User => ({
  id: faker.string.uuid(),
  username: faker.internet.username(),
  rgbColor: faker.color.rgb(),
  badges: generateFakeBadges(),
})
