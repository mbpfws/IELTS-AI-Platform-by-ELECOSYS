import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaDownload, FaTrash, FaPause, FaPlay } from 'react-icons/fa';
import { MdSettingsVoice } from 'react-icons/md';

interface AudioRecorderProps {
  onAudioSubmit: (blob: Blob) => void;
  isSessionActive: boolean;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onAudioSubmit,
  isSessionActive,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingMode, setRecordingMode] = useState<'standard' | 'advanced'>('standard');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [volume, setVolume] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  const audioContextRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  const sourceRef = useRef<MediaStreamAudioSourceNode>();
  const streamRef = useRef<MediaStream>();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up audio context and analyser for volume visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
      startVolumeMonitoring();

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please check permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef.current);
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const startVolumeMonitoring = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      const updateVolume = () => {
        if (isRecording && !isPaused) {
          analyserRef.current?.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setVolume(average);
          requestAnimationFrame(updateVolume);
        }
      };
      updateVolume();
    }
  };

  const handleSubmit = () => {
    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      onAudioSubmit(audioBlob);
      setAudioURL(null);
      setRecordingTime(0);
      audioChunksRef.current = [];
    }
  };

  const handleDownload = () => {
    if (audioURL) {
      const a = document.createElement('a');
      a.href = audioURL;
      a.download = `recording-${new Date().toISOString()}.wav`;
      a.click();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <select
            className="px-3 py-2 border rounded"
            value={recordingMode}
            onChange={(e) => setRecordingMode(e.target.value as 'standard' | 'advanced')}
          >
            <option value="standard">Standard Mode</option>
            <option value="advanced">Advanced Mode</option>
          </select>
          {recordingMode === 'advanced' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{formatTime(recordingTime)}</span>
              <div className="w-32 h-2 bg-gray-200 rounded">
                <div
                  className="h-full bg-blue-500 rounded transition-all"
                  style={{ width: `${(volume / 255) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
        {audioURL && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 text-blue-500 hover:text-blue-600"
              title="Download recording"
            >
              <FaDownload />
            </button>
            <button
              onClick={() => setAudioURL(null)}
              className="p-2 text-red-500 hover:text-red-600"
              title="Delete recording"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={!isSessionActive}
            className={`p-4 rounded-full ${
              isSessionActive
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaMicrophone className="w-6 h-6" />
          </button>
        ) : (
          <>
            {!isPaused ? (
              <button
                onClick={pauseRecording}
                className="p-4 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
              >
                <FaPause className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={resumeRecording}
                className="p-4 rounded-full bg-green-500 text-white hover:bg-green-600"
              >
                <FaPlay className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={stopRecording}
              className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <FaStop className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {audioURL && (
        <div className="mt-4">
          <audio src={audioURL} controls className="w-full" />
          <button
            onClick={handleSubmit}
            className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Recording
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
