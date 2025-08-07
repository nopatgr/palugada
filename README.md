# Palugada - Sistem Admin Layanan

## Fitur Admin

### 1. Sistem Autentikasi
- Login admin dengan email dan password
- Proteksi halaman admin dengan role-based access
- Redirect otomatis ke halaman login jika bukan admin

### 2. Manajemen Layanan
- **List Layanan**: `/admin/layanan`
  - Menampilkan semua layanan dalam bentuk card
  - Tombol edit dan delete untuk setiap layanan
  - Tombol "Tambah Layanan" untuk menambah layanan baru

- **Tambah Layanan**: `/admin/layanan/new`
  - Form input: name, description, image (opsional)
  - Validasi form
  - POST ke `/api/layanan`

- **Edit Layanan**: `/admin/layanan/[id]/edit`
  - Form edit dengan data yang sudah terisi
  - PUT ke `/api/layanan/[id]`

### 3. API Endpoints

#### GET `/api/layanan`
- Mengambil semua data layanan
- Diurutkan berdasarkan createdAt desc

#### POST `/api/layanan`
- Membuat layanan baru
- Validasi: name dan description required
- Hanya admin yang bisa akses

#### PUT `/api/layanan/[id]`
- Update layanan berdasarkan ID
- Validasi: name dan description required
- Hanya admin yang bisa akses

#### DELETE `/api/layanan/[id]`
- Hapus layanan berdasarkan ID
- Hanya admin yang bisa akses

### 4. Database Schema

```prisma
model Layanan {
  id          String   @id @default(cuid())
  name        String
  description String
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 5. Struktur Folder

```
app/
├── admin/
│   ├── layanan/
│   │   ├── page.tsx              # List layanan
│   │   ├── new/
│   │   │   └── page.tsx          # Form tambah layanan
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx      # Form edit layanan
│   └── page.tsx                  # Dashboard admin
├── api/
│   └── layanan/
│       ├── route.ts              # GET, POST
│       └── [id]/
│           └── route.ts          # PUT, DELETE
```

### 6. Teknologi yang Digunakan

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Form Handling**: React Hook Form + Zod
- **Styling**: Tailwind CSS

### 7. Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Setup database:
```bash
npx prisma db push
```

3. Jalankan development server:
```bash
npm run dev
```

4. Akses admin panel:
```
http://localhost:3000/admin
```

### 8. Fitur Keamanan

- Role-based access control
- Session management dengan NextAuth
- Validasi input di frontend dan backend
- Error handling yang proper
- Loading states untuk UX yang lebih baik

### 9. Status Implementasi

✅ Database schema sudah dibuat  
✅ API endpoints sudah dibuat  
✅ Halaman admin sudah dibuat  
✅ Autentikasi sudah diintegrasikan  
✅ Form validation sudah diterapkan  
✅ Error handling sudah diterapkan  
✅ UI/UX sudah dioptimalkan  

Sistem admin layanan sudah siap digunakan!
