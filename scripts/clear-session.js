const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function clearSession() {
  try {
    console.log("🧹 Clearing all sessions and cache...")

    // You can add logic here to clear any session data from database if needed
    // For now, we'll just show instructions

    console.log("✅ Session clearing instructions:")
    console.log("1. Clear browser cookies for localhost:3000")
    console.log("2. Clear browser cache")
    console.log("3. Restart Next.js development server")
    console.log("4. Try logging in again")

    console.log("\n🍪 To clear cookies manually:")
    console.log("- Open DevTools (F12)")
    console.log("- Go to Application tab")
    console.log("- Click on Cookies → http://localhost:3000")
    console.log("- Delete all cookies")

    console.log("\n🔄 Or use this JavaScript in browser console:")
    console.log("document.cookie.split(';').forEach(c => {")
    console.log(
      "  document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')",
    )
    console.log("})")
  } catch (error) {
    console.error("❌ Error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

clearSession()
