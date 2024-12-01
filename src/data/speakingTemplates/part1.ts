import { SpeakingTemplate } from '@/types/speakingSession';

export const part1Templates: SpeakingTemplate[] = [
  {
    id: 'p1_home_accommodation',
    title: 'Home & Accommodation',
    titleVi: 'Nhà ở & Chỗ ở',
    titleEn: 'Home & Accommodation',
    description: 'Learn to discuss your living situation and preferences',
    descriptionVi: 'Học cách thảo luận về tình hình và sở thích về nhà ở',
    descriptionEn: 'Learn to discuss your living situation and preferences',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on home and accommodation.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to answer this. Listen to these useful words: accommodation, residential area, convenient facilities"
   - Demonstrate natural elaboration: "Instead of just saying 'I live in a house', say 'I live in a modern house in a quiet residential area'"

2. Vocabulary Building:
   - Housing Types: apartment, condominium, townhouse, detached house
   - Descriptions: spacious, well-furnished, newly-renovated
   - Locations: residential area, suburb, downtown, outskirts
   - Facilities: amenities, public transportation, parking space
   Vietnamese translations provided for clarity:
   - "residential area" = "khu dân cư"
   - "well-furnished" = "được trang bị đầy đủ"
   - "newly-renovated" = "mới được tu sửa"

3. Answer Structure Training:
   Basic: "I live in an apartment."
   Better: "I live in a well-furnished apartment (main point) in a modern residential complex (location). It's quite convenient because there are many facilities nearby (reason)."

4. Common Mistakes to Address:
   - Using simple vocabulary (house → residential property)
   - Not elaborating enough (teach natural extensions)
   - Missing linking words (because, since, as, therefore)

5. Assessment Focus:
   - Vocabulary: Using topic-specific words correctly
   - Grammar: Present simple, present continuous, adjective order
   - Fluency: Natural linking of ideas
   - Pronunciation: Word stress in compound nouns (residential area)

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Housing',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Housing', 'Lifestyle', 'Personal preferences'],
    objectives: [
      'Learn vocabulary for describing homes',
      'Practice expressing preferences about accommodation',
      'Master housing-related expressions'
    ],
    duration: 240,
    supportText: 'We will practice describing your living situation, preferences, and ideal home. I will help you improve your vocabulary and expressions.',
    tags: ['housing', 'lifestyle', 'preferences'],
    questions: [
      'Can you tell me about where you live?',
      'What type of home do you prefer, and why?',
      'What are some things you like about your current home?',
      "Would you prefer to live in a house or an apartment? Let's discuss the reasons."
    ]
  },
  {
    id: 'p1_work_studies',
    title: 'Work & Studies',
    titleVi: 'Công việc & Học tập',
    titleEn: 'Work & Studies',
    description: 'Learn to talk about your work or study experience',
    descriptionVi: 'Học cách nói về kinh nghiệm làm việc hoặc học tập',
    descriptionEn: 'Learn to talk about your work or study experience',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on work and studies.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to use professional terms: occupation, responsibilities, qualifications"
   - Demonstrate natural elaboration: "Instead of just saying 'I'm a student', say 'I'm pursuing a degree in [field] at [university]'"

2. Vocabulary Building:
   - Job Titles: occupation, profession, position, role
   - Work Activities: responsibilities, duties, tasks
   - Study Terms: major, specialization, research, coursework
   - Career Development: promotion, advancement, experience
   Vietnamese translations provided for clarity:
   - "occupation" = "nghề nghiệp"
   - "responsibilities" = "trách nhiệm"
   - "qualifications" = "bằng cấp"

3. Answer Structure Training:
   Basic: "I work as an engineer."
   Better: "I work as a software engineer (main point) at a technology company (detail). My main responsibilities include developing mobile applications (elaboration)."

4. Common Mistakes to Address:
   - Using simple job descriptions (worker → professional)
   - Not mentioning specific responsibilities
   - Missing linking words (moreover, additionally, furthermore)

5. Assessment Focus:
   - Vocabulary: Using professional terminology
   - Grammar: Present simple/continuous, past experience
   - Fluency: Smooth transitions between ideas
   - Pronunciation: Technical terms and job titles

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Career',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Work', 'Education', 'Career goals'],
    objectives: [
      'Learn vocabulary for describing job responsibilities',
      'Practice expressing career aspirations',
      'Master professional expressions'
    ],
    duration: 240,
    supportText: 'We will practice talking about your current work/study situation and your future plans. I will help you improve your vocabulary and expressions.',
    tags: ['work', 'education', 'career'],
    questions: [
      'What do you do for work/study?',
      'Why did you choose this field?',
      'What do you enjoy most about your work/studies?',
      "What are your future career plans? Let's discuss the reasons."
    ]
  },
  {
    id: 'p1_hobbies_interests',
    title: 'Hobbies & Interests',
    titleVi: 'Sở thích & Điều yêu thích',
    titleEn: 'Hobbies & Interests',
    description: 'Learn to share your hobbies and interests',
    descriptionVi: 'Học cách chia sẻ về sở thích và điều bạn yêu thích',
    descriptionEn: 'Learn to share your hobbies and interests',
    part: 1,
    difficulty: 'easy',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on hobbies and interests.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe activities: passionate about, enthusiastic, dedicated to"
   - Demonstrate natural elaboration: "Instead of just saying 'I like reading', say 'I'm passionate about reading historical novels'"

2. Vocabulary Building:
   - Activity Types: pastimes, leisure activities, recreational pursuits
   - Frequency: regularly, occasionally, frequently
   - Preferences: prefer, enjoy, passionate about
   - Emotions: exciting, relaxing, challenging
   Vietnamese translations provided for clarity:
   - "passionate about" = "đam mê"
   - "recreational" = "giải trí"
   - "leisure activities" = "hoạt động giải trí"

3. Answer Structure Training:
   Basic: "I like playing sports."
   Better: "I'm really passionate about playing basketball (main point). I play twice a week with my friends (frequency) and find it both exciting and challenging (feelings)."

4. Common Mistakes to Address:
   - Using basic vocabulary (like → enjoy/love/passionate about)
   - Not explaining reasons for preferences
   - Missing time expressions and frequency

5. Assessment Focus:
   - Vocabulary: Activity-specific terms
   - Grammar: Present simple, frequency adverbs
   - Fluency: Natural expression of interests
   - Pronunciation: Emotion words and activity names

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Leisure',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Hobbies', 'Free time', 'Entertainment'],
    objectives: [
      'Learn vocabulary for describing leisure activities',
      'Practice expressing preferences',
      'Master descriptive expressions'
    ],
    duration: 240,
    supportText: 'We will practice talking about what you enjoy doing in your free time and why. I will help you improve your vocabulary and expressions.',
    tags: ['hobbies', 'leisure', 'interests'],
    questions: [
      'What do you like to do in your free time?',
      'How long have you been interested in this hobby?',
      'Do you prefer indoor or outdoor activities?',
      'What hobbies were you interested in as a child? Let us discuss the reasons.'
    ]
  },
  {
    id: 'p1_hometown_area',
    title: 'Hometown & Local Area',
    titleVi: 'Quê hương & Khu vực địa phương',
    titleEn: 'Hometown & Local Area',
    description: 'Learn to describe your hometown and local area',
    descriptionVi: 'Học cách mô tả quê hương và khu vực địa phương của bạn',
    descriptionEn: 'Learn to describe your hometown and local area',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on hometown and local area.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe locations: metropolitan area, cultural heritage, local attractions"
   - Demonstrate natural elaboration: "Instead of just saying 'I live in Hanoi', say 'I live in Hanoi, a vibrant city known for its rich cultural heritage'"

2. Vocabulary Building:
   - Location Types: metropolis, suburb, rural area, coastal city
   - Features: landmarks, attractions, facilities
   - Descriptions: bustling, peaceful, historic, modern
   - Development: infrastructure, urbanization, preservation
   Vietnamese translations provided for clarity:
   - "metropolis" = "thành phố lớn"
   - "cultural heritage" = "di sản văn hóa"
   - "infrastructure" = "cơ sở hạ tầng"

3. Answer Structure Training:
   Basic: "My hometown is Hanoi."
   Better: "My hometown is Hanoi (main point), a bustling metropolis in northern Vietnam (location). It's famous for its thousand-year history and unique blend of traditional and modern culture (details)."

4. Common Mistakes to Address:
   - Using simple location descriptions (big → metropolitan)
   - Not mentioning unique characteristics
   - Missing descriptive adjectives

5. Assessment Focus:
   - Vocabulary: Location-specific terms
   - Grammar: Present simple, past simple for history
   - Fluency: Smooth description flow
   - Pronunciation: Place names and descriptive terms

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Places',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Hometown', 'Local area', 'Geography'],
    objectives: [
      'Learn vocabulary for describing locations',
      'Practice comparing places',
      'Master location-specific expressions'
    ],
    duration: 240,
    supportText: 'We will practice describing the key features of your hometown and what makes it special. I will help you improve your vocabulary and expressions.',
    tags: ['hometown', 'location', 'places'],
    questions: [
      'Where is your hometown located?',
      'What do you like most about your hometown?',
      'How has your hometown changed in recent years?',
      'Would you recommend visiting your hometown? Let us discuss the reasons.'
    ]
  },
  {
    id: 'p1_daily_routine',
    title: 'Daily Routine',
    titleVi: 'Thói quen hàng ngày',
    titleEn: 'Daily Routine',
    description: 'Learn to discuss your daily activities and habits',
    descriptionVi: 'Học cách thảo luận về các hoạt động và thói quen hàng ngày của bạn',
    descriptionEn: 'Learn to discuss your daily activities and habits',
    part: 1,
    difficulty: 'easy',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on daily routines and habits.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe daily routines: morning routine, daily schedule, time management"
   - Demonstrate natural elaboration: "Instead of just saying 'I wake up at 7', say 'I wake up at 7 and start my day with a 30-minute exercise routine'"

2. Vocabulary Building:
   - Time Expressions: morning, afternoon, evening, night
   - Daily Activities: breakfast, lunch, dinner, commute
   - Habits: regular, occasional, frequent
   - Time Management: schedule, prioritize, allocate
   Vietnamese translations provided for clarity:
   - "morning routine" = "thói quen buổi sáng"
   - "daily schedule" = "lịch trình hàng ngày"
   - "time management" = "quản lý thời gian"

3. Answer Structure Training:
   Basic: "I wake up at 7."
   Better: "I wake up at 7 (main point) and start my day with a 30-minute exercise routine (elaboration). Then, I have breakfast and get ready for work (sequence)."

4. Common Mistakes to Address:
   - Using simple time expressions (morning → early morning)
   - Not explaining daily routines
   - Missing time management vocabulary

5. Assessment Focus:
   - Vocabulary: Time expressions and daily activities
   - Grammar: Present simple, present continuous for routines
   - Fluency: Smooth transitions between activities
   - Pronunciation: Time expressions and daily activity names

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Lifestyle',
    level: 'Beginner',
    targetBand: 5.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Daily Life', 'Time Management', 'Habits'],
    objectives: [
      'Learn vocabulary for describing daily activities',
      'Practice using time expressions correctly',
      'Master expressions for daily routines'
    ],
    duration: 240,
    supportText: 'We will practice talking about your daily routine, focusing on time expressions and sequence words. I will help you improve your vocabulary and expressions.',
    tags: ['routine', 'daily life', 'time'],
    questions: [
      "Could you tell me about your typical morning routine?",
      "What time do you usually wake up?",
      "Do you prefer to get up early or stay up late? Why?",
      "What do you usually have for breakfast?",
      "How do you usually get to work/school? Let's discuss the reasons."
    ]
  },
  {
    id: 'p1_family_friends',
    title: 'Family and Friends',
    titleVi: 'Gia đình và bạn bè',
    titleEn: 'Family and Friends',
    description: 'Learn to talk about your relationships with family and friends',
    descriptionVi: 'Học cách nói về mối quan hệ với gia đình và bạn bè',
    descriptionEn: 'Learn to talk about your relationships with family and friends',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on family and friendships.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe relationships: close, supportive, loving"
   - Demonstrate natural elaboration: "Instead of just saying 'I have a big family', say 'I come from a close-knit family with three siblings'"

2. Vocabulary Building:
   - Family Members: parents, siblings, relatives
   - Relationships: close, supportive, loving
   - Interactions: often, occasionally, rarely
   - Feelings: happy, sad, proud
   Vietnamese translations provided for clarity:
   - "close-knit" = "gần gũi"
   - "supportive" = "hỗ trợ"
   - "loving" = "yêu thương"

3. Answer Structure Training:
   Basic: "I have a big family."
   Better: "I come from a close-knit family (main point) with three siblings (detail). We often spend time together on weekends (interaction)."

4. Common Mistakes to Address:
   - Using simple vocabulary (big → large/close-knit)
   - Not explaining relationships
   - Missing feelings and emotions

5. Assessment Focus:
   - Vocabulary: Family and relationship-specific terms
   - Grammar: Present simple, past simple for experiences
   - Fluency: Natural expression of relationships
   - Pronunciation: Family member names and relationship terms

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Relationships',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Family', 'Friendship', 'Social Life'],
    objectives: [
      'Learn vocabulary for describing family relationships',
      'Practice expressing feelings about friends',
      'Master relationship-specific expressions'
    ],
    duration: 240,
    supportText: 'We will practice talking about your relationships with family and friends, focusing on descriptive adjectives and expressions. I will help you improve your vocabulary and expressions.',
    tags: ['family', 'friends', 'relationships'],
    questions: [
      'Do you have a large or small family?',
      'Who do you spend most of your free time with?',
      'How often do you meet with your friends?',
      'What activities do you enjoy doing with your family?',
      "Do you prefer spending time with family or friends? Let's discuss the reasons."
    ]
  },
  {
    id: 'p1_technology',
    title: 'Technology Usage',
    titleVi: 'Sử dụng công nghệ',
    titleEn: 'Technology Usage',
    description: 'Learn to discuss how you use technology in daily life',
    descriptionVi: 'Học cách thảo luận về việc sử dụng công nghệ trong cuộc sống hàng ngày',
    descriptionEn: 'Learn to discuss how you use technology in daily life',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on technology and daily life.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe technology usage: frequently, occasionally, rarely"
   - Demonstrate natural elaboration: "Instead of just saying 'I use my phone a lot', say 'I frequently use my phone to stay connected with friends and family'"

2. Vocabulary Building:
   - Technology Types: smartphone, computer, tablet
   - Usage: frequently, occasionally, rarely
   - Purposes: communication, entertainment, education
   - Benefits: convenient, efficient, time-saving
   Vietnamese translations provided for clarity:
   - "frequently" = "thường xuyên"
   - "occasionally" = "thỉnh thoảng"
   - "rarely" = "hiếm khi"

3. Answer Structure Training:
   Basic: "I use my phone a lot."
   Better: "I frequently use my phone (main point) to stay connected with friends and family (purpose). It's convenient and efficient (benefits)."

4. Common Mistakes to Address:
   - Using simple vocabulary (a lot → frequently/often)
   - Not explaining technology usage
   - Missing benefits and purposes

5. Assessment Focus:
   - Vocabulary: Technology-specific terms
   - Grammar: Present simple, present continuous for habits
   - Fluency: Natural expression of technology usage
   - Pronunciation: Technology names and usage terms

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Modern Life',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Technology', 'Digital Life', 'Modern Habits'],
    objectives: [
      'Learn vocabulary for describing technology usage patterns',
      'Practice expressing opinions about digital tools',
      'Master technology-related expressions'
    ],
    duration: 240,
    supportText: 'We will practice talking about how and why you use different technologies in your daily life. I will help you improve your vocabulary and expressions.',
    tags: ['technology', 'digital', 'modern life'],
    questions: [
      'What kind of technology do you use most often?',
      'How much time do you spend on your phone each day?',
      'What do you mainly use the internet for?',
      'Do you think technology has made your life easier? Why/why not?',
      "What is your favorite app or website? Why do you like it? Let's discuss the reasons."
    ]
  },
  {
    id: 'p1_technology_usage',
    title: 'Technology in Daily Life',
    titleVi: 'Công nghệ trong cuộc sống hàng ngày',
    titleEn: 'Technology in Daily Life',
    description: 'Discuss how you use technology in your everyday life',
    descriptionVi: 'Thảo luận về cách bạn sử dụng công nghệ trong cuộc sống hàng ngày',
    descriptionEn: 'Discuss how you use technology in your everyday life',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on technology usage.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe technology usage: rely on, integrate, enhance"
   - Demonstrate natural elaboration: "Instead of just saying 'I use my phone a lot', say 'I rely heavily on my smartphone to manage my daily tasks and stay connected with friends and family'"

2. Vocabulary Building:
   - Tech Devices: smartphone, laptop, tablet, smartwatch
   - Usage: browse, stream, download, upload
   - Frequency: constantly, regularly, occasionally
   - Benefits: convenience, efficiency, connectivity
   Vietnamese translations provided for clarity:
   - "rely on" = "phụ thuộc vào"
   - "integrate" = "tích hợp"
   - "enhance" = "nâng cao"

3. Answer Structure Training:
   Basic: "I use my phone every day."
   Better: "I rely on my smartphone constantly (frequency) for various tasks like checking emails and social media (usage). It greatly enhances my productivity and keeps me connected (benefits)."

4. Common Mistakes to Address:
   - Using simple vocabulary (a lot → frequently/often)
   - Not explaining technology usage
   - Missing benefits and purposes

5. Assessment Focus:
   - Vocabulary: Technology-specific terms
   - Grammar: Present simple, present continuous for habits
   - Fluency: Natural expression of technology usage
   - Pronunciation: Technology names and usage terms

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Modern Life',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Technology', 'Digital Life', 'Modern Habits'],
    objectives: [
      'Learn vocabulary for describing technology usage patterns',
      'Practice expressing opinions about digital tools',
      'Master technology-related expressions'
    ],
    duration: 240,
    supportText: 'We will practice talking about how and why you use different technologies in your daily life. I will help you improve your vocabulary and expressions.',
    tags: ['technology', 'digital', 'modern life'],
    questions: [
      'What kind of technology do you use most often?',
      'How much time do you spend on your phone each day?',
      'What do you mainly use the internet for?',
      'Do you think technology has made your life easier? Why/why not?',
      "What is your favorite app or website? Why do you like it? Let's discuss the reasons."
    ]
  },
  {
    id: 'p1_hobbies_interests',
    title: 'Hobbies and Interests',
    titleVi: 'Sở thích và Đam mê',
    titleEn: 'Hobbies and Interests',
    description: 'Practice discussing your favorite activities and pastimes',
    descriptionVi: 'Luyện tập thảo luận về các hoạt động và sở thích yêu thích của bạn',
    descriptionEn: 'Practice discussing your favorite activities and pastimes',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on hobbies and interests.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe hobbies: passionate about, enthusiastic, dedicate time to"
   - Demonstrate natural elaboration: "Instead of just saying 'I like reading', say 'I'm passionate about reading historical novels, which I dedicate time to every evening'"

2. Vocabulary Building:
   - Hobby Types: indoor, outdoor, creative, physical
   - Frequency: regularly, occasionally, whenever I have free time
   - Feelings: passionate, enthusiastic, fascinated by
   - Benefits: relaxing, challenging, rewarding
   Vietnamese translations provided for clarity:
   - "passionate" = "đam mê"
   - "enthusiastic" = "nhiệt tình"
   - "fascinated" = "say mê"

3. Answer Structure Training:
   Basic: "I like playing soccer."
   Better: "I'm enthusiastic about playing soccer (main point) and try to join a match every weekend (frequency). It's both challenging and rewarding (benefits)."

4. Common Mistakes to Address:
   - Using simple vocabulary (like → passionate about/keen on)
   - Not explaining why they enjoy the hobby
   - Missing frequency or benefits

5. Assessment Focus:
   - Vocabulary: Hobby-specific terms and descriptive adjectives
   - Grammar: Present simple for habits, present perfect for experiences
   - Fluency: Natural expression of interests and preferences
   - Pronunciation: Hobby names and descriptive terms

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Personal Interests',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Hobbies', 'Leisure Activities', 'Personal Interests'],
    objectives: [
      'Learn vocabulary for describing various hobbies and interests',
      'Practice expressing enthusiasm and dedication to activities',
      'Master expressions related to frequency and benefits of hobbies'
    ],
    duration: 240,
    supportText: 'We will practice talking about your hobbies and interests, focusing on expressing enthusiasm and describing the benefits of your favorite activities. I will help you improve your vocabulary and expressions.',
    tags: ['hobbies', 'interests', 'leisure'],
    questions: [
      'What do you enjoy doing in your free time?',
      'How often do you engage in your favorite hobby?',
      'Have you recently taken up any new interests or activities?',
      'What benefits do you get from your hobbies?',
      "Is there a hobby you'd like to try in the future? Why does it interest you?"
    ]
  },
  {
    id: 'p1_hometown',
    title: 'Hometown and Local Area',
    titleVi: 'Quê hương và Khu vực địa phương',
    titleEn: 'Hometown and Local Area',
    description: 'Learn to describe your hometown and local surroundings',
    descriptionVi: 'Học cách mô tả quê hương và môi trường xung quanh của bạn',
    descriptionEn: 'Learn to describe your hometown and local surroundings',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on hometowns and local areas.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe your hometown: bustling, scenic, historic"
   - Demonstrate natural elaboration: "Instead of just saying 'My hometown is big', say 'My hometown is a bustling city known for its historic landmarks and scenic parks'"

2. Vocabulary Building:
   - Location Descriptors: coastal, rural, urban, suburban
   - Size and Population: populous, sprawling, compact
   - Characteristics: diverse, traditional, modern, cultural
   - Attractions: landmarks, cuisine, festivals, natural beauty
   Vietnamese translations provided for clarity:
   - "bustling" = "nhộn nhịp"
   - "scenic" = "phong cảnh đẹp"
   - "historic" = "lịch sử"

3. Answer Structure Training:
   Basic: "My hometown is nice."
   Better: "My hometown is a scenic coastal city (main point) known for its beautiful beaches and seafood cuisine (characteristics). It's a popular tourist destination in the summer (additional information)."

4. Common Mistakes to Address:
   - Using simple vocabulary (nice → picturesque/charming)
   - Not providing specific details about the location
   - Missing unique characteristics or attractions

5. Assessment Focus:
   - Vocabulary: Location-specific terms and descriptive adjectives
   - Grammar: Present simple for facts, past simple for history
   - Fluency: Natural description of hometown features
   - Pronunciation: Place names and descriptive terms

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Places',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Hometown', 'Local Area', 'Geography'],
    objectives: [
      'Learn vocabulary for describing locations and their features',
      'Practice expressing opinions about places',
      'Master expressions related to geography and local attractions'
    ],
    duration: 240,
    supportText: 'We will practice talking about your hometown and local area, focusing on descriptive language and highlighting unique features. I will help you improve your vocabulary and expressions.',
    tags: ['hometown', 'local area', 'geography'],
    questions: [
      'Where is your hometown located?',
      'What is your hometown known for?',
      'How has your hometown changed in recent years?',
      'What do you like most about your local area?',
      "If you could change one thing about your hometown, what would it be and why?"
    ]
  },
  {
    id: 'p1_daily_routine_basic',
    title: 'Basic Daily Routine',
    titleVi: 'Thói quen hàng ngày cơ bản',
    titleEn: 'Basic Daily Routine',
    description: 'Learn to describe your daily activities using simple language',
    descriptionVi: 'Học cách mô tả các hoạt động hàng ngày bằng ngôn ngữ đơn giản',
    descriptionEn: 'Learn to describe your daily activities using simple language',
    part: 1,
    difficulty: 'easy',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on daily routines and habits.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe daily routines: morning routine, daily schedule, time management"
   - Demonstrate natural elaboration: "Instead of just saying 'I wake up at 7', say 'I wake up at 7 and start my day with a 30-minute exercise routine'"

2. Vocabulary Building:
   - Time Expressions: morning, afternoon, evening, night
   - Daily Activities: breakfast, lunch, dinner, commute
   - Habits: regular, occasional, frequent
   - Time Management: schedule, prioritize, allocate
   Vietnamese translations provided for clarity:
   - "morning routine" = "thói quen buổi sáng"
   - "daily schedule" = "lịch trình hàng ngày"
   - "time management" = "quản lý thời gian"

3. Answer Structure Training:
   Basic: "I wake up at 7."
   Better: "I wake up at 7 (main point) and start my day with a 30-minute exercise routine (elaboration). Then, I have breakfast and get ready for work (sequence)."

4. Common Mistakes to Address:
   - Using simple time expressions (morning → early morning)
   - Not explaining daily routines
   - Missing time management vocabulary

5. Assessment Focus:
   - Vocabulary: Time expressions and daily activities
   - Grammar: Present simple, present continuous for routines
   - Fluency: Smooth transitions between activities
   - Pronunciation: Time expressions and daily activity names

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Lifestyle',
    level: 'Beginner',
    targetBand: 5.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Daily Life', 'Time Management', 'Habits'],
    objectives: [
      'Learn vocabulary for describing daily activities',
      'Practice using time expressions correctly',
      'Master expressions for daily routines'
    ],
    duration: 240,
    supportText: 'We will practice talking about your daily routine, focusing on time expressions and sequence words. I will help you improve your vocabulary and expressions.',
    tags: ['routine', 'daily life', 'time'],
    questions: [
      "Could you tell me about your typical morning routine?",
      "What time do you usually wake up?",
      "Do you prefer to get up early or stay up late? Why?",
      "What do you usually have for breakfast?",
      "How do you usually get to work/school? Let's discuss the reasons."
    ]
  },
  {
    id: 'p1_daily_routine_advanced',
    title: 'Advanced Daily Routine',
    titleVi: 'Thói quen hàng ngày nâng cao',
    titleEn: 'Advanced Daily Routine',
    description: 'Learn to describe your daily activities with advanced vocabulary and expressions',
    descriptionVi: 'Học cách mô tả các hoạt động hàng ngày với từ vựng và cách diễn đạt nâng cao',
    descriptionEn: 'Learn to describe your daily activities with advanced vocabulary and expressions',
    part: 1,
    difficulty: 'hard',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on daily routines and habits.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to describe daily routines: morning routine, daily schedule, time management"
   - Demonstrate natural elaboration: "Instead of just saying 'I wake up at 7', say 'I wake up at 7 and start my day with a 30-minute exercise routine'"

2. Vocabulary Building:
   - Time Expressions: morning, afternoon, evening, night
   - Daily Activities: breakfast, lunch, dinner, commute
   - Habits: regular, occasional, frequent
   - Time Management: schedule, prioritize, allocate
   Vietnamese translations provided for clarity:
   - "morning routine" = "thói quen buổi sáng"
   - "daily schedule" = "lịch trình hàng ngày"
   - "time management" = "quản lý thời gian"

3. Answer Structure Training:
   Basic: "I wake up at 7."
   Better: "I wake up at 7 (main point) and start my day with a 30-minute exercise routine (elaboration). Then, I have breakfast and get ready for work (sequence)."

4. Common Mistakes to Address:
   - Using simple time expressions (morning → early morning)
   - Not explaining daily routines
   - Missing time management vocabulary

5. Assessment Focus:
   - Vocabulary: Time expressions and daily activities
   - Grammar: Present simple, present continuous for routines
   - Fluency: Smooth transitions between activities
   - Pronunciation: Time expressions and daily activity names

After each response:
1. Highlight what was done well
2. Provide specific vocabulary or grammar improvements
3. Model the enhanced version
4. Have student practice the improved version

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Lifestyle',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Daily Life', 'Time Management', 'Habits'],
    objectives: [
      'Learn vocabulary for describing daily activities',
      'Practice using time expressions correctly',
      'Master expressions for daily routines'
    ],
    duration: 240,
    supportText: 'We will practice talking about your daily routine, focusing on time expressions and sequence words. I will help you improve your vocabulary and expressions.',
    tags: ['routine', 'daily life', 'time'],
    questions: [
      "Could you tell me about your typical morning routine?",
      "What time do you usually wake up?",
      "Do you prefer to get up early or stay up late? Why?",
      "What do you usually have for breakfast?",
      "How do you usually get to work/school? Let's discuss the reasons."
    ]
  },
  {
    id: 'p1_social_media',
    title: 'Social Media',
    titleVi: 'Mạng xã hội',
    titleEn: 'Social Media',
    descriptionVi: 'Thảo luận về việc sử dụng mạng xã hội',
    descriptionEn: 'Discuss your social media usage',
    systemPrompt: `I'll help you discuss social media effectively for IELTS Speaking Part 1.

Key Points:
1. Preferred platforms
2. Usage frequency
3. Main purposes
4. Benefits/drawbacks

Teaching Focus:
1. Digital vocabulary
2. Time expressions
3. Expressing preferences
4. Giving reasons

Remember: Keep answers concise (2-3 sentences) and natural.`,
    questions: [
      "Which social media platforms do you use most often?",
      "How much time do you spend on social media daily?",
      "What do you mainly use social media for?",
      "Do you think social media is helpful in your life?"
    ],
    category: 'Technology',
    level: 'Intermediate',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_weather_seasons',
    title: 'Weather & Seasons',
    titleVi: 'Thời tiết & Mùa',
    titleEn: 'Weather & Seasons',
    descriptionVi: 'Thảo luận về thởi tiết và các mùa',
    descriptionEn: 'Discuss weather and seasons',
    systemPrompt: `I'll help you discuss weather and seasons effectively for IELTS Speaking Part 1.

Key Points:
1. Local climate
2. Seasonal changes
3. Weather preferences
4. Weather impacts

Teaching Focus:
1. Weather vocabulary
2. Expressing preferences
3. Describing conditions
4. Giving reasons

Remember: Keep answers concise (2-3 sentences) and natural.`,
    questions: [
      "What's the weather like in your hometown?",
      "Which season do you prefer?",
      "How does weather affect your daily life?",
      "Has the weather changed much in recent years?"
    ],
    category: 'Environment',
    level: 'Beginner',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_basic_food',
    title: 'Food & Eating',
    titleVi: 'Thức ăn & Ăn uống',
    titleEn: 'Food & Eating',
    descriptionVi: 'Nói về thói quen ăn uống cơ bản',
    descriptionEn: 'Talk about basic eating habits',
    systemPrompt: `I'll help you talk about food in a simple way.

Key Points (Đơn giản):
1. Basic food types (rice, noodles, meat, vegetables)
2. Meal times (breakfast, lunch, dinner)
3. Simple likes and dislikes
4. Easy cooking words

Teaching Focus (Trọng tâm):
1. Simple food words
2. Basic time expressions
3. Like/dislike phrases
4. Common adjectives (good, bad, tasty)

Remember: Keep answers short and simple. Use basic words you know well.

Example Answer:
Q: "What food do you like?"
A: "I like rice and chicken. Rice is very common in my country, and chicken is tasty."`,
    questions: [
      "What do you usually eat for breakfast?",
      "Do you like cooking?",
      "What's your favorite food?",
      "Do you often eat out?"
    ],
    category: 'Food',
    level: 'Beginner',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_basic_family',
    title: 'Family Members',
    titleVi: 'Thành viên gia đình',
    titleEn: 'Family Members',
    descriptionVi: 'Nói về gia đình của bạn một cách đơn giản',
    descriptionEn: 'Talk about your family in a simple way',
    systemPrompt: `I'll help you talk about your family using simple English.

Key Points (Đơn giản):
1. Family members (mother, father, sister, brother)
2. Basic descriptions (tall, short, young, old)
3. Simple activities together
4. Easy feelings (happy, nice)

Teaching Focus (Trọng tâm):
1. Family vocabulary
2. Simple present tense
3. Basic adjectives
4. Numbers (ages)

Remember: Use short, clear sentences. It's okay to keep it simple.

Example Answer:
Q: "Tell me about your family"
A: "I have four people in my family. My father is a teacher. My mother cooks very well. I have one younger sister."`,
    questions: [
      "How many people are in your family?",
      "Do you live with your family?",
      "What does your father/mother do?",
      "Do you have any brothers or sisters?"
    ],
    category: 'Family',
    level: 'Beginner',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_basic_hobby',
    title: 'Simple Hobbies',
    titleVi: 'Sở thích đơn giản',
    titleEn: 'Simple Hobbies',
    descriptionVi: 'Nói về sở thích của bạn một cách đơn giản',
    descriptionEn: 'Talk about your hobbies in a simple way',
    systemPrompt: `I'll help you talk about hobbies using basic English.

Key Points (Đơn giản):
1. Common hobbies (music, sports, reading)
2. Simple reasons why you like them
3. When you do these activities
4. Basic feelings about them

Teaching Focus (Trọng tâm):
1. Hobby words
2. Time words (always, sometimes, every day)
3. Simple present tense
4. Basic feeling words (fun, good, nice)

Remember: Short answers are fine. Use words you know well.

Example Answer:
Q: "What do you like to do in your free time?"
A: "I like playing football. I play every weekend with my friends. It's fun and good for health."`,
    questions: [
      "What do you do in your free time?",
      "How often do you do this hobby?",
      "Who do you do this activity with?",
      "Why do you like this hobby?"
    ],
    category: 'Hobbies',
    level: 'Beginner',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_basic_weather',
    title: 'Simple Weather Talk',
    titleVi: 'Nói về thởi tiết đơn giản',
    titleEn: 'Simple Weather Talk',
    descriptionVi: 'Mô tả thởi tiết bằng từ ngữ đơn giản',
    descriptionEn: 'Describe weather using simple words',
    systemPrompt: `I'll help you talk about weather using easy English.

Key Points (Đơn giản):
1. Basic weather types (sunny, rainy, hot, cold)
2. Simple seasons
3. Easy activities in different weather
4. Simple preferences

Teaching Focus (Trọng tâm):
1. Weather words
2. Basic adjectives
3. Simple present tense
4. Like/don't like

Remember: Use simple words to describe weather. Short answers are good.

Example Answer:
Q: "What's the weather like in your country?"
A: "It's very hot in my country. We have sun most of the time. I like sunny days because I can go outside."`,
    questions: [
      "What's the weather like today?",
      "Do you like hot or cold weather?",
      "What do you do when it rains?",
      "What's your favorite season?"
    ],
    category: 'Weather',
    level: 'Beginner',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_basic_meals',
    title: 'Food & Eating',
    titleVi: 'Thức ăn & Ăn uống',
    titleEn: 'Food & Eating',
    descriptionVi: 'Nói về thói quen ăn uống cơ bản',
    descriptionEn: 'Talk about basic eating habits',
    systemPrompt: `I'll help you talk about food in a simple way.

Key Points (Đơn giản):
1. Basic food types (rice, noodles, meat, vegetables)
2. Meal times (breakfast, lunch, dinner)
3. Simple likes and dislikes
4. Easy cooking words

Teaching Focus (Trọng tâm):
1. Simple food words
2. Basic time expressions
3. Like/dislike phrases
4. Common adjectives (good, bad, tasty)

Remember: Keep answers short and simple. Use basic words you know well.

Example Answer:
Q: "What food do you like?"
A: "I like rice and chicken. Rice is very common in my country, and chicken is tasty."`,
    questions: [
      "What do you usually eat for breakfast?",
      "Do you like cooking?",
      "What's your favorite food?",
      "Do you often eat out?"
    ],
    category: 'Food',
    level: 'Beginner',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_basic_relatives',
    title: 'Family Members',
    titleVi: 'Thành viên gia đình',
    titleEn: 'Family Members',
    descriptionVi: 'Nói về gia đình của bạn một cách đơn giản',
    descriptionEn: 'Talk about your family in a simple way',
    systemPrompt: `I'll help you talk about your family using simple English.

Key Points (Đơn giản):
1. Family members (mother, father, sister, brother)
2. Basic descriptions (tall, short, young, old)
3. Simple activities together
4. Easy feelings (happy, nice)

Teaching Focus (Trọng tâm):
1. Family vocabulary
2. Simple present tense
3. Basic adjectives
4. Numbers (ages)

Remember: Use short, clear sentences. It's okay to keep it simple.

Example Answer:
Q: "Tell me about your family"
A: "I have four people in my family. My father is a teacher. My mother cooks very well. I have one younger sister."`,
    questions: [
      "How many people are in your family?",
      "Do you live with your family?",
      "What does your father/mother do?",
      "Do you have any brothers or sisters?"
    ],
    category: 'Family',
    level: 'Beginner',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_basic_interests',
    title: 'Simple Hobbies',
    titleVi: 'Sở thích đơn giản',
    titleEn: 'Simple Hobbies',
    descriptionVi: 'Nói về sở thích của bạn một cách đơn giản',
    descriptionEn: 'Talk about your hobbies in a simple way',
    systemPrompt: `I'll help you talk about hobbies using basic English.

Key Points (Đơn giản):
1. Common hobbies (music, sports, reading)
2. Simple reasons why you like them
3. When you do these activities
4. Basic feelings about them

Teaching Focus (Trọng tâm):
1. Hobby words
2. Time words (always, sometimes, every day)
3. Simple present tense
4. Basic feeling words (fun, good, nice)

Remember: Short answers are fine. Use words you know well.

Example Answer:
Q: "What do you like to do in your free time?"
A: "I like playing football. I play every weekend with my friends. It's fun and good for health."`,
    questions: [
      "What do you do in your free time?",
      "How often do you do this hobby?",
      "Who do you do this activity with?",
      "Why do you like this hobby?"
    ],
    category: 'Hobbies',
    level: 'Beginner',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_basic_climate',
    title: 'Simple Weather Talk',
    titleVi: 'Nói về thởi tiết đơn giản',
    titleEn: 'Simple Weather Talk',
    descriptionVi: 'Mô tả thởi tiết bằng từ ngữ đơn giản',
    descriptionEn: 'Describe weather using simple words',
    systemPrompt: `I'll help you talk about weather using easy English.

Key Points (Đơn giản):
1. Basic weather types (sunny, rainy, hot, cold)
2. Simple seasons
3. Easy activities in different weather
4. Simple preferences

Teaching Focus (Trọng tâm):
1. Weather words
2. Basic adjectives
3. Simple present tense
4. Like/don't like

Remember: Use simple words to describe weather. Short answers are good.

Example Answer:
Q: "What's the weather like in your country?"
A: "It's very hot in my country. We have sun most of the time. I like sunny days because I can go outside."`,
    questions: [
      "What's the weather like today?",
      "Do you like hot or cold weather?",
      "What do you do when it rains?",
      "What's your favorite season?"
    ],
    category: 'Weather',
    level: 'Beginner',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'p1_2024q3_accommodation_advanced',
    title: 'Home & Accommodation (2024 Q3)',
    titleVi: 'Nhà ở & Chỗ ở (Quý 3/2024)',
    titleEn: 'Home & Accommodation (2024 Q3)',
    description: 'Advanced strategies for discussing living spaces and accommodation preferences',
    descriptionVi: 'Chiến lược nâng cao để thảo luận về không gian sống và sở thích về chỗ ở',
    descriptionEn: 'Advanced strategies for discussing living spaces and accommodation preferences',
    part: 1,
    difficulty: 'hard',
    taskType: 'task1',
    systemPrompt: `This is a Band 7.0 IELTS Speaking session focusing on home and accommodation for 2024 Q3.

Key Band 7.0 Requirements:
- Use a wide range of vocabulary with flexibility and precision
- Demonstrate complex grammar structures with good control
- Develop responses with relevant examples and personal experiences
- Show clear pronunciation with appropriate intonation patterns

Teaching Strategy for Band 7.0:
1. Response Structure (30-40 seconds):
   - Main point with sophisticated vocabulary
   - Supporting detail with complex grammar
   - Personal example or elaboration
   - Natural conclusion or connection

2. Advanced Vocabulary Building:
   - Housing Terminology: residential complex, architectural design, contemporary living space
   - Location Descriptors: metropolitan area, urban development, suburban community
   - Amenities: state-of-the-art facilities, integrated services, sustainable features
   - Environmental Aspects: energy-efficient, environmentally conscious, sustainable design
   Vietnamese translations for clarity:
   - "metropolitan area" = "khu vực đô thị"
   - "contemporary living space" = "không gian sống hiện đại"
   - "sustainable features" = "tính năng bền vững"

3. Complex Grammar Structures:
   - Mixed conditionals: "If I had chosen a different area, I would be living closer to the city center now"
   - Perfect continuous forms: "I have been living in this neighborhood for the past five years"
   - Passive constructions: "The area is being developed into a modern residential complex"

4. Sample Band 7.0 Answers:
   Q: "What kind of house do you want to live in in the future?"
   A: "I envision myself living in a contemporary eco-friendly house (sophisticated main point) that incorporates sustainable design features (complex detail). Having always been passionate about environmental conservation (personal context), I'd particularly appreciate a home with solar panels and energy-efficient systems (specific elaboration). This would not only reduce my carbon footprint but also align with my long-term commitment to sustainable living (natural conclusion)."

5. Error Prevention at Band 7.0:
   - Avoid generic responses without specific details
   - Maintain consistent use of advanced vocabulary
   - Ensure proper linking between ideas
   - Balance fluency with accuracy

Assessment Focus for Band 7.0:
- Vocabulary: Precise use of topic-specific terms
- Grammar: Consistent use of complex structures
- Pronunciation: Clear stress patterns and intonation
- Coherence: Smooth flow between ideas with appropriate linking

Remember: At Band 7.0, responses should demonstrate both accuracy and sophistication while maintaining naturalness.`,
    category: 'Housing',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Housing', 'Lifestyle', 'Urban Development', 'Sustainability'],
    objectives: [
      'Master advanced vocabulary for describing living spaces',
      'Use complex grammar structures naturally',
      'Develop detailed and coherent responses'
    ],
    duration: 240,
    supportText: 'We will focus on sophisticated vocabulary and complex grammar structures while maintaining natural fluency.',
    tags: ['2024q3', 'forecast', 'housing', 'band7', 'advanced'],
    questions: [
      "What kind of house or flat do you want to live in in the future?",
      "Are the transport facilities to your home good?",
      "Do you prefer living in a house or a flat?",
      "Please describe the room you live in.",
      "What part of your home do you like the most?",
      "How long have you lived there?",
      "Do you plan to live there for a long time?",
      "What's the difference between where you are living now and where you have lived in the past?",
      "Can you describe the place where you live?",
      "What room does your family spend most of the time in?",
      "What's your favorite room in your apartment/house?",
      "What makes you feel pleasant in your home?",
      "Do you think it is important to live in a comfortable environment?",
      "Do you live in a house or a flat?",
      "Who do you live with?",
      "What do you usually do in your flat?"
    ]
  },
  {
    id: 'p1_2024q3_studying_advanced',
    title: 'Studying (2024 Q3)',
    titleVi: 'Học tập (Quý 3/2024)',
    titleEn: 'Studying (2024 Q3)',
    description: 'Advanced approaches to discussing academic experiences and study habits',
    descriptionVi: 'Phương pháp nâng cao để thảo luận về trải nghiệm học tập và thói quen học tập',
    descriptionEn: 'Advanced approaches to discussing academic experiences and study habits',
    part: 1,
    difficulty: 'hard',
    taskType: 'task1',
    systemPrompt: `This is a Band 7.0 IELTS Speaking session focusing on studying and academic life for 2024 Q3.

Key Band 7.0 Requirements:
- Demonstrate sophisticated vocabulary related to education
- Use complex grammatical structures accurately
- Provide detailed responses with clear examples
- Show natural pronunciation and stress patterns

Teaching Strategy for Band 7.0:
1. Response Structure:
   - Initial statement with advanced vocabulary
   - Detailed explanation using complex grammar
   - Personal example or experience
   - Concluding thought or reflection

2. Advanced Academic Vocabulary:
   - Study Methods: analytical approach, research methodology, cognitive development
   - Academic Terms: curriculum design, pedagogical techniques, academic discourse
   - Learning Styles: kinesthetic learning, auditory processing, visual comprehension
   Vietnamese translations:
   - "analytical approach" = "phương pháp phân tích"
   - "research methodology" = "phương pháp nghiên cứu"
   - "cognitive development" = "phát triển nhận thức"

3. Complex Grammar Patterns:
   - Perfect continuous: "I have been focusing on research methodology"
   - Passive constructions: "The course is structured around practical applications"
   - Conditionals: "If I were to choose another field, I would still incorporate these methods"

4. Sample Band 7.0 Answers:
   Q: "What do you study?"
   A: "I'm currently pursuing advanced studies in environmental engineering (sophisticated main point), with a particular focus on sustainable development practices (specific detail). This field has always fascinated me because it combines scientific principles with real-world applications (personal context). The interdisciplinary nature of my studies allows me to explore both theoretical frameworks and practical solutions (complex elaboration)."

5. Assessment Focus:
   - Vocabulary: Academic and field-specific terminology
   - Grammar: Complex structures and tense usage
   - Coherence: Logical flow and idea development
   - Pronunciation: Clear articulation of academic terms

Remember: Maintain sophistication while staying natural and engaging.`,
    category: 'Education',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Education', 'Academic Life', 'Study Methods', 'Learning'],
    objectives: [
      'Master academic vocabulary',
      'Use complex grammar structures naturally',
      'Develop detailed responses about studying'
    ],
    duration: 240,
    supportText: 'Focus on sophisticated academic vocabulary while maintaining natural fluency.',
    tags: ['2024q3', 'forecast', 'education', 'band7', 'advanced'],
    questions: [
      "What do you study?",
      "Which study is the most interesting, and why?",
      "Which is more important to you—the teachers or the other students on your course? (Why?)",
      "How much time do you spend studying every week?"
    ]
  },
  {
    id: 'p1_2024q3_area_advanced',
    title: 'The Area You Live In (2024 Q3)',
    titleVi: 'Khu vực bạn sống (Quý 3/2024)',
    titleEn: 'The Area You Live In (2024 Q3)',
    description: 'Advanced strategies for discussing your neighborhood and local community',
    descriptionVi: 'Chiến lược nâng cao để thảo luận về khu phố và cộng đồng địa phương',
    descriptionEn: 'Advanced strategies for discussing your neighborhood and local community',
    part: 1,
    difficulty: 'hard',
    taskType: 'task1',
    systemPrompt: `This is a Band 7.0 IELTS Speaking session focusing on local area and community for 2024 Q3.

Key Band 7.0 Requirements:
- Demonstrate sophisticated vocabulary for describing locations and communities
- Use complex grammatical structures with good control
- Provide detailed responses with specific examples
- Show natural pronunciation with appropriate intonation

Teaching Strategy for Band 7.0:
1. Response Structure:
   - Opening statement with advanced vocabulary
   - Detailed description using complex grammar
   - Personal experience or observation
   - Thoughtful conclusion

2. Advanced Location Vocabulary:
   - Urban Features: metropolitan district, cultural hub, commercial precinct
   - Community Aspects: social infrastructure, community initiatives, local demographics
   - Development Terms: urban renewal, gentrification, sustainable development
   Vietnamese translations:
   - "metropolitan district" = "khu vực đô thị"
   - "cultural hub" = "trung tâm văn hóa"
   - "urban renewal" = "đổi mới đô thị"

3. Complex Grammar Patterns:
   - Present perfect continuous: "The area has been undergoing significant development"
   - Passive structures: "The neighborhood is being transformed into a cultural district"
   - Mixed conditionals: "If the development had started earlier, we would be seeing more changes now"

4. Sample Band 7.0 Answers:
   Q: "Do you like the area that you live in?"
   A: "I'm particularly fond of my neighborhood (main point) as it strikes an ideal balance between urban convenience and community atmosphere (sophisticated detail). Having lived here for over five years (personal context), I've witnessed its transformation into a vibrant cultural hub with numerous art galleries and cafes sprouting up (specific elaboration). The ongoing urban renewal projects have really enhanced the area's appeal while preserving its historical character (complex conclusion)."

5. Assessment Focus:
   - Vocabulary: Location-specific terminology
   - Grammar: Complex structures and tense usage
   - Coherence: Logical flow with appropriate linking
   - Pronunciation: Clear articulation of location terms

Remember: Aim for sophistication while maintaining natural delivery.`,
    category: 'Places',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Community', 'Urban Life', 'Local Area', 'Development'],
    objectives: [
      'Learn location-specific vocabulary',
      'Use complex grammar structures naturally',
      'Develop detailed responses about local areas'
    ],
    duration: 240,
    supportText: 'We will focus on sophisticated vocabulary and complex grammar structures for describing locations.',
    tags: ['2024q3', 'forecast', 'places', 'band7', 'advanced'],
    questions: [
      "Do you like the area that you live in?",
      "Where do you like to go in that area?",
      "Do you know any famous people in your area?",
      "What are some changes in the area recently?",
      "Do you know any of your neighbors?",
      "Are the people in your neighborhood nice and friendly?"
    ]
  },
  {
    id: 'p1_2024q3_transportation_advanced',
    title: 'Transportation & Roads (2024 Q3)',
    titleVi: 'Giao thông & Đường xá (Quý 3/2024)',
    titleEn: 'Transportation & Roads (2024 Q3)',
    description: 'Advanced discussion of transportation systems and urban infrastructure',
    descriptionVi: 'Thảo luận nâng cao về hệ thống giao thông và cơ sở hạ tầng đô thị',
    descriptionEn: 'Advanced discussion of transportation systems and urban infrastructure',
    part: 1,
    difficulty: 'hard',
    taskType: 'task1',
    systemPrompt: `This is a Band 7.0 IELTS Speaking session focusing on transportation and urban infrastructure for 2024 Q3.

Key Band 7.0 Requirements:
- Use sophisticated vocabulary related to transportation and infrastructure
- Demonstrate complex grammatical structures
- Provide detailed responses with specific examples
- Show clear pronunciation and natural intonation

Teaching Strategy for Band 7.0:
1. Response Structure:
   - Initial statement with technical vocabulary
   - Detailed explanation using complex grammar
   - Personal experience or observation
   - Thoughtful conclusion

2. Advanced Transportation Vocabulary:
   - Infrastructure: transportation network, urban mobility, traffic management systems
   - Development: sustainable transportation, infrastructure development, urban planning
   - Features: dedicated cycling lanes, pedestrian-friendly design, traffic calming measures
   Vietnamese translations:
   - "transportation network" = "mạng lưới giao thông"
   - "urban mobility" = "di chuyển đô thị"
   - "traffic management" = "quản lý giao thông"

3. Complex Grammar Patterns:
   - Present perfect continuous: "The city has been implementing new traffic measures"
   - Passive voice: "The roads are being upgraded to accommodate more cyclists"
   - Conditionals: "If the infrastructure were better maintained, we would see fewer traffic issues"

4. Sample Band 7.0 Answers:
   Q: "Do you think the roads in your city need improvement?"
   A: "While our city's transportation infrastructure has seen significant development (main point), there's still considerable room for enhancement, particularly in terms of sustainable mobility solutions (sophisticated detail). Having experienced the daily commute for several years (personal context), I've observed that the integration of smart traffic management systems could greatly alleviate congestion during peak hours (specific elaboration). This would not only improve traffic flow but also contribute to a more environmentally conscious urban transport network (complex conclusion)."

5. Assessment Focus:
   - Vocabulary: Transportation terminology
   - Grammar: Complex structures and tense usage
   - Coherence: Logical flow and idea development
   - Pronunciation: Clear articulation of technical terms

Remember: Maintain sophistication while keeping responses natural and engaging.`,
    category: 'Urban Development',
    level: 'Advanced',
    targetBand: 7.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Transportation', 'Infrastructure', 'Urban Planning', 'Development'],
    objectives: [
      'Learn transportation-related vocabulary',
      'Use complex grammar structures naturally',
      'Develop detailed responses about urban infrastructure'
    ],
    duration: 240,
    supportText: 'Focus on sophisticated vocabulary and complex grammar structures for discussing transportation.',
    tags: ['2024q3', 'forecast', 'transportation', 'band7', 'advanced'],
    questions: [
      "Do you think the roads in your city need improvement?",
      "What is the condition of the roads in your city like?",
      "How do people cross the road in the city where you live?",
      "Are the roads and streets in the area where you live busy?",
      "Did you have a bike when you were young?",
      "Did you ride a bike when you were little?",
      "Did you ride a bike to school?",
      "Do you ride a bike when you go out now?",
      "Do you like riding a bicycle?",
      "Are there many young people riding bicycles in Vietnam?",
      "Would you cycle more in the future?",
      "Do you think bicycles would do well in your city?"
    ]
  }
];
