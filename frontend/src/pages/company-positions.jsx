import { useState } from 'react'
import CompanyLayout from '../components/company/CompanyLayout'

export default function CompanyPositions() {
  const [showPostPositionModal, setShowPostPositionModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showRecommendedStudents, setShowRecommendedStudents] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [positions, setPositions] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Looking for a skilled frontend developer with experience in React and modern JavaScript.',
      location: 'Riyadh, Saudi Arabia',
      requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
      postedDate: '2023-10-15',
      applicants: 8
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      description: 'Seeking a talented ML engineer to work on cutting-edge AI projects for our clients.',
      location: 'Jeddah, Saudi Arabia',
      requiredSkills: ['Python', 'TensorFlow', 'AI/ML', 'Data Science'],
      postedDate: '2023-10-10',
      applicants: 5
    },
    {
      id: 3,
      title: 'Mobile App Developer',
      description: 'Join our team to build innovative mobile applications for iOS and Android platforms.',
      location: 'Riyadh, Saudi Arabia',
      requiredSkills: ['Mobile Development', 'React Native', 'Swift', 'Kotlin'],
      postedDate: '2023-10-05',
      applicants: 12
    }
  ])

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
    }
  ]

  const handlePostPosition = (newPosition) => {
    setPositions([...positions, { ...newPosition, id: positions.length + 1, applicants: 0 }])
    setShowPostPositionModal(false)
  }

  const handleViewRecommendedStudents = (position) => {
    setSelectedPosition(position)
    setShowRecommendedStudents(true)
  }

  const handleContactStudent = (student) => {
    setSelectedStudent(student)
    setShowContactModal(true)
  }

  // Find recommended students based on position requirements
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
      {/* Header Section */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-900/50 to-indigo-900/50 p-6">
        <h1 className="text-3xl font-bold text-white">Manage Positions</h1>
        <p className="mt-2 text-gray-300">Post new positions and find the perfect candidates for your team.</p>

        {/* Quick Actions */}
        <div className="mt-4">
          <button
            onClick={() => setShowPostPositionModal(true)}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Post New Position
          </button>
        </div>
      </div>

      {/* Positions List */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center text-xl font-semibold text-white">
          <svg
            className="mr-2 h-5 w-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Open Positions
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {positions.map((position) => (
            <div
              key={position.id}
              className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-green-500/30 hover:bg-white/10"
            >
              <h3 className="text-lg font-medium text-white">{position.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{position.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {position.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Location: {position.location}</p>
                  <p className="text-sm text-gray-500">
                    Posted: {new Date(position.postedDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {position.applicants} recommended students
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleViewRecommendedStudents(position)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700"
                >
                  View Recommended Students
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                    JavaScript
                  </span>
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    CSS
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
                    postedDate: new Date().toISOString().split('T')[0],
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

      {/* Recommended Students Modal */}
      {showRecommendedStudents && selectedPosition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-lg bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Recommended Students for {selectedPosition.title}
              </h2>
              <button
                onClick={() => setShowRecommendedStudents(false)}
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

            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">Position Details</h3>
              <p className="mt-1 text-sm text-gray-400">{selectedPosition.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedPosition.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="mb-4 text-lg font-medium text-white">Recommended Students</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {getRecommendedStudents(selectedPosition).map((student) => (
                <div
                  key={student.id}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-green-500/30 hover:bg-white/10"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="h-16 w-16 rounded-full ring-2 ring-green-500/30"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-white">{student.name}</h3>
                      <p className="text-sm text-gray-400">
                        {student.major} • {student.year}
                      </p>
                      <p className="text-sm text-gray-400">{student.location}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {student.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-full px-3 py-1 text-xs ${
                          selectedPosition.requiredSkills.includes(skill)
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                    {student.skills.length > 3 && (
                      <span className="rounded-full bg-gray-500/20 px-3 py-1 text-xs text-gray-400">
                        +{student.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-white">{student.rating}</span>
                      <span className="ml-2 text-xs text-gray-400">
                        {student.projects} projects
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleContactStudent(student)
                          setShowRecommendedStudents(false)
                        }}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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