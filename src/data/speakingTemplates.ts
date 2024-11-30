import { SpeakingTemplate } from '@/types/speakingSession';

const baseInstructions = `You are an expert IELTS Speaking tutor proficient in interacting with Vietnamese learners of all levels. You possess the ability to seamlessly transition between the roles of an examiner, a language teacher, and a dedicated tutor. You understand the challenges Vietnamese learners face and can adapt your instruction to their specific needs, including utilizing bilingual explanations for low-level learners.

**As an Examiner:**
* Accurately assess speaking proficiency based on four IELTS criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.  
* Provide band scores and detailed feedback referencing specific examples from the learner's speech.
* Conduct mock speaking tests simulating the real IELTS exam environment.

**As a Language Teacher:**
* Begin by understanding the learner's current and target band scores
* Identify strengths and weaknesses across the four criteria
* Consider Vietnamese language transfer challenges
* Provide bilingual explanations when needed
* Encourage learners to verbalize thoughts in Vietnamese first if needed

**As a Tutor:**
* Provide clear instructions with bilingual support for low-level learners
* Offer practice exercises and speaking prompts
* Give detailed feedback on all four criteria
* Compare and contrast English and Vietnamese grammar/pronunciation`;

const part1SystemInstruction = `You are conducting IELTS Speaking Part 1 with Vietnamese learners.
- Ask simple questions about familiar topics
- Allow initial responses in Vietnamese for low-level learners
- Provide vocabulary support in both languages
- Focus on personal experiences
- Maintain a friendly, encouraging tone
- Give immediate feedback only for serious errors`;

const part2SystemInstruction = `You are conducting IELTS Speaking Part 2 (Cue Card) with Vietnamese learners.
- Present the cue card in both English and Vietnamese
- Allow 1 minute preparation time
- Let students make notes in Vietnamese if needed
- Listen without interruption for 1-2 minutes
- Ask follow-up questions
- Provide structured feedback on all criteria`;

const part3SystemInstruction = `You are conducting IELTS Speaking Part 3 with Vietnamese learners.
- Start with simpler questions before complex ones
- Help learners transition from Vietnamese thinking to English expression
- Encourage use of advanced structures
- Guide critical thinking development
- Connect to Vietnamese cultural context when relevant`;

interface SpeakingTemplate {
  id: string;
  title: string;
  titleVi: string;
  titleEn: string;
  description: string;
  descriptionVi: string;
  targetBand: number;
  duration: number;
  objectives: string[];
  systemPrompt: string;
  part: 1 | 2 | 3 | 'tutoring';
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  sampleQuestions: {
    en: string[];
    vi: string[];
  };
}

