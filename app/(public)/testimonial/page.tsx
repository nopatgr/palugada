import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Star, Quote, Users, Award, Clock, Shield, Monitor, Settings, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TestimonialPage() {
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      position: "CEO",
      company: "PT Maju Bersama",
      rating: 5,
      service: "OS Installation",
      serviceIcon: Monitor,
      testimonial:
        "Palugada Digital berhasil menginstall dan mengkonfigurasi sistem operasi dengan sangat profesional. Tim mereka sangat responsif dan memahami kebutuhan hardware kami. Highly recommended!",
      project: "Windows Server Installation",
      completedAt: "Januari 2025",
      color: "from-futuristic-accent to-futuristic-cyan"
    },
    {
      id: 2,
      name: "Sari Dewi",
      position: "IT Manager",
      company: "Toko Online Berkah",
      avatar: "/placeholder.svg?height=60&width=60&text=SD",
      rating: 5,
      service: "Software Setup",
      serviceIcon: Settings,
      testimonial:
        "Setup software yang dilakukan sangat user-friendly dan fitur-fiturnya lengkap. Performa sistem kami meningkat 200% setelah menggunakan konfigurasi hardware yang optimal.",
      project: "Business Software Configuration",
      completedAt: "Februari 2025",
      color: "from-futuristic-cyan to-futuristic-accent"
    },
    {
      id: 3,
      name: "Ahmad Rizki",
      position: "Founder",
      company: "EduTech Indonesia",
      avatar: "/placeholder.svg?height=60&width=60&text=AR",
      rating: 5,
      service: "Tech Support",
      serviceIcon: Wrench,
      testimonial:
        "Dukungan teknis hardware yang diberikan sangat responsif dan profesional. Masalah sistem kami terselesaikan dengan cepat dan tidak mengganggu operasional bisnis.",
      project: "24/7 Technical Support",
      completedAt: "Maret 2025",
      color: "from-futuristic-accent to-futuristic-accent-hover"
    },
    {
      id: 4,
      name: "Diana Putri",
      position: "System Administrator",
      company: "Digital Solutions Corp",
      avatar: "/placeholder.svg?height=60&width=60&text=DP",
      rating: 5,
      service: "Hardware Upgrade",
      serviceIcon: Monitor,
      testimonial:
        "Upgrade hardware yang dilakukan sangat smooth dan hasilnya luar biasa. Performa server kami meningkat drastis dan lebih stabil untuk menangani traffic tinggi.",
      project: "Server Hardware Upgrade",
      completedAt: "April 2025",
      color: "from-futuristic-cyan to-futuristic-accent"
    },
    {
      id: 5,
      name: "Rudi Hermawan",
      position: "CTO",
      company: "TechStart Indonesia",
      avatar: "/placeholder.svg?height=60&width=60&text=RH",
      rating: 5,
      service: "Network Setup",
      serviceIcon: Wrench,
      testimonial:
        "Setup jaringan yang dilakukan sangat profesional dan sesuai standar enterprise. Keamanan dan performa jaringan kami sekarang sangat optimal.",
      project: "Enterprise Network Setup",
      completedAt: "February 2025",
      color: "from-futuristic-accent to-futuristic-cyan"
    },
    {
      id: 6,
      name: "Linda Sari",
      position: "Operations Manager",
      company: "Retail Chain Indonesia",
      avatar: "/placeholder.svg?height=60&width=60&text=LS",
      rating: 5,
      service: "Security Hardware",
      serviceIcon: Shield,
      testimonial:
        "Implementasi keamanan hardware yang dilakukan sangat komprehensif. Sistem kami sekarang terlindungi dengan baik dari berbagai ancaman digital.",
      project: "Security Hardware Implementation",
      completedAt: "Juni 2025",
      color: "from-futuristic-accent-hover to-futuristic-accent"
    },
  ]

  const stats = [
    { label: "Total Klien", value: "100+", icon: Users, color: "text-futuristic-accent" },
    { label: "Project Selesai", value: "250+", icon: Award, color: "text-futuristic-cyan" },
    { label: "Rating Rata-rata", value: "4.9/5", icon: Star, color: "text-futuristic-accent-hover" },
    { label: "Client Retention", value: "98%", icon: Shield, color: "text-futuristic-accent" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-futuristic-accent/10 via-futuristic-cyan/10 to-futuristic-accent-hover/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,90,240,0.1),transparent_50%)]"></div>
        <div className="container px-4 mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-futuristic-accent/30 bg-futuristic-accent/10 backdrop-blur-sm mb-6">
                <Users className="w-4 h-4 mr-2 text-futuristic-accent" />
                <span className="text-futuristic-text-primary text-sm font-semibold tracking-wide">Client Testimonials</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-futuristic-text-primary">
                Testimonial <span className="bg-gradient-to-r from-futuristic-accent via-futuristic-cyan to-futuristic-accent-hover bg-clip-text text-transparent">Klien</span>
              </h1>
              <p className="text-xl text-futuristic-text-secondary max-w-3xl mx-auto leading-relaxed tracking-wide">
                Kepuasan klien adalah prioritas utama kami. Lihat apa kata mereka tentang layanan hardware kami.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-futuristic-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <ScrollReveal key={index} direction="up" delay={index * 100}>
                  <div className="text-center group">
                    <div className={`mx-auto w-16 h-16 bg-futuristic-secondary rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className={`text-3xl lg:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-futuristic-text-secondary font-medium tracking-wide">{stat.label}</div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const ServiceIcon = testimonial.serviceIcon
              return (
                <ScrollReveal key={testimonial.id} direction="up" delay={index * 200}>
                  <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-futuristic-secondary/50 border-futuristic-border backdrop-blur-sm border shadow-xl">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* <Avatar className="ring-2 ring-futuristic-accent/20">
                            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                            <AvatarFallback className="bg-gradient-to-r from-futuristic-accent to-futuristic-cyan text-futuristic-text-primary">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar> */}
                          <div>
                            <CardTitle className="text-lg text-futuristic-text-primary tracking-wide group-hover:text-futuristic-accent transition-colors">{testimonial.name}</CardTitle>
                            <CardDescription className="text-futuristic-text-secondary tracking-wide">
                              {testimonial.position} at {testimonial.company}
                            </CardDescription>
                          </div>
                        </div>
                        <Quote className="h-6 w-6 text-futuristic-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-futuristic-border"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-futuristic-text-secondary">({testimonial.rating}/5)</span>
                      </div>

                      <Badge className={`w-fit bg-gradient-to-r ${testimonial.color} text-futuristic-text-primary border-0 flex items-center gap-1`}>
                        <ServiceIcon className="h-3 w-3" />
                        {testimonial.service}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-futuristic-text-secondary leading-relaxed tracking-wide">"{testimonial.testimonial}"</p>

                      <div className="pt-4 border-t border-futuristic-border space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-futuristic-text-secondary tracking-wide">Project:</span>
                          <span className="font-medium text-futuristic-text-primary tracking-wide">{testimonial.project}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-futuristic-text-secondary tracking-wide">Selesai:</span>
                          <span className="font-medium text-futuristic-text-primary tracking-wide">{testimonial.completedAt}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-futuristic-secondary/30">
        <div className="container px-4 mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold mb-4 text-futuristic-text-primary">
              Bergabung dengan <span className="bg-gradient-to-r from-futuristic-accent to-futuristic-cyan bg-clip-text text-transparent">Klien Puas Kami</span>
            </h2>
            <p className="text-xl mb-8 text-futuristic-text-secondary max-w-2xl mx-auto tracking-wide">
              Dapatkan layanan hardware terbaik dan jadilah bagian dari klien puas kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-futuristic-accent via-futuristic-cyan to-futuristic-accent-hover hover:from-futuristic-accent/90 hover:via-futuristic-cyan/90 hover:to-futuristic-accent-hover/90 text-futuristic-text-primary shadow-xl hover:shadow-futuristic-glow transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
                asChild
              >
                <Link href="/booking">Mulai Sekarang</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-futuristic-text-primary border-futuristic-border hover:bg-futuristic-secondary/50 bg-futuristic-secondary/50 backdrop-blur-sm shadow-xl hover:shadow-futuristic-glow transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
                asChild
              >
                <Link href="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
