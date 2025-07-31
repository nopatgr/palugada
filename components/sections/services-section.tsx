import Link from "next/link"
import { ArrowRight, Star, Zap, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { InteractiveCarousel } from "@/components/ui/interactive-carousel"

export function ServicesSection({
  title = "Layanan Unggulan",
  subtitle = "Berbagai layanan teknologi profesional untuk mendukung operasional bisnis Anda",
  services = [
    {
      title: "OS Installation",
      description: "Instalasi sistem operasi Windows, macOS, dan Linux dengan konfigurasi optimal untuk performa maksimal",
      image: "/images/software-development.jpeg",
      gradient: "from-cyan-500 to-blue-500",
      popular: true,
      features: ["Windows 10/11", "macOS", "Linux Ubuntu", "Driver Installation"],
      price: "Mulai Rp 150K"
    },
    {
      title: "Software Setup",
      description: "Setup dan konfigurasi software aplikasi sesuai kebutuhan bisnis Anda dengan dukungan teknis lengkap",
      image: "/images/computer-repair.jpeg",
      gradient: "from-blue-500 to-purple-500",
      features: ["Office Suite", "Design Software", "Development Tools", "Security Software"],
      popular: true,
      price: "Mulai Rp 200K"
    },
    {
      title: "Tech Support",
      description: "Dukungan teknis 24/7 untuk troubleshooting dan maintenance sistem dengan response time cepat",
      image: "/images/tech-support.jpeg",
      gradient: "from-purple-500 to-cyan-500",
      features: ["Remote Support", "On-site Service", "Preventive Maintenance", "Emergency Response"],
      price: "Mulai Rp 100K/jam"
    },
  
  ],
  ctaText = "Lihat Semua Layanan",
  ctaHref = "/layanan",
}) {
  const carouselItems = services.map((service, index) => ({
    id: service.title,
    content: (
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 rounded-2xl" />
        <div className="relative h-full p-8 flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.gradient} shadow-lg`}></div>
                <h3 className="text-2xl font-bold text-white tracking-wide">{service.title}</h3>
              </div>
              {service.popular && (
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                  <Star className="w-3 h-3 text-white fill-current" />
                  <span className="text-xs font-semibold text-white">Populer</span>
                </div>
              )}
            </div>
            <p className="text-slate-200 leading-relaxed tracking-wide text-lg">{service.description}</p>
          </div>

          {/* Features */}
          {service.features && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-cyan-400 tracking-wide">Fitur Utama:</h4>
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <span className="tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-600">
            <div>
              <span className="text-2xl font-bold text-cyan-400">{service.price}</span>
            </div>
            <Button
              size="sm"
             
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            
            >
              <Link href={ctaHref}>
                Pilih Layanan
              </Link>
             
            </Button>
          </div>
        </div>
      </div>
    ),
    // title: service.title,
    // description: service.description
  }))
  // console.log("carouselItems:", carouselItems);

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
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-semibold tracking-wide">Layanan Profesional</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white tracking-tight">{title}</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed tracking-wide">{subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Carousel Section */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mb-12">
            <InteractiveCarousel
              items={carouselItems}
              className="h-96 lg:h-[500px]"
              autoPlay={true}
              interval={6000}
              effect="fade"
              showDots={true}
              showArrows={true}
            />
          </div>
        </ScrollReveal>

        {/* Additional Info */}
        <ScrollReveal direction="up" delay={400}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Response Cepat</h3>
              <p className="text-slate-300 text-sm">Dukungan teknis 24/7 dengan response time &lt; 2 jam</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Garansi Layanan</h3>
              <p className="text-slate-300 text-sm">Garansi 30 hari untuk semua layanan yang kami berikan</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Solusi Terbaik</h3>
              <p className="text-slate-300 text-sm">Tim ahli berpengalaman dengan solusi yang tepat sasaran</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={600}>
          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3 font-semibold tracking-wide"
              asChild
            >
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
