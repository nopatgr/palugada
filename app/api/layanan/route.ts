import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const layanan = await prisma.layanan.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(layanan);
  } catch (error) {
    console.error('Error fetching layanan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch layanan' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, image } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const layanan = await prisma.layanan.create({
      data: {
        name,
        description,
        image: image || null
      }
    });

    return NextResponse.json(layanan, { status: 201 });
  } catch (error) {
    console.error('Error creating layanan:', error);
    return NextResponse.json(
      { error: 'Failed to create layanan' },
      { status: 500 }
    );
  }
} 