import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ArrowRight, Star, CheckCircle, Clock, Shield, Zap, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const features = [
    {
      icon: Clock,
      title: "Response Cepat",
      description: "Dukungan teknis 24/7 dengan response time < 2 jam"
    },
    {
      icon: Shield,
      title: "Garansi Layanan",
      description: "Garansi 30 hari untuk semua layanan yang kami berikan"
    },
    {
      icon: CheckCircle,
      title: "Solusi Terbaik",
      description: "Tim ahli berpengalaman dengan solusi yang tepat sasaran"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm mb-8 shadow-lg">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold tracking-wide">Layanan Profesional</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              Siap Memulai
              <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Proyek Hardware Anda?
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Konsultasikan kebutuhan hardware Anda dengan tim ahli kami dan dapatkan solusi terbaik untuk mengoptimalkan sistem Anda.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 px-10 py-6 text-xl font-semibold rounded-xl group"
                asChild
              >
                <Link href="/booking" className="flex items-center">
                  Mulai Konsultasi
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white px-10 py-6 text-xl font-semibold rounded-xl backdrop-blur-sm"
                asChild
              >
                <Link href="/layanan">
                  Lihat Layanan
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Features Grid */}
          <ScrollReveal direction="up" delay={800}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>

          {/* Additional Info */}
          <ScrollReveal direction="up" delay={1000}>
            <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 dark:from-cyan-500/10 dark:to-blue-500/10 border border-cyan-500/30 dark:border-cyan-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Gratis Konsultasi</h4>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                Tim ahli kami siap membantu menganalisis kebutuhan hardware Anda tanpa biaya. 
                Dapatkan solusi terbaik untuk mengoptimalkan performa sistem Anda.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
