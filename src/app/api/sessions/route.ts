import { NextResponse } from 'next/server';
import { part1Templates } from '@/data/speakingTemplates/part1';
import { part2Templates } from '@/data/speakingTemplates/part2';
import { part3Templates } from '@/data/speakingTemplates/part3';
import { tutoringLessons } from '@/data/speakingTemplates/tutoring';
import { sessionStorage, SessionData } from '@/services/sessionStorage';
import { Message, SessionState } from '@/types/speakingSession';
import { LearningMetrics } from '@/types/learningMetrics';

// Helper function to find template by ID
function findTemplateById(templateId: string) {
  const allTemplates = [
    ...part1Templates, 
    ...part2Templates, 
    ...part3Templates,
    ...tutoringLessons
  ];
  return allTemplates.find(template => template.id === templateId);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, userId, duration } = body;

    const template = findTemplateById(templateId);
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const sessionId = Date.now().toString();
    const sessionData: Omit<SessionData, 'endTime'> = {
      id: sessionId,
      userId,
      templateId,
      startTime: new Date(),
      duration,
      state: 'active',
      messages: [],
      metrics: {
        sessionId,
        timestamp: new Date(),
        duration: 0,
        energyScore: {
          engagement: 85,
          comprehension: 80,
          progress: 70,
          confidence: 75
        },
        performance: {
          taskResponse: 6.5,
          coherenceCohesion: 6.0,
          lexicalResource: 6.5,
          grammaticalRange: 6.0,
          pronunciation: 6.5
        }
      },
      notes: '',
      transcript: ''
    };

    await sessionStorage.createSession(sessionData);
    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('Failed to create session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const userId = searchParams.get('userId');

    if (sessionId) {
      const session = await sessionStorage.getSession(sessionId);
      return NextResponse.json(session);
    }

    if (userId) {
      const sessions = await sessionStorage.getUserSessions(userId);
      return NextResponse.json(sessions);
    }

    return NextResponse.json({ error: 'Missing sessionId or userId' }, { status: 400 });
  } catch (error) {
    console.error('Failed to get session:', error);
    return NextResponse.json({ error: 'Failed to get session' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    const body = await request.json();
    const {
      message,
      notes,
      transcript,
      metrics,
      state
    } = body;

    if (message) {
      await sessionStorage.addSessionMessage(sessionId, message);
    }

    if (notes) {
      await sessionStorage.updateSessionNotes(sessionId, notes);
    }

    if (transcript) {
      await sessionStorage.updateSessionTranscript(sessionId, transcript);
    }

    if (metrics) {
      await sessionStorage.updateSessionMetrics(sessionId, metrics);
    }

    if (state === 'completed') {
      await sessionStorage.endSession(sessionId);
    }

    const updatedSession = await sessionStorage.getSession(sessionId);
    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Failed to update session:', error);
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

// New endpoint for generating session reports
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    const reportPath = await sessionStorage.generateSessionReport(sessionId);
    return NextResponse.json({ reportPath });
  } catch (error) {
    console.error('Failed to generate report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
