import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function EmailVerification({ onNext }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    const iauPattern = /^[a-zA-Z0-9._%+-]+@iau\.edu\.sa$/
    return iauPattern.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateEmail(email)) {
      setError('')
      onNext()
    } else {
      setError('Please enter a valid university email address')
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Get started with your university Email</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="e.g. studentid@iau.edu.sa"
          error={error}
          className="mt-12"
        />
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:text-blue-400 transition-colors">
            Sign in
          </a>
        </div>
        <Button type="submit" disabled={!email}>
          Next
        </Button>
      </form>
    </div>
  )
}

EmailVerification.propTypes = {
  onNext: PropTypes.func.isRequired
}