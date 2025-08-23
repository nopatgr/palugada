'use client'

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import Link from "next/link"
import { ArrowRight, Play, CheckCircle } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const features = [
    "Hardware Diagnostic & Repair",
    "OS Installation & Setup",
    "System Optimization",
    "24/7 Tech Support"
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
       <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg.png"
          alt="Hero Background"
          fill
          className="object-cover object-center scale-110 animate-slow-zoom"
          priority
          sizes="100vw"
        />
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-futuristic-primary/90 via-futuristic-primary/70 to-futuristic-primary/95"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm mb-6">
                <CheckCircle className="w-4 h-4 mr-2 text-indigo-500" />
                <span className="text-indigo-500 text-sm font-semibold tracking-wide">Hardware Solutions</span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-700 leading-tight">
                Solusi Hardware <span className="text-indigo-500">Terpadu</span> untuk Sistem Anda
              </h1>
              
              <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Kami menyediakan layanan hardware lengkap mulai dari instalasi OS, 
                optimasi sistem, hingga perbaikan hardware dengan standar profesional.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg px-6 py-3 hover:from-indigo-600 hover:to-blue-700 focus:ring-2 focus:ring-indigo-500 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/booking" className="flex items-center">
                    Mulai Konsultasi
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300"
                  asChild
                >
                  <Link href="/layanan" className="flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Lihat Demo
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-slate-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              {/* <div className="backdrop-blur-sm   rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-700 mb-4">
                    Konsultasi Gratis
                  </h3>
                  
                  <p className="text-slate-500 mb-6">
                    Dapatkan analisis sistem hardware Anda secara gratis dari tim ahli kami
                  </p>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg px-4 py-2 hover:from-indigo-600 hover:to-blue-700 focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/booking">Daftar Sekarang</Link>
                  </Button>
                </div>
              </div> */}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
