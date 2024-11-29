import { GoogleGenerativeAI } from '@google/generative-ai';

export class AudioService {
  private static instance: AudioService;
  private genAI: GoogleGenerativeAI;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: BlobPart[] = [];

  private constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      throw new Error('Failed to start recording');
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioChunks = [];
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  async processAudio(audioBlob: Blob, mode: 'conversation' | 'scoring' = 'conversation', context?: string): Promise<string> {
    try {
      // Convert audio blob to base64
      const base64Audio = await this.blobToBase64(audioBlob);

      // Initialize model
      const model = this.genAI.getGenerativeModel({
        model: "learnlm-1.5-pro-experimental",
      });

      // Different prompts for different modes
      let prompt = mode === 'conversation' 
        ? 'Please transcribe this audio and respond naturally as a conversation partner.'
        : `Please analyze this speaking response and provide feedback in both English and Vietnamese. Focus on:
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
          }`;

      // Add context to the prompt if provided
      if (context && mode === 'conversation') {
        prompt = `${context}\n\nPlease transcribe this audio and respond naturally as a conversation partner based on the context above.`;
      }

      // Generate content
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "audio/wav",
            data: base64Audio
          }
        },
        { text: prompt }
      ]);

      return result.response.text();
    } catch (error) {
      console.error('Error processing audio:', error);
      throw error;
    }
  }

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    try {
      const base64Audio = await this.blobToBase64(audioBlob);
      const model = this.genAI.getGenerativeModel({
        model: "learnlm-1.5-pro-experimental",
      });

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "audio/wav",
            data: base64Audio
          }
        },
        { text: "Please transcribe this audio accurately." }
      ]);

      return result.response.text();
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  }

  async analyzeAudio(audioBlob: Blob): Promise<string> {
    try {
      const base64Audio = await this.blobToBase64(audioBlob);
      const model = this.genAI.getGenerativeModel({
        model: "learnlm-1.5-pro-experimental",
      });

      const prompt = `Please analyze this audio and provide feedback on:
1. Pronunciation
2. Grammar
3. Vocabulary
4. Fluency
5. Coherence

Provide a summary and scores for each category.`;

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "audio/wav",
            data: base64Audio
          }
        },
        { text: prompt }
      ]);

      return result.response.text();
    } catch (error) {
      console.error('Error analyzing audio:', error);
      throw error;
    }
  }

  async uploadAudio(audioBlob: Blob): Promise<string> {
    try {
      // Generate a unique filename using UUID
      const filename = `audio_${Date.now()}.webm`;
      
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', audioBlob, filename);
      
      // Upload to your backend API
      const response = await fetch('/api/upload/audio', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Audio upload failed');
      }
      
      const result = await response.json();
      return result.url; // Assuming the backend returns the URL of the uploaded file
    } catch (error) {
      console.error('Error uploading audio:', error);
      throw error;
    }
  }

  async getFeedback(text: string): Promise<{
    pronunciation: string[];
    grammar: string[];
    vocabulary: string[];
  }> {
    try {
      const response = await fetch('/api/analyze-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get feedback');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting feedback:', error);
      throw error;
    }
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(',')[1];
        resolve(base64data || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export const audioService = AudioService.getInstance();
