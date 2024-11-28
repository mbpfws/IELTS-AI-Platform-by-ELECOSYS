import { Template, CEFRLevel, IELTSBand } from '@/types/template';
import { systemInstruction } from '@/config/speakingAgent';
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
    title: 'Free Chat Practice',
    titleVi: 'Trò chuyện tự do',
    titleEn: 'Free Chat Practice',
    description: 'Practice general conversation skills without a specific template',
    descriptionVi: 'Trò chuyện tự do với AI tutor để luyện tập tiếng Anh',
    descriptionEn: 'Practice general conversation skills without a specific template',
    systemPrompt: 'You are an AI tutor helping the user practice conversational English skills.',
    taskType: 'task1' as const,
    level: 'All Levels',
    targetBand: 'Any',
    criteria: ['task_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range'] as const,
    topics: ['general_conversation', 'daily_life', 'interests', 'hobbies'],
    tags: ['conversational', 'interactive', 'adaptive'],
    objectives: [
      'Improve conversational fluency',
      'Expand vocabulary',
      'Practice natural communication',
      'Build confidence in speaking'
    ]
  },

  // Part 1 Templates
  ...Object.entries(part1Questions).map(([id, questions]) => {
    const titlePart = id.split('_').pop() || '';
    return {
      id,
      title: titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      titleVi: 'Phần 1 - ' + titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      titleEn: 'Part 1 - ' + titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      description: 'Practice answering questions about familiar topics',
      descriptionVi: 'Luyện tập trả lời các câu hỏi về chủ đề quen thuộc',
      descriptionEn: 'Practice answering questions about familiar topics',
      systemPrompt: 'Answer the following questions about familiar topics.',
      taskType: 'task1' as const,
      level: 'B1' as CEFRLevel,
      targetBand: '5.0-6.0' as IELTSBand,
      criteria: ['task_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range'] as const,
      topics: ['familiar_topics', 'daily_life', 'interests', 'hobbies'],
      tags: ['question_answer', 'familiar_topics'],
      objectives: [
        'Improve fluency in answering questions',
        'Expand vocabulary related to familiar topics',
        'Practice natural communication',
        'Build confidence in speaking'
      ],
      questions
    } as Template
  }),

  // Part 2 Templates
  ...Object.entries(part2Questions).map(([id, topic]) => {
    return {
      id,
      title: topic.topic,
      titleVi: 'Phần 2 - ' + topic.topic,
      titleEn: 'Part 2 - ' + topic.topic,
      description: 'Long turn speaking practice with cue card',
      descriptionVi: 'Luyện tập nói dài với thẻ gợi ý',
      descriptionEn: 'Long turn speaking practice with cue card',
      systemPrompt: 'Describe the following topic using the cue card.',
      taskType: 'task2' as const,
      level: 'B2' as CEFRLevel,
      targetBand: '6.0-7.0' as IELTSBand,
      criteria: ['task_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range'] as const,
      topics: ['long_turn_speaking', 'cue_card', 'description'],
      tags: ['long_turn', 'cue_card'],
      objectives: [
        'Improve fluency in long turn speaking',
        'Expand vocabulary related to the topic',
        'Practice structured description',
        'Build confidence in speaking'
      ],
      part: 'PART2',
      topic: topic.topic
    } as Template
  }),

  // Part 3 Templates
  ...Object.entries(part3Questions).map(([id, questions]) => {
    const titlePart = id.split('_').pop() || '';
    return {
      id,
      title: titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      titleVi: 'Phần 3 - ' + titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      titleEn: 'Part 3 - ' + titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      description: 'Discussion of abstract ideas and complex topics',
      descriptionVi: 'Thảo luận về các ý tưởng trừu tượng và chủ đề phức tạp',
      descriptionEn: 'Discussion of abstract ideas and complex topics',
      systemPrompt: 'Discuss the following topic.',
      taskType: 'task2' as const,
      level: 'C1' as CEFRLevel,
      targetBand: '7.0-8.0' as IELTSBand,
      criteria: ['task_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range'] as const,
      topics: ['abstract_ideas', 'complex_topics', 'discussion'],
      tags: ['abstract', 'complex', 'discussion'],
      objectives: [
        'Improve ability to discuss abstract ideas',
        'Develop complex topic discussion skills',
        'Enhance critical thinking',
        'Build confidence in speaking'
      ],
      part: 'PART3',
      topic: titlePart
    } as Template
  }),

  // Advanced Templates
  ...Object.entries(advancedTopics).map(([id, topic]) => {
    const titlePart = id.split('_').pop() || '';
    return {
      id,
      title: titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      titleVi: 'Nâng cao - ' + titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      titleEn: 'Advanced - ' + titlePart.charAt(0).toUpperCase() + titlePart.slice(1),
      description: 'Complex discussion topics for high-level practice',
      descriptionVi: 'Thảo luận về các chủ đề phức tạp cho luyện tập nâng cao',
      descriptionEn: 'Complex discussion topics for high-level practice',
      systemPrompt: 'Discuss the following advanced topic.',
      taskType: 'task2' as const,
      level: 'C1' as CEFRLevel,
      targetBand: '7.0-8.5' as IELTSBand,
      criteria: ['task_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range'] as const,
      topics: ['advanced_topics', 'complex_discussion', 'high_level'],
      tags: ['advanced', 'complex', 'high_level'],
      objectives: [
        'Master complex topic discussions',
        'Develop high-level communication skills',
        'Enhance abstract thinking',
        'Build confidence in speaking'
      ],
      part: 'PART3',
      topic: titlePart
    } as Template
  })
];
