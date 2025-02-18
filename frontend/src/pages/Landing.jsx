'use client'
import { ReactLenis } from 'lenis/react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from '../components/ui/Sparkles'
import { Logo } from '../components/signup/Logo'
import { LucideArrowRight } from 'lucide-react'
export default function Landing() {
  const navigate = useNavigate()
  return (
    <ReactLenis root>
      <main className="relative min-h-screen w-full">
        <nav className="absolute z-20 w-full p-4">
          <div className="container mx-auto flex max-w-[2000px] items-center justify-between px-4">
            <Logo />
            <div className="hidden flex-1 justify-center md:flex">
              <div className="flex space-x-8 rounded-full border border-gray-700 bg-gray-900/50 px-8 py-4 shadow-[0_0_10px_rgba(147,51,234,0.3)] backdrop-blur-sm">
                <a href="#" className="flex-1 text-center text-white hover:text-gray-300">
                  Home
                </a>
                <a href="#" className="flex-1 text-center text-white hover:text-gray-300">
                  About
                </a>
                <a href="#" className="flex-1 text-center text-white hover:text-gray-300">
                  Services
                </a>
                <a href="#" className="flex-1 text-center text-white hover:text-gray-300">
                  Contact
                </a>
              </div>
            </div>
            <div className="md:hidden">
              <button className="rounded-lg bg-gray-900/50 p-2 text-white backdrop-blur-sm">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <div className="absolute left-0 top-0 z-10 h-full w-full">
          <Sparkles />
        </div>
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-t from-black to-[#0a0611] font-semibold text-white">
          {/* Purple blur effects with reduced opacity */}
          <div className="absolute left-1/2 top-40 z-20 -translate-x-1/2 transform">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
              ✨ Early Access Now Available
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-900/10 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-violet-900/10 blur-[150px]" />
          </div>

          <div className="relative z-10 -mt-48">
            <h1 className="w-full max-w-[1800px] px-8 text-center text-6xl font-semibold leading-[120%] tracking-tight">
              <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Empowering Your Journey,
              </span>
              <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Inspiring Your Future
              </span>
            </h1>
            <p className="mt-6 text-center text-xl font-light text-gray-400/80">
              We are a team of experienced professionals who are dedicated to providing the best
              possible service to our clients.
            </p>
            <div className="relative z-20 mt-12 flex justify-center">
              <button
                className="group rounded-full border border-white/10 bg-white/5 px-8 py-3 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black"
                onClick={() => navigate('/signin')}
              >
                Start your journey
                <LucideArrowRight className="ml-2 inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="pointer-events-auto sticky top-0 min-h-screen overflow-hidden rounded-t-[4rem] bg-gradient-to-b from-[#0a0915] to-[#120a17] py-20 text-white">
          {/* Elegant purple grid overlay with gradient fade */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-[50%] bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)]"></div>

          <div className="pointer-events-auto relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="mb-16 bg-gradient-to-r from-gray-200 via-slate-200 to-zinc-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(148,163,184,0.2)] sm:text-5xl">
                Explore Our Features
              </h2>
            </div>

            <div className="pointer-events-auto mx-auto grid max-w-5xl grid-cols-12 gap-8">
              {/* First card - Large */}
              <div className="group pointer-events-auto relative col-span-7 h-[320px] cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0a0915] to-[#1a1225] shadow-lg transition-all duration-500 hover:border-white/10 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-zinc-800/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <img
                  src="/src/assets/1.png"
                  alt="Feature 1"
                  className="h-full w-full object-cover opacity-60 mix-blend-multiply transition-transform duration-700 [filter:grayscale(40%)_brightness(0.8)] group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0915]/95 via-[#0a0915]/80 to-transparent p-8">
                  <div className="mb-3 flex items-center">
                    <svg
                      className="mr-3 h-6 w-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h3 className="text-2xl font-semibold text-gray-200">Personalized Growth</h3>
                  </div>
                  <p className="text-gray-400 transition-all duration-300 group-hover:text-gray-200">
                    Track your academic progress with AI-powered insights and recommendations
                  </p>
                </div>
              </div>

              {/* Second card - Medium */}
              <div className="group pointer-events-auto relative col-span-5 h-[320px] cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0a0915] to-[#1a1225] shadow-lg transition-all duration-500 hover:border-white/10 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-slate-800/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <img
                  src="/src/assets/3.png"
                  alt="Feature 2"
                  className="h-full w-full object-cover opacity-60 mix-blend-multiply transition-transform duration-700 [filter:grayscale(40%)_brightness(0.8)] group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0915]/95 via-[#0a0915]/80 to-transparent p-8">
                  <div className="mb-3 flex items-center">
                    <svg
                      className="mr-3 h-5 w-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-200">Global Network</h3>
                  </div>
                  <p className="text-sm text-gray-400 transition-all duration-300 group-hover:text-gray-200">
                    Connect with brilliant minds worldwide
                  </p>
                </div>
              </div>

              {/* Third card - Medium */}
              <div className="group pointer-events-auto relative col-span-5 h-[300px] cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0a0915] to-[#1a1225] shadow-lg transition-all duration-500 hover:border-white/10 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-zinc-800/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <img
                  src="/src/assets/4.png"
                  alt="Feature 4"
                  className="h-full w-full object-cover opacity-60 mix-blend-multiply transition-transform duration-700 [filter:grayscale(40%)_brightness(0.8)] group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0915]/95 via-[#0a0915]/80 to-transparent p-8">
                  <div className="mb-3 flex items-center">
                    <svg
                      className="mr-3 h-5 w-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-200">Smart Resources</h3>
                  </div>
                  <p className="text-sm text-gray-400 transition-all duration-300 group-hover:text-gray-200">
                    Access curated study materials
                  </p>
                </div>
              </div>

              {/* Fourth card - Large */}
              <div className="group pointer-events-auto relative col-span-7 h-[300px] cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0a0915] to-[#1a1225] shadow-lg transition-all duration-500 hover:border-white/10 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-slate-800/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <img
                  src="/src/assets/2.png"
                  alt="Feature 4"
                  className="h-full w-full object-cover opacity-60 mix-blend-multiply transition-transform duration-700 [filter:grayscale(40%)_brightness(0.8)] group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0915]/95 via-[#0a0915]/80 to-transparent p-8">
                  <div className="mb-3 flex items-center">
                    <svg
                      className="mr-3 h-5 w-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-200">Advanced Analytics</h3>
                  </div>
                  <p className="text-sm text-gray-400 transition-all duration-300 group-hover:text-gray-200">
                    Data-driven insights for optimal learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0611] to-[#0a0915] py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="animate-fade-in mb-16 bg-gradient-to-r from-gray-200 via-slate-200 to-zinc-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(148,163,184,0.2)] sm:text-5xl">
                Your Journey With Us
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-pink-500/20"></div>

              {/* Inspire */}
              <div className="mb-24 flex items-center justify-between">
                <div className="animate-slide-right w-5/12 text-right">
                  <h3 className="mb-2 text-2xl font-bold text-purple-400">Inspire</h3>
                  <p className="text-gray-400">
                    Discover new possibilities and ignite your passion for learning through
                    innovative approaches.
                  </p>
                </div>
                <div className="relative flex h-16 w-16 animate-pulse items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10">
                  <svg
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <div className="w-5/12"></div>
              </div>

              {/* Drive */}
              <div className="mb-24 flex items-center justify-between">
                <div className="w-5/12"></div>
                <div className="relative flex h-16 w-16 animate-pulse items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10">
                  <svg
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="animate-slide-left w-5/12">
                  <h3 className="mb-2 text-2xl font-bold text-blue-400">Drive</h3>
                  <p className="text-gray-400">
                    Stay motivated with personalized goals and achievement tracking systems.
                  </p>
                </div>
              </div>

              {/* Growth */}
              <div className="mb-24 flex items-center justify-between">
                <div className="animate-slide-right w-5/12 text-right">
                  <h3 className="mb-2 text-2xl font-bold text-green-400">Growth</h3>
                  <p className="text-gray-400">
                    Experience continuous development through structured learning paths and expert
                    guidance.
                  </p>
                </div>
                <div className="relative flex h-16 w-16 animate-pulse items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                  <svg
                    className="h-8 w-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="w-5/12"></div>
              </div>

              {/* Connection */}
              <div className="flex items-center justify-between">
                <div className="w-5/12"></div>
                <div className="relative flex h-16 w-16 animate-pulse items-center justify-center rounded-full border border-pink-500/20 bg-pink-500/10">
                  <svg
                    className="h-8 w-8 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="animate-slide-left w-5/12">
                  <h3 className="mb-2 text-2xl font-bold text-pink-400">Connection</h3>
                  <p className="text-gray-400">
                    Build meaningful relationships within our community of learners and educators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0915] to-[#120a17] py-32">
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
                Inspired by the Arabic word for ‘Inspire,’ Ulhim is designed to support your
                academic journey every step of the way. Ulhim helps you document achievements, build
                connections, and opens doors to endless opportunities
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

              <div className="mt-8 text-center">
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
        <section className="relative w-full bg-gradient-to-b from-[#0a0915] to-black py-24">
          <div className="mx-auto max-w-7xl px-6">
            <footer className="relative border-t border-purple-500/5 pt-20">
              <div className="mb-16 flex flex-col items-center space-y-8 text-center">
                <h3 className="text-4xl font-light text-purple-100">Ulhim</h3>
                <p className="text-lg font-light text-purple-400/70">Inspire and be inspired</p>
                <div className="relative z-50 flex space-x-8">
                  <a
                    href="https://twitter.com/ulhim"
                    className="block text-purple-400/50 transition-colors hover:text-purple-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/ulhim"
                    className="block text-purple-400/50 transition-colors hover:text-purple-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/ulhim"
                    className="block text-purple-400/50 transition-colors hover:text-purple-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:contact@ulhim.com"
                    className="block text-purple-400/50 transition-colors hover:text-purple-300"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex justify-center border-t border-purple-500/5 py-8">
                <p className="text-sm text-purple-400/40">© 2025 Ulhim. All rights reserved.</p>
              </div>
            </footer>
          </div>

          {/* Ambient Background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"></div>
            <div className="absolute right-1/4 top-3/4 h-64 w-64 rounded-full bg-purple-700/5 blur-3xl"></div>
          </div>
        </section>
      </main>
    </ReactLenis>
  )
}
