"use client";

import { cn } from "@/lib/utils";
import type { Session } from "@/types/chat";
import { format } from "date-fns";

interface SessionSidebarProps {
  sessions: Session[];
  currentSession: Session | null;
  onSelectSession: (session: Session) => void;
  onNewSession: () => void;
}

export default function SessionSidebar({
  sessions = [],
  currentSession,
  onSelectSession,
  onNewSession,
}: SessionSidebarProps) {
  return (
    <div className="w-64 h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <button
          onClick={onNewSession}
          className="w-full p-4 rounded-xl bg-white dark:bg-gray-800 
            shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.7),inset_2px_2px_4px_rgba(0,0,0,0.15)]
            dark:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.3)]
            hover:shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.7),inset_1px_1px_2px_rgba(0,0,0,0.15)]
            dark:hover:shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.3)]
            transition-shadow duration-200 text-sm font-medium"
        >
          Phiên hội thoại mới
        </button>
      </div>
      <div className="space-y-2 p-2">
        {Array.isArray(sessions) && sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session)}
            className={cn(
              "w-full p-4 rounded-xl text-left transition-all duration-200",
              "bg-white dark:bg-gray-800",
              "shadow-[-2px_-2px_4px_rgba(255,255,255,0.7),2px_2px_4px_rgba(0,0,0,0.15)]",
              "dark:shadow-[-2px_-2px_4px_rgba(255,255,255,0.1),2px_2px_4px_rgba(0,0,0,0.3)]",
              "hover:shadow-[-1px_-1px_2px_rgba(255,255,255,0.7),1px_1px_2px_rgba(0,0,0,0.15)]",
              "dark:hover:shadow-[-1px_-1px_2px_rgba(255,255,255,0.1),1px_1px_2px_rgba(0,0,0,0.3)]",
              currentSession?.id === session.id && "ring-2 ring-primary"
            )}
          >
            <div className="font-medium truncate">{session.name || 'Phiên hội thoại không tên'}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {format(new Date(session.createdAt), "MMM d, yyyy h:mm a")}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {session.messages?.length || 0} tin nhắn
            </div>
          </button>
        ))}
        {(!sessions || sessions.length === 0) && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 p-4">
            Chưa có phiên hội thoại nào
          </div>
        )}
      </div>
    </div>
  );
}
