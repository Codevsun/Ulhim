import { useState } from 'react'
import CreatePosts from './create-posts'
import CreateProjects from './create-projects'

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [projectFormData, setProjectFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    tags: '',
    image: null,
  })

  return (
    <div className="fixed bottom-8">
      <div className="relative">
        {/* Menu Items */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-4">
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all hover:bg-blue-600"
              onClick={() => {
                setIsOpen(false)
                setShowProjectModal(true)
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg transition-all hover:bg-purple-600"
              onClick={() => {
                setIsOpen(false)
                setShowPostModal(true)
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transition-all hover:from-purple-600 hover:to-blue-600"
        >
          <svg
            className={`h-8 w-8 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <CreatePosts
        showPostModal={showPostModal}
        setShowPostModal={setShowPostModal}
        postContent={postContent}
        setPostContent={setPostContent}
      />

      {/* Project Creation Modal */}
      <CreateProjects
        showProjectModal={showProjectModal}
        setShowProjectModal={setShowProjectModal}
        projectFormData={projectFormData}
        setProjectFormData={setProjectFormData}
      />
    </div>
  )
}
