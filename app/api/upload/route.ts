// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const idService = formData.get("id") as string | null; // ← SAMAKAN nama field

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    if (!idService)
      return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type))
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize)
      return NextResponse.json({ error: "File too large" }, { status: 400 });

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const sb = supabaseAdmin();
    const { data: uploadData, error: uploadError } = await sb.storage
      .from("service")
      .upload(fileName, buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError)
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });

    const { data: urlData } = sb.storage
      .from("service")
      .getPublicUrl(uploadData.path);
    const publicUrl = urlData.publicUrl;

    // Simpan URL ke tabel services
    const { error: dbError } = await sb
      .from("Service") // pastikan nama tabel benar: "services"
      .update({ image: publicUrl })
      .eq("id", idService);

    if (dbError)
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });

    // di dalam POST handler, sebelum return
    console.log("formData keys:", [...formData.keys()]);
    console.log("file:", file?.name, file?.type, file?.size);
    console.log("idService:", idService);

    return NextResponse.json(
      { message: "Upload successful", publicUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
