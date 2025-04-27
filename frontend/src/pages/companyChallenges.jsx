import { useState } from 'react'
import CompanyLayout from '../components/company/CompanyLayout'

export default function CompanyChallenges() {
  const [challenges, setChallenge] = useState([
    {
      id: 1,
      title: 'AI-Powered Sustainability Tracker',
      description:
        'Develop an AI solution that helps track and reduce carbon footprint on university campuses.',
      reward: '10,000 SAR',
      deadline: '2023-12-15',
      skills: ['AI/ML', 'Mobile Development', 'Data Analysis'],
      applicants: 12,
      status: 'active',
      solutions: [
        {
          id: 1,
          studentName: 'Ahmed Al-Farsi',
          studentImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
          submissionDate: '2023-11-20',
          description:
            'A mobile app that uses machine learning to analyze campus energy usage patterns and suggest optimizations.',
          status: 'pending',
        },
        {
          id: 2,
          studentName: 'Fatima Khalid',
          studentImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
          submissionDate: '2023-11-18',
          description:
            'An IoT-based solution that monitors energy consumption in real-time and provides actionable insights.',
          status: 'pending',
        },
      ],
    },
    {
      id: 2,
      title: 'Smart Campus Navigation System',
      description: 'Create an accessible indoor navigation system for students with disabilities.',
      reward: '8,500 SAR',
      deadline: '2023-11-30',
      skills: ['IoT', 'Mobile Development', 'Accessibility'],
      applicants: 8,
      status: 'active',
      solutions: [],
    },
    {
      id: 3,
      title: 'Student Mental Health Platform',
      description:
        'Design a platform that connects students with mental health resources and support.',
      reward: '7,000 SAR',
      deadline: '2023-10-20',
      skills: ['UI/UX', 'Web Development', 'Psychology'],
      applicants: 15,
      status: 'completed',
      solutions: [
        {
          id: 3,
          studentName: 'Omar Saeed',
          studentImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
          submissionDate: '2023-10-15',
          description:
            'A web platform with anonymous peer support groups and professional resources.',
          status: 'selected',
        },
      ],
    },
  ])

  const [showAddChallengeModal, setShowAddChallengeModal] = useState(false)
  const [showSolutionsModal, setShowSolutionsModal] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [showSolutionDetailModal, setShowSolutionDetailModal] = useState(false)
  const [selectedSolution, setSelectedSolution] = useState(null)

  const handleAddChallenge = (newChallenge) => {
    setChallenge([
      ...challenges,
      {
        ...newChallenge,
        id: challenges.length + 1,
        applicants: 0,
        status: 'active',
        solutions: [],
      },
    ])
    setShowAddChallengeModal(false)
  }

  const handleViewSolutions = (challenge) => {
    setSelectedChallenge(challenge)
    setShowSolutionsModal(true)
  }

  const handleViewSolutionDetail = (solution) => {
    setSelectedSolution(solution)
    setShowSolutionDetailModal(true)
  }

  const handleSelectSolution = (challengeId, solutionId) => {
    setChallenge(
      challenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return {
            ...challenge,
            status: 'completed',
            solutions: challenge.solutions.map((solution) => ({
              ...solution,
              status: solution.id === solutionId ? 'selected' : 'rejected',
            })),
          }
        }
        return challenge
      })
    )
    setShowSolutionDetailModal(false)
    setShowSolutionsModal(false)
  }

  return (
    <CompanyLayout>
      {/* Header Section */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-900/50 to-indigo-900/50 p-6">
        <h1 className="text-3xl font-bold text-white">Challenge Management</h1>
        <p className="mt-2 text-gray-300">Create and manage innovation challenges for students.</p>

        <div className="mt-4">
          <button
            onClick={() => setShowAddChallengeModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Post New Challenge
          </button>
        </div>
      </div>

      {/* Challenges List */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">Your Challenges</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`rounded-lg border p-5 transition-all duration-300 hover:bg-white/10 ${
                challenge.status === 'active'
                  ? 'border-blue-500/30 bg-blue-900/20'
                  : 'border-green-500/30 bg-green-900/20'
              }`}
            >
              <div className="flex justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    challenge.status === 'active'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {challenge.status === 'active' ? 'Active' : 'Completed'}
                </span>
                <span className="text-sm text-gray-400">Deadline: {challenge.deadline}</span>
              </div>

              <h3 className="mt-3 text-lg font-medium text-white">{challenge.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{challenge.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {challenge.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-white">{challenge.reward}</span> reward
                </div>
                <div className="text-sm text-gray-400">{challenge.solutions.length} solutions</div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleViewSolutions(challenge)}
                  className={`rounded-lg px-4 py-2 text-sm text-white transition-colors ${
                    challenge.solutions.length > 0
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'cursor-not-allowed bg-gray-600'
                  }`}
                  disabled={challenge.solutions.length === 0}
                >
                  View Solutions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Challenge Modal */}
      {showAddChallengeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Post New Challenge</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Challenge Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter challenge title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Description</label>
                <textarea
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  rows="4"
                  placeholder="Describe your challenge"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Reward Amount (SAR)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter reward amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Deadline</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Required Skills</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-400">
                    AI/ML
                  </span>
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-400">
                    Mobile Development
                  </span>
                  <button className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400 hover:bg-white/10">
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowAddChallengeModal(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleAddChallenge({
                    title: 'New Innovation Challenge',
                    description: 'This is a new challenge for students to solve.',
                    reward: '5,000 SAR',
                    deadline: '2024-01-31',
                    skills: ['AI/ML', 'Mobile Development'],
                  })
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Post Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Solutions Modal */}
      {showSolutionsModal && selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Solutions for: {selectedChallenge.title}
              </h2>
              <button
                onClick={() => setShowSolutionsModal(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white"
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

            <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-medium text-white">Challenge Details</h3>
              <p className="mt-2 text-sm text-gray-400">{selectedChallenge.description}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-white">{selectedChallenge.reward}</span> reward
                </div>
                <div className="text-sm text-gray-400">
                  Deadline:{' '}
                  <span className="font-medium text-white">{selectedChallenge.deadline}</span>
                </div>
                <div className="text-sm text-gray-400">
                  Status:{' '}
                  <span
                    className={`font-medium ${selectedChallenge.status === 'active' ? 'text-blue-400' : 'text-green-400'}`}
                  >
                    {selectedChallenge.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>

            {selectedChallenge.solutions.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <p className="text-gray-400">No solutions submitted yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {selectedChallenge.solutions.map((solution) => (
                  <div
                    key={solution.id}
                    className={`rounded-lg border p-4 transition-all duration-300 hover:bg-white/10 ${
                      solution.status === 'pending'
                        ? 'border-blue-500/30 bg-blue-900/10'
                        : solution.status === 'selected'
                          ? 'border-green-500/30 bg-green-900/10'
                          : 'border-red-500/30 bg-red-900/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={solution.studentImage}
                          alt={solution.studentName}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-white">{solution.studentName}</h3>
                          <p className="text-xs text-gray-400">
                            Submitted on {solution.submissionDate}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          solution.status === 'pending'
                            ? 'bg-blue-500/20 text-blue-400'
                            : solution.status === 'selected'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {solution.status === 'pending'
                          ? 'Pending Review'
                          : solution.status === 'selected'
                            ? 'Selected'
                            : 'Rejected'}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-400">{solution.description}</p>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleViewSolutionDetail(solution)}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-700"
                        disabled={solution.status !== 'pending'}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Solution Detail Modal */}
      {showSolutionDetailModal && selectedSolution && selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-lg bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Solution Details</h2>
              <button
                onClick={() => setShowSolutionDetailModal(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white"
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

            <div className="mb-6 flex items-center gap-4">
              <img
                src={selectedSolution.studentImage}
                alt={selectedSolution.studentName}
                className="h-16 w-16 rounded-full ring-2 ring-indigo-500/30"
              />
              <div>
                <h3 className="text-lg font-medium text-white">{selectedSolution.studentName}</h3>
                <p className="text-sm text-gray-400">
                  Submitted on {selectedSolution.submissionDate}
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-medium text-white">Solution Description</h3>
              <p className="mt-2 text-gray-400">{selectedSolution.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-white">Attachments</h3>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-white">project_proposal.pdf</p>
                    <p className="text-xs text-gray-400">2.4 MB</p>
                  </div>
                  <button className="ml-auto rounded-lg bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSolutionDetailModal(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
              >
                Close
              </button>
              <button
                onClick={() => handleSelectSolution(selectedChallenge.id, selectedSolution.id)}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Select This Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </CompanyLayout>
  )
}
