'use client';

import { useState } from 'react';
import { useVoiceRecognition } from '@/app/hooks/useVoiceRecognition';

type RecordButtonProps = {
  onTranscriptUpdate: (audioBlob: Blob) => void;
};

export const RecordButton = ({ onTranscriptUpdate }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { startRecording, stopRecording } = useVoiceRecognition({
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
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className={`rounded-full p-4 ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-semibold transition-colors`}
        aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        {isRecording ? '録音停止' : '録音開始'}
      </button>
      {error && (
        <div className="text-red-500 text-sm mt-2 max-w-md text-center">
          {error}
        </div>
      )}
    </div>
  );
};
