import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EmailVerification } from '../signup/email-verification'
import { UserDetails } from '../signup/user-details'
import { MajorSelection } from '../signup/major-selection'
import { YearSelection } from '../signup/year-selection'
import { SkillsSelection } from '../signup/skills-selection'
import { InterestsSelection } from '../signup/interests-selection'
import { SuccessScreen } from '../signup/success-screen'
import { Logo } from '../signup/Logo'
import { OtpVerification } from '../signup/otp-verification'
import { Sparkles } from '../ui/Sparkles'
import api from '../../services/api'

const steps = [
  EmailVerification,
  UserDetails,
  MajorSelection,
  YearSelection,
  SkillsSelection,
  InterestsSelection,
  SuccessScreen,
]

export function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const CurrentStep = steps[currentStep]
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [registrationError, setRegistrationError] = useState('')

  const [formData, setFormData] = useState({
    uni_email: '',
    first_name: '',
    last_name: '',
    phone: '',
    year_in_college: null,
    major: '',
    skills: [],
    interests: [],
    password: '',
    username: '',
    profile_image: null,
  })

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

  const handleStepSubmit = async (stepData) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }))

    if (currentStep === 0) {
      setShowOtpModal(true)

      return
    }

    if (currentStep === steps.length - 2) {
      handleRegistration()
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleRegistration = async () => {
    try {
      setRegistrationError('')
      const yearNumber = parseInt(formData.year_in_college?.replace('Year ', '')) || null

      const registrationData = {
        ...formData,
        year_in_college: yearNumber,
      }

      const response = await api.post('register/', registrationData)

      if (response.status === 201) {
        setCurrentStep(steps.length - 1)
      }
    } catch (error) {
      console.error('Registration error:', error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setRegistrationError(
          error.response.data.message || 'Registration failed. Please try again.'
        )
      } else if (error.request) {
        // The request was made but no response was received
        setRegistrationError('No response from server. Please check your connection.')
      } else {
        // Something happened in setting up the request that triggered an Error
        setRegistrationError('An error occurred. Please try again.')
      }
    }
  }

  const handleOtpVerified = () => {
    setIsEmailVerified(true)
    setShowOtpModal(false)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-10">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-gray-500" />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden">
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

      {/* Logo */}
      <div className="relative z-10 p-4">
        <Logo className="p-4" />
      </div>

      <Sparkles />

      {/* Progress Steps */}
      {isEmailVerified && (
        <div className="relative z-10 mx-auto mb-12 w-full max-w-5xl px-4 sm:px-8">
          <div className="flex items-center justify-between">
            {['Verify Email', 'Your Details', 'Done'].map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Connecting Lines */}
                {index < 2 && (
                  <>
                    <div
                      className={`absolute left-[calc(100%+4rem)] top-6 hidden h-[2px] w-[calc(200%-1rem)] sm:block ${
                        currentStep > index * 3 ? 'bg-blue-500' : 'bg-gray-700'
                      }`}
                    />
                    <div
                      className={`absolute left-[calc(100%+1.5rem)] top-5 block h-[3px] w-[calc(150%-3rem)] sm:hidden ${
                        currentStep > index * 3 ? 'bg-blue-500' : 'bg-gray-700'
                      }`}
                    />
                  </>
                )}

                {/* Circle */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 ${
                    currentStep >= index * 3
                      ? 'border-2 border-blue-500'
                      : 'border-2 border-gray-700'
                  }`}
                >
                  {currentStep > index * 3 ? (
                    <svg
                      className="h-7 w-7 text-white sm:h-8 sm:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-lg text-white sm:text-xl">{index + 1}</span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-2 text-center text-sm font-medium text-gray-400 sm:mt-3 sm:text-base">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logo */}
      {!isEmailVerified && (
        <div className="relative z-10 flex justify-center p-4">
          <Logo className="scale-[2] p-8" />
        </div>
      )}

      {/* Form Content */}
      <div className="relative z-10 mx-auto mt-12 max-w-xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStep onNext={handleStepSubmit} formData={formData} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <OtpVerification
            onClose={() => setShowOtpModal(false)}
            onNext={handleOtpVerified}
            email={formData.uni_email}
          />
        </div>
      )}

      {registrationError && (
        <div className="mt-4 text-center text-red-500">{registrationError}</div>
      )}
    </div>
  )
}
