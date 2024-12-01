import { NextResponse } from 'next/server';
import { part1Templates } from '@/data/speakingTemplates/part1';
import { part2Templates } from '@/data/speakingTemplates/part2';
import { part3Templates } from '@/data/speakingTemplates/part3';
import { tutoringLessons } from '@/data/speakingTemplates/tutoring';

export async function GET() {
  try {
    // Convert templates to the expected format
    const templates = [
      ...part1Templates.map(template => ({
        ...template,
        type: 'part1',
        title_en: template.titleEn,
        title_vi: template.titleVi,
        description_en: template.descriptionEn,
        description_vi: template.descriptionVi,
        target_band: template.targetBand
      })),
      ...part2Templates.map(template => ({
        ...template,
        type: 'part2',
        title_en: template.titleEn,
        title_vi: template.titleVi,
        description_en: template.descriptionEn,
        description_vi: template.descriptionVi,
        target_band: template.targetBand
      })),
      ...part3Templates.map(template => ({
        ...template,
        type: 'part3',
        title_en: template.titleEn,
        title_vi: template.titleVi,
        description_en: template.descriptionEn,
        description_vi: template.descriptionVi,
        target_band: template.targetBand
      })),
      ...tutoringLessons.map(template => ({
        ...template,
        type: 'tutoring',
        title_en: template.titleEn,
        title_vi: template.titleVi,
        description_en: template.descriptionEn,
        description_vi: template.descriptionVi,
        target_band: template.targetBand,
        objectives: template.objectives || [],
        criteria: template.criteria || []
      }))
    ];

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}
