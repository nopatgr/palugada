import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("❌ ADMIN_EMAIL dan ADMIN_PASSWORD harus ada di .env");
  }

  // Hash password admin
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Upsert admin user
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user siap:", admin);

  // 2) 4 layanan awal
  const services = [
    {
      title: "Operasi Sistem",
      description:
        "Instalasi sistem operasi Windows, macOS, dan Linux dengan konfigurasi optimal untuk performa maksimal",
      image: "/images/herobg.jpg",
      gradient: "from-cyan-500 to-blue-500",
      popular: true,
      features: [
        "Pembersihan junk file & cache",
        "Deep cleaning hardware",
        "Install ulang windows/Linux",
        "Setup dual boot(windows+linux)",
      ],
      price: "Mulai Rp 100K",
      note: "Layanan mencakup optimasi startup (+30k), partisi, dan perbaikan GRUB. Termasuk driver dasar dan opsi backup data (+50).",
      category: "Software",
      status: "active",
      orderIndex: 1,
    },
    {
      title: "Instalasi Software",
      description:
        "Setup dan konfigurasi software aplikasi sesuai kebutuhan bisnis Anda",
      image: "/images/computer-repair.jpeg",
      gradient: "from-blue-500 to-purple-500",
      features: ["Microsoft Office", "Software akademik", "Aplikasi Editing"],
      popular: true,
      price: "Mulai Rp 200K",
      note: "Termasuk aktivasi/lisensi, panduan aktivasi atau crack bila diperlukan.",
      category: "Software",
      status: "active",
      orderIndex: 2,
    },
    {
      title: "Web Development & Design",
      description:
        "Dukungan teknis 24/7 untuk troubleshooting dan maintenance sistem",
      image: "/images/tech-support.jpeg",
      gradient: "from-purple-500 to-cyan-500",
      features: [
        "Company Profile(WordPress)",
        "Google Site Sederhana",
        "CRUD sederhana(PHP+MySql)",
        "Website dengan reactjs(Frontend Only)",
        "Fullstack Website(React+NodeJS)",
        "Tambah fitur",
      ],
      price: "Mulai Rp 900K",
      note: "Harga menyesuaikan jumlah halaman, fitur, dan tingkat kompleksitas.",
      category: "Support",
      status: "active",
      orderIndex: 3,
    },
    {
      title: "Dokumen & Tugas",
      description:
        "Dukungan teknis 24/7 untuk troubleshooting dan maintenance sistem",
      image: "/images/tech-support.jpeg",
      gradient: "from-purple-500 to-cyan-500",
      features: [
        "Edit PDF(Gabung, pisah, convert)",
        "PPT Presentasi Custom",
        "Bantuan tugas kuliah",
        "Konsultasi IT(online&offline)",
        "CV ATS Friendly & Cover Letter",
      ],
      price: "Mulai Rp 20K",
      note: "Harga tergantung tingkat kesulitan dan kebutuhan detail.",
      category: "Support",
      status: "active",
      orderIndex: 4,
    },
  ];

 await prisma.service.deleteMany();
  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log('✅ Services seeded');
  }

  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
