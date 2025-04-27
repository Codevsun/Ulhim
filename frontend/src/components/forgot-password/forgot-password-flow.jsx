import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EmailVerification } from './email-verification'
import { ResetPassword } from './reset-password'
import { SuccessScreen } from './success-screen'

import { OtpVerification } from '../signup/otp-verification'
import { Sparkles } from '../ui/Sparkles'
import { Logo } from '../signup/Logo'

const steps = [EmailVerification, ResetPassword, SuccessScreen]

export function ForgotPasswordFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [formData, setFormData] = useState({
    uni_email: '',
  })

  const handleNext = (stepData) => {
    if (currentStep === 0) {
      // Save the email when it comes from EmailVerification
      setFormData((prev) => ({
        ...prev,
        ...(stepData.uni_email ? { uni_email: stepData.uni_email } : {}),
      }))
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
    <div className="container relative mx-auto min-h-screen px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 z-0">
        <Sparkles />
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2">
        <Logo className="p-4" />
      </div>

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
            {currentStep === 0 ? (
              <EmailVerification onNext={handleNext} />
            ) : currentStep === 1 ? (
              <ResetPassword onNext={handleNext} uni_email={formData.uni_email} />
            ) : (
              <SuccessScreen />
            )}
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
            verificationEndpoint="verify-password-reset-otp/"
          />
        </div>
      )}
    </div>
  )
}
