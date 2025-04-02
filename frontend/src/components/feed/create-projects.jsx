import PropTypes from 'prop-types'
import { useState } from 'react'
import { ACCESS_TOKEN } from '../../constants'

export default function CreateProjects({
  showProjectModal,
  setShowProjectModal,
  projectFormData,
  setProjectFormData,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)

  const handleProjectDescriptionChange = (e) => {
    const description = e.target.value
    if (description.length <= 255) {
      setProjectFormData({ ...projectFormData, description: description })
    }
  }

  const handleYearSelection = (year) => {
    setSelectedYear(year)
  }

  const validateForm = () => {
    if (!projectFormData.name.trim()) {
      setError('Project name is required')
      return false
    }
    if (!projectFormData.description.trim()) {
      setError('Project description is required')
      return false
    }
    if (!projectFormData.image) {
      setError('Project image is required')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem(ACCESS_TOKEN)

      if (!token) {
        throw new Error('Authentication token not found. Please sign in again.')
      }

      // Prepare form data for submission
      const formData = new FormData()
      formData.append('name', projectFormData.name)
      formData.append('description', projectFormData.description)
      formData.append('status', projectFormData.status)
      formData.append('tags', projectFormData.tags)
      formData.append('image', projectFormData.image)
      if (selectedYear) {
        formData.append('level', selectedYear)
      }

      const response = await fetch('http://localhost:8000/api/v1/posts/projects/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to create project')
      }

      // Show success toast notification
      const successToast = document.createElement('div')
      successToast.className =
        'fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 flex items-center'
      successToast.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Project created successfully!</span>
      `
      document.body.appendChild(successToast)

      // Animate the toast in
      setTimeout(() => {
        successToast.classList.add('opacity-100')
      }, 10)

      // Remove the toast after 3 seconds
      setTimeout(() => {
        successToast.classList.add('opacity-0', 'translate-y-2')
        setTimeout(() => {
          document.body.removeChild(successToast)
        }, 500)
      }, 3000)

      setShowProjectModal(false)
      setProjectFormData({
        name: '',
        description: '',
        status: 'planning',
        tags: '',
        image: null,
      })
      setSelectedYear(null)
    } catch (err) {
      console.error('Error creating project:', err)
      setError(err.message || 'Failed to create project')
    } finally {
      setIsSubmitting(false)
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

            {error && (
              <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-200">{error}</div>
            )}

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
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="graduation project">Graduation Project</option>  
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
                placeholder="Enter tags separated by commas"
                value={projectFormData.tags}
                onChange={(e) => setProjectFormData({ ...projectFormData, tags: e.target.value })}
                className="w-full rounded-lg bg-black/40 p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/10"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleYearSelection(1)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-emerald-500/20 ${
                    selectedYear === 1 ? 'bg-emerald-500/30' : 'bg-emerald-500/10'
                  } transition-all hover:bg-emerald-500/20`}
                >
                  <span className="text-[10px] font-medium text-emerald-300">1</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleYearSelection(2)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-blue-500/20 ${
                    selectedYear === 2 ? 'bg-blue-500/30' : 'bg-blue-500/10'
                  } transition-all hover:bg-blue-500/20`}
                >
                  <span className="text-[10px] font-medium text-blue-300">2</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleYearSelection(3)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-purple-500/20 ${
                    selectedYear === 3 ? 'bg-purple-500/30' : 'bg-purple-500/10'
                  } transition-all hover:bg-purple-500/20`}
                >
                  <span className="text-[10px] font-medium text-purple-300">3</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleYearSelection(4)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-amber-500/20 ${
                    selectedYear === 4 ? 'bg-amber-500/30' : 'bg-amber-500/10'
                  } transition-all hover:bg-amber-500/20`}
                >
                  <span className="text-[10px] font-medium text-amber-300">4</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleYearSelection(5)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-rose-500/20 ${
                    selectedYear === 5 ? 'bg-rose-500/30' : 'bg-rose-500/10'
                  } transition-all hover:bg-rose-500/20`}
                >
                  <span className="text-[10px] font-medium text-rose-300">5</span>
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`rounded-3xl border border-purple-500/20 bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-800/40 hover:text-purple-200 ${
                  isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
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
  projectFormData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    image: PropTypes.object,
  }).isRequired,
  setProjectFormData: PropTypes.func.isRequired,
}
