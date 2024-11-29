  import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

export interface AudioAnalysis {
  transcription: string;
  feedback: {
    pronunciation: number;
    fluency: number;
    grammar: number;
    vocabulary: number;
    coherence: number;
  };
  suggestions: string[];
}

class AudioService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]); // Remove data URL prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async processAudio(audioBlob: Blob): Promise<AudioAnalysis> {
    try {
      if (!audioBlob) {
        throw new Error('No audio data provided');
      }

      const base64Audio = await this.blobToBase64(audioBlob);
      if (!base64Audio) {
        throw new Error('Failed to convert audio to base64');
      }

      const model = this.genAI.getGenerativeModel({ model: "learnlm-1.5-pro-experimental" });
      if (!model) {
        throw new Error('Failed to initialize generative model');
      }

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "audio/webm;codecs=opus",
            data: base64Audio
          }
        },
        { text: "This is the user's response." }
      ]);

      if (!result.response) {
        throw new Error('No response from model');
      }

      // Parse and structure the response
      const analysis: AudioAnalysis = {
        transcription: result.response.text() || '',
        feedback: {
          pronunciation: 0,
          fluency: 0,
          grammar: 0,
          vocabulary: 0,
          coherence: 0
        },
        suggestions: []
      };

      return analysis;
    } catch (error) {
      console.error('Error processing audio:', error);
      throw error;
    }
  }
}

export const audioService = new AudioService();