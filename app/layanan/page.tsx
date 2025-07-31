import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";
import {
  Monitor,
  Settings,
  Headphones,
  Palette,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Zap,
  Wrench,
  Cpu,
} from "lucide-react";

export default function LayananPage() {
  const services = [
    {
      id: "os-installation",
      icon: Monitor,
      title: "OS Installation",
      description:
        "Instalasi sistem operasi Windows, macOS, dan Linux dengan konfigurasi optimal untuk kebutuhan bisnis Anda.",
      features: [
        "Windows 10/11 Installation",
        "macOS Setup & Configuration",
        "Linux Distribution Setup",
        "Driver Installation",
        "System Optimization",
        "Security Configuration",
      ],
      startingPrice: "Rp 500.000",
      duration: "1-2 hari",
      popular: false,
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: "software-setup",
      icon: Settings,
      title: "Software Setup",
      description:
        "Setup dan konfigurasi software aplikasi sesuai kebutuhan bisnis dengan training dan dokumentasi lengkap.",
      features: [
        "Business Software Installation",
        "Application Configuration",
        "User Account Setup",
        "Training & Documentation",
        "License Management",
        "Performance Optimization",
      ],
      startingPrice: "Rp 300.000",
      duration: "1 hari",
      popular: true,
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "tech-support",
      icon: Headphones,
      title: "Tech Support",
      description:
        "Dukungan teknis 24/7 untuk troubleshooting, maintenance sistem, dan konsultasi teknologi.",
      features: [
        "24/7 Technical Support",
        "Remote Troubleshooting",
        "System Maintenance",
        "Hardware Diagnostics",
        "Network Configuration",
        "Data Recovery Services",
      ],
      startingPrice: "Rp 200.000/jam",
      duration: "On-demand",
      popular: false,
      color: "from-purple-500 to-cyan-500"
    },
    {
      id: "hardware-upgrade",
      icon: Cpu,
      title: "Hardware Upgrade",
      description:
        "Upgrade dan optimasi hardware untuk meningkatkan performa sistem sesuai kebutuhan Anda.",
      features: [
        "RAM & Storage Upgrade",
        "Graphics Card Installation",
        "Processor Upgrade",
        "Cooling System Setup",
        "Power Supply Upgrade",
        "Performance Testing",
      ],
      startingPrice: "Rp 400.000",
      duration: "1-3 hari",
      popular: false,
      color: "from-cyan-500 to-purple-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <section className="relative py-20 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="container px-4 mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6">
                <Wrench className="w-4 h-4 mr-2 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-semibold tracking-wide">Hardware Services</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                Layanan <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Kami</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed tracking-wide">
                Solusi hardware komprehensif untuk mendukung operasional bisnis Anda dengan layanan profesional
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} direction="up" delay={index * 200}>
                <Card
                  className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-sm border-0 ${
                    service.popular ? "ring-2 ring-cyan-500" : ""
                  }`}
                >
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
                      Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white tracking-wide">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base text-slate-300 tracking-wide">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                          <span className="text-sm text-slate-300 tracking-wide">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-600">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400 tracking-wide">
                          Mulai dari:
                        </span>
                        <span className="font-bold text-cyan-400">
                          {service.startingPrice}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400 tracking-wide">
                          Durasi:
                        </span>
                        <span className="font-medium text-slate-300 tracking-wide">
                          {service.duration}
                        </span>
                      </div>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold tracking-wide`}
                      asChild
                    >
                      <Link href={`/booking?service=${service.id}`}>
                        Pesan Layanan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="container px-4 mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Mengapa Memilih <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Layanan Kami?</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto tracking-wide">
                Komitmen kami untuk memberikan layanan hardware terbaik dengan standar profesional
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Teknisi Bersertifikat",
                description:
                  "Tim teknisi kami memiliki sertifikasi internasional dan pengalaman bertahun-tahun dalam hardware",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: Clock,
                title: "Support 24/7",
                description:
                  "Dukungan teknis tersedia 24 jam sehari, 7 hari seminggu untuk kebutuhan hardware mendesak",
                gradient: "from-blue-500 to-purple-500",
              },
              {
                icon: Shield,
                title: "Garansi Layanan",
                description:
                  "Semua layanan hardware dilengkapi garansi dan after-sales support untuk kepuasan Anda",
                gradient: "from-purple-500 to-cyan-500",
              },
            ].map((item, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 200}>
                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div
                      className={`mx-auto w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white tracking-wide">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-300 tracking-wide">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="container px-4 mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Butuh Bantuan <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Hardware?</span>
            </h2>
            <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto tracking-wide">
              Konsultasikan kebutuhan hardware Anda dengan tim ahli kami.
              Dapatkan solusi terbaik untuk sistem Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-500/90 hover:via-blue-600/90 hover:to-purple-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
                asChild
              >
                <Link href="/booking">Konsultasi Gratis</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-slate-600 hover:bg-slate-700/50 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
                asChild
              >
                <Link href="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
