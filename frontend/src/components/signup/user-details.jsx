import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function UserDetails({ onNext }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '', 
    phone: '',
    username: '',
    password: ''
  })

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^(05)\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid Saudi phone number starting with 05'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(formData.password)) {
      newErrors.password = 'Password should include letters, numbers and special characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Show all field errors if form is empty
    if (Object.values(formData).every(value => !value.trim())) {
      setErrors({
        firstName: 'First name is required',
        lastName: 'Last name is required',
        phone: 'Phone number is required',
        username: 'Username is required',
        password: 'Password is required'
      })
      return
    }

    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Enter your details</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <Input
          type="tel"
          name="phone"
          placeholder="Phone (e.g. 0512345678)"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <div className="space-y-2">
          <Input
            type="password"
            name="password"
            placeholder="Password (min 8 characters)"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <p className="text-gray-400 text-sm">Password must be at least 8 characters long</p>
        </div>

        <Button type="submit">
          Next
        </Button>
      </form>
    </div>
  )
}

UserDetails.propTypes = {
  onNext: PropTypes.func.isRequired
}