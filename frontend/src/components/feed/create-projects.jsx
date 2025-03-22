import PropTypes from 'prop-types'

export default function CreateProjects({
  showProjectModal,
  setShowProjectModal,
  projectFormData,
  setProjectFormData,
}) {
  const handleProjectDescriptionChange = (e) => {
    const description = e.target.value
    if (description.length <= 255) {
      setProjectFormData({ ...projectFormData, description: description })
    }
  }

  return (
    <>
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="w-full max-w-lg space-y-6 rounded-2xl border border-white/5 bg-white/5 p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Create New Project</h3>
              <button
                onClick={() => setShowProjectModal(false)}
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

            <input
              type="text"
              placeholder="Project Name"
              value={projectFormData.name}
              onChange={(e) => setProjectFormData({ ...projectFormData, name: e.target.value })}
              className="w-full rounded-lg bg-black/40 p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/10"
            />

            <div className="space-y-2">
              <textarea
                placeholder="Project Description"
                value={projectFormData.description}
                onChange={handleProjectDescriptionChange}
                className="h-32 w-full rounded-lg bg-black/40 p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/10"
              />
              <div className="text-right text-sm text-gray-400">
                {projectFormData.description.length}/255 characters
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Project Status</label>
              <select
                value={projectFormData.status}
                onChange={(e) => setProjectFormData({ ...projectFormData, status: e.target.value })}
                className="w-full rounded-lg bg-black/40 p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/10"
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProjectFormData({ ...projectFormData, image: e.target.files[0] })
                }
                className="w-full rounded-lg bg-black/40 p-2.5 text-white file:mr-4 file:rounded-full file:border-0 file:bg-purple-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-purple-300 hover:file:bg-purple-500/30 focus:outline-none focus:ring-1 focus:ring-white/10"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Project Tags</label>
              <input
                type="text"
                placeholder="Add tags separated by commas (e.g. Frontend, Backend, UI/UX)"
                value={projectFormData.tags}
                onChange={(e) => setProjectFormData({ ...projectFormData, tags: e.target.value })}
                className="w-full rounded-lg bg-black/40 p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/10"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Year buttons */}
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
                  // Handle project creation logic here
                  setShowProjectModal(false)
                  setProjectFormData({
                    name: '',
                    description: '',
                    status: 'planning',
                    tags: '',
                    image: null,
                  })
                }}
                className="rounded-3xl border border-purple-500/20 bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-800/40 hover:text-purple-200"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

CreateProjects.propTypes = {
  showProjectModal: PropTypes.bool.isRequired,
  setShowProjectModal: PropTypes.func.isRequired,
  projectFormData: PropTypes.object.isRequired,
  setProjectFormData: PropTypes.func.isRequired,
}
