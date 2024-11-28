import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Message } from '@/types/speakingSession';
import { SYSTEM_INSTRUCTION, CONVERSATION_PROMPTS, MOCK_TEST_PROMPTS } from '@/app/agents/speaking/prompts';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  choices: [{
    message: {
      role: 'assistant';
      content: string;
    }
  }]
}

interface SessionMetrics {
  scores: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    coherence: number;
  }
}

async function callAIWithRetry(messages: AIMessage[], retries = 0): Promise<AIResponse> {
  try {
    const response = await fetch('https://api.learnlm.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LEARNLM_API_KEY}`
      },
      body: JSON.stringify({
        model: "learnlm-1.5-pro-experimental",
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    return response.json();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return callAIWithRetry(messages, retries + 1);
    }
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { 
      message,
      sessionId,
      duration,
      mode = 'practice' 
    }: {
      message: Message & { audioUrl?: string };
      sessionId?: string;
      duration?: number;
      mode?: 'practice' | 'test';
    } = await request.json();

    // Get or create session
    let session = sessionId ? 
      await prisma.speakingSession.findUnique({
        where: { id: sessionId },
        include: {
          messages: true
        }
      }) :
      await prisma.speakingSession.create({
        data: {
          duration: duration || 0,
          userId: 'default', // Replace with actual user ID
        },
        include: {
          messages: true
        }
      });

    if (!session) {
      throw new Error('Session not found');
    }

    // Check if this is a session end request
    const isSessionEnd = (message.role as string) === 'system' && 
      message.content.includes('has finished please give feedback in json');

    // Prepare the messages for AI
    const messages: AIMessage[] = [
      { role: 'system', content: SYSTEM_INSTRUCTION }
    ];

    // Add conversation history (last 5 messages for context)
    if (session.messages) {
      const recentMessages: AIMessage[] = session.messages
        .slice(-5)
        .map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content
        }));
      messages.push(...recentMessages);
    }

    // Add current message
    if (message.audioUrl) {
      messages.push({
        role: 'user',
        content: 'Audio response received' // Simple indicator for audio
      });
    } else {
      messages.push({
        role: 'user',
        content: message.content
      });
    }

    // Call AI API with retry mechanism
    const aiResponse = await callAIWithRetry(messages);
    
    // Store the message in database
    await prisma.speakingMessage.create({
      data: {
        content: message.content || 'Audio message sent',
        role: 'user',
        sessionId: session.id,
        responseTime: 0,
        wordCount: message.content ? message.content.split(' ').length : 0
      }
    });

    // Store AI response
    await prisma.speakingMessage.create({
      data: {
        content: aiResponse.choices[0].message.content,
        role: 'assistant',
        sessionId: session.id
      }
    });

    // Parse metrics if this is session end
    let metrics: SessionMetrics | null = null;
    if (isSessionEnd) {
      try {
        const jsonMatch = aiResponse.choices[0].message.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          metrics = JSON.parse(jsonMatch[0]);
          
          // Store metrics
          if (metrics && metrics.scores) {
            await prisma.speakingMetrics.create({
              data: {
                sessionId: session.id,
                pronunciation: metrics.scores.pronunciation,
                grammar: metrics.scores.grammar,
                vocabulary: metrics.scores.vocabulary,
                fluency: metrics.scores.fluency,
                coherence: metrics.scores.coherence,
                averageResponseTime: 0,
                totalMessages: session.messages.length,
                uniqueWords: 0 // Calculate this if needed
              }
            });
          }
        }
      } catch (err) {
        console.log('Metrics parsing error:', err);
      }
    }

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: aiResponse.choices[0].message.content
      },
      metrics,
      sessionId: session.id
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
