import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Get the last 10 sessions with their metrics
    const sessions = await prisma.speakingSession.findMany({
      where: {
        userId: userId,
        metrics: {
          isNot: null
        }
      },
      include: {
        metrics: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });

    const historicalData = sessions.map(session => ({
      date: session.createdAt.toISOString().split('T')[0],
      averageScore: session.metrics ? 
        (session.metrics.pronunciation + 
         session.metrics.grammar + 
         session.metrics.vocabulary + 
         session.metrics.fluency + 
         session.metrics.coherence) / 5 : 0
    })).reverse();

    return NextResponse.json(historicalData);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return NextResponse.json({ error: 'Failed to fetch historical data' }, { status: 500 });
  }
}
