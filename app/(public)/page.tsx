'use client'

import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CTASection } from "@/components/sections/cta-section"
import { Notification } from "@/components/ui/interactive-notification"
import { InteractiveProgress } from "@/components/ui/interactive-progress"
import { useState, useEffect } from "react"
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
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Palugada Digital",
            "description": "Solusi hardware terpadu dan layanan IT profesional",
            "url": "https://palugada-digital.com",
            "logo": "https://palugada-digital.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+62-xxx-xxx-xxxx",
              "contactType": "customer service",
              "areaServed": "ID",
              "availableLanguage": "Indonesian"
            },
            "sameAs": [
              "https://facebook.com/palugadadigital",
              "https://instagram.com/palugadadigital",
              "https://linkedin.com/company/palugadadigital"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "ID",
              "addressLocality": "Jakarta",
              "addressRegion": "DKI Jakarta"
            }
          })
        }}
      />

      <main className="relative min-h-screen bg-slate-50">
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200">
          <InteractiveProgress
            value={scrollProgress}
            className="h-full"
            color="blue"
            animated={false}
          />
        </div>

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
          {/* <CTASection /> */}
        </div>
      </main>
    </>
  )
}
