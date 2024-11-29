import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || '');
const model = genAI.getGenerativeModel({ model: "learnlm-1.5-pro-experimental" });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Kiểm tra nếu là request khởi tạo phiên
    const isInitial = formData.get('isInitial');
    if (isInitial) {
      const template = JSON.parse(formData.get('template') as string);
      const chat = await model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 4000,
        },
      });

      const result = await chat.sendMessage(template.systemPrompt);
      return NextResponse.json({
        response: template.initialQuestion,
        messageId: result.response.text,
      });
    }

    // Xử lý audio response
    const audio = formData.get('audio') as Blob;
    const template = formData.get('template') ? 
      JSON.parse(formData.get('template') as string) : 
      null;

    if (!audio) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // TODO: Convert audio to text using your preferred service
    const transcribedText = "This is my response: [Transcribed audio text here]";

    const chat = await model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 4000,
      },
    });

    // Nếu có template, append system prompt
    if (template) {
      await chat.sendMessage(template.systemPrompt);
    }

    const result = await chat.sendMessage(transcribedText);
    
    return NextResponse.json({
      response: result.response.text,
    });

  } catch (error) {
    console.error('Error in speaking chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
