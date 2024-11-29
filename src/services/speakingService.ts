import { Message, SpeakingSession, SpeakingMetrics, SpeakingHistory } from '@/types/speakingSession';
import { tutorSystemPrompt } from '@/data/tutorSystemPrompt';
import { GeminiService } from './gemini';
import { audioService } from './audioService';
import { getSystemPrompt, getFeedbackPrompt } from '../data/tutorSystemPrompt';
import { SpeakingTemplate } from '@/data/speakingTemplates';

interface GenerateResponseParams {
  systemInstructions: string;
  userInput: string;
  initialQuestion: string | null;
}

// Interface for AudioService
interface IAudioService {
  processAudio(audioBlob: Blob, mode?: 'conversation' | 'scoring', context?: string): Promise<string>;
  uploadAudio(audioBlob: Blob): Promise<string>;
}

const AI_MODEL = 'learnlm-1.5-pro-experimental';
const MAX_TOKENS = 4000;

const BASE_SYSTEM_PROMPT = `Bạn là một giám khảo và gia sư IELTS Speaking. Vai trò của bạn là:
1. Đặt câu hỏi phù hợp dựa trên chủ đề
2. Cung cấp phản hồi xây dựng về:
   - Sự lưu loát và mạch lạc
   - Tài nguyên từ vựng
   - Phạm vi ngữ pháp và độ chính xác
   - Phát âm
3. Hướng dẫn học viên qua buổi luyện tập nói
4. Duy trì thái độ hỗ trợ và khuyến khích`;

const part1SystemInstruction = 'Đối với Phần 1, hãy tập trung vào các câu hỏi chung về cuộc sống, sở thích và kinh nghiệm của học viên.';
const part2SystemInstruction = 'Đối với Phần 2, hãy yêu cầu học viên mô tả một chủ đề cụ thể, chẳng hạn như một người, nơi chốn hoặc sự kiện.';
const part3SystemInstruction = 'Đối với Phần 3, hãy tham gia vào một cuộc thảo luận với học viên về một chủ đề cụ thể, khám phá ý kiến và ý tưởng của họ.';

// Create a class-based service to maintain compatibility with existing code
export class SpeakingService {
  private static instance: SpeakingService;
  private currentSession: SpeakingSession | null = null;
  private sessionStartTime: number | null = null;
  private sessionDuration: number | null = null;
  private mode: 'practice' | 'mocktest' = 'practice';
  private currentTemplate: SpeakingTemplate | null = null;
  private audioRecorder: MediaRecorder | null = null;
  private isRecording = false;
  private audioChunks: Blob[] = [];
  private sessionNotes: Map<string, string> = new Map();
  private recordingStatus: RecordingStatus = {
    isRecording: false,
    duration: 0,
    processingState: 'idle'
  };
  private recordingTimer: NodeJS.Timer | null = null;

  private constructor(
    private geminiService: GeminiService,
    private audioService: IAudioService
  ) {}

  public static getInstance(): SpeakingService {
    if (!SpeakingService.instance) {
      SpeakingService.instance = new SpeakingService(GeminiService.getInstance(), audioService);
    }
    return SpeakingService.instance;
  }

  async generateResponse(template: SpeakingTemplate, userMessage: string): Promise<string> {
    try {
      // Get part-specific instructions
      let partInstructions = '';
      if (template.category.startsWith('part1')) {
        partInstructions = part1SystemInstruction;
      } else if (template.category.startsWith('part2')) {
        partInstructions = part2SystemInstruction;
      } else if (template.category.startsWith('part3')) {
        partInstructions = part3SystemInstruction;
      }

      const systemContext = `${BASE_SYSTEM_PROMPT}

${partInstructions}

Chủ đề hiện tại: ${template.description || 'Tổng quan'}
Mục tiêu học tập: ${template.learningObjectives?.[0] || 'Nói tự nhiên'}
Ngôn ngữ: ${template.language || 'Song ngữ (Tiếng Anh/Tiếng Việt)'}

Cuộc trò chuyện hiện tại:
AI: ${template.initialQuestion || 'Hãy bắt đầu buổi luyện tập. Bạn có thể giới thiệu về bản thân không?'}
Người dùng: ${userMessage}`;
      
      const response = await this.geminiService.sendMessage(
        userMessage,
        systemContext,
        'speaking'
      );

      if (!response) {
        throw new Error('Không nhận được phản hồi từ dịch vụ AI');
      }

      return this.formatAIResponse(response);
    } catch (error) {
      console.error('Lỗi tạo phản hồi:', error);
      if (error instanceof Error) {
        return `Xin lỗi, đã có lỗi xảy ra: ${error.message}. Vui lòng thử lại.`;
      }
      return 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.';
    }
  }

