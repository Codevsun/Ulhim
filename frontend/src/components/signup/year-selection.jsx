import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'

const years = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"]

export function YearSelection({ onNext }) {
  const [selectedYear, setSelectedYear] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedYear) {
      setError('Please select a year to continue')
      return
    }
    setError('')
    onNext()
  }

  const handleYearSelect = (year) => {
    setSelectedYear(year)
    if (error) {
      setError('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold mb-2">What year are you?</h1>
        <p className="text-gray-400 text-sm">Select your current academic year</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {years.map((year) => (
            <label 
              key={year} 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <input
                type="radio"
                name="year"
                value={year}
                checked={selectedYear === year}
                onChange={() => handleYearSelect(year)}
                className="form-radio text-blue-500"
              />
              <span>{year}</span>
            </label>
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        <Button type="submit">
          Next
        </Button>
      </form>
    </div>
  )
}

YearSelection.propTypes = {
  onNext: PropTypes.func.isRequired
}