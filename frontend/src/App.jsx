import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignUpPage } from './pages/SignUp'
import { SignInPage } from './pages/SignIn'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { NotFound } from './pages/NotFound'
import Landing from './pages/Landing'
import ProtectedRoutes from './pages/ProtectedRoutes'
import Chat from './pages/Chat'
import Posts from './pages/Posts'
import Dashboard from './components/feed/dashboard'
import DashboardProfile from './components/profile/dashboard-profile'
import Years from './pages/Years'
import Suggestions from './pages/suggestions'
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/signup/*" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<DashboardProfile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/year/:yearNumber" element={<Years />} />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
