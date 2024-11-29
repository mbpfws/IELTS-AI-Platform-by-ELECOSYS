'use client';

import { useState } from "react";
import { ChatInterface } from "@/components/practice/ChatInterface";
import { Message } from "@/types/speakingSession";

export default function CustomAgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string) => {
    // Add user message to the chat
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // TODO: Add API call to handle the message and get response
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Custom IELTS Agent</h1>
        <p className="text-muted-foreground mt-2">
          Create your own custom IELTS learning experience. Interact with an AI tutor
          that adapts to your specific needs and learning goals.
        </p>
      </div>
      
      <ChatInterface 
        messages={messages}
        onSendMessage={handleSendMessage}
        agentType="custom" 
      />
    </div>
  );
}
