import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SignUpPage } from './pages/signup'
import { SignInPage } from './pages/signin'
import { ForgotPasswordFlow } from './components/forgot-password/forgot-password-flow'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signup/*" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<Forgot PasswordFlow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
