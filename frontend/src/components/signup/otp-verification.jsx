import { useState, useRef, createRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/Button'

export function OtpVerification({ onClose, onNext }) {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [errors, setErrors] = useState({
    inputs: ['', '', '', ''],
    form: ''
  })
  const inputRefs = useRef([...Array(4)].map(() => createRef()))

  const validateInput = (value) => {
    if (value === '') return 'Required'
    if (!/^\d+$/.test(value)) return 'Only numbers allowed'
    return ''
  }

  const handleChange = (index, value) => {
    const newErrors = { ...errors }
    newErrors.inputs[index] = validateInput(value)
    newErrors.form = ''
    setErrors(newErrors)

    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1].current.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)
      
      const newErrors = { ...errors }
      newErrors.inputs[index] = ''
      newErrors.form = ''
      setErrors(newErrors)
      
      if (index > 0) {
        inputRefs.current[index - 1].current.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].current.focus()
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1].current.focus()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    
    if (!/^\d+$/.test(pastedData)) {
      setErrors({
        inputs: ['', '', '', ''],
        form: 'Pasted content must contain only numbers'
      })
      return
    }

    const cleanData = pastedData.slice(0, 4)
    const newOtp = [...otp]
    const newErrors = {
      inputs: ['', '', '', ''],
      form: ''
    }
    
    for (let i = 0; i < 4; i++) {
      if (i < cleanData.length) {
        newOtp[i] = cleanData[i]
        newErrors.inputs[i] = validateInput(cleanData[i])
      } else {
        newOtp[i] = ''
        newErrors.inputs[i] = 'Required'
      }
    }
    
    setOtp(newOtp)
    setErrors(newErrors)

    const nextEmptyIndex = newOtp.findIndex(digit => digit === '')
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 4) {
      inputRefs.current[nextEmptyIndex].current.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {
      inputs: [...errors.inputs],
      form: ''
    }
    let hasError = false

    // Validate all inputs
    otp.forEach((digit, index) => {
      const error = validateInput(digit)
      if (error) {
        newErrors.inputs[index] = error
        hasError = true
      }
    })

    // Check for complete OTP
    if (otp.join('').length !== 4) {
      newErrors.form = 'Please enter all 4 digits'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    // TODO: Add API validation here
    // For now, simulating an invalid OTP error
    if (otp.join('') === '1111') {
      setErrors({
        inputs: ['Invalid', 'Invalid', 'Invalid', 'Invalid'],
        form: 'Invalid OTP. Please try again.'
      })
      return
    }

    onNext()
    onClose()
  }

  const handleResendOtp = () => {
    setOtp(['', '', '', ''])
    setErrors({
      inputs: ['', '', '', ''],
      form: ''
    })
    inputRefs.current[0].current.focus()
    // TODO: Add API call to resend OTP
  }

  return (
    <div className="space-y-6 bg-slate-950 border-2 border-gray-800 p-12 rounded-lg relative max-w-md mx-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">OTP Verification</h1>
        <p className="text-gray-400 text-sm">Please enter the One-Time Password (OTP) sent to your registered email</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.form && (
          <div className="text-red-500 text-sm text-center">{errors.form}</div>
        )}
        <div className="flex justify-center gap-4">
          {otp.map((digit, index) => (
            <div key={index} className="flex flex-col items-center">
              <input
                ref={inputRefs.current[index]}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-xl bg-transparent border-b-2 
                  ${errors.inputs[index] ? 'border-red-500' : 'border-gray-600'}
                  focus:outline-none ${errors.inputs[index] ? 'focus:border-red-500' : 'focus:border-blue-500'}
                  transition-all duration-200`}
                required
              />
              {errors.inputs[index] && (
                <span className="text-red-500 text-xs mt-1">{errors.inputs[index]}</span>
              )}
            </div>
          ))}
        </div>
        <Button 
          type="submit" 
          disabled={otp.join('').length !== 4}
          className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </Button>
      </form>
      <p className="text-center text-sm text-gray-400">
        Didn&apos;t receive the OTP? {' '}
        <button 
          type="button" 
          onClick={handleResendOtp}
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          Resend OTP
        </button>
      </p>
    </div>
  )
}

OtpVerification.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
}