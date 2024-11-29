import { NextRequest, NextResponse } from 'next/server';
import { SpeakingSession, SpeakingTemplate } from '@/types/speakingSession';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { duration, prompt, template, userId } = body;

    // Create a new session in the database
    const session = await prisma.speaking_Session.create({
      data: {
        id: uuidv4(),
        userId: userId,
        startTime: new Date(),
        duration: duration
      }
    });

    return NextResponse.json({
      sessionId: session.id,
      template: template
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Session initialization failed' },
      { status: 500 }
    );
  }
}
