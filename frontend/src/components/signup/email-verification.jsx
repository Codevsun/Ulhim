import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import api from '../../services/api'

export function EmailVerification({ onNext }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email) => {
    const iauPattern = /^[a-zA-Z0-9._%+-]+@iau\.edu\.sa$/
    return iauPattern.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError('Please enter a valid university email address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await api.post('request-otp/', { uni_email: email })
      onNext({ uni_email: email })
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Get started with your university Email</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="e.g. studentid@iau.edu.sa"
          error={error}
          className="mt-12"
          disabled={isLoading}
        />
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 transition-colors hover:text-blue-400">
            Sign in
          </a>
        </div>
        <Button type="submit" disabled={!email || isLoading}>
          {isLoading ? 'Sending OTP...' : 'Next'}
        </Button>
      </form>
    </div>
  )
}

EmailVerification.propTypes = {
  onNext: PropTypes.func.isRequired,
}
