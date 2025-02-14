import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'

const defaultInterests = [
  "Creative Arts", "Intellectual and Academic Pursuits", "Lifestyle and Wellness",
  "Health and Biohacking", "Technology and Innovation", "Personal Development", 
  "Pop Culture and Entertainment", "Social and Community Engagement", "Fashion",
  "Other"
]

const interestColors = {
  "Creative Arts": "bg-pink-900 hover:bg-pink-800",
  "Intellectual and Academic Pursuits": "bg-purple-900 hover:bg-purple-800",
  "Lifestyle and Wellness": "bg-green-900 hover:bg-green-800",
  "Health and Biohacking": "bg-emerald-900 hover:bg-emerald-800",
  "Technology and Innovation": "bg-blue-900 hover:bg-blue-800",
  "Personal Development": "bg-indigo-900 hover:bg-indigo-800",
  "Pop Culture and Entertainment": "bg-yellow-900 hover:bg-yellow-800",
  "Social and Community Engagement": "bg-orange-900 hover:bg-orange-800",
  "Fashion": "bg-rose-900 hover:bg-rose-800",
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
      // You might want to show an error message
      return
    }
    // Remove 'Other' from interests if present
    const finalInterests = selectedInterests.filter(interest => interest !== 'Other')
    onNext({ interests: finalInterests })
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