export default function UserIntroduction() {
  const journeySteps = [
    {
      id: 1,
      title: 'Inspire',
      description:
        'Discover new possibilities and ignite your passion for learning through innovative approaches.',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-500',
      position: 'left',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      ),
    },
    {
      id: 2,
      title: 'Drive',
      description: 'Stay motivated with personalized goals and achievement tracking systems.',
      textColor: 'text-indigo-400',
      borderColor: 'border-indigo-300',
      bgColor: 'bg-indigo-300',
      position: 'right',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
    },
    {
      id: 3,
      title: 'Growth',
      description:
        'Experience continuous development through structured learning paths and expert guidance.',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500',
      bgColor: 'bg-emerald-500',
      position: 'left',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      ),
    },
    {
      id: 4,
      title: 'Connection',
      description: 'Build meaningful relationships within our community of learners and educators.',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500',
      bgColor: 'bg-rose-500',
      position: 'right',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
    },
  ]

  return (
    <section
      id="user-introduction"
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0611] to-[#0a0915] py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="animate-fade-in mb-16 bg-gradient-to-r from-gray-200 via-slate-200 to-zinc-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(148,163,184,0.2)] sm:text-5xl">
            Your Journey With Us
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-purple-500/20 via-indigo-500/20 to-rose-500/20"></div>

          {journeySteps.map((step) => (
            <div key={step.id} className="mb-24 flex items-center justify-between">
              {step.position === 'left' ? (
                <div className={`animate-slide-right w-5/12 text-right`}>
                  <h3 className={`mb-2 text-2xl font-bold ${step.textColor}`}>{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ) : (
                <div className="w-5/12"></div>
              )}

              <div
                className={`relative flex h-16 w-16 animate-pulse items-center justify-center rounded-full border ${step.borderColor} ${step.bgColor}/10 transition-all duration-300 hover:${step.bgColor}/20`}
              >
                <svg
                  className={`h-8 w-8 ${step.textColor}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {step.icon}
                </svg>
              </div>

              {step.position === 'right' ? (
                <div className={`animate-slide-left w-5/12`}>
                  <h3 className={`mb-2 text-2xl font-bold ${step.textColor}`}>{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ) : (
                <div className="w-5/12"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
