const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function setup() {
  console.log("🚀 Setting up admin system...")

  try {
    // Create admin
    const hashedPassword = await bcrypt.hash("gar123", 12)

    await prisma.admin.upsert({
      where: { email: "admin@gmail.com" },
      update: { password: hashedPassword },
      create: {
        email: "admin@gmail.com",
        password: hashedPassword,
        name: "Admin",
        role: "ADMIN",
      },
    })

    // Create sample users
    await prisma.user.upsert({
      where: { email: "john@example.com" },
      update: {},
      create: { name: "John Doe", email: "john@example.com" },
    })

    await prisma.user.upsert({
      where: { email: "jane@example.com" },
      update: {},
      create: { name: "Jane Smith", email: "jane@example.com" },
    })

    console.log("✅ Setup complete!")
    console.log("📧 Email: admin@example.com")
    console.log("🔐 Password: admin123")
  } catch (error) {
    console.error("❌ Setup failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

setup()
