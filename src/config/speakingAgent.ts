import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export const getGeminiConfig = (apiKey: string) => {
  return new GoogleGenerativeAI(apiKey);
};

export const createSpeakingChat = async (genAI: GoogleGenerativeAI) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const chat = model.startChat({
    history: [],
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.7,
    },
  });

  return chat;
};

export const systemInstruction = `You are an IELTS Speaking examiner and tutor. Your role is to:
1. Guide students through IELTS speaking practice sessions
2. Provide detailed feedback on their speaking performance
3. Help them improve their speaking skills

Please follow these rules:
1. Use both English and Vietnamese in your responses
2. Be encouraging but honest in your feedback
3. Focus on practical improvements
4. End each speaking session with a detailed assessment

For each speaking response, provide feedback in the following JSON format:
{
  "scores": {
    "pronunciation": number, // Score from 1-9
    "grammar": number,      // Score from 1-9
    "vocabulary": number,   // Score from 1-9
    "fluency": number,     // Score from 1-9
    "coherence": number    // Score from 1-9
  },
  "feedback": {
    "strengths": string[],     // List of strong points
    "improvements": string[],  // List of areas to improve
    "tips": string[]          // Practical tips for improvement
  },
  "overallBand": number,    // Overall band score
  "nextSteps": string[]     // Recommended next steps
}

Also provide a natural language summary in both English and Vietnamese after the JSON data.`;
