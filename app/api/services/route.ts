// app/api/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

/* ----------  GET  (public)  ---------- */
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

/* ----------  helpers  ---------- */
const adminGuard = async (req: NextRequest) => {
  const token = await getToken({ req });
  console.log("debug token", token);
  if (!token || token.role !== "admin") {
    console.error("Unauthorized / invalid role");
    return false;
  }
  return true;
};

/* ----------  POST  ---------- */
export async function POST(req: NextRequest) {
  if (!(await adminGuard(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    console.log("POST body", body);
    const created = await prisma.service.create({ data: body });
    console.log("POST result", created);
    revalidateTag("services-list");
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ----------  PUT  ---------- */
export async function PUT(req: NextRequest) {
  if (!(await adminGuard(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, ...data } = await req.json();
    console.log("PUT id & data", { id, data });
    const updated = await prisma.service.update({ where: { id }, data });
    console.log("PUT result", updated);
    revalidateTag("services-list");
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ----------  DELETE  ---------- */
export async function DELETE(req: NextRequest) {
  if (!(await adminGuard(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    console.log("DELETE id", id);
    await prisma.service.delete({ where: { id } });
    console.log("DELETE success");
    revalidateTag("services-list");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}