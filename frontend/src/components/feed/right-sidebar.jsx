import { useState, useEffect } from 'react'
import api, { mediaUrl } from '../../services/api'
import { ACCESS_TOKEN } from '../../constants'

export default function RightSidebar() {
  const [recommendedUsers, setRecommendedUsers] = useState([])
  const [hoveredUser, setHoveredUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getProfileImage = (imageUrl) => {
    return imageUrl ? `${mediaUrl}${imageUrl}` : null
  }

  useEffect(() => {
    setIsLoading(true)
    api
      .get('recommendations/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((response) => {
        if (response.data.recommendations && response.data.recommendations.length > 0) {
          setRecommendedUsers(
            response.data.recommendations.slice(0, 5).map((user) => ({
              name: `${user.first_name} ${user.last_name}`,
              username: `@${user.first_name}${user.last_name}`,
              profileImage:
                getProfileImage(user.profile_image) ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name} ${user.last_name}`,
              major: user.major,
              skills: user.skills || [],
              interests: user.interests || [],
            }))
          )
        } else {
          // If no recommendations are returned, set fallback data
          setRecommendedUsers(getFallbackUsers())
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error)
        setRecommendedUsers(getFallbackUsers())
        setHasError(true)
        setIsLoading(false)
      })
  }, [])

  // Fallback users when API fails or returns empty
  const getFallbackUsers = () => {
    return [
      {
        name: 'Mohammed Ali',
        username: '@MohammedAli',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed Ali',
        major: 'Computer Science',
        skills: ['JavaScript', 'React', 'Node.js'],
        interests: ['Web Development', 'AI', 'Open Source'],
      },
      {
        name: 'Rami Ahmed',
        username: '@RamiAhmed',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rami Ahmed',
        major: 'Environmental Science',
        skills: ['Data Analysis', 'Project Management', 'Research'],
        interests: ['Sustainability', 'Climate Action', 'Innovation'],
      },
      {
        name: 'Sara Abdullah',
        username: '@SaraAbdullah',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara Abdullah',
        major: 'Software Engineering',
        skills: ['Python', 'Machine Learning', 'UX Design'],
        interests: ['Technology', 'Education', 'Hackathons'],
      },
    ]
  }

  return (
    <div className="m-2 w-[320px] rounded-2xl bg-gray-900/20 p-6">
      <div className="mb-8">
        <h3 className="mb-4 text-lg text-white">In Progress</h3>
        <div className="overflow-hidden rounded-xl border border-white/5 bg-white/5">
          <img
            src="src/assets/autmi.png"
            alt="Task Automation"
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h4 className="mb-1 text-white">Task Automation</h4>
            <p className="text-sm text-gray-400">Libraries</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg text-white">Suggested People</h3>
          {hasError && <span className="text-xs text-amber-400">Using fallback suggestions</span>}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex animate-pulse items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-700"></div>
                  <div>
                    <div className="h-3 w-24 rounded bg-gray-700"></div>
                    <div className="mt-1 h-2 w-16 rounded bg-gray-700"></div>
                  </div>
                </div>
                <div className="h-6 w-16 rounded-full bg-gray-700"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendedUsers.map((person) => (
              <div
                key={person.username}
                className="relative flex items-center justify-between"
                onMouseEnter={() => setHoveredUser(person)}
                onMouseLeave={() => setHoveredUser(null)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={person.profileImage}
                    alt={person.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm text-white">{person.name}</h4>
                    <p className="text-xs text-gray-500">{person.username}</p>
                  </div>
                </div>
                <button className="rounded-full bg-purple-500/10 px-4 py-1 text-sm text-purple-400 transition-colors hover:bg-purple-500/20">
                  Follow
                </button>

                {/* Hover Card */}
                {hoveredUser === person && (
                  <div className="absolute left-0 top-full z-50 mt-3 w-80">
                    <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-gray-900 to-black p-6 shadow-2xl">
                      <div className="mb-4 flex items-center gap-4">
                        <img
                          src={person.profileImage}
                          alt={person.name}
                          className="h-16 w-16 rounded-full ring-2 ring-purple-500/30"
                        />
                        <div>
                          <h4 className="text-lg font-semibold text-white">{person.name}</h4>
                          <p className="text-sm text-purple-300">{person.major}</p>
                        </div>
                      </div>

                      {person.skills.length > 0 && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-purple-300">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {person.skills.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
                              >
                                {skill}
                              </span>
                            ))}
                            {person.skills.length > 3 && (
                              <span className="text-sm text-purple-400">
                                +{person.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {person.interests.length > 0 && (
                        <div>
                          <p className="mb-2 text-sm font-medium text-purple-300">Interests</p>
                          <div className="flex flex-wrap gap-2">
                            {person.interests.slice(0, 3).map((interest, index) => (
                              <span
                                key={index}
                                className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
                              >
                                {interest}
                              </span>
                            ))}
                            {person.interests.length > 3 && (
                              <span className="text-sm text-purple-400">
                                +{person.interests.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg text-white">My Friends</h3>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Sara Abdullah', username: '@SaraAbdullah' },
            { name: 'Rahaf Abdullah', username: '@RahafAbdul' },
            { name: 'Daad Sami', username: '@DaSami' },
            { name: 'Shams hamad', username: '@SuHamad' },
            { name: 'Maab Mohammed', username: '@MaabMoh' },
          ]
            .slice(0, 5)
            .map((friend) => (
              <div key={friend.username} className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`}
                  alt={friend.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <h4 className="text-sm text-white">{friend.name}</h4>
                  <p className="text-xs text-gray-500">{friend.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
