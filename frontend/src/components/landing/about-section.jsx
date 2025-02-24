export default function AboutSection() {
  return (
    <section id="about-section" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0915] to-[#120a17] py-32">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(123,97,255,0.05),transparent_50%)]"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <div className="mb-24 text-center">
          <span className="mb-4 inline-block rounded-full bg-white/5 px-4 py-1 text-sm text-purple-300 backdrop-blur-sm">
            About Ulhim{' '}
          </span>
          <h2 className="mt-6 bg-gradient-to-r from-white via-purple-100 to-white/70 bg-clip-text text-4xl font-light tracking-tight text-transparent sm:text-6xl">
            Where Inspiration
            <br />
            Meets Innovation
          </h2>
        </div>

        <div className="flex flex-col items-center gap-16">
          <p className="max-w-2xl text-center text-lg font-light leading-relaxed text-gray-300">
            Inspired by the Arabic word for ‘Inspire,’ Ulhim is designed to support your academic
            journey every step of the way. Ulhim helps you document achievements, build connections,
            and opens doors to endless opportunities
          </p>

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/20">
              <div className="mb-6 inline-block rounded-full bg-purple-500/10 p-3">
                <svg
                  className="h-6 w-6 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-light text-white">Dream</h3>
              <p className="text-sm text-gray-400">Where possibilities know no bounds</p>
            </div>

            <div className="group rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/20">
              <div className="mb-6 inline-block rounded-full bg-purple-500/10 p-3">
                <svg
                  className="h-6 w-6 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-light text-white">Create</h3>
              <p className="text-sm text-gray-400">Turn your vision into reality</p>
            </div>

            <div className="group rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/20">
              <div className="mb-6 inline-block rounded-full bg-purple-500/10 p-3">
                <svg
                  className="h-6 w-6 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-light text-white">Inspire</h3>
              <p className="text-sm text-gray-400">Light the way for others</p>
            </div>
          </div>

          <div id="join-journey" className="mt-8 text-center">
            <button className="group rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-light text-white backdrop-blur-sm transition-all hover:border-purple-500/20">
              Join our journey
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
