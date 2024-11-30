import { PrismaClient } from '@prisma/client';

// Define template interfaces locally to avoid import issues
interface Template {
  id: string;
  titleEn: string;
  titleVi: string;
  descriptionEn?: string;
  description: string;
  descriptionVi: string;
  level: string;
  topics: string[];
  duration: number;
  targetBand: number;
  systemPrompt: string;
}

// Import templates directly
const part1Templates: Template[] = [
  {
    id: "part1-1",
    titleEn: "Introduction and Personal Information",
    titleVi: "Giới thiệu và Thông tin Cá nhân",
    description: "Basic questions about yourself and your background",
    descriptionEn: "Basic questions about yourself and your background",
    descriptionVi: "Các câu hỏi cơ bản về bản thân và lai lịch của bạn",
    level: "beginner",
    topics: ["personal", "background", "introduction"],
    duration: 4,
    targetBand: 6.0,
    systemPrompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on personal information and background."
  },
  {
    id: "part1-2",
    titleEn: "Work and Studies",
    titleVi: "Công việc và Học tập",
    description: "Questions about your work experience and education",
    descriptionEn: "Questions about your work experience and education",
    descriptionVi: "Các câu hỏi về kinh nghiệm làm việc và giáo dục của bạn",
    level: "beginner",
    topics: ["work", "education", "studies"],
    duration: 4,
    targetBand: 6.0,
    systemPrompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on work and study experiences."
  },
  {
    id: "part1-3",
    titleEn: "Hobbies and Free Time",
    titleVi: "Sở thích và Thời gian Rảnh",
    description: "Questions about your interests and leisure activities",
    descriptionEn: "Questions about your interests and leisure activities",
    descriptionVi: "Các câu hỏi về sở thích và hoạt động giải trí của bạn",
    level: "beginner",
    topics: ["hobbies", "leisure", "interests"],
    duration: 4,
    targetBand: 6.0,
    systemPrompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on hobbies and leisure activities."
  },
  {
    id: "part1-4",
    titleEn: "Home and Accommodation",
    titleVi: "Nhà ở và Chỗ ở",
    description: "Questions about where you live and your home",
    descriptionEn: "Questions about where you live and your home",
    descriptionVi: "Các câu hỏi về nơi bạn sống và nhà của bạn",
    level: "beginner",
    topics: ["home", "accommodation", "living"],
    duration: 4,
    targetBand: 6.0,
    systemPrompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on home and living arrangements."
  },
  {
    id: "part1-5",
    titleEn: "Daily Routine and Lifestyle",
    titleVi: "Thói quen và Lối sống Hàng ngày",
    description: "Questions about your daily activities and lifestyle",
    descriptionEn: "Questions about your daily activities and lifestyle",
    descriptionVi: "Các câu hỏi về hoạt động hàng ngày và lối sống của bạn",
    level: "beginner",
    topics: ["routine", "lifestyle", "daily life"],
    duration: 4,
    targetBand: 6.0,
    systemPrompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on daily routines and lifestyle habits."
  },
  {
    id: "part1-6",
    titleEn: "Weather and Seasons",
    titleVi: "Thời tiết và Mùa",
    description: "Questions about weather preferences and seasonal activities",
    descriptionEn: "Questions about weather preferences and seasonal activities",
    descriptionVi: "Các câu hỏi về sở thích thời tiết và hoạt động theo mùa",
    level: "beginner",
    topics: ["weather", "seasons", "climate"],
    duration: 4,
    targetBand: 6.0,
    systemPrompt: "You are an IELTS examiner conducting Part 1 of the speaking test, focusing on weather and seasonal preferences."
  }
];

const part2Templates: Template[] = [
  {
    id: "part2-1",
    titleEn: "Describing a Person",
    titleVi: "Mô tả một Người",
    description: "Talk about someone important in your life",
    descriptionEn: "Talk about someone important in your life",
    descriptionVi: "Nói về một người quan trọng trong cuộc đời bạn",
    level: "intermediate",
    topics: ["people", "description", "relationships"],
    duration: 3,
    targetBand: 6.5,
    systemPrompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a person who has influenced them."
  },
  {
    id: "part2-2",
    titleEn: "Describing a Place",
    titleVi: "Mô tả một Địa điểm",
    description: "Describe a place you have visited or would like to visit",
    descriptionEn: "Describe a place you have visited or would like to visit",
    descriptionVi: "Mô tả một địa điểm bạn đã đến thăm hoặc muốn đến thăm",
    level: "intermediate",
    topics: ["places", "travel", "description"],
    duration: 3,
    targetBand: 6.5,
    systemPrompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a memorable place."
  },
  {
    id: "part2-3",
    titleEn: "Describing an Event",
    titleVi: "Mô tả một Sự kiện",
    description: "Talk about a significant event in your life",
    descriptionEn: "Talk about a significant event in your life",
    descriptionVi: "Nói về một sự kiện quan trọng trong cuộc đời bạn",
    level: "intermediate",
    topics: ["events", "experiences", "memories"],
    duration: 3,
    targetBand: 6.5,
    systemPrompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a memorable event."
  },
  {
    id: "part2-4",
    titleEn: "Describing an Object",
    titleVi: "Mô tả một Vật thể",
    description: "Talk about an important object or possession",
    descriptionEn: "Talk about an important object or possession",
    descriptionVi: "Nói về một vật thể hoặc tài sản quan trọng",
    level: "intermediate",
    topics: ["objects", "possessions", "description"],
    duration: 3,
    targetBand: 6.5,
    systemPrompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a meaningful object they own."
  },
  {
    id: "part2-5",
    titleEn: "Describing a Photograph",
    titleVi: "Mô tả một Bức ảnh",
    description: "Describe a memorable photograph",
    descriptionEn: "Describe a memorable photograph",
    descriptionVi: "Mô tả một bức ảnh đáng nhớ",
    level: "intermediate",
    topics: ["photographs", "memories", "description"],
    duration: 3,
    targetBand: 6.5,
    systemPrompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a photograph that means something to them."
  },
  {
    id: "part2-6",
    titleEn: "Describing a Journey",
    titleVi: "Mô tả một Chuyến đi",
    description: "Talk about a memorable journey or trip",
    descriptionEn: "Talk about a memorable journey or trip",
    descriptionVi: "Nói về một chuyến đi đáng nhớ",
    level: "intermediate",
    topics: ["travel", "journey", "experiences"],
    duration: 3,
    targetBand: 6.5,
    systemPrompt: "You are an IELTS examiner conducting Part 2 of the speaking test. Ask the candidate to describe a journey that was significant to them."
  }
];

