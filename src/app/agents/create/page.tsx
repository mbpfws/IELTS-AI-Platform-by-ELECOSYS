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
import { Slider } from "@/components/ui/slider";

export default function CreateAgentPage() {
  const [agentConfig, setAgentConfig] = useState({
    name: "",
    type: "writing",
    model: "gemini-1.5-pro",
    systemPrompt: "",
    temperature: 0.7,
    maxOutputTokens: 1024,
    topP: 0.9,
    responseFormat: "structured"
  });

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Tạo AI Agent Mới</h1>
          <p className="text-slate-600">
            Tùy chỉnh AI agent theo mục tiêu học tập IELTS của bạn
          </p>
        </div>

        <div className="grid gap-6 p-6 border rounded-lg bg-white/50">
          <div className="grid gap-2">
            <Label htmlFor="name">Tên Agent</Label>
            <Input
              id="name"
              placeholder="VD: IELTS Writing Task 2 Expert"
              value={agentConfig.name}
              onChange={(e) => setAgentConfig({ ...agentConfig, name: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label>Loại Agent</Label>
            <Select
              value={agentConfig.type}
              onValueChange={(value) => setAgentConfig({ ...agentConfig, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="writing">Writing Agent</SelectItem>
                <SelectItem value="speaking">Speaking Agent</SelectItem>
                <SelectItem value="custom">Custom Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Model</Label>
            <Select
              value={agentConfig.model}
              onValueChange={(value) => setAgentConfig({ ...agentConfig, model: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                <SelectItem value="gemini-1.5-flash-8b">Gemini 1.5 Flash 8B</SelectItem>
                <SelectItem value="learnlm-1.5-pro-experimental">LearnLM 1.5 Pro (Experimental)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>System Prompt</Label>
            <Textarea
              placeholder="Nhập system prompt cho agent..."
              value={agentConfig.systemPrompt}
              onChange={(e) => setAgentConfig({ ...agentConfig, systemPrompt: e.target.value })}
              className="h-32"
            />
          </div>

          <div className="grid gap-4">
            <div>
              <Label>Temperature ({agentConfig.temperature})</Label>
              <Slider
                value={[agentConfig.temperature]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={([value]) => setAgentConfig({ ...agentConfig, temperature: value })}
              />
            </div>

            <div>
              <Label>Top P ({agentConfig.topP})</Label>
              <Slider
                value={[agentConfig.topP]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={([value]) => setAgentConfig({ ...agentConfig, topP: value })}
              />
            </div>

            <div>
              <Label>Max Output Tokens</Label>
              <Input
                type="number"
                value={agentConfig.maxOutputTokens}
                onChange={(e) => setAgentConfig({ ...agentConfig, maxOutputTokens: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Response Format</Label>
            <Select
              value={agentConfig.responseFormat}
              onValueChange={(value) => setAgentConfig({ ...agentConfig, responseFormat: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="structured">Structured Output</SelectItem>
                <SelectItem value="plain">Plain Text</SelectItem>
                <SelectItem value="code">Code Execution</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">
            Tạo Agent
          </Button>
        </div>
      </div>
    </div>
  );
}
