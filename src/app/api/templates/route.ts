import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const templates = await prisma.speaking_Template.findMany({
      include: {
        parts: {
          orderBy: {
            part: 'asc'
          }
        }
      }
    });

    if (!templates || templates.length === 0) {
      console.log('No templates found in database');
      return NextResponse.json([]);
    }

    console.log(`Found ${templates.length} templates`);

    // Transform the templates to match the expected format
    const formattedTemplates = templates.map(template => {
      // Ensure we have at least one part
      if (!template.parts || template.parts.length === 0) {
        console.warn(`Template ${template.id} has no parts`);
      }

      const firstPart = template.parts[0];
      return {
        id: template.id,
        type: `part${firstPart?.part || 1}`,
        title: template.title,
        title_en: template.title,
        title_vi: template.title_vi || template.title,
        description: template.description,
        description_en: template.description,
        description_vi: template.description_vi || template.description,
        level: template.level,
        topics: JSON.parse(template.topics_json || '[]'),
        duration: template.duration,
        target_band: template.target_band,
        parts: template.parts,
        created_at: template.createdAt.toISOString(),
        updated_at: template.updatedAt.toISOString()
      };
    });

    console.log('Templates formatted successfully');
    return NextResponse.json(formattedTemplates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch templates' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
