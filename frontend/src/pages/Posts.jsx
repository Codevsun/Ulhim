import { Home } from './Home'
import { useState, useEffect } from 'react'
import Filter from '../components/feed/filters'
import FloatingActionButton from '../components/feed/flaoting-action-button'
import { ACCESS_TOKEN } from '../constants'

export default function Posts() {
  const [feedItems, setFeedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch('http://localhost:8000/api/v1/posts/posts/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        })

        if (!postsResponse.ok) {
          throw new Error(`Posts fetch failed with status: ${postsResponse.status}`)
        }

        const postsData = await postsResponse.json()

        // Fetch projects
        const projectsResponse = await fetch('http://localhost:8000/api/v1/posts/projects/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        })

        if (!projectsResponse.ok) {
          throw new Error(`Projects fetch failed with status: ${projectsResponse.status}`)
        }

        const projectsData = await projectsResponse.json()

        // Transform posts data
        const transformedPosts = postsData.map((post) => ({
          id: post.id,
          type: 'post',
          createdAt: new Date(post.created_at || post.created || Date.now()),
          author: {
            name: `${post.author.first_name} ${post.author.last_name}`,
            username: `@${post.author.username}`,
            image:
              post.author.profile_image ||
              'https://api.dicebear.com/6.x/avataaars/svg?seed=' + post.author.username,
          },
          content: post.content,
          tag: post.tag,
          stats: {
            inspired: post.inspired_count,
            comments: post.comment_count,
          },
          isLiked: post.is_liked || false,
        }))

        // Transform projects data
        const transformedProjects = projectsData.map((project) => ({
          id: project.id,
          type: 'project',
          createdAt: new Date(project.created_at || project.created || Date.now()),
          content: {
            borderColor:
              project.status === 'in_progress'
                ? 'red'
                : project.status === 'planning'
                  ? 'yellow'
                  : 'green',
            image: project.image || 'https://images.unsplash.com/photo-1551434678-e076c223a692',
            name: project.name,
            badge: project.status.replace('_', ' '),
            description: project.description,
          },
          author: {
            image:
              project.author.profile_image ||
              'https://api.dicebear.com/6.x/avataaars/svg?seed=' + project.author.username,
            name: `${project.author.first_name} ${project.author.last_name}`,
            username: `@${project.author.username}`,
          },
        }))

        // Merge and sort all items by creation date (newest first)
        const allItems = [...transformedPosts, ...transformedProjects].sort(
          (a, b) => b.createdAt - a.createdAt
        )

        setFeedItems(allItems)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/posts/posts/${postId}/like/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok && response.status !== 204) {
        throw new Error(`Like action failed with status: ${response.status}`)
      }

      // Update the feed items
      setFeedItems((prevItems) =>
        prevItems.map((item) => {
          if (item.type === 'post' && item.id === postId) {
            const isNowLiked = !item.isLiked
            return {
              ...item,
              isLiked: isNowLiked,
              stats: {
                ...item.stats,
                inspired: isNowLiked ? item.stats.inspired + 1 : item.stats.inspired - 1,
              },
            }
          }
          return item
        })
      )
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  if (loading) {
    return (
      <Home>
        <div className="flex h-64 items-center justify-center">
          <div className="text-xl text-white">Loading...</div>
        </div>
      </Home>
    )
  }

  if (error) {
    return (
      <Home>
        <div className="flex h-64 items-center justify-center">
          <div className="text-xl text-red-400">Error: {error}</div>
        </div>
      </Home>
    )
  }

  if (feedItems.length === 0) {
    return (
      <Home>
        <div className="space-y-6">
          <Filter />
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <div className="mb-4 text-xl text-white">No posts or projects found</div>
            <p className="text-gray-400">Be the first to share something with the community!</p>
          </div>
          <FloatingActionButton />
        </div>
      </Home>
    )
  }

  const formatDate = (date) => {
    const now = new Date()
    const diff = now - date

    // Less than a minute
    if (diff < 60000) {
      return 'just now'
    }
    // Less than an hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000)
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    }
    // Less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000)
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    }
    // Less than a week
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000)
      return `${days} ${days === 1 ? 'day' : 'days'} ago`
    }

    // Format as date
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const renderProjectCard = (project) => (
    <div
      className={`group cursor-pointer overflow-hidden rounded-2xl border-2 ${project.content.borderColor === 'red' ? 'border-red-500/30' : project.content.borderColor === 'yellow' ? 'border-yellow-500/30' : 'border-green-500/30'} bg-white/5 shadow-lg transition-all duration-300 hover:bg-white/10`}
    >
      <div className="relative">
        <img
          src={project.content.image}
          alt={project.content.name}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full ${project.content.borderColor === 'red' ? 'bg-red-500/20 text-red-300' : project.content.borderColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'} px-4 py-1.5 text-sm font-medium backdrop-blur-sm`}
            >
              {project.content.badge}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center gap-4">
          <img
            src={project.author.image}
            alt={project.author.name}
            className="h-10 w-10 rounded-full ring-2 ring-gray-500/30"
          />
          <div>
            <h4 className="font-medium text-white">{project.author.name}</h4>
            <span className="text-sm text-gray-400">{project.author.username}</span>
          </div>
          <span className="ml-auto text-xs text-gray-400">{formatDate(project.createdAt)}</span>
        </div>
        <h3 className="mb-2 text-xl font-medium text-white">{project.content.name}</h3>
        <p className="text-gray-400">{project.content.description}</p>
      </div>
    </div>
  )

  const renderPostCard = (post) => (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={post.author.image}
            alt={post.author.name}
            className="h-14 w-14 rounded-full ring-2 ring-purple-500/30 transition-all duration-300 group-hover:ring-purple-500/50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-white">{post.author.name}</h4>
              <span className="text-sm text-gray-400">{post.author.username}</span>
            </div>
            {post.tag && post.tag !== 'null' && (
              <span className="mt-1 inline-block rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300">
                {post.tag}
              </span>
            )}
          </div>
        </div>
        <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
      </div>

      <div className="relative">
        <p className="mb-5 text-lg leading-relaxed text-gray-300">{post.content}</p>

        <div className="flex items-center gap-8 text-gray-400">
          <button
            className={`flex items-center gap-2 transition-all duration-300 ${post.isLiked ? 'text-purple-400' : 'hover:text-purple-400'}`}
            onClick={() => handleLike(post.id)}
          >
            <svg
              className="h-5 w-5"
              fill={post.isLiked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm font-medium">{post.stats.inspired} Inspired</span>
          </button>

          <button className="flex items-center gap-2 transition-all duration-300 hover:text-purple-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm font-medium">{post.stats.comments} Comments</span>
          </button>

          <button className="ml-auto flex items-center gap-2 text-purple-400 transition-all duration-300 hover:text-purple-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span className="text-sm font-medium">Share Story</span>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Home>
      <div className="space-y-6">
        <Filter />
        <div className="space-y-6">
          {feedItems.map((item) => (
            <div key={`${item.type}-${item.id}`}>
              {item.type === 'project' ? renderProjectCard(item) : renderPostCard(item)}
            </div>
          ))}
        </div>
        <FloatingActionButton />
      </div>
    </Home>
  )
}
