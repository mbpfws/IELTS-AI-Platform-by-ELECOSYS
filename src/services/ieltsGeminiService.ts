import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';

interface SessionConfig {
  userName: string;
  templatePrompt: string;
  sessionId: string;
  duration?: number;
}

interface SessionResponse {
  message: string;
  session_id: string;
  metrics?: {
    fluency: number;
    lexical: number;
    grammar: number;
    pronunciation: number;
  };
}

interface SessionState {
  timeRemaining: number;
  isRecording: boolean;
  currentMode: 'audio' | 'text';
  metrics: {
    fluency: number;
    lexical: number;
    grammar: number;
    pronunciation: number;
  };
  notes: string[];
  currentPart: number;
  templateContent: string;
  lastQuestion: string;
  conversationHistory: { role: 'user' | 'assistant', content: string }[];
}

class IELTSGeminiService {
  private model;
  private chatSession;
  private currentSessionId: string | null = null;
  private sessionState: SessionState | null = null;
  private sessionTimer: NodeJS.Timeout | null = null;
  private readonly systemInstruction = `You are an expert IELTS Speaking tutor proficient in interacting with Vietnamese learners of all levels. You possess the ability to seamlessly transition between the roles of a language teacher, and a dedicated tutor. You understand the challenges Vietnamese learners face and can adapt your instruction to their specific needs, including utilizing bilingual explanations for low-level learners.
**As a Language Teacher:**
* **Diagnose Learner Needs:** Begin by understanding the learner's current IELTS speaking band score (or estimated level) and their target score. Identify their strengths and weaknesses across the four criteria.  Consider their native language (Vietnamese) and any specific challenges they might face due to language transfer.
* **Adaptive Teaching Techniques:** Employ various teaching methodologies based on the learner's needs and learning style. This includes:
    * **Direct Instruction:** Explain specific grammar rules, vocabulary, or pronunciation concepts relevant to IELTS speaking. **For low-level learners, provide explanations and examples in both English and Vietnamese when necessary to ensure understanding.**  Use Vietnamese to clarify complex concepts or illustrate subtle differences between English and Vietnamese.
    * **Guided Practice:** Provide structured exercises and activities like topic brainstorming, idea generation, and answer structuring.  Encourage learners to verbalize their thoughts in Vietnamese if it helps them formulate their ideas before expressing them in English.
    * **Communicative Activities:** Engage learners in role-plays, discussions, and debates to practice spontaneous speaking. Allow learners to initially use Vietnamese if they struggle to express themselves fluently in English, gradually transitioning to full English use.
    * **Feedback and Error Correction:** Offer constructive feedback focusing on areas for improvement, using clear examples and explanations. **For low-level learners, use Vietnamese to explain the nature of errors and suggest corrections, if needed.**  Point out common mistakes Vietnamese speakers make and provide targeted strategies for overcoming them.
* **Targeted Criteria Practice:** Design activities that specifically focus on improving each of the four assessment criteria.  Adapt these activities to suit the needs of Vietnamese learners, incorporating bilingual support where appropriate.
* You can accurately assess a learner's speaking proficiency based on the four IELTS speaking criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.  
* When asked to evaluate a response, provide a band score and detailed feedback referencing specific examples from the learner's speech related to each of the four criteria.  

**As a Tutor:**

* **Homework Guidance:** Provide clear instructions and support for completing homework assignments. Offer bilingual support for low-level learners to ensure they understand the task requirements.
* **Practice Activities:** Offer a wide range of practice exercises, including sample questions, past papers, and speaking prompts. Provide Vietnamese translations or explanations for tasks or prompts as needed for low-level learners.
* **Personalized Feedback:** Give detailed and individualized feedback on homework and practice activities, highlighting strengths and areas needing improvement, always referencing the four criteria. Use Vietnamese to clarify feedback for low-level learners when necessary.
* **Language Knowledge Revision:**  Offer resources and guidance on relevant grammar, vocabulary, and pronunciation topics for the IELTS exam. Consider providing resources that compare and contrast English and Vietnamese grammar and pronunciation.  


**Example Bilingual Approach (for Low-Level Learners):**
* **Vocabulary:** "The word 'environment' in English is 'môi trường' in Vietnamese.  Can you use 'môi trường' in a Vietnamese sentence? Now, try to use 'environment' in an English sentence."
* **Grammar:**  "'Thì hiện tại hoàn thành' in Vietnamese is like the present perfect tense in English. Remember, we use 'have' or 'has' with the past participle."

By incorporating bilingual support and understanding the specific needs of Vietnamese learners, you will effectively guide them towards achieving their desired IELTS speaking band score. Remember to gradually reduce reliance on Vietnamese as the learner progresses.`;

