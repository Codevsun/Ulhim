import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import { useState, useRef } from 'react'

export default function Profile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState('Tell others about yourself...')
  const [editingFeatured, setEditingFeatured] = useState(false)
  const [editingInProgress, setEditingInProgress] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)

  const {
    data: profile = {
      first_name: '',
      last_name: '',
      username: '',
      profile_image: 'http://localhost:8000/media/profile_images/CS_F_9.PNG',
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

  const handleDescriptionSave = () => {
    // TODO: Add API call to save description
    setIsEditing(false)
  }

  const handleFeaturedSave = () => {
    // TODO: Add API call to save featured projects
    setEditingFeatured(false)
  }

  const handleInProgressSave = () => {
    // TODO: Add API call to save in progress projects
    setEditingInProgress(false)
  }

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
              <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-8 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="group relative mb-6">
                    <img
                      src={
                        profileImage ||
                        profile.profile_image ||
                        'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
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
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-purple-400/10 px-3 py-1">
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
              <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
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
                  <button
                    onClick={() => navigate('/chat')}
                    className="flex w-full items-center gap-3 rounded-lg border-b border-white/5 px-4 py-3 text-gray-300 hover:bg-white/5"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Chat
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
          <div className="col-span-6 space-y-8">
            {/* About Me Section */}
            <div>
              <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
                About Me
                <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
              </h2>
              <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Who Am I</h3>
                  {isEditing ? (
                    <button
                      onClick={handleDescriptionSave}
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Edit
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-32 w-full resize-none rounded-lg border border-white/10 bg-gray-800/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                    placeholder="Tell others about yourself..."
                  />
                ) : (
                  <p className="text-gray-300">{description}</p>
                )}
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
                My Projects
                <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Featured Projects */}
                <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Featured</h3>
                    {editingFeatured ? (
                      <button
                        onClick={handleFeaturedSave}
                        className="text-sm text-purple-400 hover:text-purple-300"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingFeatured(true)}
                        className="text-sm text-purple-400 hover:text-purple-300"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {editingFeatured ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Project name"
                        className="w-full rounded-lg border border-white/10 bg-gray-800/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                      />
                      <textarea
                        placeholder="Project description"
                        className="h-24 w-full resize-none rounded-lg border border-white/10 bg-gray-800/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-300">
                      <p className="italic text-gray-500">No featured projects yet</p>
                    </div>
                  )}
                </div>

                {/* In Progress Projects */}
                <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">In Progress</h3>
                    {editingInProgress ? (
                      <button
                        onClick={handleInProgressSave}
                        className="text-sm text-purple-400 hover:text-purple-300"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingInProgress(true)}
                        className="text-sm text-purple-400 hover:text-purple-300"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {editingInProgress ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Project name"
                        className="w-full rounded-lg border border-white/10 bg-gray-800/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                      />
                      <textarea
                        placeholder="Project description"
                        className="h-24 w-full resize-none rounded-lg border border-white/10 bg-gray-800/50 p-3 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-300">
                      <p className="italic text-gray-500">No projects in progress</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Journey Section */}
            <div>
              <h2 className="mb-8 text-3xl font-light tracking-tight text-white">
                Academic Journey
                <div className="mt-2 h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
              </h2>
              <div className="grid grid-cols-2 gap-5">
                {[1, 2, 3, 4, 5].map((year) => (
                  <button
                    key={year}
                    onClick={() => navigate(`/year/${year}`)}
                    className={`group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] ${
                      year === 1 ? 'col-span-2' : ''
                    }`}
                  >
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/5 bg-black/30">
                        <svg
                          className="h-6 w-6 text-white/40 transition-colors duration-500 group-hover:text-white/80"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="block text-lg font-light text-white">Year {year}</span>
                        <span className="mt-1 block text-sm text-white/40">View details →</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Interests */}
          <div className="col-span-3 space-y-6">
            {/* Skills Section */}
            <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
              <h3 className="mb-4 text-lg font-medium text-white">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="transform cursor-default rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-3 py-1 text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests Section */}
            <div className="rounded-2xl border border-white/5 bg-gray-900/20 p-6">
              <h3 className="mb-4 text-lg font-medium text-white">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="transform cursor-default rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-3 py-1 text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
