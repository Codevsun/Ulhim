import { Home } from '../../pages/Home'

export default function Dashboard() {
  const posts = [
    {
      author: {
        name: 'Mohammed Ali',
        username: '@MohAli',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed Ali',
      },
      content:
        'The best way to predict the future is to create it. Start small, think big, and never stop learning. #Inspiration #Growth',
      stats: {
        inspired: '1.8k',
        comments: '145',
      },
      tag: 'article',
    },
    {
      author: {
        name: 'Rami Ahmed',
        username: '@RamiAH',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rami Ahmed',
      },
      content:
        'Excited to share our new project EcoTrack! 🌱 A groundbreaking initiative helping students track and reduce their environmental impact on campus. Join us in making a difference! #Sustainability #Innovation',
      stats: {
        inspired: '2.1k',
        comments: '167',
      },
      tag: 'achievement',
    },
    {
      author: {
        name: 'Sara Abdullah',
        username: '@SaraAB',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
      },
      content:
        "Just completed my first hackathon at age 30! 🚀 Never thought I'd be brave enough to start coding, but here I am with a working prototype and the Best Social Impact award! Remember: your journey is uniquely yours. Who else started their tech journey later in life? Let's inspire each other!",
      stats: {
        inspired: '2.5k',
        comments: '180',
      },
      tag: 'achievement',
    },
  ]

  const projects = [
    {
      author: {
        name: 'Sarah Khan',
        username: '@SarahK',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah Khan',
      },
      content: {
        name: 'Project Pulse',
        image: 'src/assets/healthpro.png',
        badge: 'غلطني',
        rating: '4.9',
        description: 'Revolutionizing student health tracking',
        borderColor: 'red',
      },
    },
    {
      author: {
        name: 'Ahmed Hassan',
        username: '@AhmedH',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed Hassan',
      },
      content: {
        name: 'Project Aurora',
        image: 'src/assets/studycompanion.png',
        badge: 'ساعدني',
        rating: '4.8',
        description: 'AI-powered study companion',
        borderColor: 'yellow',
      },
    },
    {
      author: {
        name: 'Eva Johnson',
        username: '@EvaJ',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eva Johnson',
      },
      content: {
        name: 'EcoTrack',
        image: 'src/assets/ecotruck.png',
        badge: 'ساعدني',
        rating: '4.7',
        description: 'Track and reduce environmental impact',
      },
    },
  ]

  return (
    <Home>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/30 via-purple-600/20 to-blue-700/30 p-10 shadow-2xl">
          {/* Animated gradient orbs */}
          <div className="absolute -right-32 -top-32 h-96 w-96 animate-[pulse_4s_ease-in-out_infinite] rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 h-96 w-96 animate-[pulse_5s_ease-in-out_infinite] rounded-full bg-blue-500/10 blur-3xl"></div>

          <div className="relative">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-sm"></div>
                <div className="relative rounded-full bg-black/40 p-4 backdrop-blur-xl">
                  <svg
                    className="h-8 w-8 text-purple-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <span className="mb-2 block text-sm font-medium text-purple-300">
                  Dashboard Overview
                </span>
                <h1 className="bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-4xl font-bold text-transparent">
                  Welcome back, Explorer!
                </h1>
              </div>
            </div>

            <div className="mt-8 max-w-2xl space-y-2">
              <p className="text-xl leading-relaxed text-gray-300/90">
                Ready to discover inspiring stories and groundbreaking projects?
              </p>
              <p className="text-lg leading-relaxed text-gray-400/90">
                Your journey of innovation and creativity continues here. Let&apos;s make today
                count! ✨
              </p>
            </div>

            <div className="mt-10 flex gap-5">
              <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30">
                <span className="relative z-10">Start Exploring</span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </button>
              <button className="group rounded-full border-2 border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 hover:text-white">
                View Your Projects
                <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-16 space-y-10">
          {/* Rest of the existing code remains exactly the same */}
          {/* Today's Mlhim */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm">
            <h2 className="mb-8 text-2xl font-semibold text-white">Today&apos;s Mlhim</h2>

            <div className="space-y-6">
              {/* Section Headers */}
              <div className="grid grid-cols-2 gap-8">
                <div className="border-b-2 border-purple-500/30 pb-3">
                  <h3 className="text-lg font-medium text-purple-400">Inspiring Stories</h3>
                </div>
                <div className="border-b-2 border-green-500/30 pb-3">
                  <h3 className="text-lg font-medium text-green-400">Featured Projects</h3>
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 gap-8">
                {/* Story Card */}
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={posts[0].author.image}
                        alt={posts[0].author.name}
                        className="h-14 w-14 rounded-full ring-2 ring-purple-500/30 transition-all duration-300 group-hover:ring-purple-500/50"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-white">{posts[0].author.name}</h4>
                          <span className="text-sm text-gray-400">{posts[0].author.username}</span>
                        </div>
                        {posts[0].tag && posts[0].tag !== 'null' && (
                          <span className="mt-1 inline-block rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300">
                            {posts[0].tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <p className="mb-5 text-lg leading-relaxed text-gray-300">{posts[0].content}</p>

                    <div className="flex items-center gap-8 text-gray-400">
                      <button className="flex items-center gap-2 transition-all duration-300 hover:text-purple-400">
                        <svg
                          className="h-5 w-5"
                          fill="none"
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
                        <span className="text-sm font-medium">
                          {posts[0].stats.inspired} Inspired
                        </span>
                      </button>

                      <button className="flex items-center gap-2 transition-all duration-300 hover:text-purple-400">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          {posts[0].stats.comments} Comments
                        </span>
                      </button>

                      <button className="ml-auto flex items-center gap-2 text-purple-400 transition-all duration-300 hover:text-purple-300">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
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

                {/* Project Card */}
                <div className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-green-500/30 bg-white/5 shadow-lg transition-all duration-300 hover:bg-white/10">
                  {projects[2] && (
                    <>
                      <div className="relative">
                        <img
                          src={projects[2].content.image}
                          alt={projects[2].content.name}
                          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-medium text-green-300 backdrop-blur-sm">
                              {projects[2].content.badge}
                            </span>
                            <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-sm text-white backdrop-blur-sm">
                              <svg
                                className="h-4 w-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              {projects[2].content.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-4">
                          <img
                            src={projects[2].author.image}
                            alt={projects[2].author.name}
                            className="h-10 w-10 rounded-full ring-2 ring-green-500/30"
                          />
                          <div>
                            <h4 className="font-medium text-white">{projects[2].author.name}</h4>
                            <span className="text-sm text-gray-400">
                              {projects[2].author.username}
                            </span>
                          </div>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-white">
                          {projects[2].content.name}
                        </h3>
                        <p className="text-gray-400">{projects[2].content.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Trending Stories */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-purple-500"></span>
                </span>
                Trending posts
              </h2>
              <button className="rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 transition-all duration-300 hover:bg-purple-500/20 hover:text-purple-300">
                View All
              </button>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-lg transition-all duration-300 hover:border-purple-500/30">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={posts[2].author.image}
                    alt={posts[2].author.name}
                    className="h-14 w-14 rounded-full ring-2 ring-purple-500/30 transition-all duration-300 group-hover:ring-purple-500/50"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-medium text-white">{posts[2].author.name}</h4>
                      <span className="text-sm text-gray-400">{posts[2].author.username}</span>
                    </div>
                    {posts[2].tag && posts[2].tag !== 'null' && (
                      <span className="mt-1 inline-block rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300">
                        {posts[2].tag}
                      </span>
                    )}
                  </div>
                </div>

                <button className="rounded-full bg-purple-500/10 p-3 transition-all duration-300 hover:bg-purple-500/20">
                  <svg
                    className="h-5 w-5 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative">
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                  {posts[2].content}
                  <span className="text-purple-400"> #NeverTooLate #TechForAll</span>
                </p>

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
                    <span className="text-sm font-medium">{posts[2].stats.inspired} Inspired</span>
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
                    <span className="text-sm font-medium">{posts[2].stats.comments} Comments</span>
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
          </div>

          {/* Project Showcase */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 shadow-lg backdrop-blur-sm">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
                <svg
                  className="h-7 w-7 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                Featured Projects
              </h2>
              <button className="rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 transition-all duration-300 hover:bg-purple-500/20 hover:text-purple-300">
                Discover More
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {projects.slice(0, 2).map((project, i) => (
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
                        <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-sm text-white backdrop-blur-sm">
                          <svg
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {project.content.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <img
                        src={project.author.image}
                        alt={project.author.name}
                        className="h-10 w-10 rounded-full ring-2 ring-purple-500/30"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </Home>
  )
}