const part3Templates: Template[] = [
  {
    id: "part3-1",
    titleEn: "Discussion on Social Issues",
    titleVi: "Thảo luận về Các Vấn đề Xã hội",
    description: "Discuss various aspects of social topics",
    descriptionEn: "Discuss various aspects of social topics",
    descriptionVi: "Thảo luận về các khía cạnh của các chủ đề xã hội",
    level: "advanced",
    topics: ["society", "issues", "discussion"],
    duration: 4,
    targetBand: 7.0,
    systemPrompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Engage in a discussion about current social issues."
  },
  {
    id: "part3-2",
    titleEn: "Technology and Innovation",
    titleVi: "Công nghệ và Đổi mới",
    description: "Discuss the impact of technology on society",
    descriptionEn: "Discuss the impact of technology on society",
    descriptionVi: "Thảo luận về tác động của công nghệ đối với xã hội",
    level: "advanced",
    topics: ["technology", "innovation", "society"],
    duration: 4,
    targetBand: 7.0,
    systemPrompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Discuss the role of technology in modern society."
  },
  {
    id: "part3-3",
    titleEn: "Environment and Sustainability",
    titleVi: "Môi trường và Phát triển Bền vững",
    description: "Discuss environmental challenges and solutions",
    descriptionEn: "Discuss environmental challenges and solutions",
    descriptionVi: "Thảo luận về các thách thức và giải pháp môi trường",
    level: "advanced",
    topics: ["environment", "sustainability", "climate"],
    duration: 4,
    targetBand: 7.0,
    systemPrompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Engage in a discussion about environmental issues and sustainability."
  },
  {
    id: "part3-4",
    titleEn: "Education and Learning",
    titleVi: "Giáo dục và Học tập",
    description: "Discuss modern education systems and learning methods",
    descriptionEn: "Discuss modern education systems and learning methods",
    descriptionVi: "Thảo luận về hệ thống giáo dục và phương pháp học tập hiện đại",
    level: "advanced",
    topics: ["education", "learning", "teaching"],
    duration: 4,
    targetBand: 7.0,
    systemPrompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Engage in a discussion about education systems and learning approaches."
  },
  {
    id: "part3-5",
    titleEn: "Work and Career Development",
    titleVi: "Công việc và Phát triển Nghề nghiệp",
    description: "Discuss career choices and workplace trends",
    descriptionEn: "Discuss career choices and workplace trends",
    descriptionVi: "Thảo luận về lựa chọn nghề nghiệp và xu hướng nơi làm việc",
    level: "advanced",
    topics: ["work", "career", "professional development"],
    duration: 4,
    targetBand: 7.0,
    systemPrompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Discuss modern workplace trends and career development."
  },
  {
    id: "part3-6",
    titleEn: "Media and Communication",
    titleVi: "Truyền thông và Giao tiếp",
    description: "Discuss the impact of media and modern communication",
    descriptionEn: "Discuss the impact of media and modern communication",
    descriptionVi: "Thảo luận về tác động của truyền thông và giao tiếp hiện đại",
    level: "advanced",
    topics: ["media", "communication", "social media"],
    duration: 4,
    targetBand: 7.0,
    systemPrompt: "You are an IELTS examiner conducting Part 3 of the speaking test. Engage in a discussion about media influence and communication changes."
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
          title: template.titleEn,
          description: template.descriptionEn || template.description,
          duration: template.duration,
          parts: {
            create: [{
              part: 1,
              prompt: template.systemPrompt
            }]
          }
        }
      });
    }

    // Seed Part 2 Templates
    for (const template of part2Templates) {
      await prisma.speaking_Template.create({
        data: {
          title: template.titleEn,
          description: template.descriptionEn || template.description,
          duration: template.duration,
          parts: {
            create: [{
              part: 2,
              prompt: template.systemPrompt
            }]
          }
        }
      });
    }

    // Seed Part 3 Templates
    for (const template of part3Templates) {
      await prisma.speaking_Template.create({
        data: {
          title: template.titleEn,
          description: template.descriptionEn || template.description,
          duration: template.duration,
          parts: {
            create: [{
              part: 3,
              prompt: template.systemPrompt
            }]
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
