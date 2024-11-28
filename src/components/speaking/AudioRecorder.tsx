"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FaMicrophone, FaStop, FaPause, FaPlay, FaTrash } from 'react-icons/fa';

interface AudioRecorderProps {
  onAudioSubmit?: (audioBlob: Blob) => void;
  onAnalysisComplete?: (response: string) => Promise<void>;
  onRecordingComplete?: (blob: Blob) => Promise<void>;
  onRecordingStop?: () => void;
  isHandsFree?: boolean;
  disabled?: boolean;
  audioBlob?: Blob | null;
}

export default function AudioRecorder({ onAudioSubmit, onAnalysisComplete, onRecordingComplete, onRecordingStop, isHandsFree = false, disabled = false, audioBlob = null }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const silenceThreshold = -50; // dB

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Thiết lập AudioContext để phân tích âm thanh
      audioContext.current = new AudioContext();
      analyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyser.current);
      
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        processRecording();
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setIsPaused(false);

      if (isAutoMode) {
        startSilenceDetection();
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const startSilenceDetection = () => {
    if (!analyser.current) return;

    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    let silenceStartTime: number | null = null;

    const checkSilence = () => {
      if (!analyser.current || !isRecording || isPaused) return;

      analyser.current.getFloatTimeDomainData(dataArray);
      const rms = Math.sqrt(dataArray.reduce((acc, val) => acc + val * val, 0) / bufferLength);
      const db = 20 * Math.log10(rms);

      if (db < silenceThreshold) {
        if (!silenceStartTime) {
          silenceStartTime = Date.now();
        } else if (Date.now() - silenceStartTime > 5000) { // 5 giây im lặng
          stopRecording();
          return;
        }
      } else {
        silenceStartTime = null;
      }

      requestAnimationFrame(checkSilence);
    };

    requestAnimationFrame(checkSilence);
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
      onRecordingStop?.();
    }
  };

  const processRecording = async () => {
    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);

    if (onRecordingComplete) {
      await onRecordingComplete(audioBlob);
    } else if (onAudioSubmit) {
      onAudioSubmit(audioBlob);
    }
  };

  const togglePause = () => {
    if (!mediaRecorder.current || !isRecording) return;

    if (isPaused) {
      mediaRecorder.current.resume();
      if (isAutoMode) startSilenceDetection();
    } else {
      mediaRecorder.current.pause();
    }
    setIsPaused(!isPaused);
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const submitAudio = () => {
    if (audioUrl && audioChunks.current.length > 0) {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      onAudioSubmit?.(audioBlob);
      setAudioUrl(null);
      audioChunks.current = [];
    }
  };

  const discardAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
      audioChunks.current = [];
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={isAutoMode}
            onCheckedChange={setIsAutoMode}
            id="auto-mode"
          />
          <Label htmlFor="auto-mode">Tự động dừng sau 5 giây im lặng</Label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled}
          variant={isRecording ? "destructive" : "default"}
        >
          {isRecording ? <FaStop className="mr-2" /> : <FaMicrophone className="mr-2" />}
          {isRecording ? "Stop" : "Record"}
        </Button>
      </div>

      {audioUrl && !isRecording && (
        <div className="flex gap-2 mt-4">
          <Button onClick={playAudio} variant="outline">
            <FaPlay className="mr-2" /> Nghe lại
          </Button>
          <Button onClick={submitAudio} variant="default">
            Gửi
          </Button>
          <Button onClick={discardAudio} variant="destructive">
            <FaTrash className="mr-2" /> Xóa
          </Button>
        </div>
      )}
    </div>
  );
}
