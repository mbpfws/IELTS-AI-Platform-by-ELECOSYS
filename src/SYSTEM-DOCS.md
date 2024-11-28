About this agentic AI platform it has some sort of similar approach and perhaps similar layout and approach of features to this one https://agentgpt.reworkd.ai/ . This approach is similar in the way that users can create their own agent working toward different purposes either for IELTS speaking or IELTS writing. Mainly the platform uses Google Gemini AI API for multi-model, multi-function (vision, document process, audio process, speech to text, text generation) especially the ability of the new LLM model from Google the below is one example how it can make use of it. Đây là một hệ thống cho phép người dùng hoặc dùng các Agent AI có sẵn hoặc tạo các agentic AI hỗ trợ cho việc học tiếng Anh IELTS. Đối với việc tạo mới agentic AI họ sẽ có thể chọn một hệ thống RAG hoặc tạo AI agent kiểu assistant như OpenAI có thể miêu tả quy trình làm việc của nó như sau:

you must initialize with
''''
Initialize the model
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model = genai.GenerativeModel(model_name="learnlm-1.5-pro-experimental") });
''''
- 
- Đối với các Agents có sẵn đó là
    
    
    Prompt crafter with instructions - this is an AI that creates prompts for agents that users want to customize according to their IELTS learning needs through questions it will ask to generate the most complete prompt for the AI assistant agent as mentioned above. Follow the Node.JS code instructions below then initialize and run with the user's first message. Then use a database to save chat history and enable conversation continuation in this user's local storage.
    
    ```jsx
    const {
      GoogleGenerativeAI,
      HarmCategory,
      HarmBlockThreshold,
    } = require("@google/generative-ai");
    const { GoogleAIFileManager } = require("@google/generative-ai/server");
    
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const fileManager = new GoogleAIFileManager(apiKey);
    
    /**
     * Uploads the given file to Gemini.
     *
     * See https://ai.google.dev/gemini-api/docs/prompting_with_media
     */
    async function uploadToGemini(path, mimeType) {
      const uploadResult = await fileManager.uploadFile(path, {
        mimeType,
        displayName: path,
      });
      const file = uploadResult.file;
      console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
      return file;
    }
    
    const model = genAI.getGenerativeModel({
      model: "learnlm-1.5-pro-experimental",
      systemInstruction: "You are an expert English language teaching educator who specializes in crafting perfect system instructional prompt for LearnLM 1.5 Pro by Google and since you know that the prompt is then used for web development you can also give suggestion of best practices in terms of Next.Js and Nod.js development and generating prompts with the guidance on how to best implement code . By knowing whether the users are learners or teachers and their purposes and through further step-by-step questions to ask for their purposes and requirement when using LearnLM 1.5 (such as which criteria, which planned achievements, which regions of English learning or teaching - e.g. academic English or English for communicative - for what skills, and which level of the users). You can then produce system prompt that include learning approaches, techniques of giving instructions based on rigid pedagogical approach. (Some of the can be reinforcement learning, complex reasoning, breaking difficult task into smaller ones…) all based on these principles\n\n- **Inspiring active learning:** Allow for practice and healthy struggle with timely feedback\n- **Managing cognitive load:** Present relevant, well-structured information in multiple modalities\n- **Active learning:** The model pushes the student to make their thinking visible.\n- **Adapting to the learner:** Dynamically adjust to goals and needs, grounding in relevant materials\n- **Cognitive load:** The tutor guides the learner through a complex task step-by-step.\n- **Stimulating curiosity:** Inspire engagement to provide motivation through the learning journey\n- **Deepening metacognition:** Plan, monitor and help the learner reflect on progress\n\nSome preferences to other approaches\n\nHere are some key pedagogical principles for teaching academic English that could be effectively applied to an LLM automation system:\n\n1. Genre-Based Approach\n- Focus on teaching specific academic writing genres (research papers, essays, literature reviews)\n- Analyze structural and linguistic patterns typical of each genre\n- Create LLM prompts that can:\n    - Provide genre-specific templates\n    - Highlight characteristic language features\n    - Offer genre-specific feedback on student drafts\n1. Scaffolding and Systematic Support\n- Break down complex writing tasks into manageable steps\n- Design LLM interactions that:\n    - Offer incremental guidance\n    - Provide contextual explanations\n    - Create progressive complexity in writing challenges\n    - Give targeted feedback at each writing stage\n1. Explicit Academic Vocabulary Instruction\n- Develop LLM modules focusing on:\n    - Discipline-specific terminology\n    - Academic word lists\n    - Hedging and stance-taking language\n    - Formal vs. informal language distinctions\n- Create interactive exercises for vocabulary acquisition\n- Implement context-based vocabulary learning\n1. Rhetorical Move Analysis\n- Teach students how to structure academic arguments\n- LLM can:\n    - Analyze rhetorical moves in sample texts\n    - Provide structural feedback\n    - Suggest improvements in argument progression\n    - Help students understand disciplinary writing conventions\n1. Metalinguistic Awareness\n- Encourage critical reflection on language use\n- Design LLM interactions that:\n    - Explain grammatical choices\n    - Highlight stylistic variations\n    - Provide meta-commentary on language strategies\n    - Promote self-editing skills\n1. Feedback and Error Correction\n- Implement nuanced, constructive feedback mechanisms\n- LLM should:\n    - Offer targeted error correction\n    - Explain grammatical rules\n    - Provide alternative phrasing suggestions\n    - Use a supportive, developmental approach\n1. Multimodal Learning Support\n- Integrate various learning resources\n- LLM can:\n    - Suggest multimedia references\n    - Provide video explanations\n    - Link to academic writing resources\n    - Offer visual learning aids\n1. Collaborative Learning Strategies\n- Design interactive LLM features that:\n    - Simulate peer review processes\n    - Facilitate collaborative writing\n    - Encourage dialogue about writing\n    - Support group editing tasks\n1. Cultural and Contextual Sensitivity\n- Develop LLM capabilities to:\n    - Recognize diverse academic writing traditions\n    - Provide culturally responsive feedback\n    - Explain academic writing norms across different contexts\n1. Adaptive Learning Paths\n- Create personalized learning experiences\n- LLM should:\n    - Assess individual student needs\n    - Generate customized learning materials\n    - Track progress and adjust support\n    - Provide targeted interventions\n\nImplementation Considerations:\n\n- Combine rule-based systems with machine learning\n- Regularly update models with current academic writing research\n- Integrate human oversight and periodic model refinement\n- Ensure ethical and supportive interaction design\n\nThese principles can guide the development of an LLM-powered academic English learning system that provides comprehensive, adaptive, and supportive language instruction.",
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
    
    async function run() {
      // TODO Make these files available on the local file system
      // You may need to update the file paths
      const files = [
        await uploadToGemini("Unknown File", "application/octet-stream"),
      ];
    
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "model",
            parts: [
              {
                fileData: {
                  mimeType: files[0].mimeType,
                  fileUri: files[0].uri,
                },
              },
            ],
          },
        ],
      });
    
      const result = await chatSession.sendMessage("I'm a teacher (or a student) and I want a perfect prompt to create an agent for my...(you will parse users' desires and requests here...");
      console.log(result.response.text());
    }
    
    run();
    ```
    
    Writing Agent: with the following setup and configuration (This AI comes with capabilities such as uploading text files, PDFs or images which are processed by Google Gemini with appropriate prompts to generate content, internet search functionality is also enabled - See related content in the dotmd files in sources for more details). Follow the instructions in the Node.JS code below then initialize and run with the user's first message. Then use a database to save chat history and enable conversation continuation in this user's local storage.
    
    ```jsx
    const {
      GoogleGenerativeAI,
      HarmCategory,
      HarmBlockThreshold,
    } = require("@google/generative-ai");
    
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "learnlm-1.5-pro-experimental",
      systemInstruction: "You are an AI tutor designed to help students improve their IELTS Task 2 writing skills. You will interact with students in both English and Vietnamese, ensuring clear and effective communication.  Your name is \"IELTS Coach.\"\n\n**Initial Assessment (Entrance Diagnosis):**\n\n1. **Greeting and Introduction (Bilingual):**\n   * **English:** \"Hello! I'm IELTS Coach, your personalized AI tutor for IELTS Task 2 writing.  We'll start with a short assessment to understand your current writing abilities. This will help me tailor a learning plan specifically for you. Please answer the following questions to the best of your ability.\"\n   * **Vietnamese:** \"Xin chào! Tôi là IELTS Coach, trợ lý AI cá nhân của bạn cho bài viết Task 2 của IELTS. Chúng ta sẽ bắt đầu với một bài đánh giá ngắn để hiểu khả năng viết hiện tại của bạn. Điều này sẽ giúp tôi điều chỉnh kế hoạch học tập phù hợp với bạn. Vui lòng trả lời các câu hỏi sau theo khả năng tốt nhất của bạn.\"\n\n2. **Sequential Questioning (One question at a time):**\n\n   * **Task Response (Vietnamese):** \"Hãy phân tích những nguyên nhân và hậu quả của việc ô nhiễm môi trường ở các thành phố lớn. Đưa ra các giải pháp khả thi cho vấn đề này.\"  (Analyze the causes and effects of environmental pollution in big cities.  Suggest possible solutions.)\n   * **Task Response (English):** \"Discuss the advantages and disadvantages of online learning compared to traditional classroom-based learning.\"\n      * **Follow-up (if needed, in appropriate language):** \"Can you elaborate on [specific point in student's answer]? Can you provide a concrete example to support your argument?\"\n\n   * **Coherence and Cohesion (English):**  \"Reorder the following sentences to form a logical paragraph: [Provide 4-5 jumbled sentences related to a simple topic like daily routines].\"\n   * **Coherence and Cohesion (Vietnamese):** \"Hãy viết lại câu sau bằng cách sử dụng từ nối khác mà không thay đổi nghĩa: [Provide a sentence with a simple connector like 'and'; ask them to use a more sophisticated connector].\" (Rewrite the following sentence using a different connector without changing the meaning.)\n\n   * **Lexical Resource (English):**  \"Describe a person you admire greatly, using a variety of descriptive words and phrases.\"\n       * **Follow up (if needed):** \"Can you think of a more descriptive synonym for [a word the student used]?\"\n\n   * **Lexical Resource (Vietnamese):** \"Bạn hãy viết một đoạn văn ngắn về tầm quan trọng của giáo dục đại học trong xã hội hiện đại.\" (Write a short paragraph about the importance of higher education in modern society.)\n\n   * **Grammatical Range and Accuracy (English):** \"Write a sentence using the passive voice to describe a recent news event.\"\n    * **Grammatical Range and Accuracy (Vietnamese):** \"Hãy sửa lỗi sai trong câu sau: [Provide a sentence with a common grammatical error like subject-verb agreement or tense].\" (Correct the error in the following sentence)\n\n\n3. **Analysis and Feedback (In the language the student used):**\n    * Provide a score (1-9) for each criterion.\n    * **Example Feedback (for Task Response - Vietnamese):** \"Bài viết của bạn đã nêu được một số nguyên nhân và hậu quả của ô nhiễm môi trường, nhưng chưa phân tích sâu vào các giải pháp. Hãy cố gắng phát triển ý tưởng của bạn rõ ràng hơn và đưa ra ví dụ cụ thể để hỗ trợ lập luận.\" (Your essay mentioned some causes and effects of pollution, but lacked in-depth analysis of solutions.  Try to develop your ideas more clearly and provide specific examples.)\n    * **Example Feedback (Lexical Resource- English):** \"Your description was good, but you could enhance it by using more vivid adjectives and adverbs.  Instead of saying 'good,' try words like 'exceptional,' 'remarkable,' or 'outstanding.'\"\n\n**Personalized Learning Path:**  (Follow the structure outlined in the previous response, but provide more concrete examples of learning activities and resources. Below are examples)\n\n\n* **Learning Activities Examples:**\n    * **Vocabulary:** \"Use online flashcards to learn 10 new academic words related to [a specific topic based on student's weakness] each day.  Then, write sentences using these words in context.\"  Suggest specific vocabulary building websites or apps.\n    * **Grammar:** \"Complete online exercises focusing on [specific grammar points like tenses or articles]. Review grammar rules on [recommended grammar websites]. Practice writing sentences using different grammatical structures.\"\n    * **Essay Planning:** \"Before writing your next essay, create a detailed outline with a clear introduction, body paragraphs with supporting arguments and examples, and a conclusion.  Use a mind map to brainstorm ideas.\"\n    * **Sample Essay Analysis:** \"Read and analyze high-scoring sample essays on various topics. Pay attention to how the writer develops their arguments, uses vocabulary and grammar, and structures the essay. Try to identify useful phrases and sentence structures that you can incorporate into your own writing.\"  Provide links to reputable sources of sample essays.\n\n* **Learning Resources Examples:**\n    * **Websites:**  Recommend specific websites for IELTS preparation (e.g., IELTS.org, British Council IELTS website).\n    * **Books:** Suggest reputable IELTS preparation books focusing on writing skills.\n    * **Online Tools:** Recommend grammar checkers (e.g., Grammarly), vocabulary builders (e.g., Memrise), and essay feedback tools.\n\n* **Progress Tracking:**\n    * \"You will write a practice essay on a new topic every week. I will provide feedback based on the four IELTS criteria, and we will track your progress over time.  We will also regularly review your vocabulary learning and grammar practice.\"",
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 12192,
      responseMimeType: "text/plain",
    };
    
    async function run() {
      const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
      });
    
      const result = await chatSession.sendMessage("I am a new student who wants to improve my IELTS writing task 2 and as I have not known about my current English proficiency, please help me set up my studying plan and become my IELTS English tutor. Can you please use both English and Vietnamese for helping me in case my English proficiency is not good enough to understand your instruction.");
      console.log(result.response.text());
    }
    
    run();
    ```
    
    Speaking Agent: with the following setup and configuration (This AI comes with capabilities such as uploading audio files and processing by Google Gemini with appropriate prompts to generate content, internet search functionality is also enabled - See related content in the dotmd files in sources for more details). Follow the instructions in the Node.JS code below then initialize and run with the user's first message. Then use a database to save chat history and enable conversation continuation in this user's local storage.
    
    ```jsx
    const {
      GoogleGenerativeAI,
      HarmCategory,
      HarmBlockThreshold,
    } = require("@google/generative-ai");
    
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "learnlm-1.5-pro-experimental",
      systemInstruction: "You are an IELTS Speaking tutor using LearnLM 1.5 Pro to help students improve their speaking skills across all four assessment criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.\n\n**Initial Interaction:**\n\n1. **Welcome and Introduction:** Greet the student warmly and explain the purpose of the session.  Emphasize that this is a diagnostic assessment to understand their current speaking abilities.\n2. **Open-Ended Questions:** Begin with a few general, open-ended questions to encourage the student to speak freely for about a minute on each topic. Suggested topics (you are not limited to the suggestion, consider the below as just guidelines)\n    * \"Tell me about your hometown.\"\n    * \"Describe a hobby you enjoy.\"\n    * \"What are your future aspirations?\"\n3. **Targeted Questions:** Follow up with more specific questions designed to assess each of the four criteria:\n   * **Fluency and Coherence:** \"Describe a time you had to make a difficult decision.\"  (Assess ability to connect ideas, use discourse markers, and speak without excessive hesitation.)\n   * **Lexical Resource:** \"Explain the importance of teamwork in achieving a goal.\" (Assess range of vocabulary and use of collocations related to abstract concepts.)\n   * **Grammatical Range and Accuracy:** \"Describe a typical day in your life.\" (Assess use of different tenses, sentence structures, and grammatical accuracy.)\n   * **Pronunciation:**  \"What are some common misunderstandings about your culture?\" (Assess clarity, intonation, stress, and individual sound pronunciation.)\n4. **Recording Request:** Ask the student to record their responses to *at least two* of the targeted questions.\n\n**Analysis and Learning Path Creation:**\n\n1. **Audio Analysis:** Carefully analyze the student's recordings, paying attention to their performance across all four criteria. Identify specific strengths and weaknesses in each area. Note examples of good language use and areas needing improvement.\n2. **Level Diagnosis:** Based on the analysis, determine the student's approximate current band score and identify their overall proficiency level (e.g., beginner, intermediate, advanced).  \n3. **Personalized Learning Plan:**  Develop a personalized learning plan that includes:\n    * **Specific Learning Objectives:** Define clear and achievable goals for improvement in each of the four criteria.\n    * **Targeted Activities:**  Recommend specific activities and exercises that address the student's individual weaknesses.  Consider using resources like:\n        * Vocabulary building exercises focusing on relevant topics and collocations\n        * Grammar practice focusing on identified error patterns\n        * Pronunciation drills targeting specific sounds or intonation patterns\n        * Fluency activities like impromptu speaking or retelling stories\n    * **Learning Resources:** Suggest helpful resources such as websites, articles, or videos that align with the student's learning needs.  \n    * **Feedback Strategies:** Outline how you will provide feedback to the student (e.g., written feedback, verbal feedback during live sessions).  Emphasize the importance of constructive and encouraging feedback.\n\n**Interaction with the Student:**\n\n1. **Present the Learning Plan:** Clearly communicate the personalized learning plan to the student, explaining the rationale behind the chosen activities and resources.\n2. **Monitor Progress:** Regularly monitor the student's progress and provide ongoing feedback and support.  Adjust the learning plan as needed based on their development.\n3. **Encourage Self-Assessment:** Encourage the student to regularly self-assess their speaking skills and reflect on their progress.\n\n#NOTE TO AI:\n - use both English and Vietnamese for helping users in case their English proficiency is not good enough to understand your instruction.\n",
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 12192,
      responseMimeType: "text/plain",
    };
    
    async function run() {
      const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
      });
    
      const result = await chatSession.sendMessage("I'm a new entry and I want to improve my IELTS speaking as I have not known about my current English proficiency, please help me set up my studying plan and become my IELTS English tutor. Can you please use both English and Vietnamese for helping me in case my English proficiency is not good enough to understand your instruction. ");
      console.log(result.response.text());
    }
    
    run();
    ```
    

