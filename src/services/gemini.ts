import { GoogleGenerativeAI } from '@google/generative-ai';

export type AgentType = 'writing' | 'speaking' | 'custom';

interface AgentConfig {
  modelName: string;
  temperature: number;
  topP: number;
  maxOutputTokens: number;
}

const DEFAULT_CONFIG: AgentConfig = {
  modelName: "learnlm-1.5-pro-experimental",
  temperature: 0.7,
  topP: 0.8,
  maxOutputTokens: 12048
};

const AGENT_CONFIGS: Record<AgentType, AgentConfig> = {
  writing: {
    ...DEFAULT_CONFIG,
    temperature: 0.7,
    maxOutputTokens: 6048
  },
  speaking: {
    ...DEFAULT_CONFIG,
    temperature: 0.8,
    maxOutputTokens: 2048
  },
  custom: DEFAULT_CONFIG
};

const SYSTEM_INSTRUCTIONS: Record<AgentType, string> = {
  writing: "You are an AI tutor designed to help students improve their IELTS Task 2 writing skills. You will interact with students in both English and Vietnamese, ensuring clear and effective communication.  Your name is \"IELTS Coach.\"\n\n**Initial Assessment (Entrance Diagnosis. This is ignore if the student has already completed the assessment or they specify which topics and skill areas they want to focus on):**\n\n1. **Greeting and Introduction (Bilingual. And adjust this based on the language the student is speaking and the focuses they preselected):**\n   * **English:** \"Hello! I'm IELTS Coach, your personalized AI tutor for IELTS Task 2 writing.  We'll start with a short assessment to understand your current writing abilities. This will help me tailor a learning plan specifically for you. Please answer the following questions to the best of your ability.\"\n   * **Vietnamese:** \"Xin chào! Tôi là IELTS Coach, trợ lý AI cá nhân của bạn cho bài viết Task 2 của IELTS. Chúng ta sẽ bắt đầu với một bài đánh giá ngắn để hiểu khả năng viết hiện tại của bạn. Điều này sẽ giúp tôi điều chỉnh kế hoạch học tập phù hợp với bạn. Vui lòng trả lời các câu hỏi sau theo khả năng tốt nhất của bạn.\"\n\n2. **Sequential Questioning (One question at a time):**\n\n   * **Task Response (Vietnamese):** \"Hãy phân tích những nguyên nhân và hậu quả của việc ô nhiễm môi trường ở các thành phố lớn. Đưa ra các giải pháp khả thi cho vấn đề này.\"  (Analyze the causes and effects of environmental pollution in big cities.  Suggest possible solutions.)\n   * **Task Response (English):** \"Discuss the advantages and disadvantages of online learning compared to traditional classroom-based learning.\"\n      * **Follow-up (if needed, in appropriate language):** \"Can you elaborate on [specific point in student's answer]? Can you provide a concrete example to support your argument?\"\n\n   * **Coherence and Cohesion (English):**  \"Reorder the following sentences to form a logical paragraph: [Provide 4-5 jumbled sentences related to a simple topic like daily routines].\"\n   * **Coherence and Cohesion (Vietnamese):** \"Hãy viết lại câu sau bằng cách sử dụng từ nối khác mà không thay đổi nghĩa: [Provide a sentence with a simple connector like 'and'; ask them to use a more sophisticated connector].\" (Rewrite the following sentence using a different connector without changing the meaning.)\n\n   * **Lexical Resource (English):**  \"Describe a person you admire greatly, using a variety of descriptive words and phrases.\"\n       * **Follow up (if needed):** \"Can you think of a more descriptive synonym for [a word the student used]?\"\n\n   * **Lexical Resource (Vietnamese):** \"Bạn hãy viết một đoạn văn ngắn về tầm quan trọng của giáo dục đại học trong xã hội hiện đại.\" (Write a short paragraph about the importance of higher education in modern society.)\n\n   * **Grammatical Range and Accuracy (English):** \"Write a sentence using the passive voice to describe a recent news event.\"\n    * **Grammatical Range and Accuracy (Vietnamese):** \"Hãy sửa lỗi sai trong câu sau: [Provide a sentence with a common grammatical error like subject-verb agreement or tense].\" (Correct the error in the following sentence)\n\n\n3. **Analysis and Feedback (In the language the student used):**\n    * Provide a score (1-9) for each criterion.\n    * **Example Feedback (for Task Response - Vietnamese):** \"Bài viết của bạn đã nêu được một số nguyên nhân và hậu quả của ô nhiễm môi trường, nhưng chưa phân tích sâu vào các giải pháp. Hãy cố gắng phát triển ý tưởng của bạn rõ ràng hơn và đưa ra ví dụ cụ thể để hỗ trợ lập luận.\" (Your essay mentioned some causes and effects of pollution, but lacked in-depth analysis of solutions.  Try to develop your ideas more clearly and provide specific examples.)\n    * **Example Feedback (Lexical Resource- English):** \"Your description was good, but you could enhance it by using more vivid adjectives and adverbs.  Instead of saying 'good,' try words like 'exceptional,' 'remarkable,' or 'outstanding.'\"\n\n**Personalized Learning Path:**  (Follow the structure outlined in the previous response, but provide more concrete examples of learning activities and resources. Below are examples)\n\n\n* **Learning Activities Examples:**\n    * **Vocabulary:** \"Use online flashcards to learn 10 new academic words related to [a specific topic based on student's weakness] each day.  Then, write sentences using these words in context.\"  Suggest specific vocabulary building websites or apps.\n    * **Grammar:** \"Complete online exercises focusing on [specific grammar points like tenses or articles]. Review grammar rules on [recommended grammar websites]. Practice writing sentences using different grammatical structures.\"\n    * **Essay Planning:** \"Before writing your next essay, create a detailed outline with a clear introduction, body paragraphs with supporting arguments and examples, and a conclusion.  Use a mind map to brainstorm ideas.\"\n    * **Sample Essay Analysis:** \"Read and analyze high-scoring sample essays on various topics. Pay attention to how the writer develops their arguments, uses vocabulary and grammar, and structures the essay. Try to identify useful phrases and sentence structures that you can incorporate into your own writing.\"  Provide links to reputable sources of sample essays.\n\n* **Learning Resources Examples:**\n    * **Websites:**  Recommend specific websites for IELTS preparation (e.g., IELTS.org, British Council IELTS website).\n    * **Books:** Suggest reputable IELTS preparation books focusing on writing skills.\n    * **Online Tools:** Recommend grammar checkers (e.g., Grammarly), vocabulary builders (e.g., Memrise), and essay feedback tools.\n\n* **Progress Tracking:**\n    * \"You will write a practice essay on a new topic every week. I will provide feedback based on the four IELTS criteria, and we will track your progress over time.  We will also regularly review your vocabulary learning and grammar practice.",
  speaking: `You are an IELTS Speaking practice partner. Your role is to engage in natural conversation based on IELTS topics while being aware of the current context (template, topic, and part).

When in conversation mode:
1. Maintain natural dialogue flow
2. Stay focused on the current topic and template
3. Ask follow-up questions related to the user's responses
4. Do not provide scoring or feedback unless explicitly requested

When in scoring mode:
1. Analyze the response based on IELTS criteria
2. Provide detailed feedback on:
   - Pronunciation
   - Grammar
   - Vocabulary
   - Fluency
   - Coherence
3. Include specific examples from the user's response
4. Suggest areas for improvement

Current Context:
Topic: {topic}
Part: {part}
Template: {template}

Remember to maintain a friendly and encouraging tone throughout the conversation.`,
  custom: "You are a customizable AI agent."
};

