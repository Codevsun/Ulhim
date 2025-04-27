import { useState } from 'react'
import CompanyLayout from '../components/company/CompanyLayout'
import { motion } from 'framer-motion'
import { LucideUpload, LucideExternalLink } from 'lucide-react'

export default function CompanyDashboard() {
  const [showPostChallengeModal, setShowPostChallengeModal] = useState(false)
  const [showPostPositionModal, setShowPostPositionModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [activeFilter] = useState('all')
  const [favoriteStudents, setFavoriteStudents] = useState([])
  const [positions, setPositions] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      description:
        'Looking for a skilled frontend developer with experience in React and modern JavaScript.',
      location: 'Riyadh, Saudi Arabia',
      requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
      postedDate: '2023-10-15',
      applicants: 8,
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      description:
        'Seeking a talented ML engineer to work on cutting-edge AI projects for our clients.',
      location: 'Jeddah, Saudi Arabia',
      requiredSkills: ['Python', 'TensorFlow', 'AI/ML', 'Data Science'],
      postedDate: '2023-10-10',
      applicants: 5,
    },
    {
      id: 3,
      title: 'Mobile App Developer',
      description:
        'Join our team to build innovative mobile applications for iOS and Android platforms.',
      location: 'Riyadh, Saudi Arabia',
      requiredSkills: ['Mobile Development', 'React Native', 'Swift', 'Kotlin'],
      postedDate: '2023-10-05',
      applicants: 12,
    },
  ])
  const [setSelectedPosition] = useState(null)
  const [setShowRecommendedStudents] = useState(false)

  // Mock data for dashboard
  const dashboardData = {
    totalInternships: 12,
    totalChallenges: 8,
    totalApplications: 45,
    totalSubmissions: 32,
    activeCompanies: 24,
    upcomingDeadlines: 5,
    recentActivity: [
      {
        id: 1,
        type: 'submission',
        title: 'AI Challenge Solution',
        company: 'TechInnovate',
        time: '2 hours ago',
      },
      {
        id: 2,
        type: 'application',
        title: 'Frontend Developer Internship',
        company: 'TechInnovate',
        time: '5 hours ago',
      },
      {
        id: 3,
        type: 'submission',
        title: 'Mobile App Challenge',
        company: 'TechInnovate',
        time: '1 day ago',
      },
      {
        id: 4,
        type: 'application',
        title: 'Data Science Internship',
        company: 'TechInnovate',
        time: '2 days ago',
      },
    ],
  }

  // Mock data for challenges
  const challenges = [
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
    },
  ]

  // Mock data for students
  const students = [
    {
      id: 1,
      name: 'Ahmed Al-Farsi',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      location: 'Riyadh',
      major: 'Computer Science',
      year: 'Senior',
      skills: ['AI/ML', 'Python', 'Data Science', 'Cloud Computing'],
      rating: 4.8,
      projects: 12,
      bio: 'Passionate about AI and machine learning with experience in developing predictive models.',
    },
    {
      id: 2,
      name: 'Fatima Khalid',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      location: 'Jeddah',
      major: 'Software Engineering',
      year: 'Junior',
      skills: ['Mobile Development', 'UI/UX', 'React Native', 'JavaScript'],
      rating: 4.9,
      projects: 8,
      bio: 'Mobile app developer with a keen eye for design and user experience.',
    },
    {
      id: 3,
      name: 'Omar Saeed',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
      location: 'Dammam',
      major: 'Information Systems',
      year: 'Senior',
      skills: ['Web Development', 'Database Design', 'Node.js', 'MongoDB'],
      rating: 4.6,
      projects: 15,
      bio: 'Full-stack developer specializing in scalable web applications and database architecture.',
    },
    {
      id: 4,
      name: 'Layla Mahmoud',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla',
      location: 'Riyadh',
      major: 'Cybersecurity',
      year: 'Graduate',
      skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Python'],
      rating: 4.7,
      projects: 10,
      bio: 'Cybersecurity specialist with experience in penetration testing and security audits.',
    },
    {
      id: 5,
      name: 'Khalid Al-Harbi',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid',
      location: 'Jeddah',
      major: 'Data Science',
      year: 'Senior',
      skills: ['Data Analysis', 'Machine Learning', 'R', 'Tableau'],
      rating: 4.5,
      projects: 9,
      bio: 'Data scientist with a focus on extracting actionable insights from complex datasets.',
    },
    {
      id: 6,
      name: 'Sara Al-Qahtani',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
      location: 'Riyadh',
      major: 'Computer Engineering',
      year: 'Senior',
      skills: ['React', 'JavaScript', 'CSS', 'HTML', 'UI/UX'],
      rating: 4.7,
      projects: 11,
      bio: 'Frontend developer passionate about creating beautiful and responsive user interfaces.',
    },
    {
      id: 7,
      name: 'Mohammed Al-Otaibi',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed',
      location: 'Dammam',
      major: 'Software Engineering',
      year: 'Graduate',
      skills: ['Python', 'TensorFlow', 'AI/ML', 'Data Science', 'Computer Vision'],
      rating: 4.9,
      projects: 14,
      bio: 'AI researcher specializing in computer vision and deep learning applications.',
    },
    {
      id: 8,
      name: 'Nora Al-Shammari',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nora',
      location: 'Jeddah',
      major: 'Mobile Application Development',
      year: 'Junior',
      skills: ['Mobile Development', 'React Native', 'Swift', 'Kotlin', 'UI/UX'],
      rating: 4.6,
      projects: 7,
      bio: 'Mobile developer with experience in both iOS and Android platforms.',
    },
  ]

  // Filter students based on active filter
  // eslint-disable-next-line no-unused-vars
  const filteredStudents =
    activeFilter === 'all'
      ? students
      : activeFilter === 'favorites'
        ? students.filter((student) => favoriteStudents.includes(student.id))
        : students.filter((student) => student.skills.includes(activeFilter))

  // eslint-disable-next-line no-unused-vars
  const toggleFavorite = (studentId) => {
    setFavoriteStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    )
  }

  // eslint-disable-next-line no-unused-vars
  const handleContactStudent = (student) => {
    setSelectedStudent(student)
    setShowContactModal(true)
  }

  const handlePostPosition = (newPosition) => {
    setPositions([...positions, { ...newPosition, id: positions.length + 1, applicants: 0 }])
    setShowPostPositionModal(false)
  }

  // eslint-disable-next-line no-unused-vars
  const handleViewRecommendedStudents = (position) => {
    setSelectedPosition(position)
    setShowRecommendedStudents(true)
  }

  // Find recommended students based on position requirements
  // eslint-disable-next-line no-unused-vars
  const getRecommendedStudents = (position) => {
    if (!position) return []

    return students
      .filter((student) => {
        // Check if student has at least 2 of the required skills
        const matchingSkills = student.skills.filter((skill) =>
          position.requiredSkills.includes(skill)
        )
        return matchingSkills.length >= 2
      })
      .sort((a, b) => {
        // Sort by number of matching skills (descending)
        const aMatchingSkills = a.skills.filter((skill) =>
          position.requiredSkills.includes(skill)
        ).length
        const bMatchingSkills = b.skills.filter((skill) =>
          position.requiredSkills.includes(skill)
        ).length
        return bMatchingSkills - aMatchingSkills
      })
  }

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Company Dashboard</h1>
          <div className="flex space-x-2">
            <button onClick={() => {}} className="rounded-lg bg-gray-800 px-4 py-2 text-gray-300 hover:bg-gray-700">
              Overview
            </button>
            <button
              onClick={() => {}}
              className="rounded-lg bg-gray-800 px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              Positions
            </button>
            <button
              onClick={() => {}}
              className="rounded-lg bg-gray-800 px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              Applicants
            </button>
            <button
              onClick={() => {}}
              className="rounded-lg bg-gray-800 px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              Talent Pool
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-gray-800/30 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Open Positions</h3>
              <p className="text-3xl font-bold text-blue-400">{positions.length}</p>
              <p className="mt-2 text-sm text-gray-400">Active job listings</p>
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
              <p className="mt-2 text-sm text-gray-400">Received applications</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-gray-800/30 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Submissions</h3>
              <p className="text-3xl font-bold text-amber-400">{dashboardData.totalSubmissions}</p>
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
                  <span className="text-gray-400">Upcoming Deadlines</span>
                  <span className="text-white">{dashboardData.upcomingDeadlines}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shortlisted Candidates</span>
                  <span className="text-white">{favoriteStudents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Challenges</span>
                  <span className="text-white">{challenges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Application Rate</span>
                  <span className="text-white">8.3 per challenge</span>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setShowPostChallengeModal(true)}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
                  >
                    Post New Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Post Challenge Modal */}
      {showPostChallengeModal && (
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
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                    React
                  </span>
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                    Node.js
                  </span>
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                    MongoDB
                  </span>
                  <button className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400 hover:bg-white/10">
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowPostChallengeModal(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPostChallengeModal(false)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Post Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Position Modal */}
      {showPostPositionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Post New Position</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Position Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                  placeholder="Enter position title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Description</label>
                <textarea
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                  rows="4"
                  placeholder="Describe the position and responsibilities"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                  placeholder="Enter job location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Required Skills</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    React
                  </span>
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    Node.js
                  </span>
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    MongoDB
                  </span>
                  <button className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400 hover:bg-white/10">
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowPostPositionModal(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would get values from form inputs
                  handlePostPosition({
                    title: 'Frontend Developer',
                    description:
                      'Looking for a skilled frontend developer with experience in React and modern JavaScript.',
                    location: 'Riyadh, Saudi Arabia',
                    requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
                    postedDate: new Date().toISOString(),
                  })
                }}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Post Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Student Modal */}
      {showContactModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Student</h2>
            <div className="mb-4 flex items-center gap-4">
              <img
                src={selectedStudent.image}
                alt={selectedStudent.name}
                className="h-16 w-16 rounded-full ring-2 ring-blue-500/30"
              />
              <div>
                <h3 className="text-lg font-medium text-white">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-400">
                  {selectedStudent.major} • {selectedStudent.year}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Message</label>
              <textarea
                className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                rows="4"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowContactModal(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowContactModal(false)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </CompanyLayout>
  )
}
