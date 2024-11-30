import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function updateTemplate(formData: FormData) {
  'use server';
  
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const difficulty = parseInt(formData.get('difficulty') as string);
  const duration = parseInt(formData.get('duration') as string);
  const is_active = formData.get('is_active') === 'true';
  
  const { error } = await supabase
    .from('AILTS_templates')
    .update({
      title,
      description,
      difficulty,
      duration,
      is_active,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);
    
  if (error) throw error;
  
  revalidatePath('/admin/templates');
  redirect('/admin/templates');
}

async function deleteTemplate(formData: FormData) {
  'use server';
  
  const id = formData.get('id') as string;
  
  const { error } = await supabase
    .from('AILTS_templates')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  
  revalidatePath('/admin/templates');
  redirect('/admin/templates');
}

export default async function EditTemplate({
  params
}: {
  params: { id: string }
}) {
  const { data: template } = await supabase
    .from('AILTS_templates')
    .select(`
      *,
      questions:AILTS_template_questions(*),
      topics:AILTS_template_topics(*),
      vocabulary:AILTS_template_vocabulary(*)
    `)
    .eq('id', params.id)
    .single();

  if (!template) {
    redirect('/admin/templates');
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Template</h1>
        <form action={deleteTemplate}>
          <input type="hidden" name="id" value={template.id} />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={(e) => {
              if (!confirm('Are you sure you want to delete this template?')) {
                e.preventDefault();
              }
            }}
          >
            Delete Template
          </button>
        </form>
      </div>

      <form action={updateTemplate} className="space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <input type="hidden" name="id" value={template.id} />
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={template.title}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
              Difficulty (1-5)
            </label>
            <input
              type="number"
              name="difficulty"
              id="difficulty"
              min="1"
              max="5"
              defaultValue={template.difficulty}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={template.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              id="duration"
              defaultValue={template.duration / 60}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="is_active" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="is_active"
              name="is_active"
              defaultValue={template.is_active.toString()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Questions Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Questions</h3>
          <div className="mt-4 divide-y divide-gray-200">
            {template.questions?.map((question: any) => (
              <div key={question.id} className="py-4">
                <p className="text-sm text-gray-900">{question.question}</p>
                {question.suggested_answer && (
                  <p className="mt-1 text-sm text-gray-500">{question.suggested_answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Topics</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {template.topics?.map((topic: any) => (
              <span
                key={topic.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {topic.topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vocabulary Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Vocabulary</h3>
          <div className="mt-4 divide-y divide-gray-200">
            {template.vocabulary?.map((vocab: any) => (
              <div key={vocab.id} className="py-4">
                <p className="text-sm font-medium text-gray-900">{vocab.word}</p>
                <p className="mt-1 text-sm text-gray-500">{vocab.definition}</p>
                {vocab.example && (
                  <p className="mt-1 text-sm text-gray-500 italic">{vocab.example}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
