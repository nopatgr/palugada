# Palugada Digital - Website Layanan Teknologi

Website profesional untuk layanan teknologi dengan admin dashboard lengkap dan integrasi WhatsApp & Email.

## 🚀 Fitur Utama

### ✅ **Halaman Admin (Dashboard)**
- **Layout Khusus**: Halaman admin tanpa navbar dan footer
- **Manajemen Layanan**: CRUD lengkap untuk layanan
- **Manajemen Booking**: Lihat dan kelola booking pelanggan
- **Manajemen Testimonial**: Review dan approve testimonial
- **Statistik Real-time**: Dashboard dengan data aktual
- **UI Modern**: Desain responsif dengan tema gelap

### ✅ **API Terintegrasi**
- **Booking API**: Terintegrasi dengan WhatsApp dan Email
- **Services API**: CRUD untuk layanan
- **Testimonials API**: CRUD untuk testimonial
- **Email Otomatis**: Konfirmasi booking via email
- **WhatsApp Integration**: Link WhatsApp otomatis

### ✅ **Halaman Terintegrasi**
- **Halaman Layanan**: Menampilkan layanan dari admin
- **Halaman Booking**: Form booking dengan validasi
- **Halaman Testimonial**: Menampilkan testimonial yang disetujui
- **Responsive Design**: Optimal di semua perangkat

## 🛠️ Teknologi yang Digunakan

- **Next.js 15**: Framework React terbaru
- **React 19**: Library UI terbaru
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling modern
- **Radix UI**: Komponen UI yang accessible
- **Nodemailer**: Email integration
- **Sonner**: Toast notifications

## 📦 Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd palugada
```

2. **Install dependencies**
```bash
npm install
# atau
pnpm install
```

3. **Setup environment variables**
Buat file `.env.local` dengan konfigurasi berikut:
```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=services@palugada.biz.id

# WhatsApp Configuration
ADMIN_PHONE=6285777101676

# NextAuth Configuration (if needed)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

**Untuk Testing (tanpa email real):**
```env
# Email Configuration (dummy values untuk testing)
EMAIL_USER=test@example.com
EMAIL_PASS=test-password
ADMIN_EMAIL=services@palugada.biz.id

# WhatsApp Configuration
ADMIN_PHONE=6285777101676
```

4. **Jalankan development server**
```bash
npm run dev
# atau
pnpm dev
```

5. **Akses website**
- **Website Utama**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## 🔧 Troubleshooting

### **Error Nodemailer**
Jika muncul error nodemailer, pastikan:
1. File `.env.local` sudah dibuat
2. Install types: `npm install --save-dev @types/nodemailer`
3. Restart development server

### **PowerShell Execution Policy**
Jika ada error PowerShell, jalankan:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **Admin Page Masih Muncul Navbar/Footer**
Pastikan file `app/admin/layout.tsx` sudah benar dan restart server.

## 🎯 Fitur Detail

### **Admin Dashboard**
- **Dashboard Statistik**: Total layanan, booking, testimonial
- **Manajemen Layanan**: 
  - Tambah layanan baru
  - Edit layanan existing
  - Hapus layanan
  - Set status aktif/nonaktif
- **Manajemen Booking**:
  - Lihat semua booking
  - Update status booking
  - Filter berdasarkan status
- **Manajemen Testimonial**:
  - Review testimonial baru
  - Approve/reject testimonial
  - Edit testimonial

### **API Endpoints**
- `POST /api/booking` - Buat booking baru
- `GET /api/booking` - Ambil data booking
- `GET /api/services` - Ambil data layanan
- `POST /api/services` - Tambah layanan baru
- `PUT /api/services` - Update layanan
- `DELETE /api/services` - Hapus layanan
- `GET /api/testimonials` - Ambil testimonial
- `POST /api/testimonials` - Tambah testimonial
- `PUT /api/testimonials` - Update testimonial
- `DELETE /api/testimonials` - Hapus testimonial

### **Integrasi WhatsApp & Email**
- **Email Otomatis**: 
  - Email konfirmasi ke admin
  - Email konfirmasi ke pelanggan
  - Template email yang profesional
- **WhatsApp Integration**:
  - Link WhatsApp otomatis
  - Pesan booking terformat
  - Redirect otomatis setelah booking

## 📱 Responsive Design

- **Mobile First**: Optimized untuk mobile
- **Tablet**: Layout yang optimal untuk tablet
- **Desktop**: Full experience di desktop
- **Hero Section**: Video background responsif
- **Carousel**: Komponen carousel yang fixed

## 🔧 Konfigurasi Email

Untuk menggunakan fitur email, setup Gmail App Password:

1. Buka Google Account Settings
2. Aktifkan 2-Factor Authentication
3. Generate App Password
4. Gunakan App Password di EMAIL_PASS

## 🎨 Customization

### **Menambah Layanan Baru**
1. Buka halaman admin: `/admin`
2. Klik "Tambah Layanan"
3. Isi form dengan detail layanan
4. Layanan akan otomatis muncul di halaman `/layanan`

### **Mengubah Tema**
- Edit file `components/theme-provider.tsx`
- Modifikasi warna di `tailwind.config.ts`
- Update CSS variables di `globals.css`

### **Menambah Fitur Baru**
- Buat API endpoint baru di `app/api/`
- Buat halaman baru di `app/`
- Update navigation di `components/layout/navbar.tsx`

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm run build
vercel --prod
```

### **Netlify**
```bash
npm run build
# Upload folder .next ke Netlify
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoring

- **Error Tracking**: Console logging untuk debugging
- **Performance**: Optimized images dan lazy loading
- **SEO**: Meta tags dan structured data
- **Analytics**: Ready untuk Google Analytics

## 🤝 Contributing

1. Fork repository
2. Buat feature branch: `git checkout -b feature/baru`
3. Commit changes: `git commit -am 'Add feature baru'`
4. Push branch: `git push origin feature/baru`
5. Submit Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail

## 📞 Support

- **Email**: services@palugada.biz.id
- **WhatsApp**: +62 857-7710-1676
- **Website**: https://palugada.com

---

**Dibuat dengan ❤️ oleh Tim Palugada Digital**
