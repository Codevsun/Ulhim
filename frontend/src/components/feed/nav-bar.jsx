import { Logo } from '../signup/logo'
import { useState, useEffect } from 'react'
import api, { mediaUrl } from '../../services/api'


export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.length < 1) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await api.get(`search-users/?query=${searchQuery}`)
        setSearchResults(response.data)
      } catch (error) {
        console.error('Error searching users:', error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchUsers, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleClickOutside = () => {
    setShowResults(false)
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#050508]/80 px-6 py-4 backdrop-blur-sm">
      <Logo />
      <div className="flex flex-1 items-center justify-center gap-2">
        <div className="relative w-[600px]">
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search users, majors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowResults(true)
              }}
              onBlur={() => setTimeout(handleClickOutside, 100)}
              className="w-full rounded-full border border-white/10 bg-white/5 px-10 py-2.5 text-sm text-white placeholder-gray-500 transition-all focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {showResults && (
            <div className="absolute mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0f] shadow-lg shadow-black/20 backdrop-blur-sm">
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
                  <span className="ml-2 text-sm text-gray-400">Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex cursor-pointer items-center gap-3 border-b border-white/5 p-3 transition-colors hover:bg-white/5"
                    >
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-indigo-500/20">
                        {result.profile_image ? (
                          <img
                            src={`${mediaUrl}${result.profile_image}`}
                            alt={result.username}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-medium text-indigo-300">
                            {result.first_name?.[0] || result.username[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {result.first_name && result.last_name
                            ? `${result.first_name} ${result.last_name}`
                            : result.username}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>@{result.username}</span>
                          {result.major && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-gray-500"></span>
                              <span>{result.major}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery.length > 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-400">No results found for &quot;{searchQuery}&quot;</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
