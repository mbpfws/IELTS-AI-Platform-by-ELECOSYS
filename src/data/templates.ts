export const SPEAKING_TEMPLATES = {
  part1: [
    {
      title_en: "Personal Information",
      title_vi: "Thông tin cá nhân",
      description_en: "Common questions about your background, family, work/study, and daily life",
      description_vi: "Các câu hỏi thông thường về bản thân, gia đình, công việc/học tập và cuộc sống hàng ngày",
      level: "beginner",
      topics: ["personal", "family", "work", "study", "daily life"],
      duration: 15,
      target_band: 6.0,
      system_prompt: "You are an expert IELTS examiner conducting a Part 1 interview focusing on personal information. Ask questions about the candidate's background, family, work/study, and daily life. Provide feedback on their responses."
    },
    {
      title_en: "Hobbies & Interests",
      title_vi: "Sở thích và Điều yêu thích",
      description_en: "Questions about your free time activities, interests, and preferences",
      description_vi: "Các câu hỏi về hoạt động thời gian rảnh, sở thích và những điều bạn yêu thích",
      level: "intermediate",
      topics: ["hobbies", "interests", "free time", "entertainment"],
      duration: 15,
      target_band: 7.0,
      system_prompt: "You are an expert IELTS examiner conducting a Part 1 interview focusing on hobbies and interests. Ask questions about the candidate's leisure activities, preferences, and how they spend their free time. Provide feedback on their responses."
    }
  ],
  part2: [
    {
      title_en: "Describing a Person",
      title_vi: "Mô tả một người",
      description_en: "Practice describing someone important in your life, their characteristics and impact",
      description_vi: "Thực hành mô tả một người quan trọng trong cuộc sống của bạn, đặc điểm và ảnh hưởng của họ",
      level: "intermediate",
      topics: ["people", "relationships", "personality", "influence"],
      duration: 20,
      target_band: 6.5,
      system_prompt: "You are an expert IELTS examiner conducting a Part 2 long-turn task about describing a person. Guide the candidate through the cue card, listen to their response, and provide detailed feedback on their performance."
    },
    {
      title_en: "Describing a Place",
      title_vi: "Mô tả một địa điểm",
      description_en: "Practice describing a memorable location, its features and significance",
      description_vi: "Thực hành mô tả một địa điểm đáng nhớ, đặc điểm và ý nghĩa của nó",
      level: "advanced",
      topics: ["places", "travel", "memories", "description"],
      duration: 20,
      target_band: 7.5,
      system_prompt: "You are an expert IELTS examiner conducting a Part 2 long-turn task about describing a place. Guide the candidate through the cue card, listen to their response, and provide detailed feedback on their performance."
    }
  ],
  part3: [
    {
      title_en: "Technology & Society",
      title_vi: "Công nghệ & Xã hội",
      description_en: "Discuss the impact of technology on modern society and future trends",
      description_vi: "Thảo luận về tác động của công nghệ đối với xã hội hiện đại và xu hướng tương lai",
      level: "advanced",
      topics: ["technology", "society", "future", "trends"],
      duration: 25,
      target_band: 7.0,
      system_prompt: "You are an expert IELTS examiner conducting a Part 3 discussion about technology and society. Ask in-depth questions about technological impact, future trends, and societal changes. Encourage critical thinking and detailed responses."
    },
    {
      title_en: "Education Systems",
      title_vi: "Hệ thống Giáo dục",
      description_en: "Analyze and compare different education systems and learning methods",
      description_vi: "Phân tích và so sánh các hệ thống giáo dục và phương pháp học tập khác nhau",
      level: "advanced",
      topics: ["education", "learning", "teaching", "academic"],
      duration: 25,
      target_band: 8.0,
      system_prompt: "You are an expert IELTS examiner conducting a Part 3 discussion about education systems. Ask complex questions about educational methods, policies, and future developments. Encourage analytical thinking and well-structured responses."
    }
  ],
  tutoring: [
    {
      title_en: "Fluency Development",
      title_vi: "Phát triển Khả năng Nói trôi chảy",
      description_en: "Focused practice on improving speaking fluency and natural expression",
      description_vi: "Luyện tập tập trung vào việc cải thiện khả năng nói trôi chảy và biểu đạt tự nhiên",
      level: "intermediate",
      topics: ["fluency", "expression", "confidence", "practice"],
      duration: 30,
      target_band: 6.5,
      system_prompt: "You are an expert IELTS tutor focusing on developing speaking fluency. Guide the student through various speaking exercises, provide immediate feedback, and help them overcome hesitation and improve natural expression."
    },
    {
      title_en: "Advanced Structures",
      title_vi: "Cấu trúc Nâng cao",
      description_en: "Master complex grammatical structures and academic vocabulary",
      description_vi: "Làm chủ các cấu trúc ngữ pháp phức tạp và từ vựng học thuật",
      level: "advanced",
      topics: ["grammar", "vocabulary", "academic", "complexity"],
      duration: 45,
      target_band: 7.5,
      system_prompt: "You are an expert IELTS tutor focusing on advanced language structures. Help the student master complex grammatical patterns, academic vocabulary, and sophisticated expressions. Provide detailed feedback and correction."
    }
  ]
};
