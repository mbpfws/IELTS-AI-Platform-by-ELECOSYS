import { Template } from '@/types/template';

export const part2Categories = {
  people: {
    title: 'People',
    titleVi: 'Con người',
    templates: [
      {
        id: 'people_1',
        title: 'A Person You Admire',
        titleVi: 'Người bạn ngưỡng mộ',
        titleEn: 'A Person You Admire',
        description: 'Describe someone you admire',
        descriptionVi: 'Mô tả về một người mà bạn ngưỡng mộ',
        descriptionEn: 'Describe someone you admire',
        cueCard: `
Describe a person you admire.
You should say:
- who this person is
- how you know them
- what qualities they have
- and explain why you admire them
        `
      },
      // ... (9 more people templates)
    ]
  },
  places: {
    title: 'Places',
    titleVi: 'Địa điểm',
    templates: [
      {
        id: 'places_1',
        title: 'A Memorable Place',
        titleVi: 'Một địa điểm đáng nhớ',
        titleEn: 'A Memorable Place',
        description: 'Describe a place that is memorable to you',
        descriptionVi: 'Mô tả về một địa điểm đáng nhớ đối với bạn',
        descriptionEn: 'Describe a place that is memorable to you',
        cueCard: `
Describe a place that is memorable to you.
You should say:
- where it is
- when you went there
- what you did there
- and explain why it is memorable to you
        `
      },
      // ... (9 more places templates)
    ]
  },
  events: {
    title: 'Events',
    titleVi: 'Sự kiện',
    templates: [
      {
        id: 'events_1',
        title: 'A Special Celebration',
        titleVi: 'Một lễ kỷ niệm đặc biệt',
        titleEn: 'A Special Celebration',
        description: 'Describe a special celebration you attended',
        descriptionVi: 'Mô tả về một lễ kỷ niệm đặc biệt mà bạn đã tham dự',
        descriptionEn: 'Describe a special celebration you attended',
        cueCard: `
Describe a special celebration you attended.
You should say:
- what the celebration was for
- where it took place
- who was there
- and explain why it was special to you
        `
      },
      // ... (9 more events templates)
    ]
  },
  objects: {
    title: 'Objects',
    titleVi: 'Đồ vật',
    templates: [
      {
        id: 'objects_1',
        title: 'A Special Possession',
        titleVi: 'Một vật sở hữu đặc biệt',
        titleEn: 'A Special Possession',
        description: 'Describe something special that you own',
        descriptionVi: 'Mô tả về một vật đặc biệt mà bạn sở hữu',
        descriptionEn: 'Describe something special that you own',
        cueCard: `
Describe something special that you own.
You should say:
- what it is
- how you got it
- how long you have had it
- and explain why it is special to you
        `
      },
      // ... (9 more objects templates)
    ]
  },
  experiences: {
    title: 'Experiences',
    titleVi: 'Trải nghiệm',
    templates: [
      {
        id: 'experiences_1',
        title: 'A Memorable Experience',
        titleVi: 'Một trải nghiệm đáng nhớ',
        titleEn: 'A Memorable Experience',
        description: 'Describe a memorable experience you had',
        descriptionVi: 'Mô tả về một trải nghiệm đáng nhớ của bạn',
        descriptionEn: 'Describe a memorable experience you had',
        cueCard: `
Describe a memorable experience you had.
You should say:
- what happened
- when it happened
- who was involved
- and explain why it was memorable
        `
      },
      // ... (9 more experiences templates)
    ]
  }
};
