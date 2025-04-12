import { faker } from '@faker-js/faker'
import { Badge, ChatMessage } from '@/types'

export const generateFakeChatMessage = (): ChatMessage => {
  return {
    id: faker.string.uuid(),
    content: faker.lorem.sentence(),
    author: {
      id: faker.string.uuid(),
      username: faker.internet.username(),
      rgbColor: faker.color.rgb(),
      badges: generateFakeBadges(),
    },
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
