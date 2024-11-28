"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Square, Loader2 } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AudioService } from '@/services/audioService';

interface AudioRecorderProps {
  onAnalysisComplete: (response: string) => void;
  isProcessing?: boolean;
  isHandsFree?: boolean;
  onHandsFreeChange?: (value: boolean) => void;
}

export default function AudioRecorder({
  onAnalysisComplete,
  isProcessing = false,
  isHandsFree = false,
  onHandsFreeChange
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [localProcessing, setLocalProcessing] = useState(false);
  const audioService = new AudioService();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        // Process the audio
        setLocalProcessing(true);
        try {
          const response = await audioService.analyzeAudio(audioBlob);
          onAnalysisComplete(response);
        } catch (error) {
          console.error('Error processing audio:', error);
        } finally {
          setLocalProcessing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      if (isHandsFree) {
        startSilenceDetection();
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    }
  };

  const startSilenceDetection = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const checkSilence = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      
      if (average < 5) { // Threshold for silence
        silenceTimeoutRef.current = setTimeout(() => {
          stopRecording();
        }, 2000); // Stop after 2 seconds of silence
      } else if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }

      if (isRecording) {
        requestAnimationFrame(checkSilence);
      }
    };

    checkSilence();
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="hands-free"
              checked={isHandsFree}
              onCheckedChange={onHandsFreeChange}
              disabled={isRecording || isProcessing || localProcessing}
            />
            <Label htmlFor="hands-free">Chế độ rảnh tay</Label>
          </div>
          
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing || localProcessing}
            variant={isRecording ? "destructive" : "default"}
          >
            {isProcessing || localProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : isRecording ? (
              <>
                <Square className="mr-2 h-4 w-4" />
                Dừng ghi âm
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Bắt đầu ghi âm
              </>
            )}
          </Button>
        </div>

        {audioURL && !isRecording && !isProcessing && !localProcessing && (
          <audio src={audioURL} controls className="w-full" />
        )}

        {isHandsFree && isRecording && (
          <p className="text-sm text-muted-foreground text-center">
            Ghi âm sẽ tự động dừng sau 2 giây im lặng
          </p>
        )}
      </div>
    </Card>
  );
}
