import { Home } from './Home'
import { useState } from 'react'
import Filter from '../components/feed/filters'
export default function Projects() {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    image: null,
    tags: [],
  })

  const [projects] = useState([
    {
      content: {
        borderColor: 'red',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        name: 'AI-Powered Code Assistant',
        badge: 'In Progress',
        rating: '4.9',
        description:
          'An intelligent coding assistant that helps developers write better code faster.',
      },
      author: {
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'John Smith',
        username: '@johnsmith',
      },
    },
    // ... other projects
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // ... handle form submission
    setShowNewProjectForm(false) // Hide form after submission
  }

  return (
    <Home>
      <Filter />
      {/* Projects Header */}
      <div className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Community Projects</h1>
        <button
          onClick={() => setShowNewProjectForm(!showNewProjectForm)}
          className="rounded-xl bg-gradient-to-r from-gray-800 to-black px-6 py-2.5 font-medium text-white shadow-lg transition-all duration-200 hover:from-black hover:to-gray-900 hover:shadow-black/25"
        >
          {showNewProjectForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {/* New Project Form Modal */}
      {showNewProjectForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black/75 transition-opacity"
              onClick={() => setShowNewProjectForm(false)}
            />

            <div className="inline-block transform overflow-hidden rounded-2xl border-2 border-white/10 bg-black px-8 py-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Create New Project</h3>
                <button
                  onClick={() => setShowNewProjectForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Project Title
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-2 border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                        placeholder="Give your project a catchy name"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Project Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="min-h-[200px] w-full rounded-xl border-2 border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                        placeholder="Describe your project in detail..."
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Project Tags
                      </label>
                      <input
                        type="text"
                        name="tags"
                        placeholder="Add tags (comma separated)"
                        className="w-full rounded-xl border-2 border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Project Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-2 border-white/10 bg-gray-900 px-4 py-3 text-white transition-all duration-200 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                      >
                        <option value="planning">🎯 Planning</option>
                        <option value="in-progress">🚀 In Progress</option>
                        <option value="completed">✨ Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Project Cover Image
                      </label>
                      <div className="rounded-xl border-2 border-dashed border-white/10 p-4 text-center">
                        {formData.image ? (
                          <div className="relative">
                            <img
                              src={formData.image}
                              alt="Preview"
                              className="h-48 w-full rounded-lg object-cover"
                            />
                            <button
                              onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                              className="absolute right-2 top-2 rounded-full bg-red-500/80 p-2 text-white transition-colors hover:bg-red-600"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="py-8">
                            <input
                              type="file"
                              onChange={handleImageChange}
                              className="hidden"
                              id="image-upload"
                              accept="image/*"
                            />
                            <label
                              htmlFor="image-upload"
                              className="flex cursor-pointer flex-col items-center gap-2 text-gray-400 transition-colors hover:text-gray-200"
                            >
                              <svg
                                className="h-12 w-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>Click to upload project image</span>
                              <span className="text-sm">or drag and drop</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="rounded-xl bg-gradient-to-r from-gray-800 to-black px-6 py-2.5 font-medium text-white shadow-lg transition-all duration-200 hover:from-black hover:to-gray-900 hover:shadow-black/25"
                      >
                        Publish Project
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group cursor-pointer overflow-hidden rounded-2xl border-2 ${project.content.borderColor === 'red' ? 'border-red-500/30' : project.content.borderColor === 'yellow' ? 'border-yellow-500/30' : ''} bg-white/5 shadow-lg transition-all duration-300 hover:bg-white/10`}
            >
              <div className="relative">
                <img
                  src={project.content.image}
                  alt={project.content.name}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full ${project.content.borderColor === 'red' ? 'bg-red-500/20 text-red-300' : project.content.borderColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' : ''} px-4 py-1.5 text-sm font-medium backdrop-blur-sm`}
                    >
                      {project.content.badge}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-sm text-white backdrop-blur-sm">
                      <svg
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {project.content.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={project.author.image}
                    alt={project.author.name}
                    className="h-10 w-10 rounded-full ring-2 ring-gray-500/30"
                  />
                  <div>
                    <h4 className="font-medium text-white">{project.author.name}</h4>
                    <span className="text-sm text-gray-400">{project.author.username}</span>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-medium text-white">{project.content.name}</h3>
                <p className="text-gray-400">{project.content.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Home>
  )
}