  async generateFeedback(audioTranscript: string, template: SpeakingTemplate): Promise<string> {
    try {
      const feedbackPrompt = `Là một gia sư IELTS Speaking, hãy cung cấp phản hồi khích lệ về phản hồi của học viên. Tập trung vào:
1. Nêu bật những gì họ làm tốt
2. Đề xuất 1-2 cách cải thiện cụ thể
3. Cung cấp một ví dụ hoặc bài tập nhỏ để thực hành

Phản hồi: "${audioTranscript}"

Sử dụng cả tiếng Anh và tiếng Việt để đảm bảo hiểu rõ.
Giữ phản hồi ngắn gọn và có thể hành động.`;

      const response = await this.geminiService.sendMessage(
        audioTranscript,
        feedbackPrompt,
        'feedback'
      );

      return response;
    } catch (error) {
      console.error('Lỗi tạo phản hồi:', error);
      return 'Xin lỗi, không thể tạo phản hồi lúc này. Vui lòng thử lại.';
    }
  }

  async startSession(templateId?: string, systemInstruction?: string, duration: number = 90, extraRequirements?: string): Promise<SpeakingSession> {
    if (this.currentSession?.status === 'active') {
      throw new Error('Đã có một phiên đang hoạt động');
    }

    // Get template if templateId is provided
    let template: SpeakingTemplate | null = null;
    if (templateId) {
      template = [...part1Templates, ...part2Templates, ...part3Templates].find(t => t.id === templateId) || null;
      if (!template) {
        throw new Error(`Không tìm thấy mẫu với ID: ${templateId}`);
      }
    }

    const session: SpeakingSession = {
      id: crypto.randomUUID(),
      templateId,
      startTime: new Date(),
      duration,
      messages: [],
      status: 'active',
      template: template,
      metrics: {
        fluency: 0,
        grammar: 0,
        vocabulary: 0,
        pronunciation: 0
      }
    };

    this.currentSession = session;
    this.sessionStartTime = Date.now();
    this.sessionDuration = duration * 1000; // Convert to milliseconds

    // Combine system instructions based on template type
    let partSpecificInstructions = '';
    if (template) {
      if (template.category.startsWith('part1')) {
        partSpecificInstructions = `
Bạn đang luyện tập IELTS Speaking Part 1.
- Tập trung vào các câu hỏi về thông tin cá nhân và chủ đề quen thuộc
- Giúp học viên trả lời tự nhiên và mạch lạc
- Đưa ra góp ý nhẹ nhàng khi cần thiết
        `;
      } else if (template.category.startsWith('part2')) {
        partSpecificInstructions = `
Bạn đang luyện tập IELTS Speaking Part 2.
- Cho học viên 1 phút chuẩn bị trước khi nói
- Yêu cầu học viên nói 1-2 phút về chủ đề
- Đảm bảo học viên đề cập đến tất cả các điểm trong cue card
        `;
      } else if (template.category.startsWith('part3')) {
        partSpecificInstructions = `
Bạn đang luyện tập IELTS Speaking Part 3.
- Đặt câu hỏi sâu hơn về chủ đề
- Khuyến khích học viên phân tích và đưa ra ý kiến
- Tập trung vào khả năng lập luận và phát triển ý
        `;
      }
    }

    const fullSystemPrompt = [
      BASE_SYSTEM_PROMPT,
      partSpecificInstructions,
      systemInstruction,
      extraRequirements,
      `Ngôn ngữ: Sử dụng cả tiếng Anh và tiếng Việt để đảm bảo học viên hiểu rõ.
Thời gian: ${duration} phút
Template: ${template?.title || 'Luyện tập tự do'}
Mục tiêu: ${template?.learningObjectives?.join(', ') || 'Cải thiện kỹ năng nói tổng quát'}`
    ].filter(Boolean).join('\n\n');

    // Initialize conversation with AI
    try {
      const initialQuestion = template?.initialQuestion || 'Hãy bắt đầu buổi luyện tập. Bạn có thể giới thiệu về bản thân không?';
      const response = await this.callAI(fullSystemPrompt, initialQuestion);
      
      session.messages.push({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      });

      return session;
    } catch (error) {
      console.error('Failed to start session:', error);
      this.currentSession = null;
      throw new Error('Không thể bắt đầu cuộc trò chuyện. Vui lòng thử lại.');
    }
  }

