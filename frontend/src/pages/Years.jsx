import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Profile from './Profile'

export default function Years() {
  const { yearNumber } = useParams()
  // Using useState without the linting error by actually using the setter in useEffect
  const [stats, setStats] = useState({
    posts: 24,
    certificates: 5,
    ideas: 12,
    projects: 8,
  })

  // This would be replaced with actual API call
  useEffect(() => {
    // Example of how you would update stats based on year
    const fetchYearStats = async () => {
      try {
        // Simulating API call
        // const response = await api.get(`/stats/year/${yearNumber}`)
        // setStats(response.data)

        // For demo purposes, just update with different numbers based on year
        setStats((prevStats) => ({
          ...prevStats,
          posts: 20 + (parseInt(yearNumber) || 1) * 2,
          certificates: 3 + (parseInt(yearNumber) || 1),
        }))
      } catch (error) {
        console.error('Failed to fetch year stats', error)
      }
    }

    fetchYearStats()
  }, [yearNumber])

  return (
    <Profile>
      <div className="col-span-6 space-y-8">
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            Year {yearNumber || '1'} Overview
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 gap-4">
            {/* Posts Stat */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-gray-800/30">
                  <svg
                    className="h-6 w-6 text-purple-400/80 drop-shadow-[0_0_3px_rgba(168,85,247,0.5)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-lg font-light text-white">Posts</span>
                  <span className="mt-1 block text-sm text-white/60">{stats.posts} total</span>
                </div>
              </div>
            </div>

            {/* Certificates Stat */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-gray-800/30">
                  <svg
                    className="h-6 w-6 text-purple-400/80 drop-shadow-[0_0_3px_rgba(168,85,247,0.5)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-lg font-light text-white">Certificates</span>
                  <span className="mt-1 block text-sm text-white/60">
                    {stats.certificates} earned
                  </span>
                </div>
              </div>
            </div>

            {/* Ideas Stat */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-gray-800/30">
                  <svg
                    className="h-6 w-6 text-purple-400/80 drop-shadow-[0_0_3px_rgba(168,85,247,0.5)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-lg font-light text-white">Ideas</span>
                  <span className="mt-1 block text-sm text-white/60">{stats.ideas} shared</span>
                </div>
              </div>
            </div>

            {/* Projects Stat */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-gray-800/30">
                  <svg
                    className="h-6 w-6 text-purple-400/80 drop-shadow-[0_0_3px_rgba(168,85,247,0.5)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-lg font-light text-white">Projects</span>
                  <span className="mt-1 block text-sm text-white/60">
                    {stats.projects} completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            Recent Activity
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>
          <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
            <div className="space-y-6">
              {/* Activity items would be mapped here */}
              <div className="flex items-start gap-4 border-b border-white/5 pb-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-gray-800/30">
                  <svg
                    className="h-5 w-5 text-purple-400/80"
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
                <div>
                  <h3 className="text-md font-medium text-white">
                    Completed Introduction to AI Course
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">Earned certificate with distinction</p>
                  <span className="mt-2 inline-block text-xs text-gray-500">2 weeks ago</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-gray-800/30">
                  <svg
                    className="h-5 w-5 text-purple-400/80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-md font-medium text-white">
                    Started New Project: Campus Connect
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    A platform to connect students with similar interests
                  </p>
                  <span className="mt-2 inline-block text-xs text-gray-500">1 month ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  )
}
