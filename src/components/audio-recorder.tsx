import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  isHandsFree: boolean;
  onHandsFreeToggle: () => void;
}

export function AudioRecorder({ onRecordingComplete, isHandsFree, onHandsFreeToggle }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const chunks = useRef<Blob[]>([]);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const SILENCE_THRESHOLD = -50; // dB
  const SILENCE_DURATION = 2000; // ms

  useEffect(() => {
    return () => {
      if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
        mediaRecorder.current.stop();
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio context and analyzer
      audioContext.current = new AudioContext();
      analyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyser.current);
      
      // Configure analyzer
      analyser.current.fftSize = 2048;
      const bufferLength = analyser.current.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);

      // Create media recorder
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      chunks.current = [];
      
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm;codecs=opus' });
        onRecordingComplete(blob);
        setIsRecording(false);
      };

      // Start recording
      mediaRecorder.current.start();
      setIsRecording(true);

      // Monitor audio levels
      const checkAudioLevel = () => {
        if (!analyser.current || !isRecording) return;
        
        analyser.current.getFloatTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += Math.abs(dataArray[i]);
        }
        const rms = Math.sqrt(sum / bufferLength);
        const db = 20 * Math.log10(rms);
        setAudioLevel(db);

        // Handle silence detection in hands-free mode
        if (isHandsFree && db < SILENCE_THRESHOLD) {
          if (!silenceTimer.current) {
            silenceTimer.current = setTimeout(() => {
              if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
                mediaRecorder.current.stop();
              }
            }, SILENCE_DURATION);
          }
        } else {
          if (silenceTimer.current) {
            clearTimeout(silenceTimer.current);
            silenceTimer.current = null;
          }
        }

        requestAnimationFrame(checkAudioLevel);
      };

      requestAnimationFrame(checkAudioLevel);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          variant={isRecording ? "destructive" : "default"}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        <Button
          onClick={onHandsFreeToggle}
          variant={isHandsFree ? "secondary" : "outline"}
        >
          {isHandsFree ? 'Disable Hands-free' : 'Enable Hands-free'}
        </Button>
      </div>
      
      {isRecording && (
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-100"
            style={{ 
              width: `${Math.max(0, Math.min(100, (audioLevel + 60) * 2))}%` 
            }}
          />
        </div>
      )}
    </div>
  );
}
