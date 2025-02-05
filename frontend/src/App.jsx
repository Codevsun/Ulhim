import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SignUpPage } from './pages/SignUp'
import { SignInPage } from './pages/SignIn'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signup/*" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
