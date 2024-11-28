import { GoogleGenerativeAI } from "@google/generative-ai";

export class AudioService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not found');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async analyzeAudio(audioBlob: Blob): Promise<string> {
    try {
      // Convert Blob to Base64
      const base64Audio = await this.blobToBase64(audioBlob);

      // Initialize model
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
      });

      // Generate content using the audio file
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "audio/wav",
            data: base64Audio
          }
        },
        { 
          text: `Please analyze this speaking response and provide feedback in both English and Vietnamese. Focus on:
          1. Pronunciation and Intonation
          2. Grammar and Vocabulary
          3. Fluency and Coherence
          4. Task Achievement
          
          Also include a JSON metrics object at the end with this structure:
          {
            "scores": {
              "pronunciation": number (0-9),
              "grammar": number (0-9),
              "vocabulary": number (0-9),
              "fluency": number (0-9),
              "coherence": number (0-9)
            },
            "overallBand": number (0-9),
            "feedback": {
              "strengths": string[],
              "improvements": string[],
              "tips": string[]
            },
            "nextSteps": string[]
          }`
        },
      ]);

      return result.response.text();
    } catch (error) {
      console.error('Error analyzing audio:', error);
      throw error;
    }
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // Remove data URL prefix (e.g., "data:audio/wav;base64,")
          const base64Data = reader.result.split(',')[1];
          resolve(base64Data);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
