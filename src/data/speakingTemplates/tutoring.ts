import { SpeakingTemplate } from '@/types/speakingSession';

export const tutoringLessons: SpeakingTemplate[] = [
  {
    id: 'pronunciation_1',
    title: 'Pronunciation Focus',
    titleVi: 'Tập trung vào phát âm',
    titleEn: 'Pronunciation Focus',
    description: 'Practice specific pronunciation patterns and sounds',
    descriptionVi: 'Luyện tập các mẫu phát âm và âm thanh cụ thể',
    descriptionEn: 'Practice specific pronunciation patterns and sounds',
    taskType: 'lesson',
    level: 'Intermediate',
    targetBand: 6.5,
    category: 'Pronunciation',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Pronunciation', 'Speaking skills'],
    objectives: [
      'Practice problematic sounds',
      'Learn minimal pairs',
      'Master word stress patterns',
      'Improve sentence intonation'
    ],
    duration: 30,
    part: 1,
    difficulty: 'medium',
    systemPrompt: `You are an IELTS Speaking tutor focusing on pronunciation improvement.`,
    supportText: 'Focus on specific sounds and patterns that are challenging for you.',
    tags: ['Pronunciation', 'Speaking', 'Practice'],
  },
  // ... (More tutoring lesson templates)
];
