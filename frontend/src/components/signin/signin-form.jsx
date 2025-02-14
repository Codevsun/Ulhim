import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Logo } from '../signup/logo'
import { Sparkles } from '../ui/Sparkles'

export function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: '',
  })

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const validateEmail = (email) => {
    const iauPattern = /^[a-zA-Z0-9._%+-]+@iau\.edu\.sa$/
    return iauPattern.test(email)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '', form: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid university email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...newErrors, form: '' })
      return
    }

    // TODO: Add API integration
    try {
      // Simulate API call
      if (formData.email === 'test@iau.edu.sa' && formData.password === 'wrong') {
        setErrors({
          ...errors,
          form: 'Invalid email or password',
        })
        return
      }

      // Handle successful login
      console.log('Login successful')
    } catch (errors) {
      setErrors({
        ...errors,
        form: 'An error occurred. Please try again.',
      })
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
      {/* Logo at top center */}
      <div className="absolute left-1/2 top-12 z-20 -translate-x-1/2">
        <Logo className="scale-[2]" />
      </div>

      {/* Modern spotlights with higher z-index and opacity */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div
          className="absolute h-[500px] w-[500px] rounded-full mix-blend-screen blur-[100px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(124, 58, 237, 0.4), transparent 70%)',
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out',
          }}
        />
        <div
          className="absolute h-[800px] w-[800px] rounded-full mix-blend-screen blur-[120px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(139, 92, 246, 0.3), transparent 70%)',
            left: `${(1 - mousePosition.x) * 100}%`,
            top: `${(1 - mousePosition.y) * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out',
          }}
        />
      </div>

      {/* Dark background with reduced opacity */}
      <div
        className="absolute inset-0 z-0 bg-black/70 backdrop-blur-[100px]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%)
          `,
        }}
      />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
      </div>

      <Sparkles />

      <AnimatePresence mode="wait">
        <motion.div
          key="signin-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 mx-auto w-full max-w-md px-4"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
              <p className="text-lg text-gray-400">
                Uncover the untapped potential of your growth to connect with similar students !!
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {errors.form && (
                <div className="rounded bg-red-500/10 py-2 text-center text-sm text-red-500">
                  {errors.form}
                </div>
              )}

              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Keep me logged in</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-400">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <p className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:text-blue-400">
                  Sign up
                </Link>
              </p>
            </motion.form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
