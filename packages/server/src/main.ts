import { createServer } from "http"
import { Server, Socket } from "socket.io"
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/types"
import { InMemorySessionStore } from "./session-store/in-memory-session-store"
import { randomId } from "./utils/random-id"

const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "http://localhost:5173"

const httpServer = createServer()
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: [allowedOrigin],
  },
})

const sessionStore = new InMemorySessionStore()

io.use(async (socket, next) => {
  const sessionId = socket.handshake.auth.sessionId

  if (sessionId) {
    const session = await sessionStore.findSessionById(sessionId)
    if (session) {
      socket.data.sessionId = sessionId
      socket.data.userId = session.userId
      socket.data.username = session.username
      return next()
    }
  }
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error("invalid username"))
  }
  socket.data.sessionId = randomId()
  socket.data.userId = randomId()
  socket.data.username = username
  next()
})

io.on("connection", async (socket: Socket) => {
  console.log("user connected", socket.data.username)

  // persist session
  await sessionStore.saveSession({
    id: socket.data.sessionId,
    userId: socket.data.userId,
    username: socket.data.username,
    connected: true,
  })

  // emit session details
  socket.emit("session", {
    sessionId: socket.data.sessionId,
    userId: socket.data.userId,
  })

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    console.log("user disconnected", socket.data.username)

    const matchingSockets = await io.in(socket.data.userId).fetchSockets()
    const isDisconnected = matchingSockets.length === 0
    if (isDisconnected) {
      // update the connection status of the session
      await sessionStore.saveSession({
        id: socket.data.sessionId,
        userId: socket.data.userId,
        username: socket.data.username,
        connected: false,
      })
    }
  })
})

const PORT = process.env.PORT ?? 4444

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
)
