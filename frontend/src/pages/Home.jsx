import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { motion } from 'framer-motion'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 p-8 text-center"
      >
        <h1 className="bg-gradient-to-r from-blue-100 to-gray-100 bg-clip-text text-4xl font-bold text-transparent">
          Welcome Home
        </h1>

        <p className="text-gray-400">This is your protected home page</p>

        <Button
          onClick={() => {
            localStorage.clear()
            navigate('/signin')
          }}
          className="min-w-[200px]"
        >
          Sign Out
        </Button>
      </motion.div>
    </div>
  )
}
