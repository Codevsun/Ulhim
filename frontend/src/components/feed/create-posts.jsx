import PropTypes from 'prop-types'

export default function CreatePosts({
  showPostModal,
  setShowPostModal,
  postContent,
  setPostContent,
}) {
  const handlePostContentChange = (e) => {
    const content = e.target.value
    if (content.length <= 255) {
      setPostContent(content)
    }
  }

  return (
    <>
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="w-full max-w-lg space-y-6 rounded-2xl border border-white/5 bg-white/5 p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Create New Post</h3>
              <button
                onClick={() => {
                  setShowPostModal(false)
                  setPostContent('')
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-start gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fatimah"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={postContent}
                  onChange={handlePostContentChange}
                  placeholder="What's on your mind?"
                  className="min-h-[120px] w-full rounded-xl bg-black/40 p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/10"
                />
                <div className="mt-2 text-right text-sm text-gray-400">
                  {postContent.length}/255 characters
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className="rounded-full bg-purple-500/10 px-3 py-1.5 text-sm text-purple-300 transition-colors hover:bg-purple-500/20">
                Article
              </button>
              <button className="rounded-full bg-blue-500/10 px-3 py-1.5 text-sm text-blue-300 transition-colors hover:bg-blue-500/20">
                Achievement
              </button>
              <button className="rounded-full bg-pink-500/10 px-3 py-1.5 text-sm text-pink-300 transition-colors hover:bg-pink-500/20">
                Certificate
              </button>
              <button className="rounded-full bg-red-500/10 px-3 py-1.5 text-sm text-red-300 transition-colors hover:bg-red-500/20">
                Inspiration
              </button>
              <button className="rounded-full bg-green-500/10 px-3 py-1.5 text-sm text-green-300 transition-colors hover:bg-green-500/20">
                Collaboration
              </button>
              <button className="rounded-full bg-yellow-500/10 px-3 py-1.5 text-sm text-yellow-300 transition-colors hover:bg-yellow-500/20">
                Idea
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="group relative flex h-6 w-6 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10 transition-all hover:bg-emerald-500/20">
                  <span className="text-[10px] font-medium text-emerald-300">1</span>
                </button>

                <button className="group relative flex h-6 w-6 items-center justify-center rounded-md border border-blue-500/20 bg-blue-500/10 transition-all hover:bg-blue-500/20">
                  <span className="text-[10px] font-medium text-blue-300">2</span>
                </button>

                <button className="group relative flex h-6 w-6 items-center justify-center rounded-md border border-purple-500/20 bg-purple-500/10 transition-all hover:bg-purple-500/20">
                  <span className="text-[10px] font-medium text-purple-300">3</span>
                </button>

                <button className="group relative flex h-6 w-6 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10 transition-all hover:bg-amber-500/20">
                  <span className="text-[10px] font-medium text-amber-300">4</span>
                </button>

                <button className="group relative flex h-6 w-6 items-center justify-center rounded-md border border-rose-500/20 bg-rose-500/10 transition-all hover:bg-rose-500/20">
                  <span className="text-[10px] font-medium text-rose-300">5</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setShowPostModal(false)
                  setPostContent('')
                }}
                className="rounded-3xl border border-purple-500/20 bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-800/40 hover:text-purple-200"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

CreatePosts.propTypes = {
  showPostModal: PropTypes.bool.isRequired,
  setShowPostModal: PropTypes.func.isRequired,
  postContent: PropTypes.string.isRequired,
  setPostContent: PropTypes.func.isRequired,
}
