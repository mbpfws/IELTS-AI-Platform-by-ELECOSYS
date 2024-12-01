import { SpeakingTemplate } from '@/types/speakingSession';
import { part1AdditionalTemplates } from './part1Additional';

const baseTemplates: SpeakingTemplate[] = [
  {
    id: 'home-accommodation-part1',
    title: 'Home & Accommodation',
    titleVi: 'Home & Accommodation',
    description: 'Learn to discuss your living situation and preferences',
    descriptionVi: 'Learn to discuss your living situation and preferences',
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
   - "residential area" = "residential area"
   - "well-furnished" = "well-furnished"
   - "newly-renovated" = "newly-renovated"

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
    category: 'Personal Interests',
    level: 'Cơ bản',
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
    id: 'work-study-part1',
    title: 'Work & Study',
    titleVi: 'Work & Study',
    description: 'Learn to talk about your work or study experience',
    descriptionVi: 'Learn to talk about your work or study experience',
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
   - "occupation" = "occupation"
   - "responsibilities" = "responsibilities"
   - "qualifications" = "qualifications"

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
    category: 'Modern Life',
    level: 'Trung cấp',
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
    id: 'hobbies-interests-part1',
    title: 'Hobbies & Interests',
    titleVi: 'Hobbies & Interests',
    description: 'Learn to share your hobbies and interests',
    descriptionVi: 'Learn to share your hobbies and interests',
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
   - "passionate about" = "passionate about"
   - "recreational" = "recreational"
   - "leisure activities" = "leisure activities"

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
    category: 'Personal Interests',
    level: 'Trung cấp',
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
    id: 'hometown-area-part1',
    title: 'Hometown & Local Area',
    titleVi: 'Hometown & Local Area',
    description: 'Learn to describe your hometown and local area',
    descriptionVi: 'Learn to describe your hometown and local area',
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
   - "metropolis" = "metropolis"
   - "cultural heritage" = "cultural heritage"
   - "infrastructure" = "infrastructure"

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
    level: 'Trung cấp',
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
    id: 'daily-routine-part1',
    title: 'Daily Routine',
    titleVi: 'Daily Routine',
    description: 'Learn to discuss your daily activities and habits',
    descriptionVi: 'Learn to discuss your daily activities and habits',
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
   - "morning routine" = "morning routine"
   - "daily schedule" = "daily schedule"
   - "time management" = "time management"

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
    level: 'Cơ bản',
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
    id: 'family-friends-part1',
    title: 'Family and Friends',
    titleVi: 'Family and Friends',
    description: 'Learn to talk about your relationships with family and friends',
    descriptionVi: 'Learn to talk about your relationships with family and friends',
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
   - "close-knit" = "close-knit"
   - "supportive" = "supportive"
   - "loving" = "loving"

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
    category: 'Personal Interests',
    level: 'Trung cấp',
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
    id: 'technology-part1',
    title: 'Technology & Digital Life',
    titleVi: 'Technology & Digital Life',
    description: 'Discuss your use of technology and digital tools',
    descriptionVi: 'Discuss your use of technology and digital tools',
    descriptionEn: 'Discuss your use of technology and digital tools',
    part: 1,
    difficulty: 'medium',
    taskType: 'task1',
    systemPrompt: `This is a Part 1 IELTS Speaking session focusing on technology and digital life.

Key IELTS Requirements:
- Part 1 answers should be 2-3 sentences (20-30 seconds)
- Show range of vocabulary and grammatical structures
- Maintain natural fluency without long pauses
- Use clear pronunciation with proper stress and intonation

Teaching Strategy:
1. First Response:
   - Model the expected answer length and structure
   - Point out key vocabulary: "Let me show you how to discuss technology: digital devices, social media platforms, online activities"
   - Demonstrate natural elaboration: "Instead of just saying 'I use my phone', say 'I mainly use my smartphone for staying connected with friends and managing my daily tasks'"

2. Vocabulary Building:
   - Digital Devices: smartphone, laptop, tablet, smartwatch
   - Online Activities: browsing, streaming, networking, shopping
   - Social Media: platforms, posts, sharing, engagement
   - Technology Impact: convenience, efficiency, connectivity
   Vietnamese translations provided for clarity:
   - "digital devices" = "digital devices"
   - "social media" = "social media"
   - "online activities" = "online activities"

3. Answer Structure Training:
   Basic: "I use social media every day."
   Better: "I regularly use social media platforms like Instagram and Facebook (main point) to stay connected with friends and share interesting content (purpose). I find these platforms particularly useful for keeping up with news and trends (benefit)."

4. Common Mistakes to Address:
   - Using simple technology terms (phone → smartphone/mobile device)
   - Not explaining purposes or benefits
   - Missing frequency expressions (regularly, occasionally, frequently)

5. Assessment Focus:
   - Vocabulary: Digital terminology and technical expressions
   - Grammar: Present simple/continuous for habits and current activities
   - Fluency: Natural discussion of technology use
   - Pronunciation: Technical terms and platform names

Remember: Every interaction should teach something specific about IELTS speaking skills.`,
    category: 'Technology',
    level: 'Trung cấp',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    topics: ['Technology', 'Social Media', 'Digital Life'],
    objectives: [
      'Learn vocabulary for describing technology use',
      'Practice discussing digital habits and preferences',
      'Master expressions for online activities'
    ],
    duration: 240,
    supportText: 'We will practice discussing your use of technology and social media. I will help you improve your vocabulary and expressions.',
    tags: ['technology', 'social media', 'digital', 'internet'],
    questions: [
      "How do you use technology in your daily life?",
      "Which social media platforms do you use most often?",
      "What do you mainly use your smartphone for?",
      "How has technology changed your life?",
      "Do you think social media is helpful? Why or why not?"
    ]
  },
  {
    id: 'hobbies-interests-part2',
    title: 'Hobbies and Interests',
    titleVi: 'Hobbies and Interests',
    description: 'Practice discussing your favorite activities and pastimes',
    descriptionVi: 'Practice discussing your favorite activities and pastimes',
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
   - "passionate" = "passionate"
   - "enthusiastic" = "enthusiastic"
   - "fascinated" = "fascinated"

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
    level: 'Trung cấp',
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
    id: 'hometown-part2',
    title: 'Hometown and Local Area',
    titleVi: 'Hometown and Local Area',
    description: 'Learn to describe your hometown and local surroundings',
    descriptionVi: 'Learn to describe your hometown and local surroundings',
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
   - "bustling" = "bustling"
   - "scenic" = "scenic"
   - "historic" = "historic"

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
    level: 'Trung cấp',
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
    id: 'daily-routine-basic-part2',
    title: 'Basic Daily Routine',
    titleVi: 'Basic Daily Routine',
    description: 'Learn to describe your daily activities using simple language',
    descriptionVi: 'Learn to describe your daily activities using simple language',
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
   - "morning routine" = "morning routine"
   - "daily schedule" = "daily schedule"
   - "time management" = "time management"

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
    level: 'Cơ bản',
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
    id: 'daily-routine-advanced-part2',
    title: 'Advanced Daily Routine',
    titleVi: 'Advanced Daily Routine',
    description: 'Learn to describe your daily activities with advanced vocabulary and expressions',
    descriptionVi: 'Learn to describe your daily activities with advanced vocabulary and expressions',
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
   - "morning routine" = "morning routine"
   - "daily schedule" = "daily schedule"
   - "time management" = "time management"

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
    level: 'Trung cấp',
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
    id: 'social-media-part2',
    title: 'Social Media',
    titleVi: 'Social Media',
    descriptionVi: 'Discuss your social media usage',
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
    level: 'Trung cấp',
    targetBand: 6.5,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'weather-seasons-part2',
    title: 'Weather & Seasons',
    titleVi: 'Weather & Seasons',
    titleEn: 'Weather & Seasons',
    descriptionVi: 'Discuss weather and seasons',
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
    level: 'Cơ bản',
    targetBand: 6.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'basic-food-part2',
    title: 'Food & Eating',
    titleVi: 'Food & Eating',
    titleEn: 'Food & Eating',
    descriptionVi: 'Talk about basic eating habits',
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
    level: 'Cơ bản',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'basic-family-part2',
    title: 'Family Members',
    titleVi: 'Family Members',
    titleEn: 'Family Members',
    descriptionVi: 'Talk about your family in a simple way',
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
    level: 'Cơ bản',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'basic-hobby-part2',
    title: 'Simple Hobbies',
    titleVi: 'Simple Hobbies',
    titleEn: 'Simple Hobbies',
    descriptionVi: 'Talk about your hobbies in a simple way',
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
    level: 'Cơ bản',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 'basic-weather-part2',
    title: 'Simple Weather Talk',
    titleVi: 'Simple Weather Talk',
    titleEn: 'Simple Weather Talk',
    descriptionVi: 'Describe weather using simple words',
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
    level: 'Cơ bản',
    targetBand: 5.0,
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: '2024q3-accommodation-advanced-part2',
    title: 'Home & Accommodation (2024 Q3)',
    description: 'Advanced strategies for discussing living spaces and accommodation preferences',
    descriptionVi: 'Advanced strategies for discussing living spaces and accommodation preferences',
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
   - "metropolitan area" = "metropolitan area"
   - "contemporary living space" = "contemporary living space"
   - "sustainable features" = "sustainable features"

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
    level: 'Nâng cao',
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
    id: '2024q3-studying-advanced-part2',
    title: 'Studying (2024 Q3)',
    description: 'Advanced approaches to discussing academic experiences and study habits',
    descriptionVi: 'Advanced approaches to discussing academic experiences and study habits',
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
   - "analytical approach" = "analytical approach"
   - "research methodology" = "research methodology"
   - "cognitive development" = "cognitive development"

3. Complex Grammar Patterns:
   - Perfect continuous: "I have been focusing on research methodology"
   - Passive structures: "The course is structured around practical applications"
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
    level: 'Nâng cao',
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
    id: '2024q3-area-advanced-part2',
    title: 'The Area You Live In (2024 Q3)',
    description: 'Advanced strategies for discussing your neighborhood and local community',
    descriptionVi: 'Advanced strategies for discussing your neighborhood and local community',
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
   - "metropolitan district" = "metropolitan district"
   - "cultural hub" = "cultural hub"
   - "urban renewal" = "urban renewal"

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
    level: 'Nâng cao',
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
    id: '2024q3-transportation-advanced-part2',
    title: 'Transportation & Roads (2024 Q3)',
    description: 'Advanced discussion of transportation systems and urban infrastructure',
    descriptionVi: 'Advanced discussion of transportation systems and urban infrastructure',
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
   - "transportation network" = "transportation network"
   - "urban mobility" = "urban mobility"
   - "traffic management" = "traffic management"

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
    level: 'Nâng cao',
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

export const part1Templates = [...baseTemplates, ...part1AdditionalTemplates];
