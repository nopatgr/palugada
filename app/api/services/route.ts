import { NextRequest, NextResponse } from 'next/server'

// Mock database untuk services
let services = [
  {
    id: '1',
    title: 'OS Installation',
    description: 'Instalasi sistem operasi Windows, macOS, dan Linux dengan konfigurasi optimal untuk performa maksimal',
    image: '/images/software-development.jpeg',
    gradient: 'from-cyan-500 to-blue-500',
    popular: true,
    features: ['Windows 10/11', 'macOS', 'Linux Ubuntu', 'Driver Installation'],
    price: 'Mulai Rp 150K',
    category: 'Software',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Software Setup',
    description: 'Setup dan konfigurasi software aplikasi sesuai kebutuhan bisnis Anda dengan dukungan teknis lengkap',
    image: '/images/computer-repair.jpeg',
    gradient: 'from-blue-500 to-purple-500',
    features: ['Office Suite', 'Design Software', 'Development Tools', 'Security Software'],
    popular: true,
    price: 'Mulai Rp 200K',
    category: 'Software',
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Tech Support',
    description: 'Dukungan teknis 24/7 untuk troubleshooting dan maintenance sistem dengan response time cepat',
    image: '/images/tech-support.jpeg',
    gradient: 'from-purple-500 to-cyan-500',
    features: ['Remote Support', 'On-site Service', 'Preventive Maintenance', 'Emergency Response'],
    price: 'Mulai Rp 100K/jam',
    category: 'Support',
    status: 'active',
    createdAt: '2024-01-05'
  }
]

export async function GET() {
  try {
    return NextResponse.json({ services })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data layanan' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image, gradient, features, price, category } = body

    // Validasi input
    if (!title || !description || !price || !category) {
      return NextResponse.json(
        { error: 'Title, description, price, dan category wajib diisi' },
        { status: 400 }
      )
    }

    // Buat service baru
    const newService = {
      id: Date.now().toString(),
      title,
      description,
      image: image || '/images/placeholder.jpg',
      gradient: gradient || 'from-cyan-500 to-blue-500',
      features: features || [],
      price,
      category,
      popular: false,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    }

    // Tambahkan ke array services
    services.push(newService)

    return NextResponse.json({
      success: true,
      message: 'Layanan berhasil ditambahkan',
      service: newService
    })

  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menambah layanan' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, image, gradient, features, price, category, status } = body

    // Validasi input
    if (!id) {
      return NextResponse.json(
        { error: 'ID layanan wajib diisi' },
        { status: 400 }
      )
    }

    // Cari service berdasarkan ID
    const serviceIndex = services.findIndex(service => service.id === id)
    
    if (serviceIndex === -1) {
      return NextResponse.json(
        { error: 'Layanan tidak ditemukan' },
        { status: 404 }
      )
    }

    // Update service
    services[serviceIndex] = {
      ...services[serviceIndex],
      title: title || services[serviceIndex].title,
      description: description || services[serviceIndex].description,
      image: image || services[serviceIndex].image,
      gradient: gradient || services[serviceIndex].gradient,
      features: features || services[serviceIndex].features,
      price: price || services[serviceIndex].price,
      category: category || services[serviceIndex].category,
      status: status || services[serviceIndex].status
    }

    return NextResponse.json({
      success: true,
      message: 'Layanan berhasil diperbarui',
      service: services[serviceIndex]
    })

  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui layanan' },
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
        { error: 'ID layanan wajib diisi' },
        { status: 400 }
      )
    }

    // Cari service berdasarkan ID
    const serviceIndex = services.findIndex(service => service.id === id)
    
    if (serviceIndex === -1) {
      return NextResponse.json(
        { error: 'Layanan tidak ditemukan' },
        { status: 404 }
      )
    }

    // Hapus service
    const deletedService = services.splice(serviceIndex, 1)[0]

    return NextResponse.json({
      success: true,
      message: 'Layanan berhasil dihapus',
      service: deletedService
    })

  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus layanan' },
      { status: 500 }
    )
  }
} 