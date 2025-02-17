import { useState, useRef, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/Button'
import api from '../../services/api'

export function OtpVerification({ onClose, onNext, email, verificationEndpoint = 'verify-email/' }) {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [errors, setErrors] = useState({
    inputs: ['', '', '', ''],
    form: '',
  })
  const inputRefs = useRef([...Array(4)].map(() => createRef()))
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(60)

  useEffect(() => {
    let intervalId
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [timer])

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
        form: 'Pasted content must contain only numbers',
      })
      return
    }

    const cleanData = pastedData.slice(0, 4)
    const newOtp = [...otp]
    const newErrors = {
      inputs: ['', '', '', ''],
      form: '',
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

    const nextEmptyIndex = newOtp.findIndex((digit) => digit === '')
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 4) {
      inputRefs.current[nextEmptyIndex].current.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')

    if (otpString.length !== 4) {
      setErrors({
        inputs: otp.map(digit => digit === '' ? 'Required' : ''),
        form: 'Please enter all 4 digits',
      })
      return
    }

    // Validate all digits are numbers
    if (!/^\d{4}$/.test(otpString)) {
      setErrors({
        inputs: otp.map(digit => !/^\d$/.test(digit) ? 'Only numbers allowed' : ''),
        form: 'Please enter valid numbers only',
      })
      return
    }

    setIsVerifying(true)
    setErrors({ inputs: ['', '', '', ''], form: '' })

    try {
    console.log(verificationEndpoint)
    console.log(email)  
    console.log(otpString)
      const response = await api.post(verificationEndpoint, {
        uni_email: email,
        otp: otpString,
      })

      if (response.status === 200) {
        onNext()
        onClose()
      } else {
        throw new Error('Verification failed')
      }
    } catch (error) {
      let errorMessage = 'Invalid OTP. Please try again.'
      
      if (error.response?.data?.error === 'OTP expired. Please request a new OTP.') {
        errorMessage = 'Your OTP has expired. Please request a new one.'
        setOtp(['', '', '', '']) // Clear OTP fields on expiration
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error
      }

      setErrors({
        inputs: ['', '', '', ''],
        form: errorMessage
      })
      
      // Focus first input on error for better UX
      inputRefs.current[0].current.focus()
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    setOtp(['', '', '', ''])
    setErrors({ inputs: ['', '', '', ''], form: '' })

    try {
      // Use the correct endpoint based on the verification type
      const endpoint = verificationEndpoint.includes('password-reset') 
        ? 'request-password-reset/' 
        : 'request-otp/'
      
      const response = await api.post(endpoint, { uni_email: email })
      
      if (response.status === 200) {
        setErrors({
          inputs: ['', '', '', ''],
        })
        setTimer(60) // Reset timer after successful resend
      }
      
      // Focus first input after successful resend
      inputRefs.current[0].current.focus()
    } catch (error) {
      setErrors({
        inputs: ['', '', '', ''],
        form: error.response?.data?.error || 'Failed to resend OTP. Please try again.'
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="relative mx-auto max-w-md space-y-6 rounded-lg border-2 border-gray-800 bg-slate-950 p-12">
      <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">OTP Verification</h1>
        <p className="text-sm text-gray-400">
          Please enter the One-Time Password (OTP) sent to your registered email
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.form && <div className="text-center text-sm text-red-500">{errors.form}</div>}
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
                className={`h-12 w-12 border-b-2 bg-transparent text-center text-xl ${errors.inputs[index] ? 'border-red-500' : 'border-gray-600'} focus:outline-none ${errors.inputs[index] ? 'focus:border-red-500' : 'focus:border-blue-500'} transition-all duration-200`}
                required
              />
              {errors.inputs[index] && (
                <span className="mt-1 text-xs text-red-500">{errors.inputs[index]}</span>
              )}
            </div>
          ))}
        </div>
        <Button
          type="submit"
          disabled={otp.join('').length !== 4 || isVerifying}
          className="w-full rounded-full bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Didn&apos;t receive the OTP?{' '}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending || timer > 0}
            className="text-blue-500 transition-colors hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? 'Resending...' : 'Resend OTP'}
          </button>
        </p>
        {timer > 0 && (
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resend available in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

OtpVerification.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  verificationEndpoint: PropTypes.string,
}
