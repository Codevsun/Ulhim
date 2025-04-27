import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api, { mediaUrl } from '../services/api'
import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

export default function Profile({ children }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [profileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)
  const [editingSkills, setEditingSkills] = useState(false)
  const [editingInterests, setEditingInterests] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')

  const {
    data: profile = {
      first_name: '',
      last_name: '',
      username: '',
      profile_image: 'profile_images/CS_F_9.PNG',
      major: '',
      year_in_college: '',
      stats: {
        followers_count: 0,
        following_count: 0,
        posts_count: 0,
      },
      skills: [''],
      interests: [''],
    },
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('profile/')
      console.log(response.data)
      return response.data
    },
  })

  const handleProfileImageClick = () => {
    fileInputRef.current.click()
  }

  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  const uploadProfileImage = async (file) => {
    setIsUploadingImage(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append('profile_image', file)

      const response = await api.post('update-profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error) {
      console.error('Error uploading profile image:', error)
      setUploadError(error.response?.data?.message || 'Failed to upload image')
      throw error
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Show preview immediately
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)

      // Upload the file to the server
      uploadProfileImage(file)
        .then(() => {
          // Success notification could be added here
          console.log('Profile image updated successfully')
        })
        .catch(() => {
          // Error is already handled in uploadProfileImage
        })
    }
  }

  const updateSkillsMutation = useMutation({
    mutationFn: async (skills) => {
      return await api.post('user-skills-modify/', { skills })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
      setEditingSkills(false)
    },
  })

  const updateInterestsMutation = useMutation({
    mutationFn: async (interests) => {
      return await api.post('user-interests-modify/', { interests })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
      setEditingInterests(false)
    },
  })

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...profile.skills, newSkill.trim()]
      updateSkillsMutation.mutate(updatedSkills)
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = profile.skills.filter((skill) => skill !== skillToRemove)
    updateSkillsMutation.mutate(updatedSkills)
  }

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      const updatedInterests = [...profile.interests, newInterest.trim()]
      updateInterestsMutation.mutate(updatedInterests)
      setNewInterest('')
    }
  }

  const handleRemoveInterest = (interestToRemove) => {
    const updatedInterests = profile.interests.filter((interest) => interest !== interestToRemove)
    updateInterestsMutation.mutate(updatedInterests)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation */}
      <nav className="bg-black-900/80 fixed left-0 right-0 top-0 z-50 border-b border-white/10 backdrop-blur-sm">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="h-12 w-auto object-contain" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="rounded-full p-1 text-gray-300 hover:bg-white/10 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button className="rounded-full p-1 text-gray-300 hover:bg-white/10 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
              <button className="rounded-full p-1 text-gray-300 hover:bg-white/10 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-[1920px] px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Profile Info */}
          <div className="relative col-span-3">
            <div className="sticky top-24 w-full space-y-8">
              {/* Profile Card */}
              <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-8 shadow-lg backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="group relative mb-6">
                    <img
                      src={
                        profileImage ||
                        (profile.profile_image
                          ? `${mediaUrl}${profile.profile_image}`
                          : 'https://api.dicebear.com/7.x/avataaars/svg?seed=default')
                      }
                      alt="Profile"
                      className="h-40 w-40 cursor-pointer rounded-full object-cover transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      onClick={handleProfileImageClick}
                    />
                    <div
                      className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={handleProfileImageClick}
                    >
                      {isUploadingImage ? (
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      ) : (
                        <svg
                          className="h-8 w-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                    {uploadError && <p className="mt-2 text-sm text-red-400">{uploadError}</p>}
                  </div>
                  <h3 className="text-2xl font-medium text-white">
                    {profile.first_name} {profile.last_name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">@{profile.username}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-purple-400/20 px-3 py-1">
                    <span className="text-sm font-medium text-purple-400">{profile.major}</span>
                    <span className="h-1 w-1 rounded-full bg-purple-400/50"></span>
                    <span className="text-sm text-purple-300/80">
                      Year {profile.year_in_college}
                    </span>
                  </div>

                  <div className="mt-8 flex w-full justify-between text-sm">
                    <div className="text-center">
                      <div className="text-lg font-medium text-white">
                        {profile.stats.followers_count}
                      </div>
                      <div className="text-gray-500">Followers</div>
                    </div>
                    <div className="border-x border-white/5 px-8 text-center">
                      <div className="text-lg font-medium text-white">
                        {profile.stats.following_count}
                      </div>
                      <div className="text-gray-500">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-white">
                        {profile.stats.posts_count}
                      </div>
                      <div className="text-gray-500">Posts</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/home')}
                    className="flex w-full items-center gap-3 rounded-lg border-b border-white/5 px-4 py-3 text-gray-300 hover:bg-white/5"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    Home
                  </button>
                  <button
                    onClick={() => navigate('/posts')}
                    className="flex w-full items-center gap-3 rounded-lg border-b border-white/5 px-4 py-3 text-gray-300 hover:bg-white/5"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                      />
                    </svg>
                    Feed
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-300 hover:bg-white/5">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Content */}
          {children}
          {/* Right Column - Skills & Interests */}
          <div className="col-span-3 space-y-6">
            {/* Skills Section */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Skills</h3>
                <button
                  onClick={() => setEditingSkills(!editingSkills)}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  {editingSkills ? 'Done' : 'Edit'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex transform cursor-default items-center rounded-full border border-purple-500/40 bg-gradient-to-r from-purple-500/40 to-pink-500/40 px-3 py-1 text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  >
                    {skill}
                    {editingSkills && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-white/70 hover:text-white"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editingSkills && (
                <div className="mt-4 flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    className="flex-1 rounded-l-lg bg-gray-700/50 px-3 py-2 text-white placeholder-gray-400 outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <button
                    onClick={handleAddSkill}
                    className="rounded-r-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Interests Section */}
            <div className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Interests</h3>
                <button
                  onClick={() => setEditingInterests(!editingInterests)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  {editingInterests ? 'Done' : 'Edit'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="flex transform cursor-default items-center rounded-full border border-blue-500/40 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 px-3 py-1 text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  >
                    {interest}
                    {editingInterests && (
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-2 text-white/70 hover:text-white"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editingInterests && (
                <div className="mt-4 flex">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add a new interest"
                    className="flex-1 rounded-l-lg bg-gray-700/50 px-3 py-2 text-white placeholder-gray-400 outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                  />
                  <button
                    onClick={handleAddInterest}
                    className="rounded-r-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  children: PropTypes.node.isRequired,
}
