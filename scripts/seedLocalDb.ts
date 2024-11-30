import { PrismaClient } from '@prisma/client';

// Define template interfaces locally to avoid import issues
interface Template {
  id: string;
  title: string;
  title_vi: string;
  description: string;
  description_vi: string;
  level: string;
  topics_json: string;
  duration: number;
  target_band: number;
  parts: {
    part: number;
    prompt: string;
  }[];
}

// Import templates directly
const part1Templates: Template[] = [
  {
    id: "part1-1",
    title: "Introduction and Personal Information",
    title_vi: "Giới thiệu và Thông tin Cá nhân",
    description: "Basic questions about yourself and your background",
    description_vi: "Các câu hỏi cơ bản về bản thân và lai lịch của bạn",
    level: "beginner",
    topics_json: JSON.stringify(["personal", "background", "introduction"]),
    duration: 4,
    target_band: 6.0,
    parts: [{
      part: 1,
      prompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on personal information and background."
    }]
  },
  {
    id: "part1-2",
    title: "Work and Studies",
    title_vi: "Công việc và Học tập",
    description: "Questions about your work experience and education",
    description_vi: "Các câu hỏi về kinh nghiệm làm việc và giáo dục của bạn",
    level: "beginner",
    topics_json: JSON.stringify(["work", "education", "studies"]),
    duration: 4,
    target_band: 6.0,
    parts: [{
      part: 1,
      prompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on work and study experiences."
    }]
  },
  {
    id: "part1-3",
    title: "Hobbies and Free Time",
    title_vi: "Sở thích và Thời gian Rảnh",
    description: "Questions about your interests and leisure activities",
    description_vi: "Các câu hỏi về sở thích và hoạt động giải trí của bạn",
    level: "beginner",
    topics_json: JSON.stringify(["hobbies", "leisure", "interests"]),
    duration: 4,
    target_band: 6.0,
    parts: [{
      part: 1,
      prompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on hobbies and leisure activities."
    }]
  },
  {
    id: "part1-4",
    title: "Home and Accommodation",
    title_vi: "Nhà ở và Chỗ ở",
    description: "Questions about where you live and your home",
    description_vi: "Các câu hỏi về nơi bạn sống và nhà của bạn",
    level: "beginner",
    topics_json: JSON.stringify(["home", "accommodation", "living"]),
    duration: 4,
    target_band: 6.0,
    parts: [{
      part: 1,
      prompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on home and living arrangements."
    }]
  },
  {
    id: "part1-5",
    title: "Daily Routine and Lifestyle",
    title_vi: "Thói quen và Lối sống Hàng ngày",
    description: "Questions about your daily activities and lifestyle",
    description_vi: "Các câu hỏi về hoạt động hàng ngày và lối sống của bạn",
    level: "beginner",
    topics_json: JSON.stringify(["routine", "lifestyle", "daily life"]),
    duration: 4,
    target_band: 6.0,
    parts: [{
      part: 1,
      prompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on daily routines and lifestyle habits."
    }]
  },
  {
    id: "part1-6",
    title: "Weather and Seasons",
    title_vi: "Thời tiết và Mùa",
    description: "Questions about weather preferences and seasonal activities",
    description_vi: "Các câu hỏi về sở thích thời tiết và hoạt động theo mùa",
    level: "beginner",
    topics_json: JSON.stringify(["weather", "seasons", "climate"]),
    duration: 4,
    target_band: 6.0,
    parts: [{
      part: 1,
      prompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on weather and seasonal preferences."
    }]
  }
];

const part2Templates: Template[] = [
  {
    id: "part2-1",
    title: "Describing a Person",
    title_vi: "Mô tả một Người",
    description: "Talk about someone important in your life",
    description_vi: "Nói về một người quan trọng trong cuộc đời bạn",
    level: "intermediate",
    topics_json: JSON.stringify(["people", "description", "relationships"]),
    duration: 3,
    target_band: 6.5,
    parts: [{
      part: 2,
      prompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a person who has influenced them."
    }]
  },
  {
    id: "part2-2",
    title: "Describing a Place",
    title_vi: "Mô tả một Địa điểm",
    description: "Describe a place you have visited or would like to visit",
    description_vi: "Mô tả một địa điểm bạn đã đến thăm hoặc muốn đến thăm",
    level: "intermediate",
    topics_json: JSON.stringify(["places", "travel", "description"]),
    duration: 3,
    target_band: 6.5,
    parts: [{
      part: 2,
      prompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a memorable place."
    }]
  },
  {
    id: "part2-3",
    title: "Describing an Event",
    title_vi: "Mô tả một Sự kiện",
    description: "Talk about a significant event in your life",
    description_vi: "Nói về một sự kiện quan trọng trong cuộc đời bạn",
    level: "intermediate",
    topics_json: JSON.stringify(["events", "experiences", "memories"]),
    duration: 3,
    target_band: 6.5,
    parts: [{
      part: 2,
      prompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a memorable event."
    }]
  },
  {
    id: "part2-4",
    title: "Describing an Object",
    title_vi: "Mô tả một Vật thể",
    description: "Talk about an important object or possession",
    description_vi: "Nói về một vật thể hoặc tài sản quan trọng",
    level: "intermediate",
    topics_json: JSON.stringify(["objects", "possessions", "description"]),
    duration: 3,
    target_band: 6.5,
    parts: [{
      part: 2,
      prompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a meaningful object they own."
    }]
  },
  {
    id: "part2-5",
    title: "Describing a Photograph",
    title_vi: "Mô tả một Bức ảnh",
    description: "Describe a memorable photograph",
    description_vi: "Mô tả một bức ảnh đáng nhớ",
    level: "intermediate",
    topics_json: JSON.stringify(["photographs", "memories", "description"]),
    duration: 3,
    target_band: 6.5,
    parts: [{
      part: 2,
      prompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a photograph that means something to them."
    }]
  },
  {
    id: "part2-6",
    title: "Describing a Journey",
    title_vi: "Mô tả một Chuyến đi",
    description: "Talk about a memorable journey or trip",
    description_vi: "Nói về một chuyến đi đáng nhớ",
    level: "intermediate",
    topics_json: JSON.stringify(["travel", "journey", "experiences"]),
    duration: 3,
    target_band: 6.5,
    parts: [{
      part: 2,
      prompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a journey that was significant to them."
    }]
  }
];

