"use client";

import { cn } from "@/lib/utils";
import { Template, WritingTemplate } from "@/types/template";
import { writingTemplates } from "@/data/writingTemplates";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from 'react';

interface TemplateCardsProps {
  onSelectTemplate: (template: WritingTemplate) => void;
  selectedTemplate?: WritingTemplate;
}

export function TemplateCards({ onSelectTemplate, selectedTemplate }: TemplateCardsProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const templatesPerPage = 6; // Show 6 templates per page (2 rows of 3)

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTemplateClick = (template: WritingTemplate) => {
    onSelectTemplate(template);
  };

  // Calculate pagination
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = writingTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate) as WritingTemplate[];
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
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>
                Level: {template.level} | Target Band: {template.targetBand}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{template.objectives?.[0] || 'No specific objectives'}</p>
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
