'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  disabled?: boolean;
}

export function AudioRecorder({ 
  onRecordingComplete, 
  onRecordingStart, 
  onRecordingStop,
  disabled 
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(blob);
        onRecordingStop?.();
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setDuration(0);
      onRecordingStart?.();
      
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please ensure you have granted microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && isPaused) {
      mediaRecorder.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recording-${new Date().toISOString()}.ogg`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!isRecording && !audioUrl && (
        <Button
          type="button"
          variant="secondary"
          onClick={startRecording}
          disabled={disabled}
          className="relative"
        >
          <Mic className="w-4 h-4" />
        </Button>
      )}

      {isRecording && (
        <>
          <Button
            type="button"
            variant="destructive"
            onClick={stopRecording}
            className="animate-pulse"
          >
            <Square className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </span>
        </>
      )}

      {audioUrl && !isRecording && (
        <>
          <audio ref={audioRef} src={audioUrl} className="hidden" />
          <Button
            type="button"
            variant="outline"
            onClick={() => audioRef.current?.play()}
            className="w-8 h-8 p-0"
          >
            <Play className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={startRecording}
            className="w-8 h-8 p-0"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
}
