"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Send, MessageCircle, Mail } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setWhatsappUrl(result.whatsappUrl)
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        alert("Gagal mengirim pesan. Silakan coba lagi.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppRedirect = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank")
    }
  }

  const handleEmailRedirect = () => {
    const emailSubject = encodeURIComponent(`${formData.subject || "Inquiry dari Website"}`)
    const emailBody = encodeURIComponent(`Halo Palugada Digital,

${formData.message}

Salam,
${formData.name}
${formData.phone}`)

    window.open(`mailto:services@palugada.biz.id?subject=${emailSubject}&body=${emailBody}`, "_self")
  }

  if (isSubmitted) {
    return (
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1E3A8A]">Pesan Berhasil Dikirim!</h3>
              <p className="text-[#1E3A8A]/70 mt-2">
                Terima kasih telah menghubungi kami. Pilih cara untuk melanjutkan komunikasi:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleWhatsAppRedirect} className="bg-green-600 hover:bg-green-700 text-white">
                <MessageCircle className="mr-2 h-4 w-4" />
                Lanjut ke WhatsApp
              </Button>
              <Button
                onClick={handleEmailRedirect}
                variant="outline"
                className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" />
                Kirim via Email
              </Button>
            </div>

            <Button
              onClick={() => {
                setIsSubmitted(false)
                setWhatsappUrl("")
              }}
              variant="ghost"
              className="text-[#1E3A8A]/70 hover:text-[#1E3A8A]"
            >
              Kirim Pesan Lain
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#1E3A8A]">Kirim Pesan</CardTitle>
        <CardDescription className="text-[#1E3A8A]/70">
          Isi form di bawah ini dan kami akan merespons dalam 24 jam
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1E3A8A]">
                Nama Lengkap *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1E3A8A]">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#1E3A8A]">
                No. WhatsApp *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder=""
                className="border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-[#1E3A8A]">
                Subjek *
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Konsultasi Project"
                className="border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#1E3A8A]">
              Pesan *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Jelaskan kebutuhan atau pertanyaan Anda..."
              rows={5}
              className="border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E3A8A]/90 hover:to-[#3B82F6]/90 text-white shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Mengirim..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Kirim Pesan
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleEmailRedirect}
              variant="outline"
              className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white bg-transparent"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Langsung
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
