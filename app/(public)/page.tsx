'use client'

import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CTASection } from "@/components/sections/cta-section"
import { ParticleBackground } from "@/components/ui/particle-background"
import { FloatingElement } from "@/components/ui/floating-elements"
import { Notification } from "@/components/ui/interactive-notification"
import { InteractiveProgress } from "@/components/ui/interactive-progress"
import { useState, useEffect } from "react"
import TestimonialPage from "./testimonial/page"
import ServicesSection from "@/components/sections/services-section"

export default function HomePage() {
  const [showPromo, setShowPromo] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Show promo notification after 3 seconds
    const promoTimer = setTimeout(() => {
      setShowPromo(true)
    }, 3000)

    // Hide promo after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowPromo(false)
    }, 8000)

    return () => {
      clearTimeout(promoTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800">
        <InteractiveProgress
          value={scrollProgress}
          className="h-full"
          color="cyan"
          animated={false}
        />
      </div>

      {/* Particle Background */}
      {/* <ParticleBackground 
        particleCount={30}
        colors={["#06b6d4", "#3b82f6", "#8b5cf6"]}
        className="opacity-30 "
      /> */}
      
      {/* Floating Elements */}
      {/* <div className="fixed inset-0 pointer-events-none z-10">
        <FloatingElement
          className="absolute top-20 left-10 text-cyan-400 opacity-20"
          delay={1000}
          duration={4000}
        >
          <div className="w-4 h-4 bg-cyan-400 rounded-full blur-sm"></div>
        </FloatingElement>
        
        <FloatingElement
          className="absolute top-40 right-20 text-blue-400 opacity-20"
          delay={2000}
          duration={5000}
        >
          <div className="w-3 h-3 bg-blue-400 rounded-full blur-sm"></div>
        </FloatingElement>
        
        <FloatingElement
          className="absolute bottom-40 left-20 text-purple-400 opacity-20"
          delay={3000}
          duration={6000}
        >
          <div className="w-5 h-5 bg-purple-400 rounded-full blur-sm"></div>
        </FloatingElement>
      </div> */}

      {/* Floating Promo Notification */}
      {showPromo && (
        <Notification
          title="🎉 Promo Spesial!"
          message="Dapatkan diskon 20% untuk layanan OS Installation. Berlaku hingga akhir bulan ini!"
          type="info"
          duration={5000}
          onClose={() => setShowPromo(false)}
          className="fixed top-20 right-4 z-50"
        />
      )}

      {/* Main Content */}
      <div className="relative z-20">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <CTASection />
      </div>
    </main>
  )
}