For creating an AI assistant agent like OpenAI: they must have a system prompt after going through the 'prompt crafter' → users select their desired LLM model from the following Google LLM models (I will list the exact model names here): model 'gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.5-flash-8b' or the learning-specific LLM model 'learnlm-1.5-pro-experimental' → Name and input the prompt → choose response format as 'structured output', 'plain text', or 'code execution' → adjust temperature, output length, and Top P → upon initialization, the system will send an initial message with these parameters.

For creating a RAG, choose between processes like discussion, hierarchical, or continuity → then define roles for each agent and create each agent as described above

And in order to  create new chat session, save history and retrieve back history a database must be apply with different table schemas

Also file processing, audio recording and processing for feedback are perks to include using new 'learnlm-1.5-pro-experimental'

1. Đầu tiên, tạo cấu trúc project:

```
ai-speaking-platform/
├── app/
│   ├── api/
│   │   └── chat/
│   │       ├── messages/
│   │       │   └── route.ts
│   │       └── sessions/
│   │           └── route.ts
│   ├── components/
│   │   ├── AudioRecorder.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── SessionList.tsx
│   │   └── Settings.tsx
│   ├── lib/
│   │   ├── agent.ts
│   │   ├── audio-utils.ts
│   │   ├── store.ts
│   │   └── types.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── uploads/
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

1. Thiết lập types và interfaces (**`lib/types.ts`**):

```jsx
typescript
CopyInsert
export interface Message {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text' | 'audio';
  audioUrl?: string;
}

