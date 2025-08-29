// app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { createClient } from "@supabase/supabase-js";
import authOptions from "@/lib/auth";
import { error } from "console";

// helper client supabase di dalam handler
function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil file dan id Services dari form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const idService = formData.get("idService") as string | null;

    if (!file) {
      return NextResponse.json({ error: "no file" }, { status: 400 });
    }
    if (!idService) {
      return NextResponse.json({ error: "missing Id" }, { status: 400 });
    }

    // 3. Validasi file
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "invalid file type" }, { status: 400 });
    }
    const maxSize = 5 * 1024 * 1024; //5mb
    if (file.size > maxSize) {
      return NextResponse.json({ error: "file to large" }, { status: 400 });
    }

    // 4. Upload file ke supabase storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const sb = supabaseAdmin();
    const { data: uploadData, error: uploadError } = await sb.storage
      .from("services")
      .upload(fileName, buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      return NextResponse.json({ error: "upload failed" }, { status: 500 });
    }

    // 5. Dapatkan Public Url
    const { data: urlData } = sb.storage
      .from("services")
      .getPublicUrl(uploadData.path);
    const publicUrl = urlData.publicUrl;

    return NextResponse.json({ publicUrl }, { status: 200 });

    // 6. Simpan Url ke table services
    const { error: dbError } = await sb
      .from("services")
      .update({ image: publicUrl })
      .eq("id", idService);
    if (dbError) {
      return NextResponse.json({ error: "db update failed" }, { status: 500 });
    }

    // 7. Response success
    return NextResponse.json(
      { message: "upload successful", publicUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "upload failed" }, { status: 500 });
  }
}

