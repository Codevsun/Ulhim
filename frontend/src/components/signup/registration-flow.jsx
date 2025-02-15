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
    
    setFormData((prev) => {
      const newData = {
        ...prev,
        ...stepData,
      }
      return newData
    })

    if (currentStep === 0) {
      setShowOtpModal(true)
      return
    }

    if (currentStep === steps.length - 2) {
      // Wait for state update to complete
      setTimeout(() => {
        const updatedFormData = {
          ...formData,
          ...stepData
        }
    
        handleRegistration(updatedFormData)
      }, 0)
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleRegistration = async (registrationFormData) => {
    try {
      setRegistrationError('')
      const yearNumber = parseInt(registrationFormData.year_in_college?.replace('Year ', '')) || null

      const registrationData = {
        uni_email: registrationFormData.uni_email,
        first_name: registrationFormData.first_name,
        last_name: registrationFormData.last_name,
        phone: registrationFormData.phone,
        year_in_college: yearNumber,
        major: registrationFormData.major,
        skills: Array.isArray(registrationFormData.skills) ? registrationFormData.skills : [],
        interests: Array.isArray(registrationFormData.interests) ? registrationFormData.interests : [],
        password: registrationFormData.password,
        username: registrationFormData.username || '',
        profile_image: registrationFormData.profile_image,
      }


      const response = await api.post('register/', registrationData)

      if (response.status === 201) {
        setCurrentStep(steps.length - 1)
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error)
      if (error.response?.data) {
        // Handle specific error messages from backend
        const errorMessage =
          typeof error.response.data === 'object'
            ? Object.values(error.response.data)[0]
            : error.response.data
        setRegistrationError(errorMessage)
      } else {
        setRegistrationError('Registration failed. Please try again.')
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
            <CurrentStep
              onNext={handleStepSubmit}
              formData={formData}
              isEmailVerified={isEmailVerified}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <OtpVerification
            email={formData.uni_email}
            onNext={handleOtpVerified}
            onClose={() => setShowOtpModal(false)}
          />
        </div>
      )}

      {registrationError && (
        <div className="mt-4 text-center text-red-500">{registrationError}</div>
      )}
    </div>
  )
}
