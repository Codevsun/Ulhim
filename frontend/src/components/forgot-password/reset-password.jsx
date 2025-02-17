import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import api from '../../services/api'

export function ResetPassword({ uni_email, onNext }) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    form: '',
  })

  const validateForm = () => {
    const newErrors = {}

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(formData.password)
    ) {
      newErrors.password = 'Password should include letters, numbers and special characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors({ ...errors, ...newErrors })
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors((prev) => ({ ...prev, form: '' }))

    try {
      console.log('Resetting password for:', uni_email)
      await api.post('reset-password/', {
        uni_email: uni_email,
        new_password: formData.password,
      })

      onNext()
    } catch (error) {
      console.error('Password reset error:', error.response?.data)
      setErrors((prev) => ({
        ...prev,
        form: error.response?.data?.error || 'Failed to reset password. Please try again.',
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">Reset your password</h1>
        <p className="text-gray-400">Please enter your new password</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {errors.form && <div className="text-center text-sm text-red-500">{errors.form}</div>}

        <Input
          type="password"
          name="password"
          placeholder="New password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          disabled={isLoading}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  )
}

ResetPassword.propTypes = {
  uni_email: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
}
