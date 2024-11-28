import { Template } from '@/types/template';
import { speakingSystemPrompt } from '@/config/speakingAgent';
import { part1Questions, part2Questions, part3Questions, advancedTopics } from './speakingQuestions';

const speakingInstructions = `
**Tham số phản hồi**:
- Giới hạn độ dài phản hồi: 2500 tokens
- Tập trung vào phản hồi ngắn gọn, rõ ràng
- Ưu tiên các nhận xét quan trọng
- Sử dụng gạch đầu dòng để dễ đọc

**Khung học tập thích ứng**:
1. Phân tích phát âm:
   - Đánh giá độ rõ ràng
   - Nhận xét về ngữ điệu
   - Góp ý về trọng âm từ
   - Đề xuất cải thiện

2. Đánh giá nội dung:
   - Tính liên kết của câu trả lời
   - Độ phong phú từ vựng
   - Cấu trúc câu và ngữ pháp
   - Tính phù hợp với chủ đề

3. Chiến lược trả lời:
   - Hướng dẫn quản lý thời gian
   - Cách phát triển ý tưởng
   - Kỹ thuật trả lời tự nhiên
   - Cách xử lý khi gặp khó khăn
`;

// Convert templates to array format for compatibility
export const speakingTemplates: Template[] = [
  // Free Chat
  {
    id: 'free_chat',
    titleVi: 'Trò chuyện tự do',
    titleEn: 'Free Chat Practice',
    descriptionVi: 'Trò chuyện tự do với AI tutor để luyện tập tiếng Anh',
    descriptionEn: 'Practice general conversation skills without a specific template',
    taskType: 'free_chat',
    level: 'All Levels',
    targetBand: 'Any',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },

  // Part 1 Templates
  ...Object.entries(part1Questions).map(([id, questions]) => ({
    id,
    titleVi: 'Phần 1 - ' + id.split('_').pop()?.charAt(0).toUpperCase() + id.split('_').pop()?.slice(1),
    titleEn: 'Part 1 - ' + id.split('_').pop()?.charAt(0).toUpperCase() + id.split('_').pop()?.slice(1),
    descriptionVi: 'Luyện tập trả lời các câu hỏi về chủ đề quen thuộc',
    descriptionEn: 'Practice answering questions about familiar topics',
    taskType: 'speaking_part1',
    level: 'B1',
    targetBand: '5.0-6.0',
    criteria: ['Self-introduction', 'Description', 'Daily Life'],
    questions
  })),

  // Part 2 Templates
  ...Object.entries(part2Questions).map(([id, topic]) => ({
    id,
    titleVi: 'Phần 2 - ' + topic.topic,
    titleEn: 'Part 2 - ' + topic.topic,
    descriptionVi: 'Luyện tập nói dài với thẻ gợi ý',
    descriptionEn: 'Long turn speaking practice with cue card',
    taskType: 'speaking_part2',
    level: 'B2',
    targetBand: '6.0-7.0',
    criteria: ['Description', 'Organization', 'Fluency'],
    topic
  })),

  // Part 3 Templates
  ...Object.entries(part3Questions).map(([id, questions]) => ({
    id,
    titleVi: 'Phần 3 - ' + id.split('_').pop()?.charAt(0).toUpperCase() + id.split('_').pop()?.slice(1),
    titleEn: 'Part 3 - ' + id.split('_').pop()?.charAt(0).toUpperCase() + id.split('_').pop()?.slice(1),
    descriptionVi: 'Thảo luận về các ý tưởng trừu tượng và chủ đề phức tạp',
    descriptionEn: 'Discussion of abstract ideas and complex topics',
    taskType: 'speaking_part3',
    level: 'C1',
    targetBand: '7.0-8.0',
    criteria: ['Analysis', 'Opinion', 'Solutions'],
    questions
  })),

  // Advanced Templates
  ...Object.entries(advancedTopics).map(([id, topic]) => ({
    id,
    titleVi: 'Nâng cao - ' + id.split('_').pop()?.charAt(0).toUpperCase() + id.split('_').pop()?.slice(1),
    titleEn: 'Advanced - ' + id.split('_').pop()?.charAt(0).toUpperCase() + id.split('_').pop()?.slice(1),
    descriptionVi: 'Thảo luận về các chủ đề phức tạp cho luyện tập nâng cao',
    descriptionEn: 'Complex discussion topics for high-level practice',
    taskType: 'speaking_advanced',
    level: 'C1',
    targetBand: '7.0-8.5',
    criteria: ['Critical Thinking', 'Argumentation', 'Analysis'],
    topic
  }))
];
