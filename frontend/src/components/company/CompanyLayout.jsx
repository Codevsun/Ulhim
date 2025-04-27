import { useState } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../feed/nav-bar'
import { useNavigate } from 'react-router-dom'

// Company Profile Card Component
function CompanyProfileCard() {
  // Mock company data - in a real app, this would come from an API
  const company = {
    name: 'TechInnovate',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=TechInnovate',
    industry: 'Technology',
    location: 'Riyadh, Saudi Arabia',
    stats: {
      challenges_posted: 12,
      students_contacted: 45,
      active_challenges: 3,
    },
  }

  return (
    <div className="mt-4 transform rounded-2xl bg-gray-900/20 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-gray-800/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
      <div className="flex items-center gap-3">
        <img
          src={company.logo}
          alt="Company Logo"
          className="h-12 w-12 rounded-full ring-2 ring-blue-500/30 transition-all duration-300"
        />
        <div>
          <h3 className="text-white">{company.name}</h3>
          <p className="text-sm text-gray-500">{company.industry}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div className="text-center transition-all duration-300 hover:-translate-y-1 hover:transform">
          <div className="font-medium text-white">{company.stats.challenges_posted}</div>
          <div className="text-gray-500">Challenges</div>
        </div>
        <div className="text-center transition-all duration-300 hover:-translate-y-1 hover:transform">
          <div className="font-medium text-white">{company.stats.students_contacted}</div>
          <div className="text-gray-500">Students</div>
        </div>
        <div className="text-center transition-all duration-300 hover:-translate-y-1 hover:transform">
          <div className="font-medium text-white">{company.stats.active_challenges}</div>
          <div className="text-gray-500">Active</div>
        </div>
      </div>
    </div>
  )
}

// Company Navigation Menu Component
function CompanyNavigationMenu() {
  const navigate = useNavigate()
  const [activeTab] = useState('dashboard')

  return (
    <div className="rounded-2xl bg-gray-900/20 p-6">
      <div className="space-y-1">
        <button
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-gray-300 hover:bg-white/5`}
          onClick={() => navigate('/company-dashboard')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Dashboard
        </button>
        <button
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 ${
            activeTab === 'challenges'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-300 hover:bg-white/5'
          }`}
          onClick={() => navigate('/company-challenge')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
          Challenges
        </button>
        <button
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 ${
            activeTab === 'positions'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-300 hover:bg-white/5'
          }`}
          onClick={() => navigate('/company-positions')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
            />
          </svg>
          Positions
        </button>
        <button
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 ${
            activeTab === 'talent'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-300 hover:bg-white/5'
          }`}
          onClick={() => navigate('/company-talent-pool')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          Talent Pool
        </button>
        <button
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 ${
            activeTab === 'messages'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-300 hover:bg-white/5'
          }`}
          onClick={() => navigate('/company-messages')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-6 7.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-6-15a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM8.625 19.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM8.625 4.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 8.625a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 7.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0-7.5a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Messages
        </button>
        <button
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 ${
            activeTab === 'settings'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-300 hover:bg-white/5'
          }`}
          onClick={() => navigate('/company-settings')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </button>
      </div>
    </div>
  )
}

