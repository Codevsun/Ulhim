import { useQuery } from '@tanstack/react-query'
import api, { mediaUrl } from '../../services/api'

// Default profile state
const defaultProfile = {
  first_name: '',
  last_name: '',
  username: '',
  profile_image: null,
  stats: {
    followers_count: 0,
    following_count: 0,
    posts_count: 0,
  },
}

export default function PersonalInfoCard() {
  // Using React Query to fetch profile data
  const {
    data: profile = defaultProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('profile/')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache data for 30 minutes
    retry: 2, // Retry failed requests twice
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  })

  // Generate profile image URL
  const profileImageUrl = profile.profile_image
    ? `${mediaUrl}${profile.profile_image}`
    : 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'

  // Show loading state
  if (isLoading) {
    return (
      <div className="mt-4 rounded-2xl bg-gray-900/20 p-6 backdrop-blur-sm">
        <div className="flex animate-pulse items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-700"></div>
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-700"></div>
            <div className="h-3 w-32 rounded bg-gray-700"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="h-8 w-16 rounded bg-gray-700"></div>
          <div className="h-8 w-16 rounded bg-gray-700"></div>
          <div className="h-8 w-16 rounded bg-gray-700"></div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    console.log(error)
    return (
      <div className="mt-4 rounded-2xl bg-red-900/20 p-6 backdrop-blur-sm">
        <p className="text-red-400">Failed to load profile</p>
      </div>
    )
  }

  return (
    <a href="/profile" className="group block">
      <div className="mt-4 transform rounded-2xl bg-gray-900/20 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-gray-800/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-3">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="h-12 w-12 rounded-full transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:ring-2 group-hover:ring-white/50"
          />
          <div>
            <h3 className="text-white transition-colors duration-300 group-hover:text-white/90">
              {profile.first_name} {profile.last_name}
            </h3>
            <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-300">
              @{profile.username}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-sm">
          <div className="text-center transition-all duration-300 hover:-translate-y-1 hover:transform">
            <div className="font-medium text-white group-hover:text-white/90">
              {profile.stats.followers_count}
            </div>
            <div className="text-gray-500 group-hover:text-gray-300">Followers</div>
          </div>
          <div className="text-center transition-all duration-300 hover:-translate-y-1 hover:transform">
            <div className="font-medium text-white group-hover:text-white/90">
              {profile.stats.following_count}
            </div>
            <div className="text-gray-500 group-hover:text-gray-300">Following</div>
          </div>
          <div className="text-center transition-all duration-300 hover:-translate-y-1 hover:transform">
            <div className="font-medium text-white group-hover:text-white/90">
              {profile.stats.posts_count}
            </div>
            <div className="text-gray-500 group-hover:text-gray-300">Posts</div>
          </div>
        </div>
      </div>
    </a>
  )
}
