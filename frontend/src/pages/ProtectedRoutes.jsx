import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import api from '../services/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ProtectedRoutes = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null)

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      const response = await api.post('refresh-token/', { refresh: refreshToken })
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.error(error)
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(REFRESH_TOKEN)
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (!accessToken) {
      setIsAuthorized(false)
      return
    }
    const decodedToken = jwtDecode(accessToken)
    if (decodedToken.exp < Date.now() / 1000) {
      await refreshToken()
    } else {
      setIsAuthorized(true)
    }
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>
  }

  return isAuthorized ? children : <Navigate to="/signin" />
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedRoutes
