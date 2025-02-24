import { Logo } from '../signup/logo'
import { useState, useEffect } from 'react'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      id="navbar"
      className={`fixed top-0 z-20 w-full transition-all duration-300 ${
        isScrolled ? 'bg-black/80 py-2 backdrop-blur-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex max-w-[2000px] items-center justify-between px-6">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center lg:flex">
          <div
            className={`flex space-x-8 rounded-full border px-8 py-3 transition-all duration-300 ${
              isScrolled
                ? 'border-purple-500/20 bg-black/50 shadow-[0_0_15px_rgba(147,51,234,0.2)]'
                : 'border-white/10 bg-white/5'
            }`}
          >
            <a
              href="#hero-section"
              className="flex-1 text-sm font-light text-white transition-colors hover:text-purple-300"
            >
              Home
            </a>
            <a
              href="#about-section"
              className="flex-1 text-sm font-light text-white transition-colors hover:text-purple-300"
            >
              About
            </a>
            <a
              href="#services-section"
              className="flex-1 text-sm font-light text-white transition-colors hover:text-purple-300"
            >
              Features
            </a>
            <a
              href="#user-introduction"
              className="flex-1 text-sm font-light text-white transition-colors hover:text-purple-300"
            >
              Journey
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`rounded-full p-2 transition-all duration-300 ${
              isScrolled
                ? 'border border-purple-500/20 bg-black/50'
                : 'border border-white/10 bg-white/5'
            }`}
          >
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute left-4 right-4 top-full transition-all duration-300 ${
            isMenuOpen
              ? 'translate-y-2 opacity-100'
              : 'pointer-events-none -translate-y-4 opacity-0'
          } lg:hidden`}
        >
          <div className="rounded-2xl border border-purple-500/20 bg-black/95 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              <a
                href="#hero-section"
                className="text-center text-sm font-light text-white transition-colors hover:text-purple-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about-section"
                className="text-center text-sm font-light text-white transition-colors hover:text-purple-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#features-section"
                className="text-center text-sm font-light text-white transition-colors hover:text-purple-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#user-introduction"
                className="text-center text-sm font-light text-white transition-colors hover:text-purple-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Journey
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
