"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "@/components/ui/contact-form";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Headphones,
  Users,
  Building,
  ChevronDown,
  MessageSquare,
  Clock,
  Shield,
} from "lucide-react";

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const contactMethods = [
    {
      icon: Phone,
      title: "Telepon",
      description: "Hubungi kami langsung",
      value: "+62 857-7710-1676",
      action: "tel:+6285777101676",
      available: "24/7",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat langsung dengan tim",
      value: "+62 857-7710-1676",
      action: "https://wa.me/6285777101676",
      available: "24/7",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Kirim email ke kami",
      value: "services@palugada.biz.id",
      action: "mailto:services@palugada.biz.id",
      available: "Respon dalam 24 jam",
      color: "from-sky-400 to-sky-600",
    },
  ];

  const faqs = [
    {
      question: "Berapa lama waktu pengerjaan hardware?",
      answer:
        "Waktu pengerjaan bervariasi tergantung kompleksitas hardware. Instalasi OS 1-2 hari, setup software 1 hari, upgrade hardware 1-3 hari, support sesuai kebutuhan.",
    },
    {
      question: "Apakah ada garansi untuk layanan hardware?",
      answer:
        "Ya, kami memberikan garansi 6 bulan untuk instalasi dan setup, 1 tahun untuk upgrade hardware, dan 3 bulan untuk maintenance.",
    },
    {
      question: "Bagaimana sistem pembayaran?",
      answer:
        "Pembayaran dapat dilakukan secara bertahap: 50% DP, 50% setelah selesai. Untuk project besar bisa dicicil sesuai kesepakatan.",
    },
    {
      question: "Apakah bisa konsultasi hardware gratis?",
      answer:
        "Ya, konsultasi awal hardware gratis untuk membahas kebutuhan dan scope project Anda. Kami akan memberikan rekomendasi terbaik.",
    },
    {
      question: "Apakah melayani area luar Bekasi?",
      answer:
        "Ya, kami melayani seluruh area Jabodetabek dan sekitarnya. Untuk area luar, akan ada biaya transportasi tambahan yang terjangkau.",
    },
    {
      question: "Bagaimana cara booking layanan hardware?",
      answer:
        "Anda bisa booking melalui WhatsApp, telepon, atau mengisi form di halaman booking kami. Tim kami akan merespon dalam 1 jam.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-futuristic-accent/10 via-futuristic-cyan/10 to-futuristic-accent-hover/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,90,240,0.1),transparent_50%)]"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-futuristic-accent/30 bg-futuristic-accent/10 backdrop-blur-sm mb-6">
              <MessageSquare className="w-4 h-4 mr-2 text-futuristic-accent" />
              <span className="text-futuristic-text-primary text-sm font-semibold tracking-wide">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-futuristic-text-primary">
              Hubungi{" "}
              <span className="bg-gradient-to-r from-futuristic-accent via-futuristic-cyan to-futuristic-accent-hover bg-clip-text text-transparent">
                Kami
              </span>
            </h1>
            <p className="text-xl text-futuristic-text-secondary max-w-3xl mx-auto leading-relaxed tracking-wide">
              Siap membantu mewujudkan kebutuhan hardware Anda. Hubungi tim ahli
              kami sekarang juga!
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 mx-auto py-16">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-futuristic-text-primary">
              Cara Menghubungi{" "}
              <span className="bg-gradient-to-r from-futuristic-accent to-futuristic-cyan bg-clip-text text-transparent">
                Kami
              </span>
            </h2>
            <p className="text-futuristic-text-secondary max-w-2xl mx-auto tracking-wide">
              Pilih cara yang paling nyaman untuk Anda berkomunikasi dengan tim
              hardware kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-futuristic-secondary/50 border-futuristic-border backdrop-blur-sm shadow-xl"
              >
                <CardHeader>
                  <div
                    className={`mx-auto w-16 h-16 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon className="h-8 w-8 text-futuristic-text-primary" />
                  </div>
                  <CardTitle className="text-lg text-futuristic-text-primary tracking-wide group-hover:text-futuristic-accent transition-colors">
                    {method.title}
                  </CardTitle>
                  <CardDescription className="text-futuristic-text-secondary tracking-wide">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2 text-blue-400 to-blue-600">
                    {method.value}
                  </p>
                  <p className="text-sm text-futuristic-text-secondary mb-4 tracking-wide">
                    {method.available}
                  </p>
                  <Button
                    className={`w-full bg-gradient-to-r ${method.color} hover:opacity-90 text-futuristic-text-primary shadow-xl hover:shadow-futuristic-glow transition-all duration-300 font-semibold tracking-wide`}
                    asChild
                  >
                    <a
                      href={method.action}
                      target={
                        method.action.startsWith("http") ? "_blank" : "_self"
                      }
                    >
                      Hubungi Sekarang
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            {/* Office Location */}
            <Card className="bg-futuristic-secondary/90 backdrop-blur-sm border border-futuristic-border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-futuristic-text-primary tracking-wide">
                  <MapPin className="h-5 w-5 text-blue-400 to-blue-600" />
                  Lokasi Kantor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-futuristic-text-primary tracking-wide">
                    Bekasi
                  </h4>
                  <p className="text-sm text-futuristic-text-secondary mt-1 tracking-wide">
                    Jalan Pisang Batu Kerta Mukti
                  </p>
                  <p className="text-sm text-futuristic-text-secondary tracking-wide">
                    Cibitung, Kabupaten Bekasi
                  </p>
                  <p className="text-sm text-blue-400 to-blue-600 mt-2 tracking-wide">
                    +62 857-7710-1676
                  </p>
                  <p className="text-sm text-blue-400 to-blue-600 tracking-wide">
                    services@palugada.biz.id
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-futuristic-text-secondary" />
                    <p className="text-xs text-futuristic-text-secondary tracking-wide">
                      Senin - Jumat: 09:00 - 18:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Card className="bg-futuristic-secondary/90 backdrop-blur-sm border border-futuristic-border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-futuristic-text-primary tracking-wide">
                  <Shield className="h-5 w-5 text-blue-400 to-blue-600" />
                  Support Hardware
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-futuristic-accent to-futuristic-cyan rounded-lg flex items-center justify-center">
                      <Headphones className="h-4 w-4 text-futuristic-text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-futuristic-text-primary tracking-wide">
                        Technical Support
                      </h4>
                      <p className="text-xs text-futuristic-text-secondary tracking-wide">
                        24/7 Hardware Support
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-futuristic-cyan to-futuristic-accent rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-futuristic-text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-futuristic-text-primary tracking-wide">
                        Sales & Consultation
                      </h4>
                      <p className="text-xs text-futuristic-text-secondary tracking-wide">
                        Hardware Solutions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-futuristic-accent to-futuristic-accent-hover rounded-lg flex items-center justify-center">
                      <Building className="h-4 w-4 text-futuristic-text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-futuristic-text-primary tracking-wide">
                        Partnership
                      </h4>
                      <p className="text-xs text-futuristic-text-secondary tracking-wide">
                        Business Collaboration
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section with Accordion */}
        <section id="faq" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-futuristic-text-primary">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-futuristic-accent to-futuristic-cyan bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-futuristic-text-secondary max-w-2xl mx-auto tracking-wide">
              Pertanyaan yang sering diajukan oleh klien hardware kami
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-futuristic-secondary/90 backdrop-blur-sm border border-futuristic-border shadow-xl overflow-hidden group"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 hover:bg-futuristic-secondary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-futuristic-accent/20"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-futuristic-text-primary tracking-wide pr-4 group-hover:text-blue-400 to-blue-600 transition-colors">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-blue-400 to-blue-600 transition-transform duration-300 flex-shrink-0 ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-futuristic-border pt-4">
                      <p className="text-futuristic-text-secondary leading-relaxed tracking-wide">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section>
          <Card className="bg-futuristic-secondary/90 backdrop-blur-sm border border-futuristic-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-futuristic-text-primary tracking-wide">
                Lokasi Kami
              </CardTitle>
              <CardDescription className="text-futuristic-text-secondary tracking-wide">
                Kunjungi kantor kami di Bekasi untuk konsultasi hardware
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2924875595613!2d107.1161406!3d-6.2251125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6985efb313f739%3A0xa1fcdc6862b0a72f!2sQ4F8%2BXF2%2C%20Kertamukti%2C%20Kec.%20Cibitung%2C%20Kabupaten%20Bekasi%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1755926277573!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-futuristic-secondary/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-futuristic-text-primary">
            Siap Memulai{" "}
            <span className="bg-gradient-to-r from-futuristic-accent to-futuristic-cyan bg-clip-text text-transparent">
              Project Hardware
            </span>{" "}
            Anda?
          </h2>
          <p className="text-xl mb-8 text-futuristic-text-secondary max-w-2xl mx-auto tracking-wide">
            Jangan ragu untuk menghubungi kami. Tim ahli hardware kami siap
            membantu mewujudkan kebutuhan teknologi Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:shadow-green-500/30 transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
              asChild
            >
              <a
                href="https://wa.me/6285777101676"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-futuristic-text-primary border-futuristic-border hover:bg-futuristic-secondary/50 bg-futuristic-secondary/50 backdrop-blur-sm shadow-xl hover:shadow-futuristic-glow transition-all duration-300 px-8 py-3 font-semibold tracking-wide"
              asChild
            >
              <a href="tel:+6285777101676">
                <Phone className="mr-2 h-4 w-4" />
                Telepon Sekarang
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
