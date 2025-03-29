import PropTypes from 'prop-types'
import { useState } from 'react'
import { ACCESS_TOKEN } from '../../constants'

export default function CreatePosts({
  showPostModal,
  setShowPostModal,
  postContent,
  setPostContent,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)

  const handlePostContentChange = (e) => {
    const content = e.target.value
    if (content.length <= 255) {
      setPostContent(content)
    }
  }

  const handleCategorySelection = (category) => {
    setSelectedCategory(category)
  }

  const handleYearSelection = (year) => {
    setSelectedYear(year)
  }

  const validatePost = () => {
    if (!postContent.trim()) {
      setError('Post content cannot be empty')
      return false
    }
    return true
  }

  const handleSubmitPost = async () => {
    setError(null)

    if (!validatePost()) {
      return
    }

    if (!selectedCategory) {
      setError('Please select a category')
      return
    }

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem(ACCESS_TOKEN)

      if (!token) {
        throw new Error('Authentication token not found. Please sign in again.')
      }

      const response = await fetch('http://localhost:8000/api/v1/posts/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: postContent,
          tag: selectedCategory.toLowerCase(),
          level: selectedYear,
        }),
      })
      console.log(response)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to create post')
      }

      // Success - close modal and reset form
      setShowPostModal(false)
      setPostContent('')
      setSelectedCategory(null)
      setSelectedYear(null)

      // You could add a success notification here
      // For example, using a toast notification library
      // Show success toast notification
      const successToast = document.createElement('div');
      successToast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 flex items-center';
      successToast.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Post created successfully!</span>
      `;
      document.body.appendChild(successToast);
      
      // Animate the toast in
      setTimeout(() => {
        successToast.classList.add('opacity-100');
      }, 10);
      
      // Remove the toast after 3 seconds
      setTimeout(() => {
        successToast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => {
          document.body.removeChild(successToast);
        }, 500);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { name: 'Article', color: 'purple' },
    { name: 'Achievement', color: 'blue' },
    { name: 'Certificate', color: 'pink' },
    { name: 'Inspiration', color: 'red' },
    { name: 'Collaboration', color: 'green' },
    { name: 'Idea', color: 'yellow' },
  ]

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
                  setSelectedCategory(null)
                  setSelectedYear(null)
                  setError(null)
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

            {error && (
              <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-200">{error}</div>
            )}

            <div className="flex items-start gap-3">
              <img
                src={'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatimah'}
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
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategorySelection(category.name)}
                  className={`rounded-full bg-${category.color}-500/${selectedCategory === category.name ? '30' : '10'} px-3 py-1.5 text-sm text-${category.color}-300 transition-colors hover:bg-${category.color}-500/20 ${selectedCategory === category.name ? 'ring- ring-1' + category.color + '-400' : ''}`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleYearSelection(1)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/${selectedYear === 1 ? '30' : '10'} transition-all hover:bg-emerald-500/20`}
                >
                  <span className="text-[10px] font-medium text-emerald-300">1</span>
                </button>

                <button
                  onClick={() => handleYearSelection(2)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-blue-500/20 bg-blue-500/${selectedYear === 2 ? '30' : '10'} transition-all hover:bg-blue-500/20`}
                >
                  <span className="text-[10px] font-medium text-blue-300">2</span>
                </button>

                <button
                  onClick={() => handleYearSelection(3)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-purple-500/20 bg-purple-500/${selectedYear === 3 ? '30' : '10'} transition-all hover:bg-purple-500/20`}
                >
                  <span className="text-[10px] font-medium text-purple-300">3</span>
                </button>

                <button
                  onClick={() => handleYearSelection(4)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/${selectedYear === 4 ? '30' : '10'} transition-all hover:bg-amber-500/20`}
                >
                  <span className="text-[10px] font-medium text-amber-300">4</span>
                </button>

                <button
                  onClick={() => handleYearSelection(5)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-md border border-rose-500/20 bg-rose-500/${selectedYear === 5 ? '30' : '10'} transition-all hover:bg-rose-500/20`}
                >
                  <span className="text-[10px] font-medium text-rose-300">5</span>
                </button>
              </div>

              <button
                onClick={handleSubmitPost}
                disabled={isSubmitting}
                className={`rounded-3xl border border-purple-500/20 bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-800/40 hover:text-purple-200 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {isSubmitting ? 'Sharing...' : 'Share'}
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
