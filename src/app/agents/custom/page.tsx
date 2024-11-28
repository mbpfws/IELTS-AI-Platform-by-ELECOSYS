import { ChatInterface } from "@/components/ChatInterface";

export default function CustomAgentPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Custom IELTS Agent</h1>
        <p className="text-muted-foreground mt-2">
          Create your own custom IELTS learning experience. Interact with an AI tutor
          that adapts to your specific needs and learning goals.
        </p>
      </div>
      
      <ChatInterface agentType="custom" />
    </div>
  );
}
