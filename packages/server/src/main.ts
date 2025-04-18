import { createServer } from "http"
import { Server, Socket } from "socket.io"
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/types"

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

io.use(async (socket, next) => {
  next()
})

io.on("connection", async (socket: Socket) => {
  console.log("user connected")

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    console.log("user disconnected")
  })
})

const PORT = process.env.PORT ?? 4444

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
)
