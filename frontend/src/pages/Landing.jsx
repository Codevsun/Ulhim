'use client'
import { ReactLenis } from 'lenis/react'

import NavBar from '../components/landing/nav-bar'
import HeroSection from '../components/landing/hero-secrion'
import FeaturesSection from '../components/landing/features-section'
import UserIntroduction from '../components/landing/user-introduction'
import AboutSection from '../components/landing/about-section'
import Footer from '../components/landing/footer'
export default function Landing() {
  return (
    <ReactLenis root>
      <main className="relative min-h-screen w-full">
        <NavBar />
        <HeroSection />
        <FeaturesSection />
        <UserIntroduction />
        <AboutSection />
        <Footer />
      </main>
    </ReactLenis>
  )
}
