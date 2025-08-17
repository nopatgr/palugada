import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from 'next/cache';

// GET: public read
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

/* ===== ADMIN ONLY ===== */
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || token.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const created = await prisma.service.create({ data: body });
  revalidateTag('services-list');
  return NextResponse.json(created, { status: 201 });
}
export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || token.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...data } = await req.json();
  const updated = await prisma.service.update({ where: { id }, data });
  revalidateTag('services-list');
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || token.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await prisma.service.delete({ where: { id } });
  revalidateTag('services-list');
  return NextResponse.json({ success: true });
}