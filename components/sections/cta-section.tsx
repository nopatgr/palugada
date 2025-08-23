'use client'

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import Link from "next/link"
import { ArrowRight, Phone, Mail, MessageSquare } from "lucide-react"

export function CTASection() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telepon",
      description: "+62 812-3456-7890",
      action: "Call Now",
      href: "tel:+6281234567890",
      color: "text-indigo-500"
    },
    {
      icon: Mail,
      title: "Email",
      description: "info@palugada-digital.com",
      action: "Send Email",
      href: "mailto:info@palugada-digital.com",
      color: "text-indigo-500"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Konsultasi via WhatsApp",
      action: "Chat Now",
      href: "https://wa.me/6281234567890",
      color: "text-indigo-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-700">
                Siap <span className="text-indigo-500">Mengoptimalkan</span> Sistem Hardware Anda?
              </h2>
              
              <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Tim ahli kami siap membantu Anda mendapatkan performa optimal dari sistem hardware. 
                Dapatkan konsultasi gratis dan solusi terbaik untuk kebutuhan Anda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg px-6 py-3 hover:from-indigo-600 hover:to-blue-700 focus:ring-2 focus:ring-indigo-500 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/booking" className="flex items-center">
                    Mulai Konsultasi
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300"
                  asChild
                >
                  <Link href="/layanan">Lihat Layanan</Link>
                </Button>
              </div>

              <div className="text-sm text-slate-500">
                <p>✓ Konsultasi Gratis</p>
                <p>✓ Garansi 100%</p>
                <p>✓ Support 24/7</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-xl flex items-center justify-center">
                        <IconComponent className={`h-6 w-6 ${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-700 mb-1">{method.title}</h3>
                        <p className="text-slate-500 text-sm mb-2">{method.description}</p>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg px-3 py-1 hover:from-indigo-600 hover:to-blue-700 focus:ring-2 focus:ring-indigo-500 text-xs shadow-md hover:shadow-lg transition-all duration-300"
                          asChild
                        >
                          <Link href={method.href}>{method.action}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
