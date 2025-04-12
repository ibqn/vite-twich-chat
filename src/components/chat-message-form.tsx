export const ChatMessageForm = () => {
  return (
    <form className="flex flex-col gap-2">
      <input
        type="text"
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
