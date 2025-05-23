import { Sparkles } from '../ui/Sparkles'
import { LucideArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()
  return (
    <>
      <div id="hero-section" className="absolute left-0 top-0 z-10 h-full w-full">
        <Sparkles />
      </div>
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-t from-black to-[#0a0611] font-semibold text-white">
        {/* Purple blur effects with reduced opacity */}
        <div className="absolute left-1/2 top-10 z-20 -translate-x-1/2 transform sm:top-40 ">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
            ✨ Early Access Now Available
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-purple-900/10 blur-[120px] sm:h-[500px] sm:w-[500px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-900/10 blur-[150px] sm:h-[600px] sm:w-[600px]" />
        </div>

        <div className="relative z-10 mt-8 px-4 sm:mt-4 sm:px-8">
          <h1 className="w-full max-w-[1800px] text-center text-4xl font-semibold leading-[120%] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Empowering Your Journey,
            </span>
            <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Inspiring Your Future
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base font-light text-gray-400/80 sm:mt-6 sm:text-lg lg:text-xl">
            We are a team of experienced professionals who are dedicated to providing the best
            possible service to our clients.
          </p>
          <div className="relative z-20 mt-8 flex justify-center sm:mt-12">
            <button
              className="group rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/5 hover:text-white sm:px-8 sm:py-3 sm:text-lg"
              onClick={() => navigate('/signin')}
            >
              Start your journey
              <LucideArrowRight className="ml-2 inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
