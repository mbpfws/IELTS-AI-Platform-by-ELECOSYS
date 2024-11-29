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
        { success: false, error: 'GEMINI_API_KEY is not set' },
        { status: 500 }
      );
    }

    const contentType = request.headers.get('content-type') || '';
    let requestData;

    if (contentType.includes('multipart/form-data')) {
      // Handle FormData request (audio submission)
      const formData = await request.formData();
      const audioFile = formData.get('audio') as Blob;
      const sessionDataStr = formData.get('sessionData') as string;

      if (!audioFile || !sessionDataStr) {
        return NextResponse.json(
          { success: false, error: 'Missing audio or session data' },
          { status: 400 }
        );
      }

      let sessionData;
      try {
        sessionData = JSON.parse(sessionDataStr);
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Invalid session data format' },
          { status: 400 }
        );
      }

      // Process the audio file
      const transcription = await processAudioToText(audioFile);
      
      // Generate AI response
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig,
      });

      const prompt = `${BASE_INSTRUCTIONS}

Topic: ${sessionData.topic.title}
Description: ${sessionData.topic.description}
Target Band Score: ${sessionData.topic.targetBand}

Student's response: ${transcription}

Please provide:
1. A natural, encouraging response to continue the conversation
2. A gentle correction of any major errors (if present)
3. A follow-up question to keep the discussion going

Format your response in a conversational way, focusing on keeping the student engaged.`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      return NextResponse.json({
        success: true,
        transcription,
        response
      }, { status: 200 });

    } else {
      // Handle JSON request (session initialization or text submission)
      try {
        requestData = await request.json();
      } catch (error) {
        console.error('Error parsing JSON request body:', error);
        return NextResponse.json(
          { success: false, error: 'Invalid JSON format' },
          { status: 400 }
        );
      }

      // Handle session initialization
      if (requestData.isSessionStart) {
        try {
          const { sessionData } = requestData;
          
          if (!sessionData || !sessionData.topic) {
            return NextResponse.json(
              { success: false, error: 'Invalid session data' },
              { status: 400 }
            );
          }

          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = `You are a friendly IELTS Speaking tutor. The student wants to practice ${sessionData.topic.title} for ${Math.floor(sessionData.duration / 60)} minutes.
        
Topic description: ${sessionData.topic.description}

Generate a welcoming message that:
1. Introduces yourself as their tutor
2. Explains what they'll be practicing
3. Sets a comfortable, encouraging tone
4. Asks a specific opening question about the topic to start the conversation

${sessionData.topic.systemPrompt || ''}`;

          const result = await model.generateContent(prompt);
          const response = result.response.text();

          if (!response) {
            throw new Error('No response from AI model');
          }

          return NextResponse.json(
            { success: true, response },
            { status: 200 }
          );
        } catch (error) {
          console.error('Error in session initialization:', error);
          return NextResponse.json(
            { 
              success: false, 
              error: 'Failed to initialize session',
              details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
          );
        }
      }

      // Handle text message
      if (requestData.message) {
        const { message, sessionData } = requestData;
        const model = genAI.getGenerativeModel({ 
          model: "gemini-pro",
          generationConfig,
        });

        const prompt = `${BASE_INSTRUCTIONS}

Topic: ${sessionData.topic.title}
Description: ${sessionData.topic.description}
Target Band Score: ${sessionData.topic.targetBand}

Student's message: ${message}

Please provide a natural, conversational response that:
1. Acknowledges their input
2. Provides gentle feedback if needed
3. Asks a relevant follow-up question`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        return NextResponse.json({
          success: true,
          response
        }, { status: 200 });
      }

      // Handle transcription processing
      const { transcription, sessionData: sessionDataRaw } = requestData;

      if (!sessionDataRaw) {
        return NextResponse.json(
          { success: false, error: 'No session data provided' },
          { status: 400 }
        );
      }

      if (!transcription) {
        return NextResponse.json(
          { success: false, error: 'No transcription provided' },
          { status: 400 }
        );
      }

      let sessionData;
      try {
        sessionData = typeof sessionDataRaw === 'string' ? JSON.parse(sessionDataRaw) : sessionDataRaw;
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Invalid session data format' },
          { status: 400 }
        );
      }

      const { topic } = sessionData;
      if (!topic || !topic.title) {
        return NextResponse.json(
          { success: false, error: 'Invalid topic data' },
          { status: 400 }
        );
      }

      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig,
      });

      const prompt = `${BASE_INSTRUCTIONS}

Topic: ${topic.title}
Description: ${topic.description}
Target Band Score: ${topic.targetBand}

Student's response: ${transcription}

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
  "improvements": [string]
}`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      const formattedResponse = await formatTutorResponse(response);

      return NextResponse.json(
        { 
          success: true, 
          response: formattedResponse,
          rawAnalysis: response 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request type' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Unexpected error in process-audio route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Unexpected server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
