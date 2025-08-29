// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

// Inisialisasi Supabase client dengan Service Role Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Penting: gunakan Service Role Key untuk server-side
)

export async function POST(request: NextRequest) {
  try {
    // 1. Validasi form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // 2. Validasi file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      )
    }

    // 3. Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${uuidv4()}-${file.name}`

    // 4. Convert file ke buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log(`Uploading filename: ${uniqueFilename}`)

    // 5. Upload ke Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('services')
      .upload(uniqueFilename, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      })

    if (error) {
      console.error('Storage error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // 6. Dapatkan public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('services')
      .getPublicUrl(data.path)

    const publicUrl = urlData.publicUrl

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: Size limit middleware
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
}