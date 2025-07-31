import type React from "react"
import { Users, Zap, Shield, Award, Clock, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  gradient: string
  delay?: number
}

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

export function FeaturesSection({
  title = "Mengapa Memilih Kami?",
  subtitle = "Kami berkomitmen memberikan layanan terbaik dengan standar kualitas tinggi dan pengalaman yang memuaskan",
  features = [
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Solusi digital yang cepat dan dapat diandalkan untuk bisnis Anda dengan response time yang optimal",
      gradient: "from-cyan-500 to-blue-500",
      delay: 200
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Tim ahli berpengalaman dalam berbagai bidang teknologi digital dengan sertifikasi profesional",
      gradient: "from-blue-500 to-purple-500",
      delay: 400
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Keamanan data dan privasi adalah prioritas utama kami dengan protokol keamanan tingkat tinggi",
      gradient: "from-purple-500 to-cyan-500",
      delay: 600
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "Kualitas layanan terjamin dengan standar internasional dan garansi kepuasan pelanggan",
      gradient: "from-green-500 to-emerald-500",
      delay: 800
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Dukungan teknis tersedia 24/7 untuk memastikan sistem Anda berjalan optimal setiap saat",
      gradient: "from-yellow-500 to-orange-500",
      delay: 1000
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Kepuasan pelanggan adalah prioritas utama kami dengan layanan yang personalized",
      gradient: "from-pink-500 to-rose-500",
      delay: 1200
    },
  ],
}: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container px-4 mx-auto relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6">
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-semibold tracking-wide">Keunggulan Kami</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white tracking-tight">{title}</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed tracking-wide">{subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} direction="up" delay={feature.delay || index * 200}>
              <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/10">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <CardHeader className="relative z-10">
                  <div className="relative">
                    <div
                      className={`mx-auto w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110`}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-300 transition-colors duration-300 tracking-wide">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base text-slate-300 leading-relaxed tracking-wide group-hover:text-slate-200 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Stats */}
        <ScrollReveal direction="up" delay={1400}>
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100+</div>
              <div className="text-slate-300 text-sm font-medium">Project Selesai</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-slate-300 text-sm font-medium">Client Puas</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">5★</div>
              <div className="text-slate-300 text-sm font-medium">Rating</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-slate-300 text-sm font-medium">Support</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