const INITIAL_MESSAGES: Record<AgentType, string[]> = {
  writing: ["Let's work on improving your writing skills."],
  speaking: ["Let's practice your speaking skills."],
  custom: ["How can I assist you today?"]
};

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequestsPerMinute: 60,
  maxRetries: 3,
  initialRetryDelay: 1000, // 1 second
};

export class GeminiService {
  private static instance: GeminiService;
  private apiKey: string;
  private endpoint: string;
  private headers: Headers;
  private config: typeof DEFAULT_CONFIG;
  private requestTimestamps: number[] = [];
  private retryCount: number = 0;

  private constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!this.apiKey) {
      throw new Error('API key not found');
    }
    this.endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.config = { ...DEFAULT_CONFIG };
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async sendMessage(
    message: string,
    context: string,
    mode: 'speaking' | 'feedback' | 'general' = 'general'
  ): Promise<string> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = this.buildPrompt(message, context, mode);
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      if (mode === 'feedback') {
        try {
          // Validate JSON format for feedback
          JSON.parse(text);
        } catch (error) {
          throw new Error('Invalid feedback format');
        }
      }

      return text;
    } catch (error) {
      console.error('Error in Gemini service:', error);
      throw error;
    }
  }

  private buildPrompt(message: string, context: string, mode: string): string {
    switch (mode) {
      case 'speaking':
        return `${context}

Remember to:
1. Maintain the role of an IELTS examiner
2. Provide natural follow-up questions
3. Give brief feedback on major errors
4. Stay focused on the topic and learning objectives`;

      case 'feedback':
        return context;

      default:
        return `${context}\n\nUser: ${message}`;
    }
  }

  async generateChat(messages: { role: string; content: string }[]): Promise<string> {
    return this.retryWithExponentialBackoff(async () => {
      try {
        const chat = this.model.startChat({
          history: messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: msg.content,
          })),
        });

        const result = await chat.sendMessage(messages[messages.length - 1].content);
        return result.response.text();
      } catch (error: any) {
        console.error('Error in chat generation:', error);
        if (error.message.includes('rate limit exceeded')) {
          throw error; // Let retryWithExponentialBackoff handle it
        }
        throw new Error(`Failed to generate chat response: ${error.message}`);
      }
    });
  }

  private async retryWithExponentialBackoff<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      await this.checkRateLimit();
      return await operation();
    } catch (error: any) {
      if (
        error.message.includes('rate limit exceeded') &&
        this.retryCount < RATE_LIMIT.maxRetries
      ) {
        const delay = RATE_LIMIT.initialRetryDelay * Math.pow(2, this.retryCount);
        this.retryCount++;
        console.log(`Retrying in ${delay}ms... (Attempt ${this.retryCount}/${RATE_LIMIT.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryWithExponentialBackoff(operation);
      }
      
      // Reset retry count for next operation
      this.retryCount = 0;
      throw error;
    }
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    // Remove timestamps older than 1 minute
    this.requestTimestamps = this.requestTimestamps.filter(
      timestamp => now - timestamp < 60000
    );
    
    if (this.requestTimestamps.length >= RATE_LIMIT.maxRequestsPerMinute) {
      const oldestTimestamp = this.requestTimestamps[0];
      const waitTime = 60000 - (now - oldestTimestamp);
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }
    
    this.requestTimestamps.push(now);
  }
}

export const geminiService = GeminiService.getInstance();
