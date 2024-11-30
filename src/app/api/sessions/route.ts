import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    // First verify that the template exists
    const template = await prisma.speaking_Template.findUnique({
      where: { id: data.templateId },
      include: { parts: true }
    });

    if (!template) {
      return NextResponse.json(
        { error: `Template with ID ${data.templateId} not found` },
        { status: 404 }
      );
    }

    // Create the session with the verified template
    const session = await prisma.speaking_Session.create({
      data: {
        userId: data.userId || null,
        templateId: data.templateId,
        duration: data.duration,
      },
      include: {
        template: {
          include: {
            parts: true
          }
        }
      }
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create session' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = await prisma.speaking_Session.findUnique({
      where: { id: sessionId },
      include: {
        messages: true,
        metrics: true,
        feedback: true,
        recordings: true,
        template: {
          include: {
            parts: true
          }
        }
      }
    });

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
  } finally {
    await prisma.$disconnect();
  }
}
