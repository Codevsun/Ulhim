import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignUpPage } from './pages/SignUp'
import { SignInPage } from './pages/SignIn'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { NotFound } from './pages/NotFound'
import { HomePage } from './pages/Home'
import ProtectedRoutes from './pages/ProtectedRoutes'
import Landing from './pages/Landing'

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/signup/*" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
