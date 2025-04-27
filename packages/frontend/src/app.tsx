import { Chat } from '@/components/chat'
import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { SelectUsername } from '@/components/select-username'

export const App = () => {
  const [usernameSelected, setUsernameSelected] = useState(false)

  useEffect(() => {
    socket.auth = {
      username: 'user',
    }
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  const onUsernameSelected = (username: string) => {
    console.log('Username selected:', username)
    setUsernameSelected(true)
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
