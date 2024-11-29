import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const generationConfig = {
  temperature: 0.75,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 12192,
};

const BASE_INSTRUCTIONS = `You are a friendly and supportive IELTS Speaking Tutor. Your role is to:
1. First, acknowledge and encourage the student's efforts
2. Have a natural conversation about the topic
3. Gently point out 1-2 areas for improvement while highlighting what they did well
4. Provide specific examples and suggestions for practice
5. Ask follow-up questions to keep the conversation going

Remember to:
- Keep the tone conversational and supportive
- Focus on helping the student express themselves naturally
- Avoid overwhelming them with too many corrections
- Encourage them to expand their answers`;

async function processAudioToText(audio: Blob): Promise<string> {
  try {
    // For now, since we can't process audio directly, we'll return a placeholder
    // In a production environment, you would use a speech-to-text service here
    return "This is a placeholder transcription. In production, you would integrate with a speech-to-text service.";
  } catch (error) {
    console.error('Error processing audio to text:', error);
    throw new Error('Failed to process audio to text');
  }
}

async function formatTutorResponse(response: any) {
  try {
    const parsed = JSON.parse(response);
    
    // Create a conversational response
    let formattedResponse = '';
    
    // Add encouraging opener
    formattedResponse += "Thanks for sharing your thoughts! 😊\n\n";
    
    // Add main feedback in a conversational way
    if (parsed.feedback) {
      const { fluencyAndCoherence, lexicalResource, grammarAndAccuracy, pronunciation } = parsed.feedback;
      
      // Highlight positives first
      formattedResponse += "Here's what you did well:\n";
      formattedResponse += "• " + fluencyAndCoherence.split('.')[0] + "\n";
      formattedResponse += "• " + lexicalResource.split('.')[0] + "\n";
      
      // Then give 1-2 gentle suggestions
      formattedResponse += "\nLet's work on a couple of things to make your answer even better:\n";
      if (parsed.improvements && parsed.improvements.length > 0) {
        parsed.improvements.slice(0, 2).forEach((improvement: string) => {
          formattedResponse += "• " + improvement.replace(/\*\*[^*]+\*\*/g, '').trim() + "\n";
        });
      }
      
      // Add follow-up question to keep conversation going
      formattedResponse += "\nLet's practice more! Could you tell me more about...?\n";
    }
    
    return formattedResponse;
  } catch (error) {
    console.error('Error formatting tutor response:', error);
    return response;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set' },
        { status: 500 }
      );
    }

    // Handle session initialization
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const { sessionData, isSessionStart } = await request.json();
      
      if (isSessionStart) {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are a friendly IELTS Speaking tutor. The student wants to practice ${sessionData.topic.title} for ${sessionData.duration} minutes.
        
Topic description: ${sessionData.topic.description}

Generate a welcoming message that:
1. Introduces yourself as their tutor
2. Explains what they'll be practicing
3. Sets a comfortable, encouraging tone
4. Asks a specific opening question about the topic to start the conversation

${sessionData.topic.systemPrompt || ''}`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        return NextResponse.json(
          { success: true, response },
          { status: 200 }
        );
      }
    }

    const formData = await request.formData();
    const audio = formData.get('audio') as Blob | null;
    const transcription = formData.get('transcription') as string | null;
    const sessionDataRaw = formData.get('sessionData');

    if (!sessionDataRaw) {
      return NextResponse.json(
        { error: 'No session data provided' },
        { status: 400 }
      );
    }

    if (!audio && !transcription) {
      return NextResponse.json(
        { error: 'No audio or transcription provided' },
        { status: 400 }
      );
    }

    let sessionData;
    try {
      sessionData = JSON.parse(sessionDataRaw as string);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid session data format' },
        { status: 400 }
      );
    }

    const { topic } = sessionData;
    if (!topic || !topic.title) {
      return NextResponse.json(
        { error: 'Invalid topic data' },
        { status: 400 }
      );
    }

    let textToProcess = transcription;

    if (audio) {
      try {
        textToProcess = await processAudioToText(audio);
      } catch (error) {
        console.error('Error processing audio:', error);
        return NextResponse.json(
          { error: 'Failed to process audio file' },
          { status: 500 }
        );
      }
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig,
    });

    const chat = model.startChat({
      history: [],
    });

    const prompt = `${BASE_INSTRUCTIONS}

Topic: ${topic.title}
Description: ${topic.description}
Target Band Score: ${topic.targetBand}

Student's response: ${textToProcess}

Please analyze the response and provide:
1. A band score (0-9) for this response
2. Detailed feedback on:
   - Fluency and coherence
   - Lexical resource
   - Grammatical range and accuracy
   - Pronunciation
3. Specific examples from the response to support your feedback
4. Suggestions for improvement

Format your response in JSON:
{
  "bandScore": number,
  "feedback": {
    "fluencyAndCoherence": string,
    "lexicalResource": string,
    "grammarAndAccuracy": string,
    "pronunciation": string
  },
  "examples": string[],
  "improvements": string[]
}`;

    try {
      const result = await chat.sendMessage(prompt);
      const response = result.response;
      const text = response.text();
      
      // Format the response to be more conversational
      const formattedResponse = await formatTutorResponse(text);

      return NextResponse.json(
        { success: true, response: formattedResponse },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error processing with Gemini:', error);
      return NextResponse.json(
        { error: 'Failed to process with AI model' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