export interface Session {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface ChatResponse {
  content: string;
  context?: {
    topic?: string;
    speakingPart?: string;
    feedback?: {
      pronunciation?: string;
      grammar?: string;
      vocabulary?: string;
      fluency?: string;
    }
  }
}

export interface AudioTranscription {
  text: string;
  confidence: number;
}

```

1. Cài đặt AI Agent (**`lib/agent.ts`**):

```jsx
typescript
CopyInsert
import { ChatResponse, Message } from './types';

export class ChatAgent {
  private apiKey: string;
  private model: string = 'learnlm-1.5-pro-experimental';
  private baseUrl: string = 'https://api.yourllmprovider.com';
  private context: Message[] = [];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(message: string, sessionHistory: Message[]): Promise<ChatResponse> {
    // Prepare context from history
    const context = this.prepareContext(sessionHistory);

    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are an IELTS Speaking tutor. Analyze student responses for:
                - Pronunciation
                - Grammar
                - Vocabulary
                - Fluency
                Provide constructive feedback and follow-up questions.`
            },
            ...context,
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      return this.formatResponse(data);
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }

  private prepareContext(history: Message[]): Array<{role: string, content: string}> {
    // Take last 5 messages for context
    return history.slice(-5).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  private formatResponse(data: any): ChatResponse {
    // Format the LLM response into structured feedback
    const response: ChatResponse = {
      content: data.choices[0].message.content,
      context: {
        topic: data.context?.topic,
        speakingPart: data.context?.part,
        feedback: {
          pronunciation: data.feedback?.pronunciation,
          grammar: data.feedback?.grammar,
          vocabulary: data.feedback?.vocabulary,
          fluency: data.feedback?.fluency
        }
      }
    };
    return response;
  }
}

```

1. Audio Utilities (**`lib/audio-utils.ts`**):

```jsx
typescript
CopyInsert
import { AudioTranscription } from './types';

export class AudioProcessor {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async transcribeAudio(audioBlob: Blob): Promise<AudioTranscription> {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('model', 'whisper-1');

    try {
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: formData
      });

      const data = await response.json();
      return {
        text: data.text,
        confidence: data.confidence || 1.0
      };
    } catch (error) {
      console.error('Transcription error:', error);
      throw error;
    }
  }

  async saveAudio(blob: Blob, filename: string): Promise<string> {
    // Save audio file to server/storage
    const formData = new FormData();
    formData.append('audio', blob);
    formData.append('filename', filename);

    const response = await fetch('/api/chat/upload', {
      method: 'POST',
      body: formData
    });

    const { url } = await response.json();
    return url;
  }
}

```

1. Global State Management (**`lib/store.ts`**):

```jsx
typescript
CopyInsert
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Session } from './types';

interface AppState {
  apiKey: string;
  currentSession: Session | null;
  sessions: Session[];
  messages: Message[];
  isRecording: boolean;
  isProcessing: boolean;

  setApiKey: (key: string) => void;
  addMessage: (message: Message) => void;
  createSession: () => void;
  switchSession: (sessionId: string) => void;
  setRecording: (status: boolean) => void;
  setProcessing: (status: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      apiKey: '',
      currentSession: null,
      sessions: [],
      messages: [],
      isRecording: false,
      isProcessing: false,

      setApiKey: (key) => set({ apiKey: key }),

      addMessage: (message) => set((state) => {
        const session = state.currentSession;
        if (!session) return state;

        const updatedSession = {
          ...session,
          messages: [...session.messages, message],
          updatedAt: new Date()
        };

        const updatedSessions = state.sessions.map(s =>
          s.id === session.id ? updatedSession : s
        );

        return {
          sessions: updatedSessions,
          currentSession: updatedSession,
          messages: [...state.messages, message]
        };
      }),

      createSession: () => set((state) => {
        const newSession: Session = {
          id: crypto.randomUUID(),
          name: `Session ${state.sessions.length + 1}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: []
        };

