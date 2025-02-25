export default function Dashboard() {
  const featuredCards = [
    {
      type: 'inspiration',
      title: 'Inspiring Story',
      content: {
        quote:
          'The best way to predict the future is to create it. Start small, think big, and never stop learning.',
        author: 'Dr. Sarah Chen, AI Research Pioneer',
      },
      tags: [
        { label: '#TechInspiration', color: 'purple' },
        { label: '#FutureBuilders', color: 'blue' },
      ],
      postedBy: {
        name: 'Mohammed Ali',
        username: '@MohAli',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed Ali',
        badge: 'Top Contributor',
        impact: 'Inspiring 500+ students'
      }
    },
    {
      type: 'project',
      title: 'EcoTrack',
      image: '/path-to-ecotrack-image.png',
      description: 'A groundbreaking project helping students track and reduce their environmental impact on campus.',
      tags: ['React Native', 'ML'],
      rating: '4.7',
      badge: 'ساعدني',
      borderColor: 'green',
      postedBy: {
        name: 'Rami Ahmed',
        username: '@RamiAH',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rami Ahmed',
        badge: 'Project Lead',
        impact: 'Leading 3 projects'
      }
    },
  ]

  const trendingStory = {
    author: {
      name: 'Sara Abdullah',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
      badge: 'Rising Star',
      impact: 'Inspiring 2.5k+ students today',
    },
    content:
      "Just completed my first hackathon at age 30! 🚀 Never thought I'd be brave enough to start coding, but here I am with a working prototype and the Best Social Impact award! Remember: your journey is uniquely yours. Who else started their tech journey later in life? Let's inspire each other!",
    tags: ['First Hackathon', 'Career Change', 'Success Story'],
    stats: {
      inspired: '2.5k',
      comments: '180',
    },
  }

  const showcaseProjects = [
    {
      name: 'Project Pulse',
      image: '/path-to-project-pulse-image.png',
      badge: 'غلطني',
      rating: '4.9',
      description: 'Revolutionizing student health tracking',
      tags: ['React', 'Node.js'],
      borderColor: 'red',
    },
    {
      name: 'Project Aurora',
      image: '/path-to-project-aurora-image.png',
      badge: 'ساعدني',
      rating: '4.8',
      description: 'AI-powered study companion',
      tags: ['AI', 'Python'],
      borderColor: 'yellow',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="mb-12 space-y-8">
        {/* Today's Mlhim */}
        <div className="rounded-xl border border-white/10 p-6">
          <h2 className="mb-6 text-xl font-medium text-white">Today&apos;s Mlhim</h2>

          <div className="space-y-4">
            {/* Section Headers */}
            <div className="grid grid-cols-2 gap-6">
              <div className="border-b border-white/10 pb-2">
                <h3 className="text-lg font-medium text-purple-400">Inspiring Story</h3>
              </div>
              <div className="border-b border-white/10 pb-2">
                <h3 className="text-lg font-medium text-green-400">Featured Project</h3>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-6">
              {featuredCards.map((card, i) => (
                <div
                  key={i}
                  className={`group cursor-pointer overflow-hidden rounded-xl border-2 border-${card.type === 'inspiration' ? 'purple' : 'green'}-500/30 bg-white/5 transition-all hover:bg-white/10`}
                >
                  {card.type === 'project' && (
                    <div className="relative">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-300">
                            {card.badge}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-white">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            {card.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={card.postedBy.image}
                          alt={card.postedBy.name}
                          className="h-12 w-12 rounded-full ring-2 ring-purple-500/30"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">{card.postedBy.name}</h4>
                            <span className="text-sm text-gray-400">{card.postedBy.username}</span>
                            <span className="rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-2 py-0.5 text-xs text-purple-300">
                              {card.postedBy.badge}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{card.postedBy.impact}</p>
                        </div>
                      </div>
                    </div>

                    {card.type === 'inspiration' ? (
                      <blockquote className="mb-4">
                        <p className="text-sm italic text-gray-300">&quot;{card.content.quote}&quot;</p>
                        <footer className="mt-2 text-xs text-purple-300">
                          — {card.content.author}
                        </footer>
                      </blockquote>
                    ) : (
                      <div>
                        <h3 className="mb-2 text-lg font-medium text-white">{card.title}</h3>
                        <p className="mb-4 text-sm text-gray-300">{card.description}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {card.type === 'inspiration' ? 
                        card.tags.map((tag, j) => (
                          <span
                            key={j}
                            className={`rounded-full bg-${tag.color}-500/20 px-2 py-1 text-xs text-${tag.color}-300`}
                          >
                            {tag.label}
                          </span>
                        )) :
                        card.tags.map((tag, j) => (
                          <span
                            key={j}
                            className={`rounded-full bg-${j === 0 ? 'blue' : 'rose'}-500/20 px-2 py-1 text-xs text-${j === 0 ? 'blue' : 'rose'}-300`}
                          >
                            {tag}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Stories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-medium text-white">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-purple-500"></span>
              </span>
              Trending posts
            </h2>
            <button className="text-sm text-purple-400 transition-colors hover:text-purple-300">
              View All
            </button>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-6 transition-all hover:border-purple-500/30">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={trendingStory.author.image}
                  alt={trendingStory.author.name}
                  className="h-12 w-12 rounded-full ring-2 ring-purple-500/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white">{trendingStory.author.name}</h4>
                    <span className="rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-2 py-0.5 text-xs text-purple-300">
                      {trendingStory.author.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{trendingStory.author.impact}</p>
                </div>
              </div>

              <button className="rounded-full bg-purple-500/10 p-2 transition-colors hover:bg-purple-500/20">
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
              <p className="mb-4 leading-relaxed text-gray-300">
                {trendingStory.content}
                <span className="text-purple-400"> #NeverTooLate #TechForAll</span>
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {trendingStory.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`rounded-full bg-${['blue', 'green', 'rose'][i]}-500/20 px-3 py-1 text-sm text-${['blue', 'green', 'rose'][i]}-300`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-gray-400">
                <button className="flex items-center gap-2 transition-colors hover:text-purple-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-sm">{trendingStory.stats.inspired} Inspired</span>
                </button>

                <button className="flex items-center gap-2 transition-colors hover:text-purple-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-sm">{trendingStory.stats.comments} Comments</span>
                </button>

                <button className="ml-auto flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="text-sm">Share Story</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Showcase */}
        <div className="rounded-xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-xl font-medium text-white">
              <svg
                className="h-6 w-6 text-purple-400"
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
            <button className="text-sm text-purple-400 transition-colors hover:text-purple-300">
              Discover More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {showcaseProjects.map((project, i) => (
              <div
                key={i}
                className={`group cursor-pointer overflow-hidden rounded-xl border-2 border-${project.borderColor}-500/30 bg-white/5 transition-all hover:bg-white/10`}
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full bg-${project.borderColor}-500/20 px-3 py-1 text-sm text-${project.borderColor}-300`}
                      >
                        {project.badge}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-white">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {project.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-lg text-white">{project.name}</h3>
                  <p className="mb-3 text-sm text-gray-400">{project.description}</p>
                  <div className="flex gap-2">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className={`rounded-full bg-${j === 0 ? 'blue' : 'rose'}-500/20 px-2 py-1 text-xs text-${j === 0 ? 'blue' : 'rose'}-300`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
