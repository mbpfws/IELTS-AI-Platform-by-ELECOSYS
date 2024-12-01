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

##Adding more templates to part 1
Adding these topics to part 1 templates, making each one 7 variants (by masterfully crafting the system prompts to steer the AI in the desired direction for each topic on it pedagogical approaches and techniques) regarding to:
- the 4 marking criteria (these are suited for different levels of language proficiency)
- the 3 levels of language proficiency (beginner, intermediate and advanced matching with the 3 levels of band score)

Make sure these are synchronized with the API and database tables that the page uses and fetches data from.

Make one more filterable tag which is 'IELTS Speaking Forecast Q3-2024'
Bike

1. Did you have a bike when you were young?

2. Did you ride a bike when you were little?

3. Did you ride a bike to school?

4. Do you ride a bike when you go out now?

5. Do you like riding a bicycle?

6. Are there many young people riding bicycles in Vietnam?

7. Would you cycle more in the future?

8. Do you think bicycles would do well in your city?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Bike

Roads and streets

1. Do you think the roads in your city need improvement?

2. What is the condition of the roads in your city like?

3. How do people cross the road in the city where you live?

4. Are the roads and streets in the area where you live busy?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Roads and streets

Fish and Fishing

1. Is fishing popular in your country?

2. Do you like eating fish?

Have you ever been to a place where there are lots of fish around you?

Have you watched the TV program about fish?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Fish and Fishing

Free Time & Weekend

1. Do you like to go to the cinema/movies at weekends? (Why/Why not?)

2. Who do you go with? Alone or with others?

3. What do you enjoy doing most on weekends? ( Why/Why not?)

4. Are you planning to do anything special next weekend? ( Why/Why not?)

5. What kinds of activities do you often do in your spare time?

6. How do you often relax yourself on weekends?

7. How do your surrounding friends relax?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Free Time & Weekend

Number & Maths

1. What numbers do you like?

2. What numbers are important to you?

3. Are you good at remembering telephone numbers?

4. Do you need to use numbers in the future?

5. Do you like learning mathematics?

6. Do you think it’s difficult to learn mathematics well?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Number & Math

Spend Time by yourself & Exciting Activities

1. Do you like to spend time by yourself or with your friends? Why?

2. When was the last time you spent time by yourself?

3. Do you want to spend more time by yourself?

4. Have you ever tried any exciting activities?

5. What was the interesting thing that you did when you were a child?

6. Have you joined in any interesting activities recently?

7. Would you like to try climbing or diving?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Spend Time by yourself & Exciting Activities

Coins

1. Do you use coins in your daily life?

2. Is it convenient to use coins?

3. Have you ever collected coins?

4. Do you often carry coins with you?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Coins

Asking for help

1. When was the last time you asked for help?

2. What kinds of help do you often ask for?

3. Why are teachers always willing to help students?

4. Do you ask for help when you have a problem?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Asking for help

Childhood memory

1. Do you think children should grow up in the city or the countryside?

2. What are your best childhood memories?

3. Did you enjoy your childhood?

4. What did you enjoy doing as a child?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Childhood memory

Schools and workplaces

1. Where is your school?

2. Do you like your school?

3. Do you think your school is a good place to study?

4. What is the environment like at your school?

5. What do you think could be improved in your school?

6. How important is interest in study?

7. Which subject do you find challenging?

8. Do you like your job?

9. Do you currently have a good work environment?

10. What do you think could be improved at your workplace?

11. What do you think would be challenging when you start working in the future?

12. Is there a place in your company that makes you feel relaxed?

13. What are the advantages of a company having a relaxation room?

14. Have you ever thought about changing jobs?

15. How do you go to work?

16. How do you go to school?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Schools and workplaces

Films

1. What films do you like?

2. Did you often watch films when you were a child?

3. Did you ever go to the cinema alone as a child?

4. Do you often go to the cinema with your friends?

5. Do you think going to the cinema is a good way to spend time with friends?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Films

Exciting activities

1. Would you like to try scuba diving and bungee jumping?

2. Has anything exciting happened to you recently?

3. What do you think were exciting activities when you were a child?

4. Have you ever tried any exciting activities?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Exciting activities

E-books and paper books

1. Do you think paper books will disappear in the future?

2. Will you read more online in the future?

3. What do you usually read online?

4. Which do you prefer, e-books or paper books?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: E-books and Paper Books

Making friends

1. Do you like making friends? (Why/ Why not?)

2. How often do you meet new people? (Why/ Why not?)

3. Who is your latest new friend?

4. Do your friends think you are calm?

5. When you meet someone for the first time, do you know if you like them?(Why/ Why not?)

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Making friends

Breakfast

1. Would you like to change your morning routine?

2. Are there any differences between the mornings of your childhood and now?

3. Do you think breakfast is important?

4. What do you usually eat for breakfast?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Breakfast

Science

1. Did you like studying science when you were at school? [Why/Why not?]

2. What do you remember about your science teachers at school?

3. How interested are you in science now? [Why/Why not?]

4. What do you think has been an important recent scientific development? [Why?]

5. When did you start to learn science?

6. What is your favorite science subject?

7. Is there any technology that you think is helpful in daily life?

8. Do you think science classes are important?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Science

Daily routine/ Morning Time

1. What is your morning routine?

2. What is your weekend routine?

2. Is breakfast important?

3. Do you have breakfast every day?

4. Why is breakfast the most important meal of the day?

