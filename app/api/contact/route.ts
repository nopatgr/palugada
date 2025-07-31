// app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";        // pastikan bukan edge
export const dynamic = "force-dynamic"; // jangan di-SSG

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function normalizeIndoPhone(raw: string) {
  const digits = (raw || "").replace(/[^\d]/g, "");
  return digits.startsWith("0") ? "62" + digits.slice(1) : digits;
}

function formatNowId() {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const { name, email, phone, subject, message } = body ?? {};

    // Validasi minimal
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Field "name", "email", "phone", "message" wajib diisi.' },
        { status: 400 }
      );
    }

    // Ambil nomor WA bisnis dari ENV
    const waEnv = process.env.NEXT_PUBLIC_WHATSAPP || process.env.WHATSAPP_BUSINESS;
    if (!waEnv) {
      return NextResponse.json(
        { success: false, error: "NEXT_PUBLIC_WHATSAPP / WHATSAPP_BUSINESS belum diset di Environment Variables." },
        { status: 500 }
      );
    }
    const waTarget = normalizeIndoPhone(waEnv);

    // Susun pesan WhatsApp
    const whatsappMessage = `*Pesan Baru dari Website*

*Detail Kontak:*
- Nama: ${name}
- Email: ${email}
- Phone: ${phone}
- Subjek: ${subject || "-"}

*Pesan:*
${message}

*Waktu: ${formatNowId()}*`;

    const whatsappUrl = `https://wa.me/${waTarget}?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
    });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan tak terduga" },
      { status: 500 }
    );
  }
}
