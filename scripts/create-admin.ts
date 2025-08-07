import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@site.com"
  const plainPassword = "admin123"

  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing) {
    console.log("Admin already exists.")
    return
  }

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "ADMIN",
      name: "Admin User"
    }
  })

  console.log("Admin created:", admin)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
