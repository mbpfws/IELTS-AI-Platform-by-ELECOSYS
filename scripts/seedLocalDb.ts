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
