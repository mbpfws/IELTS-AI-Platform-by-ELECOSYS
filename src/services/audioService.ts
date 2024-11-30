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

export class AudioService {
  private genAI: GoogleGenerativeAI;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

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

  async uploadAudio(audioBlob: Blob): Promise<string> {
    try {
      const base64Audio = await this.blobToBase64(audioBlob);
      if (!base64Audio) {
        throw new Error('Failed to convert audio to base64');
      }
      // For now, we'll just return a mock URL since we don't have actual file upload yet
      return `data:audio/wav;base64,${base64Audio}`;
    } catch (error) {
      console.error('Error uploading audio:', error);
      throw error;
    }
  }

  async startRecording(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Recording is only available in browser');
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
  }

  async stopRecording(): Promise<Blob> {
    if (!this.mediaRecorder) {
      throw new Error('No recording in progress');
    }

    return new Promise((resolve, reject) => {
      this.mediaRecorder!.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        resolve(audioBlob);
      };

      this.mediaRecorder!.onerror = (event) => {
        reject(new Error('Recording error'));
      };

      this.mediaRecorder!.stop();
      this.mediaRecorder = null;
    });
  }
}

export const audioService = new AudioService();