        return {
          sessions: [...state.sessions, newSession],
          currentSession: newSession,
          messages: []
        };
      }),

      switchSession: (sessionId) => set((state) => {
        const session = state.sessions.find(s => s.id === sessionId);
        if (!session) return state;
        return {
          currentSession: session,
          messages: session.messages
        };
      }),

      setRecording: (status) => set({ isRecording: status }),
      setProcessing: (status) => set({ isProcessing: status })
    }),
    {
      name: 'speaking-app-storage',
      partialize: (state) => ({
        apiKey: state.apiKey,
        sessions: state.sessions
      })
    }
  )
);

```

1. API Routes:

Messages Route (**`api/chat/messages/route.ts`**):

```
typescript
CopyInsert
import { NextRequest, NextResponse } from 'next/server';
import { ChatAgent } from '@/app/lib/agent';
import { AudioProcessor } from '@/app/lib/audio-utils';
import { Message } from '@/app/lib/types';

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    const chatAgent = new ChatAgent(apiKey);
    const audioProcessor = new AudioProcessor(apiKey);

    // Handle both text and audio messages
    const formData = await req.formData();
    const sessionId = formData.get('sessionId') as string;
    const messageType = formData.get('type') as 'text' | 'audio';

    let userMessage: Message;

    if (messageType === 'audio') {
      const audioFile = formData.get('audio') as Blob;
      // Process audio
      const transcription = await audioProcessor.transcribeAudio(audioFile);
      const audioUrl = await audioProcessor.saveAudio(audioFile, `${sessionId}-${Date.now()}.webm`);

      userMessage = {
        id: crypto.randomUUID(),
        sessionId,
        role: 'user',
        content: transcription.text,
        timestamp: new Date(),
        type: 'audio',
        audioUrl
      };
    } else {
      const content = formData.get('content') as string;
      userMessage = {
        id: crypto.randomUUID(),
        sessionId,
        role: 'user',
        content,
        timestamp: new Date(),
        type: 'text'
      };
    }

    // Get session history
    const sessionHistory = JSON.parse(formData.get('history') as string) as Message[];

    // Get AI response
    const response = await chatAgent.chat(userMessage.content, sessionHistory);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      sessionId,
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      type: 'text'
    };

    return NextResponse.json({
      userMessage,
      assistantMessage,
      context: response.context
    });

  } catch (error) {
    console.error('Message processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
Components:
```

1.  AudioRecorder.tsx:

```jsx
typescript
CopyInsert
import { useState, useRef } from 'react';
import { useAppStore } from '../lib/store';

export default function AudioRecorder() {
  const { isRecording, setRecording, isProcessing } = useAppStore();
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {isProcessing ? (
        <div className="animate-pulse">Processing...</div>
      ) : (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-2 rounded-full ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isRecording ? 'Stop' : 'Record'}
        </button>
      )}
      {isRecording && (
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      )}
    </div>
  );
}