  constructor() {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set');
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      this.model = genAI.getGenerativeModel({ 
        model: "learnlm-1.5-pro-experimental",
        generationConfig: {
          maxOutputTokens: 8000,
          temperature: 0.8,
          topP: 0.8,
          topK: 40
        }
      });
    } catch (error) {
      console.error('Error initializing Gemini service:', error);
      throw new Error('Failed to initialize AI service. Please check your API key and try again.');
    }
  }

  private async convertAudioToText(audioData: Blob): Promise<string> {
    try {
      // Convert Blob to base64
      const buffer = await audioData.arrayBuffer();
      const base64Audio = Buffer.from(buffer).toString('base64');
      
      // Use the existing model instance
      const result = await this.model.generateContent({
        contents: [{
          role: 'user',
          parts: [
            { text: "Please transcribe this audio accurately. Transcribe the audio, ignore any background noise, don't autocorrect anything." },
            {
              inlineData: {
                mimeType: "audio/mp3",
                data: base64Audio
              }
            }
          ]
        }]
      });

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error converting audio to text:', error);
      // Return empty string if transcription fails
      return "";
    }
  }

  async processAudioResponse(audioData: Blob): Promise<SessionResponse> {
    try {
      if (!this.chatSession || !this.sessionState || !this.currentSessionId) {
        throw new Error('Session not initialized');
      }

      const transcribedText = await this.convertAudioToText(audioData);
      
      if (!transcribedText) {
        console.warn('Audio transcription failed, using fallback text');
        return this.processFallbackText("I couldn't hear that clearly. Could you repeat that?");
      }

      // Update conversation history
      this.sessionState.conversationHistory.push({
        role: 'user',
        content: transcribedText
      });

      const prompt = `Current Topic: ${this.getCurrentTopicFromTemplate()}
      Last Question: "${this.sessionState.lastQuestion}"
      Student's Response: "${transcribedText}"
      
      Previous exchanges: ${this.getLastFewExchanges(2)}

      Respond naturally as a tutor, trainer. Flexible and adaptive. Reference to these:
      1. Briefly acknowledge their response
      2. If needed, give suggestion for improvement
      3. Ask ONE natural follow-up question
      4. Stay on topic but keep it conversational
      5. Adaptive Teaching Techniques:** Employ various teaching methodologies based on the learner's needs and learning style. This includes:
      6.Direct Instruction:** Explain specific grammar rules, vocabulary, or pronunciation concepts relevant to IELTS speaking. **For low-level learners, provide explanations and examples in both English and Vietnamese when necessary to ensure understanding.**  Use Vietnamese to clarify complex concepts or illustrate subtle differences between English and Vietnamese.
      7.Guided Practice:** Provide structured exercises and activities like topic brainstorming, idea generation, and answer structuring.  Encourage learners to verbalize their thoughts in Vietnamese if it helps them formulate their ideas before expressing them in English.
      8.Communicative Activities:** Engage learners in role-plays, discussions, and debates to practice spontaneous speaking. Allow learners to initially use Vietnamese if they struggle to express themselves fluently in English, gradually transitioning to full English use.
      9.Feedback and Error Correction:** Offer constructive feedback focusing on areas for improvement, using clear examples and explanations. **For low-level learners, use Vietnamese to explain the nature of errors and suggest corrections, if needed.**  Point out common mistakes Vietnamese speakers make and provide targeted strategies for overcoming them.
      10.Targeted Criteria Practice:** Design activities that specifically focus on improving each of the four assessment criteria.  Adapt these activities to suit the needs of Vietnamese learners, incorporating bilingual support where appropriate.
      
      Keep your response natural.`;

      const response = await this.chatSession.sendMessage(prompt);
      const responseText = response.response.text();

      // Update conversation history
      this.sessionState.conversationHistory.push({
        role: 'assistant',
        content: responseText
      });
      
      this.sessionState.lastQuestion = responseText;
      this.updateMetrics(responseText);

      return {
        message: responseText,
        session_id: this.currentSessionId,
        metrics: this.sessionState.metrics
      };
    } catch (error) {
      console.error('Error processing audio response:', error);
      return this.processFallbackText("Sorry, I didn't catch that. Could you try again?");
    }
  }

  private async processFallbackText(fallbackMessage: string): Promise<SessionResponse> {
    return {
      message: fallbackMessage,
      session_id: this.currentSessionId!,
      metrics: this.sessionState!.metrics
    };
  }

  async initializeSession(config: SessionConfig): Promise<SessionResponse> {
    try {
      const chat = this.model.startChat();
      
      // Set initial system context
      await chat.sendMessage(this.systemInstruction);
      
      // Start with template content but keep it natural
      const startSessionPrompt = `Template Content for Reference:
      ${config.templatePrompt}

      You are a friendly IELTS speaking tutor. Keep responses natural:
      1. Start with a simple welcome and the first topic
      2. Ask only ONE question at a time
      3. Stay focused on the current topic
      4. Be conversational, not too formal5. Adaptive Teaching Techniques:** Employ various teaching methodologies based on the learner's needs and learning style. This includes:
      6.Direct Instruction:** Explain specific grammar rules, vocabulary, or pronunciation concepts relevant to IELTS speaking. **For low-level learners, provide explanations and examples in both English and Vietnamese when necessary to ensure understanding.**  Use Vietnamese to clarify complex concepts or illustrate subtle differences between English and Vietnamese.
      7.Guided Practice:** Provide structured exercises and activities like topic brainstorming, idea generation, and answer structuring.  Encourage learners to verbalize their thoughts in Vietnamese if it helps them formulate their ideas before expressing them in English.
      8.Communicative Activities:** Engage learners in role-plays, discussions, and debates to practice spontaneous speaking. Allow learners to initially use Vietnamese if they struggle to express themselves fluently in English, gradually transitioning to full English use.
      9.Feedback and Error Correction:** Offer constructive feedback focusing on areas for improvement, using clear examples and explanations. **For low-level learners, use Vietnamese to explain the nature of errors and suggest corrections, if needed.**  Point out common mistakes Vietnamese speakers make and provide targeted strategies for overcoming them.
      10.Targeted Criteria Practice:** Design activities that specifically focus on improving each of the four assessment criteria.  Adapt these activities to suit the needs of Vietnamese learners, incorporating bilingual support where appropriate.
      
      Keep your response natural.
      

      Begin the session naturally, focusing on the first topic from the template.`;

      const response = await chat.sendMessage(startSessionPrompt);
      const responseText = response.response.text();

      this.chatSession = chat;
      this.currentSessionId = config.sessionId;
      this.sessionState = {
        timeRemaining: (config.duration || 15) * 60,
        isRecording: false,
        currentMode: 'audio',
        metrics: {
          fluency: 0,
          lexical: 0,
          grammar: 0,
          pronunciation: 0
        },
        notes: [],
        currentPart: 1,
        templateContent: config.templatePrompt,
        lastQuestion: responseText,
        conversationHistory: []
      };

      this.startSessionTimer();
      return {
        message: responseText,
        session_id: this.currentSessionId,
        metrics: this.sessionState.metrics
      };
    } catch (error) {
      console.error('Error initializing session:', error);
      throw error;
    }
  }

  async endSession(): Promise<SessionResponse> {
    try {
      if (!this.chatSession || !this.sessionState || !this.currentSessionId) {
        throw new Error('Session not initialized');
      }

      this.sessionTimer = null;

      const response = await this.chatSession.sendMessage(`
        The speaking practice session is now ending.
        Please provide:
        1. A comprehensive evaluation of the student's performance
        2. Key strengths and areas for improvement
        3. Suggested practice areas for future sessions
        4. Final IELTS band score estimates for each criterion
        
        Format the response with clear sections and bullet points.
      `);

      const responseText = response.response.text();

      const finalMetrics = { ...this.sessionState.metrics };
      const sessionNotes = [...this.sessionState.notes];

      // Update session via API
      await fetch('/api/sessions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: this.currentSessionId,
          updates: {
            metrics: finalMetrics,
            notes: sessionNotes,
            status: 'completed'
          }
        })
      });

      const sessionId = this.currentSessionId;
      this.currentSessionId = null;
      this.sessionState = null;
      this.chatSession = null;

      return {
        message: responseText,
        session_id: sessionId,
        metrics: finalMetrics
      };
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  }

  private startSessionTimer() {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }

    this.sessionTimer = setInterval(async () => {
      if (this.sessionState && this.sessionState.timeRemaining > 0) {
        this.sessionState.timeRemaining--;
        
        // Update session time remaining via API
        try {
          await fetch('/api/sessions', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sessionId: this.currentSessionId,
              updates: {
                timeRemaining: this.sessionState.timeRemaining
              }
            })
          });
        } catch (error) {
          console.error('Error updating session time:', error);
        }
        
        if (this.sessionState.timeRemaining === 0) {
          this.endSession();
        }
      }
    }, 1000);
  }

  private updateMetrics(aiResponse: string) {
    if (!this.sessionState) return;

    const metrics = {
      fluency: Math.min((this.sessionState.metrics.fluency + 0.5), 9),
      lexical: Math.min((this.sessionState.metrics.lexical + 0.5), 9),
      grammar: Math.min((this.sessionState.metrics.grammar + 0.5), 9),
      pronunciation: Math.min((this.sessionState.metrics.pronunciation + 0.5), 9)
    };

    this.sessionState.metrics = metrics;
  }

  async addNote(note: string): Promise<void> {
    if (!this.sessionState) {
      throw new Error('Session not initialized');
    }
    this.sessionState.notes.push(note);
  }

  toggleInputMode(): 'audio' | 'text' {
    if (!this.sessionState) {
      throw new Error('Session not initialized');
    }
    this.sessionState.currentMode = this.sessionState.currentMode === 'audio' ? 'text' : 'audio';
    return this.sessionState.currentMode;
  }

  private getCurrentTopicFromTemplate(): string {
    // Extract current topic from template based on conversation progress
    const topics = this.sessionState?.templateContent.split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.trim());
    
    return topics?.[this.sessionState?.currentPart - 1] || 'General Conversation';
  }

  private getLastFewExchanges(count: number): string {
    if (!this.sessionState?.conversationHistory) return '';
    
    return this.sessionState.conversationHistory
      .slice(-count * 2) // Get last few exchanges (each exchange is 2 messages)
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
  }
}

export const ieltsGeminiService = new IELTSGeminiService();
