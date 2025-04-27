import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../../pages/Profile'

export default function DashboardProfile() {
  // About Me state
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(
    ""
  )
  
  // Featured Projects state
  const [editingFeatured, setEditingFeatured] = useState(false)
  const [featuredProjects, setFeaturedProjects] = useState([
    {
      name: 'AI Study Assistant',
      description: 'An AI-powered study tool that helps students learn more effectively by analyzing their study patterns and providing personalized recommendations.',
      tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
      github: 'https://github.com/johndoe/ai-study-assistant',
      demo: 'https://ai-study-assistant.demo.com'
    }
  ])
  const [newFeaturedProject, setNewFeaturedProject] = useState({
    name: '',
    description: '',
    tech: '',
    github: '',
    demo: ''
  })
  
  // In Progress Projects state
  const [editingInProgress, setEditingInProgress] = useState(false)
  const [inProgressProjects, setInProgressProjects] = useState([
    {
      name: 'Smart Schedule Planner',
      description: 'An intelligent course scheduling system that helps students create optimal class schedules based on their preferences and requirements.',
      tech: ['TypeScript', 'Next.js', 'PostgreSQL'],
      status: '70% complete'
    }
  ])
  const [newInProgressProject, setNewInProgressProject] = useState({
    name: '',
    description: '',
    tech: '',
    status: ''
  })

  const navigate = useNavigate()

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDescription = localStorage.getItem('userDescription')
    if (savedDescription) setDescription(savedDescription)
    
    const savedFeaturedProjects = localStorage.getItem('featuredProjects')
    if (savedFeaturedProjects) setFeaturedProjects(JSON.parse(savedFeaturedProjects))
    
    const savedInProgressProjects = localStorage.getItem('inProgressProjects')
    if (savedInProgressProjects) setInProgressProjects(JSON.parse(savedInProgressProjects))
  }, [])

  const handleDescriptionSave = () => {
    if (description.length > 255) {
      alert('Description must be 255 characters or less')
      return
    }
    localStorage.setItem('userDescription', description)
    setIsEditing(false)
  }

  const handleFeaturedProjectChange = (e) => {
    const { name, value } = e.target
    setNewFeaturedProject(prev => ({
      ...prev,
      [name]: name === 'tech' ? value.split(',').map(item => item.trim()) : value
    }))
  }

  const handleFeaturedSave = () => {
    if (newFeaturedProject.name && newFeaturedProject.description) {
      const updatedProjects = [...featuredProjects, {
        ...newFeaturedProject,
        tech: Array.isArray(newFeaturedProject.tech) ? newFeaturedProject.tech : 
              newFeaturedProject.tech.split(',').map(item => item.trim())
      }]
      setFeaturedProjects(updatedProjects)
      localStorage.setItem('featuredProjects', JSON.stringify(updatedProjects))
      setNewFeaturedProject({
        name: '',
        description: '',
        tech: '',
        github: '',
        demo: ''
      })
    }
    setEditingFeatured(false)
  }

  const handleInProgressProjectChange = (e) => {
    const { name, value } = e.target
    setNewInProgressProject(prev => ({
      ...prev,
      [name]: name === 'tech' ? value.split(',').map(item => item.trim()) : value
    }))
  }

  const handleInProgressSave = () => {
    if (newInProgressProject.name && newInProgressProject.description) {
      const updatedProjects = [...inProgressProjects, {
        ...newInProgressProject,
        tech: Array.isArray(newInProgressProject.tech) ? newInProgressProject.tech : 
              newInProgressProject.tech.split(',').map(item => item.trim()),
        status: newInProgressProject.status || '0% complete'
      }]
      setInProgressProjects(updatedProjects)
      localStorage.setItem('inProgressProjects', JSON.stringify(updatedProjects))
      setNewInProgressProject({
        name: '',
        description: '',
        tech: '',
        status: ''
      })
    }
    setEditingInProgress(false)
  }

  const handleRemoveProject = (type, index) => {
    if (type === 'featured') {
      const updatedProjects = featuredProjects.filter((_, i) => i !== index)
      setFeaturedProjects(updatedProjects)
      localStorage.setItem('featuredProjects', JSON.stringify(updatedProjects))
    } else {
      const updatedProjects = inProgressProjects.filter((_, i) => i !== index)
      setInProgressProjects(updatedProjects)
      localStorage.setItem('inProgressProjects', JSON.stringify(updatedProjects))
    }
  }

  return (
    <Profile>
      <div className="col-span-6 space-y-8">
        {/* About Me Section */}
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            About Me
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>
          <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Who Am I</h3>
              {isEditing ? (
                <button
                  onClick={handleDescriptionSave}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Edit
                </button>
              )}
            </div>
            {isEditing ? (
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => {
                    if (e.target.value.length <= 255) {
                      setDescription(e.target.value)
                    }
                  }}
                  maxLength={255}
                  className="h-32 w-full resize-none rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  placeholder="Tell others about yourself..."
                />
                <div
                  className={`absolute bottom-2 right-2 text-sm ${
                    description.length >= 230 ? 'text-red-400' : 'text-gray-400'
                  }`}
                >
                  {description.length}/255
                </div>
              </div>
            ) : (
              <p className="text-gray-300">{description}</p>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            My Projects
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Featured Projects */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Featured</h3>
                {editingFeatured ? (
                  <button
                    onClick={handleFeaturedSave}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingFeatured(true)}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingFeatured ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={newFeaturedProject.name}
                    onChange={handleFeaturedProjectChange}
                    placeholder="Project name"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <textarea
                    name="description"
                    value={newFeaturedProject.description}
                    onChange={handleFeaturedProjectChange}
                    placeholder="Project description"
                    className="h-24 w-full resize-none rounded-lg border border-white/10 bg-gray-700/30 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <input
                    type="text"
                    name="tech"
                    value={typeof newFeaturedProject.tech === 'string' ? newFeaturedProject.tech : newFeaturedProject.tech.join(', ')}
                    onChange={handleFeaturedProjectChange}
                    placeholder="Technologies (comma separated)"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <input
                    type="text"
                    name="github"
                    value={newFeaturedProject.github}
                    onChange={handleFeaturedProjectChange}
                    placeholder="GitHub URL"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <input
                    type="text"
                    name="demo"
                    value={newFeaturedProject.demo}
                    onChange={handleFeaturedProjectChange}
                    placeholder="Demo URL"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {featuredProjects.length > 0 ? (
                    featuredProjects.map((project, index) => (
                      <div key={index} className="relative rounded-lg border border-white/10 bg-gray-700/30 p-4">
                        <button 
                          onClick={() => handleRemoveProject('featured', index)}
                          className="absolute right-2 top-2 rounded-full bg-gray-700/50 p-1 text-gray-400 hover:text-white"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <h4 className="text-lg font-medium text-white">{project.name}</h4>
                        <p className="mt-2 text-sm text-gray-300">{project.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tech && project.tech.map((tech, i) => (
                            <span key={i} className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {(project.github || project.demo) && (
                          <div className="mt-3 flex gap-3">
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300">
                                GitHub
                              </a>
                            )}
                            {project.demo && (
                              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300">
                                Live Demo
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No featured projects yet. Click Edit to add one.</p>
                  )}
                </div>
              )}
            </div>

            {/* In Progress Projects */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">In Progress</h3>
                {editingInProgress ? (
                  <button
                    onClick={handleInProgressSave}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingInProgress(true)}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingInProgress ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={newInProgressProject.name}
                    onChange={handleInProgressProjectChange}
                    placeholder="Project name"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <textarea
                    name="description"
                    value={newInProgressProject.description}
                    onChange={handleInProgressProjectChange}
                    placeholder="Project description"
                    className="h-24 w-full resize-none rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <input
                    type="text"
                    name="tech"
                    value={typeof newInProgressProject.tech === 'string' ? newInProgressProject.tech : newInProgressProject.tech.join(', ')}
                    onChange={handleInProgressProjectChange}
                    placeholder="Technologies (comma separated)"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                  <input
                    type="text"
                    name="status"
                    value={newInProgressProject.status}
                    onChange={handleInProgressProjectChange}
                    placeholder="Status (e.g. 50% complete)"
                    className="w-full rounded-lg border border-white/10 bg-gray-700/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {inProgressProjects.length > 0 ? (
                    inProgressProjects.map((project, index) => (
                      <div key={index} className="relative rounded-lg border border-white/10 bg-gray-700/30 p-4">
                        <button 
                          onClick={() => handleRemoveProject('inProgress', index)}
                          className="absolute right-2 top-2 rounded-full bg-gray-700/50 p-1 text-gray-400 hover:text-white"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-white">{project.name}</h4>
                          <span className="text-sm text-green-400">{project.status}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-300">{project.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tech && project.tech.map((tech, i) => (
                            <span key={i} className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No in-progress projects yet. Click Edit to add one.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Academic Journey Section */}
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            Academic Journey
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5].map((year) => (
              <button
                key={year}
                onClick={() => navigate(`/year/${year}`)}
                className={`group relative overflow-hidden rounded-lg border border-white/10 bg-gray-800/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-gray-700/50 ${
                  year === 1 ? 'col-span-2' : ''
                }`}
              >
                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-gray-800/30">
                    <svg
                    className="h-6 w-6 text-purple-400/80 drop-shadow-[0_0_3px_rgba(168,85,247,0.5)] transition-colors duration-500 group-hover:text-purple-300"
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
                  <div className="text-left">
                    <span className="block text-lg font-light text-white">Year {year}</span>
                    <span className="mt-1 block text-sm text-white/60">View details →</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Profile>
  )
}