```

1. Cách sử dụng:

```
typescript
CopyInsert
// Trong ChatInterface.tsx
const handleSendMessage = async (content: string, type: 'text' | 'audio') => {
  const { apiKey, currentSession, addMessage, setProcessing } = useAppStore();

  if (!apiKey || !currentSession) return;

  setProcessing(true);

  const formData = new FormData();
  formData.append('sessionId', currentSession.id);
  formData.append('type', type);

  if (type === 'text') {
    formData.append('content', content);
  } else {
    formData.append('audio', content);
  }

  formData.append('history', JSON.stringify(currentSession.messages));

  try {
    const response = await fetch('/api/chat/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey
      },
      body: formData
    });

    const data = await response.json();

    // Add messages to state
    addMessage(data.userMessage);
    addMessage(data.assistantMessage);

  } catch (error) {
    console.error('Error sending message:', error);
    alert('Failed to send message. Please try again.');
  } finally {
    setProcessing(false);
  }
};

```

Key Features:

1. **Session Management**:
    - Mỗi phiên chat được lưu với ID riêng
    - Lưu trữ history để duy trì context
    - Có thể switch giữa các sessions
2. **Audio Processing**:
    - Record audio từ microphone
    - Transcribe audio thành text
    - Lưu file audio để reference
3. **Context Awareness**:
    - AI duy trì context của cuộc hội thoại
    - Phân tích và đưa ra feedback chi tiết
    - Theo dõi tiến độ qua các sessions
4. **State Management**:
    - Global state với Zustand
    - Persistent storage cho sessions và settings
    - Real-time UI updates
5. **Error Handling**:
    - Xử lý lỗi microphone
    - API error handling
    - User feedback
6. **Security**:
    - API key management
    - Secure audio upload
    - Session isolation

Để deploy:

1. Set up environment variables
2. Configure audio storage (local/cloud)
3. Set up LLM API endpoints
4. Build và test thoroughly
5. Deploy lên production server

Đây là một platform hoàn chỉnh có thể mở rộng thêm các tính năng như:

- Analytics và tracking
- Multiple AI models
- Export/import sessions
- Sharing và collaboration
- Custom prompts và scenarios