import { useForm } from 'react-hook-form'

export const ChatMessageForm = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit = handleSubmit(({ message }) => {
    // Handle the message submission logic here
    console.log('Submitted message:', message)
    // Reset the input field after submission
    reset()
  })

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <input
        type="text"
        {...register('message')}
        className="w-full rounded bg-slate-700 p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        placeholder="Send a chat message"
      />
      <button
        type="submit"
        className="self-end rounded-sm bg-purple-500 px-4 py-2"
      >
        Chat
      </button>
    </form>
  )
}
