import { SpeakingTemplate } from '@/types/speaking';

const baseInstructions = `
You are an IELTS Speaking tutor using LearnLM 1.5 Pro to help students improve their speaking skills. You will:

1. Listen and evaluate student responses naturally during the conversation
2. Only provide detailed feedback and scoring when the session time is up, focusing on:
   - Fluency and coherence (0-9)
   - Vocabulary range and accuracy (0-9)
   - Grammatical range and accuracy (0-9)
   - Pronunciation (0-9)

3. During the conversation:
   - Ask natural follow-up questions based on student responses
   - Create a comfortable learning environment
   - Use both English and Vietnamese based on student's initial response language
   - Maintain a natural conversation flow
   - Only provide immediate correction for serious errors

4. At the end of the session:
   - Provide a comprehensive evaluation in JSON format
   - Include specific examples from the conversation
   - Give actionable improvement suggestions

Model: learnlm-1.5-pro-experimental
Max tokens: 4000
`;

const part1SystemInstruction = `You are conducting IELTS Speaking Part 1.
This part consists of general questions about familiar topics.
- Ask one question at a time
- Follow-up with related questions based on the candidate's response
- Keep questions simple and direct
- Focus on personal experiences and preferences
- Maintain a friendly, conversational tone`;

const part2SystemInstruction = `You are conducting IELTS Speaking Part 2 (Cue Card).
- Give the candidate a topic to speak about for 1-2 minutes
- Allow 1 minute preparation time
- Listen to the response without interruption
- Ask 1-2 follow-up questions after they finish
- Topics should cover: describing people, places, objects, or events`;

const part3SystemInstruction = `You are conducting IELTS Speaking Part 3.
This part involves more abstract and analytical discussion.
- Ask questions that require analysis and opinion
- Explore broader implications of the topic
- Challenge the candidate with why/how questions
- Allow the candidate to develop their ideas
- Connect responses to wider social contexts`;

