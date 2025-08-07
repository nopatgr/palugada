// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // ✅ Biarkan file statis dan API
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ✅ Jika akses ke /admin/login
  if (pathname === "/admin/login") {
    if (token) {
      // Jika sudah login, lempar ke dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    // Jika belum login, biarkan
    return NextResponse.next();
  }

  // ✅ Jika akses ke halaman /admin/dashboard dan lainnya
  if (pathname.startsWith("/admin")) {
    if (!token) {
      // Belum login
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (token?.role !== "ADMIN") {
      // Sudah login tapi bukan admin
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Jika admin, izinkan
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
