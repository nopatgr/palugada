// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Dummy example: ganti dengan pengecekan database sebenarnya
  if (email === 'admin@company.com' && password === 'admin123') {
    return NextResponse.json({ success: true, message: 'Login successful' });
  } else {
    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  }
}
