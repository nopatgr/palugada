import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import Link from "next/link"
import { ExternalLink, Star, Monitor, Smartphone, Globe, Cpu, Zap, Shield } from "lucide-react"

export default function ProdukPage() {
  const products = [
    {
      id: 1,
      name: "Hardware Diagnostic Tool",
      category: "Hardware Solution",
      description: "Software diagnostik lengkap untuk analisis performa hardware dan troubleshooting sistem.",
      image: "/placeholder.svg?height=300&width=400&text=Hardware+Diagnostic",
      features: ["CPU Analysis", "Memory Testing", "Storage Health", "Temperature Monitor"],
      price: "Mulai dari Rp 2.500.000",
      rating: 4.9,
      clients: 45,
      icon: Cpu,
      color: "from-futuristic-accent to-futuristic-cyan"
    },
    {
      id: 2,
      name: "System Optimization Suite",
      category: "Performance Tool",
      description: "Paket lengkap optimasi sistem untuk meningkatkan performa komputer dan laptop.",
      image: "/placeholder.svg?height=300&width=400&text=System+Optimization",
      features: ["Registry Cleaner", "Driver Updates", "Startup Manager", "Performance Boost"],
      price: "Mulai dari Rp 1.800.000",
      rating: 4.8,
      clients: 78,
      icon: Zap,
      color: "from-futuristic-cyan to-futuristic-accent"
    },
    {
      id: 3,
      name: "Security Hardware Kit",
      category: "Security Solution",
      description: "Solusi keamanan hardware untuk melindungi sistem dari ancaman digital.",
      image: "/placeholder.svg?height=300&width=400&text=Security+Kit",
      features: ["Firewall Setup", "VPN Configuration", "Encryption Tools", "Backup System"],
      price: "Mulai dari Rp 3.200.000",
      rating: 4.9,
      clients: 32,
      icon: Shield,
      color: "from-futuristic-accent to-futuristic-accent-hover"
    },
    {
      id: 4,
      name: "Network Setup Package",
      category: "Network Solution",
      description: "Paket setup jaringan lengkap untuk rumah dan kantor dengan konfigurasi optimal.",
      image: "/placeholder.svg?height=300&width=400&text=Network+Setup",
      features: ["Router Configuration", "WiFi Optimization", "Network Security", "Remote Access"],
      price: "Mulai dari Rp 1.500.000",
      rating: 4.7,
      clients: 56,
      icon: Globe,
      color: "from-futuristic-cyan to-futuristic-accent"
    },
    {
      id: 5,
      name: "Hardware Upgrade Kit",
      category: "Upgrade Solution",
      description: "Paket upgrade hardware untuk meningkatkan performa sistem sesuai kebutuhan.",
      image: "/placeholder.svg?height=300&width=400&text=Hardware+Upgrade",
      features: ["RAM Upgrade", "Storage Upgrade", "Graphics Card", "Cooling System"],
      price: "Mulai dari Rp 4.500.000",
      rating: 4.9,
      clients: 28,
      icon: Monitor,
      color: "from-futuristic-accent to-futuristic-cyan"
    },
    {
      id: 6,
      name: "Mobile Device Support",
      category: "Mobile Solution",
      description: "Layanan support dan optimasi untuk perangkat mobile dan tablet.",
      image: "/placeholder.svg?height=300&width=400&text=Mobile+Support",
      features: ["Device Optimization", "Battery Health", "Storage Management", "Security Setup"],
      price: "Mulai dari Rp 800.000",
      rating: 4.8,
      clients: 89,
      icon: Smartphone,
      color: "from-futuristic-accent-hover to-futuristic-accent"
    },
  ]

  return (
    <div className="min-h-screen bg-futuristic-primary">
      {/* Header */}
      <section className="relative py-20 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-futuristic-accent/10 via-futuristic-cyan/10 to-futuristic-accent-hover/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,90,240,0.1),transparent_50%)]"></div>
        <div className="container px-4 mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-futuristic-accent/30 bg-futuristic-accent/10 backdrop-blur-sm mb-6">
                <Cpu className="w-4 h-4 mr-2 text-futuristic-accent" />
                <span className="text-futuristic-text-primary text-sm font-semibold tracking-wide">Hardware Products</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-futuristic-text-primary">
                Produk <span className="bg-gradient-to-r from-futuristic-accent via-futuristic-cyan to-futuristic-accent-hover bg-clip-text text-transparent">Kami</span>
              </h1>
              <p className="text-xl text-futuristic-text-secondary max-w-3xl mx-auto leading-relaxed tracking-wide">
                Berbagai solusi hardware yang telah kami kembangkan untuk membantu sistem Anda berjalan optimal
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const IconComponent = product.icon
              return (
                <ScrollReveal key={product.id} direction="up" delay={index * 200}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-futuristic-secondary/90 backdrop-blur-sm border border-futuristic-border shadow-xl">
                    <div className="aspect-video overflow-hidden relative">
                      <div className="absolute inset-0 bg-futuristic-secondary/50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-20 h-20 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-10 w-10 text-futuristic-text-primary" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`bg-gradient-to-r ${product.color} text-futuristic-text-primary border-0`}>
                          {product.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-futuristic-text-secondary">{product.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl text-futuristic-text-primary tracking-wide group-hover:text-futuristic-accent transition-colors">{product.name}</CardTitle>
                      <CardDescription className="text-base text-futuristic-text-secondary tracking-wide">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-futuristic-text-secondary tracking-wide">Fitur Utama:</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.features.map((feature) => (
                            <Badge
                              key={feature}
                              variant="outline"
                              className="text-xs border-futuristic-border text-futuristic-text-secondary hover:border-futuristic-accent hover:text-futuristic-accent transition-colors"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-futuristic-text-secondary tracking-wide">
                        <span>{product.clients} klien menggunakan</span>
                      </div>

                      <div className="space-y-3">
                        <div className="text-lg font-bold text-futuristic-accent">{product.price}</div>
                        <div className="flex gap-2">
                          <Button
                            className={`flex-1 bg-gradient-to-r ${product.color} hover:opacity-90 text-futuristic-text-primary shadow-xl hover:shadow-futuristic-glow transition-all duration-300 font-semibold tracking-wide`}
                            asChild
                          >
                            <Link href="/booking">Pesan Sekarang</Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-futuristic-border text-futuristic-text-secondary hover:bg-futuristic-secondary/50 hover:text-futuristic-accent transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
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
              Butuh <span className="bg-gradient-to-r from-futuristic-accent to-futuristic-cyan bg-clip-text text-transparent">Solusi Hardware?</span>
            </h2>
            <p className="text-xl mb-8 text-futuristic-text-secondary max-w-2xl mx-auto tracking-wide">
              Konsultasikan kebutuhan hardware Anda dengan tim ahli kami.
              Dapatkan solusi terbaik untuk sistem Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-futuristic-accent via-futuristic-cyan to-futuristic-accent-hover hover:from-futuristic-accent/90 hover:via-futuristic-cyan/90 hover:to-futuristic-accent-hover/90 text-futuristic-text-primary shadow-xl hover:shadow-futuristic-glow transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
                asChild
              >
                <Link href="/booking">Konsultasi Gratis</Link>
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
