'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { toast } from "sonner"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  Star, 
  Settings, 
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink
} from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  price: string
  category: string
  status: 'active' | 'inactive'
  createdAt: string
  image?: string
  gradient?: string
  features?: string[]
  popular?: boolean
}

interface Booking {
  id: string
  name: string
  email: string
  service: string
  date: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  message?: string
  phone?: string
  createdAt?: string
}

interface Testimonial {
  id: string
  customerName: string
  rating: number
  comment: string
  service: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export default function AdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  // Fetch data dari API
  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data.services || [])
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Gagal mengambil data layanan')
    }
  }

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/booking')
      const data = await response.json()
      setBookings(data.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Gagal mengambil data booking')
    }
  }

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      const data = await response.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast.error('Gagal mengambil data testimonial')
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchServices(), fetchBookings(), fetchTestimonials()])
      setIsLoading(false)
    }
    loadData()
  }, [])

  // CRUD Operations untuk Services
  const handleAddService = async () => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success('Layanan berhasil ditambahkan')
        fetchServices()
        setIsDialogOpen(false)
        setFormData({})
      } else {
        toast.error(data.error || 'Gagal menambah layanan')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    }
  }

  const handleUpdateService = async () => {
    try {
      const response = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingItem, ...formData })
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success('Layanan berhasil diperbarui')
        fetchServices()
        setIsDialogOpen(false)
        setEditingItem(null)
        setFormData({})
      } else {
        toast.error(data.error || 'Gagal memperbarui layanan')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return
    
    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success('Layanan berhasil dihapus')
        fetchServices()
      } else {
        toast.error(data.error || 'Gagal menghapus layanan')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    }
  }

  // CRUD Operations untuk Testimonials
  const handleAddTestimonial = async () => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success('Testimonial berhasil ditambahkan')
        fetchTestimonials()
        setIsDialogOpen(false)
        setFormData({})
      } else {
        toast.error(data.error || 'Gagal menambah testimonial')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    }
  }

  const handleUpdateTestimonial = async () => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingItem, ...formData })
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success('Testimonial berhasil diperbarui')
        fetchTestimonials()
        setIsDialogOpen(false)
        setEditingItem(null)
        setFormData({})
      } else {
        toast.error(data.error || 'Gagal memperbarui testimonial')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    }
  }

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus testimonial ini?')) return
    
    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success('Testimonial berhasil dihapus')
        fetchTestimonials()
      } else {
        toast.error(data.error || 'Gagal menghapus testimonial')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'approved':
        return 'bg-green-500'
      case 'pending':
        return 'bg-yellow-500'
      case 'cancelled':
      case 'rejected':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif'
      case 'inactive':
        return 'Tidak Aktif'
      case 'confirmed':
        return 'Dikonfirmasi'
      case 'pending':
        return 'Menunggu'
      case 'completed':
        return 'Selesai'
      case 'cancelled':
        return 'Dibatalkan'
      case 'approved':
        return 'Disetujui'
      case 'rejected':
        return 'Ditolak'
      default:
        return status
    }
  }

  const openDialog = (type: string, item?: any) => {
    setEditingItem(item)
    setFormData(item ? { ...item } : {})
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (editingItem) {
      if (editingItem.id.includes('service')) {
        handleUpdateService()
      } else if (editingItem.id.includes('testimonial')) {
        handleUpdateTestimonial()
      }
    } else {
      if (formData.title) {
        handleAddService()
      } else if (formData.customerName) {
        handleAddTestimonial()
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Memuat data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <ScrollReveal direction="up">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-300">Kelola layanan, booking, dan testimoni</p>
          </div>
        </ScrollReveal>

        {/* Stats Cards */}
        <ScrollReveal direction="up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Layanan</CardTitle>
                <Settings className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{services.length}</div>
                <p className="text-xs text-slate-400">Layanan aktif</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Booking</CardTitle>
                <Calendar className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{bookings.length}</div>
                <p className="text-xs text-slate-400">Semua booking</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Booking Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {bookings.filter(b => b.status === 'pending').length}
                </div>
                <p className="text-xs text-slate-400">Menunggu konfirmasi</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Testimonial</CardTitle>
                <Star className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{testimonials.length}</div>
                <p className="text-xs text-slate-400">Review pelanggan</p>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Main Content Tabs */}
        <ScrollReveal direction="up" delay={400}>
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
              <TabsTrigger value="services" className="text-slate-300">Layanan</TabsTrigger>
              <TabsTrigger value="bookings" className="text-slate-300">Booking</TabsTrigger>
              <TabsTrigger value="testimonials" className="text-slate-300">Testimonial</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="mt-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Manajemen Layanan</CardTitle>
                      <CardDescription className="text-slate-300">
                        Kelola layanan yang ditawarkan
                      </CardDescription>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      onClick={() => openDialog('service')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Layanan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Judul</TableHead>
                        <TableHead className="text-slate-300">Kategori</TableHead>
                        <TableHead className="text-slate-300">Harga</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.id} className="border-slate-700">
                          <TableCell className="text-white">{service.title}</TableCell>
                          <TableCell className="text-slate-300">{service.category}</TableCell>
                          <TableCell className="text-slate-300">{service.price}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(service.status)} text-white`}>
                              {getStatusText(service.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-slate-600"
                                onClick={() => openDialog('service', service)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-red-600 text-red-400"
                                onClick={() => handleDeleteService(service.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="mt-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Manajemen Booking</CardTitle>
                  <CardDescription className="text-slate-300">
                    Kelola booking dan janji temu pelanggan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Pelanggan</TableHead>
                        <TableHead className="text-slate-300">Layanan</TableHead>
                        <TableHead className="text-slate-300">Tanggal</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id} className="border-slate-700">
                          <TableCell>
                            <div>
                              <div className="text-white font-medium">{booking.name}</div>
                              <div className="text-slate-400 text-sm">{booking.email}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-300">{booking.service}</TableCell>
                          <TableCell className="text-slate-300">{booking.date}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(booking.status)} text-white`}>
                              {getStatusText(booking.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-slate-600">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-green-600 text-green-400">
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="mt-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Manajemen Testimonial</CardTitle>
                      <CardDescription className="text-slate-300">
                        Review dan kelola testimonial pelanggan
                      </CardDescription>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => openDialog('testimonial')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Testimonial
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Pelanggan</TableHead>
                        <TableHead className="text-slate-300">Rating</TableHead>
                        <TableHead className="text-slate-300">Layanan</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testimonials.map((testimonial) => (
                        <TableRow key={testimonial.id} className="border-slate-700">
                          <TableCell className="text-white">{testimonial.customerName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-slate-400'
                                  }`}
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-300">{testimonial.service}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(testimonial.status)} text-white`}>
                              {getStatusText(testimonial.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-slate-600"
                                onClick={() => openDialog('testimonial', testimonial)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-red-600 text-red-400"
                                onClick={() => handleDeleteTestimonial(testimonial.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollReveal>

        {/* Dialog untuk Add/Edit */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingItem ? 'Edit' : 'Tambah'} {editingItem?.title ? 'Layanan' : 'Testimonial'}
              </DialogTitle>
              <DialogDescription className="text-slate-300">
                {editingItem ? 'Edit data yang ada' : 'Tambah data baru'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {editingItem?.title || !editingItem ? (
                // Form untuk Service
                <>
                  <Input 
                    placeholder="Judul layanan" 
                    className="bg-slate-700 border-slate-600 text-white"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <Textarea 
                    placeholder="Deskripsi layanan" 
                    className="bg-slate-700 border-slate-600 text-white"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                  <Input 
                    placeholder="Harga" 
                    className="bg-slate-700 border-slate-600 text-white"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                  <Select 
                    value={formData.category || ''}
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              ) : (
                // Form untuk Testimonial
                <>
                  <Input 
                    placeholder="Nama pelanggan" 
                    className="bg-slate-700 border-slate-600 text-white"
                    value={formData.customerName || ''}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  />
                  <Select 
                    value={formData.rating?.toString() || ''}
                    onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="5">5 Bintang</SelectItem>
                      <SelectItem value="4">4 Bintang</SelectItem>
                      <SelectItem value="3">3 Bintang</SelectItem>
                      <SelectItem value="2">2 Bintang</SelectItem>
                      <SelectItem value="1">1 Bintang</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea 
                    placeholder="Komentar" 
                    className="bg-slate-700 border-slate-600 text-white"
                    value={formData.comment || ''}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  />
                  <Select 
                    value={formData.service || ''}
                    onValueChange={(value) => setFormData({...formData, service: value})}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Layanan" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.title}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                className="border-slate-600 text-slate-300"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditingItem(null)
                  setFormData({})
                }}
              >
                Batal
              </Button>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-500"
                onClick={handleSubmit}
              >
                {editingItem ? 'Update' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 