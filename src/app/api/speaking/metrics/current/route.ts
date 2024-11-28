import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Get the latest speaking session metrics
    const latestMetrics = await prisma.speakingMetrics.findFirst({
      where: {
        session: {
          userId: userId
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!latestMetrics) {
      return NextResponse.json({
        pronunciation: 0,
        grammar: 0,
        vocabulary: 0,
        fluency: 0,
        coherence: 0
      });
    }

    return NextResponse.json({
      pronunciation: latestMetrics.pronunciation,
      grammar: latestMetrics.grammar,
      vocabulary: latestMetrics.vocabulary,
      fluency: latestMetrics.fluency,
      coherence: latestMetrics.coherence
    });
  } catch (error) {
    console.error('Error fetching current metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
