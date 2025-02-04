import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'

const majors = [
  "Computer Science",
  "Computer Information System", 
  "Cyber Security",
  "Artificial Intelligence"
]

export function MajorSelection({ onNext }) {
  const [selectedMajor, setSelectedMajor] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedMajor) {
      setError('Please select a major to continue')
      return
    }
    setError('')
    onNext()
  }

  const handleMajorSelect = (major) => {
    setSelectedMajor(major)
    if (error) {
      setError('')
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold mb-2">What is your major?</h1>
        <p className="text-gray-400 text-sm">Select your field of study from the options below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {majors.map((major) => (
            <label 
              key={major} 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <input
                type="radio"
                name="major"
                value={major}
                checked={selectedMajor === major}
                onChange={() => handleMajorSelect(major)}
                className="form-radio text-blue-500"
              />
              <span className="text-lg">{major}</span>
            </label>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div className="pt-4">
          <Button 
            type="submit" 
            disabled={!selectedMajor}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}

MajorSelection.propTypes = {
  onNext: PropTypes.func.isRequired
}