import { SpeakingTemplate } from '@/types/speakingSession';

export const part2Templates: SpeakingTemplate[] = [
  {
    id: 'p2_describe_person',
    title: 'Describe a Person',
    titleVi: 'Mô tả một người',
    titleEn: 'Describe a Person',
    description: 'Talk about someone important in your life',
    descriptionVi: 'Nói về một người quan trọng trong cuộc sống của bạn',
    descriptionEn: 'Talk about someone important in your life',
    part: 2,
    difficulty: 'medium',
    taskType: 'task2',
    systemPrompt: `You are an IELTS examiner conducting a Part 2 speaking test about describing a person.
Guide the candidate through this task, providing feedback on their response.`,
    category: 'People & Relationships',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['People', 'Relationships', 'Personal experiences'],
    objectives: [
      'Practice describing people',
      'Use appropriate adjectives',
      'Structure a longer response'
    ],
    duration: 240,
    supportText: 'Remember to include physical appearance, personality traits, and your relationship with the person.',
    tags: ['description', 'people', 'relationships'],
    cueCard: `Describe someone who has had a significant influence on your life.
You should say:
- Who this person is
- How you know them
- What qualities they have
- Why they have influenced you`
  },
  {
    id: 'p2_memorable_event',
    title: 'Memorable Event',
    titleVi: 'Sự kiện đáng nhớ',
    titleEn: 'Memorable Event',
    description: 'Describe a memorable event in your life',
    descriptionVi: 'Mô tả một sự kiện đáng nhớ trong cuộc sống của bạn',
    descriptionEn: 'Describe a memorable event in your life',
    part: 2,
    difficulty: 'hard',
    taskType: 'task2',
    systemPrompt: `You are an IELTS examiner conducting a Part 2 speaking test about a memorable event.
Guide the candidate to provide a detailed description of the event and its significance.`,
    category: 'Experiences',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Events', 'Memories', 'Personal experiences'],
    objectives: [
      'Narrate past events',
      'Express emotions and feelings',
      'Use past tense accurately'
    ],
    duration: 240,
    supportText: 'Include details about when it happened, who was involved, and why it was memorable.',
    tags: ['events', 'memories', 'experiences'],
    cueCard: `Describe a memorable event in your life.
You should say:
- What the event was
- When and where it happened
- Who was involved
- Why it was memorable for you`
  },
  {
    id: 'p2_favorite_place',
    title: 'Favorite Place',
    titleVi: 'Địa điểm yêu thích',
    titleEn: 'Favorite Place',
    description: 'Talk about a place that is special to you',
    descriptionVi: 'Nói về một địa điểm đặc biệt với bạn',
    descriptionEn: 'Talk about a place that is special to you',
    part: 2,
    difficulty: 'medium',
    taskType: 'task2',
    systemPrompt: `You are an IELTS examiner conducting a Part 2 speaking test about a favorite place.
Guide the candidate to describe the location and explain its personal significance.`,
    category: 'Places',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Places', 'Travel', 'Personal preferences'],
    objectives: [
      'Describe locations in detail',
      'Express personal connections',
      'Use descriptive language'
    ],
    duration: 240,
    supportText: 'Focus on both physical description and emotional significance of the place.',
    tags: ['places', 'description', 'personal'],
    cueCard: `Describe a place that is special to you.
You should say:
- Where it is
- What it looks like
- What you do there
- Why this place is special to you`
  },
  {
    id: 'p2_achievement',
    title: 'Personal Achievement',
    titleVi: 'Thành tích cá nhân',
    titleEn: 'Personal Achievement',
    description: 'Describe a personal achievement you are proud of',
    descriptionVi: 'Mô tả một thành tích cá nhân mà bạn tự hào',
    descriptionEn: 'Describe a personal achievement you are proud of',
    part: 2,
    difficulty: 'hard',
    taskType: 'task2',
    systemPrompt: `You are an IELTS examiner conducting a Part 2 speaking test about personal achievements.
Guide the candidate to describe their achievement and explain its significance.`,
    category: 'Achievements',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Achievement', 'Success', 'Personal growth'],
    objectives: [
      'Describe accomplishments',
      'Express personal growth',
      'Use achievement-related vocabulary'
    ],
    duration: 240,
    supportText: 'Include what you achieved, how you did it, and why it matters to you.',
    tags: ['achievement', 'success', 'personal'],
    cueCard: `Describe a personal achievement you are proud of.
You should say:
- What you achieved
- How you achieved it
- When this happened
- Why this achievement is important to you`
  }
];
