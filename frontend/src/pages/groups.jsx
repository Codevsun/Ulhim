import { Home } from '../pages/Home'
import { useState } from 'react'
import { 
  LucideUsers, 
  LucideCheckCircle2, 
  LucideBrain, 
  LucideRocket, 
  LucideCalendar, 
  LucideStar, 
  LucideMessageSquare, 
  LucidePlus,
  LucideSearch,
  LucideArrowUpRight
} from 'lucide-react'

export default function Groups() {
  const [activeTab, setActiveTab] = useState('current')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCollab, setSelectedCollab] = useState(null)
  const [joinedCollabs, setJoinedCollabs] = useState([])
  const [newCollabData, setNewCollabData] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    skillsNeeded: '',
    seeking: '',
    postedDate: '',
    lastActive: ''
  })

  // Use state to store collabs instead of a constant
  const [collabs, setCollabs] = useState({
    current: [
      {
        id: 1,
        title: 'Mobile App Development',
        members: ['Mohammed Al-Otaibi', 'Sarah Al-Ghamdi', 'Abdullah Al-Qahtani', 'Noura Al-Shammari'],
        progress: 65,
        deadline: 'Dec 15, 2023',
        description: 'Building a social networking app for campus events with real-time notifications and location-based features.',
        category: 'Tech',
        lastActive: '2 hours ago',
        tasks: [
          { id: 1, title: 'Design UI mockups', completed: true },
          { id: 2, title: 'Implement authentication', completed: true },
          { id: 3, title: 'Build event creation flow', completed: false },
          { id: 4, title: 'Test on multiple devices', completed: false }
        ]
      },
      {
        id: 2,
        title: 'AI Research Project',
        members: ['Fahad Al-Dosari', 'Reem Al-Subaie', 'Khalid Al-Malki'],
        progress: 30,
        deadline: 'Jan 20, 2024',
        description: 'Researching machine learning applications in healthcare with focus on early disease detection algorithms.',
        category: 'Research',
        lastActive: '1 day ago',
        tasks: [
          { id: 1, title: 'Literature review', completed: true },
          { id: 2, title: 'Data collection', completed: false },
          { id: 3, title: 'Model training', completed: false },
          { id: 4, title: 'Paper draft', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Sustainable Campus Initiative',
        members: ['Haifa Al-Shahrani', 'Sultan Al-Anazi', 'Aisha Al-Zahrani'],
        progress: 80,
        deadline: 'Nov 30, 2023',
        description: 'Developing proposals for reducing campus carbon footprint and implementing renewable energy solutions.',
        category: 'Environment',
        lastActive: '5 hours ago',
        tasks: [
          { id: 1, title: 'Energy audit', completed: true },
          { id: 2, title: 'Research solar options', completed: true },
          { id: 3, title: 'Draft proposal', completed: true },
          { id: 4, title: 'Present to administration', completed: false }
        ]
      },
    ],
    potential: [
      {
        id: 3,
        title: 'Web3 Development',
        seeking: ['Frontend Developer', 'Smart Contract Engineer', 'UI/UX Designer'],
        initiator: 'Badr Al-Harbi',
        description: 'Creating a decentralized marketplace for student services with token-based incentives and secure transactions.',
        category: 'Blockchain',
        postedDate: '3 days ago',
        applicants: 4,
        skillsRequired: ['React', 'Solidity', 'Ethers.js']
      },
      {
        id: 4,
        title: 'UX Research Study',
        seeking: ['UX Researcher', 'Data Analyst', 'Psychology Student'],
        initiator: 'Munira Al-Tamimi',
        description: 'Studying user behavior in educational apps to improve engagement and learning outcomes for diverse student populations.',
        category: 'Design',
        postedDate: '1 week ago',
        applicants: 2,
        skillsRequired: ['User Testing', 'Statistical Analysis', 'Interview Skills']
      },
      {
        id: 6,
        title: 'Robotics Competition Team',
        seeking: ['Mechanical Engineer', 'Programmer', 'Project Manager'],
        initiator: 'Faisal Al-Shammari',
        description: 'Building an autonomous robot for the upcoming international robotics competition with focus on innovative navigation systems.',
        category: 'Engineering',
        postedDate: '2 days ago',
        applicants: 7,
        skillsRequired: ['Arduino', 'CAD', 'Python', 'Sensor Integration']
      },
      {
        id: 7,
        title: 'Mental Health Awareness Campaign',
        seeking: ['Content Creator', 'Event Coordinator', 'Psychology Major'],
        initiator: 'Nouf Al-Otaibi',
        description: 'Organizing a campus-wide campaign to promote mental health awareness, reduce stigma, and connect students with resources.',
        category: 'Health',
        postedDate: '5 days ago',
        applicants: 3,
        skillsRequired: ['Social Media', 'Event Planning', 'Public Speaking']
      },
    ],
  })

  const filteredCollabs = {
    current: collabs.current.filter(collab => 
      collab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    potential: collabs.potential.filter(collab => 
      collab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const handleJoinCollab = (collabId) => {
    // Check if already joined
    if (joinedCollabs.includes(collabId)) {
      setJoinedCollabs(joinedCollabs.filter(id => id !== collabId));
    } else {
      setJoinedCollabs([...joinedCollabs, collabId]);
    }
  }

  const isCollabJoined = (collabId) => {
    return joinedCollabs.includes(collabId);
  }

  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'tech':
        return <LucideRocket className="h-4 w-4" />;
      case 'research':
        return <LucideBrain className="h-4 w-4" />;
      case 'environment':
        return <LucideStar className="h-4 w-4" />;
      case 'blockchain':
        return <LucideArrowUpRight className="h-4 w-4" />;
      case 'design':
        return <LucideStar className="h-4 w-4" />;
      case 'engineering':
        return <LucideRocket className="h-4 w-4" />;
      case 'health':
        return <LucideCheckCircle2 className="h-4 w-4" />;
      default:
        return <LucideStar className="h-4 w-4" />;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollabData({
      ...newCollabData,
      [name]: value
    });
  }

  const handleCreateCollab = () => {
    // Format the seeking roles from the input
    const seekingRoles = newCollabData.seeking
      ? newCollabData.seeking.split(',').map(role => role.trim())
      : ['Team Member'];

    // Create a new collab with the form data
    const newCollab = {
      id: Date.now(), // Use timestamp for unique ID
      title: newCollabData.title,
      description: newCollabData.description,
      category: newCollabData.category,
      seeking: seekingRoles,
      initiator: 'You',
      postedDate: newCollabData.postedDate || 'Just now',
      lastActive: newCollabData.lastActive || 'Just now',
      deadline: newCollabData.deadline || 'Not set',
      applicants: 0,
      skillsRequired: newCollabData.skillsNeeded.split(',').map(skill => skill.trim())
    };

    // Add to potential collabs using state update
    setCollabs(prevCollabs => ({
      ...prevCollabs,
      potential: [newCollab, ...prevCollabs.potential]
    }));
    
    // Reset form and close modal
    setNewCollabData({
      title: '',
      description: '',
      category: '',
      deadline: '',
      skillsNeeded: '',
      seeking: '',
      postedDate: '',
      lastActive: ''
    });
    setShowCreateModal(false);
    
    // Switch to potential tab to show the new collab
    setActiveTab('potential');
  }

  return (
    <Home>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h1 className="text-3xl font-bold text-white">Collaboration Hub</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 text-white transition-all hover:from-purple-700 hover:to-blue-600 hover:shadow-lg"
          >
            <LucidePlus className="h-5 w-5" />
            <span>Create New Collab</span>
          </button>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex space-x-4 border-b border-gray-800">
            <button
              className={`px-4 py-2 transition-all ${
                activeTab === 'current'
                  ? 'border-b-2 border-purple-500 text-purple-400 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('current')}
            >
              Current Collaborations
            </button>
            <button
              className={`px-4 py-2 transition-all ${
                activeTab === 'potential'
                  ? 'border-b-2 border-purple-500 text-purple-400 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('potential')}
            >
              Potential Collaborations
            </button>
          </div>
          
          <div className="relative">
            <div className="flex items-center rounded-lg border border-gray-700 bg-gray-800/50 px-3">
              <LucideSearch className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search collaborations..."
                className="w-full bg-transparent py-2 pl-2 pr-4 text-white placeholder-gray-400 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredCollabs[activeTab].length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-900/30 p-8 text-center">
            <LucideSearch className="mb-2 h-12 w-12 text-gray-600" />
            <h3 className="text-xl font-medium text-gray-400">No collaborations found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or browse all collaborations</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 rounded-lg bg-purple-600/20 px-4 py-2 text-purple-400 hover:bg-purple-600/30"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeTab === 'current'
              ? filteredCollabs.current.map((collab) => (
                  <div
                    key={collab.id}
                    className="flex h-full flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5"
                    onClick={() => setSelectedCollab(collab)}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-1 rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                            {getCategoryIcon(collab.category)}
                            <span>{collab.category}</span>
                          </span>
                          <span className="text-xs text-gray-500">Active {collab.lastActive}</span>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold text-white">{collab.title}</h3>
                      </div>
                      <span className="rounded-full bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-300">
                        {collab.progress}%
                      </span>
                    </div>
                    <p className="mb-4 flex-grow text-gray-400">{collab.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <LucideCalendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-400">Due: {collab.deadline}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <LucideMessageSquare className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-400">Chat</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {collab.members.slice(0, 3).map((member, idx) => (
                            <div 
                              key={idx} 
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-xs font-medium text-white ring-2 ring-gray-900"
                              title={member}
                            >
                              {member.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {collab.members.length > 3 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-white ring-2 ring-gray-900">
                              +{collab.members.length - 3}
                            </div>
                          )}
                        </div>
                        <button className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/10">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : filteredCollabs.potential.map((collab) => (
                  <div
                    key={collab.id}
                    className="flex h-full flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-1 rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                            {getCategoryIcon(collab.category)}
                            <span>{collab.category}</span>
                          </span>
                          <span className="text-xs text-gray-500">Posted {collab.postedDate}</span>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold text-white">{collab.title}</h3>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJoinCollab(collab.id);
                        }}
                        className={`flex items-center space-x-1 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                          isCollabJoined(collab.id) 
                            ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' 
                            : 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
                        }`}
                      >
                        {isCollabJoined(collab.id) ? (
                          <>
                            <LucideCheckCircle2 className="h-4 w-4" />
                            <span>Applied</span>
                          </>
                        ) : (
                          <>
                            <LucideCheckCircle2 className="h-4 w-4" />
                            <span>Join</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="mb-4 flex-grow text-gray-400">{collab.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <LucideUsers className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-400">
                            {isCollabJoined(collab.id) ? collab.applicants + 1 : collab.applicants} applicants
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">
                          By: <span className="text-blue-400">{collab.initiator}</span>
                        </span>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-300">Seeking:</h4>
                        <div className="flex flex-wrap gap-2">
                          {collab.seeking.map((role, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-purple-900/30 px-3 py-1 text-xs text-purple-300"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-300">Required skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {collab.skillsRequired.map((skill, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-blue-900/30 px-3 py-1 text-xs text-blue-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>

      {/* Create Collaboration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-2xl rounded-xl bg-gray-900 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Create New Collaboration</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={newCollabData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Give your collaboration a catchy title"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Description</label>
                <textarea 
                  name="description"
                  value={newCollabData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Describe what you're working on and what you hope to achieve"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">Category</label>
                  <select 
                    name="category"
                    value={newCollabData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Select a category</option>
                    <option value="Tech">Tech</option>
                    <option value="Research">Research</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts</option>
                    <option value="Environment">Environment</option>
                    <option value="Health">Health</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Blockchain">Blockchain</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">Deadline</label>
                  <input 
                    type="date" 
                    name="deadline"
                    value={newCollabData.deadline}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Skills Needed</label>
                <input 
                  type="text" 
                  name="skillsNeeded"
                  value={newCollabData.skillsNeeded}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g. React, Python, Design (comma separated)"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Roles Seeking</label>
                <input 
                  type="text" 
                  name="seeking"
                  value={newCollabData.seeking}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g. Frontend Developer, Designer, Project Manager (comma separated)"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-gray-700 bg-transparent px-4 py-2 text-white hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateCollab}
                  disabled={!newCollabData.title || !newCollabData.description || !newCollabData.category}
                  className={`rounded-lg px-4 py-2 text-white ${
                    newCollabData.title && newCollabData.description && newCollabData.category
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
                      : 'bg-gray-700 cursor-not-allowed'
                  }`}
                >
                  Create Collaboration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Details Modal */}
      {selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-3xl rounded-xl bg-gray-900 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-white">{selectedCollab.title}</h2>
                <span className="flex items-center space-x-1 rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                  {getCategoryIcon(selectedCollab.category)}
                  <span>{selectedCollab.category}</span>
                </span>
              </div>
              <button 
                onClick={() => setSelectedCollab(null)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">About</h3>
                <p className="text-gray-400">{selectedCollab.description}</p>
              </div>
              
              {activeTab === 'current' && (
                <>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Progress</h3>
                      <span className="text-sm text-gray-400">Deadline: {selectedCollab.deadline}</span>
                    </div>
                    <div className="mb-2 h-4 w-full overflow-hidden rounded-full bg-gray-800">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500" 
                        style={{ width: `${selectedCollab.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-300">Tasks</h4>
                      <div className="space-y-2">
                        {selectedCollab.tasks.map(task => (
                          <div key={task.id} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                            <div className="flex items-center space-x-3">
                              <div className={`flex h-6 w-6 items-center justify-center rounded-full ${task.completed ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                                {task.completed ? <LucideCheckCircle2 className="h-4 w-4" /> : <span className="h-3 w-3 rounded-full bg-gray-600"></span>}
                              </div>
                              <span className={`${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</span>
                            </div>
                            <button className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-700 hover:text-white">
                              {task.completed ? 'Reopen' : 'Complete'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3 text-lg font-medium text-white">Team Members</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedCollab.members.map((member, idx) => (
                        <div key={idx} className="flex items-center space-x-3 rounded-lg bg-gray-800/50 p-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-sm font-medium text-white">
                            {member.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-white">{member}</div>
                            <div className="text-xs text-gray-400">Team Member</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'potential' && (
                <>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-white">Details</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-gray-800/50 p-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-300">Initiated by</h4>
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-green-500 text-sm font-medium text-white">
                            {selectedCollab.initiator.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="font-medium text-white">{selectedCollab.initiator}</div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-800/50 p-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-300">Current Applicants</h4>
                        <div className="text-2xl font-bold text-white">
                          {isCollabJoined(selectedCollab.id) ? selectedCollab.applicants + 1 : selectedCollab.applicants}
                        </div>
                        <div className="text-sm text-gray-400">people interested</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3 text-lg font-medium text-white">Roles Needed</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollab.seeking.map((role, index) => (
                        <div
                          key={index}
                          className="rounded-full bg-purple-900/30 px-4 py-2 text-sm text-purple-300"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3 text-lg font-medium text-white">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollab.skillsRequired.map((skill, index) => (
                        <div
                          key={index}
                          className="rounded-full bg-blue-900/30 px-4 py-2 text-sm text-blue-300"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                <button 
                  onClick={() => setSelectedCollab(null)}
                  className="rounded-lg border border-gray-700 bg-transparent px-4 py-2 text-white hover:bg-gray-800"
                >
                  Close
                </button>
                {activeTab === 'current' ? (
                  <button className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 text-white hover:from-purple-700 hover:to-blue-600">
                    Open Chat
                  </button>
                ) : (
                  <button className="rounded-lg bg-gradient-to-r from-green-600 to-teal-500 px-4 py-2 text-white hover:from-green-700 hover:to-teal-600">
                    Apply to Join
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Home>
  )
}
