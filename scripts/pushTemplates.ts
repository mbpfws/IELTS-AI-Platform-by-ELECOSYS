const { createClient } = require('@supabase/supabase-js');
const { part1Templates } = require('../src/data/speakingTemplates/part1');
const { part2Categories } = require('../src/data/speakingTemplates/part2');
const { part3Templates } = require('../src/data/speakingTemplates/part3');
const { part1Questions, part2Questions, part3Questions, advancedTopics } = require('../src/data/speakingQuestions');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface Part2Question {
  topic: string;
  questions: string[];
  followUp: string[];
}

interface Part3Questions {
  [key: string]: string[];
}

interface AdvancedTopic {
  topics: string[];
}

async function pushTemplates() {
  try {
    console.log('Starting template push...');
    
    // Clear existing templates
    console.log('Clearing existing templates...');
    const { error: deleteError } = await supabase
      .from('ailts_templates')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('Error deleting existing templates:', deleteError);
      return;
    }

    // Insert Part 1 templates
    console.log('Inserting Part 1 templates...');
    for (const template of part1Templates) {
      // Insert template
      const { data: templateData, error: templateError } = await supabase
        .from('ailts_templates')
        .insert({
          id: template.id,
          title: template.title,
          title_vi: template.titleVi,
          title_en: template.titleEn,
          description: template.description,
          description_vi: template.descriptionVi,
          description_en: template.descriptionEn,
          part: template.part,
          difficulty: template.difficulty,
          task_type: template.taskType,
          system_prompt: template.systemPrompt,
          category: template.category,
          level: template.level,
          target_band: template.targetBand,
          duration: template.duration || 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (templateError) {
        console.error(`Error inserting Part 1 template ${template.title}:`, templateError);
        continue;
      }

      // Insert questions
      const questions = part1Questions[template.id as keyof typeof part1Questions] || [];
      for (const question of questions) {
        const { error: questionError } = await supabase
          .from('ailts_template_questions')
          .insert({
            template_id: templateData.id,
            question,
            created_at: new Date().toISOString()
          });

        if (questionError) {
          console.error(`Error inserting question for template ${template.title}:`, questionError);
        }
      }

      // Insert topics
      for (const topic of template.topics) {
        const { error: topicError } = await supabase
          .from('ailts_template_topics')
          .insert({
            template_id: templateData.id,
            topic,
            created_at: new Date().toISOString()
          });

        if (topicError) {
          console.error(`Error inserting topic for template ${template.title}:`, topicError);
        }
      }

      // Insert objectives
      for (const objective of template.objectives) {
        const { error: objectiveError } = await supabase
          .from('ailts_template_objectives')
          .insert({
            template_id: templateData.id,
            objective,
            created_at: new Date().toISOString()
          });

        if (objectiveError) {
          console.error(`Error inserting objective for template ${template.title}:`, objectiveError);
        }
      }

      // Insert criteria
      for (const criterion of template.criteria) {
        const { error: criterionError } = await supabase
          .from('ailts_template_criteria')
          .insert({
            template_id: templateData.id,
            criterion,
            created_at: new Date().toISOString()
          });

        if (criterionError) {
          console.error(`Error inserting criterion for template ${template.title}:`, criterionError);
        }
      }

      console.log(`Successfully inserted Part 1 template: ${template.title}`);
    }

    // Insert Part 2 templates
    console.log('Inserting Part 2 templates...');
    for (const category of part2Categories) {
      for (const template of category.templates) {
        // Insert template
        const { data: templateData, error: templateError } = await supabase
          .from('ailts_templates')
          .insert({
            id: template.id,
            title: template.title,
            title_vi: template.titleVi,
            title_en: template.titleEn,
            description: template.description,
            description_vi: template.descriptionVi,
            description_en: template.descriptionEn,
            part: template.part,
            difficulty: template.difficulty,
            task_type: template.taskType,
            system_prompt: template.systemPrompt,
            category: template.category,
            level: template.level,
            target_band: template.targetBand,
            duration: template.duration || 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (templateError) {
          console.error(`Error inserting Part 2 template ${template.title}:`, templateError);
          continue;
        }

        // Insert questions
        const questions = part2Questions[template.id as keyof typeof part2Questions] || [];
        for (const question of questions) {
          const { error: questionError } = await supabase
            .from('ailts_template_questions')
            .insert({
              template_id: templateData.id,
              question,
              created_at: new Date().toISOString()
            });

          if (questionError) {
            console.error(`Error inserting question for template ${template.title}:`, questionError);
          }
        }

        // Insert topics
        for (const topic of template.topics) {
          const { error: topicError } = await supabase
            .from('ailts_template_topics')
            .insert({
              template_id: templateData.id,
              topic,
              created_at: new Date().toISOString()
            });

          if (topicError) {
            console.error(`Error inserting topic for template ${template.title}:`, topicError);
          }
        }

        // Insert objectives
        for (const objective of template.objectives) {
          const { error: objectiveError } = await supabase
            .from('ailts_template_objectives')
            .insert({
              template_id: templateData.id,
              objective,
              created_at: new Date().toISOString()
            });

          if (objectiveError) {
            console.error(`Error inserting objective for template ${template.title}:`, objectiveError);
          }
        }

        // Insert criteria
        for (const criterion of template.criteria) {
          const { error: criterionError } = await supabase
            .from('ailts_template_criteria')
            .insert({
              template_id: templateData.id,
              criterion,
              created_at: new Date().toISOString()
            });

          if (criterionError) {
            console.error(`Error inserting criterion for template ${template.title}:`, criterionError);
          }
        }

        console.log(`Successfully inserted Part 2 template: ${template.title}`);
      }
    }

    // Insert Part 3 templates
    console.log('Inserting Part 3 templates...');
    for (const template of part3Templates) {
      // Insert template
      const { data: templateData, error: templateError } = await supabase
        .from('ailts_templates')
        .insert({
          id: template.id,
          title: template.title,
          title_vi: template.titleVi,
          title_en: template.titleEn,
          description: template.description,
          description_vi: template.descriptionVi,
          description_en: template.descriptionEn,
          part: template.part,
          difficulty: template.difficulty,
          task_type: template.taskType,
          system_prompt: template.systemPrompt,
          category: template.category,
          level: template.level,
          target_band: template.targetBand,
          duration: template.duration || 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (templateError) {
        console.error(`Error inserting Part 3 template ${template.title}:`, templateError);
        continue;
      }

      // Insert questions
      const questions = part3Questions[template.id as keyof typeof part3Questions] || [];
      for (const question of questions) {
        const { error: questionError } = await supabase
          .from('ailts_template_questions')
          .insert({
            template_id: templateData.id,
            question,
            created_at: new Date().toISOString()
          });

        if (questionError) {
          console.error(`Error inserting question for template ${template.title}:`, questionError);
        }
      }

      // Insert topics
      for (const topic of template.topics) {
        const { error: topicError } = await supabase
          .from('ailts_template_topics')
          .insert({
            template_id: templateData.id,
            topic,
            created_at: new Date().toISOString()
          });

        if (topicError) {
          console.error(`Error inserting topic for template ${template.title}:`, topicError);
        }
      }

      // Insert objectives
      for (const objective of template.objectives) {
        const { error: objectiveError } = await supabase
          .from('ailts_template_objectives')
          .insert({
            template_id: templateData.id,
            objective,
            created_at: new Date().toISOString()
          });

        if (objectiveError) {
          console.error(`Error inserting objective for template ${template.title}:`, objectiveError);
        }
      }

      // Insert criteria
      for (const criterion of template.criteria) {
        const { error: criterionError } = await supabase
          .from('ailts_template_criteria')
          .insert({
            template_id: templateData.id,
            criterion,
            created_at: new Date().toISOString()
          });

        if (criterionError) {
          console.error(`Error inserting criterion for template ${template.title}:`, criterionError);
        }
      }

      console.log(`Successfully inserted Part 3 template: ${template.title}`);
    }

    console.log('Template push completed successfully!');
  } catch (error) {
    console.error('Error in pushTemplates:', error);
    throw error;
  }
}

pushTemplates();
