import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { data: templates } = await supabase
    .from('AILTS_templates')
    .select('*')
    .order('created_at', { ascending: false });

  const categories = ['part1', 'part2', 'part3', 'advanced', 'tutoring'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Template Management</h1>
        <Link
          href="/admin/templates/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Template
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900 capitalize">
                {category.replace('part', 'Part ')}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {templates?.filter((t) => t.category === category).length || 0} templates
              </p>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <Link
                href={`/admin/templates?category=${category}`}
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                View all →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Templates</h3>
          <div className="mt-4 divide-y divide-gray-200">
            {templates?.slice(0, 5).map((template) => (
              <div key={template.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{template.title}</h4>
                    <p className="text-sm text-gray-500 capitalize">{template.category.replace('part', 'Part ')}</p>
                  </div>
                  <Link
                    href={`/admin/templates/${template.id}`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