const part1Templates: SpeakingTemplate[] = [
  {
    id: 'p1_home_accommodation',
    title: 'Home & Accommodation',
    titleVi: 'Nhà ở & Chỗ ở',
    titleEn: 'Home & Accommodation',
    description: 'Practice describing your home, accommodation preferences, and living arrangements',
    descriptionVi: 'Luyện tập mô tả nhà ở, sở thích về chỗ ở và cách sắp xếp sinh hoạt',
    targetBand: 6.5,
    duration: 15,
    objectives: ['Fluent description', 'Housing vocabulary', 'Personal preferences'],
    systemPrompt: part1SystemInstruction,
    part: 1,
    level: 'intermediate',
    topics: ['Home description', 'Room preferences', 'Neighborhood'],
    sampleQuestions: {
      en: [
        'What kind of accommodation do you live in?',
        'What\'s your favorite room in your home?',
        'How long have you lived there?'
      ],
      vi: [
        'Bạn đang sống ở loại nhà như thế nào?',
        'Phòng nào là phòng bạn thích nhất trong nhà?',
        'Bạn đã sống ở đó bao lâu rồi?'
      ]
    }
  },
  {
    id: 'p1_family_relationships',
    title: 'Family Life',
    titleVi: 'Cuộc sống gia đình',
    titleEn: 'Family Life',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'relationships',
    description: 'Talk about your family and relationships',
    descriptionVi: 'Nói về gia đình và các mối quan hệ',
    descriptionEn: 'Talk about your family and relationships',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Family Members', 'Family Activities', 'Family Relationships'],
    objectives: [
      'Describe family structure',
      'Discuss family relationships',
      'Express opinions about family life'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_daily_routine_activities',
    title: 'Daily Routine',
    titleVi: 'Thói quen hàng ngày',
    titleEn: 'Daily Routine',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'daily_life',
    description: 'Describe your daily activities and routines',
    descriptionVi: 'Mô tả các hoạt động và thói quen hàng ngày',
    descriptionEn: 'Describe your daily activities and routines',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Morning Routine', 'Work/School Schedule', 'Leisure Activities'],
    objectives: [
      'Describe daily schedule',
      'Discuss time management',
      'Express preferences about daily activities'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_weather_and_seasons',
    title: 'Weather & Seasons',
    titleVi: 'Thời tiết & Mùa',
    titleEn: 'Weather & Seasons',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'environment',
    description: 'Discuss weather patterns and seasonal preferences',
    descriptionVi: 'Thảo luận về thói tiết và sở thích theo mùa',
    descriptionEn: 'Discuss weather patterns and seasonal preferences',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Weather Forecast', 'Seasonal Activities', 'Favorite Season'],
    objectives: [
      'Describe weather patterns',
      'Discuss seasonal preferences',
      'Express opinions about climate change'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_transportation_modes',
    title: 'Transportation',
    titleVi: 'Phương tiện di chuyển',
    titleEn: 'Transportation',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'daily_life',
    description: 'Talk about different modes of transport',
    descriptionVi: 'Nói về các phương tiện di chuyển khác nhau',
    descriptionEn: 'Talk about different modes of transport',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Public Transport', 'Private Transport', 'Sustainable Transport'],
    objectives: [
      'Describe transportation options',
      'Discuss transportation challenges',
      'Express opinions about transportation systems'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_technology_use',
    title: 'Technology Use',
    titleVi: 'Sử dụng công nghệ',
    titleEn: 'Technology Use',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'technology',
    description: 'Discuss daily technology use and preferences',
    descriptionVi: 'Thảo luận về việc sử dụng công nghệ hàng ngày',
    descriptionEn: 'Discuss daily technology use and preferences',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Smartphones', 'Computers', 'Gadgets'],
    objectives: [
      'Describe technology use',
      'Discuss technology benefits',
      'Express opinions about technology addiction'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_shopping_habits',
    title: 'Shopping Habits',
    titleVi: 'Thói quen mua sắm',
    titleEn: 'Shopping Habits',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'daily_life',
    description: 'Talk about shopping preferences and habits',
    descriptionVi: 'Nói về sở thích và thói quen mua sắm',
    descriptionEn: 'Talk about shopping preferences and habits',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Shopping Malls', 'Online Shopping', 'Favorite Brands'],
    objectives: [
      'Describe shopping habits',
      'Discuss shopping preferences',
      'Express opinions about consumerism'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_entertainment_preferences',
    title: 'Entertainment',
    titleVi: 'Giải trí',
    titleEn: 'Entertainment',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'entertainment',
    description: 'Discuss entertainment preferences',
    descriptionVi: 'Thảo luận về sở thích giải trí',
    descriptionEn: 'Discuss entertainment preferences',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Movies', 'Music', 'Hobbies'],
    objectives: [
      'Describe entertainment preferences',
      'Discuss favorite activities',
      'Express opinions about leisure time'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_social_media_usage',
    title: 'Social Media',
    titleVi: 'Mạng xã hội',
    titleEn: 'Social Media',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'technology',
    description: 'Talk about social media usage',
    descriptionVi: 'Nói về việc sử dụng mạng xã hội',
    descriptionEn: 'Talk about social media usage',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Facebook', 'Instagram', 'Twitter'],
    objectives: [
      'Describe social media use',
      'Discuss social media benefits',
      'Express opinions about social media addiction'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_hobbies_and_interests',
    title: 'Hobbies & Interests',
    titleVi: 'Sở thích & Điều yêu thích',
    titleEn: 'Hobbies & Interests',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about your hobbies and interests',
    descriptionVi: 'Các câu hỏi về sở thích và điều bạn yêu thích',
    descriptionEn: 'Questions about your hobbies and interests',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Sports', 'Music', 'Reading'],
    objectives: [
      'Describe hobbies',
      'Discuss interests',
      'Express opinions about leisure activities'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_transportation_modes_2',
    title: 'Transportation',
    titleVi: 'Phương tiện giao thông',
    titleEn: 'Transportation',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about different modes of transport',
    descriptionVi: 'Các câu hỏi về các phương tiện đi lại',
    descriptionEn: 'Questions about different modes of transport',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Cars', 'Buses', 'Trains'],
    objectives: [
      'Describe transportation options',
      'Discuss transportation challenges',
      'Express opinions about transportation systems'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_work_or_study',
    title: 'Work or Study',
    titleVi: 'Công việc hoặc học tập',
    titleEn: 'Work or Study',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about your work or studies',
    descriptionVi: 'Các câu hỏi về công việc hoặc việc học của bạn',
    descriptionEn: 'Questions about your work or studies',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Job', 'University', 'Career'],
    objectives: [
      'Describe work/study experience',
      'Discuss career goals',
      'Express opinions about work-life balance'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_hometown_experiences',
    title: 'Hometown',
    titleVi: 'Quê hương',
    titleEn: 'Hometown',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about where you grew up',
    descriptionVi: 'Các câu hỏi về nơi bạn lớn lên',
    descriptionEn: 'Questions about where you grew up',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Childhood', 'Family', 'Memories'],
    objectives: [
      'Describe hometown',
      'Discuss childhood experiences',
      'Express opinions about hometown'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_childhood_games_and_activities',
    title: 'Childhood Games',
    titleVi: 'Trò chơi thơi thơ ấu',
    titleEn: 'Childhood Games',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about games you played as a child',
    descriptionVi: 'Các câu hỏi về trò chơi bạn chơi khi còn nhỏ',
    descriptionEn: 'Questions about games you played as a child',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Toys', 'Games', 'Childhood'],
    objectives: [
      'Describe childhood games',
      'Discuss favorite games',
      'Express opinions about childhood activities'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_food_and_cooking_preferences',
    title: 'Food & Cooking',
    titleVi: 'Ẩm thực & Nấu ăn',
    titleEn: 'Food & Cooking',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about food preferences and cooking',
    descriptionVi: 'Các câu hỏi về sở thích ẩm thực và nấu ăn',
    descriptionEn: 'Questions about food preferences and cooking',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Food', 'Cooking', 'Recipes'],
    objectives: [
      'Describe food preferences',
      'Discuss cooking habits',
      'Express opinions about food culture'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_sports_and_exercise_habits',
    title: 'Sports & Exercise',
    titleVi: 'Thể thao & Tập thể dục',
    titleEn: 'Sports & Exercise',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about sports and exercise habits',
    descriptionVi: 'Các câu hỏi về thói quen thể thao và tập thể dục',
    descriptionEn: 'Questions about sports and exercise habits',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Sports', 'Exercise', 'Fitness'],
    objectives: [
      'Describe sports/exercise habits',
      'Discuss favorite sports',
      'Express opinions about physical activity'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_friends_and_friendship',
    title: 'Friends & Friendship',
    titleVi: 'Bạn bè & Tình bạn',
    titleEn: 'Friends & Friendship',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about friends and friendship',
    descriptionVi: 'Các câu hỏi về bạn bè và tình bạn',
    descriptionEn: 'Questions about friends and friendship',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Friends', 'Friendship', 'Social Life'],
    objectives: [
      'Describe friends',
      'Discuss friendship',
      'Express opinions about social relationships'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_music_and_dancing_preferences',
    title: 'Music & Dancing',
    titleVi: 'Âm nhạc & Khiêu vũ',
    titleEn: 'Music & Dancing',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about music preferences and dancing',
    descriptionVi: 'Các câu hỏi về sở thích âm nhạc và khiêu vũ',
    descriptionEn: 'Questions about music preferences and dancing',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Music', 'Dancing', 'Concerts'],
    objectives: [
      'Describe music preferences',
      'Discuss dancing habits',
      'Express opinions about music culture'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
  {
    id: 'p1_travel_experiences',
    title: 'Travel & Holidays',
    titleVi: 'Du lịch & Kỳ nghỉ',
    titleEn: 'Travel & Holidays',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\n${part1SystemInstruction}`,
    category: 'part1',
    description: 'Questions about travel experiences and holidays',
    descriptionVi: 'Các câu hỏi về trải nghiệm du lịch và kỳ nghỉ',
    descriptionEn: 'Questions about travel experiences and holidays',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Travel', 'Holidays', 'Tourism'],
    objectives: [
      'Describe travel experiences',
      'Discuss holiday preferences',
      'Express opinions about cultural exchange'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 1', 'Introduction', 'Basic']
  },
];

const part2Templates: SpeakingTemplate[] = [
  {
    id: 'p2_traditional_festival',
    title: 'Traditional Festival',
    titleVi: 'Lễ hội truyền thống',
    titleEn: 'Traditional Festival',
    part: 2,
    difficulty: 'medium',
    systemPrompt: `${baseInstructions}\n${part2SystemInstruction}`,
    category: 'culture',
    description: 'Describe a traditional festival you have attended',
    descriptionVi: 'Mô tả một lễ hội truyền thống bạn đã tham dự',
    descriptionEn: 'Describe a traditional festival you have attended',
    taskType: 'task2',
    level: 'Intermediate',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Festivals', 'Traditions', 'Cultural Events'],
    objectives: [
      'Describe festival activities',
      'Express cultural significance',
      'Share personal experiences'
    ],
    duration: 10,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 2', 'Description', 'Intermediate']
  },
  {
    id: 'p2_special_celebration',
    title: 'Special Celebration',
    titleVi: 'Dịp kỷ niệm đặc biệt',
    titleEn: 'Special Celebration',
    part: 2,
    difficulty: 'medium',
    systemPrompt: `${baseInstructions}\n${part2SystemInstruction}`,
    category: 'events',
    description: 'Describe a special celebration you remember',
    descriptionVi: 'Mô tả một dịp kỷ niệm đặc biệt bạn nhớ',
    descriptionEn: 'Describe a special celebration you remember',
    taskType: 'task2',
    level: 'Intermediate',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Celebrations', 'Special Events', 'Personal Memories'],
    objectives: [
      'Describe celebration details',
      'Express personal significance',
      'Share emotional impact'
    ],
    duration: 10,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 2', 'Description', 'Intermediate']
  }
];

const part3Templates: SpeakingTemplate[] = [
  {
    id: 'p3_globalization_impact',
    title: 'Globalization',
    titleVi: 'Toàn cầu hóa',
    titleEn: 'Globalization',
    part: 3,
    difficulty: 'hard',
    systemPrompt: `${baseInstructions}\n${part3SystemInstruction}`,
    category: 'society',
    description: 'Discuss the impact of globalization',
    descriptionVi: 'Thảo luận về tác động của toàn cầu hóa',
    descriptionEn: 'Discuss the impact of globalization',
    taskType: 'task2',
    level: 'Advanced',
    targetBand: 8.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Globalization', 'Cultural Exchange', 'Economic Impact'],
    objectives: [
      'Analyze global trends',
      'Evaluate cultural impact',
      'Discuss economic effects'
    ],
    duration: 15,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 3', 'Discussion', 'Advanced']
  },
  {
    id: 'p3_education_systems_comparison',
    title: 'Education Systems',
    titleVi: 'Hệ thống giáo dục',
    titleEn: 'Education Systems',
    part: 3,
    difficulty: 'hard',
    systemPrompt: `${baseInstructions}\n${part3SystemInstruction}`,
    category: 'education',
    description: 'Compare different education systems',
    descriptionVi: 'So sánh các hệ thống giáo dục khác nhau',
    descriptionEn: 'Compare different education systems',
    taskType: 'task2',
    level: 'Advanced',
    targetBand: 8.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Education Systems', 'Learning Methods', 'Academic Standards'],
    objectives: [
      'Compare education systems',
      'Evaluate teaching methods',
      'Discuss future trends'
    ],
    duration: 15,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Part 3', 'Discussion', 'Advanced']
  }
];

const basicTutoringTemplates: SpeakingTemplate[] = [
  {
    id: 'basic_pronunciation_practice',
    title: 'Basic Pronunciation Practice',
    titleVi: 'Luyện phát âm cơ bản',
    titleEn: 'Basic Pronunciation Practice',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\nFocus on basic pronunciation practice:\n- Introduce common sounds\n- Practice pronunciation of individual sounds\n- Focus on word stress and intonation\n- Encourage self-practice`,
    category: 'Tutoring',
    description: 'Practice basic pronunciation skills',
    descriptionVi: 'Luyện kỹ năng phát âm cơ bản',
    descriptionEn: 'Practice basic pronunciation skills',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Sound Recognition', 'Stress Patterns', 'Intonation', 'Connected Speech'],
    objectives: [
      'Master basic sounds',
      'Improve word stress',
      'Enhance intonation',
      'Practice connected speech'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Tutoring', 'Pronunciation', 'Basic']
  },
  {
    id: 'basic_grammar_practice',
    title: 'Essential Grammar Practice',
    titleVi: 'Luyện ngữ pháp cơ bản',
    titleEn: 'Essential Grammar Practice',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\nFocus on essential grammar practice:\n- Introduce basic grammar structures\n- Practice grammar in context\n- Focus on verb tenses and sentence structure\n- Encourage self-practice`,
    category: 'Tutoring',
    description: 'Practice essential grammar skills',
    descriptionVi: 'Luyện kỹ năng ngữ pháp cơ bản',
    descriptionEn: 'Practice essential grammar skills',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Grammar Rules', 'Sentence Structure', 'Verb Tenses', 'Basic Grammar'],
    objectives: [
      'Master basic grammar structures',
      'Improve sentence structure',
      'Understand verb tenses',
      'Practice grammar in context'
    ],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Tutoring', 'Grammar', 'Basic']
  }
];

const advancedTutoringTemplates: SpeakingTemplate[] = [
  {
    id: 'advanced_case_study_analysis',
    title: 'Business Case Study Analysis',
    titleVi: 'Phân tích tình huống',
    titleEn: 'Case Study Analysis',
    part: 2,
    difficulty: 'hard',
    systemPrompt: `${baseInstructions}\nGuide students through business case analysis:\n- Problem identification\n- Solution development\n- Implementation strategies\n- Result evaluation`,
    category: 'Tutoring',
    description: 'Analyze a business case study',
    descriptionVi: 'Phân tích tình huống kinh doanh',
    descriptionEn: 'Analyze a business case study',
    taskType: 'task2',
    level: 'Advanced',
    targetBand: 8.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Business Analysis', 'Case Studies', 'Problem-Solving'],
    objectives: [
      'Develop analytical thinking',
      'Improve business vocabulary',
      'Practice problem-solving communication',
      'Enhance presentation skills'
    ],
    duration: 15,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Tutoring', 'Case Study', 'Advanced']
  },
  {
    id: 'advanced_inversion_techniques',
    title: 'Advanced Inversion Techniques',
    titleVi: 'Kỹ thuật đảo ngữ nâng cao',
    titleEn: 'Advanced Inversion Techniques',
    part: 2,
    difficulty: 'hard',
    systemPrompt: `${baseInstructions}\nFocus on advanced inversion techniques:\n- Introduce complex inversion structures\n- Practice inversion in context\n- Focus on formal language and style\n- Encourage self-practice`,
    category: 'Tutoring',
    description: 'Practice advanced inversion techniques',
    descriptionVi: 'Luyện kỹ thuật đảo ngữ nâng cao',
    descriptionEn: 'Practice advanced inversion techniques',
    taskType: 'task2',
    level: 'Advanced',
    targetBand: 8.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Formal Language', 'Inversion Structures', 'Complex Grammar', 'Advanced Vocabulary'],
    objectives: [
      'Master advanced inversion structures',
      'Improve formal language',
      'Enhance complex grammar',
      'Practice advanced vocabulary'
    ],
    duration: 15,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Tutoring', 'Inversion', 'Advanced']
  }
];

const customTutoringTemplates: SpeakingTemplate[] = [
  {
    id: 'tutoring_custom_lesson',
    title: 'Custom Tutoring Lesson',
    titleVi: 'Bài học tùy chỉnh',
    titleEn: 'Custom Lesson',
    part: 1,
    difficulty: 'easy',
    systemPrompt: `${baseInstructions}\nThe specific lesson content will be determined by user input.
Follow the standard lesson structure:
1. Introduction and goal setting
2. Main content delivery
3. Practice and application
4. Review and feedback
5. Assignment and next steps

Model: learnlm-1.5-pro-experimental
Max tokens: 4000`,
    category: 'Tutoring',
    description: 'Custom tutoring lesson',
    descriptionVi: 'Bài học tùy chỉnh',
    descriptionEn: 'Custom tutoring lesson',
    taskType: 'task1',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Custom Topic'],
    objectives: ['Custom Objectives'],
    duration: 5,
    supportText: 'Remember to speak naturally and expand your answers with examples',
    tags: ['Tutoring', 'Custom', 'Basic']
  }
];

const tutoringTemplates: SpeakingTemplate[] = [
  ...basicTutoringTemplates,
  ...advancedTutoringTemplates,
  ...customTutoringTemplates
];

const speakingTemplates = [...part1Templates, ...part2Templates, ...part3Templates, ...basicTutoringTemplates, ...customTutoringTemplates];

export { part1Templates, part2Templates, part3Templates, basicTutoringTemplates, customTutoringTemplates };
export { speakingTemplates };