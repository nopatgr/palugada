import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Phone, Mail, Star } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  gradient?: string
}

export function CTASection({
  title = "Siap Mengembangkan Bisnis Digital Anda?",
  subtitle = "Konsultasikan kebutuhan digital Anda dengan tim ahli kami. Dapatkan solusi terbaik untuk bisnis Anda dengan dukungan teknis profesional.",
  primaryCTA = {
    text: "Konsultasi Gratis",
    href: "/booking",
  },
  secondaryCTA = {
    text: "Lihat Testimonial",
    href: "/testimonial",
  },
  gradient = "from-cyan-500 via-blue-600 to-purple-600",
}: CTASectionProps) {
  return (
    <section className={`py-20 bg-gradient-to-r ${gradient} text-white relative overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full animate-bounce" />
      <div className="absolute top-40 right-32 w-3 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-32 w-5 h-5 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/30 rounded-full animate-ping" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-6">
                <MessageCircle className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold tracking-wide">Konsultasi Gratis</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight leading-tight">
                {title}
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <p className="text-xl opacity-90 max-w-lg leading-relaxed tracking-wide">
                {subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={600}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3 font-semibold tracking-wide"
                  asChild
                >
                  <Link href={primaryCTA.href}>
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
                  asChild
                >
                  <Link href={secondaryCTA.href}>
                    {secondaryCTA.text}
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="up" delay={800}>
              <div className="grid sm:grid-cols-2 gap-4 pt-8 border-t border-white/20">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-5 h-5 text-cyan-300" />
                  <div>
                    <div className="text-sm font-medium">Hubungi Kami</div>
                    <div className="text-xs opacity-80">+62 812-3456-7890</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Mail className="w-5 h-5 text-blue-300" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-xs opacity-80">info@palugada.com</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Main Circle */}
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center relative">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">100%</div>
                      <div className="text-sm opacity-80">Kepuasan</div>
                      <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 w-14 h-14 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1.5s' }}>
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
