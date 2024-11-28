"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromptCrafterProps {
  onPromptGenerated: (prompt: string) => void;
}

export function PromptCrafter({ onPromptGenerated }: PromptCrafterProps) {
  const [config, setConfig] = useState({
    role: "tutor",
    task: "writing",
    style: "supportive",
    focusAreas: [] as string[],
    customInstructions: "",
  });

  const roleTemplates = {
    tutor: "Bạn là một giáo viên IELTS có kinh nghiệm, chuyên sâu về {{task}}.",
    examiner: "Bạn là giám khảo IELTS chính thức, đánh giá {{task}} theo tiêu chuẩn của IELTS.",
    partner: "Bạn là bạn học cùng luyện thi IELTS, tập trung vào {{task}}.",
  };

  const taskSpecifics = {
    writing: {
      areas: ["Task Response", "Coherence & Cohesion", "Lexical Resource", "Grammar"],
      instructions: "Phân tích bài viết, đưa ra nhận xét chi tiết và gợi ý cải thiện."
    },
    speaking: {
      areas: ["Fluency", "Pronunciation", "Grammar", "Vocabulary"],
      instructions: "Luyện tập phỏng vấn, sửa phát âm và đưa ra gợi ý cải thiện."
    }
  };

  const generatePrompt = () => {
    let prompt = roleTemplates[config.role as keyof typeof roleTemplates]
      .replace("{{task}}", config.task);

    prompt += "\n\nPhong cách tương tác: " + config.style;
    
    if (config.focusAreas.length > 0) {
      prompt += "\n\nTập trung vào các lĩnh vực: " + config.focusAreas.join(", ");
    }

    if (config.customInstructions) {
      prompt += "\n\nHướng dẫn bổ sung:\n" + config.customInstructions;
    }

    onPromptGenerated(prompt);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <Label>Vai trò</Label>
          <Select
            value={config.role}
            onValueChange={(value) => setConfig({ ...config, role: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tutor">Giáo viên IELTS</SelectItem>
              <SelectItem value="examiner">Giám khảo IELTS</SelectItem>
              <SelectItem value="partner">Bạn học</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Nhiệm vụ chính</Label>
          <Select
            value={config.task}
            onValueChange={(value) => setConfig({ ...config, task: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="writing">IELTS Writing</SelectItem>
              <SelectItem value="speaking">IELTS Speaking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Phong cách tương tác</Label>
          <Select
            value={config.style}
            onValueChange={(value) => setConfig({ ...config, style: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supportive">Hỗ trợ & Khuyến khích</SelectItem>
              <SelectItem value="direct">Trực tiếp & Chính xác</SelectItem>
              <SelectItem value="analytical">Phân tích & Chi tiết</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Hướng dẫn bổ sung</Label>
          <Textarea
            value={config.customInstructions}
            onChange={(e) => setConfig({ ...config, customInstructions: e.target.value })}
            placeholder="Thêm các yêu cầu hoặc hướng dẫn cụ thể..."
            className="h-24"
          />
        </div>
      </div>

      <Button onClick={generatePrompt} className="w-full">
        Tạo System Prompt
      </Button>
    </div>
  );
}
