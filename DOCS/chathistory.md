#Working with page /app/agents/speaking/page.tsx
-Page functionality Expectation:
 -- The page should have a 4-tab UI that allows users to navigate through different parts of the speaking practice, including part 1, part 2, part 3, and tutoring lessons.
 -- Each tab should link to @/data/speakingTemplates/part1, @/data/speakingTemplates/part2, @/data/speakingTemplates/part3, and @/data/speakingTemplates/tutoring, respectively.
 -- There is a sidebar on the left that works as search ba, a sort order and a filter to select templates by level, topic, band score, collection and other criteria.
 -- These speaking templates are synchronized with the API and database tables that the page uses and fetches data from. Each template object  should be displayed in a card format with a title, description, and a "Start Session" button.
 -- When a user clicks the "Start Session" button, they are prompted to enter their name and select a duration for the practice session (up to 2 hours, making 5 minutes increments).
 -- Once the user enters their name and selects a duration, the page should send a request to the API to start a practice session with the selected template and duration.
 -- Users are then entered into the practice session, where they can chat with the AI agent (with pre modified system prompt controlled by the file @services/ieltsGeminiService and the appended system prompt from the selected template).
--- The next-step page will feature a dynamic chat platform that facilitates interaction between AI and students, allowing responses from the AI to be rendered in rich text, including code snippets. Below the chat box will be a recorder with functionalities including send, pause, replay, and download options, where the stop button sends the recorded audio to continue the chat while allowing for a seamless switch to text input. Additionally, a note manager will be available for students to jot down important points during the session. (most of these AI-powered features are controlled by the file @services/ieltsGeminiService and the appended system prompt from the selected template - the component will be called @components/practice/ChatInterface.tsx that needs to be implemented and modify so that it will be able to handle both text and audio inputs seamlessly).
--- The session will be initiated by sending a request to the API to start a practice session on the user behalf marking which name is being used, summary of what points are being covered, duration and emphasize on the interactive and dynamic approach which requires in-time sufficient feedback, providing support, and guidance, alotting for a more engaging and interactive learning experience and allowing for a deeper understanding of the material. The session will be terminated when the user leaves the page or when the session is completed. This is done by sending a request to the API to end the practice session and prompt AI generation of summary of the session and send measurable feedback to the user.
--- The page will also include a sidebar with a list of completed sessions, where students can review their performance, access their notes, and download their transcript.

---The interface will include two collapsible sidebars: one for creating new sessions and the other displaying interactive metrics to measure student performance, including progress tracking and a countdown timer for practice sessions. To enhance engagement, we will introduce a feedback mechanism where the AI can provide real-time suggestions based on student responses. A gamification element will also be added, rewarding students with points or badges for completing tasks or achieving certain milestones during the practice sessions. 
---Finally, integration with external resources like videos, articles, or quizzes will be included to provide students with comprehensive learning materials related to their practice topics.
---Documents on instruction for Gemini AI and its use cases will be available 

---Session history, session notes, transcript and performance metrics will be available for students to review and download and these are stored in the database.

FIX the following issues: the ui of chat-like should be on a next screen where it displays on its own

online https://ai.google.dev/gemini-api/docs please refer to the following link for more details and look up relevant phrases in the documentation: https://ai.google.dev/gemini-api/docs

There are several ChatInterface and I don't which one to use: 
- @components/practice/ChatInterface.tsx, 
- @components/speaking/ChatInterface.tsx
- @components/tutoring/ChatInterface.tsx

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings, User, Clock, Send, Mic, MessageSquare, Timer, 
  PauseCircle, PlayCircle, StopCircle, Save, X, Search 
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { ieltsGeminiService } from '@/services/ieltsGeminiService';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { debounce } from 'lodash';
import { part1Templates } from '@/data/speakingTemplates/part1';
import { part2Templates } from '@/data/speakingTemplates/part2';
import { part3Templates } from '@/data/speakingTemplates/part3';
import { tutoringLessons } from '@/data/speakingTemplates/tutoring';

