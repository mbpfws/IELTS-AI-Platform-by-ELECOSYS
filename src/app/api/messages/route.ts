import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const message = await prisma.speaking_Message.create({
      data: {
        sessionId: data.sessionId,
        content: data.content,
        role: data.role,
        responseTime: data.responseTime,
        wordCount: data.wordCount
      }
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