  async startFreeSession(customPrompt: string): Promise<SpeakingSession> {
    return this.startSession(
      undefined,
      `${BASE_SYSTEM_PROMPT}\n\nThis is a free practice session.`,
      90,
      customPrompt
    );
  }

  private async callAI(systemPrompt: string, userMessage: string): Promise<string> {
    // Mock AI call - replace with actual API call
    try {
      // Here you would make the actual API call to learnlm-1.5-pro-experimental
      // const response = await fetch('AI_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     model: AI_MODEL,
      //     messages: [
      //       { role: 'system', content: systemPrompt },
      //       { role: 'user', content: userMessage }
      //     ],
      //     max_tokens: MAX_TOKENS
      //   })
      // });
      // return response.json();
      
      return "Hãy bắt đầu buổi luyện tập. Bạn có thể giới thiệu về bản thân không?";
    } catch (error) {
      console.error('AI call failed:', error);
      throw new Error('Không thể kết nối với AI tutor');
    }
  }

  async startRecording(mode: 'manual' | 'handsfree' = 'manual'): Promise<void> {
    if (this.recordingStatus.isRecording) {
      throw new Error('Đang ghi âm');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.recordingStatus = {
        isRecording: true,
        duration: 0,
        processingState: 'recording'
      };

      // Start duration timer
      this.recordingTimer = setInterval(() => {
        this.recordingStatus.duration += 100;
      }, 100);

      this.audioRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.audioRecorder.onstop = async () => {
        this.recordingStatus.processingState = 'processing';
        
        try {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          this.recordingStatus.audioUrl = audioUrl;
          
          if (this.currentSession) {
            this.recordingStatus.processingState = 'sending';
            // Send audio to AI for transcription
            const transcript = await this.transcribeAudio(audioBlob);
            await this.addMessage('user', transcript, audioUrl);
            
            // Get AI response
            const response = await this.getAIResponse("Đây là phản hồi của tôi: " + transcript);
            await this.addMessage('assistant', response);
            
            this.recordingStatus.processingState = 'completed';
          }
        } catch (error) {
          console.error('Processing error:', error);
          this.recordingStatus.processingState = 'error';
          this.recordingStatus.error = error.message;
        }
      };

      this.audioRecorder.start();
    } catch (error) {
      console.error('Recording error:', error);
      this.recordingStatus = {
        isRecording: false,
        duration: 0,
        processingState: 'error',
        error: error.message
      };
      throw error;
    }
  }

  async stopRecording(): Promise<void> {
    if (!this.recordingStatus.isRecording || !this.audioRecorder) {
      return;
    }

    if (this.recordingTimer) {
      clearInterval(this.recordingTimer);
      this.recordingTimer = null;
    }

    this.audioRecorder.stop();
    this.recordingStatus.isRecording = false;
  }

  getRecordingStatus(): RecordingStatus {
    return { ...this.recordingStatus };
  }

  async sendManualInput(text: string): Promise<string> {
    if (!this.currentSession) {
      throw new Error('Không có phiên nào đang hoạt động');
    }

    try {
      // Add user message
      await this.addMessage('user', text);
      
      // Get AI response
      const response = await this.getAIResponse("Đây là phản hồi của tôi: " + text);
      await this.addMessage('assistant', response);

      return response;
    } catch (error) {
      console.error('Manual input error:', error);
      throw error;
    }
  }

  async endSession(): Promise<SpeakingMetrics> {
    if (!this.currentSession) {
      throw new Error('Không có phiên nào đang hoạt động');
    }

    if (this.recordingStatus.isRecording) {
      await this.stopRecording();
    }

    // Get AI evaluation of the session
    const metrics = await this.evaluateSession(this.currentSession);
    this.currentSession.metrics = metrics;
    this.currentSession.status = 'completed';

    return metrics;
  }