// Part 1 Templates (40 topics)
export const part1Templates: SpeakingTemplate[] = [
  // Home/Accommodation
  {
    id: 'p1_home_1',
    title: 'Nơi bạn sống',
    description: 'Thảo luận về nơi bạn sinh sống và lớn lên',
    category: 'part1',
    systemInstruction: `${baseInstructions}\n${part1SystemInstruction}\nFocus: Home and living situation`,
    initialQuestion: 'Hãy kể về nơi bạn đang sống. Bạn thích điều gì nhất ở đó?',
    learningObjectives: [
      'Mô tả địa điểm',
      'Diễn đạt cảm xúc',
      'Sử dụng từ vựng về môi trường sống'
    ],
    tags: ['Hometown', 'Living Environment'],
    duration: 300
  },
  {
    id: 'p1_home_2',
    title: 'Phòng yêu thích',
    description: 'Mô tả phòng bạn thích nhất trong nhà',
    category: 'part1',
    systemInstruction: `${baseInstructions}\n${part1SystemInstruction}\nFocus: Favorite room in the house`,
    initialQuestion: 'Hãy mô tả phòng bạn thích nhất trong nhà.',
    learningObjectives: [
      'Mô tả chi tiết',
      'Diễn đạt sở thích',
      'Sử dụng từ vựng về đồ đạc'
    ],
    tags: ['Home', 'Favorite Room'],
    duration: 300
  },
  
  // Work/Study
  {
    id: 'p1_work_1',
    title: 'Công việc/Học tập',
    description: 'Thảo luận về công việc hoặc việc học của bạn',
    category: 'part1',
    systemInstruction: `${baseInstructions}\n${part1SystemInstruction}\nFocus: Work or studies`,
    initialQuestion: 'Bạn thường làm gì trong thời gian rảnh?',
    learningObjectives: [
      'Mô tả công việc hoặc học tập',
      'Diễn đạt mục tiêu',
      'Sử dụng từ vựng về nghề nghiệp'
    ],
    tags: ['Work', 'Study'],
    duration: 300
  },
  {
    id: 'p1_work_2',
    title: 'Kế hoạch tương lai',
    description: 'Nói về kế hoạch nghề nghiệp trong tương lai',
    category: 'part1',
    systemInstruction: `${baseInstructions}\n${part1SystemInstruction}\nFocus: Future career plans`,
    initialQuestion: 'Hãy nói về kế hoạch nghề nghiệp của bạn trong tương lai.',
    learningObjectives: [
      'Mô tả kế hoạch',
      'Diễn đạt mục tiêu',
      'Sử dụng từ vựng về nghề nghiệp'
    ],
    tags: ['Career', 'Future Plans'],
    duration: 300
  },

  // Hobbies/Free Time
  {
    id: 'p1_hobby_1',
    title: 'Sở thích',
    description: 'Chia sẻ về sở thích và thời gian rảnh',
    category: 'part1',
    systemInstruction: `${baseInstructions}\n${part1SystemInstruction}\nFocus: Hobbies and free time`,
    initialQuestion: 'Bạn thường làm gì trong thời gian rảnh?',
    learningObjectives: [
      'Mô tả sở thích',
      'Diễn đạt cảm xúc',
      'Sử dụng từ vựng về hoạt động giải trí'
    ],
    tags: ['Hobbies', 'Free Time'],
    duration: 300
  },
  
  // Weather/Seasons
  {
    id: 'p1_weather_1',
    title: 'Thời tiết',
    description: 'Thảo luận về thời tiết và mùa yêu thích',
    category: 'part1',
    systemInstruction: `${baseInstructions}\n${part1SystemInstruction}\nFocus: Weather preferences and seasonal changes`,
    initialQuestion: 'Hãy nói về thời tiết và mùa yêu thích của bạn.',
    learningObjectives: [
      'Mô tả thời tiết',
      'Diễn đạt sở thích',
      'Sử dụng từ vựng về thời tiết'
    ],
    tags: ['Weather', 'Seasons'],
    duration: 300
  },

  // Continue with more Part 1 templates...
];

