'use client';

import React, { useState, useRef, useEffect } from 'react';

export const AudioRecorder = ({ onTextSubmit, onAudioSubmit, isSessionActive }: { 
  onTextSubmit: (text: string) => Promise<void>;
  onAudioSubmit: (content: string, blob: Blob) => Promise<void>;
  isSessionActive: boolean;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isManualInput, setIsManualInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [volume, setVolume] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  // Cleanup function
  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop();
    }

    if (audioContextRef.current?.state !== 'closed') {
      audioContextRef.current?.close();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    mediaRecorderRef.current = null;
    audioContextRef.current = null;
    analyserRef.current = null;
    streamRef.current = null;
    chunksRef.current = [];
    setVolume(0);
    setIsRecording(false);
    setIsPaused(false);
  };

  // Cleanup on unmount or when session becomes inactive
  useEffect(() => {
    if (!isSessionActive) {
      cleanup();
    }
    return cleanup;
  }, [isSessionActive]);

  const initializeAudio = async () => {
    try {
      cleanup(); // Cleanup any existing instances first

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
          chunksRef.current = [];
          await onAudioSubmit(textInput, audioBlob);
        } catch (err) {
          console.error('Error processing audio:', err);
          setError('Failed to process audio. Please try again.');
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      setError(null);
    } catch (err) {
      console.error('Error initializing audio:', err);
      setError('Please allow microphone access to record audio');
      cleanup();
    }
  };

  const analyzeVolume = () => {
    if (!analyserRef.current || !isRecording) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setVolume(average);
    
    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(analyzeVolume);
    }
  };

  const handleStart = async () => {
    if (!isSessionActive) return;
    
    try {
      await initializeAudio();
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.start();
        setIsRecording(true);
        analyzeVolume();
      }
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start recording. Please try again.');
      cleanup();
    }
  };

  const handlePause = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop();
    }
    cleanup();
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    try {
      await onTextSubmit(textInput);
      setTextInput('');
    } catch (err) {
      console.error('Error submitting text:', err);
      setError('Failed to submit text. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          {isManualInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your response..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              >
                Send
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {!isRecording ? (
                <button
                  onClick={handleStart}
                  disabled={!isSessionActive}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  Start Recording
                </button>
              ) : (
                <>
                  {isPaused ? (
                    <button
                      onClick={handleResume}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Resume
                    </button>
                  ) : (
                    <button
                      onClick={handlePause}
                      className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Pause
                    </button>
                  )}
                  <button
                    onClick={handleStop}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Stop
                  </button>
                </>
              )}
              {isRecording && (
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-100"
                    style={{ width: `${(volume / 255) * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsManualInput(!isManualInput)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isManualInput ? 'Switch to Voice' : 'Switch to Text'}
        </button>
      </div>
    </div>
  );
};
