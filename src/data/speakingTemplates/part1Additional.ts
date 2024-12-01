import { SpeakingTemplate } from '@/types/speakingSession';

export const part1AdditionalTemplates: SpeakingTemplate[] = [
  // Bike topic with variations
  {
    id: 'bike-cycling-part1',
    title: 'Bikes and Cycling',
    titleVi: 'Bikes and Cycling',
    description: 'Practice discussing your experiences and opinions about bicycles and cycling.',
    descriptionVi: 'Luyện tập thảo luận về kinh nghiệm và quan điểm của bạn về xe đạp và đạp xe.',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Transportation',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic bike-related questions.

Teaching Strategy:
1. Focus on simple present tense and past tense
2. Basic vocabulary about bikes and transportation
3. Short, clear answers with basic linking words
4. Simple pronunciation practice

Example Questions:
- Did you have a bike when you were young?
- Do you like riding a bicycle?
- Are there many young people riding bicycles in Vietnam?

Example Response:
"Yes, I had a small blue bike when I was a child. I used it to ride around my neighborhood with friends."`,
    questions: [
      "Did you have a bike when you were young?",
      "Did you ride a bike when you were little?",
      "Do you ride a bike when you go out now?",
      "Do you like riding a bicycle?",
      "Are there many young people riding bicycles in Vietnam?",
      "Would you cycle more in the future?",
      "Do you think bicycles would do well in your city?"
    ]
  },
  {
    id: 'bike-cycling-intermediate-part1',
    title: 'Bikes and Cycling (Intermediate)',
    titleVi: 'Bikes and Cycling (Intermediate)',
    description: 'Intermediate discussion about cycling culture and urban transportation',
    descriptionVi: 'Thảo luận trung cấp về văn hóa đạp xe và giao thông đô thị',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Transportation',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate bike-related questions.

Teaching Strategy:
1. Use a mix of tenses appropriately
2. Introduce more sophisticated vocabulary about cycling
3. Develop answers with examples and reasons
4. Focus on sentence stress and intonation

Key Vocabulary:
- Cycling infrastructure
- Environmental benefits
- Health advantages
- Urban mobility

Example Response:
"I used to cycle quite frequently when I was younger, mainly because it was a convenient way to get around my neighborhood. These days, I occasionally go cycling on weekends, as it's both good exercise and an eco-friendly mode of transport."`,
    questions: [
      "Did you have a bike when you were young?",
      "Did you ride a bike when you were little?",
      "Do you ride a bike when you go out now?",
      "Do you like riding a bicycle?",
      "Are there many young people riding bicycles in Vietnam?",
      "Would you cycle more in the future?",
      "Do you think bicycles would do well in your city?"
    ]
  },
  {
    id: 'bike-cycling-advanced-part1',
    title: 'Bikes and Cycling (Advanced)',
    titleVi: 'Bikes and Cycling (Advanced)',
    description: 'Advanced discussion about sustainable transportation and cycling infrastructure',
    descriptionVi: 'Thảo luận nâng cao về giao thông bền vững và cơ sở hạ tầng cho xe đạp',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Transportation',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced bike-related questions.

Teaching Strategy:
1. Complex grammatical structures
2. Sophisticated vocabulary and idiomatic expressions
3. Well-developed responses with clear organization
4. Natural pronunciation and intonation patterns

Advanced Language Features:
- Mixed conditionals
- Perfect tenses
- Idiomatic expressions
- Complex sentence structures

Example Response:
"Having grown up in a cycling-friendly city, I've always appreciated the freedom that comes with riding a bike. Although I don't cycle as frequently as I used to, I still believe it's one of the most sustainable and health-conscious modes of transportation available to urban dwellers."`,
    questions: [
      "Did you have a bike when you were young?",
      "Did you ride a bike when you were little?",
      "Do you ride a bike when you go out now?",
      "Do you like riding a bicycle?",
      "Are there many young people riding bicycles in Vietnam?",
      "Would you cycle more in the future?",
      "Do you think bicycles would do well in your city?"
    ]
  },
  // Roads and Streets topic with variations
  {
    id: 'roads-streets-part1',
    title: 'Roads and Streets',
    titleVi: 'Roads and Streets',
    description: 'Discuss urban infrastructure and your experiences with roads and streets.',
    descriptionVi: 'Thảo luận về cơ sở hạ tầng đô thị và trải nghiệm của bạn với đường xá và phố phường.',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Urban Life',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic questions about roads and streets.

Teaching Strategy:
1. Simple present tense for describing current situations
2. Basic vocabulary about roads and transportation
3. Simple descriptive adjectives
4. Clear pronunciation of common words

Example Questions:
- Are the roads in your city busy?
- How do people cross the road?
- Do you think the roads need improvement?

Example Response:
"Yes, the roads in my city are very busy, especially during rush hour. People usually cross the road at traffic lights or zebra crossings."`,
    questions: [
      "Do you think the roads in your city need improvement?",
      "What is the condition of the roads in your city like?",
      "How do people cross the road in the city where you live?",
      "Are the roads and streets in the area where you live busy?"
    ]
  },
  {
    id: 'roads-streets-intermediate-part1',
    title: 'Roads and Streets (Intermediate)',
    titleVi: 'Roads and Streets (Intermediate)',
    description: 'Intermediate discussion about urban infrastructure and road conditions',
    descriptionVi: 'Thảo luận trung cấp về cơ sở hạ tầng đô thị và tình trạng đường sá',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Urban Life',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate questions about urban infrastructure.

Teaching Strategy:
1. Use a mix of tenses to discuss changes and improvements
2. Introduce infrastructure-related vocabulary
3. Express opinions with supporting reasons
4. Focus on stress in compound words

Key Vocabulary:
- Infrastructure development
- Traffic management
- Pedestrian facilities
- Road maintenance

Example Response:
"The roads in my city have improved significantly over the past few years, with better traffic management systems and new pedestrian crossings. However, some areas still need attention, particularly during peak hours when congestion becomes a major issue."`,
    questions: [
      "Do you think the roads in your city need improvement?",
      "What is the condition of the roads in your city like?",
      "How do people cross the road in the city where you live?",
      "Are the roads and streets in the area where you live busy?"
    ]
  },
  {
    id: 'roads-streets-advanced-part1',
    title: 'Roads and Streets (Advanced)',
    titleVi: 'Roads and Streets (Advanced)',
    description: 'Advanced discussion about transportation infrastructure and urban planning',
    descriptionVi: 'Thảo luận nâng cao về cơ sở hạ tầng giao thông và quy hoạch đô thị',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Urban Life',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced questions about urban infrastructure.

Teaching Strategy:
1. Complex grammatical structures with mixed tenses
2. Sophisticated vocabulary about urban development
3. Well-developed responses with clear organization
4. Natural connected speech and intonation

Advanced Language Features:
- Urban planning terminology
- Infrastructure development concepts
- Statistical expressions
- Complex sentence structures

Example Response:
"The urban infrastructure in my city has undergone substantial transformation in recent years, with the implementation of smart traffic systems and the expansion of pedestrian-friendly zones. Despite these improvements, there's still room for enhancement, particularly in terms of sustainable transportation solutions and accessibility for all residents."`,
    questions: [
      "Do you think the roads in your city need improvement?",
      "What is the condition of the roads in your city like?",
      "How do people cross the road in the city where you live?",
      "Are the roads and streets in the area where you live busy?"
    ]
  },
  // Fish and Fishing topic with variations
  {
    id: 'fish-fishing-part1',
    title: 'Fish and Fishing',
    titleVi: 'Fish and Fishing',
    description: 'Share your thoughts about fish, fishing activities, and related experiences.',
    descriptionVi: 'Chia sẻ suy nghĩ của bạn về cá, hoạt động câu cá và những trải nghiệm liên quan.',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Hobbies',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic questions about fish and fishing.

Teaching Strategy:
1. Simple present tense for likes/dislikes
2. Basic vocabulary about fish and fishing
3. Simple expressions of preference
4. Clear pronunciation of fish-related words

Example Questions:
- Do you like eating fish?
- Is fishing popular in your country?
- Have you ever been fishing?

Example Response:
"Yes, I like eating fish because it's healthy and delicious. In my country, many people enjoy fishing as a hobby, especially on weekends."`,
    questions: [
      "Is fishing popular in your country?",
      "Do you like eating fish?",
      "Have you ever been to a place where there are lots of fish around you?",
      "Have you watched TV programs about fish?"
    ]
  },
  {
    id: 'fish-fishing-intermediate-part1',
    title: 'Fish and Fishing (Intermediate)',
    titleVi: 'Fish and Fishing (Intermediate)',
    description: 'Intermediate discussion about aquatic life and fishing',
    descriptionVi: 'Thảo luận trung cấp về đời sống thủy sinh và câu cá',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Hobbies',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate questions about fish and fishing.

Teaching Strategy:
1. Use various tenses to discuss experiences
2. Introduce aquatic and fishing-related vocabulary
3. Express opinions with examples
4. Focus on word stress and intonation

Key Vocabulary:
- Marine life
- Fishing techniques
- Seafood cuisine
- Aquatic environments

Example Response:
"Fishing has always been an integral part of our culture, not just as a recreational activity but also as a significant source of livelihood for coastal communities. I personally find marine documentaries fascinating as they provide insights into the diverse underwater ecosystem."`,
    questions: [
      "Is fishing popular in your country?",
      "Do you like eating fish?",
      "Have you ever been to a place where there are lots of fish around you?",
      "Have you watched TV programs about fish?"
    ]
  },
  {
    id: 'fish-fishing-advanced-part1',
    title: 'Fish and Fishing (Advanced)',
    titleVi: 'Fish and Fishing (Advanced)',
    description: 'Advanced discussion about marine life and fishing culture',
    descriptionVi: 'Thảo luận nâng cao về đời sống biển và văn hóa câu cá',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Hobbies',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced questions about marine life and fishing.

Teaching Strategy:
1. Complex grammatical structures
2. Sophisticated vocabulary about marine ecosystems
3. Well-developed responses with environmental awareness
4. Natural pronunciation and rhythm

Advanced Language Features:
- Marine biology terminology
- Environmental conservation concepts
- Cultural significance
- Complex sentence structures

Example Response:
"The fishing industry has evolved significantly in recent years, with a growing emphasis on sustainable practices and marine conservation. While traditional fishing remains popular as a recreational activity, there's an increasing awareness of the need to balance human activities with the preservation of marine ecosystems."`,
    questions: [
      "Is fishing popular in your country?",
      "Do you like eating fish?",
      "Have you ever been to a place where there are lots of fish around you?",
      "Have you watched TV programs about fish?"
    ]
  },
  // Free Time & Weekend topic with variations
  {
    id: 'free-time-weekend-part1',
    title: 'Free Time & Weekend',
    titleVi: 'Free Time & Weekend',
    description: 'Basic discussion about leisure activities and weekends',
    descriptionVi: 'Thảo luận cơ bản về hoạt động giải trí và cuối tuần',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Lifestyle',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic questions about free time and weekends.

Teaching Strategy:
1. Simple present tense for regular activities
2. Basic vocabulary for hobbies and activities
3. Simple time expressions
4. Clear pronunciation of activity words

Example Questions:
- What do you like to do on weekends?
- Do you go to the movies?
- How do you spend your free time?

Example Response:
"I usually watch movies with my friends on weekends. We go to the cinema near my house, and sometimes we have dinner together afterward."`,
    questions: [
      "Do you like to go to the cinema/movies at weekends?",
      "Who do you go with? Alone or with others?",
      "What do you enjoy doing most on weekends?",
      "Are you planning to do anything special next weekend?",
      "What kinds of activities do you often do in your spare time?",
      "How do you often relax yourself on weekends?",
      "How do your surrounding friends relax?"
    ]
  },
  {
    id: 'free-time-weekend-intermediate-part1',
    title: 'Free Time & Weekend (Intermediate)',
    titleVi: 'Free Time & Weekend (Intermediate)',
    description: 'Intermediate discussion about leisure and weekend activities',
    descriptionVi: 'Thảo luận trung cấp về hoạt động giải trí và cuối tuần',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Lifestyle',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate questions about leisure activities.

Teaching Strategy:
1. Mix of present and future tenses
2. Varied vocabulary for social activities
3. Express preferences with reasons
4. Natural intonation patterns

Key Vocabulary:
- Recreational activities
- Social gatherings
- Entertainment venues
- Time management

Example Response:
"I tend to divide my weekends between socializing and pursuing my hobbies. While I enjoy catching up with friends at local cafes or cinemas, I also make sure to dedicate some time to my photography hobby, which helps me unwind after a busy week."`,
    questions: [
      "Do you like to go to the cinema/movies at weekends?",
      "Who do you go with? Alone or with others?",
      "What do you enjoy doing most on weekends?",
      "Are you planning to do anything special next weekend?",
      "What kinds of activities do you often do in your spare time?",
      "How do you often relax yourself on weekends?",
      "How do your surrounding friends relax?"
    ]
  },
  {
    id: 'free-time-weekend-advanced-part1',
    title: 'Free Time & Weekend (Advanced)',
    titleVi: 'Free Time & Weekend (Advanced)',
    description: 'Advanced discussion about leisure time management',
    descriptionVi: 'Thảo luận nâng cao về quản lý thời gian giải trí',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Lifestyle',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced questions about leisure and time management.

Teaching Strategy:
1. Complex grammatical structures
2. Sophisticated vocabulary about work-life balance
3. Detailed explanations with examples
4. Natural connected speech

Advanced Language Features:
- Work-life balance terminology
- Cultural and social aspects
- Time management concepts
- Personal development themes

Example Response:
"I've developed quite an effective balance between my social commitments and personal interests during weekends. While I prioritize quality time with friends, often exploring cultural events or trying new restaurants, I'm equally passionate about dedicating time to self-improvement activities, such as attending workshops or practicing mindfulness."`,
    questions: [
      "Do you like to go to the cinema/movies at weekends?",
      "Who do you go with? Alone or with others?",
      "What do you enjoy doing most on weekends?",
      "Are you planning to do anything special next weekend?",
      "What kinds of activities do you often do in your spare time?",
      "How do you often relax yourself on weekends?",
      "How do your surrounding friends relax?"
    ]
  },
  // Numbers & Maths topic with variations
  {
    id: 'numbers-maths-part1',
    title: 'Numbers & Maths',
    titleVi: 'Numbers & Maths',
    description: 'Basic discussion about numbers and mathematics',
    descriptionVi: 'Thảo luận cơ bản về số và toán học',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Education',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic questions about numbers and mathematics.

Teaching Strategy:
1. Simple present tense for preferences
2. Basic mathematical vocabulary
3. Simple expressions of like/dislike
4. Clear number pronunciation

Example Questions:
- Do you like mathematics?
- What numbers are important to you?
- Are you good with numbers?

Example Response:
"I like mathematics because it's useful in daily life. My favorite number is seven, and I use math when I go shopping or manage my money."`,
    questions: [
      "What numbers do you like?",
      "What numbers are important to you?",
      "Are you good at remembering telephone numbers?",
      "Do you need to use numbers in the future?",
      "Do you like learning mathematics?",
      "Do you think it's difficult to learn mathematics well?"
    ]
  },
  {
    id: 'numbers-maths-intermediate-part1',
    title: 'Numbers & Maths (Intermediate)',
    titleVi: 'Numbers & Maths (Intermediate)',
    description: 'Intermediate discussion about mathematics and its applications',
    descriptionVi: 'Thảo luận trung cấp về toán học và ứng dụng',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Education',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate questions about mathematics.

Teaching Strategy:
1. Various tenses for different contexts
2. Mathematical and analytical vocabulary
3. Express opinions with examples
4. Stress patterns in number words

Key Vocabulary:
- Mathematical concepts
- Problem-solving
- Practical applications
- Numerical skills

Example Response:
"Mathematics has always played a crucial role in my education and daily life. I find it particularly useful in budgeting and financial planning, although I must admit that some advanced concepts can be challenging to grasp at first."`,
    questions: [
      "What numbers do you like?",
      "What numbers are important to you?",
      "Are you good at remembering telephone numbers?",
      "Do you need to use numbers in the future?",
      "Do you like learning mathematics?",
      "Do you think it's difficult to learn mathematics well?"
    ]
  },
  {
    id: 'numbers-maths-advanced-part1',
    title: 'Numbers & Maths (Advanced)',
    titleVi: 'Numbers & Maths (Advanced)',
    description: 'Advanced discussion about mathematics and its significance',
    descriptionVi: 'Thảo luận nâng cao về toán học và ý nghĩa của nó',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Education',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced questions about mathematics and numbers.

Teaching Strategy:
1. Complex grammatical structures
2. Academic vocabulary about mathematics
3. Detailed explanations of concepts
4. Natural rhythm in number sequences

Advanced Language Features:
- Mathematical terminology
- Abstract concepts
- Educational philosophy
- Analytical thinking

Example Response:
"Mathematics, in my view, is not merely about numbers and calculations, but rather a fundamental tool for developing logical thinking and problem-solving abilities. I've found that my early exposure to mathematical concepts has significantly enhanced my analytical skills and ability to approach complex problems systematically."`,
    questions: [
      "What numbers do you like?",
      "What numbers are important to you?",
      "Are you good at remembering telephone numbers?",
      "Do you need to use numbers in the future?",
      "Do you like learning mathematics?",
      "Do you think it's difficult to learn mathematics well?"
    ]
  },
  // Spend Time by Yourself & Exciting Activities topic with variations
  {
    id: 'solitude-exciting-part1',
    title: 'Solitude & Exciting Activities',
    titleVi: 'Solitude & Exciting Activities',
    description: 'Basic discussion about personal time and exciting experiences',
    descriptionVi: 'Thảo luận cơ bản về thời gian cá nhân và trải nghiệm thú vị',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Personal Experience',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic questions about personal time and activities.

Teaching Strategy:
1. Simple present and past tense
2. Basic vocabulary for activities
3. Simple expressions of preference
4. Clear pronunciation of activity words

Example Questions:
- Do you like spending time alone?
- What exciting things have you done?
- Would you try new activities?

Example Response:
"Yes, I enjoy spending time alone because I can read books and listen to music. Last month, I tried rock climbing for the first time, and it was very exciting."`,
    questions: [
      "Do you like to spend time by yourself or with your friends?",
      "When was the last time you spent time by yourself?",
      "Do you want to spend more time by yourself?",
      "Have you ever tried any exciting activities?",
      "What was the interesting thing that you did when you were a child?",
      "Have you joined in any interesting activities recently?",
      "Would you like to try climbing or diving?"
    ]
  },
  {
    id: 'solitude-exciting-intermediate-part1',
    title: 'Solitude & Exciting Activities (Intermediate)',
    titleVi: 'Solitude & Exciting Activities (Intermediate)',
    description: 'Intermediate discussion about personal space and adventure',
    descriptionVi: 'Thảo luận trung cấp về không gian cá nhân và phiêu lưu',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Personal Experience',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate questions about personal time and adventures.

Teaching Strategy:
1. Mix of tenses for experiences
2. Adventure and leisure vocabulary
3. Express feelings and preferences
4. Stress patterns in compound words

Key Vocabulary:
- Personal development
- Adventure sports
- Self-reflection
- Recreational activities

Example Response:
"I've found that balancing social activities with personal time is essential for my well-being. While I enjoy trying adventurous activities like paragliding and rock climbing with friends, I also value the quiet moments I spend reading or practicing meditation by myself."`,
    questions: [
      "Do you like to spend time by yourself or with your friends?",
      "When was the last time you spent time by yourself?",
      "Do you want to spend more time by yourself?",
      "Have you ever tried any exciting activities?",
      "What was the interesting thing that you did when you were a child?",
      "Have you joined in any interesting activities recently?",
      "Would you like to try climbing or diving?"
    ]
  },
  {
    id: 'solitude-exciting-advanced-part1',
    title: 'Solitude & Exciting Activities (Advanced)',
    titleVi: 'Solitude & Exciting Activities (Advanced)',
    description: 'Advanced discussion about self-development and adventure',
    descriptionVi: 'Thảo luận nâng cao về phát triển bản thân và phiêu lưu',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Personal Experience',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced questions about personal growth and adventure.

Teaching Strategy:
1. Complex grammatical structures
2. Sophisticated vocabulary about personal development
3. Detailed explanations with examples
4. Natural connected speech

Advanced Language Features:
- Personal growth terminology
- Adventure sports vocabulary
- Psychological concepts
- Risk assessment language

Example Response:
"I've come to appreciate the delicate balance between seeking thrilling experiences and maintaining periods of solitude for self-reflection. While I'm drawn to adrenaline-pumping activities like free diving and mountain climbing, I equally value the introspective moments that solitude provides for personal growth and mental rejuvenation."`,
    questions: [
      "Do you like to spend time by yourself or with your friends?",
      "When was the last time you spent time by yourself?",
      "Do you want to spend more time by yourself?",
      "Have you ever tried any exciting activities?",
      "What was the interesting thing that you did when you were a child?",
      "Have you joined in any interesting activities recently?",
      "Would you like to try climbing or diving?"
    ]
  },
  // Coins topic with variations
  {
    id: 'coins-part1',
    title: 'Coins',
    titleVi: 'Coins',
    description: 'Basic discussion about using and collecting coins',
    descriptionVi: 'Thảo luận cơ bản về việc sử dụng và sưu tập tiền xu',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Daily Life',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic questions about coins.

Teaching Strategy:
1. Simple present tense for habits
2. Basic vocabulary about money
3. Simple yes/no responses with reasons
4. Clear pronunciation of currency terms

Example Questions:
- Do you use coins?
- Do you collect coins?
- Do you carry coins?

Example Response:
"Yes, I use coins when I take the bus. I keep them in my wallet, but I don't collect them as a hobby."`,
    questions: [
      "Do you use coins in your daily life?",
      "Is it convenient to use coins?",
      "Have you ever collected coins?",
      "Do you often carry coins with you?"
    ]
  },
  {
    id: 'coins-intermediate-part1',
    title: 'Coins (Intermediate)',
    titleVi: 'Coins (Intermediate)',
    description: 'Intermediate discussion about currency and coin usage',
    descriptionVi: 'Thảo luận trung cấp về tiền tệ và việc sử dụng tiền xu',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Daily Life',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate questions about currency and coins.

Teaching Strategy:
1. Mix of tenses for different contexts
2. Vocabulary about currency and transactions
3. Express opinions with examples
4. Natural intonation patterns

Key Vocabulary:
- Currency denominations
- Digital payments
- Collection value
- Financial transactions

Example Response:
"While coins are becoming less common due to digital payment methods, I still find them useful for certain situations, such as parking meters or small purchases at local markets. I actually have a small collection of commemorative coins from different countries I've visited."`,
    questions: [
      "Do you use coins in your daily life?",
      "Is it convenient to use coins?",
      "Have you ever collected coins?",
      "Do you often carry coins with you?"
    ]
  },
  {
    id: 'coins-advanced-part1',
    title: 'Coins (Advanced)',
    titleVi: 'Coins (Advanced)',
    description: 'Advanced discussion about currency evolution and numismatics',
    descriptionVi: 'Thảo luận nâng cao về sự phát triển tiền tệ và nghiên cứu tiền xu',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Daily Life',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced questions about currency and numismatics.

Teaching Strategy:
1. Complex grammatical structures
2. Sophisticated vocabulary about monetary systems
3. Detailed explanations with historical context
4. Natural connected speech

Advanced Language Features:
- Numismatic terminology
- Economic concepts
- Historical perspectives
- Cultural significance

Example Response:
"The role of coins in modern society has evolved significantly with the advent of digital payment systems. While their practical use may be diminishing, coins remain fascinating from both a historical and cultural perspective, often serving as tangible connections to our economic heritage and national identity."`,
    questions: [
      "Do you use coins in your daily life?",
      "Is it convenient to use coins?",
      "Have you ever collected coins?",
      "Do you often carry coins with you?"
    ]
  },
  // Asking for help topic with variations
  {
    id: 'asking-help-part1',
    title: 'Asking for Help',
    titleVi: 'Asking for Help',
    description: 'Basic discussion about seeking and receiving help',
    descriptionVi: 'Thảo luận cơ bản về việc tìm kiếm và nhận sự giúp đỡ',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Social Interaction',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic questions about asking for help.

Teaching Strategy:
1. Simple present and past tense
2. Basic vocabulary for requests
3. Simple expressions of gratitude
4. Clear pronunciation of common phrases

Example Questions:
- When do you ask for help?
- Who do you ask for help?
- Do you like helping others?

Example Response:
"I usually ask my friends for help with my English homework. Last week, I asked my teacher to explain a difficult grammar point, and she was very helpful."`,
    questions: [
      "When was the last time you asked for help?",
      "What kinds of help do you often ask for?",
      "Why are teachers always willing to help students?",
      "Do you ask for help when you have a problem?"
    ]
  },
  {
    id: 'asking-help-intermediate-part1',
    title: 'Asking for Help (Intermediate)',
    titleVi: 'Asking for Help (Intermediate)',
    description: 'Intermediate discussion about support and assistance',
    descriptionVi: 'Thảo luận trung cấp về sự hỗ trợ và giúp đỡ',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Social Interaction',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate questions about seeking and offering help.

Teaching Strategy:
1. Various tenses for different situations
2. Vocabulary about support and assistance
3. Express feelings and gratitude
4. Stress patterns in phrases

Key Vocabulary:
- Support systems
- Professional assistance
- Mutual aid
- Problem-solving

Example Response:
"I believe that seeking help is a sign of wisdom rather than weakness. In my experience, most people are genuinely willing to assist others, especially in academic or professional settings where collaboration can lead to better outcomes for everyone involved."`,
    questions: [
      "When was the last time you asked for help?",
      "What kinds of help do you often ask for?",
      "Why are teachers always willing to help students?",
      "Do you ask for help when you have a problem?"
    ]
  },
  {
    id: 'asking-help-advanced-part1',
    title: 'Asking for Help (Advanced)',
    titleVi: 'Asking for Help (Advanced)',
    description: 'Advanced discussion about support networks and mutual assistance',
    descriptionVi: 'Thảo luận nâng cao về mạng lưới hỗ trợ và sự giúp đỡ lẫn nhau',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Social Interaction',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced questions about support systems and social networks.

Teaching Strategy:
1. Complex grammatical structures
2. Sophisticated vocabulary about social support
3. Detailed explanations with examples
4. Natural connected speech

Advanced Language Features:
- Social psychology terms
- Professional networking
- Cultural perspectives
- Interpersonal dynamics

Example Response:
"The dynamics of seeking and offering assistance often reflect the intricate nature of human relationships and social support networks. I've observed that the most effective help-seeking behavior involves a delicate balance between self-reliance and the recognition that we all occasionally need support from others."`,
    questions: [
      "When was the last time you asked for help?",
      "What kinds of help do you often ask for?",
      "Why are teachers always willing to help students?",
      "Do you ask for help when you have a problem?"
    ]
  },
  // Childhood memory topic with variations
  {
    id: 'childhood-memories-part1',
    title: 'Childhood Memories',
    titleVi: 'Childhood Memories',
    description: 'Basic discussion about childhood experiences',
    descriptionVi: 'Thảo luận cơ bản về trải nghiệm tuổi thơ',
    level: 'Cơ bản',
    targetBand: 5.0,
    type: 'part1',
    difficulty: 'easy',
    category: 'Personal Experience',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on basic questions about childhood memories.

Teaching Strategy:
1. Simple past tense for memories
2. Basic vocabulary about childhood
3. Simple expressions of feelings
4. Clear pronunciation of past tense verbs

Example Questions:
- Did you enjoy your childhood?
- What games did you play?
- Where did you grow up?

Example Response:
"Yes, I had a happy childhood. I grew up in a small town, and I often played hide and seek with my friends after school. My favorite memory is celebrating birthdays with my family."`,
    questions: [
      "Do you think children should grow up in the city or the countryside?",
      "What are your best childhood memories?",
      "Did you enjoy your childhood?",
      "What did you enjoy doing as a child?"
    ]
  },
  {
    id: 'childhood-memories-intermediate-part1',
    title: 'Childhood Memories (Intermediate)',
    titleVi: 'Childhood Memories (Intermediate)',
    description: 'Intermediate discussion about childhood experiences and development',
    descriptionVi: 'Thảo luận trung cấp về trải nghiệm và phát triển tuổi thơ',
    level: 'Trung cấp',
    targetBand: 6.0,
    type: 'part1',
    difficulty: 'medium',
    category: 'Personal Experience',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on intermediate questions about childhood experiences.

Teaching Strategy:
1. Mix of past tenses for storytelling
2. Vocabulary about development and growth
3. Express emotions and reflections
4. Natural intonation in storytelling

Key Vocabulary:
- Childhood development
- Early education
- Social relationships
- Personal growth

Example Response:
"My childhood experiences have significantly shaped who I am today. Growing up in a close-knit community provided me with numerous opportunities for social interaction and personal development. I particularly cherish the memories of summer vacations spent exploring nature with my cousins."`,
    questions: [
      "Do you think children should grow up in the city or the countryside?",
      "What are your best childhood memories?",
      "Did you enjoy your childhood?",
      "What did you enjoy doing as a child?"
    ]
  },
  {
    id: 'childhood-memories-advanced-part1',
    title: 'Childhood Memories (Advanced)',
    titleVi: 'Childhood Memories (Advanced)',
    description: 'Advanced discussion about childhood development and influences',
    descriptionVi: 'Thảo luận nâng cao về sự phát triển và ảnh hưởng trong tuổi thơ',
    level: 'Nâng cao',
    targetBand: 7.0,
    type: 'part1',
    difficulty: 'hard',
    category: 'Personal Experience',
    criteria: ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'],
    tags: ['IELTS Speaking Forecast Q3-2024'],
    systemPrompt: `You are an IELTS Speaking examiner focusing on advanced questions about childhood development.

Teaching Strategy:
1. Complex grammatical structures
2. Sophisticated vocabulary about development
3. Detailed analysis of experiences
4. Natural connected speech

Advanced Language Features:
- Developmental psychology
- Environmental influences
- Social dynamics
- Cultural perspectives

Example Response:
"The formative years of childhood play a pivotal role in shaping one's personality and worldview. Reflecting on my own upbringing, I can discern how various environmental factors, from the cultural diversity of my neighborhood to the educational philosophy of my school, have contributed to my personal development and current perspective on life."`,
    questions: [
      "Do you think children should grow up in the city or the countryside?",
      "What are your best childhood memories?",
      "Did you enjoy your childhood?",
      "What did you enjoy doing as a child?"
    ]
  }
];
