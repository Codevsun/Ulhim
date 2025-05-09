import { useState, useEffect } from 'react'
import Profile from './Profile'
import api from '../services/api'

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    major: '',
    yearInCollege: '',
    phone: '',
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })



  const [deleteAccountInfo, setDeleteAccountInfo] = useState({
    password: '',
    confirmText: '',
  })

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        const response = await api.get('profile/')
        const userData = response.data
        setPersonalInfo({
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          username: userData.username || '',
          email: userData.email || '',
          major: userData.major || '',
          yearInCollege: userData.year_in_college || '',
          phone: userData.phone || '',
        })
      } catch (error) {
        console.error('Failed to fetch user data', error)
        showToast('Failed to load your profile data', 'error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' })
    }, 3000)
  }

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordInfo({
      ...passwordInfo,
      [name]: value,
    })
  }

  const handleDeleteAccountChange = (e) => {
    const { name, value } = e.target
    setDeleteAccountInfo({
      ...deleteAccountInfo,
      [name]: value,
    })
  }


  const savePersonalInfo = async () => {
    try {
      await api.post('user-personal-info-modify/', {
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        username: personalInfo.username,
        email: personalInfo.email,
        major: personalInfo.major,
        year_in_college: personalInfo.yearInCollege,
        phone: personalInfo.phone,
      })
      showToast('Personal information updated successfully')
    } catch (error) {
      console.error('Failed to update personal information', error)
      showToast(error.response?.data?.message || 'Failed to update personal information', 'error')
    }
  }

  const changePassword = async () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      showToast('New passwords do not match', 'error')
      return
    }

    try {
      await api.post('user-change-password/', {
        current_password: passwordInfo.currentPassword,
        new_password: passwordInfo.newPassword,
      })
      showToast('Password changed successfully')
      setPasswordInfo({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.error('Failed to change password', error)
      showToast(error.response?.data?.message || 'Failed to change password', 'error')
    }
  }

  const deleteAccount = async () => {
    if (deleteAccountInfo.confirmText !== 'DELETE') {
      showToast('Please type DELETE to confirm account deletion', 'error')
      return
    }

    try {
      await api.post('user-delete-account/', {
        password: deleteAccountInfo.password,
      })
      showToast('Your account has been deleted')
      // Redirect to login page or home page
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } catch (error) {
      console.error('Failed to delete account', error)
      showToast(error.response?.data?.message || 'Failed to delete account', 'error')
    }
  }

  if (isLoading) {
    return (
      <Profile>
        <div className="col-span-6 flex h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </Profile>
    )
  }

  return (
    <Profile>
      {toast.show && (
        <div className={`fixed right-4 top-4 z-50 flex items-center rounded-lg p-4 shadow-lg transition-all duration-300 ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
            {toast.type === 'error' ? (
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="text-sm font-medium text-white">{toast.message}</div>
        </div>
      )}
      <div className="col-span-6 space-y-8 pb-12">
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
            Settings
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-blue-500 to-transparent"></div>
          </h2>

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center text-xl font-light text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Personal Information
            </h3>
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={personalInfo.username}
                    onChange={handlePersonalInfoChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="+9665XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Major</label>
                  <select
                    name="major"
                    value={personalInfo.major}
                    onChange={handlePersonalInfoChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Major</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Computer Information Systems">
                      Computer Information Systems
                    </option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Year in College
                  </label>
                  <select
                    name="yearInCollege"
                    value={personalInfo.yearInCollege}
                    onChange={handlePersonalInfoChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Year</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                    <option value="5">Year 5</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={savePersonalInfo}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-white transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Save Information
                </button>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center text-xl font-light text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Change Password
            </h3>
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-xl">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordInfo.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your current password"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordInfo.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your new password"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordInfo.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={changePassword}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-white transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Delete Account */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center text-xl font-light text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete Account
            </h3>
            <div className="rounded-2xl border border-red-500/20 bg-gray-800/30 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-red-500/30 hover:shadow-xl">
              <p className="mb-4 text-white/80">
                Warning: Deleting your account is permanent and cannot be undone. All your data will
                be permanently removed.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={deleteAccountInfo.password}
                    onChange={handleDeleteAccountChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter your password to confirm"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Type &quot;DELETE&quot; to confirm
                  </label>
                  <input
                    type="text"
                    name="confirmText"
                    value={deleteAccountInfo.confirmText}
                    onChange={handleDeleteAccountChange}
                    className="w-full rounded-lg border border-white/10 bg-gray-900 p-2.5 text-white transition-colors focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Type DELETE to confirm"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={deleteAccount}
                  className="rounded-lg bg-red-600 px-6 py-2.5 text-white transition-all hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  )
}
