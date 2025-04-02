import { useState, useEffect } from 'react'
import api from '../../services/api'
import { ACCESS_TOKEN } from '../../constants'
export default function RightSidebar() {
  const [recommendedUsers, setRecommendedUsers] = useState([])
  const [hoveredUser, setHoveredUser] = useState(null)

  useEffect(() => {
    api
      .get('recommendations/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((response) => {
        setRecommendedUsers(
          response.data.recommendations.slice(0, 5).map((user) => ({
            name: `${user.first_name} ${user.last_name}`,
            username: `@${user.first_name}${user.last_name}`,
            profileImage:
              user.profile_image ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name} ${user.last_name}`,
            major: user.major,
            skills: user.skills,
            interests: user.interests,
          }))
        )
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error)
      })
  }, [])

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
        </div>
        <div className="space-y-4">
          {recommendedUsers.map((person) => (
            <div 
              key={person.username} 
              className="flex items-center justify-between relative"
              onMouseEnter={() => setHoveredUser(person)}
              onMouseLeave={() => setHoveredUser(null)}
            >
              <div className="flex items-center gap-3">
                <img src={person.profileImage} alt={person.name} className="h-8 w-8 rounded-full" />
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
                <div className="absolute left-0 top-full mt-3 w-80 z-50">
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 shadow-2xl border border-purple-500/20">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={person.profileImage} alt={person.name} className="h-16 w-16 rounded-full ring-2 ring-purple-500/30" />
                      <div>
                        <h4 className="text-white font-semibold text-lg">{person.name}</h4>
                        <p className="text-purple-300 text-sm">{person.major}</p>
                      </div>
                    </div>
                    
                    {person.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-purple-300 text-sm font-medium mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {person.skills.slice(0, 3).map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-purple-500/10 text-purple-300 text-sm px-3 py-1 rounded-full border border-purple-500/20"
                            >
                              {skill}
                            </span>
                          ))}
                          {person.skills.length > 3 && (
                            <span className="text-purple-400 text-sm">+{person.skills.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {person.interests.length > 0 && (
                      <div>
                        <p className="text-purple-300 text-sm font-medium mb-2">Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {person.interests.slice(0, 3).map((interest, index) => (
                            <span 
                              key={index} 
                              className="bg-purple-500/10 text-purple-300 text-sm px-3 py-1 rounded-full border border-purple-500/20"
                            >
                              {interest}
                            </span>
                          ))}
                          {person.interests.length > 3 && (
                            <span className="text-purple-400 text-sm">+{person.interests.length - 3} more</span>
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
          ].slice(0, 5).map((friend) => (
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
