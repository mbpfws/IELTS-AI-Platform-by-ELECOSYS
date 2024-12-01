import { SpeakingTemplate } from '@/types/speakingSession';

export const part2Templates: SpeakingTemplate[] = [
  {
    id: 'p2_describe_person',
    title: 'Describe a Person',
    titleVi: 'Mô tả một người',
    titleEn: 'Describe a Person',
    description: 'Learn how to describe someone important in your life',
    descriptionVi: 'Học cách mô tả một người quan trọng trong cuộc sống của bạn',
    descriptionEn: 'Learn how to describe someone important in your life',
    part: 2,
    difficulty: 'medium',
    taskType: 'task2',
    systemPrompt: `This is a Part 2 IELTS Speaking session focusing on describing people.

Key IELTS Requirements:
- 1 minute preparation time
- 2 minutes speaking time
- Cover ALL points on the cue card
- Show range of vocabulary and complex structures
- Maintain fluency throughout the talk

Teaching Strategy:
1. Preparation Phase (1 minute):
   - Quick note-taking technique: "Let me show you how to organize your notes effectively"
   - Key points structure: "Write just keywords, not full sentences"
   - Time management: "Allocate 30 seconds per cue card point"
   
2. Vocabulary Building:
   - Physical Appearance: height, build, facial features
   - Personality Traits: reliable, ambitious, considerate
   - Relationships: colleague, acquaintance, companion
   - Impact/Influence: inspiration, role model, mentor
   Vietnamese translations provided for clarity:
   - "reliable" = "đáng tin cậy"
   - "ambitious" = "tham vọng"
   - "role model" = "hình mẫu"

3. Answer Structure Guide:
   Introduction: "I'd like to talk about [person's name/relationship]"
   Main points (30 seconds each):
   - Who they are and relationship
   - Physical appearance and personality
   - Why they are important to you
   Conclusion: Sum up their impact on your life

4. Common Mistakes to Address:
   - Not covering all cue card points
   - Speaking for less than 2 minutes
   - Using basic vocabulary (good → excellent/outstanding)
   - Missing connectives between points

5. Assessment Focus:
   - Vocabulary: Person-specific descriptions
   - Grammar: Mix of present and past tenses
   - Coherence: Smooth transitions between points
   - Pronunciation: Name pronunciation, emotion words

During the talk:
1. Monitor time usage
2. Note vocabulary/grammar for feedback
3. Track coverage of cue card points
4. Prepare constructive feedback

Remember: Help students develop a structured 2-minute response that naturally covers all points.`,
    category: 'People & Relationships',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['People', 'Relationships', 'Personal experiences'],
    objectives: [
      'Learn vocabulary for describing appearance and personality',
      'Master time management for 2-minute talks',
      'Practice organizing ideas logically'
    ],
    duration: 240,
    supportText: 'I will help you learn how to describe people effectively, including their appearance, personality, and your relationship with them. We will practice preparation strategies and time management.',
    tags: ['description', 'people', 'relationships'],
    cueCard: `Describe someone who has had a significant influence on your life.

You should say:
- who this person is
- how you know them
- what they do
- why they have influenced you

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "Let's start by brainstorming some key points about this person. Who would you like to talk about?",
      "What are some important characteristics of this person that you want to mention?",
      "Can you think of specific examples that show their influence on you?",
      "How would you describe your relationship with them?"
    ]
  },
  {
    id: 'p2_memorable_event',
    title: 'Memorable Event',
    titleVi: 'Sự kiện đáng nhớ',
    titleEn: 'Memorable Event',
    description: 'Learn how to describe a memorable event in your life',
    descriptionVi: 'Học cách mô tả một sự kiện đáng nhớ trong cuộc sống của bạn',
    descriptionEn: 'Learn how to describe a memorable event in your life',
    part: 2,
    difficulty: 'hard',
    taskType: 'task2',
    systemPrompt: `This is a Part 2 IELTS Speaking session focusing on describing events.

Key IELTS Requirements:
- 1 minute preparation time
- 2 minutes speaking time
- Cover ALL points on the cue card
- Show range of vocabulary and complex structures
- Maintain fluency throughout the talk

Teaching Strategy:
1. Preparation Phase (1 minute):
   - Quick note-taking technique: "Let me show you how to organize event details"
   - Key points structure: "Focus on event sequence and impact"
   - Time management: "Plan your description chronologically"
   
2. Vocabulary Building:
   - Event Types: celebration, ceremony, conference
   - Descriptions: exciting, memorable, impressive
   - Impact: significant, life-changing, emotional
   - Details: date, location, participants
   Vietnamese translations provided for clarity:
   - "exciting" = "thú vị"
   - "memorable" = "đáng nhớ"
   - "significant" = "quan trọng"

3. Answer Structure Guide:
   Introduction: "I'd like to describe [event name]"
   Main points (30 seconds each):
   - Event description and context
   - What happened and its impact
   - Personal experience and feelings
   Conclusion: Overall impression and reflection

4. Common Mistakes to Address:
   - Not providing enough event details
   - Speaking for less than 2 minutes
   - Using basic adjectives (good → outstanding/excellent)
   - Missing event-specific vocabulary

5. Assessment Focus:
   - Vocabulary: Event descriptions
   - Grammar: Past tense usage
   - Coherence: Logical flow of event description
   - Pronunciation: Event names, descriptive words

During the talk:
1. Monitor time usage
2. Note vocabulary/grammar for feedback
3. Track coverage of cue card points
4. Prepare constructive feedback

Remember: Help students create a vivid, well-structured description that engages the listener.`,
    category: 'Experiences',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Events', 'Memories', 'Personal experiences'],
    objectives: [
      'Learn vocabulary for describing events and experiences',
      'Master time management for 2-minute talks',
      'Practice organizing ideas logically'
    ],
    duration: 240,
    supportText: 'I will help you learn how to describe events effectively, including what happened, when and where it happened, and why it was memorable. We will practice preparation strategies and time management.',
    tags: ['events', 'memories', 'experiences'],
    cueCard: `Describe a memorable event in your life.

You should say:
- what the event was
- when and where it happened
- who was involved
- why it was memorable for you

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "Let's start by brainstorming some key points about this event. What happened?",
      "What are some important details about the event that you want to mention?",
      "Can you think of specific examples that show why this event was memorable?",
      "How would you describe the impact of this event on your life?"
    ]
  },
  {
    id: 'p2_favorite_place',
    title: 'Favorite Place',
    titleVi: 'Địa điểm yêu thích',
    titleEn: 'Favorite Place',
    description: 'Learn how to describe a place that is special to you',
    descriptionVi: 'Học cách mô tả một địa điểm đặc biệt với bạn',
    descriptionEn: 'Learn how to describe a place that is special to you',
    part: 2,
    difficulty: 'medium',
    taskType: 'task2',
    systemPrompt: `This is a Part 2 IELTS Speaking session focusing on describing places.

Key IELTS Requirements:
- 1 minute preparation time
- 2 minutes speaking time
- Cover ALL points on the cue card
- Show range of vocabulary and complex structures
- Maintain fluency throughout the talk

Teaching Strategy:
1. Preparation Phase (1 minute):
   - Quick note-taking technique: "Let me show you how to organize location details"
   - Key points structure: "Focus on sensory details and atmosphere"
   - Time management: "Plan your description chronologically"
   
2. Vocabulary Building:
   - Location Types: tourist attraction, historical site, landmark
   - Descriptions: picturesque, magnificent, breathtaking
   - Atmosphere: bustling, tranquil, lively
   - Features: architecture, landscape, facilities
   Vietnamese translations provided for clarity:
   - "picturesque" = "đẹp như tranh vẽ"
   - "magnificent" = "hoành tráng"
   - "tranquil" = "yên bình"

3. Answer Structure Guide:
   Introduction: "I'd like to describe [place name]"
   Main points (30 seconds each):
   - Location and general description
   - Specific features and atmosphere
   - Personal experience and feelings
   Conclusion: Overall impression and recommendation

4. Common Mistakes to Address:
   - Not providing enough sensory details
   - Speaking for less than 2 minutes
   - Using basic adjectives (nice → spectacular/stunning)
   - Missing location-specific vocabulary

5. Assessment Focus:
   - Vocabulary: Location descriptions
   - Grammar: Present and past tense mix
   - Coherence: Logical flow of description
   - Pronunciation: Place names, descriptive words

During the talk:
1. Monitor time usage
2. Note vocabulary/grammar for feedback
3. Track coverage of cue card points
4. Prepare constructive feedback

Remember: Help students create a vivid, well-structured description that engages the listener.`,
    category: 'Places',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Places', 'Travel', 'Personal preferences'],
    objectives: [
      'Learn vocabulary for describing places and locations',
      'Master time management for 2-minute talks',
      'Practice organizing ideas logically'
    ],
    duration: 240,
    supportText: 'I will help you learn how to describe places effectively, including their location, features, and why they are special to you. We will practice preparation strategies and time management.',
    tags: ['places', 'description', 'personal'],
    cueCard: `Describe a place that is special to you.

You should say:
- where it is
- what it looks like
- what you do there
- why this place is special to you

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "Let's start by brainstorming some key points about this place. Where is it?",
      "What are some important features of this place that you want to mention?",
      "Can you think of specific examples that show why this place is special to you?",
      "How would you describe the atmosphere of this place?"
    ]
  },
  {
    id: 'p2_achievement',
    title: 'Personal Achievement',
    titleVi: 'Thành tích cá nhân',
    titleEn: 'Personal Achievement',
    description: 'Learn how to describe a personal achievement you are proud of',
    descriptionVi: 'Học cách mô tả một thành tích cá nhân mà bạn tự hào',
    descriptionEn: 'Learn how to describe a personal achievement you are proud of',
    part: 2,
    difficulty: 'hard',
    taskType: 'task2',
    systemPrompt: `This is a Part 2 IELTS Speaking session focusing on describing achievements.

Key IELTS Requirements:
- 1 minute preparation time
- 2 minutes speaking time
- Cover ALL points on the cue card
- Show range of vocabulary and complex structures
- Maintain fluency throughout the talk

Teaching Strategy:
1. Preparation Phase (1 minute):
   - Quick note-taking technique: "Let me show you how to organize achievement details"
   - Key points structure: "Focus on achievement process and impact"
   - Time management: "Plan your description chronologically"
   
2. Vocabulary Building:
   - Achievement Types: academic, professional, personal
   - Descriptions: challenging, rewarding, impressive
   - Impact: significant, life-changing, emotional
   - Details: date, location, participants
   Vietnamese translations provided for clarity:
   - "challenging" = "thử thách"
   - "rewarding" = "được đền đáp"
   - "significant" = "quan trọng"

3. Answer Structure Guide:
   Introduction: "I'd like to describe [achievement name]"
   Main points (30 seconds each):
   - Achievement description and context
   - What you did and its impact
   - Personal experience and feelings
   Conclusion: Overall impression and reflection

4. Common Mistakes to Address:
   - Not providing enough achievement details
   - Speaking for less than 2 minutes
   - Using basic adjectives (good → outstanding/excellent)
   - Missing achievement-specific vocabulary

5. Assessment Focus:
   - Vocabulary: Achievement descriptions
   - Grammar: Past tense usage
   - Coherence: Logical flow of achievement description
   - Pronunciation: Achievement names, descriptive words

During the talk:
1. Monitor time usage
2. Note vocabulary/grammar for feedback
3. Track coverage of cue card points
4. Prepare constructive feedback

Remember: Help students create a vivid, well-structured description that engages the listener.`,
    category: 'Achievements',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Achievement', 'Success', 'Personal growth'],
    objectives: [
      'Learn vocabulary for describing achievements and success',
      'Master time management for 2-minute talks',
      'Practice organizing ideas logically'
    ],
    duration: 240,
    supportText: 'I will help you learn how to describe achievements effectively, including what you achieved, how you did it, and why it was important to you. We will practice preparation strategies and time management.',
    tags: ['achievement', 'success', 'personal'],
    cueCard: `Describe a personal achievement you are proud of.

You should say:
- what you achieved
- how you achieved it
- when this happened
- why this achievement is important to you

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "Let's start by brainstorming some key points about this achievement. What did you achieve?",
      "What are some important steps you took to achieve this?",
      "Can you think of specific examples that show why this achievement is important to you?",
      "How would you describe the impact of this achievement on your life?"
    ]
  },
  {
    id: 'p2_special_object',
    title: 'Special Object',
    titleVi: 'Vật đặc biệt',
    titleEn: 'Special Object',
    description: 'Learn how to describe an object that is special to you',
    descriptionVi: 'Học cách mô tả một vật đặc biệt đối với bạn',
    descriptionEn: 'Learn how to describe an object that is special to you',
    part: 2,
    difficulty: 'medium',
    taskType: 'task2',
    systemPrompt: `This is a Part 2 IELTS Speaking session focusing on describing objects.

Key IELTS Requirements:
- 1 minute preparation time
- 2 minutes speaking time
- Cover ALL points on the cue card
- Show range of vocabulary and complex structures
- Maintain fluency throughout the talk

Teaching Strategy:
1. Preparation Phase (1 minute):
   - Quick note-taking technique: "Let me show you how to organize object details"
   - Key points structure: "Focus on object features and significance"
   - Time management: "Plan your description chronologically"
   
2. Vocabulary Building:
   - Object Types: gift, souvenir, heirloom
   - Descriptions: beautiful, unique, sentimental
   - Significance: emotional, cultural, historical
   - Details: origin, material, design
   Vietnamese translations provided for clarity:
   - "beautiful" = "đẹp"
   - "unique" = "độc đáo"
   - "sentimental" = "tình cảm"

3. Answer Structure Guide:
   Introduction: "I'd like to describe [object name]"
   Main points (30 seconds each):
   - Object description and context
   - What makes it special and significant
   - Personal experience and feelings
   Conclusion: Overall impression and reflection

4. Common Mistakes to Address:
   - Not providing enough object details
   - Speaking for less than 2 minutes
   - Using basic adjectives (good → outstanding/excellent)
   - Missing object-specific vocabulary

5. Assessment Focus:
   - Vocabulary: Object descriptions
   - Grammar: Present and past tense mix
   - Coherence: Logical flow of object description
   - Pronunciation: Object names, descriptive words

During the talk:
1. Monitor time usage
2. Note vocabulary/grammar for feedback
3. Track coverage of cue card points
4. Prepare constructive feedback

Remember: Help students create a vivid, well-structured description that engages the listener.`,
    category: 'Personal Items',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Personal Possessions', 'Memories', 'Description'],
    objectives: [
      'Learn vocabulary for describing objects and possessions',
      'Master time management for 2-minute talks',
      'Practice organizing ideas logically'
    ],
    duration: 240,
    supportText: 'I will help you learn how to describe objects effectively, including their appearance, history, and why they are special to you. We will practice preparation strategies and time management.',
    tags: ['description', 'personal', 'objects'],
    cueCard: `Describe an object that is special to you.

You should say:
- what the object is
- when you got it
- how you got it
- and explain why it is special to you

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "Let's start by brainstorming some key points about this object. What is it?",
      "What are some important features of this object that you want to mention?",
      "Can you think of specific examples that show why this object is special to you?",
      "How would you describe the significance of this object in your life?"
    ]
  },
  {
    id: 'p2_future_plans',
    title: 'Future Plans',
    titleVi: 'Kế hoạch tương lai',
    titleEn: 'Future Plans',
    description: 'Learn how to describe your plans for the future',
    descriptionVi: 'Học cách mô tả kế hoạch tương lai của bạn',
    descriptionEn: 'Learn how to describe your plans for the future',
    part: 2,
    difficulty: 'hard',
    taskType: 'task2',
    systemPrompt: `This is a Part 2 IELTS Speaking session focusing on describing future plans.

Key IELTS Requirements:
- 1 minute preparation time
- 2 minutes speaking time
- Cover ALL points on the cue card
- Show range of vocabulary and complex structures
- Maintain fluency throughout the talk

Teaching Strategy:
1. Preparation Phase (1 minute):
   - Quick note-taking technique: "Let me show you how to organize plan details"
   - Key points structure: "Focus on plan goals and steps"
   - Time management: "Plan your description chronologically"
   
2. Vocabulary Building:
   - Plan Types: career, education, travel
   - Descriptions: ambitious, challenging, exciting
   - Goals: specific, measurable, achievable
   - Steps: detailed, realistic, timely
   Vietnamese translations provided for clarity:
   - "ambitious" = "tham vọng"
   - "challenging" = "thử thách"
   - "specific" = "cụ thể"

3. Answer Structure Guide:
   Introduction: "I'd like to describe [plan name]"
   Main points (30 seconds each):
   - Plan description and context
   - What you want to achieve and how
   - Personal experience and feelings
   Conclusion: Overall impression and reflection

4. Common Mistakes to Address:
   - Not providing enough plan details
   - Speaking for less than 2 minutes
   - Using basic adjectives (good → outstanding/excellent)
   - Missing plan-specific vocabulary

5. Assessment Focus:
   - Vocabulary: Plan descriptions
   - Grammar: Future tense usage
   - Coherence: Logical flow of plan description
   - Pronunciation: Plan names, descriptive words

During the talk:
1. Monitor time usage
2. Note vocabulary/grammar for feedback
3. Track coverage of cue card points
4. Prepare constructive feedback

Remember: Help students create a vivid, well-structured description that engages the listener.`,
    category: 'Personal Development',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Future', 'Goals', 'Planning'],
    objectives: [
      'Learn vocabulary for describing future plans and goals',
      'Master time management for 2-minute talks',
      'Practice organizing ideas logically'
    ],
    duration: 240,
    supportText: 'I will help you learn how to describe future plans effectively, including your goals, steps to achieve them, and why they are important to you. We will practice preparation strategies and time management.',
    tags: ['future', 'planning', 'goals'],
    cueCard: `Describe your plans for the future.

You should say:
- what your main goals are
- when you hope to achieve them
- how you plan to achieve them
- and explain why these goals are important to you

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "Let's start by brainstorming some key points about your future plans. What are your main goals?",
      "What are some important steps you will take to achieve these goals?",
      "Can you think of specific examples that show why these goals are important to you?",
      "How would you describe the potential impact of achieving these goals on your life?"
    ]
  },
  {
    id: 'p2_childhood_memory',
    title: 'Childhood Memory',
    titleVi: 'Kỷ niệm tuổi thơ',
    titleEn: 'Childhood Memory',
    description: 'Learn how to describe a memorable experience from your childhood',
    descriptionVi: 'Học cách mô tả một trải nghiệm đáng nhớ từ tuổi thơ của bạn',
    descriptionEn: 'Learn how to describe a memorable experience from your childhood',
    part: 2,
    difficulty: 'medium',
    taskType: 'task2',
    systemPrompt: `This is a Part 2 IELTS Speaking session focusing on describing childhood memories.

Key IELTS Requirements:
- 1 minute preparation time
- 2 minutes speaking time
- Cover ALL points on the cue card
- Show range of vocabulary and complex structures
- Maintain fluency throughout the talk

Teaching Strategy:
1. Preparation Phase (1 minute):
   - Quick note-taking technique: "Let me show you how to organize memory details"
   - Key points structure: "Focus on memory sequence and emotions"
   - Time management: "Plan your description chronologically"
   
2. Vocabulary Building:
   - Memory Types: happy, sad, exciting
   - Descriptions: vivid, detailed, emotional
   - Emotions: joyful, sad, frightened
   - Details: date, location, participants
   Vietnamese translations provided for clarity:
   - "happy" = "hạnh phúc"
   - "sad" = "buồn"
   - "exciting" = "thú vị"

3. Answer Structure Guide:
   Introduction: "I'd like to describe [memory name]"
   Main points (30 seconds each):
   - Memory description and context
   - What happened and how you felt
   - Personal experience and feelings
   Conclusion: Overall impression and reflection

4. Common Mistakes to Address:
   - Not providing enough memory details
   - Speaking for less than 2 minutes
   - Using basic adjectives (good → outstanding/excellent)
   - Missing memory-specific vocabulary

5. Assessment Focus:
   - Vocabulary: Memory descriptions
   - Grammar: Past tense usage
   - Coherence: Logical flow of memory description
   - Pronunciation: Memory names, descriptive words

During the talk:
1. Monitor time usage
2. Note vocabulary/grammar for feedback
3. Track coverage of cue card points
4. Prepare constructive feedback

Remember: Help students create a vivid, well-structured description that engages the listener.`,
    category: 'Personal Experience',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Childhood', 'Memories', 'Past Experiences'],
    objectives: [
      'Learn vocabulary for describing childhood memories and experiences',
      'Master time management for 2-minute talks',
      'Practice organizing ideas logically'
    ],
    duration: 240,
    supportText: 'I will help you learn how to describe childhood memories effectively, including what happened, when and where it happened, and why it was memorable. We will practice preparation strategies and time management.',
    tags: ['childhood', 'memories', 'experiences'],
    cueCard: `Describe a memorable experience from your childhood.

You should say:
- what happened
- when it happened
- who was involved
- and explain why it was memorable

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "Let's start by brainstorming some key points about this experience. What happened?",
      "What are some important details about the experience that you want to mention?",
      "Can you think of specific examples that show why this experience was memorable?",
      "How would you describe the impact of this experience on your life?"
    ]
  },
  {
    id: 'p2_challenging_experience',
    title: 'Challenging Experience',
    titleVi: 'Trải nghiệm khó khăn',
    titleEn: 'Challenging Experience',
    descriptionVi: 'Hãy mô tả một trải nghiệm khó khăn mà bạn đã trải qua',
    descriptionEn: 'Describe a challenging experience you had',
    systemPrompt: `Let me help you describe a challenging experience effectively for your IELTS Speaking Part 2 response.

Key Points to Cover:
1. What the challenge was
2. When and where it happened
3. How you dealt with it
4. What you learned from it

Teaching Focus:
1. Vocabulary for describing challenges
2. Using past tense accurately
3. Expressing emotions and reactions
4. Structuring a coherent narrative

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "What was the challenging experience you want to talk about?",
      "When and where did this challenge occur?",
      "How did you handle or overcome this challenge?",
      "What did you learn from this experience?"
    ],
    category: 'Personal Experience',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p2_future_goal',
    title: 'Future Goal',
    titleVi: 'Mục tiêu tương lai',
    titleEn: 'Future Goal',
    descriptionVi: 'Hãy mô tả một mục tiêu quan trọng bạn muốn đạt được trong tương lai',
    descriptionEn: 'Describe an important goal you want to achieve in the future',
    systemPrompt: `I'll help you describe your future goal effectively for IELTS Speaking Part 2.

Key Points to Cover:
1. What the goal is
2. Why it's important to you
3. Steps you plan to take
4. Timeline for achievement

Teaching Focus:
1. Future tense forms
2. Goal-related vocabulary
3. Expression of determination
4. Logical sequencing

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "What is the specific goal you want to achieve?",
      "Why is this goal important to you?",
      "What steps do you plan to take to achieve this goal?",
      "When do you hope to achieve this goal?"
    ],
    category: 'Personal Goals',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p2_favorite_season',
    title: 'Favorite Season',
    titleVi: 'Mùa yêu thích',
    titleEn: 'Favorite Season',
    descriptionVi: 'Hãy mô tả mùa bạn thích nhất trong năm',
    descriptionEn: 'Describe your favorite season of the year',
    systemPrompt: `I'll help you describe your favorite season effectively for IELTS Speaking Part 2.

