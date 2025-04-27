import { useForm } from 'react-hook-form'

type FormData = {
  username: string
}

type Props = {
  onSelect: (username: string) => void
}

export const SelectUsername = ({ onSelect }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
    },
  })

  const onSubmit = handleSubmit(({ username }) => {
    // Handle the username selection logic here
    console.log('Selected username:', username)
    onSelect(username)
  })

  return (
    <div className="w-full max-w-sm rounded bg-slate-900/80 p-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <label htmlFor="username" className="text-slate-400">
          Choose a username
        </label>
        <input
          type="text"
          className="w-full rounded bg-slate-700 p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          {...register('username', {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
          name="username"
          placeholder="Enter your username"
        />
        <button
          type="submit"
          className="self-end rounded-sm bg-purple-500 px-4 py-2"
        >
          Join
        </button>
        {errors.username && (
          <p className="text-red-700">
            Username is required and must be between 3 and 20 characters.
          </p>
        )}
      </form>
    </div>
  )
}
