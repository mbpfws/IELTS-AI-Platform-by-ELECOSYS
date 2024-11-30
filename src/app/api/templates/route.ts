import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const templates = await prisma.speaking_Template.findMany({
      include: {
        parts: true
      }
    });

    // Transform the templates to match the expected format
    const formattedTemplates = templates.map(template => ({
      id: template.id,
      type: `part${template.parts[0]?.part || 1}`,
      title_en: template.title,
      title_vi: template.title_vi || template.title,
      description_en: template.description,
      description_vi: template.description_vi || template.description,
      level: template.level,
      topics: JSON.parse(template.topics_json || '[]'),
      duration: template.duration,
      target_band: template.target_band,
      system_prompt: template.parts[0]?.prompt || '',
      created_at: template.createdAt.toISOString(),
      updated_at: template.updatedAt.toISOString()
    }));

    return NextResponse.json(formattedTemplates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
