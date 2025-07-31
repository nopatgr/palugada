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
          src="/images/hero-bg.jpg"
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
      <div className="absolute inset-0 pointer-events-none z-10">
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
      </div>

      {/* Additional Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-20">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-futuristic-accent/20 via-transparent to-futuristic-cyan/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-futuristic-accent/10 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-futuristic-accent rounded-full animate-pulse shadow-lg shadow-futuristic-accent/50"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-futuristic-cyan rounded-full animate-pulse shadow-lg shadow-futuristic-cyan/50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-2.5 h-2.5 bg-futuristic-accent-hover rounded-full animate-pulse shadow-lg shadow-futuristic-accent-hover/50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-futuristic-cyan rounded-full animate-pulse shadow-lg shadow-futuristic-cyan/50" style={{animationDelay: '3s'}}></div>
        
        {/* Additional floating particles */}
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-futuristic-accent rounded-full animate-float"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-futuristic-cyan rounded-full animate-float-delay"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-futuristic-accent-hover rounded-full animate-float-delay-2"></div>
      </div>

      {/* Content */}
      <div className="relative z-40 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-8 lg:py-0">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <ScrollReveal direction="up">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-futuristic-secondary/80 border border-futuristic-accent/30 text-futuristic-text-primary text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
                <Sparkles className="w-4 h-4 mr-2 text-futuristic-accent" />
                Layanan Teknologi Terpercaya
              </div>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal direction="up" delay={200}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-futuristic-text-primary mb-8 leading-tight">
                Solusi Digital
                <span className="block text-futuristic-accent">
                  untuk Bisnis Anda
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={400}>
              <p className="text-xl sm:text-2xl text-futuristic-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
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
                  className="bg-futuristic-accent hover:bg-futuristic-accent-hover text-futuristic-text-primary border border-futuristic-accent hover:border-futuristic-accent-hover transition-all duration-300 text-lg px-10 py-6 rounded-lg font-medium group shadow-lg hover:shadow-futuristic-glow"
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

          {/* Right Content - Modern 3D Visualization */}
          <div className="relative hidden lg:flex justify-center lg:justify-end">
            <ScrollReveal direction="up" delay={400}>
              <div className="relative">
                {/* Main Container */}
                <div className="relative w-96 h-96">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-futuristic-accent/20 rounded-3xl blur-3xl animate-pulse"></div>
                  
                  {/* Main Card */}
                  <div className="relative w-full h-full bg-futuristic-secondary/90 backdrop-blur-xl rounded-3xl border border-futuristic-accent/30 shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="absolute top-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="text-futuristic-text-primary text-sm font-medium">System Online</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-futuristic-accent rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-futuristic-cyan rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                          <div className="w-2 h-2 bg-futuristic-accent-hover rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                        </div>
                      </div>
                    </div>

                    {/* Central Server */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Server Tower */}
                        <div className="w-40 h-56 bg-futuristic-primary rounded-2xl shadow-2xl border border-futuristic-border relative overflow-hidden">
                          {/* Server Lights */}
                          <div className="absolute top-6 left-6 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                          <div className="absolute top-12 left-6 w-3 h-3 bg-futuristic-accent rounded-full animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
                          <div className="absolute top-18 left-6 w-3 h-3 bg-futuristic-cyan rounded-full animate-pulse shadow-lg" style={{animationDelay: '2s'}}></div>
                          
                          {/* Server Details */}
                          <div className="absolute bottom-6 left-4 right-4 h-12 bg-futuristic-secondary rounded-lg"></div>
                          <div className="absolute bottom-20 left-4 right-4 h-3 bg-futuristic-secondary rounded"></div>
                          <div className="absolute bottom-28 left-4 right-4 h-3 bg-futuristic-secondary rounded"></div>
                          
                          {/* Data Flow */}
                          <div className="absolute inset-0">
                            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-futuristic-accent animate-pulse"></div>
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-futuristic-cyan animate-pulse" style={{animationDelay: '1s'}}></div>
                            <div className="absolute top-3/4 left-0 w-full h-0.5 bg-futuristic-accent-hover animate-pulse" style={{animationDelay: '2s'}}></div>
                          </div>
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute -top-12 -right-12 w-20 h-20 bg-futuristic-accent rounded-2xl shadow-2xl animate-float flex items-center justify-center">
                          <Monitor className="w-10 h-10 text-futuristic-text-primary" />
                        </div>
                        
                        <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-futuristic-secondary rounded-xl shadow-2xl animate-float-delay flex items-center justify-center">
                          <Settings className="w-8 h-8 text-futuristic-text-primary" />
                        </div>
                        
                        <div className="absolute top-1/2 -right-16 w-14 h-14 bg-futuristic-accent-hover rounded-xl shadow-2xl animate-float-delay-2 flex items-center justify-center">
                          <Wrench className="w-7 h-7 text-futuristic-text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between text-xs text-futuristic-text-secondary">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>CPU: 45%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-futuristic-accent rounded-full"></div>
                          <span>RAM: 62%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-futuristic-cyan rounded-full"></div>
                          <span>NET: 78%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Rings */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-futuristic-accent/20 rounded-full animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-futuristic-accent/10 rounded-full animate-spin-slow-reverse"></div>
                
                {/* Floating Particles */}
                <div className="absolute top-16 left-16 w-3 h-3 bg-futuristic-accent rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-32 right-32 w-2 h-2 bg-futuristic-cyan rounded-full animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-32 left-32 w-2.5 h-2.5 bg-futuristic-accent-hover rounded-full animate-pulse shadow-lg" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-16 right-16 w-2 h-2 bg-futuristic-cyan rounded-full animate-pulse shadow-lg" style={{animationDelay: '3s'}}></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
