"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  Calendar,
  Shield,
  Users,
  Zap,
} from "lucide-react";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setWhatsappUrl(result.whatsappUrl);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          description: "",
        });
      } else {
        alert("Gagal mengirim booking. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleEmailRedirect = () => {
    const emailSubject = encodeURIComponent(
      `Booking Hardware Konsultasi - ${formData.service}`
    );
    const emailBody = encodeURIComponent(`Halo Palugada Digital,

Saya ingin booking konsultasi hardware dengan detail:

Nama: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Perusahaan: ${formData.company || "Tidak disebutkan"}
Layanan: ${formData.service}

Deskripsi Project Hardware:
${formData.description}

Mohon informasi lebih lanjut. Terima kasih!`);

    window.open(
      `mailto:hello@palugadadigital.com?subject=${emailSubject}&body=${emailBody}`,
      "_self"
    );
  };

  const benefits = [
    {
      icon: Shield,
      title: "Konsultasi Gratis",
      description: "Konsultasi awal hardware gratis tanpa komitmen",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Tim Ahli",
      description: "Tim teknisi hardware berpengalaman",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Respon Cepat",
      description: "Respon dalam 1 jam untuk setiap pertanyaan",
      color: "from-purple-500 to-cyan-500"
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
                <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-semibold tracking-wide">Book Consultation</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                Booking <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Konsultasi</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed tracking-wide">
                Konsultasikan kebutuhan hardware Anda dengan tim ahli kami. Gratis dan tanpa komitmen!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-800/30">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <ScrollReveal key={index} direction="up" delay={index * 200}>
                  <Card className="text-center bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-white tracking-wide">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-300 tracking-wide">{benefit.description}</CardDescription>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <div className="container px-4 mx-auto py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <ScrollReveal direction="left">
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white tracking-wide">
                    <MessageCircle className="h-5 w-5 text-cyan-400" />
                    Hubungi Kami
                  </CardTitle>
                  <CardDescription className="text-slate-300 tracking-wide">
                    Tim hardware kami siap membantu Anda 24/7
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-cyan-400" />
                    <div>
                      <div className="font-medium text-white tracking-wide">WhatsApp</div>
                      <div className="text-sm text-slate-300 tracking-wide">
                        +62 812-3456-7890
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-cyan-400" />
                    <div>
                      <div className="font-medium text-white tracking-wide">Email</div>
                      <div className="text-sm text-slate-300 tracking-wide">
                        hello@palugadadigital.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                    <div>
                      <div className="font-medium text-white tracking-wide">Alamat</div>
                      <div className="text-sm text-slate-300 tracking-wide">
                        Jalan Pisang Batu Kerta Mukti
                      </div>
                      <div className="text-sm text-slate-300 tracking-wide">
                        Cibitung, Kabupaten Bekasi
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <div>
                      <div className="font-medium text-white tracking-wide">
                        Jam Operasional
                      </div>
                      <div className="text-sm text-slate-300 tracking-wide">
                        Senin - Jumat: 09:00 - 18:00
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="right">
              {isSubmitted ? (
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-6">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white tracking-wide">
                          Booking Hardware Berhasil Dikirim!
                        </h3>
                        <p className="text-slate-300 mt-2 tracking-wide">
                          Terima kasih telah booking konsultasi hardware. Pilih cara
                          untuk melanjutkan komunikasi:
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={handleWhatsAppRedirect}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500/90 hover:to-green-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold tracking-wide"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Lanjut ke WhatsApp
                        </Button>
                        <Button
                          onClick={handleEmailRedirect}
                          variant="outline"
                          className="border-slate-600 text-white hover:bg-slate-700/50 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold tracking-wide"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Kirim via Email
                        </Button>
                      </div>

                      <Button
                        onClick={() => {
                          setIsSubmitted(false);
                          setWhatsappUrl("");
                        }}
                        variant="ghost"
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        Booking Lain
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white tracking-wide">
                      Form Konsultasi Hardware
                    </CardTitle>
                    <CardDescription className="text-slate-300 tracking-wide">
                      Isi form di bawah ini untuk memulai konsultasi hardware gratis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white tracking-wide">
                            Nama Lengkap *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white tracking-wide">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white tracking-wide">
                            No. WhatsApp *
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            placeholder=""
                            className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-white tracking-wide">
                            Nama Perusahaan
                          </Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                company: e.target.value,
                              }))
                            }
                            className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-white tracking-wide">
                          Layanan Hardware yang Dibutuhkan
                        </Label>
                        <Input
                          id="service"
                          value={formData.service}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              service: e.target.value,
                            }))
                          }
                          placeholder="OS Installation, Software Setup, Hardware Upgrade, Tech Support, dll"
                          className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-white tracking-wide">
                          Deskripsi Project Hardware *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Jelaskan detail project hardware yang Anda inginkan..."
                          rows={4}
                          className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                          required
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-500/90 hover:via-blue-600/90 hover:to-purple-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold tracking-wide"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Mengirim..."
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Kirim Booking
                            </>
                          )}
                        </Button>

                        <Button
                          type="button"
                          onClick={handleEmailRedirect}
                          variant="outline"
                          className="border-slate-600 text-white hover:bg-slate-700/50 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold tracking-wide"
                          size="lg"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Email Langsung
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
