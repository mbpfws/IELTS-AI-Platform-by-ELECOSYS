"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Mic, Square, Play, RotateCcw, Send } from 'lucide-react';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  isProcessing: boolean;
  isHandsFree: boolean;
  onHandsFreeChange: (value: boolean) => void;
}

const AudioRecorder = ({ 
  onRecordingComplete, 
  isProcessing, 
  isHandsFree, 
  onHandsFreeChange 
}: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };

      mediaRecorder.current.onstart = () => {
        setIsRecording(true);
        setRecordedChunks([]);
      };

      mediaRecorder.current.onstop = () => {
        setIsRecording(false);
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorder.current.start();

      if (isHandsFree) {
        startSilenceDetection(stream);
      }
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const startSilenceDetection = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkSilence = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      
      if (average < 10) { // Threshold for silence
        if (!silenceTimer.current) {
          silenceTimer.current = setTimeout(() => {
            if (mediaRecorder.current?.state === 'recording') {
              stopRecording();
            }
          }, 5000); // 5 seconds of silence
        }
      } else {
        if (silenceTimer.current) {
          clearTimeout(silenceTimer.current);
          silenceTimer.current = null;
        }
      }

      if (isRecording) {
        requestAnimationFrame(checkSilence);
      }
    };

    checkSilence();
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current?.state === 'recording') {
      mediaRecorder.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current?.state === 'paused') {
      mediaRecorder.current.resume();
      setIsPaused(false);
    }
  };

  const resetRecording = () => {
    setRecordedChunks([]);
    setAudioUrl(null);
  };

  const sendRecording = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      onRecordingComplete(blob);
      resetRecording();
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder.current) {
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isHandsFree}
              onCheckedChange={onHandsFreeChange}
              id="hands-free"
            />
            <label htmlFor="hands-free" className="text-sm">
              Chế độ rảnh tay (tự động dừng sau 5 giây im lặng)
            </label>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              disabled={isProcessing}
              size="lg"
              className="w-32"
            >
              <Mic className="mr-2 h-4 w-4" />
              Ghi âm
            </Button>
          ) : (
            <>
              {!isPaused ? (
                <Button
                  onClick={pauseRecording}
                  variant="outline"
                  size="lg"
                  className="w-32"
                >
                  <Square className="mr-2 h-4 w-4" />
                  Tạm dừng
                </Button>
              ) : (
                <Button
                  onClick={resumeRecording}
                  variant="outline"
                  size="lg"
                  className="w-32"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Tiếp tục
                </Button>
              )}
              <Button
                onClick={stopRecording}
                variant="destructive"
                size="lg"
                className="w-32"
              >
                <Square className="mr-2 h-4 w-4" />
                Dừng
              </Button>
            </>
          )}
        </div>

        {audioUrl && (
          <div className="space-y-4">
            <audio src={audioUrl} controls className="w-full" />
            <div className="flex justify-center space-x-4">
              <Button
                onClick={resetRecording}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Ghi lại
              </Button>
              <Button
                onClick={sendRecording}
                disabled={isProcessing}
                size="sm"
              >
                <Send className="mr-2 h-4 w-4" />
                Gửi
              </Button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="text-center text-sm text-blue-500">
            Đang xử lý âm thanh...
          </div>
        )}
      </div>
    </Card>
  );
};

export default AudioRecorder;
