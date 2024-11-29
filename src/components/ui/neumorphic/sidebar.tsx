"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { ScrollArea } from '../scroll-area';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SessionMetrics {
  fluency: number;
  vocabulary: number;
  grammar: number;
  pronunciation: number;
}

interface SessionNote {
  id: string;
  content: string;
  timestamp: number;
}

interface SessionHistory {
  id: string;
  date: string;
  duration: number;
  metrics: SessionMetrics;
}

interface NeumorphicSidebarProps {
  open?: boolean;
  onToggle?: () => void;
  metrics?: SessionMetrics;
  sessionHistory?: SessionHistory[];
  notes?: SessionNote[];
  onNoteAdd?: (note: string) => void;
  onNoteDelete?: (id: string) => void;
  className?: string;
}

function NeumorphicSidebar({
  open = false,
  onToggle,
  metrics,
  sessionHistory = [],
  notes = [],
  onNoteAdd,
  onNoteDelete,
  className
}: NeumorphicSidebarProps) {
  const [newNote, setNewNote] = React.useState('');

  const handleAddNote = () => {
    if (newNote.trim() && onNoteAdd) {
      onNoteAdd(newNote);
      setNewNote('');
    }
  };

  const sidebarProps = {
    className: cn(
      'fixed right-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out',
      open ? 'w-80' : 'w-12',
      className
    ),
    role: "complementary",
    "aria-label": "Session management",
    "data-state": open ? "open" : "closed"
  };

  return (
    <aside {...sidebarProps}>
      <Button
        onClick={onToggle}
        className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0 flex items-center justify-center"
        variant="ghost"
        size="icon"
        type="button"
        aria-label={open ? "Close sidebar" : "Open sidebar"}
      >
        {open ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {open && (
        <ScrollArea className="h-full p-4">
          {/* Current Session Metrics */}
          {metrics && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Current Session Metrics</h3>
              <div className="space-y-2">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key}</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${(value / 9) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{value}/9</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Session Notes</h3>
            <div className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full p-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <Button 
                onClick={handleAddNote} 
                className="w-full"
                disabled={!newNote.trim()}
                type="button"
              >
                Add Note
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              {notes.map((note) => (
                <div key={note.id} className="p-2 bg-gray-50 rounded-md">
                  <p className="text-sm">{note.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(note.timestamp).toLocaleString()}
                    </span>
                    {onNoteDelete && (
                      <Button
                        onClick={() => onNoteDelete(note.id)}
                        variant="destructive"
                        size="sm"
                        type="button"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session History */}
          {sessionHistory.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Session History</h3>
              <div className="space-y-4">
                {sessionHistory.map((session) => (
                  <div key={session.id} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{session.date}</span>
                      <span className="text-sm text-gray-500">
                        {Math.round(session.duration / 60)} min
                      </span>
                    </div>
                    <div className="space-y-1">
                      {Object.entries(session.metrics).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-xs capitalize">{key}</span>
                          <span className="text-xs">{value}/9</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      )}
    </aside>
  );
}

export { NeumorphicSidebar };
