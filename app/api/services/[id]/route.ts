// app/api/services/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";   // sesuaikan path
import { prisma } from "@/lib/prisma";

/* ========= PUT ========= */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        features: Array.isArray(body.features) ? body.features : [],
      },
    });
    return NextResponse.json(updated, { status: 201 });
  } catch (err) {
    console.error("PUT /services/[id]", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

/* ========= DELETE ========= */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /services/[id]", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}