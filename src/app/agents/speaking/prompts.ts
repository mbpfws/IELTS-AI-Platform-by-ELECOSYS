export const SYSTEM_INSTRUCTION = `You are an IELTS Speaking Tutor. Your behavior should follow these strict rules:

1. CONVERSATION MODE (Default)
   - Act as a natural conversation partner
   - DO NOT provide any scoring or feedback during the conversation
   - Focus on asking questions and follow-up questions
   - Respond naturally to user's answers
   - Keep track of time internally but don't mention it
   - Only switch to evaluation mode when receiving the specific command

2. EVALUATION MODE (Only when triggered)
   - Triggered by: "The session of [X] minute practice has finished please give feedback in json"
   - Provide comprehensive evaluation in JSON format:
   {
     "scores": {
       "pronunciation": number, // 0-9 scale
       "grammar": number,
       "vocabulary": number,
       "fluency": number,
       "coherence": number
     },
     "feedback": {
       "strengths": string[],
       "improvements": string[],
       "tips": string[]
     }
   }

3. MOCK TEST MODE
   - When user selects mock test mode
   - Follow strict IELTS test format
   - Provide immediate scoring after each part
   - Use formal examination language

4. TOPIC HANDLING
   Part 1: Simple, direct questions about familiar topics
   Part 2: Cue card topics with 1-minute preparation, 2-minute speech
   Part 3: Abstract questions related to Part 2 topic

Remember: Stay in conversation mode until explicitly triggered for evaluation.`;

export const CONVERSATION_PROMPTS = {
  sessionStart: (duration: number, topic: string) => `
Let's begin our ${duration}-minute speaking practice session on ${topic}.
What aspects of ${topic} would you like to discuss?`,

  part1: {
    sports: [
      "Do you play any sports regularly?",
      "What's your favorite sport to watch?",
      "How do people in your country typically stay fit?",
      "Did you play any sports when you were a child?"
    ],
    hometown: [
      "Where is your hometown located?",
      "What do you like most about your hometown?",
      "Has your hometown changed much since you were a child?",
      "Would you recommend tourists to visit your hometown?"
    ]
  },

  part2: {
    sports: `
Describe a memorable sporting event you have attended or watched.
You should say:
- What the event was
- When and where it took place
- Who you watched it with
- Why it was memorable for you`,

    hometown: `
Describe a place in your hometown that you like to visit.
You should say:
- Where it is
- How often you go there
- What you do there
- Why you like this place`
  },

  part3: {
    sports: [
      "How has technology changed the way we watch sports?",
      "Do you think professional athletes are paid too much?",
      "What role should sports play in education?"
    ],
    hometown: [
      "How are cities in your country changing?",
      "What makes a city suitable for young people?",
      "How can cities balance development and environmental protection?"
    ]
  }
};

export const MOCK_TEST_PROMPTS = {
  introduction: `
This is an IELTS Speaking Mock Test. I will assess your speaking skills according to the IELTS criteria.
The test has three parts, and I will provide scores and feedback after each part.
Let's begin with Part 1.`,

  feedback: (part: number) => `
End of Part ${part}. Here is your evaluation:
[Evaluation JSON will be provided here]`
};

// For audio messages, we just need to indicate it's a user response
export const AUDIO_MESSAGE_PROMPT = "user response";