5. Do you want to change your morning routine?

6. Are there any differences between what you do in the morning now and what you did in the past?

7. Are there any differences between what you do on your weekends now and what you did in the past?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Daily routine/ Morning Time

The Internet

1. When did you start using the Internet?

2. How often do you use the Internet?

3. Do you use the Internet much during the day?

4. How does the Internet influence people?

5. What would you do without the Internet?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: The Internet

Meeting new people

1. How often do you meet new people? (Why?)

2. Do you find it easy to talk to new people? (Why/Why not?)

3. When you meet someone for the first time, how do you know if you like them?

4. Do you worry about what people you meet think of you? (Why/Why not?)

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Meeting New People

Collecting things

1. Do you collect things?

2. Are there any things you keep from your childhood?

3. Would you keep old things for a long time? (Why?)

4. Where do you usually keep the things that you need?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Collecting things

Pen and Pencil

1. Do you usually use a pen or pencil?

2. Which do you use more often? Pen or pencil?

3. When was the last time you bought a pen or pencil?

4. What do you think if someone sends you a pen or pencil as a gift?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Pen and Pencil

Clothing

1. Do you spend a lot of time choosing clothes?

2. Do you like wearing T-shirts?

3. Do you prefer to wear comfortable and casual clothes or smart clothes?

4. What kind of clothes do you like to wear?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Clothing

Music/Musical instruments

1. Do you like music? (Why/Why not?)

2. What kind of music is there in Vietnam?

3. What type of music do you like to listen to when you are alone? Why?

4. How do you think music will be in the future?

5. Do you think older and younger generations prefer different types of music?

6. Is there any music concert that you want to go to?

7. Do schools in your country have music lessons?

8. Do a lot of people like music?

9. Do you think music education is important for children?

10. Do you think children should learn to play an instrument at school?

11. What musical instruments do you enjoy listening to the most?

12. Have you ever learned to play a musical instrument?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Music and Musical instruments

News

1. Do you read the news?

2. Do famous people often appear in the news?

3. Do you like to follow celebrities in the news?

4. Do you think what is said in the news is correct?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: News

Language

1. What languages can you speak?

2. What languages would you like to learn in the future?

3. How do you learn a foreign language?

4. How are languages taught and learned in your school?

5. Do you think English is an easy or difficult language to learn? (Why?)

6. How did you learn English?

7. Would you like to learn any other languages? (Why /Why not?)

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Language

Perfume

1. Do you use perfume?

2. What kind of perfume do you like?

3. What does perfume mean to you?

4. Do you give perfume as a gift?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Perfume

Music

1. Do you like music? Why / Why not?

2. What type of music do you like to listen to when you are alone? Why?

3. Has the music that you listen to changed since you were young?

4. Do you think older and younger generations prefer different types of music?

5. Is there any music concert that you want to go to?

6. What music do you like?

7. Do you often listen to one type of music?

8. What music do your friends like? Do you enjoy the same type of music?

9. What's the most popular type of music where you live?

10. Which singer or musician would you like to see in person?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Music

Sharing

1. Have you shared anything with others recently?

2. Did your parents teach you how to share when you were a child?

3. What kind of things do you like to share with others?

4. What kinds of things are not suitable for sharing?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Sharing

Plants

1. Do Vietnamese people send plants as gifts?

2. Do you know anything about growing a plant?

3. What plant did you grow when you were young?

4. Do you keep plants at home?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Plants

Scenery

1. Where can you enjoy beautiful views where you live?

2. What’s the best view that you have ever enjoyed?

3. Do you take photos of good views?

4. Do you book rooms that have good views when you go travelling?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Scenery

Teamwork

1. Do you like teamwork?

2. Have you ever worked with others in a team?

3. Have you ever worked in a group in school?

4. Are you currently working in a group?

5. Do you prefer to work alone or in a group?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Teamwork

Conversation

1. Do you like to talk to others?

2. Did you enjoy talking to others when you were a child?

3. Do you talk a lot to others?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Conversations

Teachers

1. Do you want to be a teacher in the future?

2. Do you remember one of your teachers?

3. What were your primary school teachers like?

4. Do you have a favorite teacher?

5. How has she/he helped you?

6. Who was your favourite teacher in elementary school? Why?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Teachers

T-shirts

1. Do you like wearing T-shirts?

2. How often do you wear T-shirts?

3. Do you like T-shirts with pictures or prints?

4. Do you think older people who wear T-shirts are fashionable?

5. Would you buy T-shirts as souvenirs on vacation?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: T-Shirts

Relaxing

1. What would you do to relax?

2. Do you think doing sports is a good way to relax?

3. Do you think vacation is a good time to relax?

4. Do you think students need more relaxing time?

5. Do you often feel relaxed?

6. Does listening to music make you feel relaxed?

7. What kinds of places or environments would make you feel relaxed?

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Relaxing

Sports

1. What sports do you like?

2. Where did you learn how to do it?

3. Did you do some sports when you were young?

4. Do you think students need more exercise?

5. Do you know any people who are good at sports?

6. Do you think it is important for people to exercise?

7. Have you ever supported a sports team? (Why/ Why not?)

8. Do you enjoy watching sports? (Why/Why not?)

9. Do you think there is too much sport on television in your country? (Why/Why not?)

Tham khảo: Bài mẫu IELTS Speaking Part 1 - Topic: Sports

Challenges

1. Do you like challenges?

2. What is the biggest challenge in your future?

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