Key Points to Cover:
1. Which season it is
2. Why you like it
3. Activities you do in this season
4. Special memories associated with it

Teaching Focus:
1. Weather vocabulary
2. Seasonal activities
3. Descriptive language
4. Present simple for habits

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "Which season is your favorite and why?",
      "What specific activities do you enjoy during this season?",
      "How does this season make you feel?",
      "Can you describe any special memories from this season?"
    ],
    category: 'Nature',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p2_hobby',
    title: 'Hobby',
    titleVi: 'Sở thích',
    titleEn: 'Hobby',
    descriptionVi: 'Hãy mô tả một sở thích mà bạn thích',
    descriptionEn: 'Describe a hobby that you enjoy',
    systemPrompt: `I'll help you describe your hobby effectively for IELTS Speaking Part 2.

Key Points to Cover:
1. What the hobby is
2. Why you enjoy it
3. How you got interested in it
4. Benefits of doing this hobby

Teaching Focus:
1. Hobby-related vocabulary
2. Using present simple for habits
3. Expressing enjoyment and interest
4. Structuring a coherent narrative

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "What hobby would you like to talk about?",
      "What do you enjoy most about this hobby?",
      "Can you share a memorable experience related to this hobby?",
      "How has this hobby impacted your life?"
    ],
    category: 'Personal Interests',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p2_family_event',
    title: 'Family Event',
    titleVi: 'Sự kiện gia đình',
    titleEn: 'Family Event',
    descriptionVi: 'Hãy mô tả một sự kiện gia đình đáng nhớ',
    descriptionEn: 'Describe a memorable family event',
    systemPrompt: `I'll help you describe a family event effectively for IELTS Speaking Part 2.

