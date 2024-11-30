"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpeakingService } from '@/services/speakingService';
import { audioService } from '@/services/audioService';
import { GeminiService } from '@/services/gemini';
import { SpeakingHistory, SpeakingSession } from '@/types/speakingSession';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronRight } from 'lucide-react';

interface SessionSidebarProps {
  userId: string;
  onSessionSelect: (sessionId: string) => void;
  currentSessionId?: string;
}

export function SessionSidebar({ 
  userId, 
  onSessionSelect,
  currentSessionId 
}: SessionSidebarProps) {
  const [history, setHistory] = useState<SpeakingHistory>({
    userId: '',
    sessions: {},
    stats: {
      totalSessions: 0,
      averageBand: 0,
      timeSpent: 0,
      lastSessionDate: 0
    }
  });
  const [recentSessions, setRecentSessions] = useState<SpeakingSession[]>([]);
  const geminiService = GeminiService.getInstance();
  const speakingService = new SpeakingService(audioService, geminiService);

  useEffect(() => {
    // TODO: Implement actual history retrieval
    const userHistory = {
      userId: userId,
      sessions: {},
      stats: {
        totalSessions: 0,
        averageBand: 0,
        timeSpent: 0,
        lastSessionDate: 0
      }
    };
    setHistory(userHistory);

    // TODO: Implement actual recent sessions retrieval
    const recent: SpeakingSession[] = [];
    setRecentSessions(recent);
  }, [userId, currentSessionId]);

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Thống kê tổng quát</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tổng số phiên:</span>
              <span className="font-medium">{history.stats.totalSessions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Band trung bình:</span>
              <span className="font-medium">
                {history.stats.averageBand.toFixed(1) || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Thời gian luyện tập:</span>
              <span className="font-medium">{history.stats.timeSpent || 0} phút</span>
            </div>
            {history.stats.lastSessionDate && (
              <div className="flex justify-between">
                <span>Phiên gần nhất:</span>
                <span className="font-medium">
                  {formatDistanceToNow(history.stats.lastSessionDate, {
                    addSuffix: true,
                    locale: vi
                  })}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Phiên gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentSessions.map((session) => (
              <Button
                key={session.id}
                variant={session.id === currentSessionId ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => onSessionSelect(session.id)}
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {formatDistanceToNow(session.startTime, {
                      addSuffix: true,
                      locale: vi
                    })}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Band: {session.metrics?.overallBand || 'N/A'}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
