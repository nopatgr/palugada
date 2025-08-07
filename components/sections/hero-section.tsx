'use client'

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import LightRays from "@/components/ui/light-rays"
import { Wrench, Settings, Monitor, CheckCircle, ArrowRight, Star, Users, Clock, Sparkles, Play, Award, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-futuristic-primary">
      {/* Enhanced Background Image */}
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

      {/* Enhanced LightRays Background */}
      {/* <div className="absolute inset-0 pointer-events-none z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#7F5AF0"
          raysSpeed={0.6}
          lightSpread={1.5}
          rayLength={3.0}
          pulsating={true}
          fadeDistance={2.0}
          saturation={1.4}
          followMouse={true}
          mouseInfluence={0.25}
          noiseAmount={0.15}
          distortion={0.08}
          className="opacity-40"
        />
      </div> */}

      {/* Additional Interactive Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden z-20"> */}
        {/* Animated Grid Pattern */}
        {/* <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-futuristic-accent/20 via-transparent to-futuristic-cyan/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-futuristic-accent/10 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        </div> */}
        
        {/* Enhanced Floating Elements */}
        {/* <div className="absolute top-20 left-10 w-3 h-3 bg-futuristic-accent rounded-full animate-pulse shadow-lg shadow-futuristic-accent/50"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-futuristic-cyan rounded-full animate-pulse shadow-lg shadow-futuristic-cyan/50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-2.5 h-2.5 bg-futuristic-accent-hover rounded-full animate-pulse shadow-lg shadow-futuristic-accent-hover/50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-futuristic-cyan rounded-full animate-pulse shadow-lg shadow-futuristic-cyan/50" style={{animationDelay: '3s'}}></div> */}
        
        {/* Additional floating particles */}
        {/* <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-futuristic-accent rounded-full animate-float"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-futuristic-cyan rounded-full animate-float-delay"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-futuristic-accent-hover rounded-full animate-float-delay-2"></div>
      </div> */}

      {/* Content */}
      <div className="relative z-40 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-8 lg:py-0">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            {/* <ScrollReveal direction="up">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-futuristic-secondary/80 border border-futuristic-accent/30 text-futuristic-text-primary text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
                <Sparkles className="w-4 h-4 mr-2 text-futuristic-accent" />
                Layanan Teknologi Terpercaya
              </div>
            </ScrollReveal> */}

            {/* Main Title */}
            <ScrollReveal direction="up" delay={200}>
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-futuristic-text-primary mb-8 leading-tight">
                Solusi Digital
                <span className="block text-[#3b82f6]">
                  untuk Bisnis Anda
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={400}>
              <p className="text-l sm:text-xl text-futuristic-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Kami menyediakan layanan teknologi terpadu untuk membantu bisnis Anda berkembang di era digital. 
                Dari instalasi sistem hingga dukungan teknis 24/7.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" delay={600}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#3b82f6] hover:bg-[#3b82f6]-hover text-futuristic-text-primary border border-futuristic-accent hover:border-futuristic-accent-hover transition-all duration-300 text-lg px-10 py-6 rounded-lg font-medium group shadow-lg hover:shadow-futuristic-glow"
                >
                  <Link href="/booking" className="flex items-center">
                    Mulai Konsultasi
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border border-futuristic-text-primary/30 text-futuristic-text-primary hover:bg-futuristic-secondary hover:text-futuristic-text-primary text-lg px-10 py-6 rounded-lg font-medium backdrop-blur-sm hover:border-futuristic-accent/50"
                >
                  <Link href="/layanan" className="flex items-center">
                    <Play className="mr-3 h-5 w-5" />
                    Lihat Layanan
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal direction="up" delay={800}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto lg:mx-0">
                <div className="text-center p-4 rounded-xl bg-futuristic-secondary/50 backdrop-blur-sm border border-futuristic-border hover:bg-futuristic-secondary/70 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-futuristic-text-primary mb-2">500+</div>
                  <div className="text-xs text-futuristic-text-secondary font-medium">Klien Puas</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-futuristic-secondary/50 backdrop-blur-sm border border-futuristic-border hover:bg-futuristic-secondary/70 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-futuristic-text-primary mb-2">24/7</div>
                  <div className="text-xs text-futuristic-text-secondary font-medium">Dukungan</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-futuristic-secondary/50 backdrop-blur-sm border border-futuristic-border hover:bg-futuristic-secondary/70 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-futuristic-text-primary mb-2">99%</div>
                  <div className="text-xs text-futuristic-text-secondary font-medium">Uptime</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-futuristic-secondary/50 backdrop-blur-sm border border-futuristic-border hover:bg-futuristic-secondary/70 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-futuristic-text-primary mb-2">5★</div>
                  <div className="text-xs text-futuristic-text-secondary font-medium">Rating</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
