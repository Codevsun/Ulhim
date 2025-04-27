import { useState } from 'react'
import CompanyLayout from '../components/company/CompanyLayout'
import {
  LucideSearch,
  LucideFilter,
  LucideBookmark,
  LucideMessageSquare,
  LucideChevronDown,
  LucideX,
  LucideCheck,
} from 'lucide-react'

export default function TalentPool() {
  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    majors: [],
    years: [],
    gpa: null,
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [savedTalents, setSavedTalents] = useState([])
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // Mock data for students
  const students = [
    {
      id: 1,
      name: 'Ahmed Al-Farsi',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      major: 'Computer Science',
      year: 'Senior',
      gpa: 3.8,
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
      bio: 'Passionate about AI and machine learning with experience in developing predictive models and computer vision systems.',
      projects: [
        {
          name: 'Student Performance Predictor',
          description: 'ML model to predict academic performance',
        },
        {
          name: 'Computer Vision System',
          description: 'Senior project using OpenCV and deep learning',
        },
      ],
      experience: [
        { position: 'ML Research Assistant', company: 'University AI Lab', duration: '1 year' },
      ],
    },
    {
      id: 2,
      name: 'Fatima Khalid',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      major: 'Software Engineering',
      year: 'Junior',
      gpa: 3.9,
      skills: ['React', 'JavaScript', 'Mobile Development', 'UI/UX Design'],
      bio: 'Mobile and web developer with a passion for creating intuitive user experiences and scalable applications.',
      projects: [
        {
          name: 'Campus Navigation App',
          description: 'Mobile app for university campus navigation',
        },
        {
          name: 'E-commerce Platform',
          description: 'Full-stack web application with React and Node.js',
        },
      ],
      experience: [
        { position: 'Frontend Developer Intern', company: 'Tech Solutions', duration: '6 months' },
      ],
    },
    {
      id: 3,
      name: 'Omar Saeed',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
      major: 'Information Systems',
      year: 'Senior',
      gpa: 3.7,
      skills: ['Project Management', 'Business Analysis', 'SQL', 'Tableau'],
      bio: 'Analytical thinker with strong technical and business skills, focused on data-driven decision making.',
      projects: [
        {
          name: 'Business Intelligence Dashboard',
          description: 'Interactive BI tool for sales analysis',
        },
        {
          name: 'ERP System Implementation',
          description: 'Capstone project on enterprise system deployment',
        },
      ],
      experience: [
        { position: 'Business Analyst Intern', company: 'National Bank', duration: '3 months' },
      ],
    },
    {
      id: 4,
      name: 'Sara Al-Qahtani',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
      major: 'Computer Engineering',
      year: 'Senior',
      gpa: 4.0,
      skills: ['React', 'Node.js', 'AWS', 'System Architecture'],
      bio: 'Full-stack developer with experience in cloud infrastructure and distributed systems.',
      projects: [
        {
          name: 'Cloud-based IoT Platform',
          description: 'Scalable system for IoT device management',
        },
        {
          name: 'Microservices Architecture',
          description: 'Implementation of containerized services',
        },
      ],
      experience: [
        {
          position: 'Software Engineer Intern',
          company: 'Cloud Solutions Inc.',
          duration: '9 months',
        },
      ],
    },
  ]

  // Filter handlers
  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }

      if (category === 'gpa') {
        newFilters.gpa = value
      } else {
        if (newFilters[category].includes(value)) {
          newFilters[category] = newFilters[category].filter((item) => item !== value)
        } else {
          newFilters[category] = [...newFilters[category], value]
        }
      }

      return newFilters
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      skills: [],
      majors: [],
      years: [],
      gpa: null,
    })
    setSearchTerm('')
  }

  // Student management
  const handleSaveStudent = (student) => {
    if (savedTalents.some((talent) => talent.id === student.id)) {
      setSavedTalents(savedTalents.filter((talent) => talent.id !== student.id))
    } else {
      setSavedTalents([...savedTalents, student])
    }
  }

  const isStudentSaved = (studentId) => {
    return savedTalents.some((talent) => talent.id === studentId)
  }

  // Apply filters to students
  const filteredStudents = students.filter((student) => {
    // Search term filter
    if (
      searchTerm &&
      !student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !student.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !student.major.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Skills filter
    if (
      selectedFilters.skills.length > 0 &&
      !selectedFilters.skills.some((skill) => student.skills.includes(skill))
    ) {
      return false
    }

    // Major filter
    if (selectedFilters.majors.length > 0 && !selectedFilters.majors.includes(student.major)) {
      return false
    }

    // Year filter
    if (selectedFilters.years.length > 0 && !selectedFilters.years.includes(student.year)) {
      return false
    }

    // GPA filter
    if (selectedFilters.gpa && student.gpa < selectedFilters.gpa) {
      return false
    }

    return true
  })

  // UI Components
  const FilterPanel = () => (
    <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-3 font-medium text-white">Skills</h3>
          <div className="space-y-2">
            {[
              'Python',
              'React',
              'JavaScript',
              'Machine Learning',
              'Data Analysis',
              'Mobile Development',
            ].map((skill) => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFilters.skills.includes(skill)}
                  onChange={() => handleFilterChange('skills', skill)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600"
                />
                <span className="ml-2 text-sm text-gray-300">{skill}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-white">Major</h3>
          <div className="space-y-2">
            {[
              'Computer Science',
              'Software Engineering',
              'Information Systems',
              'Computer Engineering',
            ].map((major) => (
              <label key={major} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFilters.majors.includes(major)}
                  onChange={() => handleFilterChange('majors', major)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600"
                />
                <span className="ml-2 text-sm text-gray-300">{major}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-white">Year</h3>
          <div className="space-y-2">
            {['Freshman', 'Sophomore', 'Junior', 'Senior'].map((year) => (
              <label key={year} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFilters.years.includes(year)}
                  onChange={() => handleFilterChange('years', year)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600"
                />
                <span className="ml-2 text-sm text-gray-300">{year}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-white">Minimum GPA</h3>
          <div className="space-y-2">
            {[3.0, 3.5, 3.7, 4.0].map((gpa) => (
              <label key={gpa} className="flex items-center">
                <input
                  type="radio"
                  name="gpa"
                  checked={selectedFilters.gpa === gpa}
                  onChange={() => handleFilterChange('gpa', gpa)}
                  className="h-4 w-4 rounded-full border-gray-600 bg-gray-700 text-purple-600"
                />
                <span className="ml-2 text-sm text-gray-300">{gpa.toFixed(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={clearFilters}
          className="rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm text-white hover:bg-white/5"
        >
          Clear All
        </button>
        <button
          onClick={() => setShowFilters(false)}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )

  const StudentCard = ({ student }) => (
    <div
      className="hover:bg-white/8 cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-purple-500/30 hover:shadow-lg"
      onClick={() => setSelectedStudent(student)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <img
            src={student.image}
            alt={student.name}
            className="h-16 w-16 rounded-full border border-white/10"
          />
          <div>
            <h3 className="text-xl font-medium text-white">{student.name}</h3>
            <p className="text-gray-400">
              {student.major} • {student.year} • GPA: {student.gpa}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {student.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-purple-900/30 px-3 py-1 text-xs text-purple-300"
                >
                  {skill}
                </span>
              ))}
              {student.skills.length > 3 && (
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
                  +{student.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleSaveStudent(student)
            }}
            className={`rounded-full p-2 transition-colors ${
              isStudentSaved(student.id)
                ? 'bg-purple-600/20 text-purple-400'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
            aria-label={isStudentSaved(student.id) ? 'Unsave student' : 'Save student'}
          >
            <LucideBookmark className="h-5 w-5" />
          </button>
          <button
            className="rounded-full bg-white/5 p-2 text-gray-400 hover:bg-white/10 hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              // Handle message action
            }}
            aria-label="Message student"
          >
            <LucideMessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-gray-300">{student.bio}</p>
    </div>
  )

  const StudentListItem = ({ student }) => (
    <div
      className="hover:bg-white/8 cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-purple-500/30 hover:shadow-lg"
      onClick={() => setSelectedStudent(student)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={student.image}
            alt={student.name}
            className="h-12 w-12 rounded-full border border-white/10"
          />
          <div>
            <h3 className="text-lg font-medium text-white">{student.name}</h3>
            <p className="text-sm text-gray-400">
              {student.major} • {student.year} • GPA: {student.gpa}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex md:flex-wrap md:gap-2">
            {student.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-purple-900/30 px-3 py-1 text-xs text-purple-300"
              >
                {skill}
              </span>
            ))}
            {student.skills.length > 2 && (
              <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
                +{student.skills.length - 2} more
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleSaveStudent(student)
              }}
              className={`rounded-full p-2 transition-colors ${
                isStudentSaved(student.id)
                  ? 'bg-purple-600/20 text-purple-400'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              aria-label={isStudentSaved(student.id) ? 'Unsave student' : 'Save student'}
            >
              <LucideBookmark className="h-5 w-5" />
            </button>
            <button
              className="rounded-full bg-white/5 p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                // Handle message action
              }}
              aria-label="Message student"
            >
              <LucideMessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const StudentProfile = () => (
    <div className="sticky top-24 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Student Profile</h2>
        <button
          onClick={() => setSelectedStudent(null)}
          className="rounded-full bg-white/5 p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
          aria-label="Close profile"
        >
          <LucideX className="h-5 w-5" />
        </button>
      </div>
      <div className="mb-6 flex flex-col items-center">
        <img
          src={selectedStudent.image}
          alt={selectedStudent.name}
          className="mb-4 h-24 w-24 rounded-full border border-white/10"
        />
        <h3 className="text-2xl font-medium text-white">{selectedStudent.name}</h3>
        <p className="text-gray-400">
          {selectedStudent.major} • {selectedStudent.year}
        </p>
        <p className="mt-1 text-gray-400">GPA: {selectedStudent.gpa}</p>
        <div className="mt-4 flex space-x-3">
          <button
            onClick={() => handleSaveStudent(selectedStudent)}
            className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isStudentSaved(selectedStudent.id)
                ? 'bg-purple-600/20 text-purple-400'
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            {isStudentSaved(selectedStudent.id) ? (
              <>
                <LucideCheck className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <LucideBookmark className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </button>
          <button className="flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
            <LucideMessageSquare className="mr-2 h-4 w-4" />
            Message
          </button>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="mb-2 font-medium text-white">About</h4>
          <p className="text-gray-300">{selectedStudent.bio}</p>
        </div>
        <div>
          <h4 className="mb-2 font-medium text-white">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {selectedStudent.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-purple-900/30 px-3 py-1 text-xs text-purple-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 font-medium text-white">Projects</h4>
          <div className="space-y-3">
            {selectedStudent.projects.map((project, index) => (
              <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <h5 className="font-medium text-white">{project.name}</h5>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 font-medium text-white">Experience</h4>
          <div className="space-y-3">
            {selectedStudent.experience.map((exp, index) => (
              <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <h5 className="font-medium text-white">{exp.position}</h5>
                <p className="text-sm text-gray-400">
                  {exp.company} • {exp.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const SavedTalentsPanel = () => (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-white">Saved Talents</h2>
      {savedTalents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <LucideBookmark className="mb-3 h-10 w-10 text-gray-500" />
          <p className="text-gray-400">No saved talents yet</p>
          <p className="mt-1 text-sm text-gray-500">
            Save students you're interested in for quick access
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedTalents.map((talent) => (
            <div
              key={talent.id}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 hover:border-purple-500/30 hover:shadow-md"
              onClick={() => setSelectedStudent(talent)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="h-10 w-10 rounded-full border border-white/10"
                />
                <div>
                  <h4 className="font-medium text-white">{talent.name}</h4>
                  <p className="text-xs text-gray-400">{talent.major}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleSaveStudent(talent)
                }}
                className="rounded-full bg-white/5 p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
                aria-label="Remove from saved"
              >
                <LucideX className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const QuickTipsPanel = () => (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-white">Quick Tips</h2>
      <ul className="space-y-3 text-gray-300">
        <li className="flex items-start">
          <span className="mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
            •
          </span>
          Use filters to narrow down candidates by skills, major, or GPA
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
            •
          </span>
          Save promising candidates to revisit their profiles later
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
            •
          </span>
          Message students directly to discuss opportunities
        </li>
      </ul>
    </div>
  )

  const NoResultsFound = () => (
    <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
      <LucideSearch className="mb-4 h-12 w-12 text-gray-500" />
      <h3 className="mb-2 text-xl font-medium text-white">No students found</h3>
      <p className="text-gray-400">Try adjusting your search or filters to find students</p>
      <button
        onClick={clearFilters}
        className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
      >
        Clear All Filters
      </button>
    </div>
  )

  return (
    <CompanyLayout>
      <div className="px-6 py-8">
        {/* Header and Search */}
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-3xl font-bold text-white">Talent Pool</h1>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for skills, majors, or names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2.5 pl-12 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <LucideSearch className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10"
            >
              <LucideFilter className="mr-2 h-5 w-5" />
              Filters
              <LucideChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && <FilterPanel />}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Students List */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                {filteredStudents.length} Talented Students
              </h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  Showing {filteredStudents.length} of {students.length} students
                </div>
                <div className="flex rounded-lg border border-white/10 bg-white/5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                    aria-label="Grid view"
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                    aria-label="List view"
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {filteredStudents.length === 0 ? (
              <NoResultsFound />
            ) : (
              <div className={viewMode === 'grid' ? 'space-y-6' : 'space-y-3'}>
                {filteredStudents.map((student) =>
                  viewMode === 'grid' ? (
                    <StudentCard key={student.id} student={student} />
                  ) : (
                    <StudentListItem key={student.id} student={student} />
                  )
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            {selectedStudent ? (
              <StudentProfile />
            ) : (
              <div className="sticky top-24 space-y-6">
                <SavedTalentsPanel />
                <QuickTipsPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </CompanyLayout>
  )
}
