'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Download, Pause } from 'lucide-react';
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="recorder-container p-4 rounded-lg border bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <AnimatePresence mode="wait">
              {isRecording ? (
                <motion.div
                  key="recording"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {isPaused ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={resumeRecording}
                      disabled={disabled}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={pauseRecording}
                      disabled={disabled}
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="start"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Button
                    variant="default"
                    size="icon"
                    onClick={startRecording}
                    disabled={disabled}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {isRecording && (
              <Button
                variant="destructive"
                size="icon"
                onClick={stopRecording}
                disabled={disabled}
              >
                <Square className="h-4 w-4" />
              </Button>
            )}
          </div>

          <span className="text-sm font-medium">
            {formatTime(duration)}
          </span>

          {recordedBlob && (
            <Button
              variant="outline"
              size="icon"
              onClick={downloadRecording}
              disabled={disabled}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>

        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            controls
            className="w-full"
          />
        )}
      </div>
    </motion.div>
  );
}
