import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const prompt = formData.get('prompt') as string;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: "learnlm-1.5-pro-experimental",
      generationConfig: {
        maxOutputTokens: 4000,
      },
    });

    // Convert audio to base64
    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');

    // Process with Google AI
    const result = await model.generateContent([
      {
        text: prompt || "This is my response:",
      },
      {
        inlineData: {
          mimeType: "audio/webm;codecs=opus",
          data: base64Audio
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    // Return the AI response
    return NextResponse.json({
      nextPrompt: text,
      metrics: {
        fluency: calculateMetric(text, 'fluency'),
        vocabulary: calculateMetric(text, 'vocabulary'),
        grammar: calculateMetric(text, 'grammar'),
        pronunciation: calculateMetric(text, 'pronunciation')
      }
    });

  } catch (error) {
    console.error('Error processing audio:', error);
    return NextResponse.json(
      { error: 'Error processing audio' },
      { status: 500 }
    );
  }
}

// Helper function to calculate metrics (placeholder implementation)
function calculateMetric(text: string, type: string): number {
  // This should be implemented with proper analysis
  // For now, return a random score between 6 and 9
  return Math.floor(Math.random() * 3) + 6;
}
