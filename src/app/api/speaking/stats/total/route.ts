import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Get total number of sessions
    const totalSessions = await prisma.speakingSession.count({
      where: {
        userId: userId
      }
    });

    // Calculate total practice time in minutes
    const sessions = await prisma.speakingSession.findMany({
      where: {
        userId: userId,
        endTime: {
          not: null
        }
      },
      select: {
        startTime: true,
        endTime: true
      }
    });

    const totalPracticeTime = sessions.reduce((total, session) => {
      if (session.endTime) {
        const duration = Math.floor((session.endTime.getTime() - session.startTime.getTime()) / 60000); // Convert to minutes
        return total + duration;
      }
      return total;
    }, 0);

    return NextResponse.json({
      totalSessions,
      totalPracticeTime
    });
  } catch (error) {
    console.error('Error fetching total stats:', error);
    return NextResponse.json({ error: 'Failed to fetch total stats' }, { status: 500 });
  }
}
