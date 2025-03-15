import axios from 'axios'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  },
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem(REFRESH_TOKEN)
    const response = await api.post('refresh-token/', { refresh })
    const { access, refresh: newRefresh } = response.data

    localStorage.setItem(ACCESS_TOKEN, access)
    localStorage.setItem(REFRESH_TOKEN, newRefresh)

    return access
  } catch (error) {
    console.error('Token refresh error:', error)
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    window.location.href = '/signin'
    return null
  }
}

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem(ACCESS_TOKEN)

    if (token) {
      try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decoded.exp < currentTime) {
          if (!isRefreshing) {
            isRefreshing = true
            token = await refreshToken()
            isRefreshing = false
            processQueue(null, token)
          } else {
            // Wait for the refresh to complete
            try {
              token = await new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject })
              })
            } catch (err) {
              return Promise.reject(err)
            }
          }
        }
      } catch (error) {
        console.error('Token decode error:', error)
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const newToken = await refreshToken()
          isRefreshing = false

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            processQueue(null, newToken)
            return api(originalRequest)
          }
        } catch (refreshError) {
          processQueue(refreshError, null)
          return Promise.reject(refreshError)
        }
      } else {
        // Wait for the refresh to complete
        try {
          const newToken = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api
