'use client';

import { useState } from 'react';
import type { CustomTemplateForm } from '@/types/customTemplate';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CustomTemplateFormProps {
  onSubmit: (template: CustomTemplateForm) => void;
}

export function CustomTemplateForm({ onSubmit }: CustomTemplateFormProps) {
  const [formData, setFormData] = useState<CustomTemplateForm>({
    title: '',
    titleVi: '',
    difficulty: 'medium',
    systemInstruction: `You are an IELTS Speaking tutor using LearnLM 1.5 Pro to help students improve their speaking skills.

1. Gợi mở (Spark Curiosity):
[Add your instructions here]

2. Giải quyết vấn đề (Problem Solving):
[Add your instructions here]

3. Tìm hiểu sâu (Deepen Knowledge):
[Add your instructions here]

4. Luyện tập (Targeted Practice):
[Add your instructions here]

5. Gợi nhớ (Retrieval Practice):
[Add your instructions here]

Model: learnlm-1.5-pro-experimental
Max tokens: 4000`,
    description: '',
    descriptionVi: '',
    duration: 15,
    learningObjectives: [''],
    initialQuestion: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleLearningObjectiveChange = (value: string, index: number) => {
    const newObjectives = [...formData.learningObjectives];
    newObjectives[index] = value;
    setFormData({ ...formData, learningObjectives: newObjectives });
  };

  const addLearningObjective = () => {
    setFormData({
      ...formData,
      learningObjectives: [...formData.learningObjectives, ''],
    });
  };

  const removeLearningObjective = (index: number) => {
    const newObjectives = formData.learningObjectives.filter((_, i) => i !== index);
    setFormData({ ...formData, learningObjectives: newObjectives });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Custom Tutoring Template</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (English)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleVi">Title (Vietnamese)</Label>
              <Input
                id="titleVi"
                value={formData.titleVi}
                onChange={(e) => setFormData({ ...formData, titleVi: e.target.value })}
              />
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value: 'easy' | 'medium' | 'hard') =>
                setFormData({ ...formData, difficulty: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* System Instructions */}
          <div className="space-y-2">
            <Label htmlFor="systemInstruction">System Instructions</Label>
            <Textarea
              id="systemInstruction"
              value={formData.systemInstruction}
              onChange={(e) => setFormData({ ...formData, systemInstruction: e.target.value })}
              className="h-[300px]"
              required
            />
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (English)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionVi">Description (Vietnamese)</Label>
              <Input
                id="descriptionVi"
                value={formData.descriptionVi}
                onChange={(e) => setFormData({ ...formData, descriptionVi: e.target.value })}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              required
            />
          </div>

          {/* Learning Objectives */}
          <div className="space-y-2">
            <Label>Learning Objectives</Label>
            {formData.learningObjectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={objective}
                  onChange={(e) => handleLearningObjectiveChange(e.target.value, index)}
                  placeholder={`Objective ${index + 1}`}
                  required
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeLearningObjective(index)}
                  disabled={formData.learningObjectives.length <= 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addLearningObjective}>
              Add Objective
            </Button>
          </div>

          {/* Initial Question */}
          <div className="space-y-2">
            <Label htmlFor="initialQuestion">Initial Question</Label>
            <Input
              id="initialQuestion"
              value={formData.initialQuestion}
              onChange={(e) => setFormData({ ...formData, initialQuestion: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Create Template
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