const part3Templates: Template[] = [
  {
    id: "part3-1",
    title: "Discussion on Social Issues",
    title_vi: "Thảo luận về Các Vấn đề Xã hội",
    description: "Discuss various aspects of social topics",
    description_vi: "Thảo luận về các khía cạnh của các chủ đề xã hội",
    level: "advanced",
    topics_json: JSON.stringify(["society", "issues", "discussion"]),
    duration: 4,
    target_band: 7.0,
    parts: [{
      part: 3,
      prompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Engage in a discussion about current social issues."
    }]
  },
  {
    id: "part3-2",
    title: "Technology and Innovation",
    title_vi: "Công nghệ và Đổi mới",
    description: "Discuss the impact of technology on society",
    description_vi: "Thảo luận về tác động của công nghệ đối với xã hội",
    level: "advanced",
    topics_json: JSON.stringify(["technology", "innovation", "society"]),
    duration: 4,
    target_band: 7.0,
    parts: [{
      part: 3,
      prompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Discuss the role of technology in modern society."
    }]
  },
  {
    id: "part3-3",
    title: "Environment and Sustainability",
    title_vi: "Môi trường và Phát triển Bền vững",
    description: "Discuss environmental challenges and solutions",
    description_vi: "Thảo luận về các thách thức và giải pháp môi trường",
    level: "advanced",
    topics_json: JSON.stringify(["environment", "sustainability", "climate"]),
    duration: 4,
    target_band: 7.0,
    parts: [{
      part: 3,
      prompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Engage in a discussion about environmental issues and sustainability."
    }]
  },
  {
    id: "part3-4",
    title: "Education and Learning",
    title_vi: "Giáo dục và Học tập",
    description: "Discuss modern education systems and learning methods",
    description_vi: "Thảo luận về hệ thống giáo dục và phương pháp học tập hiện đại",
    level: "advanced",
    topics_json: JSON.stringify(["education", "learning", "teaching"]),
    duration: 4,
    target_band: 7.0,
    parts: [{
      part: 3,
      prompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Engage in a discussion about education systems and learning approaches."
    }]
  },
  {
    id: "part3-5",
    title: "Work and Career Development",
    title_vi: "Công việc và Phát triển Nghề nghiệp",
    description: "Discuss career choices and workplace trends",
    description_vi: "Thảo luận về lựa chọn nghề nghiệp và xu hướng nơi làm việc",
    level: "advanced",
    topics_json: JSON.stringify(["work", "career", "professional development"]),
    duration: 4,
    target_band: 7.0,
    parts: [{
      part: 3,
      prompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Discuss modern workplace trends and career development."
    }]
  },
  {
    id: "part3-6",
    title: "Media and Communication",
    title_vi: "Truyền thông và Giao tiếp",
    description: "Discuss the impact of media and modern communication",
    description_vi: "Thảo luận về tác động của truyền thông và giao tiếp hiện đại",
    level: "advanced",
    topics_json: JSON.stringify(["media", "communication", "social media"]),
    duration: 4,
    target_band: 7.0,
    parts: [{
      part: 3,
      prompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Engage in a discussion about media influence and communication changes."
    }]
  }
];

const prisma = new PrismaClient();

async function seedTemplates() {
  try {
    console.log('Starting to seed templates...');

    // Clear existing templates
    await prisma.speaking_Part.deleteMany();
    await prisma.speaking_Template.deleteMany();

    // Seed Part 1 Templates
    for (const template of part1Templates) {
      await prisma.speaking_Template.create({
        data: {
          title: template.title,
          title_vi: template.title_vi,
          description: template.description,
          description_vi: template.description_vi,
          duration: template.duration,
          level: template.level,
          target_band: template.target_band,
          topics_json: template.topics_json,
          parts: {
            create: template.parts
          }
        }
      });
    }

    // Seed Part 2 Templates
    for (const template of part2Templates) {
      await prisma.speaking_Template.create({
        data: {
          title: template.title,
          title_vi: template.title_vi,
          description: template.description,
          description_vi: template.description_vi,
          duration: template.duration,
          level: template.level,
          target_band: template.target_band,
          topics_json: template.topics_json,
          parts: {
            create: template.parts
          }
        }
      });
    }

    // Seed Part 3 Templates
    for (const template of part3Templates) {
      await prisma.speaking_Template.create({
        data: {
          title: template.title,
          title_vi: template.title_vi,
          description: template.description,
          description_vi: template.description_vi,
          duration: template.duration,
          level: template.level,
          target_band: template.target_band,
          topics_json: template.topics_json,
          parts: {
            create: template.parts
          }
        }
      });
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedTemplates();
