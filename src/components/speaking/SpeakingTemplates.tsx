import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Card, CardContent, CardHeader,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Button, Badge,
  ScrollArea,
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/';
import { useTheme } from 'next-themes';
import { part1Templates, part2Templates, part3Templates, basicTutoringTemplates } from '@/data/speakingTemplates';
import { cn } from '@/lib/utils';

const tabs = [
  { 
    id: 'part1', 
    label: 'Part 1', 
    templates: part1Templates,
    description: 'Practice common topics for IELTS Speaking Part 1'
  },
  { 
    id: 'part2', 
    label: 'Part 2', 
    templates: part2Templates,
    description: 'Practice cue cards for IELTS Speaking Part 2'
  },
  { 
    id: 'part3', 
    label: 'Part 3', 
    templates: part3Templates,
    description: 'Practice in-depth discussion for IELTS Speaking Part 3'
  },
  { 
    id: 'tutoring', 
    label: 'Tutoring', 
    templates: basicTutoringTemplates,
    description: 'Get personalized tutoring sessions'
  }
];

export const SpeakingTemplates = () => {
  const [selectedTab, setSelectedTab] = useState('part1');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleStartSession = async (template) => {
    try {
      navigate('/speaking/practice', { 
        state: { 
          template,
          mode: 'practice'
        } 
      });
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="part1" className="w-full">
        <TabsList className="grid w-full grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                'flex flex-col items-center p-4 rounded-lg transition-all',
                'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
                'hover:bg-muted'
              )}
            >
              <span className="text-lg font-semibold">{tab.label}</span>
              <span className="text-sm text-muted-foreground">{tab.description}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tab.templates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={cn(
                      'group hover:shadow-lg transition-all duration-300',
                      'dark:hover:shadow-primary/20',
                      'border-2 hover:border-primary',
                      'cursor-pointer'
                    )}>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{template.titleEn}</h3>
                            <p className="text-sm text-muted-foreground">{template.titleVi}</p>
                          </div>
                          <Badge variant="outline">{template.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{template.descriptionEn}</p>
                        <p className="text-sm italic text-muted-foreground">{template.descriptionVi}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {template.topics.map((topic) => (
                            <Badge key={topic} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => handleStartSession(template)}
                        >
                          Start Practice
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
