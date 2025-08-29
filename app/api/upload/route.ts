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
    // 1. Auth
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      console.error("401 Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form-data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const idService = formData.get("id") as string | null;

    console.log("formData keys:", [...formData.keys()]);
    console.log("file:", { name: file?.name, type: file?.type, size: file?.size });
    console.log("idService:", idService);

    // 3. Validasi
    if (!file) {
      console.error("400 No file");
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }
    if (!idService) {
      console.error("400 Missing id");
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      console.error("400 Invalid file type", file.type);
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error("400 File too large", file.size);
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    // 4. Upload
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

    if (uploadError) {
      console.error("500 Upload failed", uploadError);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    // 5. Get public URL
    const { data: urlData } = sb.storage
      .from("service")
      .getPublicUrl(uploadData.path);
    const publicUrl = urlData.publicUrl;

    // 6. Update DB
    const { error: dbError } = await sb
      .from("Service")
      .update({ image: publicUrl })
      .eq("id", idService);

    if (dbError) {
      console.error("500 DB update failed", dbError);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    console.log("200 OK", { publicUrl });
    return NextResponse.json(
      { message: "Upload successful", publicUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("500 Uncaught error", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}