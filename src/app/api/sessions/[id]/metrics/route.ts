import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const metrics = await request.json();
    const sessionId = params.id;

    const updatedMetrics = await prisma.speaking_Metrics.create({
      data: {
        sessionId,
        ...metrics
      }
    });

    return NextResponse.json(updatedMetrics);
  } catch (error) {
    console.error('Error updating metrics:', error);
    return NextResponse.json(
      { error: 'Failed to update metrics' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
