import { Template } from '@/types/template';

export const part1Templates: Template[] = [
  // Family
  {
    id: 'family_1',
    title: 'Family Structure',
    titleVi: 'Cấu trúc gia đình',
    titleEn: 'Family Structure',
    description: 'Discuss your family members and relationships',
    descriptionVi: 'Thảo luận về các thành viên và mối quan hệ trong gia đình',
    descriptionEn: 'Discuss your family members and relationships',
    questions: [
      'Do you have a large or small family?',
      'Who do you spend the most time with in your family?',
      'What activities do you usually do together as a family?'
    ]
  },
  // Work/Study
  {
    id: 'work_study_1',
    title: 'Work or Studies',
    titleVi: 'Công việc hoặc học tập',
    titleEn: 'Work or Studies',
    description: 'Talk about your current work or studies',
    descriptionVi: 'Nói về công việc hoặc việc học tập hiện tại của bạn',
    descriptionEn: 'Talk about your current work or studies',
    questions: [
      'What do you do for work/study?',
      'Why did you choose this field?',
      'What do you enjoy most about your work/studies?'
    ]
  },
  // ... (38 more topics following similar pattern for total of 40)
];
