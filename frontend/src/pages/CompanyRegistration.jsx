'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles } from '../components/ui/Sparkles'
import { LucideArrowRight } from 'lucide-react'
import { ReactLenis } from 'lenis/react'
import { Logo } from '../components/signup/logo'

export default function CompanyRegistration() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company_name: '',
    company_email: '',
    cr_number: '',
    cr_certificate: null,
    agreed_to_terms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))
    } else if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Simulate API call with timeout
      setTimeout(() => {
        setSubmissionStatus('success')
        setIsSubmitting(false)
      }, 1500)
    } catch (error) {
      console.error('Registration error:', error)
      setError('Registration request failed. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-[#030305] bg-gradient-to-b from-black to-[#0a0611] text-white">
        <Sparkles className="opacity-50" />

        {/* Header */}
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <Logo />
          </Link>
        </div>

        {/* Form Content */}
        <div className="mx-auto mt-4 max-w-2xl px-6 pb-16">
          <AnimatePresence mode="wait">
            {submissionStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-2xl backdrop-blur-md"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 shadow-lg shadow-purple-600/30">
                    <svg
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-white">Registration Submitted</h2>
                  <p className="mb-4 max-w-md text-lg text-gray-300/90">
                    Thank you for your interest! Your company registration request has been
                    submitted for review.
                  </p>
                  <div className="mb-8 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-center text-purple-300 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3">
                      <span>
                        Please check your email <strong>{formData.company_email}</strong> for
                        approval status and further instructions.
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={() => navigate('/')}
                      className="group relative transform overflow-hidden rounded-full bg-purple-600 px-10 py-3.5 text-base font-medium text-white shadow-lg shadow-purple-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-600/40"
                    >
                      <span className="relative z-10">Return to Home</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-2xl backdrop-blur-md">
                  <h1 className="mb-4 bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-center text-3xl font-bold text-transparent">
                    Company Registration
                  </h1>
                  <p className="mb-8 text-center text-lg text-gray-300/90">
                    Register your company to connect with talented students and graduates.
                  </p>

                  {error && (
                    <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <svg
                          className="h-5 w-5 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all duration-200 focus:border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-600/50"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Company Email
                      </label>
                      <input
                        type="email"
                        name="company_email"
                        value={formData.company_email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all duration-200 focus:border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-600/50"
                        placeholder="company@example.com"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        CR Number
                      </label>
                      <input
                        type="text"
                        name="cr_number"
                        value={formData.cr_number}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all duration-200 focus:border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-600/50"
                        placeholder="Enter your CR number"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        CR Certificate (PDF)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="cr_certificate"
                          onChange={handleInputChange}
                          required
                          accept=".pdf"
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all duration-200 file:mr-4 file:rounded-full file:border-0 file:bg-purple-600/40 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-600/60"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-400">
                        Upload your CR certificate in PDF format (max 10MB)
                      </p>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="agreed_to_terms"
                          checked={formData.agreed_to_terms}
                          onChange={handleInputChange}
                          required
                          className="h-5 w-5 rounded-md border-purple-600/30 bg-white/5 text-purple-600 focus:ring-purple-600/30"
                        />
                        <span className="ml-3 text-sm text-gray-300">
                          I agree to the{' '}
                          <a
                            href="#"
                            className="font-medium text-purple-400 hover:text-purple-300 hover:underline"
                          >
                            Terms and Conditions
                          </a>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative mt-6 w-full transform overflow-hidden rounded-full bg-purple-900 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-purple-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-600/40 disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
                            Submitting...
                          </span>
                        ) : (
                          <>
                            Submit Registration
                            <LucideArrowRight className="ml-2 inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-400">
                      Already have an account?{' '}
                      <Link
                        to="/signin"
                        className="font-medium text-purple-400 hover:text-purple-300 hover:underline"
                      >
                        Sign in
                      </Link>
                    </p>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ambient Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-700/5 blur-3xl"></div>
          <div className="absolute right-1/4 top-3/4 h-64 w-64 rounded-full bg-blue-700/5 blur-3xl"></div>
        </div>
      </div>
    </ReactLenis>
  )
}
