# IELTS Speaking Agent Implementation Guide

This guide focuses on implementing the Speaking Agent for our IELTS learning platform, including audio processing and maintaining conversation context.

## Overview

The Speaking Agent is designed to help users improve their IELTS speaking skills by:
- Accepting both text and audio input
- Processing audio input for transcription and analysis
- Providing feedback based on IELTS speaking criteria
- Maintaining conversation context for a more natural interaction

## Implementation Steps

### 1. Update ChatInterface Component

The \`ChatInterface\` component needs to handle both text and audio input. Here's the key part of the implementation:

\`\`\`tsx
import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Loader2 } from 'lucide-react'

export function ChatInterface({ agentName, initialMessage, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<BlobPart[]>([])

  // ... other state and useEffect hooks ...

  const handleSendMessage = async (message: string, audio?: Blob) => {
    if (message.trim() === '' && !audio) return

    setIsLoading(true)
    setMessages((prev) => [...prev, { role: 'user', content: message, isAudio: !!audio }])
    setInput('')

    try {
      const formData = new FormData()
      formData.append('agent', agentName)
      formData.append('message', message)
      if (audio) {
        formData.append('audio', audio, 'recording.webm')
      }

      // Append conversation history
      messages.forEach((msg, index) => {
        formData.append(\`history[\${index}][role]\`, msg.role)
        formData.append(\`history[\${index}][content]\`, msg.content)
      })

      const response = await fetch('/api/ai', {
        method: 'POST',
        body: formData,
      })

      // ... handle response ...

    } catch (error) {
      // ... handle error ...
    } finally {
      setIsLoading(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        handleSendMessage("Audio message", audioBlob)
        audioChunksRef.current = []
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      // ... handle error ...
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // ... render JSX ...
}
\`\`\`

### 2. Update API Route

The API route needs to handle both text and audio input, as well as maintain the conversation context. Here's the key implementation:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const agent = formData.get('agent') as string
    const message = formData.get('message') as string
    const audioFile = formData.get('audio') as File | null
    const history = JSON.parse(formData.get('history') as string || '[]')

    if (agent !== 'Speaking Agent') {
      return NextResponse.json({ error: 'Invalid agent' }, { status: 400 })
    }

    const model = "gemini-1.5-pro"
    const systemInstruction = "You are an IELTS Speaking tutor using LearnLM 1.5 Pro to help students improve their speaking skills across all four assessment criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. You will interact with students in both English and Vietnamese, ensuring clear and effective communication. When provided with audio, transcribe it and then respond as a tutor."

    const generativeModel = genAI.getGenerativeModel({ model })

    let content = [{ text: systemInstruction }]

    // Add conversation history
    for (const msg of history) {
      content.push({ text: \`\${msg.role}: \${msg.content}\` })
    }

    if (audioFile) {
      const audioData = await audioFile.arrayBuffer()
      content.push({
        inlineData: {
          mimeType: audioFile.type,
          data: Buffer.from(audioData).toString('base64')
        }
      })
      content.push({ text: "Please transcribe the audio, analyze the speaking based on IELTS criteria, and provide feedback and suggestions for improvement." })
    } else if (message) {
      content.push({ text: \`User: \${message}\` })
    } else {
      return NextResponse.json({ error: 'Missing message or audio' }, { status: 400 })
    }

    content.push({ text: "Assistant: " })

    const result = await generativeModel.generateContent(content)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
\`\`\`

## Key Features

1. **Audio Recording**: The \`ChatInterface\` component uses the \`MediaRecorder\` API to capture audio from the user's microphone.

2. **Dual Input Handling**: The interface and API route are designed to handle both text and audio inputs seamlessly.

3. **Conversation Context**: The full conversation history is sent with each request to maintain context.

4. **LearnLM Integration**: The API uses the LearnLM model (represented by gemini-1.5-pro) for both text and audio processing, ensuring consistent responses.

5. **IELTS-Specific Feedback**: The system instruction prompts the AI to provide feedback based on IELTS speaking criteria.

## Important Considerations

1. **Audio Format**: Ensure that the audio is being sent in a format supported by the LearnLM model (WebM in this implementation).

2. **Error Handling**: Implement robust error handling for both audio recording and API requests.

3. **User Experience**: Provide clear visual feedback for recording states and processing times.

4. **Privacy**: Inform users about audio recording and data handling practices.

5. **Performance**: Consider implementing debouncing or throttling for text inputs to avoid excessive API calls.

## Next Steps

1. Implement a way to play back recorded audio for user verification.
2. Add a feature to save and review past speaking sessions.
3. Integrate more detailed IELTS scoring feedback based on the AI's analysis.
4. Implement user authentication to personalize the learning experience.
5. Add support for different IELTS speaking task types (Part 1, 2, and 3).

By following this guide, you can implement a robust Speaking Agent that processes both text and audio inputs while maintaining conversation context, providing a seamless IELTS speaking practice experience for users.
\`\`\`

</ReactProject>

This Markdown file provides a focused guide on implementing the Speaking Agent for our IELTS learning platform. It includes:

1. An overview of the Speaking Agent's functionality
2. Detailed implementation steps for both the ChatInterface component and the API route
3. Key features of the implementation
4. Important considerations for development
5. Suggestions for next steps to enhance the Speaking Agent

This guide should help developers understand and implement the core functionality of the Speaking Agent, with a focus on audio processing and maintaining conversation context.

Is there anything specific you'd like me to add or modify in this guide?
