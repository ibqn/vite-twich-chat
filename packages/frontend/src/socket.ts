import { ClientToServerEvents, ServerToClientEvents } from 'server/src/types'
import { io, Socket } from 'socket.io-client'

// Extend the Socket type to include userId
type ExtendedSocket = Socket<ServerToClientEvents, ClientToServerEvents>

const URL = import.meta.env.VITE_SOCKET_ENDPOINT
const socket: ExtendedSocket = io(URL, { autoConnect: false })

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export { socket }
