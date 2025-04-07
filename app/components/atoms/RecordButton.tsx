'use client';

import { useState } from 'react';
import { useVoiceRecognition } from '@/app/hooks/useVoiceRecognition';
import { Waveform } from './Waveform';

type RecordButtonProps = {
  onTranscriptUpdate: (audioBlob: Blob) => void;
};

export const RecordButton = ({ onTranscriptUpdate }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { startRecording, stopRecording, audioStream } = useVoiceRecognition({
    onResult: (blob) => {
      onTranscriptUpdate(blob);
    },
  });

  const handleClick = async () => {
    setError(null); // エラーをリセット
    console.log('Button clicked, current recording state:', isRecording);
    
    try {
      if (isRecording) {
        console.log('Attempting to stop recording...');
        await stopRecording();
        setIsRecording(false);
      } else {
        console.log('Attempting to start recording...');
        await startRecording();
        setIsRecording(true);
      }
      console.log('Recording state updated to:', !isRecording);
    } catch (err) {
      console.error('Recording error:', err);
      setError(err instanceof Error ? err.message : '録音中にエラーが発生しました');
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
    {isRecording && audioStream && (
      <div className="w-full">
        <Waveform audioStream={audioStream} />
      </div>
    )}
      <button
        onClick={handleClick}
        className={`w-full px-8 py-3 rounded-lg flex justify-center items-center text-white font-medium transition-colors ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        {isRecording ? '録音停止' : 'Start Recording'}
      </button>
      {error && (
        <div className="text-red-500 text-sm mt-2 max-w-md text-center">
          {error}
        </div>
      )}
    </div>
  );
};
