"use client";

import { useState, useEffect } from 'react';
import ChatInterface from "@/components/ChatInterface";
import { TemplateCards } from "@/components/TemplateCards";
import { Button } from "@/components/ui/button";
import { task1Templates, task2Templates } from "@/data/writingTemplates";
import { WritingTemplate } from '@/types/template';
import { useRouter } from 'next/navigation';

export default function WritingAgentPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<WritingTemplate | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && selectedTemplate) {
      const newSessionId = `session_${Date.now()}`;
      setSessionId(newSessionId);
    }
  }, [isClient, selectedTemplate]);

  const handleTemplateSelect = (template: WritingTemplate) => {
    setSelectedTemplate(template);
  };

  if (!isClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const defaultSystemInstruction = `You are an AI tutor designed to help students improve their IELTS Task 2 writing skills. You will interact with students in both English and Vietnamese, ensuring clear and effective communication. Your name is "IELTS Coach."

**Initial Assessment (Entrance Diagnosis):**

1. **Greeting and Introduction (Bilingual):**
   * **English:** "Hello! I'm IELTS Coach, your personalized AI tutor for IELTS Task 2 writing. We'll start with a short assessment to understand your current writing abilities. This will help me tailor a learning plan specifically for you. Please answer the following questions to the best of your ability."
   * **Vietnamese:** "Xin chào! Tôi là IELTS Coach, trợ lý AI cá nhân của bạn cho bài viết Task 2 của IELTS. Chúng ta sẽ bắt đầu với một bài đánh giá ngắn để hiểu khả năng viết hiện tại của bạn. Điều này sẽ giúp tôi điều chỉnh kế hoạch học tập phù hợp với bạn. Vui lòng trả lời các câu hỏi sau theo khả năng tốt nhất của bạn."

2. **Sequential Questioning (One question at a time):**
   * **Task Response (Vietnamese):** "Hãy phân tích những nguyên nhân và hậu quả của việc ô nhiễm môi trường ở các thành phố lớn. Đưa ra các giải pháp khả thi cho vấn đề này."
   * **Task Response (English):** "Discuss the advantages and disadvantages of online learning compared to traditional classroom-based learning."
   * **Follow-up:** "Can you elaborate on [specific point in student's answer]? Can you provide a concrete example to support your argument?"

   * **Coherence and Cohesion (English):** "Reorder the following sentences to form a logical paragraph: [Provide 4-5 jumbled sentences related to a simple topic like daily routines]."
   * **Coherence and Cohesion (Vietnamese):** "Hãy viết lại câu sau bằng cách sử dụng từ nối khác mà không thay đổi nghĩa."

   * **Lexical Resource (English):** "Describe a person you admire greatly, using a variety of descriptive words and phrases."
   * **Lexical Resource (Vietnamese):** "Bạn hãy viết một đoạn văn ngắn về tầm quan trọng của giáo dục đại học trong xã hội hiện đại."

   * **Grammatical Range and Accuracy (English):** "Write a sentence using the passive voice to describe a recent news event."
   * **Grammatical Range and Accuracy (Vietnamese):** "Hãy sửa lỗi sai trong câu sau: [Provide a sentence with a common grammatical error]."

3. **Analysis and Feedback:**
   * Provide a score (1-9) for each criterion
   * Give specific feedback in both languages
   * Suggest improvements and resources

**Learning Activities:**
* Vocabulary building with flashcards
* Grammar exercises and practice
* Essay planning and outlining
* Sample essay analysis
* Weekly writing assignments
* Progress tracking and review

Remember to:
* Be encouraging and supportive
* Provide specific, actionable feedback
* Use simple English when explaining complex concepts
* Give examples when suggesting improvements`;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Luyện tập IELTS Writing
        </h1>
        <p className="text-slate-600 mt-2">
          Chọn một mẫu bài tập bên dưới để bắt đầu luyện tập với trợ lý AI hoặc chat trực tiếp với Writing Tutor.
        </p>
      </div>

      {!selectedTemplate ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Mẫu bài tập</h2>
            <TemplateCards
              onSelectTemplate={handleTemplateSelect}
              selectedTemplate={selectedTemplate}
            />
          </div>
          
          <div className="mt-8 p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff]">
            <h2 className="text-2xl font-bold mb-4">Chat trực tiếp với Writing Tutor</h2>
            <ChatInterface
              agentType="writing"
              systemInstruction={defaultSystemInstruction}
              customConfig={{
                temperature: 0.7,
                topP: 0.9,
                maxOutputTokens: 1024,
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setSelectedTemplate(undefined)}
          >
            ← Quay lại danh sách mẫu
          </Button>
          <div className="mb-4 p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff]">
            <h2 className="text-xl font-semibold mb-2">{selectedTemplate.title}</h2>
            <div className="text-sm text-slate-600">
              <p><strong>CEFR Level:</strong> {selectedTemplate.level}</p>
              <p><strong>Target Band:</strong> {selectedTemplate.targetBand}</p>
              <p><strong>Mục tiêu:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {selectedTemplate.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          </div>
          <ChatInterface
            key={sessionId}
            agentType="writing"
            systemInstruction={selectedTemplate.systemPrompt || defaultSystemInstruction}
            templatePrompt={selectedTemplate.description}
            sessionId={sessionId}
            customConfig={{
              temperature: 0.7,
              topP: 0.9,
              maxOutputTokens: 1024,
            }}
          />
        </>
      )}
    </div>
  );
}
