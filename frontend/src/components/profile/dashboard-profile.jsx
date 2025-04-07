import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../../pages/Profile'
export default function DashboardProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState('Tell others about yourself...')
  const [editingFeatured, setEditingFeatured] = useState(false)
  const [editingInProgress, setEditingInProgress] = useState(false)

  const navigate = useNavigate()
  const handleDescriptionSave = () => {
    if (description.length > 255) {
      alert('Description must be 255 characters or less')
      return
    }
    // TODO: Add API call to save description
    setIsEditing(false)
  }

  const handleFeaturedSave = () => {
    // TODO: Add API call to save featured projects
    setEditingFeatured(false)
  }

  const handleInProgressSave = () => {
    // TODO: Add API call to save in progress projects
    setEditingInProgress(false)
  }

  return (
    <Profile>
      <div className="col-span-6 space-y-8">
        {/* About Me Section */}
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            About Me
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>
          <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Who Am I</h3>
              {isEditing ? (
                <button
                  onClick={handleDescriptionSave}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Edit
                </button>
              )}
            </div>
            {isEditing ? (
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => {
                    if (e.target.value.length <= 255) {
                      setDescription(e.target.value)
                    }
                  }}
                  maxLength={255}
                  className="h-32 w-full resize-none rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  placeholder="Tell others about yourself..."
                />
                <div
                  className={`absolute bottom-2 right-2 text-sm ${
                    description.length >= 230 ? 'text-red-400' : 'text-gray-400'
                  }`}
                >
                  {description.length}/255
                </div>
              </div>
            ) : (
              <p className="text-gray-300">{description}</p>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            My Projects
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Featured Projects */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Featured</h3>
                {editingFeatured ? (
                  <button
                    onClick={handleFeaturedSave}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingFeatured(true)}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingFeatured ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Project name"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <textarea
                    placeholder="Project description"
                    className="h-24 w-full resize-none rounded-lg border border-white/10 bg-gray-700/30 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                </div>
              ) : (
                <div className="text-gray-300">
                  <p className="italic text-gray-500">No featured projects yet</p>
                </div>
              )}
            </div>

            {/* In Progress Projects */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">In Progress</h3>
                {editingInProgress ? (
                  <button
                    onClick={handleInProgressSave}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingInProgress(true)}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingInProgress ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Project name"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <textarea
                    placeholder="Project description"
                    className="h-24 w-full resize-none rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                </div>
              ) : (
                <div className="text-gray-300">
                  <p className="italic text-gray-500">No projects in progress</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Academic Journey Section */}
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            Academic Journey
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5].map((year) => (
              <button
                key={year}
                onClick={() => navigate(`/year/${year}`)}
                className={`group relative overflow-hidden rounded-lg border border-white/10 bg-gray-800/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-gray-700/50 ${
                  year === 1 ? 'col-span-2' : ''
                }`}
              >
                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-gray-800/30">
                    <svg
                      className="h-6 w-6 text-purple-400/80 drop-shadow-[0_0_3px_rgba(168,85,247,0.5)] transition-colors duration-500 group-hover:text-purple-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block text-lg font-light text-white">Year {year}</span>
                    <span className="mt-1 block text-sm text-white/60">View details →</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Profile>
  )
}
