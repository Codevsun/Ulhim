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

const steps = [
  EmailVerification,
  UserDetails,
  MajorSelection,
  YearSelection,
  SkillsSelection,
  InterestsSelection,
  SuccessScreen
]

export function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const CurrentStep = steps[currentStep]
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

    const handleNext = () => {
    if (currentStep === 0) {
      setShowOtpModal(true)
      return
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleOtpVerified = () => {
    setIsEmailVerified(true)
    setShowOtpModal(false)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
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
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 mb-12">
          <div className="flex items-center justify-between">
          {['Verify Email', 'Your Details', 'Done'].map((step, index) => (
              <div key={index} className="flex flex-col items-center relative">
                {/* Connecting Lines */}
                {index < 2 && (
                  <>
                    <div 
                      className={`hidden sm:block absolute left-[calc(100%+4rem)] top-6 h-[2px] w-[calc(200%-1rem)] ${
                        currentStep > index * 3 ? 'bg-blue-500' : 'bg-gray-700'
                      }`}
                    />
                    <div 
                      className={`block sm:hidden absolute left-[calc(100%+1.5rem)] top-5 h-[3px] w-[calc(150%-3rem)] ${
                        currentStep > index * 3 ? 'bg-blue-500' : 'bg-gray-700'
                      }`}
                    />
                  </>
                )}
                
                {/* Circle */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${
                    currentStep >= index * 3 ? 'border-blue-500 border-2' : 'border-gray-700 border-2'
                  }`}
                >
                  {currentStep > index * 3 ? (
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-white text-lg sm:text-xl">{index + 1}</span>
                  )}
                </div>
                
                {/* Label */}
                <div className="text-sm sm:text-base mt-2 sm:mt-3 text-gray-400 font-medium text-center">{step}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logo */}
      {!isEmailVerified && (
        <div className="relative z-10 p-4 flex justify-center">
          <Logo className="p-8 scale-[2]" />
        </div>
      )}

      {/* Form Content */}
      <div className="relative z-10 max-w-xl mx-auto px-4 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStep onNext={handleNext} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <OtpVerification 
            onClose={() => setShowOtpModal(false)}
            onNext={handleOtpVerified}
          />
        </div>
      )}
    </div>
  )
} 