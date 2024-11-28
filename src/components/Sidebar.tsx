"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen bg-white border-r flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <Link href="/" className={cn("flex items-center gap-2", isCollapsed && "hidden")}>
          <span className="font-semibold text-sm">IELTS AI Platform</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className={cn("space-y-2", isCollapsed && "hidden")}>
          <h3 className="text-xs uppercase text-slate-500 font-medium mb-4">Recent Chats</h3>
          {/* Example chat sessions - will be populated from database */}
          <ChatItem
            title="Writing Task 2 Practice"
            date="Today"
            isActive={false}
          />
          <ChatItem
            title="Speaking Part 2"
            date="Yesterday"
            isActive={false}
          />
        </div>
        {isCollapsed && (
          <div className="flex flex-col items-center space-y-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatItem({ title, date, isActive }: { title: string; date: string; isActive: boolean }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-left font-normal",
        isActive && "bg-slate-100"
      )}
    >
      <div className="flex flex-col">
        <span className="text-sm">{title}</span>
        <span className="text-xs text-slate-500">{date}</span>
      </div>
    </Button>
  );
}
