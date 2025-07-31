import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Konfigurasi email transporter dengan error handling
let transporter: any = null

try {
  transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'test@example.com',
      pass: process.env.EMAIL_PASS || 'test-password',
    },
  })
} catch (error) {
  console.error('Error creating transporter:', error)
}

// Fungsi untuk mengirim email
async function sendEmail(bookingData: any) {
  if (!transporter) {
    console.log('Email transporter not configured, skipping email send')
    return false
  }

  const { name, email, service, date, message, phone } = bookingData

  const mailOptions = {
    from: process.env.EMAIL_USER || 'test@example.com',
    to: process.env.ADMIN_EMAIL || 'services@palugada.biz.id',
    subject: `Booking Baru - ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #06b6d4;">Booking Baru dari Website</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Detail Booking:</h3>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telepon:</strong> ${phone}</p>
          <p><strong>Layanan:</strong> ${service}</p>
          <p><strong>Tanggal:</strong> ${date}</p>
          <p><strong>Pesan:</strong> ${message || 'Tidak ada pesan tambahan'}</p>
        </div>
        <p style="color: #666; font-size: 14px;">
          Booking ini dibuat pada: ${new Date().toLocaleString('id-ID')}
        </p>
      </div>
    `,
  }

  const customerMailOptions = {
    from: process.env.EMAIL_USER || 'test@example.com',
    to: email,
    subject: `Konfirmasi Booking - ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #06b6d4;">Terima Kasih atas Booking Anda!</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Detail Booking Anda:</h3>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Layanan:</strong> ${service}</p>
          <p><strong>Tanggal:</strong> ${date}</p>
          <p><strong>Pesan:</strong> ${message || 'Tidak ada pesan tambahan'}</p>
        </div>
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #1976d2;">
            <strong>Status:</strong> Menunggu konfirmasi dari tim kami
          </p>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
            Tim kami akan menghubungi Anda dalam waktu 24 jam untuk konfirmasi lebih lanjut.
          </p>
        </div>
        <p style="color: #666; font-size: 14px;">
          Jika ada pertanyaan, silakan hubungi kami di: ${process.env.ADMIN_PHONE || '+62 857-7710-1676'}
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    await transporter.sendMail(customerMailOptions)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Fungsi untuk membuat link WhatsApp
function createWhatsAppLink(bookingData: any) {
  const { name, service, date, message, phone } = bookingData
  const adminPhone = process.env.ADMIN_PHONE || '6285777101676'
  
  const text = `Halo! Ada booking baru dari website:

Nama: ${name}
Layanan: ${service}
Tanggal: ${date}
Pesan: ${message || 'Tidak ada pesan tambahan'}

Silakan cek dashboard admin untuk detail lengkap.`

  return `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, date, message, phone } = body

    // Validasi input
    if (!name || !email || !service || !date || !phone) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    // Simpan booking ke database (mock data untuk sementara)
    const bookingId = Date.now().toString()
    const booking = {
      id: bookingId,
      name,
      email,
      service,
      date,
      message,
      phone,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    // Kirim email
    const emailSent = await sendEmail(booking)
    
    // Buat link WhatsApp
    const whatsappLink = createWhatsAppLink(booking)

    return NextResponse.json({
      success: true,
      message: 'Booking berhasil dibuat',
      bookingId,
      whatsappLink,
      emailSent,
      booking
    })

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Mock data untuk demo
    const bookings = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        service: 'OS Installation',
        date: '2024-02-15',
        message: 'Need Windows 11 installation',
        phone: '+6285777101676',
        status: 'confirmed',
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        service: 'Software Setup',
        date: '2024-02-20',
        message: 'Office suite installation required',
        phone: '+6285777101676',
        status: 'pending',
        createdAt: '2024-01-20T14:30:00Z'
      }
    ]

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data booking' },
      { status: 500 }
    )
  }
}
