import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'

const defaultInterests = [
  "Web Development", "Mobile Apps", "AI & Machine Learning", "Data Science",
  "Cybersecurity", "Cloud Computing", "UI/UX Design", "Game Development",
  "DevOps", "Blockchain", "IoT", "Open Source", "Technical Writing",
  "Career Growth", "Mentorship", "Project Management", "Entrepreneurship",
  "Other"
]

const interestColors = {
  "Web Development": "bg-blue-900 hover:bg-blue-800",
  "Mobile Apps": "bg-indigo-900 hover:bg-indigo-800", 
  "AI & Machine Learning": "bg-purple-900 hover:bg-purple-800",
  "Data Science": "bg-violet-900 hover:bg-violet-800",
  "Cybersecurity": "bg-red-900 hover:bg-red-800",
  "Cloud Computing": "bg-sky-900 hover:bg-sky-800",
  "UI/UX Design": "bg-pink-900 hover:bg-pink-800",
  "Game Development": "bg-emerald-900 hover:bg-emerald-800",
  "DevOps": "bg-orange-900 hover:bg-orange-800",
  "Blockchain": "bg-amber-900 hover:bg-amber-800",
  "IoT": "bg-cyan-900 hover:bg-cyan-800",
  "Open Source": "bg-green-900 hover:bg-green-800",
  "Technical Writing": "bg-rose-900 hover:bg-rose-800",
  "Career Growth": "bg-yellow-900 hover:bg-yellow-800",
  "Mentorship": "bg-teal-900 hover:bg-teal-800",
  "Project Management": "bg-fuchsia-900 hover:bg-fuchsia-800",
  "Entrepreneurship": "bg-lime-900 hover:bg-lime-800",
  "Other": "bg-gray-900 hover:bg-gray-800"
}

export function InterestsSelection({ onNext }) {
  const [selectedInterests, setSelectedInterests] = useState([])
  const [customInterest, setCustomInterest] = useState('')
  const [interests, setInterests] = useState(defaultInterests)

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedInterests.length === 0) {
      return
    }
    // Remove 'Other' from interests if present
    const finalInterests = selectedInterests.filter(interest => interest !== 'Other')
    onNext({ interests: finalInterests })
    console.log(finalInterests)
  }

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      setInterests(prev => [...prev.filter(i => i !== 'Other'), customInterest.trim(), 'Other'])
      setCustomInterest('')
      toggleInterest(customInterest.trim())
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">What are you passionate about?</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {interests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-200 transform hover:scale-105 ${
                interestColors[interest] || "bg-gray-900 hover:bg-gray-800"
              } ${
                selectedInterests.includes(interest)
                  ? 'ring-2 ring-white/30 shadow-lg scale-105'
                  : 'text-white/70'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
        {interests.includes('Other') && selectedInterests.includes('Other') && (
          <div className="flex gap-2">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="Enter your interest"
              className="flex-1 px-4 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddCustomInterest}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        )}
        <Button type="submit" disabled={selectedInterests.length === 0}>
          continue
        </Button>
      </form>
    </div>
  )
}

InterestsSelection.propTypes = {
  onNext: PropTypes.func.isRequired
}