const fetch = require("node-fetch")

async function testRouting() {
  const baseUrl = "http://localhost:3000"

  console.log("🧪 Testing Admin Routing")
  console.log("========================\n")

  try {
    // Test 1: Access login page
    console.log("1️⃣ Testing /admin (login page)...")
    const loginPageResponse = await fetch(`${baseUrl}/admin`, {
      redirect: "manual", // Don't follow redirects
    })
    console.log(`   Status: ${loginPageResponse.status}`)
    console.log(`   Headers:`, Object.fromEntries(loginPageResponse.headers.entries()))

    // Test 2: Login API
    console.log("\n2️⃣ Testing login API...")
    const loginResponse = await fetch(`${baseUrl}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "admin123",
      }),
    })

    const loginData = await loginResponse.json()
    console.log(`   Status: ${loginResponse.status}`)
    console.log(`   Data:`, loginData)

    const cookies = loginResponse.headers.get("set-cookie")
    console.log(`   Cookies:`, cookies)

    if (loginResponse.ok && cookies) {
      // Test 3: Access dashboard with session
      console.log("\n3️⃣ Testing /admin/dashboard with session...")
      const dashboardResponse = await fetch(`${baseUrl}/admin/dashboard`, {
        headers: {
          Cookie: cookies,
        },
        redirect: "manual",
      })
      console.log(`   Status: ${dashboardResponse.status}`)
      console.log(`   Headers:`, Object.fromEntries(dashboardResponse.headers.entries()))

      // Test 4: Users API with session
      console.log("\n4️⃣ Testing /api/admin/users with session...")
      const usersResponse = await fetch(`${baseUrl}/api/admin/users`, {
        headers: {
          Cookie: cookies,
        },
      })
      const usersData = await usersResponse.json()
      console.log(`   Status: ${usersResponse.status}`)
      console.log(`   Data:`, usersData)
    }

    // Test 5: Access dashboard without session
    console.log("\n5️⃣ Testing /admin/dashboard without session...")
    const noSessionResponse = await fetch(`${baseUrl}/admin/dashboard`, {
      redirect: "manual",
    })
    console.log(`   Status: ${noSessionResponse.status}`)
    console.log(`   Headers:`, Object.fromEntries(noSessionResponse.headers.entries()))
  } catch (error) {
    console.error("💥 Test error:", error)
  }
}

testRouting()
