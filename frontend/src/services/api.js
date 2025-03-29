import axios from 'axios'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { logout } from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
})

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Skip if already retried or not 401
    if (error.response?.status !== 401 || originalRequest.__isRetryRequest) {
      return Promise.reject(error)
    }

    originalRequest.__isRetryRequest = true

    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN)

      // Validate refresh token exists
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      // Make refresh request (without using the api instance to avoid loops)
      const { data } = await axios({
        method: 'post',
        url: 'refresh-token/',
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
        data: { refresh: refreshToken },
        skipAuthRefresh: true, // Custom property
      })

      // Validate response structure
      if (!data?.access) {
        throw new Error('Invalid token response')
      }

      // Store new tokens
      localStorage.setItem(ACCESS_TOKEN, data.access)
      if (data.refresh) {
        localStorage.setItem(REFRESH_TOKEN, data.refresh)
      }

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${data.access}`
      return api(originalRequest)
    } catch (refreshError) {
      // Clean up and redirect
      logout()
      window.location.href = '/signin'
      return Promise.reject(refreshError)
    }
  }
)

export default api
