'use client'

import { Button } from "@/components/ui/button"
import { InteractiveCarousel } from "@/components/ui/interactive-carousel"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { CheckCircle, Star, Clock, Shield, Users, Award, ArrowRight, Zap, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price: string
  ctaHref: string
  isActive: boolean
}

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const data = await response.json()
          // Pastikan data adalah array dan filter yang aktif
          if (Array.isArray(data)) {
            setServices(data.filter((service: Service) => service.isActive))
          } else {
            // Jika data bukan array, gunakan fallback
            setServices([
              {
                id: "1",
                title: "OS Installation",
                description: "Instalasi sistem operasi Windows, Linux, dan macOS dengan konfigurasi optimal untuk performa maksimal.",
                icon: "🖥️",
                features: ["Windows 10/11", "Linux Ubuntu", "macOS", "Driver Installation", "System Optimization"],
                price: "Mulai Rp 150.000",
                ctaHref: "/booking",
                isActive: true
              },
              {
                id: "2", 
                title: "Software Setup",
                description: "Instalasi dan konfigurasi software office, design, dan aplikasi produktivitas lainnya.",
                icon: "⚙️",
                features: ["Microsoft Office", "Adobe Creative Suite", "Development Tools", "Antivirus Setup", "Cloud Apps"],
                price: "Mulai Rp 100.000",
                ctaHref: "/booking",
                isActive: true
              },
              {
                id: "3",
                title: "Tech Support",
                description: "Dukungan teknis 24/7 untuk troubleshooting hardware, software, dan masalah sistem.",
                icon: "🔧",
                features: ["Remote Support", "Hardware Repair", "Virus Removal", "Data Recovery", "Network Setup"],
                price: "Mulai Rp 200.000",
                ctaHref: "/booking", 
                isActive: true
              }
            ])
          }
        } else {
          // Fallback data jika API tidak tersedia
          setServices([
            {
              id: "1",
              title: "OS Installation",
              description: "Instalasi sistem operasi Windows, Linux, dan macOS dengan konfigurasi optimal untuk performa maksimal.",
              icon: "🖥️",
              features: ["Windows 10/11", "Linux Ubuntu", "macOS", "Driver Installation", "System Optimization"],
              price: "Mulai Rp 150.000",
              ctaHref: "/booking",
              isActive: true
            },
            {
              id: "2", 
              title: "Software Setup",
              description: "Instalasi dan konfigurasi software office, design, dan aplikasi produktivitas lainnya.",
              icon: "⚙️",
              features: ["Microsoft Office", "Adobe Creative Suite", "Development Tools", "Antivirus Setup", "Cloud Apps"],
              price: "Mulai Rp 100.000",
              ctaHref: "/booking",
              isActive: true
            },
            {
              id: "3",
              title: "Tech Support",
              description: "Dukungan teknis 24/7 untuk troubleshooting hardware, software, dan masalah sistem.",
              icon: "🔧",
              features: ["Remote Support", "Hardware Repair", "Virus Removal", "Data Recovery", "Network Setup"],
              price: "Mulai Rp 200.000",
              ctaHref: "/booking", 
              isActive: true
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching services:', error)
        // Fallback data
        setServices([
          {
            id: "1",
            title: "OS Installation",
            description: "Instalasi sistem operasi Windows, Linux, dan macOS dengan konfigurasi optimal untuk performa maksimal.",
            icon: "🖥️",
            features: ["Windows 10/11", "Linux Ubuntu", "macOS", "Driver Installation", "System Optimization"],
            price: "Mulai Rp 150.000",
            ctaHref: "/booking",
            isActive: true
          },
          {
            id: "2", 
            title: "Software Setup",
            description: "Instalasi dan konfigurasi software office, design, dan aplikasi produktivitas lainnya.",
            icon: "⚙️",
            features: ["Microsoft Office", "Adobe Creative Suite", "Development Tools", "Antivirus Setup", "Cloud Apps"],
            price: "Mulai Rp 100.000",
            ctaHref: "/booking",
            isActive: true
          },
          {
            id: "3",
            title: "Tech Support",
            description: "Dukungan teknis 24/7 untuk troubleshooting hardware, software, dan masalah sistem.",
            icon: "🔧",
            features: ["Remote Support", "Hardware Repair", "Virus Removal", "Data Recovery", "Network Setup"],
            price: "Mulai Rp 200.000",
            ctaHref: "/booking", 
            isActive: true
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (isLoading) {
    return (
      <section className="py-24 bg-futuristic-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-futuristic-accent mx-auto"></div>
            <p className="mt-6 text-futuristic-text-secondary text-lg">Memuat layanan...</p>
          </div>
        </div>
      </section>
    )
  }

  const carouselItems = services.map((service) => ({
    id: service.id,
    content: (
      <div className="relative group">
        <div className="absolute inset-0 bg-futuristic-accent/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
        <div className="relative bg-futuristic-secondary/90 backdrop-blur-xl rounded-3xl p-10 border border-futuristic-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">{service.icon}</div>
            <h3 className="text-3xl font-bold text-futuristic-text-primary mb-4">{service.title}</h3>
            <p className="text-futuristic-text-secondary text-base leading-relaxed max-w-md mx-auto">{service.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-futuristic-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-futuristic-text-primary" />
                </div>
                <span className="text-futuristic-text-secondary font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-futuristic-text-primary">{service.price}</div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-futuristic-accent hover:bg-futuristic-accent-hover text-futuristic-text-primary border border-futuristic-accent hover:border-futuristic-accent-hover transition-all duration-300 transform hover:scale-105 px-8 py-4 rounded-lg font-medium group shadow-lg hover:shadow-futuristic-glow"
            >
              <Link href={service.ctaHref} className="flex items-center">
                Pilih Layanan
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    ),
  }))

  return (
    <section className="py-24 bg-futuristic-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-futuristic-secondary/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-futuristic-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-futuristic-cyan/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-futuristic-secondary/80 border border-futuristic-accent/30 text-futuristic-text-primary text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
              <Zap className="w-4 h-4 mr-2 text-futuristic-accent" />
              Layanan Profesional
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={200}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-futuristic-text-primary mb-8">
              Layanan Hardware
              <span className="block text-futuristic-accent">
                Profesional
              </span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={400}>
            <p className="text-xl text-futuristic-text-secondary max-w-4xl mx-auto leading-relaxed">
              Kami menyediakan layanan hardware terpadu dengan standar profesional untuk memastikan sistem Anda berjalan optimal.
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel */}
        <ScrollReveal direction="up" delay={600}>
          <InteractiveCarousel items={carouselItems} />
        </ScrollReveal>

        {/* Why Choose Us */}
        <div className="mt-32">
          <ScrollReveal direction="up" delay={800}>
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-futuristic-text-primary mb-6">
                Mengapa Memilih Kami?
              </h3>
              <p className="text-xl text-futuristic-text-secondary max-w-3xl mx-auto">
                Tim ahli kami siap memberikan solusi terbaik untuk kebutuhan hardware Anda
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={1000}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-8 rounded-3xl bg-futuristic-secondary/60 backdrop-blur-sm border border-futuristic-border/50 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-futuristic-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-futuristic-text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-futuristic-text-primary mb-4">Garansi Layanan</h4>
                <p className="text-futuristic-text-secondary">Jaminan kualitas dan garansi untuk setiap layanan</p>
              </div>

              <div className="text-center p-8 rounded-3xl bg-futuristic-secondary/60 backdrop-blur-sm border border-futuristic-border/50 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-futuristic-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-10 h-10 text-futuristic-text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-futuristic-text-primary mb-4">Layanan 24/7</h4>
                <p className="text-futuristic-text-secondary">Dukungan teknis tersedia setiap saat</p>
              </div>

              <div className="text-center p-8 rounded-3xl bg-futuristic-secondary/60 backdrop-blur-sm border border-futuristic-border/50 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-futuristic-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-futuristic-text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-futuristic-text-primary mb-4">Tim Ahli</h4>
                <p className="text-futuristic-text-secondary">Dilengkapi dengan tim teknisi berpengalaman</p>
              </div>

              <div className="text-center p-8 rounded-3xl bg-futuristic-secondary/60 backdrop-blur-sm border border-futuristic-border/50 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-futuristic-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-futuristic-text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-futuristic-text-primary mb-4">Kualitas Terjamin</h4>
                <p className="text-futuristic-text-secondary">Standar kualitas tinggi untuk kepuasan pelanggan</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={1200}>
          <div className="text-center mt-24">
            <div className="bg-futuristic-secondary/50 rounded-3xl p-12 border border-futuristic-border/50 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-futuristic-text-primary mb-6">
                Siap Memulai Proyek Anda?
              </h3>
              <p className="text-xl text-futuristic-text-secondary mb-8 max-w-3xl mx-auto">
                Konsultasikan kebutuhan hardware Anda dengan tim ahli kami dan dapatkan solusi terbaik
              </p>
              <Button
                size="lg"
                className="bg-futuristic-accent hover:bg-futuristic-accent-hover text-futuristic-text-primary border border-futuristic-accent hover:border-futuristic-accent-hover transition-all duration-300 transform hover:scale-105 px-10 py-6 rounded-lg font-medium text-lg group shadow-lg hover:shadow-futuristic-glow"
              >
                <Link href="/booking" className="flex items-center">
                  Konsultasi Sekarang
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