// Company Additional Navigation Menu Component
function CompanyAdditionalNavigationMenu() {
  const [showHelpModal, setShowHelpModal] = useState(false)

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal)
  }

  return (
    <div className="rounded-2xl bg-gray-900/20 p-6">
      <div className="space-y-1">
        <div className="relative">
          <button
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

          {/* Help Modal */}
          {showHelpModal && (
            <div className="absolute bottom-full left-0 z-50 mb-2 w-64">
              <div className="rounded-lg border border-white/10 bg-black shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 p-2">
                  <h3 className="text-xs font-medium text-white">Company Help</h3>
                  <button
                    onClick={toggleHelpModal}
                    className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 p-2">
                  <div className="rounded border border-white/5 bg-white/5 p-1.5">
                    <h4 className="text-xs font-medium text-purple-400">
                      How do I post a challenge?
                    </h4>
                    <p className="text-xs text-gray-300">
                      Go to Dashboard → Click &quot;Post New Challenge&quot; → Fill details → Post
                    </p>
                  </div>

                  <div className="rounded border border-white/5 bg-white/5 p-1.5">
                    <h4 className="text-xs font-medium text-purple-400">
                      How do I contact students?
                    </h4>
                    <p className="text-xs text-gray-300">
                      Browse Talent Pool → Click on a student → Click &quot;Contact&quot; → Send
                      message
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

        <button
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-gray-300 hover:bg-white/5"
          onClick={() => {
            localStorage.clear()
            window.location.href = '/signin'
          }}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

// Company Right Sidebar Component
function CompanyRightSidebar() {
  // Mock data for recommended students
  const recommendedStudents = [
    {
      id: 1,
      name: 'Ahmed Al-Farsi',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      major: 'Computer Science',
      skills: ['AI/ML', 'Python', 'Data Science'],
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Fatima Khalid',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      major: 'Software Engineering',
      skills: ['Mobile Development', 'UI/UX', 'React Native'],
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Omar Saeed',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
      major: 'Information Systems',
      skills: ['Web Development', 'Database Design', 'Node.js'],
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Layla Mahmoud',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla',
      major: 'Cybersecurity',
      skills: ['Network Security', 'Ethical Hacking', 'Cryptography'],
      rating: 4.7,
    },
    {
      id: 5,
      name: 'Khalid Al-Harbi',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid',
      major: 'Data Science',
      skills: ['Data Analysis', 'Machine Learning', 'R'],
      rating: 4.5,
    },
  ]

  return (
    <div className="m-2 w-[300px] space-y-6">
      <div className="rounded-2xl bg-gray-900/20 p-6">
        <h3 className="mb-4 text-lg font-medium text-white">Recommended Students</h3>
        <div className="space-y-4">
          {recommendedStudents.map((student) => (
            <div
              key={student.id}
              className="group flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-10 w-10 rounded-full ring-2 ring-blue-500/30"
                />
                <div>
                  <h4 className="text-sm font-medium text-white">{student.name}</h4>
                  <p className="text-xs text-gray-400">{student.major}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-white">{student.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gray-900/20 p-6">
        <h3 className="mb-4 text-lg font-medium text-white">Recent Activity</h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-white/5 bg-white/5 p-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <p className="text-sm text-gray-300">
                New student applied to AI-Powered Sustainability Tracker
              </p>
            </div>
            <p className="mt-1 text-xs text-gray-500">2 hours ago</p>
          </div>

          <div className="rounded-lg border border-white/5 bg-white/5 p-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-400"></div>
              <p className="text-sm text-gray-300">You contacted Fatima Khalid</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">Yesterday</p>
          </div>

          <div className="rounded-lg border border-white/5 bg-white/5 p-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-400"></div>
              <p className="text-sm text-gray-300">
                Smart Campus Navigation System challenge completed
              </p>
            </div>
            <p className="mt-1 text-xs text-gray-500">3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Company Layout Component
export default function CompanyLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Top Navigation Bar */}
      <NavBar />

      <div className="flex pt-16">
        {/* Left Sidebar */}
        <div className="m-2 w-[280px] space-y-8">
          {/* Company Profile Section */}
          <CompanyProfileCard />

          {/* Company Navigation Menu */}
          <CompanyNavigationMenu />

          {/* Help and Logout Section */}
          <CompanyAdditionalNavigationMenu />
        </div>

        {/* Main Content */}
        <div className="m-2 flex-1 rounded-2xl bg-gray-900/20 p-6">{children}</div>

        {/* Right Sidebar */}
        <CompanyRightSidebar />
      </div>
    </div>
  )
}

CompanyLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
