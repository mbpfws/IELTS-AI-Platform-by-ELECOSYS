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
    systemPrompt: "You are an IELTS examiner conducting Part 1 of the speaking test."
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
    systemPrompt: "You are an IELTS examiner conducting Part 2 of the speaking test."
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
    systemPrompt: "You are an IELTS examiner conducting Part 3 of the speaking test."
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
