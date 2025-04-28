import { Chat } from '@/components/chat'
import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { SelectUsername } from '@/components/select-username'

export const App = () => {
  const [usernameSelected, setUsernameSelected] = useState(false)

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      setUsernameSelected(true)
      socket.auth = { sessionId }
      socket.connect()
    }

    socket.on('session', ({ sessionId, userId }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionId }
      localStorage.setItem('sessionId', sessionId)
      socket.data = { userId }
    })

    socket.on('connect_error', (error) => {
      if (error.message === 'invalid username') {
        setUsernameSelected(false)
      }
    })

    return () => {
      socket.off('connect_error')
      socket.off('session')
    }
  }, [])

  const onUsernameSelected = (username: string) => {
    console.log('Username selected', username)
    setUsernameSelected(true)
    socket.auth = { username }
    socket.connect()
  }

  return (
    <div className="grid min-h-screen place-items-center">
      {usernameSelected ? (
        <Chat />
      ) : (
        <SelectUsername onSelect={onUsernameSelected} />
      )}
    </div>
  )
}
