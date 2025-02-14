import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'

const defaultSkills = [
  'Programming Languages',
  'Web Development',
  'Mobile Development',
  'Data Analysis',
  'DevOps and Automation',
  'Network Security',
  'Application Security',
  'Database Management',
  'UI / UX Design',
  'Machine Learning',
  'Cloud Computing',
  'Team Leadership',
  'Decision Making',
  'Project Management',
  'Presentation Skills',
  'Technical Writing',
  'Problem Solving',
  'Market Research',
  'Other',
]

const skillColors = {
  'Programming Languages': 'bg-blue-900 hover:bg-blue-800',
  'Web Development': 'bg-purple-900 hover:bg-purple-800',
  'Mobile Development': 'bg-green-900 hover:bg-green-800',
  'Data Analysis': 'bg-emerald-900 hover:bg-emerald-800',
  'DevOps and Automation': 'bg-indigo-900 hover:bg-indigo-800',
  'Network Security': 'bg-red-900 hover:bg-red-800',
  'Application Security': 'bg-orange-900 hover:bg-orange-800',
  'Database Management': 'bg-yellow-900 hover:bg-yellow-800',
  'UI / UX Design': 'bg-pink-900 hover:bg-pink-800',
  'Machine Learning': 'bg-cyan-900 hover:bg-cyan-800',
  'Cloud Computing': 'bg-teal-900 hover:bg-teal-800',
  'Team Leadership': 'bg-rose-900 hover:bg-rose-800',
  'Decision Making': 'bg-violet-900 hover:bg-violet-800',
  'Project Management': 'bg-amber-900 hover:bg-amber-800',
  'Presentation Skills': 'bg-lime-900 hover:bg-lime-800',
  'Technical Writing': 'bg-sky-900 hover:bg-sky-800',
  'Problem Solving': 'bg-fuchsia-900 hover:bg-fuchsia-800',
  'Market Research': 'bg-emerald-900 hover:bg-emerald-800',
  Other: 'bg-gray-900 hover:bg-gray-800',
}

export function SkillsSelection({ onNext }) {
  const [selectedSkills, setSelectedSkills] = useState([])
  const [customSkill, setCustomSkill] = useState('')
  const [skills, setSkills] = useState(defaultSkills)

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedSkills.length === 0) {
      // You might want to show an error message
      return
    }
    // Remove 'Other' from skills if present
    const finalSkills = selectedSkills.filter((skill) => skill !== 'Other')
    onNext({ skills: finalSkills })
  }

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !skills.includes(customSkill.trim())) {
      setSkills((prev) => [...prev.filter((s) => s !== 'Other'), customSkill.trim(), 'Other'])
      setCustomSkill('')
      toggleSkill(customSkill.trim())
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">What skills define you?</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`transform rounded-full px-4 py-2 text-base font-medium transition-all duration-200 hover:scale-105 ${
                skillColors[skill] || 'bg-gray-900 hover:bg-gray-800'
              } ${
                selectedSkills.includes(skill)
                  ? 'scale-105 shadow-lg ring-2 ring-white/30'
                  : 'text-white/70'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {skills.includes('Other') && selectedSkills.includes('Other') && (
          <div className="flex gap-2">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Enter your skill"
              className="flex-1 rounded-lg border border-gray-600 bg-transparent px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddCustomSkill}
              className="rounded-lg bg-blue-600 px-4 py-2 transition-colors hover:bg-blue-500"
            >
              Add
            </button>
          </div>
        )}

        <Button type="submit">continue</Button>
      </form>
    </div>
  )
}

SkillsSelection.propTypes = {
  onNext: PropTypes.func.isRequired,
}
