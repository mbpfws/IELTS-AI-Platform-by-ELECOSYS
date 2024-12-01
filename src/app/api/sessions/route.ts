import { NextResponse } from 'next/server';
import { part1Templates } from '@/data/speakingTemplates/part1';
import { part2Templates } from '@/data/speakingTemplates/part2';
import { part3Templates } from '@/data/speakingTemplates/part3';
import { tutoringLessons } from '@/data/speakingTemplates/tutoring';
import fs from 'fs/promises';
import path from 'path';

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

// Session storage path
const SESSION_DIR = path.join(process.cwd(), 'data', 'sessions');

// Ensure session directory exists
async function ensureSessionDir() {
  try {
    await fs.access(SESSION_DIR);
  } catch {
    await fs.mkdir(SESSION_DIR, { recursive: true });
  }
}

// Save session to file
async function saveSession(session: any) {
  await ensureSessionDir();
  const filePath = path.join(SESSION_DIR, `${session.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(session, null, 2));
  return session;
}

// Get session from file
async function getSession(sessionId: string) {
  const filePath = path.join(SESSION_DIR, `${sessionId}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.templateId) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }

    // Find the template
    const template = findTemplateById(data.templateId);

    if (!template) {
      return NextResponse.json(
        { error: `Template with ID ${data.templateId} not found` },
        { status: 404 }
      );
    }

    // Create session data
    const session = {
      id: `session_${Date.now()}`,
      templateId: data.templateId,
      duration: data.duration || 300,
      createdAt: new Date(),
      status: 'active',
      messages: [],
      metrics: null,
      feedback: null,
      template: {
        ...template,
        parts: [{
          part: template.part || 'tutoring',
          prompt: template.systemPrompt
        }]
      }
    };

    // Save session to file
    await saveSession(session);

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = await getSession(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

// Helper function to update session
export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { sessionId, updates } = data;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Update session with new data
    const updatedSession = {
      ...session,
      ...updates,
      updatedAt: new Date()
    };

    // Save updated session
    await saveSession(updatedSession);

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}
