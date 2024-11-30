import { SpeakingTemplate } from '@/types/speakingSession';

export const part3Templates: SpeakingTemplate[] = [
  {
    id: 'p3_education_systems',
    title: 'Education Systems',
    titleVi: 'Hệ thống giáo dục',
    titleEn: 'Education Systems',
    description: 'Compare different education systems',
    descriptionVi: 'So sánh các hệ thống giáo dục khác nhau',
    descriptionEn: 'Compare different education systems',
    part: 3,
    difficulty: 'hard',
    taskType: 'lesson',
    systemPrompt: `You are an IELTS examiner conducting a Part 3 speaking test about education systems.
Guide the candidate through complex discussion questions, encouraging critical thinking and detailed responses.`,
    category: 'Education & Society',
    level: 'Advanced',
    targetBand: 7.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Education', 'Society', 'Development'],
    objectives: [
      'Express complex opinions',
      'Compare and contrast',
      'Use academic vocabulary'
    ],
    duration: 300,
    supportText: 'Focus on comparing different aspects of education systems, including advantages and disadvantages.',
    tags: ['education', 'society', 'analysis'],
    questions: [
      'How has education changed in your country over the past few decades?',
      'What are the main differences between education systems in developed and developing countries?',
      'Do you think traditional teaching methods are still relevant in modern education?',
      'How might education systems change in the future?'
    ]
  },
  {
    id: 'p3_technology_society',
    title: 'Technology & Society',
    titleVi: 'Công nghệ & Xã hội',
    titleEn: 'Technology & Society',
    description: 'Discuss the impact of technology on society',
    descriptionVi: 'Thảo luận về tác động của công nghệ đến xã hội',
    descriptionEn: 'Discuss the impact of technology on society',
    part: 3,
    difficulty: 'hard',
    taskType: 'lesson',
    systemPrompt: `You are an IELTS examiner conducting a Part 3 speaking test about technology and society.
Guide the candidate through complex discussion questions about technological advancement and its societal impacts.`,
    category: 'Technology',
    level: 'Advanced',
    targetBand: 7.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Technology', 'Society', 'Innovation'],
    objectives: [
      'Analyze technological impacts',
      'Express complex viewpoints',
      'Use technology-related vocabulary'
    ],
    duration: 300,
    supportText: 'Consider both positive and negative impacts of technology on different aspects of society.',
    tags: ['technology', 'society', 'change'],
    questions: [
      'How has technology changed the way we communicate?',
      'What are the potential risks of increasing technological dependence?',
      'Do you think technology has made our lives easier or more complicated?',
      'How might technology affect employment in the future?'
    ]
  },
  {
    id: 'p3_environment_sustainability',
    title: 'Environment & Sustainability',
    titleVi: 'Môi trường & Phát triển bền vững',
    titleEn: 'Environment & Sustainability',
    description: 'Discuss environmental issues and sustainability',
    descriptionVi: 'Thảo luận về các vấn đề môi trường và phát triển bền vững',
    descriptionEn: 'Discuss environmental issues and sustainability',
    part: 3,
    difficulty: 'hard',
    taskType: 'lesson',
    systemPrompt: `You are an IELTS examiner conducting a Part 3 speaking test about environmental issues.
Guide the candidate through complex discussion questions about environmental challenges and sustainable solutions.`,
    category: 'Environment',
    level: 'Advanced',
    targetBand: 7.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Environment', 'Sustainability', 'Climate change'],
    objectives: [
      'Discuss environmental issues',
      'Propose solutions',
      'Use environmental vocabulary'
    ],
    duration: 300,
    supportText: 'Consider global environmental challenges and potential solutions.',
    tags: ['environment', 'sustainability', 'climate'],
    questions: [
      'What are the biggest environmental challenges facing your country?',
      'How can individuals contribute to environmental protection?',
      'Do you think governments are doing enough to address climate change?',
      'What role should businesses play in environmental protection?'
    ]
  },
  {
    id: 'p3_globalization_culture',
    title: 'Globalization & Culture',
    titleVi: 'Toàn cầu hóa & Văn hóa',
    titleEn: 'Globalization & Culture',
    description: 'Explore the impact of globalization on culture',
    descriptionVi: 'Khám phá tác động của toàn cầu hóa đến văn hóa',
    descriptionEn: 'Explore the impact of globalization on culture',
    part: 3,
    difficulty: 'hard',
    taskType: 'lesson',
    systemPrompt: `You are an IELTS examiner conducting a Part 3 speaking test about globalization and cultural change.
Guide the candidate through complex discussion questions about cultural preservation and global influences.`,
    category: 'Culture',
    level: 'Advanced',
    targetBand: 7.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Globalization', 'Culture', 'Tradition'],
    objectives: [
      'Analyze cultural changes',
      'Discuss global influences',
      'Use cultural vocabulary'
    ],
    duration: 300,
    supportText: 'Consider both positive and negative effects of globalization on local cultures.',
    tags: ['globalization', 'culture', 'change'],
    questions: [
      'How has globalization affected traditional cultures?',
      'Is it possible to preserve traditional culture in a globalized world?',
      'What are the benefits and drawbacks of cultural exchange?',
      'How might globalization affect cultural diversity in the future?'
    ]
  }
];
