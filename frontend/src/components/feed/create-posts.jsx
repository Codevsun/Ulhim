export default function CreatePosts() {
  return (
    <div className="mb-6 rounded-xl border border-white/5 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fatimah"
            alt="Profile"
            className="absolute left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full rounded-full bg-black/40 pl-14 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/10"
          />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>
        </div>
        <button className="rounded-3xl border border-purple-500/20 bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-800/40 hover:text-purple-200">
          Share
        </button>
      </div>
    </div>
  )
}