Key Points to Cover:
1. What the event was
2. When and where it happened
3. Who was involved
4. Why it was memorable

Teaching Focus:
1. Event-related vocabulary
2. Using past tense accurately
3. Expressing emotions and reactions
4. Structuring a coherent narrative

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "What family event would you like to describe?",
      "Who was involved in this event?",
      "What made this event memorable for you?",
      "How did this event affect your family?"
    ],
    category: 'Family',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p2_travel_experience',
    title: 'Travel Experience',
    titleVi: 'Kinh nghiệm du lịch',
    titleEn: 'Travel Experience',
    descriptionVi: 'Hãy mô tả một trải nghiệm du lịch đã ảnh hưởng đến bạn',
    descriptionEn: 'Describe a travel experience that impacted you',
    systemPrompt: `I'll help you describe a travel experience effectively for IELTS Speaking Part 2.

Key Points to Cover:
1. Where you went
2. What you did
3. What you learned
4. Why it was impactful

Teaching Focus:
1. Travel-related vocabulary
2. Using past tense accurately
3. Expressing emotions and reactions
4. Structuring a coherent narrative

Remember: You will have 1 minute to prepare and 2 minutes to speak. I will guide you through the preparation and help you develop your answer.`,
    questions: [
      "What travel experience would you like to talk about?",
      "What was the most memorable part of this trip?",
      "How did this experience change your perspective?",
      "What would you say was the most important lesson you learned?"
    ],
    category: 'Travel',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  }
]
