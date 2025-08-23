"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Monitor, Settings, Wrench, Shield, Zap, Users } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Monitor,
      title: "Hardware Diagnostic",
      description: "Analisis mendalam performa hardware dengan tools profesional untuk identifikasi masalah dan optimasi sistem.",
    },
    {
      icon: Settings,
      title: "System Optimization",
      description: "Optimasi sistem operasi dan software untuk performa maksimal sesuai kebutuhan bisnis dan personal.",
    },
    {
      icon: Wrench,
      title: "Repair & Maintenance",
      description: "Layanan perbaikan dan maintenance hardware dengan teknisi berpengalaman dan spare part berkualitas.",
    },
    {
      icon: Shield,
      title: "Security Setup",
      description: "Setup keamanan sistem lengkap termasuk firewall, antivirus, dan backup system untuk perlindungan data.",
    },
    {
      icon: Zap,
      title: "Performance Boost",
      description: "Peningkatan performa sistem melalui upgrade hardware dan konfigurasi optimal untuk kebutuhan spesifik.",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Dukungan teknis 24/7 untuk troubleshooting dan konsultasi hardware kapanpun Anda butuhkan.",
    },
  ]

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16 ">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-100">
              Mengapa Memilih <span className="text-cyan-400">Kami?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Solusi hardware terpadu dengan standar profesional dan teknologi terkini
            </p>
          </div>
        </ScrollReveal>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <ScrollReveal key={index} direction="up" delay={index * 100}>
                <Card className="bg-slate-900 border-slate-800 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/10">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-cyan-400" />
                    </div>
                    <CardTitle className="text-lg text-slate-100">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}