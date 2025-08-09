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
    <section className="py-24 bg-[#1a365d] relative overflow-hidden ">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-futuristic-secondary/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-futuristic-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-futuristic-cyan/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-futuristic-accent/30 bg-futuristic-secondary/80 backdrop-blur-sm mb-8 shadow-lg">
              <Zap className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-futuristic-text-primary text-sm font-medium tracking-wide">Layanan Profesional</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-futuristic-text-primary mb-8 leading-tight">
              Siap Memulai
              <span className="block text-[#3b82f6]">
                Proyek Hardware Anda?
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <p className="text-xl md:text-2xl text-futuristic-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
              Konsultasikan kebutuhan hardware Anda dengan tim ahli kami dan dapatkan solusi terbaik untuk mengoptimalkan sistem Anda.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-[#3b82f6]-hover text-futuristic-text-primary border border-[#3b82f6] hover:border-[#3b82f6]-hover transition-all duration-300 transform hover:scale-105 px-10 py-6 text-xl font-medium rounded-lg group shadow-lg hover:shadow-futuristic-glow"
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
                className="border border-futuristic-text-primary/30 text-futuristic-text-primary hover:bg-futuristic-secondary hover:text-futuristic-text-primary px-10 py-6 text-xl font-medium rounded-lg backdrop-blur-sm hover:border-futuristic-accent/50"
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
                    className="p-8 rounded-3xl bg-futuristic-secondary/60 backdrop-blur-sm border border-futuristic-border/50 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 bg-blue-600  rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-futuristic-text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-futuristic-text-primary mb-4">{feature.title}</h3>
                    <p className="text-futuristic-text-secondary leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>

          {/* Additional Info */}
          <ScrollReveal direction="up" delay={1000}>
            <div className="mt-16 p-8 rounded-3xl bg-futuristic-secondary/50 border border-futuristic-border/50 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-futuristic-text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-futuristic-text-primary">Gratis Konsultasi</h4>
              </div>
              <p className="text-futuristic-text-secondary text-lg max-w-2xl mx-auto">
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
