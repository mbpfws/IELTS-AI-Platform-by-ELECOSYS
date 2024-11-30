import { GoogleGenerativeAI } from '@google/generative-ai';
import { databaseService } from './databaseService';
import { v4 as uuidv4 } from 'uuid';

interface SessionConfig {
  userName: string;
  templatePrompt: string;
  templateId: string;
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

class IELTSGeminiService {
  private model;
  private chatSession;
  private currentSessionId: string | null = null;
  private readonly systemInstruction = `You are an expert IELTS Speaking tutor proficient in interacting with Vietnamese learners of all levels. You possess the ability to seamlessly transition between the roles of an examiner, a language teacher, and a dedicated tutor. You understand the challenges Vietnamese learners face and can adapt your instruction to their specific needs, including utilizing bilingual explanations for low-level learners.

**As an Examiner:**

* You can accurately assess a learner's speaking proficiency based on the four IELTS speaking criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.  
* When asked to evaluate a response, provide a band score and detailed feedback referencing specific examples from the learner's speech related to each of the four criteria.  
* You can conduct mock speaking tests, simulating the real IELTS speaking exam environment.

**As a Language Teacher:**

* **Diagnose Learner Needs:** Begin by understanding the learner's current IELTS speaking band score (or estimated level) and their target score. Identify their strengths and weaknesses across the four criteria.  Consider their native language (Vietnamese) and any specific challenges they might face due to language transfer.
* **Adaptive Teaching Techniques:** Employ various teaching methodologies based on the learner's needs and learning style. This includes:
    * **Direct Instruction:** Explain specific grammar rules, vocabulary, or pronunciation concepts relevant to IELTS speaking. **For low-level learners, provide explanations and examples in both English and Vietnamese when necessary to ensure understanding.**  Use Vietnamese to clarify complex concepts or illustrate subtle differences between English and Vietnamese.
    * **Guided Practice:** Provide structured exercises and activities like topic brainstorming, idea generation, and answer structuring.  Encourage learners to verbalize their thoughts in Vietnamese if it helps them formulate their ideas before expressing them in English.
    * **Communicative Activities:** Engage learners in role-plays, discussions, and debates to practice spontaneous speaking. Allow learners to initially use Vietnamese if they struggle to express themselves fluently in English, gradually transitioning to full English use.
    * **Feedback and Error Correction:** Offer constructive feedback focusing on areas for improvement, using clear examples and explanations. **For low-level learners, use Vietnamese to explain the nature of errors and suggest corrections, if needed.**  Point out common mistakes Vietnamese speakers make and provide targeted strategies for overcoming them.
* **Targeted Criteria Practice:** Design activities that specifically focus on improving each of the four assessment criteria.  Adapt these activities to suit the needs of Vietnamese learners, incorporating bilingual support where appropriate.

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
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    this.model = genAI.getGenerativeModel({
      model: "learnlm-1.5-pro-experimental",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 5000,
      },
      tools: [{codeExecution: {}}],
    });
  }

  async initializeSession(config: SessionConfig): Promise<SessionResponse> {
    try {
      if (!config.templateId || !config.userName || !config.templatePrompt) {
        throw new Error('Missing required session configuration');
      }

      // Create a new chat session with proper history order
      this.chatSession = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ 
              text: `I am a student preparing for IELTS speaking test. ${config.templatePrompt}. My name is ${config.userName}, and I would like to start a tutoring session of ${config.duration || 15} minutes learning about this.` 
            }]
          }
        ]
      });

      // Get the initial response
      const result = await this.chatSession.sendMessage({ text: "Please introduce yourself as my IELTS tutor and explain how this session will proceed." });
      const response = result.response;
      const text = response.text();

      // Create the first message in the database
      await databaseService.addMessageToSession({
        sessionId: config.templateId,
        content: text,
        role: 'assistant'
      });

      return {
        message: text,
        session_id: config.templateId,
        metrics: {
          fluency: 0,
          lexical: 0,
          grammar: 0,
          pronunciation: 0,
        },
      };
    } catch (error) {
      console.error('Error initializing session:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to initialize session');
    }
  }

  async processMessage(content: string, isAudio: boolean = false): Promise<SessionResponse> {
    try {
      if (!this.chatSession || !this.currentSessionId) {
        throw new Error('No active session. Please start a new session first.');
      }

      // Create user message in database
      await databaseService.createMessage({
        session_id: this.currentSessionId,
        content,
        role: 'user'
      });

      // Process with Gemini
      const result = await this.chatSession.sendMessage({
        role: "user",
        parts: [{ text: isAudio ? "This is my response" : content }]
      });
      const response = result.response;
      const text = response.text();

      // Create assistant message in database
      await databaseService.createMessage({
        session_id: this.currentSessionId,
        content: text,
        role: 'assistant'
      });

      // Extract metrics if this was an audio response
      let metrics;
      if (isAudio) {
        metrics = this.extractMetrics(text);
        if (metrics) {
          await databaseService.updateSessionMetrics(this.currentSessionId, metrics);
        }
      }

      return {
        message: text,
        session_id: this.currentSessionId,
        metrics,
      };
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }

  private extractMetrics(text: string): SessionResponse['metrics'] | undefined {
    try {
      const metricsMatch = text.match(/Band Score.*?(\d+(\.\d+)?)/g);
      if (metricsMatch) {
        const metrics = {
          fluency: 0,
          lexical: 0,
          grammar: 0,
          pronunciation: 0,
        };

        metricsMatch.forEach(match => {
          if (match.toLowerCase().includes('fluency')) {
            metrics.fluency = parseFloat(match.match(/\d+(\.\d+)?/)[0]);
          } else if (match.toLowerCase().includes('lexical')) {
            metrics.lexical = parseFloat(match.match(/\d+(\.\d+)?/)[0]);
          } else if (match.toLowerCase().includes('grammar')) {
            metrics.grammar = parseFloat(match.match(/\d+(\.\d+)?/)[0]);
          } else if (match.toLowerCase().includes('pronunciation')) {
            metrics.pronunciation = parseFloat(match.match(/\d+(\.\d+)?/)[0]);
          }
        });

        return metrics;
      }
    } catch (error) {
      console.error('Error extracting metrics:', error);
    }
    return undefined;
  }

  async endSession(): Promise<void> {
    try {
      if (this.currentSessionId) {
        // Get final feedback
        const result = await this.chatSession.sendMessage({
          role: "user",
          parts: [{ text: "ok have overall feedback for the today's session please" }]
        });
        const response = result.response;
        const text = response.text();

        // Create final message in database
        await databaseService.createMessage({
          session_id: this.currentSessionId,
          content: text,
          role: 'assistant'
        });

        // Extract final metrics if any
        const metrics = this.extractMetrics(text);
        if (metrics) {
          await databaseService.updateSessionMetrics(this.currentSessionId, metrics);
        }

        // End the session
        await databaseService.endSession(this.currentSessionId);
        this.currentSessionId = null;
        this.chatSession = null;
      }
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  }
}

export const ieltsGeminiService = new IELTSGeminiService();
