import { Logo } from '../components/signup/logo'
import { Sparkles } from '../components/ui/Sparkles'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo className="mx-auto" />
      </div>
      <div className="text-center">
        <Sparkles />
        <h1 className="mb-4 text-6xl font-bold text-gray-100">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-gray-100">Page Not Found</h2>
        <p className="mb-6 text-gray-100">Oops! The page you are looking for doesn&apos;t exist.</p>
        <Button onClick={() => navigate('/signin')} className="min-w-[200px]">
          Return to Sign In
        </Button>
      </div>
    </div>
  )
}

export default NotFound
