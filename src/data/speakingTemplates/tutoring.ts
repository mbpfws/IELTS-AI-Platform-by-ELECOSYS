import { SpeakingTemplate } from '@/types/speakingSession';

export const tutoringLessons: SpeakingTemplate[] = [
  {
    id: 'pronunciation-basics-lesson',
    title: 'Pronunciation Basics',
    titleVi: 'Pronunciation Basics',
    titleEn: 'Pronunciation Basics',
    descriptionEn: 'Practice specific pronunciation patterns and sounds',
    descriptionVi: 'Luyện tập các mẫu phát âm và âm thanh cụ thể',
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
    difficulty: 'medium',
    systemPrompt: `You are an IELTS Speaking tutor focusing on pronunciation improvement.`,
    supportText: 'Focus on specific sounds and patterns that are challenging for you.',
    tags: ['Pronunciation', 'Speaking', 'Practice'],
  },
  {
    id: 'fluency-builder-lesson',
    title: 'Fluency Builder',
    titleVi: 'Fluency Builder',
    titleEn: 'Fluency Builder',
    descriptionEn: 'Develop natural speaking flow and confidence',
    descriptionVi: 'Phát triển khả năng nói tự nhiên và tự tin',
    taskType: 'lesson',
    level: 'Intermediate',
    targetBand: 7.0,
    category: 'Fluency',
    criteria: ['Fluency', 'Coherence', 'Speaking Speed', 'Natural Flow'],
    topics: ['Fluency', 'Speaking skills'],
    objectives: [
      'Improve speaking speed',
      'Reduce hesitation',
      'Use natural fillers',
      'Develop rhythm in speech'
    ],
    duration: 30,
    difficulty: 'medium',
    systemPrompt: `You are an IELTS Speaking tutor focusing on building fluency.`,
    supportText: 'Practice speaking continuously without long pauses.',
    tags: ['Fluency', 'Speaking', 'Practice'],
  },
  {
    id: 'vocabulary-mastery-lesson',
    title: 'Vocabulary Mastery',
    titleVi: 'Vocabulary Mastery',
    titleEn: 'Vocabulary Mastery',
    descriptionEn: 'Master advanced vocabulary for IELTS topics',
    descriptionVi: 'Làm chủ từ vựng nâng cao cho các chủ đề IELTS',
    taskType: 'lesson',
    level: 'Advanced',
    targetBand: 7.5,
    category: 'Vocabulary',
    criteria: ['Vocabulary Range', 'Word Choice', 'Collocations', 'Idioms'],
    topics: ['Vocabulary', 'Speaking skills'],
    objectives: [
      'Learn topic-specific vocabulary',
      'Master collocations',
      'Use idiomatic expressions',
      'Improve word choice'
    ],
    duration: 30,
    difficulty: 'hard',
    systemPrompt: `You are an IELTS Speaking tutor focusing on vocabulary development.`,
    supportText: 'Expand your vocabulary with advanced terms and expressions.',
    tags: ['Vocabulary', 'Speaking', 'Advanced'],
  },
  {
    id: 'grammar-mastery-lesson',
    title: 'Grammar Mastery',
    titleVi: 'Grammar Mastery',
    titleEn: 'Grammar Mastery',
    descriptionEn: 'Perfect your grammar for higher band scores',
    descriptionVi: 'Hoàn thiện ngữ pháp để đạt điểm cao hơn',
    taskType: 'lesson',
    level: 'Advanced',
    targetBand: 7.5,
    category: 'Grammar',
    criteria: ['Grammar Accuracy', 'Complex Structures', 'Tense Usage', 'Sentence Formation'],
    topics: ['Grammar', 'Speaking skills'],
    objectives: [
      'Master complex structures',
      'Use correct tenses',
      'Improve sentence variety',
      'Eliminate common errors'
    ],
    duration: 30,
    difficulty: 'hard',
    systemPrompt: `You are an IELTS Speaking tutor focusing on grammar improvement.`,
    supportText: 'Focus on using correct and varied grammatical structures.',
    tags: ['Grammar', 'Speaking', 'Advanced'],
  },
  {
    id: 'session-start',
    titleEn: 'Session Start',
    titleVi: 'Bắt đầu buổi học',
    descriptionEn: 'Initial greeting and session setup',
    descriptionVi: 'Chào hỏi và thiết lập buổi học',
    taskType: 'system',
    level: 'All Levels',
    category: 'System',
    criteria: ['Setup'],
    topics: ['Introduction'],
    objectives: [
      'Start session smoothly',
      'Set session parameters',
      'Begin first topic'
    ],
    duration: 1,
    difficulty: 'easy',
    systemPrompt: `When the student says "Hi, my name is [Name]", respond briefly:
1. Acknowledge their name
2. Confirm session duration and topic
3. Move directly into the first question from the selected template

Example:
Student: "Hi, my name is An"
You: "Hi An! We'll have a [duration] minute speaking session focusing on [topic]. Let's begin with [first question]"

Keep it brief and natural - save detailed explanations for when they're needed during practice.`,
    supportText: '',
    tags: ['system', 'setup'],
  },
  {
    id: 'initial-greeting',
    titleEn: 'Lesson Introduction',
    titleVi: 'Giới thiệu bài học',
    descriptionEn: 'Warm welcome and session introduction',
    descriptionVi: 'Chào đón và giới thiệu buổi học',
    taskType: 'lesson',
    level: 'All Levels',
    category: 'Introduction',
    criteria: ['Engagement', 'Clarity', 'Support'],
    topics: ['Introduction', 'Session Overview'],
    objectives: [
      'Create a welcoming atmosphere',
      'Set clear expectations',
      'Build student confidence',
      'Establish rapport'
    ],
    duration: 5,
    difficulty: 'easy',
    systemPrompt: `You are a friendly and supportive IELTS Speaking tutor. Your role is to:

1. Welcome the student warmly and help them feel comfortable
2. Briefly explain how the session will work
3. Encourage them to speak naturally and not worry about mistakes
4. Remind them that you'll provide helpful feedback and vocabulary support
5. Use both English and Vietnamese when explaining new words or concepts

Start with a warm greeting and then explain that you'll help them practice speaking while providing feedback and support. Maintain an encouraging and positive tone throughout.`,
    supportText: "Hi! I'm your IELTS Speaking tutor for today. I'm here to help you practice and improve your English speaking skills. Don't worry about making mistakes - that's how we learn! I'll guide you through our session and provide helpful feedback and vocabulary support along the way. Would you like me to explain anything in Vietnamese to make sure you understand completely?",
    tags: ['Introduction', 'Welcome', 'Support'],
  },
  {
    id: 'advanced-vocabulary-builder',
    title: 'Advanced Vocabulary Builder',
    titleVi: 'Advanced Vocabulary Builder',
    titleEn: 'Advanced Vocabulary Builder',
    descriptionEn: 'Expand your vocabulary with advanced expressions and collocations',
    descriptionVi: 'Mở rộng vốn từ vựng với các cụm từ và kết hợp từ nâng cao',
    taskType: 'lesson',
    level: 'Advanced',
    targetBand: 7.0,
    category: 'Vocabulary',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Vocabulary', 'Collocations', 'Expressions'],
    objectives: [
      'Learn advanced collocations',
      'Master idiomatic expressions',
      'Practice natural word combinations',
      'Use sophisticated vocabulary'
    ],
    duration: 45,
    difficulty: 'hard',
    systemPrompt: `I'll help you expand your vocabulary with advanced expressions.

Focus Areas:
1. Topic-specific collocations
2. Academic expressions
3. Idiomatic language
4. Natural word combinations

Teaching Approach:
- Learn in context
- Practice with examples
- Regular review
- Active usage`,
    supportText: 'We will focus on vocabulary that will help you achieve a higher band score.',
    tags: ['Vocabulary', 'Advanced', 'Expressions']
  },
  {
    id: 'complex-grammar-structures',
    title: 'Complex Grammar Structures',
    titleVi: 'Complex Grammar Structures',
    titleEn: 'Complex Grammar Structures',
    descriptionEn: 'Master advanced grammar patterns for higher band scores',
    descriptionVi: 'Làm chủ các mẫu ngữ pháp nâng cao để đạt điểm cao hơn',
    taskType: 'lesson',
    level: 'Advanced',
    targetBand: 7.5,
    category: 'Grammar',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Grammar', 'Sentence Structure', 'Complex Patterns'],
    objectives: [
      'Use conditional structures',
      'Master relative clauses',
      'Practice passive constructions',
      'Learn advanced tense combinations'
    ],
    duration: 45,
    difficulty: 'hard',
    systemPrompt: `I'll help you master complex grammar structures.

Focus Areas:
1. Conditional sentences
2. Relative clauses
3. Passive voice
4. Perfect tenses

Teaching Approach:
- Step-by-step explanation
- Guided practice
- Error correction
- Real context usage`,
    supportText: 'We will practice complex grammar patterns that will help you express sophisticated ideas.',
    tags: ['Grammar', 'Advanced', 'Structure']
  },
  {
    id: 'natural-fluency-development',
    title: 'Natural Fluency Development',
    titleVi: 'Natural Fluency Development',
    titleEn: 'Natural Fluency Development',
    descriptionEn: 'Improve your speaking fluency and natural expression',
    descriptionVi: 'Cải thiện độ trôi chảy và cách diễn đạt tự nhiên',
    taskType: 'lesson',
    level: 'Intermediate',
    targetBand: 6.5,
    category: 'Fluency',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Fluency', 'Natural Speech', 'Connected Speech'],
    objectives: [
      'Reduce hesitation',
      'Improve speech flow',
      'Master connected speech',
      'Use natural fillers'
    ],
    duration: 40,
    difficulty: 'medium',
    systemPrompt: `I'll help you develop natural fluency in English.

Focus Areas:
1. Connected speech
2. Natural pausing
3. Stress patterns
4. Intonation

Teaching Approach:
- Shadowing exercises
- Rhythm practice
- Speed building
- Natural expression`,
    supportText: 'We will work on making your speech more natural and fluent.',
    tags: ['Fluency', 'Natural', 'Speaking']
  }
];
