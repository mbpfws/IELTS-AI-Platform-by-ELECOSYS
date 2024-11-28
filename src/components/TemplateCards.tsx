"use client";

import { cn } from "@/lib/utils";
import { Template } from "@/types/template";
import { writingTemplates } from "@/data/writingTemplates";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from 'react';

interface TemplateCardsProps {
  onSelectTemplate: (template: Template) => void;
  selectedTemplate?: Template;
}

export function TemplateCards({ onSelectTemplate, selectedTemplate }: TemplateCardsProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const templatesPerPage = 6; // Show 6 templates per page (2 rows of 3)

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTemplateClick = (template: Template) => {
    onSelectTemplate(template);
  };

  // Calculate pagination
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = writingTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate);
  const totalPages = Math.ceil(writingTemplates.length / templatesPerPage);

  if (!mounted) {
    return null; // Prevent hydration issues by not rendering until mounted
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={`flex flex-col cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleTemplateClick(template)}
          >
            <CardHeader>
              <CardTitle>{template.titleVi}</CardTitle>
              <CardDescription>{template.descriptionVi}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-700">
                    CEFR {template.level}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-100 text-green-700">
                    Band {template.targetBand}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  <strong>Mục tiêu:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {template.objectives.slice(0, 2).map((objective, index) => (
                      <li key={index} className="text-slate-600">{objective}</li>
                    ))}
                    {template.objectives.length > 2 && (
                      <li className="text-slate-400">+{template.objectives.length - 2} more...</li>
                    )}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {template.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-600"
                    >
                      {topic.replace('_', ' ')}
                    </span>
                  ))}
                  {template.topics.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-400">
                      +{template.topics.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ←
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
}
