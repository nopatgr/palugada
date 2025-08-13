import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const admin = await prisma.admin.findFirst();
    console.log("✅ Admin ditemukan:", admin);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();