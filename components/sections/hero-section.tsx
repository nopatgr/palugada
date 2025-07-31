'use client'

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import LightRays from "@/components/ui/light-rays"
import { Wrench, Settings, Monitor, CheckCircle, ArrowRight, Star, Users, Clock, Sparkles, Play, Award, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* LightRays Background */}
      <div className="absolute inset-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#06b6d4"
          raysSpeed={0.4}
          lightSpread={2.0}
          rayLength={2.5}
          pulsating={true}
          fadeDistance={1.5}
          saturation={1.2}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.1}
          distortion={0.05}
          className="opacity-30"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-black/90"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-8 lg:py-0">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <ScrollReveal direction="up">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold mb-8 backdrop-blur-sm shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Layanan Teknologi Terpercaya
              </div>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal direction="up" delay={200}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Solusi Digital
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  untuk Bisnis Anda
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={400}>
              <p className="text-xl sm:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
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
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 text-lg px-10 py-6 rounded-xl font-semibold group"
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
                  className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-lg px-10 py-6 rounded-xl font-semibold backdrop-blur-sm"
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
                <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-xs text-slate-400 font-medium">Klien Puas</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-xs text-slate-400 font-medium">Dukungan</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">99%</div>
                  <div className="text-xs text-slate-400 font-medium">Uptime</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">5★</div>
                  <div className="text-xs text-slate-400 font-medium">Rating</div>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl animate-pulse"></div>
                  
                  {/* Main Card */}
                  <div className="relative w-full h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="absolute top-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="text-white text-sm font-medium">System Online</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                        </div>
                      </div>
                    </div>

                    {/* Central Server */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Server Tower */}
                        <div className="w-40 h-56 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-600 relative overflow-hidden">
                          {/* Server Lights */}
                          <div className="absolute top-6 left-6 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                          <div className="absolute top-12 left-6 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
                          <div className="absolute top-18 left-6 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '2s'}}></div>
                          
                          {/* Server Details */}
                          <div className="absolute bottom-6 left-4 right-4 h-12 bg-slate-600 rounded-lg"></div>
                          <div className="absolute bottom-20 left-4 right-4 h-3 bg-slate-600 rounded"></div>
                          <div className="absolute bottom-28 left-4 right-4 h-3 bg-slate-600 rounded"></div>
                          
                          {/* Data Flow */}
                          <div className="absolute inset-0">
                            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
                            <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
                          </div>
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute -top-12 -right-12 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl animate-float flex items-center justify-center">
                          <Monitor className="w-10 h-10 text-white" />
                        </div>
                        
                        <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-2xl animate-float-delay flex items-center justify-center">
                          <Settings className="w-8 h-8 text-white" />
                        </div>
                        
                        <div className="absolute top-1/2 -right-16 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-2xl animate-float-delay-2 flex items-center justify-center">
                          <Wrench className="w-7 h-7 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>CPU: 45%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>RAM: 62%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <span>NET: 78%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Rings */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border-2 border-cyan-500/20 rounded-full animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-cyan-500/10 rounded-full animate-spin-slow-reverse"></div>
                
                {/* Floating Particles */}
                <div className="absolute top-16 left-16 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-32 right-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-32 left-32 w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-16 right-16 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '3s'}}></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
