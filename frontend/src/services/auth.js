import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  // Optional: Call backend logout endpoint
}

export const isAuthenticated = () => {
  const token = localStorage.getItem(ACCESS_TOKEN)
  if (!token) return false

  // Optional: Add JWT expiration check
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}
