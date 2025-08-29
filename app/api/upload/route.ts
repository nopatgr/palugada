// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

// Log ENV (jangan lupa redeploy setelah ganti env)
console.log("NEXT_PUBLIC_SUPABASE_URL :", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

// Check Supabase client
let supabase;
try {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  console.log("Supabase client OK");
} catch (err) {
  console.error("❌ Supabase client error:", err);
  throw err;
}

export async function POST(req: NextRequest) {
  try {
    console.time("Upload duration");
    console.log("=== START UPLOAD ===");

    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    if (!session?.user) {
      console.warn("401 Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    console.log("File received:", file?.name, file?.size, file?.type);

    if (!file) {
      console.warn("400 No file");
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const filename = `${crypto.randomUUID()}-${file.name}`;
    console.log("Uploading filename:", filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    const { data, error } = await supabase.storage
      .from("service")
      .upload(filename, buffer, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("❌ Storage error:", error.message, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from("service")
      .getPublicUrl(filename);
    console.log("Public URL:", publicUrl);

    console.timeEnd("Upload duration");
    return NextResponse.json({ url: publicUrl });
  } catch (e) {
    console.error("❌ Uncaught server error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}