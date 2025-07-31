'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { toast } from "sonner"
import { Calendar, Clock, Phone, Mail, MessageSquare, ArrowRight, CheckCircle } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  price: string
  category: string
  status: 'active' | 'inactive'
}

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  })

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        const data = await response.json()
        setServices(data.services?.filter((service: Service) => service.status === 'active') || [])
      } catch (error) {
        console.error('Error fetching services:', error)
        toast.error('Gagal memuat layanan')
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Booking berhasil dibuat! Kami akan menghubungi Anda segera.')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          message: ''
        })

        // Redirect to WhatsApp if available
        if (data.whatsappLink) {
          window.open(data.whatsappLink, '_blank')
        }
      } else {
        toast.error(data.error || 'Gagal membuat booking')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('Terjadi kesalahan saat mengirim booking')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-futuristic-primary flex items-center justify-center">
        <div className="text-futuristic-text-primary text-xl">Memuat layanan...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-futuristic-primary">
      <div className="container mx-auto px-4 py-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-futuristic-accent/30 bg-futuristic-accent/10 backdrop-blur-sm mb-6">
              <Calendar className="w-4 h-4 text-futuristic-accent" />
              <span className="text-futuristic-text-primary text-sm font-semibold tracking-wide">Booking Layanan</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-futuristic-text-primary tracking-tight">Buat Booking</h1>
            <p className="text-xl text-futuristic-text-secondary max-w-2xl mx-auto leading-relaxed tracking-wide">
              Isi formulir di bawah ini untuk memesan layanan kami. Tim kami akan menghubungi Anda dalam waktu 24 jam.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <ScrollReveal direction="up" delay={200}>
            <Card className="bg-futuristic-secondary/50 border-futuristic-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-futuristic-text-primary text-2xl">Formulir Booking</CardTitle>
                <CardDescription className="text-futuristic-text-secondary">
                  Isi data lengkap untuk memudahkan kami menghubungi Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-futuristic-text-secondary mb-2">
                        Nama Lengkap *
                      </label>
                      <Input
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        className="bg-futuristic-secondary border-futuristic-border text-futuristic-text-primary"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-futuristic-text-secondary mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="contoh@email.com"
                        className="bg-futuristic-secondary border-futuristic-border text-futuristic-text-primary"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-futuristic-text-secondary mb-2">
                      Nomor Telepon *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+62 857-7710-1676"
                      className="bg-futuristic-secondary border-futuristic-border text-futuristic-text-primary"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-futuristic-text-secondary mb-2">
                      Pilih Layanan *
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleInputChange('service', value)}
                      required
                    >
                      <SelectTrigger className="bg-futuristic-secondary border-futuristic-border text-futuristic-text-primary">
                        <SelectValue placeholder="Pilih layanan yang diinginkan" />
                      </SelectTrigger>
                      <SelectContent className="bg-futuristic-secondary border-futuristic-border">
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-futuristic-text-secondary mb-2">
                      Tanggal yang Diinginkan *
                    </label>
                    <Input
                      type="date"
                      className="bg-futuristic-secondary border-futuristic-border text-futuristic-text-primary"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-futuristic-text-secondary mb-2">
                      Pesan Tambahan
                    </label>
                    <Textarea
                      placeholder="Jelaskan detail kebutuhan atau pertanyaan Anda..."
                      className="bg-futuristic-secondary border-futuristic-border text-futuristic-text-primary min-h-[100px]"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-futuristic-accent to-futuristic-cyan hover:from-futuristic-accent-hover hover:to-futuristic-cyan text-futuristic-text-primary shadow-lg hover:shadow-futuristic-glow transition-all duration-300 transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-futuristic-text-primary mr-2"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Booking
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Info Section */}
          <ScrollReveal direction="up" delay={400}>
            <div className="space-y-6">
              {/* Process Steps */}
              <Card className="bg-futuristic-secondary/50 border-futuristic-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-futuristic-text-primary">Proses Booking</CardTitle>
                  <CardDescription className="text-futuristic-text-secondary">
                    Langkah-langkah setelah Anda mengirim booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-futuristic-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-futuristic-text-primary font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="text-futuristic-text-primary font-semibold mb-1">Kirim Booking</h4>
                        <p className="text-futuristic-text-secondary text-sm">Isi formulir booking dengan data lengkap</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-futuristic-cyan rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-futuristic-text-primary font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="text-futuristic-text-primary font-semibold mb-1">Konfirmasi Tim</h4>
                        <p className="text-futuristic-text-secondary text-sm">Tim kami akan menghubungi dalam 24 jam</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-futuristic-accent-hover rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-futuristic-text-primary font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="text-futuristic-text-primary font-semibold mb-1">Jadwal Layanan</h4>
                        <p className="text-futuristic-text-secondary text-sm">Penjadwalan dan pelaksanaan layanan</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-futuristic-secondary/50 border-futuristic-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-futuristic-text-primary">Informasi Kontak</CardTitle>
                  <CardDescription className="text-futuristic-text-secondary">
                    Hubungi kami jika ada pertanyaan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-futuristic-accent" />
                      <div>
                        <p className="text-futuristic-text-primary font-medium">Telepon</p>
                        <p className="text-futuristic-text-secondary text-sm">+62 857-7710-1676</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-futuristic-cyan" />
                      <div>
                        <p className="text-futuristic-text-primary font-medium">Email</p>
                        <p className="text-futuristic-text-secondary text-sm">services@palugada.biz.id</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-futuristic-accent-hover" />
                      <div>
                        <p className="text-futuristic-text-primary font-medium">WhatsApp</p>
                        <p className="text-futuristic-text-secondary text-sm">+62 857-7710-1676</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="bg-gradient-to-r from-futuristic-accent/10 to-futuristic-cyan/10 border-futuristic-accent/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-futuristic-text-primary">Keuntungan Booking Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-futuristic-text-secondary text-sm">Booking 24/7 tanpa batas waktu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-futuristic-text-secondary text-sm">Konfirmasi cepat via email & WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-futuristic-text-secondary text-sm">Jadwal fleksibel sesuai kebutuhan</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-futuristic-text-secondary text-sm">Garansi layanan 30 hari</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
