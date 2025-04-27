import { useState } from 'react'
import { Home } from '../pages/Home'
import { motion } from 'framer-motion'
import { LucideExternalLink, LucideUpload } from 'lucide-react'

export default function Companies() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showSubmitPopup, setShowSubmitPopup] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [solutionLink, setSolutionLink] = useState('')

  // Mock data for company internships
  const internships = [
    {
      id: 1,
      company: 'Aramco',
      title: 'Frontend Developer Intern',
      description:
        'Looking for a skilled frontend developer intern with experience in React and modern JavaScript.',
      location: 'Riyadh, Saudi Arabia',
      requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
      postedDate: '2023-10-15',
      applicants: 8,
      applicationLink: 'https://example.com/apply/frontend-intern',
    },
    {
      id: 2,
      company: 'SABIC',
      title: 'Machine Learning Intern',
      description: 'Seeking a talented ML intern to work on cutting-edge AI projects.',
      location: 'Jeddah, Saudi Arabia',
      requiredSkills: ['Python', 'TensorFlow', 'AI/ML', 'Data Science'],
      postedDate: '2023-10-10',
      applicants: 5,
      applicationLink: 'https://example.com/apply/ml-intern',
    },
  ]

  // Mock data for company challenges
  const challenges = [
    {
      id: 1,
      company: 'STC',
      title: 'AI-Powered Sustainability Tracker',
      description: 'Develop an AI solution that helps track and reduce carbon footprint.',
      reward: '10,000 SAR',
      deadline: '2023-12-15',
      skills: ['AI/ML', 'Mobile Development', 'Data Analysis'],
      applicants: 12,
      status: 'active',
      submissions: 5,
      available: true,
    },
    {
      id: 2,
      company: 'NEOM',
      title: 'Smart Campus Navigation System',
      description: 'Create an accessible indoor navigation system for students with disabilities.',
      reward: '8,500 SAR',
      deadline: '2023-11-30',
      skills: ['IoT', 'Mobile Development', 'Accessibility'],
      applicants: 8,
      status: 'active',
      submissions: 3,
      available: true,
    },
    {
      id: 3,
      company: 'Tawuniya',
      title: 'Blockchain for Academic Credentials',
      description: 'Build a blockchain solution for secure academic credential verification.',
      reward: '12,000 SAR',
      deadline: '2024-01-15',
      skills: ['Blockchain', 'Smart Contracts', 'Security'],
      applicants: 6,
      status: 'active',
      submissions: 2,
      available: true,
    },
  ]

  // Mock data for dashboard
  const dashboardData = {
    totalInternships: internships.length,
    totalChallenges: challenges.length,
    totalApplications: internships.reduce((acc, intern) => acc + intern.applicants, 0),
    totalSubmissions: challenges.reduce((acc, challenge) => acc + challenge.submissions, 0),
    activeCompanies: 15,
    upcomingDeadlines: 3,
    recentActivity: [
      {
        id: 1,
        type: 'submission',
        title: 'New solution submitted for AI Tracker',
        company: 'STC',
        time: '2 hours ago',
      },
      {
        id: 2,
        type: 'application',
        title: 'New internship application received',
        company: 'Aramco',
        time: '5 hours ago',
      },
      { 
        id: 3, 
        type: 'challenge', 
        title: 'New challenge posted by TechCorp', 
        company: 'TechCorp',
        time: '1 day ago' 
      },
    ],
  }

  const handleSubmitSolution = (challenge) => {
    setSelectedChallenge(challenge)
    setShowSubmitPopup(true)
  }

  const handleSubmit = () => {
    // Here you would handle the actual submission
    console.log(`Submitting solution for ${selectedChallenge.title}: ${solutionLink}`)
    setShowSubmitPopup(false)
    setSolutionLink('')
  }

  return (
    <Home>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Companies</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`rounded-lg px-4 py-2 ${
                activeTab === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`rounded-lg px-4 py-2 ${
                activeTab === 'internships'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`rounded-lg px-4 py-2 ${
                activeTab === 'challenges'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Challenges
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-gray-800/30 p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Open Internships</h3>
                <p className="text-3xl font-bold text-blue-400">{dashboardData.totalInternships}</p>
                <p className="mt-2 text-sm text-gray-400">Available opportunities</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-gray-800/30 p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Active Challenges</h3>
                <p className="text-3xl font-bold text-green-400">{dashboardData.totalChallenges}</p>
                <p className="mt-2 text-sm text-gray-400">Ongoing projects</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-gray-800/30 p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Applications</h3>
                <p className="text-3xl font-bold text-purple-400">
                  {dashboardData.totalApplications}
                </p>
                <p className="mt-2 text-sm text-gray-400">Internship applications</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-gray-800/30 p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Submissions</h3>
                <p className="text-3xl font-bold text-amber-400">
                  {dashboardData.totalSubmissions}
                </p>
                <p className="mt-2 text-sm text-gray-400">Challenge solutions</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="col-span-2 rounded-xl border border-white/10 bg-gray-800/30 p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">Recent Activity</h3>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-3 rounded-lg bg-gray-800/50 p-3"
                    >
                      <div
                        className={`rounded-full p-2 ${
                          activity.type === 'submission'
                            ? 'bg-green-500/20 text-green-400'
                            : activity.type === 'application'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-purple-500/20 text-purple-400'
                        }`}
                      >
                        {activity.type === 'submission' ? (
                          <LucideUpload className="h-5 w-5" />
                        ) : activity.type === 'application' ? (
                          <LucideExternalLink className="h-5 w-5" />
                        ) : (
                          <LucideUpload className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-white">{activity.title}</p>
                        <p className="text-sm text-gray-400">
                          {activity.company} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-gray-800/30 p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Companies</span>
                    <span className="text-white">{dashboardData.activeCompanies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Upcoming Deadlines</span>
                    <span className="text-white">{dashboardData.upcomingDeadlines}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-white">68%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'internships' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="rounded-xl border border-white/10 bg-gray-800/30 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300">
                        {internship.company}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{internship.title}</h3>
                    <p className="mt-2 text-gray-300">{internship.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {internship.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">{internship.location}</p>
                    <p className="mt-2 text-sm text-gray-400">Posted</p>
                    <p className="text-white">{internship.postedDate}</p>
                    <p className="mt-2 text-sm text-gray-400">Applicants</p>
                    <p className="text-white">{internship.applicants}</p>
                    <a
                      href={internship.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Apply Now <LucideExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'challenges' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-xl border border-white/10 bg-gray-800/30 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300">
                        {challenge.company}
                      </span>
                      {challenge.available && (
                        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">
                          Available
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{challenge.title}</h3>
                    <p className="mt-2 text-gray-300">{challenge.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {challenge.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Reward</p>
                    <p className="text-white">{challenge.reward}</p>
                    <p className="mt-2 text-sm text-gray-400">Deadline</p>
                    <p className="text-white">{challenge.deadline}</p>
                    <p className="mt-2 text-sm text-gray-400">Submissions</p>
                    <p className="text-white">{challenge.submissions}</p>
                    <button
                      onClick={() => handleSubmitSolution(challenge)}
                      className="mt-4 inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Submit Solution <LucideUpload className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Solution Submission Popup */}
        {showSubmitPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Submit Solution for {selectedChallenge.company}: {selectedChallenge.title}
              </h3>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Solution Link (GitHub, CodeSandbox, etc.)
                </label>
                <input
                  type="text"
                  value={solutionLink}
                  onChange={(e) => setSolutionLink(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://github.com/yourusername/solution"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSubmitPopup(false)}
                  className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  disabled={!solutionLink}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Home>
  )
}
