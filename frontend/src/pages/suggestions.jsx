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
            title: 'Compiler Design Project',
            description:
              'Create a simple compiler or interpreter for a custom programming language.',
            difficulty: 'Advanced',
            tags: ['compilers', 'languages', 'systems'],
          },
          {
            title: 'Distributed Systems Simulation',
            description: 'Simulate distributed consensus algorithms like Raft or Paxos.',
            difficulty: 'Advanced',
            tags: ['distributed-systems', 'concurrency'],
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
            title: 'Encryption Tool',
            description:
              'Build an application that demonstrates various encryption and hashing algorithms.',
            difficulty: 'Intermediate',
            tags: ['cryptography', 'security', 'privacy'],
          },
          {
            title: 'Network Intrusion Detection System',
            description: 'Create a basic IDS that can detect suspicious network activity.',
            difficulty: 'Advanced',
            tags: ['network-security', 'monitoring', 'analysis'],
          },
        ]
      case 'artificial intelligence':
      case 'ai':
        return [
          ...commonProjects,
          {
            title: 'AI-powered Chatbot',
            description: 'Build a chatbot using natural language processing for customer support.',
            difficulty: 'Advanced',
            tags: ['ai', 'nlp', 'api'],
          },
          {
            title: 'Image Recognition App',
            description:
              'Develop an application that can identify objects in images using machine learning.',
            difficulty: 'Advanced',
            tags: ['computer-vision', 'ml', 'deep-learning'],
          },
          {
            title: 'Recommendation System',
            description:
              'Build a content recommendation engine using collaborative filtering algorithms.',
            difficulty: 'Intermediate',
            tags: ['ml', 'data-science', 'algorithms'],
          },
        ]
      case 'computer information systems':
      case 'cis':
        return [
          ...commonProjects,
          {
            title: 'E-commerce Platform',
            description:
              'Build a full-stack online store with payment processing and inventory management.',
            difficulty: 'Advanced',
            tags: ['web', 'fullstack', 'database'],
          },
          {
            title: 'Business Intelligence Dashboard',
            description: 'Create a data visualization dashboard for business metrics and KPIs.',
            difficulty: 'Intermediate',
            tags: ['data', 'visualization', 'business'],
          },
          {
            title: 'Inventory Management System',
            description: 'Develop a system to track inventory, sales, and generate reports.',
            difficulty: 'Intermediate',
            tags: ['database', 'business', 'reporting'],
          },
        ]
      default:
        return [
          ...commonProjects,
          {
            title: 'E-commerce Platform',
            description:
              'Build a full-stack online store with payment processing and inventory management.',
            difficulty: 'Advanced',
            tags: ['web', 'fullstack', 'database'],
          },
          {
            title: 'Social Media Dashboard',
            description: 'Develop an analytics dashboard for tracking social media metrics.',
            difficulty: 'Intermediate',
            tags: ['web', 'api', 'data'],
          },
          {
            title: 'AI-powered Chatbot',
            description: 'Build a chatbot using natural language processing for customer support.',
            difficulty: 'Advanced',
            tags: ['ai', 'nlp', 'api'],
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
              'Design and develop complex software systems and applications using various programming languages and technologies.',
            skills: ['Algorithms', 'Data Structures', 'System Design', 'Programming Languages'],
          },
          {
            title: 'Systems Architect',
            description:
              'Design and oversee the implementation of complex IT systems and infrastructure.',
            skills: [
              'System Design',
              'Architecture Patterns',
              'Technical Leadership',
              'Performance Optimization',
            ],
          },
          {
            title: 'Research Scientist',
            description:
              'Conduct research to solve complex computing problems and advance the field of computer science.',
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
            title: 'Security Analyst',
            description:
              'Monitor and analyze security threats and implement solutions to protect digital assets.',
            skills: ['Threat Analysis', 'Security Tools', 'Incident Response', 'Risk Assessment'],
          },
          {
            title: 'Penetration Tester',
            description:
              'Conduct authorized simulated attacks on computer systems to identify security vulnerabilities.',
            skills: [
              'Ethical Hacking',
              'Vulnerability Assessment',
              'Security Tools',
              'Social Engineering',
            ],
          },
          {
            title: 'Security Architect',
            description:
              'Design secure systems and networks that protect against cyber threats and ensure data integrity.',
            skills: [
              'Security Frameworks',
              'Network Security',
              'Identity Management',
              'Secure Architecture',
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
              'Develop and implement machine learning models and algorithms for various applications.',
            skills: ['Python', 'ML Frameworks', 'Data Processing', 'Model Deployment'],
          },
          {
            title: 'AI Research Scientist',
            description:
              'Conduct research to advance the field of artificial intelligence and develop new algorithms.',
            skills: ['Deep Learning', 'Research Methods', 'Mathematics', 'NLP/Computer Vision'],
          },
          {
            title: 'Data Scientist',
            description:
              'Analyze and interpret complex data using statistical methods, machine learning, and data visualization.',
            skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'],
          },
        ]
      case 'computer information systems':
      case 'cis':
        return [
          ...commonCareers,
          {
            title: 'Business Analyst',
            description:
              'Bridge the gap between IT and business needs, analyzing requirements and proposing solutions.',
            skills: [
              'Requirements Analysis',
              'Business Processes',
              'Data Analysis',
              'Communication',
            ],
          },
          {
            title: 'IT Project Manager',
            description:
              'Plan, execute, and oversee IT projects to ensure they meet business objectives.',
            skills: ['Project Management', 'Agile/Scrum', 'Budgeting', 'Stakeholder Management'],
          },
          {
            title: 'Database Administrator',
            description:
              'Design, implement, and maintain database systems to ensure data integrity and performance.',
            skills: ['SQL', 'Database Design', 'Performance Tuning', 'Data Security'],
          },
        ]
      default:
        return [
          ...commonCareers,
          {
            title: 'Frontend Developer',
            description:
              'Focus on creating user interfaces and experiences using HTML, CSS, JavaScript, and frameworks like React or Vue.',
            skills: ['HTML/CSS', 'JavaScript', 'React/Vue', 'UI/UX'],
          },
          {
            title: 'Backend Developer',
            description:
              'Work with server-side logic, databases, and APIs using technologies like Node.js, Python, or Java.',
            skills: ['Node.js/Python/Java', 'Databases', 'API Design', 'Security'],
          },
          {
            title: 'Data Scientist',
            description:
              'Analyze and interpret complex data using statistical methods, machine learning, and data visualization.',
            skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'],
          },
        ]
    }
  }

  // Define companies based on major
  const getCompanies = () => {
    const commonCompanies = [
      { name: 'Google', focus: 'Search, Cloud Computing, AI', internships: true, logo: '🌐' },
      {
        name: 'Microsoft',
        focus: 'Software, Cloud Services, Hardware',
        internships: true,
        logo: '🪟',
      },
      { name: 'Amazon', focus: 'E-commerce, Cloud Computing, AI', internships: true, logo: '📦' },
    ]

    switch (userMajor.toLowerCase()) {
      case 'computer science':
      case 'cs':
        return [
          ...commonCompanies,
          { name: 'Apple', focus: 'Hardware, Software, Services', internships: true, logo: '🍎' },
          { name: 'Meta', focus: 'Social Media, VR/AR, AI', internships: true, logo: '👥' },
          {
            name: 'Oracle',
            focus: 'Database, Enterprise Software, Cloud',
            internships: true,
            logo: '☁️',
          },
          {
            name: 'IBM',
            focus: 'Enterprise Solutions, AI, Quantum Computing',
            internships: true,
            logo: '💼',
          },
        ]
      case 'cybersecurity':
      case 'cyber':
        return [
          ...commonCompanies,
          {
            name: 'Palo Alto Networks',
            focus: 'Network Security, Threat Detection',
            internships: true,
            logo: '🔒',
          },
          {
            name: 'CrowdStrike',
            focus: 'Endpoint Protection, Threat Intelligence',
            internships: true,
            logo: '🛡️',
          },
          {
            name: 'FireEye',
            focus: 'Cyber Threat Intelligence, Security Solutions',
            internships: true,
            logo: '🔥',
          },
          {
            name: 'Cisco',
            focus: 'Network Infrastructure, Security Solutions',
            internships: true,
            logo: '🌉',
          },
        ]
      case 'artificial intelligence':
      case 'ai':
        return [
          ...commonCompanies,
          {
            name: 'OpenAI',
            focus: 'AI Research, Large Language Models',
            internships: true,
            logo: '🧠',
          },
          {
            name: 'NVIDIA',
            focus: 'GPU, AI Hardware, Deep Learning',
            internships: true,
            logo: '🖥️',
          },
          {
            name: 'DeepMind',
            focus: 'AI Research, Reinforcement Learning',
            internships: true,
            logo: '🤖',
          },
          {
            name: 'Anthropic',
            focus: 'AI Safety, Large Language Models',
            internships: true,
            logo: '🔬',
          },
        ]
      case 'computer information systems':
      case 'cis':
        return [
          ...commonCompanies,
          {
            name: 'Salesforce',
            focus: 'CRM, Cloud Solutions, Business Analytics',
            internships: true,
            logo: '☁️',
          },
          {
            name: 'SAP',
            focus: 'Enterprise Software, Business Intelligence',
            internships: true,
            logo: '💼',
          },
          {
            name: 'Oracle',
            focus: 'Database, Enterprise Software, Cloud',
            internships: true,
            logo: '📊',
          },
          {
            name: 'ServiceNow',
            focus: 'IT Service Management, Workflow Automation',
            internships: true,
            logo: '⚙️',
          },
        ]
      default:
        return [
          { name: 'Google', focus: 'Search, Cloud Computing, AI', internships: true, logo: '🌐' },
          {
            name: 'Microsoft',
            focus: 'Software, Cloud Services, Hardware',
            internships: true,
            logo: '🪟',
          },
          {
            name: 'Amazon',
            focus: 'E-commerce, Cloud Computing, AI',
            internships: true,
            logo: '📦',
          },
          { name: 'Apple', focus: 'Hardware, Software, Services', internships: true, logo: '🍎' },
          { name: 'Meta', focus: 'Social Media, VR/AR, AI', internships: true, logo: '👥' },
          {
            name: 'Netflix',
            focus: 'Streaming, Content Delivery, Data Analytics',
            internships: false,
            logo: '🎬',
          },
          {
            name: 'Spotify',
            focus: 'Music Streaming, Content Recommendation',
            internships: true,
            logo: '🎵',
          },
        ]
    }
  }

  // Define resources based on major
  const getResources = () => {
    const commonResources = [
      {
        name: 'freeCodeCamp',
        type: 'Learning Platform',
        url: 'https://www.freecodecamp.org/',
        icon: '🎓',
      },
      {
        name: 'GitHub Student Developer Pack',
        type: 'Tools & Resources',
        url: 'https://education.github.com/pack',
        icon: '🎒',
      },
    ]

    switch (userMajor.toLowerCase()) {
      case 'computer science':
      case 'cs':
        return [
          ...commonResources,
          { name: 'LeetCode', type: 'Coding Practice', url: 'https://leetcode.com/', icon: '💻' },
          {
            name: 'HackerRank',
            type: 'Coding Challenges',
            url: 'https://www.hackerrank.com/',
            icon: '⌨️',
          },
          {
            name: 'MIT OpenCourseWare',
            type: 'Academic Courses',
            url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/',
            icon: '🏛️',
          },
          {
            name: 'Stack Overflow',
            type: 'Community Q&A',
            url: 'https://stackoverflow.com/',
            icon: '❓',
          },
        ]
      case 'cybersecurity':
      case 'cyber':
        return [
          ...commonResources,
          {
            name: 'TryHackMe',
            type: 'Hands-on Learning',
            url: 'https://tryhackme.com/',
            icon: '🔐',
          },
          {
            name: 'HackTheBox',
            type: 'Penetration Testing Practice',
            url: 'https://www.hackthebox.com/',
            icon: '📦',
          },
          { name: 'OWASP', type: 'Security Resources', url: 'https://owasp.org/', icon: '🛡️' },
          {
            name: 'Cybrary',
            type: 'Cybersecurity Courses',
            url: 'https://www.cybrary.it/',
            icon: '🔒',
          },
        ]
      case 'artificial intelligence':
      case 'ai':
        return [
          ...commonResources,
          {
            name: 'Kaggle',
            type: 'Data Science Competitions',
            url: 'https://www.kaggle.com/',
            icon: '📊',
          },
          {
            name: 'Coursera - Deep Learning Specialization',
            type: 'Online Course',
            url: 'https://www.coursera.org/specializations/deep-learning',
            icon: '🧠',
          },
          {
            name: 'Papers With Code',
            type: 'Research Implementation',
            url: 'https://paperswithcode.com/',
            icon: '📝',
          },
          {
            name: 'Hugging Face',
            type: 'ML Models & Datasets',
            url: 'https://huggingface.co/',
            icon: '🤗',
          },
        ]
      case 'computer information systems':
      case 'cis':
        return [
          ...commonResources,
          {
            name: 'Tableau Public',
            type: 'Data Visualization',
            url: 'https://public.tableau.com/',
            icon: '📈',
          },
          {
            name: 'Salesforce Trailhead',
            type: 'CRM Learning',
            url: 'https://trailhead.salesforce.com/',
            icon: '☁️',
          },
          { name: 'ERDPlus', type: 'Database Modeling', url: 'https://erdplus.com/', icon: '💾' },
          {
            name: 'PMI Resources',
            type: 'Project Management',
            url: 'https://www.pmi.org/learning/library',
            icon: '📋',
          },
        ]
      default:
        return [
          {
            name: 'freeCodeCamp',
            type: 'Learning Platform',
            url: 'https://www.freecodecamp.org/',
            icon: '🎓',
          },
          {
            name: 'GitHub Student Developer Pack',
            type: 'Tools & Resources',
            url: 'https://education.github.com/pack',
            icon: '🎒',
          },
          { name: 'LeetCode', type: 'Coding Practice', url: 'https://leetcode.com/', icon: '💻' },
          {
            name: 'Coursera',
            type: 'Online Courses',
            url: 'https://www.coursera.org/',
            icon: '📚',
          },
          {
            name: 'Stack Overflow',
            type: 'Community Q&A',
            url: 'https://stackoverflow.com/',
            icon: '❓',
          },
          { name: 'Dev.to', type: 'Developer Community', url: 'https://dev.to/', icon: '👨‍💻' },
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
