import { SpeakingTemplate } from '@/types/speakingSession';

export const part1Templates: SpeakingTemplate[] = [
  {
    id: 'p1_home_accommodation',
    title: 'Home & Accommodation',
    titleVi: 'Nhà ở & Chỗ ở',
    titleEn: 'Home & Accommodation',
    description: 'Discuss your living situation and preferences',
    descriptionVi: 'Thảo luận về tình hình và sở thích về nhà ở',
    descriptionEn: 'Discuss your living situation and preferences',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `You are an IELTS examiner conducting a Part 1 speaking test about home and accommodation.
Guide the candidate through basic questions about their living situation, encouraging natural and detailed responses.`,
    category: 'Housing',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Housing', 'Lifestyle', 'Personal preferences'],
    objectives: [
      'Practice describing living spaces',
      'Express preferences about accommodation',
      'Use appropriate vocabulary for housing'
    ],
    duration: 240,
    supportText: 'Remember to describe your current living situation, what you like/dislike about it, and your ideal home.',
    tags: ['housing', 'lifestyle', 'preferences'],
    questions: [
      'Where do you currently live?',
      'What type of accommodation do you prefer?',
      'What do you like most about your home?',
      'Would you prefer to live in a house or an apartment? Why?'
    ]
  },
  {
    id: 'p1_work_studies',
    title: 'Work & Studies',
    titleVi: 'Công việc & Học tập',
    titleEn: 'Work & Studies',
    description: 'Talk about your work or study experience',
    descriptionVi: 'Nói về kinh nghiệm làm việc hoặc học tập',
    descriptionEn: 'Talk about your work or study experience',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `You are an IELTS examiner conducting a Part 1 speaking test about work and studies.
Ask questions about the candidate's work or study life, encouraging them to provide detailed responses about their experiences and preferences.`,
    category: 'Career',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Work', 'Education', 'Career goals'],
    objectives: [
      'Describe job responsibilities',
      'Express career aspirations',
      'Use professional vocabulary'
    ],
    duration: 240,
    supportText: 'Focus on your current work/study situation and your future plans.',
    tags: ['work', 'education', 'career'],
    questions: [
      'What do you do for work/study?',
      'Why did you choose this field?',
      'What do you enjoy most about your work/studies?',
      'What are your future career plans?'
    ]
  },
  {
    id: 'p1_hobbies_interests',
    title: 'Hobbies & Interests',
    titleVi: 'Sở thích & Điều yêu thích',
    titleEn: 'Hobbies & Interests',
    description: 'Share your hobbies and interests',
    descriptionVi: 'Chia sẻ về sở thích và điều bạn yêu thích',
    descriptionEn: 'Share your hobbies and interests',
    part: 1,
    difficulty: 'easy',
    taskType: 'task1',
    systemPrompt: `You are an IELTS examiner conducting a Part 1 speaking test about hobbies and interests.
Ask questions about the candidate's free time activities and interests, encouraging them to elaborate on their preferences.`,
    category: 'Leisure',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Hobbies', 'Free time', 'Entertainment'],
    objectives: [
      'Describe leisure activities',
      'Express preferences',
      'Use descriptive vocabulary'
    ],
    duration: 240,
    supportText: 'Talk about what you enjoy doing in your free time and why.',
    tags: ['hobbies', 'leisure', 'interests'],
    questions: [
      'What do you like to do in your free time?',
      'How long have you been interested in this hobby?',
      'Do you prefer indoor or outdoor activities?',
      'What hobbies were you interested in as a child?'
    ]
  },
  {
    id: 'p1_hometown_area',
    title: 'Hometown & Local Area',
    titleVi: 'Quê hương & Khu vực địa phương',
    titleEn: 'Hometown & Local Area',
    description: 'Describe your hometown and local area',
    descriptionVi: 'Mô tả quê hương và khu vực địa phương của bạn',
    descriptionEn: 'Describe your hometown and local area',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `You are an IELTS examiner conducting a Part 1 speaking test about hometowns and local areas.
Ask questions about the candidate's hometown and current living area, encouraging them to provide descriptive responses.`,
    category: 'Places',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Hometown', 'Local area', 'Geography'],
    objectives: [
      'Describe locations',
      'Compare places',
      'Use location-specific vocabulary'
    ],
    duration: 240,
    supportText: 'Describe the key features of your hometown and what makes it special.',
    tags: ['hometown', 'location', 'places'],
    questions: [
      'Where is your hometown located?',
      'What do you like most about your hometown?',
      'How has your hometown changed in recent years?',
      'Would you recommend visiting your hometown? Why?'
    ]
  }
];
