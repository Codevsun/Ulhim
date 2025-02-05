import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Logo } from '../components/signup/logo'
import { Sparkles } from '../components/ui/Sparkles'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo className="mx-auto" />
      </div>
      <div className="text-center">
        <Sparkles></Sparkles>
        <h1 className="mb-4 text-6xl font-bold text-gray-100">404</h1>

        <h2 className="mb-2 text-2xl font-semibold text-gray-100">Page Not Found</h2>
        <p className="mb-6 text-gray-100">Oops! The page you are looking for doesn't exist.</p>
        <Button
          onClick={() => navigate('/signin')}
          type="button"
          className="cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          Return to Home
        </Button>
      </div>
    </div>
  )
}
