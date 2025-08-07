const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const admin = await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
    },
  })

  console.log("Admin user created:", admin)

  // Create some sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "john@example.com" },
      update: {},
      create: {
        name: "John Doe",
        email: "john@example.com",
      },
    }),
    prisma.user.upsert({
      where: { email: "jane@example.com" },
      update: {},
      create: {
        name: "Jane Smith",
        email: "jane@example.com",
      },
    }),
  ])

  console.log("Sample users created:", users)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
