// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Sementara disable middleware untuk debugging
  return NextResponse.next();
}

export const config = {
  matcher: [], // kosongkan dulu
};