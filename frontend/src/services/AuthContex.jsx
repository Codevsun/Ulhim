import { createContext, useContext, useState, useEffect } from 'react'
import api from './api'
import PropTypes from 'prop-types'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on app load
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token')
        if (token) {
          const { data } = await api.get('profile/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setCurrentUser(data)
        }
      } catch (error) {
        console.error('Session check failed:', error)
        localStorage.removeItem('access_token')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const value = {
    currentUser,
    loading,
    login: async (credentials) => {
      const { data } = await api.post('/api/auth/login/', credentials)
      localStorage.setItem('access_token', data.access)
      setCurrentUser(data.user)
    },
    logout: () => {
      localStorage.removeItem('access_token')
      setCurrentUser(null)
    },
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

// Export as a named constant instead of a function to fix Fast Refresh compatibility
export const useAuth = () => {
  return useContext(AuthContext)
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
