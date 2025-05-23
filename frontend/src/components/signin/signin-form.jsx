import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Logo } from '../signup/logo'
import { Sparkles } from '../ui/Sparkles'
import api from '../../services/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'

export function SignInForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    agreeToTerms: '',
    form: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const validateEmail = (email) => {
    const iauPattern = /^[a-zA-Z0-9._%+-]+@iau\.edu\.sa$/
    return iauPattern.test(email)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
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

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the Terms of Service and Content Publishing Agreement'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...newErrors, form: '' })
      return
    }

    setIsLoading(true)
    try {
      console.log(formData)
      const response = await api.post('token/', {
        uni_email: formData.email,
        password: formData.password,
      })
      if (response.data.access) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
        
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
        navigate('/home')
      } else {
        throw new Error('No access token received')
      }
    } catch (error) {
      setErrors({
        ...errors,
        form: error.response?.data?.error || 'Invalid email or password',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#050508] to-[#0a0610] text-white">
      {/* Logo at top center */}
      <div className="absolute left-1/2 top-12 z-20 -translate-x-1/2">
        <Logo className="scale-[2]" />
      </div>

      {/* Elegant dark grid overlay with gradient fade */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[50%] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Darker purple blur effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-purple-900/5 blur-[120px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-900/5 blur-[150px] sm:h-[600px] sm:w-[600px]" />
      </div>

      <Sparkles />

      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[#0d0812] p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold text-white">Terms of Service & Content Publishing Agreement</h2>
            <div className="prose prose-sm prose-invert">
              <h3 className="text-lg font-semibold">1. Content Publishing Terms</h3>
              <p>By accepting these terms, you acknowledge and agree that:</p>
              <ul className="list-disc pl-5 text-sm text-gray-300">
                <li>All projects you submit will be published on our platform and visible to other users</li>
                <li>You retain ownership of your intellectual property rights</li>
                <li>You grant us a non-exclusive license to display and share your content</li>
                <li>You warrant that your submissions don&apos;t infringe on others&apos; rights</li>
              </ul>

              <h3 className="mt-4 text-lg font-semibold">2. Privacy & Data Usage</h3>
              <p className="text-sm text-gray-300">
                Your content will be used to enhance platform functionality, including but not limited to recommendation systems and user matching features.
              </p>

              <h3 className="mt-4 text-lg font-semibold">3. Content Guidelines</h3>
              <p className="text-sm text-gray-300">
                All published content must adhere to academic integrity standards and university policies.
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowTerms(false)}
                className="rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              <h1 className="bg-gradient-to-r from-gray-100 via-slate-100 to-zinc-100 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(148,163,184,0.1)]">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-500">
                Uncover the untapped potential of your growth to connect with similar students !!
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl border border-white/[0.02] bg-gradient-to-br from-[#050508] to-[#0d0812] p-8 shadow-2xl backdrop-blur-sm"
            >
              {errors.form && (
                <div className="rounded bg-red-500/5 py-2 text-center text-sm text-red-400">
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
                disabled={isLoading}
                className="border-white/[0.02] bg-white/[0.02]"
              />

              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isLoading}
                className="border-white/[0.02] bg-white/[0.02]"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-gray-500">
                  <input
                    type="checkbox"
                    className="form-checkbox border-white/[0.02] bg-white/[0.02]"
                  />
                  <span>Keep me logged in</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-300 hover:text-purple-200"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="space-y-2">
                <label className="flex items-start space-x-2 text-sm text-gray-500">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 form-checkbox border-white/[0.02] bg-white/[0.02]"
                  />
                  <span>
                    <button 
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-purple-300 hover:text-purple-200 underline"
                    >
                      Terms of Service & Content Publishing Agreement
                    </button>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <div className="text-sm text-red-400">{errors.agreeToTerms}</div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-full border border-white/[0.02] bg-white/[0.02] px-8 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/[0.05] disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-purple-300 hover:text-purple-200">
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
