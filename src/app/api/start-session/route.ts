import { NextRequest, NextResponse } from 'next/server';
import { SpeakingSession, SpeakingTemplate } from '@/types/speakingSession';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { duration, prompt, template } = body;

    // Create a new session
    const session: SpeakingSession = {
      id: uuidv4(),
      startTime: new Date(),
      duration: duration,
      template: template,
      metrics: {
        fluency: 0,
        grammar: 0,
        vocabulary: 0,
        pronunciation: 0
      }
    };

    // In a real application, you would save the session to a database here
    
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
