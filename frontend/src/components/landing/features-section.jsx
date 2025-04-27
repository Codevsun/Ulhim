export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: 'Personalized Growth',
      description: 'Track your academic progress with AI-powered insights and recommendations',
      image: '/src/assets/1.png',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      ),
      iconColor: 'text-blue-400',
      size: 'col-span-12 lg:col-span-7',
      height: 'h-[250px] sm:h-[320px]',
      titleSize: 'text-xl sm:text-2xl',
    },
    {
      id: 2,
      title: 'Global Network',
    description: 'Connect with brilliant minds worldwide',
      image: '/src/assets/3.png',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
      iconColor: 'text-purple-400',
      size: 'col-span-12 lg:col-span-5',
      height: 'h-[250px] sm:h-[320px]',
      titleSize: 'text-lg sm:text-xl',
    },
    {
      id: 3,
      title: 'Smart Resources',
      description: 'Access curated study materials',
      image: '/src/assets/4.png',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      ),
      iconColor: 'text-yellow-400',
      size: 'col-span-12 lg:col-span-5',
      height: 'h-[250px] sm:h-[300px]',
      titleSize: 'text-lg sm:text-xl',
    },
    {
      id: 4,
      title: 'Achievement Showcase',
      description: 'Document and showcase your academic and extracurricular accomplishments',
      image: '/src/assets/2.png',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      iconColor: 'text-green-400',
      size: 'col-span-12 lg:col-span-7',
      height: 'h-[250px] sm:h-[300px]',
      titleSize: 'text-lg sm:text-xl',
    },
  ]

  return (
    <section
      id="services-section"
      className="pointer-events-auto sticky top-0 min-h-screen overflow-hidden rounded-t-[2rem] bg-gradient-to-b from-[#0a0915] to-[#120a17] py-12 text-white sm:rounded-t-[4rem] sm:py-20"
    >
      {/* Elegant purple grid overlay with gradient fade */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[50%] bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)]"></div>

      <div className="pointer-events-auto relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-8 bg-gradient-to-r from-gray-200 via-slate-200 to-zinc-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(148,163,184,0.2)] sm:mb-16 sm:text-4xl md:text-5xl">
            Explore Our Features
          </h2>
        </div>

        <div className="pointer-events-auto mx-auto grid max-w-5xl grid-cols-12 gap-4 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`group pointer-events-auto relative ${feature.size} ${feature.height} cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#0a0915] to-[#1a1225] shadow-lg transition-all duration-500 hover:border-white/10 hover:shadow-2xl sm:rounded-3xl`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-zinc-800/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <img
                src={feature.image}
                alt={`Feature ${feature.id}`}
                className="h-full w-full object-cover opacity-60 mix-blend-multiply transition-transform duration-700 [filter:grayscale(40%)_brightness(0.8)] group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0915]/95 via-[#0a0915]/80 to-transparent p-4 sm:p-8">
                <div className="mb-2 flex items-center sm:mb-3">
                  <svg
                    className={`mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5 ${feature.iconColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {feature.icon}
                  </svg>
                  <h3 className={`${feature.titleSize} font-semibold text-gray-200`}>
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-200 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
