import { Home } from './Home'
import { useState } from 'react'
import Filter from '../components/feed/filters'
import FloatingActionButton from '../components/feed/flaoting-action-button'

export default function Posts() {
  const posts = [
    {
      id: 1,
      author: {
        name: 'John Doe',
        username: '@johndoe',
        image: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
      },
      content: 'Just launched my new project! Check it out.',
      tag: 'article',
      stats: {
        inspired: 24,
        comments: 12,
      },
    },
    {
      id: 2,
      author: {
        name: 'Jane Smith',
        username: '@janesmith',
        image: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Jane',
      },
      content: 'Working on some exciting new features today.',
      tag: 'inspiration',
      stats: {
        inspired: 18,
        comments: 8,
      },
    },
  ]
  const [projects] = useState([
    {
      content: {
        borderColor: 'red',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        name: 'AI-Powered Code Assistant',
        badge: 'In Progress',
        description:
          'An intelligent coding assistant that helps developers write better code faster.',
      },
      author: {
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'John Smith',
        username: '@johnsmith',
      },
    },
    {
      content: {
        borderColor: 'yellow',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
        name: 'Project Management Dashboard',
        badge: 'Planning',
        description: 'A comprehensive project management tool for agile teams.',
      },
      author: {
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        name: 'Sarah Johnson',
        username: '@sarahj',
      },
    },
    {
      content: {
        borderColor: 'red',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        name: 'E-commerce Platform',
        badge: 'In Progress',
        description: 'Modern e-commerce solution with advanced analytics and inventory management.',
      },
      author: {
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
        name: 'Mike Wilson',
        username: '@mikew',
      },
    },
  ])

  const projectCards = projects.map((project, i) => (
    <div
      key={i}
      className={`group cursor-pointer overflow-hidden rounded-2xl border-2 ${project.content.borderColor === 'red' ? 'border-red-500/30' : project.content.borderColor === 'yellow' ? 'border-yellow-500/30' : ''} bg-white/5 shadow-lg transition-all duration-300 hover:bg-white/10`}
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
              className={`rounded-full ${project.content.borderColor === 'red' ? 'bg-red-500/20 text-red-300' : project.content.borderColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' : ''} px-4 py-1.5 text-sm font-medium backdrop-blur-sm`}
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
        </div>
        <h3 className="mb-2 text-xl font-medium text-white">{project.content.name}</h3>
        <p className="text-gray-400">{project.content.description}</p>
      </div>
    </div>
  ))

  return (
    <Home>
      <div className="space-y-6">
        <Filter />
        {projectCards}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10"
            >
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
              </div>

              <div className="relative">
                <p className="mb-5 text-lg leading-relaxed text-gray-300">{post.content}</p>

                <div className="flex items-center gap-8 text-gray-400">
                  <button className="flex items-center gap-2 transition-all duration-300 hover:text-purple-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          ))}
        </div>
        <FloatingActionButton />
      </div>
    </Home>
  )
}
