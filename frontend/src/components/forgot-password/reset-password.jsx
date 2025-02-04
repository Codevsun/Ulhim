import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function ResetPassword({ onNext }) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  })

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(formData.password)) {
      newErrors.password = 'Password should include letters, numbers and special characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
        <p className="text-gray-400">Please enter your new password</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          type="password"
          name="password"
          placeholder="New password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  )
}

ResetPassword.propTypes = {
  onNext: PropTypes.func.isRequired
} 