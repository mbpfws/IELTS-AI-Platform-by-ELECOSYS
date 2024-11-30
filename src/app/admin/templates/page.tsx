import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TemplateList({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { data: templates } = await supabase
    .from('AILTS_templates')
    .select(`
      *,
      questions:AILTS_template_questions(count),
      topics:AILTS_template_topics(count),
      vocabulary:AILTS_template_vocabulary(count)
    `)
    .eq('category', searchParams.category || 'part1')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold capitalize">
          {(searchParams.category || 'part1').replace('part', 'Part ')} Templates
        </h1>
        <Link
          href={`/admin/templates/new?category=${searchParams.category || 'part1'}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Template
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {templates?.map((template) => (
            <li key={template.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-indigo-600 truncate">
                      {template.title}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        template.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {template.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div className="sm:flex">
                      <div className="mr-6 flex items-center text-sm text-gray-500">
                        <span className="truncate">
                          {template.questions?.[0]?.count || 0} Questions
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="truncate">
                          {template.topics?.[0]?.count || 0} Topics
                        </span>
                      </div>
                      <div className="mt-2 ml-6 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="truncate">
                          {template.vocabulary?.[0]?.count || 0} Vocabulary Items
                        </span>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <Link
                        href={`/admin/templates/${template.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
