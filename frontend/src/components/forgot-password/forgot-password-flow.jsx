import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EmailVerification } from './email-verification'
import { ResetPassword } from './reset-password'
import { SuccessScreen } from './success-screen'
import { Logo } from '../signup/Logo'
import { OtpVerification } from '../signup/otp-verification'
import { Sparkles } from '../ui/Sparkles'

const steps = [
  EmailVerification,
  ResetPassword,
  SuccessScreen
]

export function ForgotPasswordFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const CurrentStep = steps[currentStep]

  const handleNext = () => {
    if (currentStep === 0) {
      setShowOtpModal(true)
      return
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleOtpVerified = () => {
    setShowOtpModal(false)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
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
            transition: 'transform 0.2s ease-out',
          }}
        />
      </div>

      <Sparkles />

      {/* Logo */}
      <div className="relative z-10 p-4 flex justify-center">
        <Logo className="p-8 scale-[2]" />
      </div>

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