import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1) Admin user
  await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      email: 'admin@company.com',
      password: await bcrypt.hash('admin123', 10),
    },
  })

  // 2) 4 layanan awal
  const services = [
  {
    title: 'Operasi Sistem',
    description: 'Instalasi sistem operasi Windows, macOS, dan Linux dengan konfigurasi optimal untuk performa maksimal',
    image: '/images/herobg.jpg',
    gradient: 'from-cyan-500 to-blue-500',
    popular: true,
    features: [
      'Pembersihan junk file & cache',
      'Deep cleaning hardware',
      'Install ulang windows/Linux',
      'Setup dual boot(windows+linux)',
    ],
    price: 'Mulai Rp 100K',
    note: 'Layanan mencakup optimasi startup (+30k), partisi, dan perbaikan GRUB. Termasuk driver dasar dan opsi backup data (+50).',
    category: 'Software',
    status: 'active',
    orderIndex: 1,
  },
  {
    title: 'Instalasi Software',
    description: 'Setup dan konfigurasi software aplikasi sesuai kebutuhan bisnis Anda',
    image: '/images/computer-repair.jpeg',
    gradient: 'from-blue-500 to-purple-500',
    features: ['Microsoft Office', 'Software akademik', 'Aplikasi Editing'],
    popular: true,
    price: 'Mulai Rp 200K',
    note: 'Termasuk aktivasi/lisensi, panduan aktivasi atau crack bila diperlukan.',
    category: 'Software',
    status: 'active',
    orderIndex: 2,
  },
  {
    title: 'Web Development & Design',
    description: 'Dukungan teknis 24/7 untuk troubleshooting dan maintenance sistem',
    image: '/images/tech-support.jpeg',
    gradient: 'from-purple-500 to-cyan-500',
    features: [
      'Company Profile(WordPress)',
      'Google Site Sederhana',
      'CRUD sederhana(PHP+MySql)',
      'Website dengan reactjs(Frontend Only)',
      'Fullstack Website(React+NodeJS)',
      'Tambah fitur',
    ],
    price: 'Mulai Rp 900K',
    note: 'Harga menyesuaikan jumlah halaman, fitur, dan tingkat kompleksitas.',
    category: 'Support',
    status: 'active',
    orderIndex: 3,
  },
  {
    title: 'Dokumen & Tugas',
    description: 'Dukungan teknis 24/7 untuk troubleshooting dan maintenance sistem',
    image: '/images/tech-support.jpeg',
    gradient: 'from-purple-500 to-cyan-500',
    features: [
      'Edit PDF(Gabung, pisah, convert)',
      'PPT Presentasi Custom',
      'Bantuan tugas kuliah',
      'Konsultasi IT(online&offline)',
      'CV ATS Friendly & Cover Letter',
    ],
    price: 'Mulai Rp 20K',
    note: 'Harga tergantung tingkat kesulitan dan kebutuhan detail.',
    category: 'Support',
    status: 'active',
    orderIndex: 4,
  },
];


async function main() {
  console.log("🌱 Seeding database...");
  
  // Hapus semua data lama
  await prisma.service.deleteMany();
  
  // Insert data baru
  for (const service of services) {
    const created = await prisma.service.create({ data: service });
    console.log(`✅ Created: ${created.title}`);
  }
  
  console.log("✨ Seeding completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
}