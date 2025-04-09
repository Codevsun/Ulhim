import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Profile from './Profile'
import api from '../services/api'

export default function Years() {
  const { yearNumber } = useParams()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    posts: {
      total: 0,
      byCategory: {
        article: 0,
        achievement: 0,
        certificate: 0,
        inspiration: 0,
        collaboration: 0,
        idea: 0,
      },
    },
    projects: {
      total: 0,
      byStatus: {
        planning: 0,
        in_progress: 0,
        completed: 0,
        graduation_project: 0,
      },
    },
  })

  useEffect(() => {
    const fetchYearStats = async () => {
      try {
        const response = await api.get(`year/${yearNumber}/stats/`)
        setStats(response.data)
      } catch (error) {
        console.error('Failed to fetch year stats', error)
      }
    }

    fetchYearStats()
  }, [yearNumber])

  const handleCategoryClick = (category) => {
    navigate(`/year/${yearNumber}/posts/${category.toLowerCase()}`)
  }

  const handleProjectStatusClick = (status) => {
    navigate(`/year/${yearNumber}/projects/${status}`)
  }

  return (
    <Profile>
      <div className="col-span-6 space-y-8">
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            Year {yearNumber || '1'} Progress
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>

          {/* Posts Overview */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-light text-white">Posts Activity</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Total Posts Card */}
              <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Posts</p>
                    <p className="text-3xl font-light text-white">{stats.posts.total}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                    <svg
                      className="h-6 w-6 text-purple-400"
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
                </div>
              </div>

              {/* Posts by Category */}
              <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6">
                <h4 className="mb-4 text-sm text-gray-400">Posts by Category</h4>
                <div className="space-y-2">
                  {Object.entries(stats.posts.byCategory).map(([category, count]) => (
                    <div
                      key={category}
                      className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/5"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`mr-2 h-2 w-2 rounded-full bg-${category === 'article' ? 'purple' : category === 'achievement' ? 'blue' : category === 'certificate' ? 'pink' : category === 'inspiration' ? 'red' : category === 'collaboration' ? 'green' : 'yellow'}-400`}
                        ></div>
                        <span className="text-sm capitalize text-white">{category}</span>
                      </div>
                      <span className="text-sm text-gray-400">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Overview */}
          <div>
            <h3 className="mb-4 text-xl font-light text-white">Projects Progress</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Total Projects */}
              <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Projects</p>
                    <p className="text-3xl font-light text-white">{stats.projects.total}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                    <svg
                      className="h-6 w-6 text-blue-400"
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
                </div>
              </div>

              {/* Project Status Breakdown */}
              <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6">
                <h4 className="mb-4 text-sm text-gray-400">Projects by Status</h4>
                <div className="space-y-2">
                  {Object.entries(stats.projects.byStatus).map(([status, count]) => (
                    <div
                      key={status}
                      className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/5"
                      onClick={() => handleProjectStatusClick(status)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`mr-2 h-2 w-2 rounded-full bg-${status === 'planning' ? 'yellow' : status === 'in_progress' ? 'blue' : status === 'completed' ? 'green' : 'purple'}-400`}
                        ></div>
                        <span className="text-sm capitalize text-white">
                          {status.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  )
}
