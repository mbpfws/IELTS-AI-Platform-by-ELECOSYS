'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SpeakingTemplate } from '@/types/speakingSession';
import { Badge } from '@/components/ui/badge';

interface TemplateCardProps {
  template: SpeakingTemplate;
  onClick: (template: SpeakingTemplate) => void;
}

export function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(template)}
    >
      <Card className="h-full cursor-pointer bg-card hover:bg-accent/50 transition-colors">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{template.title}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {template.duration} min
            </Badge>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            {template.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {template.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {template.instructions}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