// Part 2 Templates (50 topics)
export const part2Templates: SpeakingTemplate[] = [
  // People
  {
    id: 'p2_people_1',
    title: 'Người truyền cảm hứng',
    description: 'Mô tả về một người truyền cảm hứng cho bạn',
    category: 'part2_people',
    systemInstruction: `${baseInstructions}\n${part2SystemInstruction}\nAsk the candidate to describe a person who:\n- Has influenced them\n- They admire\n- Has helped them in some way`,
    initialQuestion: 'Hãy mô tả một người đã truyền cảm hứng cho bạn.',
    learningObjectives: [
      'Mô tả người',
      'Diễn đạt cảm xúc',
      'Sử dụng từ vựng về tính cách'
    ],
    tags: ['Inspiring Person', 'Role Model'],
    duration: 300
  },
  {
    id: 'p2_people_2',
    title: 'Người bạn thân',
    description: 'Nói về người bạn thân nhất của bạn',
    category: 'part2_people',
    systemInstruction: `${baseInstructions}\n${part2SystemInstruction}\nAsk the candidate to describe a person who:\n- Is a close friend\n- Has helped them in some way\n- They admire`,
    initialQuestion: 'Hãy nói về người bạn thân nhất của bạn.',
    learningObjectives: [
      'Mô tả người',
      'Diễn đạt cảm xúc',
      'Sử dụng từ vựng về mối quan hệ'
    ],
    tags: ['Best Friend', 'Relationship'],
    duration: 300
  },

  // Events/Occasions
  {
    id: 'p2_event_1',
    title: 'Kỷ niệm đáng nhớ',
    description: 'Mô tả một sự kiện đáng nhớ trong đời',
    category: 'part2_events',
    systemInstruction: `${baseInstructions}\n${part2SystemInstruction}\nAsk the candidate to describe an event that:\n- Is memorable\n- Has left a strong impression\n- They would like to repeat`,
    initialQuestion: 'Hãy mô tả một sự kiện đáng nhớ trong đời bạn.',
    learningObjectives: [
      'Mô tả sự kiện',
      'Diễn đạt cảm xúc',
      'Sử dụng từ vựng về thời gian'
    ],
    tags: ['Memorable Event', 'Experience'],
    duration: 300
  },
  {
    id: 'p2_event_2',
    title: 'Lễ hội truyền thống',
    description: 'Nói về một lễ hội truyền thống bạn thích',
    category: 'part2_events',
    systemInstruction: `${baseInstructions}\n${part2SystemInstruction}\nAsk the candidate to describe a festival that:\n- Is traditional\n- They enjoy attending\n- Has cultural significance`,
    initialQuestion: 'Hãy nói về một lễ hội truyền thống bạn thích.',
    learningObjectives: [
      'Mô tả lễ hội',
      'Diễn đạt sở thích',
      'Sử dụng từ vựng về văn hóa'
    ],
    tags: ['Traditional Festival', 'Culture'],
    duration: 300
  },

  // Places/Destinations
  {
    id: 'p2_place_1',
    title: 'Địa điểm du lịch',
    description: 'Mô tả một nơi bạn đã từng đến thăm',
    category: 'part2_places',
    systemInstruction: `${baseInstructions}\n${part2SystemInstruction}\nAsk the candidate to describe a place that:\n- Is a popular tourist destination\n- They have visited\n- Has left a strong impression`,
    initialQuestion: 'Hãy mô tả một nơi bạn đã từng đến thăm.',
    learningObjectives: [
      'Mô tả địa điểm',
      'Diễn đạt cảm xúc',
      'Sử dụng từ vựng về du lịch'
    ],
    tags: ['Travel Destination', 'Tourism'],
    duration: 300
  },
  {
    id: 'p2_place_2',
    title: 'Thành phố yêu thích',
    description: 'Nói về thành phố bạn thích nhất',
    category: 'part2_places',
    systemInstruction: `${baseInstructions}\n${part2SystemInstruction}\nAsk the candidate to describe a city that:\n- Is their favorite\n- They have visited\n- Has cultural significance`,
    initialQuestion: 'Hãy nói về thành phố bạn thích nhất.',
    learningObjectives: [
      'Mô tả thành phố',
      'Diễn đạt sở thích',
      'Sử dụng từ vựng về địa lý'
    ],
    tags: ['Favorite City', 'Geography'],
    duration: 300
  },

  // Objects
  {
    id: 'p2_object_1',
    title: 'Món quà ý nghĩa',
    description: 'Mô tả một món quà có ý nghĩa với bạn',
    category: 'part2_objects',
    systemInstruction: `${baseInstructions}\n${part2SystemInstruction}\nAsk the candidate to describe an object that:\n- Is meaningful\n- They have received as a gift\n- Has sentimental value`,
    initialQuestion: 'Hãy mô tả một món quà có ý nghĩa với bạn.',
    learningObjectives: [
      'Mô tả món quà',
      'Diễn đạt cảm xúc',
      'Sử dụng từ vựng về vật dụng'
    ],
    tags: ['Meaningful Gift', 'Present'],
    duration: 300
  },
  {
    id: 'p2_object_2',
    title: 'Vật dụng quan trọng',
    description: 'Nói về một vật dụng quan trọng trong cuộc sống',
    category: 'part2_objects',
    systemInstruction: `${baseInstructions}\n${part2SystemInstruction}\nAsk the candidate to describe an object that:\n- Is important\n- They use daily\n- Has practical value`,
    initialQuestion: 'Hãy nói về một vật dụng quan trọng trong cuộc sống.',
    learningObjectives: [
      'Mô tả vật dụng',
      'Diễn đạt sở thích',
      'Sử dụng từ vựng về đồ đạc'
    ],
    tags: ['Important Object', 'Possession'],
    duration: 300
  },

  // Continue with more Part 2 templates...
];

