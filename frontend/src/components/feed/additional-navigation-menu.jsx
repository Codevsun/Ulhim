import { useState, useRef } from 'react'

export default function AdditionalNavigationMenu() {
  const [showHelpModal, setShowHelpModal] = useState(false)
  const helpButtonRef = useRef(null)

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal)
  }

  return (
    <div className="rounded-2xl bg-gray-900/20 p-6">
      <div className="space-y-1">
        <div className="relative">
          <button 
            ref={helpButtonRef}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-gray-300 hover:bg-white/5"
            onClick={toggleHelpModal}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Help
          </button>
          
          {/* Help Modal positioned directly above the button */}
          {showHelpModal && (
            <div className="absolute bottom-full left-0 mb-2 w-64 z-50">
              <div className="rounded-lg border border-white/10 bg-black shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 p-2">
                  <h3 className="text-xs font-medium text-white">Quick Help</h3>
                  <button 
                    onClick={toggleHelpModal}
                    className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-2 p-2">
                  <div className="rounded border border-white/5 bg-white/5 p-1.5">
                    <h4 className="text-xs font-medium text-purple-400">whats the purpose of this website?</h4>
                    <p className="text-xs text-gray-300">
                      This website is a platform for students to connect with each other and share their ideas and projects.
                    </p>
                  </div>
                  
                  <div className="rounded border border-white/5 bg-white/5 p-1.5">
                    <h4 className="text-xs font-medium text-purple-400">how do i create a post?</h4>
                    <p className="text-xs text-gray-300">
                      Go to Feed → Click &quot;Create Post&quot; → Fill details → Post
                    </p>
                  </div>
                  
                  <div className="mt-1 text-center">
                    <a 
                      href="mailto:support@campusconnect.com" 
                      className="text-xs text-purple-400 hover:text-purple-300 hover:underline"
                    >
                      ulhim.team@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-gray-300 hover:bg-white/5">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = '/signin'
            }}
          >
            Logout
          </button>
        </button>
      </div>
    </div>
  )
}
