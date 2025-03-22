import axios from 'axios'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Check if the error is due to an expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/refresh-token/`,
          {
            refresh: refreshToken,
          }
        )

        // Update the access token in local storage
        localStorage.setItem(ACCESS_TOKEN, response.data.access)

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
        return api(originalRequest)
      } catch (refreshError) {
        // If token refresh fails, clear tokens and redirect to sign-in
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        window.location.href = '/signin'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
