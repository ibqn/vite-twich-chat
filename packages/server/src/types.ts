export interface ServerToClientEvents {}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {
  username: string
  userId: string
  sessionId: string
}

export type Session = {
  id: string
  userId: string
  username: string
  connected: boolean
}