  private async evaluateSession(session: SpeakingSession): Promise<SpeakingMetrics> {
    const systemPrompt = `Bạn là một giám khảo IELTS. Hãy đánh giá buổi luyện tập nói sau và cung cấp điểm (0-9) cho:
1. Sự lưu loát và mạch lạc
2. Tài nguyên từ vựng
3. Phạm vi ngữ pháp và độ chính xác
4. Phát âm

Cũng cung cấp phản hồi cụ thể và đề xuất cải thiện.`;

    const conversation = session.messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    try {
      const evaluation = await this.callAI(systemPrompt, conversation);
      // Parse evaluation and return scores
      return {
        fluency: 7, // Replace with actual parsed scores
        vocabulary: 7,
        grammar: 7,
        pronunciation: 7
      };
    } catch (error) {
      console.error('Evaluation error:', error);
      throw error;
    }
  }

  async processAudioInput(audioBlob: Blob): Promise<{
    transcription: string;
    response: string;
    metrics: SpeakingMetrics;
  }> {
    if (!this.currentSession || !this.currentTemplate) {
      throw new Error('No active session or template');
    }

    try {
      // Process audio to text
      const transcription = await this.audioService.processAudio(audioBlob, 'conversation');

      // Generate AI response
      const response = await this.generateResponse(this.currentTemplate, transcription);

      // Update metrics (implement actual metric calculation logic)
      const metrics = this.calculateMetrics(transcription);

      // Update session
      this.currentSession.messages.push({
        role: 'user',
        content: transcription,
        timestamp: Date.now()
      });

      this.currentSession.messages.push({
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      });

      this.currentSession.metrics = metrics;

      return {
        transcription,
        response,
        metrics
      };
    } catch (error) {
      console.error('Error processing audio input:', error);
      throw error;
    }
  }

  private calculateMetrics(transcription: string): SpeakingMetrics {
    // Implement actual metric calculation logic
    // This is a placeholder implementation
    return {
      fluency: Math.min(this.currentSession?.metrics.fluency + 1 || 0, 9),
      vocabulary: Math.min(this.currentSession?.metrics.vocabulary + 1 || 0, 9),
      grammar: Math.min(this.currentSession?.metrics.grammar + 1 || 0, 9),
      pronunciation: Math.min(this.currentSession?.metrics.pronunciation + 1 || 0, 9)
    };
  }

  addMessage(message: Omit<Message, 'timestamp'>): Message {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    // Initialize messages array if it doesn't exist
    if (!Array.isArray(this.currentSession.messages)) {
      this.currentSession.messages = [];
    }

    const messageWithTimestamp: Message = {
      ...message,
      timestamp: Date.now()
    };

    this.currentSession.messages.push(messageWithTimestamp);
    return messageWithTimestamp;
  }

  async sendMessage(content: string, audioUrl?: string): Promise<string> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      // Initialize messages array if it doesn't exist
      if (!Array.isArray(this.currentSession.messages)) {
        this.currentSession.messages = [];
      }

      // Add user message to session
      const userMessage = this.addMessage({
        role: 'user',
        content,
        audioUrl,
        contentType: audioUrl ? 'audio' : 'text'
      });

      // Get context from previous messages
      const context = this.currentSession.messages
        .slice(-4) // Get last 4 messages for context
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');

      // Generate system prompt with mode and context
      const systemPrompt = getSystemPrompt(this.mode);
      const fullPrompt = `${systemPrompt}\n\nContext:\n${context}\n\nUser: ${content}`;

      // Get AI response
      const response = await this.geminiService.sendMessage(
        fullPrompt,
        undefined,
        'speaking',
        {
          temperature: this.mode === 'mocktest' ? 0.3 : 0.7,
          topP: this.mode === 'mocktest' ? 0.9 : 0.8,
        }
      );

      // Check if response is feedback
      const isFeedback = response.includes('Phát âm:') || 
                        response.includes('Ngữ pháp:') || 
                        response.includes('Từ vựng:') ||
                        response.includes('Sự lưu loát:');

      // Add AI response to session
      const aiMessage = this.addMessage({
        role: 'assistant',
        content: response,
        contentType: isFeedback ? 'feedback' : 'text'
      });

