import { NextRequest, NextResponse } from 'next/server'

// Mock database untuk testimonials
let testimonials = [
  {
    id: '1',
    customerName: 'Alice Johnson',
    rating: 5,
    comment: 'Excellent service! Very professional and quick response. Tim sangat ramah dan membantu.',
    service: 'OS Installation',
    status: 'approved',
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    customerName: 'Bob Wilson',
    rating: 4,
    comment: 'Good service, but could be faster. Overall sangat puas dengan hasilnya.',
    service: 'Tech Support',
    status: 'pending',
    createdAt: '2024-01-25'
  },
  {
    id: '3',
    customerName: 'Sarah Davis',
    rating: 5,
    comment: 'Pelayanan sangat memuaskan! Setup software berjalan lancar dan cepat.',
    service: 'Software Setup',
    status: 'approved',
    createdAt: '2024-01-30'
  }
]

export async function GET() {
  try {
    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data testimonial' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, rating, comment, service } = body

    // Validasi input
    if (!customerName || !rating || !comment || !service) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    // Validasi rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating harus antara 1-5' },
        { status: 400 }
      )
    }

    // Buat testimonial baru
    const newTestimonial = {
      id: Date.now().toString(),
      customerName,
      rating: parseInt(rating),
      comment,
      service,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }

    // Tambahkan ke array testimonials
    testimonials.push(newTestimonial)

    return NextResponse.json({
      success: true,
      message: 'Testimonial berhasil ditambahkan',
      testimonial: newTestimonial
    })

  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menambah testimonial' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, customerName, rating, comment, service, status } = body

    // Validasi input
    if (!id) {
      return NextResponse.json(
        { error: 'ID testimonial wajib diisi' },
        { status: 400 }
      )
    }

    // Cari testimonial berdasarkan ID
    const testimonialIndex = testimonials.findIndex(testimonial => testimonial.id === id)
    
    if (testimonialIndex === -1) {
      return NextResponse.json(
        { error: 'Testimonial tidak ditemukan' },
        { status: 404 }
      )
    }

    // Update testimonial
    testimonials[testimonialIndex] = {
      ...testimonials[testimonialIndex],
      customerName: customerName || testimonials[testimonialIndex].customerName,
      rating: rating ? parseInt(rating) : testimonials[testimonialIndex].rating,
      comment: comment || testimonials[testimonialIndex].comment,
      service: service || testimonials[testimonialIndex].service,
      status: status || testimonials[testimonialIndex].status
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonial berhasil diperbarui',
      testimonial: testimonials[testimonialIndex]
    })

  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui testimonial' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID testimonial wajib diisi' },
        { status: 400 }
      )
    }

    // Cari testimonial berdasarkan ID
    const testimonialIndex = testimonials.findIndex(testimonial => testimonial.id === id)
    
    if (testimonialIndex === -1) {
      return NextResponse.json(
        { error: 'Testimonial tidak ditemukan' },
        { status: 404 }
      )
    }

    // Hapus testimonial
    const deletedTestimonial = testimonials.splice(testimonialIndex, 1)[0]

    return NextResponse.json({
      success: true,
      message: 'Testimonial berhasil dihapus',
      testimonial: deletedTestimonial
    })

  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus testimonial' },
      { status: 500 }
    )
  }
} 