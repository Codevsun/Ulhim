import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'

const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']

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
    onNext({ year_in_college: selectedYear })
  }

  const handleYearSelect = (year) => {
    setSelectedYear(year)
    if (error) {
      setError('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 text-center">
        <h1 className="mb-2 text-2xl font-bold">What year are you?</h1>
        <p className="text-sm text-gray-400">Select your current academic year</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {years.map((year) => (
            <label
              key={year}
              className="flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-gray-800"
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
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit">Next</Button>
      </form>
    </div>
  )
}

YearSelection.propTypes = {
  onNext: PropTypes.func.isRequired,
}
