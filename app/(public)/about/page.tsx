import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import Link from "next/link"
import { Target, Lightbulb, Heart, Zap, Monitor, Settings, Wrench, Users, Award, Clock, Shield } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tentang Kami - Palugada Digital",
  description: "Kenali tim profesional Palugada Digital yang berkomitmen memberikan solusi hardware terbaik dengan standar kualitas tinggi dan inovasi berkelanjutan.",
  keywords: ["tentang kami", "tim profesional", "hardware solutions", "kualitas tinggi", "inovasi"],
  openGraph: {
    title: "Tentang Kami - Palugada Digital",
    description: "Kenali tim profesional Palugada Digital yang berkomitmen memberikan solusi hardware terbaik.",
  }
}

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Fokus pada Hasil",
      description: "Kami berkomitmen memberikan solusi hardware yang menghasilkan performa optimal bagi sistem Anda.",
    },
    {
      icon: Heart,
      title: "Kepuasan Klien",
      description: "Kepuasan dan kesuksesan klien adalah prioritas utama dalam setiap project yang kami kerjakan.",
    },
    {
      icon: Lightbulb,
      title: "Inovasi Berkelanjutan",
      description: "Selalu mengikuti perkembangan teknologi hardware terbaru untuk memberikan solusi terdepan.",
    },
    {
      icon: Zap,
      title: "Kualitas Tinggi",
      description: "Standar kualitas tinggi dalam setiap aspek instalasi dan layanan hardware yang kami berikan.",
    },
  ]

  const services = [
    {
      icon: Monitor,
      title: "OS Installation",
      description: "Instalasi sistem operasi Windows, Linux, dan macOS dengan konfigurasi optimal",
    },
    {
      icon: Settings,
      title: "Software Setup",
      description: "Setup dan konfigurasi software sesuai kebutuhan bisnis dan personal",
    },
    {
      icon: Wrench,
      title: "Tech Support",
      description: "Dukungan teknis 24/7 untuk masalah hardware dan software",
    }
  ]

  const stats = [
    { icon: Users, value: "100+", label: "Client Puas" },
    { icon: Award, value: "5★", label: "Rating" },
    { icon: Clock, value: "24/7", label: "Support" },
    { icon: Shield, value: "100%", label: "Garansi" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/5"></div>
        <div className="container px-4 mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm mb-6">
                <Monitor className="w-4 h-4 mr-2 text-indigo-500" />
                <span className="text-indigo-500 text-sm font-semibold tracking-wide">Hardware Solutions</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-700">
                Tentang <span className="text-indigo-500">Kami</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed tracking-wide">
                Palugada Digital adalah partner terpercaya untuk solusi hardware dan teknologi bisnis Anda
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border border-slate-200 rounded-lg mx-4 mb-8 shadow-sm">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 100}>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                    <stat.icon className="h-8 w-8 text-indigo-500" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-indigo-500 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium tracking-wide">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-700">
                  Cerita <span className="text-indigo-500">Kami</span>
                </h2>
                <div className="space-y-6 text-slate-500 leading-relaxed tracking-wide">
                  <p>
                    Palugada Digital lahir dari visi untuk membantu bisnis Indonesia dalam mengoptimalkan teknologi hardware.
                    Nama "Palugada" yang berarti "apa lu mau gua ada" mencerminkan komitmen kami untuk menyediakan
                    solusi hardware yang komprehensif dan reliable.
                  </p>
                  <p>
                    Sejak didirikan pada 2020, kami telah membantu puluhan klien dari berbagai industri untuk
                    mengoptimalkan sistem hardware mereka. Dari instalasi OS hingga setup software, kami memahami
                    kebutuhan unik setiap bisnis dan personal.
                  </p>
                  <p>
                    Tim kami terdiri dari teknisi berpengalaman yang passionate dalam teknologi hardware dan berkomitmen
                    memberikan hasil terbaik untuk setiap project dengan standar kualitas tinggi.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative">
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="grid grid-cols-1 gap-6">
                    {services.map((service, index) => {
                      const IconComponent = service.icon
                      return (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-slate-700 font-semibold tracking-wide">{service.title}</h3>
                            <p className="text-slate-500 text-sm tracking-wide">{service.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-700">
                Nilai-Nilai <span className="text-indigo-500">Kami</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto tracking-wide">
                Prinsip-prinsip yang memandu setiap langkah kami dalam memberikan layanan hardware terbaik
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 200}>
                <Card className="text-center border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 bg-white hover:bg-slate-100">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-700 tracking-wide">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-500 tracking-wide">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border border-slate-200 rounded-lg mx-4 mb-8 shadow-sm">
        <div className="container px-4 mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold mb-4 text-slate-700">Siap Berkolaborasi dengan Kami?</h2>
            <p className="text-xl mb-8 text-slate-500 max-w-2xl mx-auto tracking-wide">
              Mari wujudkan kebutuhan hardware Anda bersama tim profesional Palugada Digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-indigo-500 text-white rounded-lg px-8 py-3 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 font-semibold tracking-wide"
                asChild
              >
                <Link href="/booking">Mulai Konsultasi</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg px-8 py-3 font-semibold tracking-wide"
                asChild
              >
                <Link href="/layanan">Lihat Layanan</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
