import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export function SuccessScreen() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-100 to-gray-100 bg-clip-text text-transparent">
          Password Reset Successfully!
        </h1>
        
        <p className="text-xl font-medium">
          Your password has been securely updated
        </p>

        <p className="text-gray-400">
          You can now sign in to your account with your new password
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          onClick={() => navigate('/signin')}
          className="min-w-[200px]"
        >
          Return to Sign In
        </Button>
      </motion.div>
    </div>
  )
}