import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import Link from "next/link"
import { Target, Lightbulb, Heart, Zap, Monitor, Settings, Wrench, Users, Award, Clock, Shield } from "lucide-react"

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
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Settings,
      title: "Software Setup",
      description: "Setup dan konfigurasi software sesuai kebutuhan bisnis dan personal",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Wrench,
      title: "Tech Support",
      description: "Dukungan teknis 24/7 untuk masalah hardware dan software",
      color: "from-purple-500 to-cyan-500"
    }
  ]

  const stats = [
    { icon: Users, value: "100+", label: "Client Puas", color: "text-cyan-400" },
    { icon: Award, value: "5★", label: "Rating", color: "text-blue-400" },
    { icon: Clock, value: "24/7", label: "Support", color: "text-purple-400" },
    { icon: Shield, value: "100%", label: "Garansi", color: "text-cyan-400" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="container px-4 mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6">
                <Monitor className="w-4 h-4 mr-2 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-semibold tracking-wide">Hardware Solutions</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                Tentang <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Kami</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed tracking-wide">
                Palugada Digital adalah partner terpercaya untuk solusi hardware dan teknologi bisnis Anda
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-800/50 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 100}>
                <div className="text-center">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-slate-400 font-medium tracking-wide">{stat.label}</div>
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
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                  Cerita <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Kami</span>
                </h2>
                <div className="space-y-6 text-slate-300 leading-relaxed tracking-wide">
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
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl">
                  <div className="grid grid-cols-1 gap-6">
                    {services.map((service, index) => {
                      const IconComponent = service.icon
                      return (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold tracking-wide">{service.title}</h3>
                            <p className="text-slate-400 text-sm tracking-wide">{service.description}</p>
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
      <section className="py-20 bg-slate-800/30">
        <div className="container px-4 mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                Nilai-Nilai <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Kami</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto tracking-wide">
                Prinsip-prinsip yang memandu setiap langkah kami dalam memberikan layanan hardware terbaik
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 200}>
                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-white tracking-wide">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-300 tracking-wide">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="container px-4 mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold mb-4 text-white">Siap Berkolaborasi dengan Kami?</h2>
            <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto tracking-wide">
              Mari wujudkan kebutuhan hardware Anda bersama tim profesional Palugada Digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-500/90 hover:via-blue-600/90 hover:to-purple-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-3 font-semibold tracking-wide"
                asChild
              >
                <Link href="/booking">Mulai Konsultasi</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-slate-600 hover:bg-slate-700/50 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
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
