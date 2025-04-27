import { useState, useEffect } from 'react'
import { Home } from './Home'
import api from '../services/api'
import { ACCESS_TOKEN } from '../constants'

export default function Suggestions() {
  const [activeTab, setActiveTab] = useState('projects')
  const [searchTerm, setSearchTerm] = useState('')
  const [userMajor, setUserMajor] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch user's major from the API
    const fetchUserMajor = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('user-major/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        })
        setUserMajor(response.data.major || '')
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching user major:', error)
        setIsLoading(false)
      }
    }

    fetchUserMajor()
  }, [])

  // Define project ideas based on major
  const getProjectIdeas = () => {
    const commonProjects = [
      {
        title: 'Personal Portfolio Website',
        description: 'Create a responsive portfolio to showcase your skills and projects.',
        difficulty: 'Beginner',
        tags: ['web', 'frontend'],
      },
      {
        title: 'Task Management App',
        description: 'Create a Kanban-style task manager with drag-and-drop functionality.',
        difficulty: 'Intermediate',
        tags: ['web', 'mobile', 'ui'],
      },
    ]

    switch (userMajor.toLowerCase()) {
      case 'computer science':
      case 'cs':
        return [
          ...commonProjects,
          {
            title: 'Algorithm Visualizer',
            description:
              'Build an interactive tool to visualize sorting and pathfinding algorithms.',
            difficulty: 'Intermediate',
            tags: ['algorithms', 'visualization', 'education'],
          },
          {
            title: 'Smart City Solution',
            description:
              'Develop a prototype for a smart city application addressing local urban challenges.',
            difficulty: 'Advanced',
            tags: ['iot', 'urban-planning', 'sustainability'],
          },
          {
            title: 'Arabic NLP Tool',
            description: 'Create a natural language processing tool optimized for Arabic text analysis.',
            difficulty: 'Advanced',
            tags: ['nlp', 'arabic', 'linguistics'],
          },
        ]
      case 'cybersecurity':
      case 'cyber':
        return [
          ...commonProjects,
          {
            title: 'Security Vulnerability Scanner',
            description:
              'Develop a tool to scan websites or applications for common security vulnerabilities.',
            difficulty: 'Intermediate',
            tags: ['security', 'web', 'scanning'],
          },
          {
            title: 'Critical Infrastructure Protection System',
            description:
              'Design a security monitoring solution for energy or water infrastructure.',
            difficulty: 'Advanced',
            tags: ['infrastructure', 'security', 'monitoring'],
          },
          {
            title: 'Secure Digital Identity Solution',
            description: 'Create a prototype for secure digital identity verification using blockchain.',
            difficulty: 'Advanced',
            tags: ['identity', 'blockchain', 'authentication'],
          },
        ]
      case 'artificial intelligence':
      case 'ai':
        return [
          ...commonProjects,
          {
            title: 'Arabic-Optimized Chatbot',
            description: 'Build a chatbot using natural language processing optimized for Arabic language.',
            difficulty: 'Advanced',
            tags: ['ai', 'nlp', 'arabic'],
          },
          {
            title: 'Desert Environment Monitoring System',
            description:
              'Develop an AI solution to monitor and analyze desert environmental conditions.',
            difficulty: 'Advanced',
            tags: ['computer-vision', 'environmental', 'sensors'],
          },
          {
            title: 'Smart Tourism Recommendation System',
            description:
              'Build a recommendation engine for tourists visiting Saudi heritage sites.',
            difficulty: 'Intermediate',
            tags: ['ml', 'tourism', 'recommendation'],
          },
        ]
      case 'computer information systems':
      case 'cis':
        return [
          ...commonProjects,
          {
            title: 'E-commerce Platform for Local Artisans',
            description:
              'Build a full-stack online marketplace for traditional Saudi crafts and products.',
            difficulty: 'Advanced',
            tags: ['web', 'fullstack', 'e-commerce'],
          },
          {
            title: 'Business Intelligence Dashboard for SMEs',
            description: 'Create a data visualization dashboard for small and medium Saudi enterprises.',
            difficulty: 'Intermediate',
            tags: ['data', 'visualization', 'business'],
          },
          {
            title: 'Hajj and Umrah Management System',
            description: 'Develop a system to help manage pilgrim logistics and services.',
            difficulty: 'Intermediate',
            tags: ['database', 'logistics', 'services'],
          },
        ]
      default:
        return [
          ...commonProjects,
          {
            title: 'Saudi Heritage Digital Archive',
            description:
              'Build a platform to digitally preserve and showcase Saudi cultural heritage.',
            difficulty: 'Intermediate',
            tags: ['web', 'cultural', 'archive'],
          },
          {
            title: 'Social Media Analytics Dashboard',
            description: 'Develop an analytics dashboard for tracking regional social media trends.',
            difficulty: 'Intermediate',
            tags: ['web', 'api', 'data'],
          },
          {
            title: 'Arabic-Optimized Chatbot',
            description: 'Build a chatbot using natural language processing optimized for Arabic language.',
            difficulty: 'Advanced',
            tags: ['ai', 'nlp', 'arabic'],
          },
        ]
    }
  }

  // Define career paths based on major
  const getCareerPaths = () => {
    const commonCareers = [
      {
        title: 'Full Stack Developer',
        description:
          'Handle both frontend and backend development, working across the entire web application stack.',
        skills: ['Frontend Tech', 'Backend Tech', 'DevOps', 'Architecture'],
      },
      {
        title: 'DevOps Engineer',
        description:
          'Manage infrastructure, deployment pipelines, and system administration using tools like Docker and Kubernetes.',
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Services'],
      },
    ]

    switch (userMajor.toLowerCase()) {
      case 'computer science':
      case 'cs':
        return [
          ...commonCareers,
          {
            title: 'Software Engineer',
            description:
              'Design and develop complex software systems and applications for Saudi government and private sector initiatives.',
            skills: ['Algorithms', 'Data Structures', 'System Design', 'Programming Languages'],
          },
          {
            title: 'Smart City Solutions Architect',
            description:
              'Design and oversee the implementation of smart city technologies aligned with Vision 2030.',
            skills: [
              'System Design',
              'IoT Architecture',
              'Technical Leadership',
              'Urban Planning',
            ],
          },
          {
            title: 'Research Scientist',
            description:
              'Conduct research at KAUST, KFUPM, or other Saudi research institutions to solve complex computing problems.',
            skills: [
              'Research Methods',
              'Academic Writing',
              'Theoretical CS',
              'Specialized Domain Knowledge',
            ],
          },
        ]
      case 'cybersecurity':
      case 'cyber':
        return [
          ...commonCareers,
          {
            title: 'National Security Analyst',
            description:
              'Monitor and analyze security threats to protect critical Saudi infrastructure and digital assets.',
            skills: ['Threat Analysis', 'Security Tools', 'Incident Response', 'Risk Assessment'],
          },
          {
            title: 'Penetration Tester',
            description:
              'Conduct authorized simulated attacks on computer systems to identify security vulnerabilities in Saudi organizations.',
            skills: [
              'Ethical Hacking',
              'Vulnerability Assessment',
              'Security Tools',
              'Social Engineering',
            ],
          },
          {
            title: 'Energy Sector Security Specialist',
            description:
              'Design secure systems and networks that protect Saudi energy infrastructure against cyber threats.',
            skills: [
              'Security Frameworks',
              'SCADA Security',
              'Identity Management',
              'Critical Infrastructure Protection',
            ],
          },
        ]
      case 'artificial intelligence':
      case 'ai':
        return [
          ...commonCareers,
          {
            title: 'Machine Learning Engineer',
            description:
              'Develop and implement machine learning models for Saudi organizations in healthcare, energy, and government sectors.',
            skills: ['Python', 'ML Frameworks', 'Data Processing', 'Model Deployment'],
          },
          {
            title: 'AI Research Scientist',
            description:
              'Conduct research at SDAIA, KAUST, or other Saudi institutions to advance AI capabilities.',
            skills: ['Deep Learning', 'Research Methods', 'Mathematics', 'NLP/Computer Vision'],
          },
          {
            title: 'Data Scientist',
            description:
              'Analyze and interpret complex data for Saudi organizations using statistical methods and machine learning.',
            skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'],
          },
        ]
      case 'computer information systems':
      case 'cis':
        return [
          ...commonCareers,
          {
            title: 'Digital Transformation Consultant',
            description:
              'Bridge the gap between IT and business needs for Saudi organizations undergoing digital transformation.',
            skills: [
              'Requirements Analysis',
              'Business Processes',
              'Change Management',
              'Communication',
            ],
          },
          {
            title: 'IT Project Manager',
            description:
              'Plan and oversee IT projects for Saudi government initiatives and private sector companies.',
            skills: ['Project Management', 'Agile/Scrum', 'Budgeting', 'Stakeholder Management'],
          },
          {
            title: 'E-Government Solutions Specialist',
            description:
              'Design and implement digital government services to improve citizen experience.',
            skills: ['Digital Services', 'User Experience', 'System Integration', 'Data Security'],
          },
        ]
      default:
        return [
          ...commonCareers,
          {
            title: 'Frontend Developer',
            description:
              'Create user interfaces and experiences for Saudi websites and applications using modern frameworks.',
            skills: ['HTML/CSS', 'JavaScript', 'React/Vue', 'UI/UX'],
          },
          {
            title: 'Backend Developer',
            description:
              'Work with server-side logic and databases for Saudi organizations and government services.',
            skills: ['Node.js/Python/Java', 'Databases', 'API Design', 'Security'],
          },
          {
            title: 'Data Scientist',
            description:
              'Analyze data for Saudi organizations to drive business decisions and improve services.',
            skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'],
          },
        ]
    }
  }

  // Define companies based on major
  const getCompanies = () => {
    const commonCompanies = [
      { name: 'Saudi Aramco', focus: 'Energy, Digital Transformation, AI', internships: true, logo: '🛢️' },
      {
        name: 'NEOM',
        focus: 'Smart City, Sustainability, Innovation',
        internships: true,
        logo: '🏙️',
      },
      { name: 'STC', focus: 'Telecommunications, Digital Services, Cloud', internships: true, logo: '📱' },
    ]

    switch (userMajor.toLowerCase()) {
      case 'computer science':
      case 'cs':
        return [
          ...commonCompanies,
          { name: 'SABIC', focus: 'Petrochemicals, Digital Transformation', internships: true, logo: '⚗️' },
          { name: 'Misk Foundation', focus: 'Youth Empowerment, Innovation', internships: true, logo: '🚀' },
          {
            name: 'SDAIA',
            focus: 'Data & AI, National Strategy, Smart Government',
            internships: true,
            logo: '🧠',
          },
          {
            name: 'KAUST',
            focus: 'Research, Innovation, Technology Development',
            internships: true,
            logo: '🔬',
          },
        ]
      case 'cybersecurity':
      case 'cyber':
        return [
          ...commonCompanies,
          {
            name: 'National Cybersecurity Authority',
            focus: 'National Security, Cyber Defense',
            internships: true,
            logo: '🔒',
          },
          {
            name: 'Saudi Aramco',
            focus: 'Energy Infrastructure Security, OT/IT Security',
            internships: true,
            logo: '🛢️',
          },
          {
            name: 'Elm',
            focus: 'Digital Security, Government Solutions',
            internships: true,
            logo: '🛡️',
          },
          {
            name: 'STC',
            focus: 'Telecommunications Security, Digital Infrastructure',
            internships: true,
            logo: '📱',
          },
        ]
      case 'artificial intelligence':
      case 'ai':
        return [
          ...commonCompanies,
          {
            name: 'SDAIA',
            focus: 'National AI Strategy, Data Analytics',
            internships: true,
            logo: '🧠',
          },
          {
            name: 'KAUST AI Initiative',
            focus: 'AI Research, Deep Learning, Computer Vision',
            internships: true,
            logo: '🔬',
          },
          {
            name: 'Noon',
            focus: 'E-commerce, AI Recommendations, Analytics',
            internships: true,
            logo: '🛒',
          },
          {
            name: 'Saudi Aramco Digital',
            focus: 'Energy AI, Predictive Maintenance, Optimization',
            internships: true,
            logo: '🛢️',
          },
        ]
      case 'computer information systems':
      case 'cis':
        return [
          ...commonCompanies,
          {
            name: 'Elm',
            focus: 'E-Government, Digital Solutions, Smart Services',
            internships: true,
            logo: '💼',
          },
          {
            name: 'Al Rajhi Bank',
            focus: 'Fintech, Digital Banking, Business Intelligence',
            internships: true,
            logo: '🏦',
          },
          {
            name: 'Tamkeen Technologies',
            focus: 'Government Digital Transformation, IT Services',
            internships: true,
            logo: '⚙️',
          },
          {
            name: 'Thiqah',
            focus: 'Business Services, Digital Solutions',
            internships: true,
            logo: '📊',
          },
        ]
      default:
        return [
          { name: 'Saudi Aramco', focus: 'Energy, Digital Transformation, AI', internships: true, logo: '🛢️' },
          {
            name: 'NEOM',
            focus: 'Smart City, Sustainability, Innovation',
            internships: true,
            logo: '🏙️',
          },
          {
            name: 'STC',
            focus: 'Telecommunications, Digital Services, Cloud',
            internships: true,
            logo: '📱',
          },
          { name: 'SABIC', focus: 'Petrochemicals, Digital Transformation', internships: true, logo: '⚗️' },
          { name: 'Misk Foundation', focus: 'Youth Empowerment, Innovation', internships: true, logo: '🚀' },
          {
            name: 'Noon',
            focus: 'E-commerce, Logistics, Digital Marketplace',
            internships: true,
            logo: '🛒',
          },
          {
            name: 'Tawuniya',
            focus: 'Insurance, Digital Services, Data Analytics',
            internships: true,
            logo: '🔰',
          },
        ]
    }
  }

  // Define resources based on major
  const getResources = () => {
    const commonResources = [
      {
        name: 'Saudi Digital Academy',
        type: 'Learning Platform',
        url: 'https://sda.edu.sa/',
        icon: '🎓',
      },
      {
        name: 'Misk Skills',
        type: 'Skills Development',
        url: 'https://misk.org.sa/',
        icon: '🎒',
      },
    ]

    switch (userMajor.toLowerCase()) {
      case 'computer science':
      case 'cs':
        return [
          ...commonResources,
          { name: 'Saudi Codes', type: 'Coding Initiative', url: 'https://saudicodes.org/', icon: '💻' },
          {
            name: 'KAUST Open Courses',
            type: 'Academic Resources',
            url: 'https://www.kaust.edu.sa/',
            icon: '🏛️',
          },
          {
            name: 'Duroob Platform',
            type: 'E-learning',
            url: 'https://www.duroob.sa/',
            icon: '📚',
          },
          {
            name: 'Saudi Tech Community',
            type: 'Developer Network',
            url: 'https://developer.sa/',
            icon: '👨‍💻',
          },
        ]
      case 'cybersecurity':
      case 'cyber':
        return [
          ...commonResources,
          {
            name: 'National Cybersecurity Authority Resources',
            type: 'Security Guidelines',
            url: 'https://nca.gov.sa/',
            icon: '🔐',
          },
          {
            name: 'Saudi Federation for Cybersecurity',
            type: 'Training & Certification',
            url: 'https://safcsp.org.sa/',
            icon: '🛡️',
          },
          {
            name: 'Cyber Security Education Initiative',
            type: 'Educational Resources',
            url: 'https://hemaya.sa/',
            icon: '📚',
          },
          {
            name: 'Saudi CERT',
            type: 'Security Alerts & Guidance',
            url: 'https://cert.gov.sa/',
            icon: '🔔',
          },
        ]
      case 'artificial intelligence':
      case 'ai':
        return [
          ...commonResources,
          {
            name: 'SDAIA Academy',
            type: 'AI Training',
            url: 'https://academy.sdaia.gov.sa/',
            icon: '🧠',
          },
          {
            name: 'Thakaa Center',
            type: 'AI Research & Resources',
            url: 'https://thakaa.sa/',
            icon: '🤖',
          },
          {
            name: 'KAUST AI Initiative',
            type: 'Research & Innovation',
            url: 'https://ai.kaust.edu.sa/',
            icon: '🔬',
          },
          {
            name: 'Saudi Data Community',
            type: 'Data Science Network',
            url: 'https://saudidevorg.github.io/community/',
            icon: '📊',
          },
        ]
      case 'computer information systems':
      case 'cis':
        return [
          ...commonResources,
          {
            name: 'Digital Government Authority',
            type: 'E-Government Resources',
            url: 'https://dga.gov.sa/',
            icon: '🏛️',
          },
          {
            name: 'Yesser E-Government Program',
            type: 'Digital Transformation',
            url: 'https://www.yesser.gov.sa/',
            icon: '⚙️',
          },
          {
            name: 'Saudi Digital Library',
            type: 'Academic Resources',
            url: 'https://portal.sdl.edu.sa/',
            icon: '📚',
          },
          {
            name: 'Monshaat Tech Resources',
            type: 'SME Digital Solutions',
            url: 'https://www.monshaat.gov.sa/',
            icon: '💼',
          },
        ]
      default:
        return [
          {
            name: 'Saudi Digital Academy',
            type: 'Learning Platform',
            url: 'https://sda.edu.sa/',
            icon: '🎓',
          },
          {
            name: 'Misk Skills',
            type: 'Skills Development',
            url: 'https://misk.org.sa/',
            icon: '🎒',
          },
          {
            name: 'Duroob Platform',
            type: 'E-learning',
            url: 'https://www.duroob.sa/',
            icon: '📚',
          },
          {
            name: 'Udacity-MCIT Scholarship',
            type: 'Tech Scholarships',
            url: 'https://www.udacity.com/mena-scholarship',
            icon: '🎯',
          },
          {
            name: 'Saudi Digital Library',
            type: 'Academic Resources',
            url: 'https://portal.sdl.edu.sa/',
            icon: '📖',
          },
          {
            name: 'Maharah Platform',
            type: 'Skills Development',
            url: 'https://maharah.hrc.gov.sa/',
            icon: '👨‍💻',
          },
        ]
    }
  }

  const filteredContent = () => {
    switch (activeTab) {
      case 'projects':
        return getProjectIdeas().filter(
          (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tags.some((tag) => tag.includes(searchTerm.toLowerCase()))
        )
      case 'careers':
        return getCareerPaths().filter(
          (career) =>
            career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            career.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      case 'companies':
        return getCompanies().filter(
          (company) =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.focus.toLowerCase().includes(searchTerm.toLowerCase())
        )
      case 'resources':
        return getResources().filter(
          (resource) =>
            resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      default:
        return []
    }
  }

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
        </div>
      )
    }

    const filtered = filteredContent()

    switch (activeTab) {
      case 'projects':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.length > 0 ? (
              filtered.map((project, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 opacity-70 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20"></div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mb-4 text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-700/60 px-3 py-1 text-sm text-white backdrop-blur-sm">
                      {project.difficulty}
                    </span>
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-gray-700/40 px-3 py-1 text-sm text-gray-300 backdrop-blur-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 rounded-xl border border-white/10 bg-gray-800/30 p-8 text-center text-gray-300">
                No project ideas match your search. Try different keywords.
              </div>
            )}
          </div>
        )
      case 'careers':
        return (
          <div className="space-y-6">
            {filtered.length > 0 ? (
              filtered.map((career, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg transition-all duration-300 hover:shadow-lg"
                >
                  <h3 className="mb-3 text-xl font-semibold text-white">{career.title}</h3>
                  <p className="mb-4 text-gray-300">{career.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <h4 className="mr-2 text-sm font-medium text-gray-300">Key Skills:</h4>
                    {career.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-blue-500/40 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 px-3 py-1 text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-white/10 bg-gray-800/30 p-8 text-center text-gray-300">
                No career paths match your search. Try different keywords.
              </div>
            )}
          </div>
        )
      case 'companies':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((company, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700/60 text-2xl">
                      {company.logo}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                  </div>
                  <p className="mb-3 text-gray-300">{company.focus}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Internships:</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${company.internships ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}
                    >
                      {company.internships ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 rounded-xl border border-white/10 bg-gray-800/30 p-8 text-center text-gray-300">
                No companies match your search. Try different keywords.
              </div>
            )}
          </div>
        )
      case 'resources':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700/60 text-2xl">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{resource.name}</h3>
                  </div>
                  <p className="text-gray-300">{resource.type}</p>
                  <div className="mt-4 text-sm text-gray-400 underline-offset-2 group-hover:underline">
                    Visit resource →
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-3 rounded-xl border border-white/10 bg-gray-800/30 p-8 text-center text-gray-300">
                No resources match your search. Try different keywords.
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Home>
      <div className="mx-auto flex h-full max-w-6xl flex-col rounded-2xl border border-white/10 bg-black/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">Career Compass</h1>
          <p className="text-gray-400">
            Discover opportunities to grow your skills and advance your career
          </p>
          {userMajor && (
            <p className="mt-2 text-purple-400">
              Personalized suggestions for {userMajor} students
            </p>
          )}
        </div>

        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {['projects', 'careers', 'companies', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-2 font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2 pl-10 text-white placeholder-gray-500 outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent flex-1 overflow-y-auto pr-2">
          {renderTabContent()}
        </div>
      </div>
    </Home>
  )
}
