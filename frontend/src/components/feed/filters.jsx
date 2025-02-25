import { useState } from 'react'

export default function Filters() {
  const [selectedSection, setSelectedSection] = useState('general')
  const [selectedCount, setSelectedCount] = useState(0)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [lastClickTime, setLastClickTime] = useState(0)

  const handleFilterClick = (filter, section) => {
    const currentTime = new Date().getTime()
    const isDoubleClick = currentTime - lastClickTime < 300
    setLastClickTime(currentTime)

    if (isDoubleClick) {
      // On double click, select all filters in the current section
      let filtersToAdd = []
      if (section === 'general') {
        filtersToAdd = ['all', 'popular', 'recent', 'following', 'trending']
      } else if (section === 'levels') {
        filtersToAdd = ['freshman', 'sophomore', 'junior', 'senior', 'graduate']
      } else if (section === 'major') {
        filtersToAdd = ['cs', 'ai', 'cys', 'cis']
      }

      // Add only filters that aren't already selected
      const newFilters = [...new Set([...selectedFilters, ...filtersToAdd])]
      setSelectedFilters(newFilters)
      setSelectedCount(newFilters.length)
    } else {
      // Single click behavior
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter))
        setSelectedCount((prev) => prev - 1)
      } else {
        setSelectedFilters([...selectedFilters, filter])
        setSelectedCount((prev) => prev + 1)
      }
    }
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
    setSelectedCount(0)
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-medium text-white">Filters</h2>
          {selectedCount > 0 && (
            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-sm text-purple-400">
              {selectedCount} selected
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {selectedCount > 0 && (
            <button onClick={clearAllFilters} className="text-sm text-gray-400 hover:text-white">
              Clear all
            </button>
          )}
          <button
            onClick={() => setSelectedSection(selectedSection ? '' : 'general')}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span>{selectedSection ? 'Hide Filters' : 'Show Filters'}</span>
            <svg
              className={`h-5 w-5 transition-transform ${selectedSection ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${selectedSection ? 'opacity-100' : 'h-0 overflow-hidden opacity-0'}`}
      >
        {/* Tag Type Selection */}
        <div className="mb-4 flex justify-center gap-4">
          {['General', 'Levels', 'Major'].map((section) => (
            <button
              key={section}
              className={`relative overflow-hidden rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedSection === section.toLowerCase()
                  ? 'text-white before:absolute before:inset-0 before:-z-10 before:animate-pulse before:bg-white/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              onClick={() => setSelectedSection(section.toLowerCase())}
            >
              {selectedSection === section.toLowerCase() && (
                <span className="absolute inset-0 -z-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm" />
              )}
              {section}
            </button>
          ))}
        </div>

        {/* Tags Container */}
        <div className="mx-auto mb-6 flex max-w-3xl flex-wrap justify-center gap-2">
          {selectedSection === 'general' && (
            <>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('all')
                    ? 'bg-blue-500/40 text-blue-300'
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                }`}
                onClick={() => handleFilterClick('all', 'general')}
              >
                All Posts
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('popular')
                    ? 'bg-green-500/40 text-green-300'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
                onClick={() => handleFilterClick('popular', 'general')}
              >
                Popular
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('recent')
                    ? 'bg-purple-500/40 text-purple-300'
                    : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                }`}
                onClick={() => handleFilterClick('recent', 'general')}
              >
                Recent
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('following')
                    ? 'bg-rose-500/40 text-rose-300'
                    : 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                }`}
                onClick={() => handleFilterClick('following', 'general')}
              >
                Following
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('trending')
                    ? 'bg-yellow-500/40 text-yellow-300'
                    : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                }`}
                onClick={() => handleFilterClick('trending', 'general')}
              >
                Trending
              </button>
            </>
          )}

          {selectedSection === 'levels' && (
            <>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('freshman')
                    ? 'bg-blue-500/40 text-blue-300'
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                }`}
                onClick={() => handleFilterClick('freshman', 'levels')}
              >
                Freshman
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('sophomore')
                    ? 'bg-green-500/40 text-green-300'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
                onClick={() => handleFilterClick('sophomore', 'levels')}
              >
                Sophomore
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('junior')
                    ? 'bg-purple-500/40 text-purple-300'
                    : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                }`}
                onClick={() => handleFilterClick('junior', 'levels')}
              >
                Junior
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('senior')
                    ? 'bg-rose-500/40 text-rose-300'
                    : 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                }`}
                onClick={() => handleFilterClick('senior', 'levels')}
              >
                Senior
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('graduate')
                    ? 'bg-yellow-500/40 text-yellow-300'
                    : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                }`}
                onClick={() => handleFilterClick('graduate', 'levels')}
              >
                Graduate
              </button>
            </>
          )}

          {selectedSection === 'major' && (
            <>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('cs')
                    ? 'bg-blue-500/40 text-blue-300'
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                }`}
                onClick={() => handleFilterClick('cs', 'major')}
              >
                Computer Science
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('ai')
                    ? 'bg-green-500/40 text-green-300'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
                onClick={() => handleFilterClick('ai', 'major')}
              >
                Artificial Intelligence
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('cys')
                    ? 'bg-purple-500/40 text-purple-300'
                    : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                }`}
                onClick={() => handleFilterClick('cys', 'major')}
              >
                Cybersecurity
              </button>
              <button
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedFilters.includes('cis')
                    ? 'bg-rose-500/40 text-rose-300'
                    : 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                }`}
                onClick={() => handleFilterClick('cis', 'major')}
              >
                Computer Information Systems
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