      return response;
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  }

  async handleAudioInput(audioBlob: Blob): Promise<string> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      // Convert audio to text using speech-to-text service
      const transcription = await this.transcribeAudio(audioBlob);
      
      // Generate AI tutor response
      const response = await this.generateResponse(this.currentTemplate, transcription);
      
      return response;
    } catch (error) {
      console.error('Error handling audio input:', error);
      throw error;
    }
  }

  async generateSessionFeedback(messages: Message[]): Promise<string> {
    try {
      // Analyze all messages to generate comprehensive feedback
      const userMessages = messages.filter(msg => msg.role === 'user');
      const tutorMessages = messages.filter(msg => msg.role === 'assistant');

      // Generate feedback based on the entire conversation
      const feedback = await this.analyzeSpeakingPerformance(userMessages, tutorMessages);

      return feedback;
    } catch (error) {
      console.error('Error generating session feedback:', error);
      throw error;
    }
  }

  private async transcribeAudio(audioBlob: Blob): Promise<string> {
    try {
      // Here you would integrate with a speech-to-text service
      // For now, we'll use a mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("Đây là bản chuyển văn bản của âm thanh.");
        }, 1000);
      });
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  }

  private async generateTutorResponse(userInput: string): Promise<string> {
    try {
      // Here you would integrate with your AI model to generate responses
      // For now, we'll use a mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("Tôi hiểu bạn đang nói gì. Bạn có thể nói thêm về điều đó không?");
        }, 1000);
      });
    } catch (error) {
      console.error('Error generating tutor response:', error);
      throw error;
    }
  }

  private async analyzeSpeakingPerformance(userMessages: Message[], tutorMessages: Message[]): Promise<string> {
    // Here you would implement comprehensive analysis of the speaking session
    const feedback = [
      "# Speaking Session Feedback\n\n",
      "## Sự lưu loát và mạch lạc\n",
      "- Dòng ý tốt\n",
      "- Sử dụng từ nối tự nhiên\n\n",
      "## Tài nguyên từ vựng\n",
      "- Sử dụng từ vựng phù hợp\n",
      "- Phạm vi từ vựng tốt\n\n",
      "## Phạm vi ngữ pháp và độ chính xác\n",
      "- Cấu trúc câu chính xác\n",
      "- Sử dụng cả câu đơn giản và phức tạp\n\n",
      "## Phát âm\n",
      "- Phát âm rõ ràng\n",
      "- Mẫu ngữ điệu tốt\n\n",
      "## Đề xuất\n",
      "- Thực hành sử dụng từ vựng nâng cao\n",
      "- Làm việc trên mẫu ngữ điệu trong câu dài\n",
      "- Tiếp tục phát triển cấu trúc ngữ pháp phức tạp\n"
    ].join('');

    return feedback;
  }

  async sendAudio(audioBlob: Blob): Promise<string> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      if (!this.isSessionActive() && this.shouldProvideScoring()) {
        // Session time is up - process audio for scoring
        const feedbackPrompt = getFeedbackPrompt();
        const transcription = await this.audioService.processAudio(audioBlob, 'scoring');
        const response = await this.sendMessage(transcription);

        // Return the assistant message
        return response;
      } else {
        // Session is active - continue conversation
        const transcription = await this.audioService.processAudio(audioBlob, 'conversation');
        const response = await this.sendMessage(transcription);

        // Return the assistant message
        return response;
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      throw error;
    }
  }

  getSessionTimeRemaining(): number {
    if (!this.sessionStartTime || !this.sessionDuration) return 0;
    const elapsed = Date.now() - this.sessionStartTime;
    return Math.max(0, this.sessionDuration - elapsed);
  }

  endSession(metrics?: SpeakingMetrics): void {
    if (this.currentSession) {
      this.currentSession.endTime = Date.now();
      if (metrics) {
        this.currentSession.metrics = metrics;
      }
    }
    this.sessionStartTime = null;
    this.sessionDuration = null;
  }

  getCurrentSession(): SpeakingSession | null {
    return this.currentSession;
  }

  calculateSessionMetrics(session: SpeakingSession): SpeakingMetrics {
    // Placeholder implementation for session metrics calculation
    return {
      pronunciation: 6,
      grammar: 6,
      vocabulary: 6,
      fluency: 6,
      coherence: 6,
      overallBand: 6,
      feedback: {
        strengths: ['Phát âm tốt', 'Nói rõ ràng'],
        improvements: ['Làm việc trên ngữ pháp', 'Mở rộng từ vựng'],
        tips: ['Thực hành nhiều hơn', 'Nghe người bản xứ']
      },
      nextSteps: ['Xem lại mẫu ngữ pháp phổ biến', 'Xây dựng từ vựng']
    };
  }

  updateSessionHistory(history: SpeakingHistory, session: SpeakingSession): SpeakingHistory {
    const newSessions = {
      ...history.sessions,
      [session.id]: session
    };

    // Calculate updated stats
    const sessions = Object.values(newSessions);
    const completedSessions = sessions.filter(s => s.endTime);

    return {
      ...history,
      sessions: newSessions,
      stats: {
        totalSessions: completedSessions.length,
        averageBand: completedSessions.length > 0 
          ? completedSessions.reduce((sum, s) => sum + (s.metrics?.overallBand || 0), 0) / completedSessions.length 
          : 0,
        timeSpent: completedSessions.reduce((total, s) => total + this.calculateSessionDuration(s), 0),
        lastSessionDate: completedSessions.length > 0 
          ? Math.max(...completedSessions.map(s => s.endTime || 0)) 
          : 0
      }
    };
  }

  calculateSessionDuration(session: SpeakingSession): number {
    if (!session.startTime || !session.endTime) return 0;
    return (session.endTime - session.startTime) / 60000; // Convert milliseconds to minutes
  }

  getHistory(userId: string): SpeakingHistory {
    const sessions = this.getSessions(userId);
    const history: SpeakingHistory = {
      userId,
      sessions,
      stats: {
        totalSessions: Object.keys(sessions).length,
        averageBand: this.calculateAverageBand(sessions),
        timeSpent: this.calculateTotalTimeSpent(sessions),
        lastSessionDate: this.getLastSessionDate(sessions)
      }
    };
    return history;
  }

  private getSessions(userId: string): { [sessionId: string]: SpeakingSession } {
    try {
      const sessions = localStorage.getItem(`speaking_sessions_${userId}`);
      return sessions ? JSON.parse(sessions) : {};
    } catch (error) {
      console.error('Error getting sessions:', error);
      return {};
    }
  }

  private calculateAverageBand(sessions: { [sessionId: string]: SpeakingSession }): number {
    const bands = Object.values(sessions)
      .map(session => session.metrics?.overallBand || 0)
      .filter(band => band > 0);
    
    return bands.length > 0 
      ? bands.reduce((sum, band) => sum + band, 0) / bands.length 
      : 0;
  }

  private calculateTotalTimeSpent(sessions: { [sessionId: string]: SpeakingSession }): number {
    return Object.values(sessions)
      .map(session => session.endTime && session.startTime 
        ? (session.endTime - session.startTime) / 60000 
        : 0)
      .reduce((sum, time) => sum + time, 0);
  }

  private getLastSessionDate(sessions: { [sessionId: string]: SpeakingSession }): number {
    const dates = Object.values(sessions)
      .map(session => session.endTime || session.startTime)
      .filter(date => date !== undefined);
    
    return dates.length > 0 
      ? Math.max(...dates) 
      : 0;
  }

  getRecentSessions(userId: string, limit: number = 5): SpeakingSession[] {
    const sessions = this.getSessions(userId);
    return Object.values(sessions)
      .sort((a, b) => (b.startTime - a.startTime))
      .slice(0, limit);
  }

  async getStats(): Promise<SpeakingStats> {
    // Calculate and return speaking statistics
    return {
      totalSessions: 0,
      averageScores: {
        fluency: 0,
        vocabulary: 0,
        grammar: 0,
        pronunciation: 0
      },
      recentSessions: [],
      weakestAreas: [],
      strongestAreas: [],
      practiceTime: 0
    };
  }
}

export const speakingService = SpeakingService.getInstance();

export interface RecordingStatus {
  isRecording: boolean;
  duration: number;
  audioUrl?: string;
  error?: string;
  processingState: 'idle' | 'recording' | 'processing' | 'sending' | 'completed' | 'error';
}