// Part 3 Templates
export const part3Templates: SpeakingTemplate[] = [
  {
    id: 'p3_education_1',
    title: 'Giáo dục hiện đại',
    description: 'Thảo luận về vai trò của công nghệ trong giáo dục',
    category: 'part3',
    systemInstruction: `${baseInstructions}\n${part3SystemInstruction}\nExplore topics such as:\n- Compare education systems\n- Role of technology in education\n- Future of learning\n- Educational challenges`,
    initialQuestion: 'Hãy thảo luận về vai trò của công nghệ trong giáo dục.',
    learningObjectives: [
      'Thảo luận về giáo dục',
      'Diễn đạt ý kiến',
      'Sử dụng từ vựng về công nghệ'
    ],
    tags: ['Modern Education', 'Technology'],
    duration: 300
  },
  {
    id: 'p3_environment_1',
    title: 'Bảo vệ môi trường',
    description: 'Bàn về các vấn đề môi trường và giải pháp',
    category: 'part3',
    systemInstruction: `${baseInstructions}\n${part3SystemInstruction}\nDiscuss:\n- Environmental challenges\n- Solutions to pollution\n- Individual vs collective responsibility\n- Future environmental scenarios`,
    initialQuestion: 'Hãy bàn về các vấn đề môi trường và giải pháp.',
    learningObjectives: [
      'Thảo luận về môi trường',
      'Diễn đạt ý kiến',
      'Sử dụng từ vựng về bảo vệ môi trường'
    ],
    tags: ['Environmental Issues', 'Solutions'],
    duration: 300
  },
  // Continue with more Part 3 templates...
];

// Tutoring Templates
export const tutoringTemplates: SpeakingTemplate[] = [
  {
    id: 'tutoring_1',
    title: 'Double Comparatives',
    description: 'Luyện tập cấu trúc so sánh kép',
    category: 'tutoring',
    systemInstruction: `${baseInstructions}\nFocus: Double comparatives`,
    initialQuestion: 'Hãy luyện tập cấu trúc so sánh kép.',
    learningObjectives: [
      'Luyện tập cấu trúc',
      'Diễn đạt ý kiến',
      'Sử dụng từ vựng về so sánh'
    ],
    tags: ['Double Comparatives', 'Grammar'],
    duration: 5400
  },
  {
    id: 'tutoring_2',
    title: 'Mixed Conditionals',
    description: 'Thực hành câu điều kiện hỗn hợp',
    category: 'tutoring',
    systemInstruction: `${baseInstructions}\nFocus: Mixed conditionals`,
    initialQuestion: 'Hãy thực hành câu điều kiện hỗn hợp.',
    learningObjectives: [
      'Thực hành câu điều kiện',
      'Diễn đạt ý kiến',
      'Sử dụng từ vựng về điều kiện'
    ],
    tags: ['Mixed Conditionals', 'Grammar'],
    duration: 5400
  },
  {
    id: 'tutoring_3',
    title: 'Inversion',
    description: 'Luyện tập đảo ngữ trong tiếng Anh',
    category: 'tutoring',
    systemInstruction: `${baseInstructions}\nFocus: Inversion`,
    initialQuestion: 'Hãy luyện tập đảo ngữ trong tiếng Anh.',
    learningObjectives: [
      'Luyện tập đảo ngữ',
      'Diễn đạt ý kiến',
      'Sử dụng từ vựng về ngữ pháp'
    ],
    tags: ['Inversion', 'Grammar'],
    duration: 5400
  },
  // Add custom template form handling in the UI
];

export const speakingTemplates = [
  ...part1Templates,
  ...part2Templates,
  ...part3Templates,
  ...tutoringTemplates
];

export default speakingTemplates;
