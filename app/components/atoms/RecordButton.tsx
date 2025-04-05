'use client';

import { useState } from 'react';
import { useVoiceRecognition } from '@/app/hooks/useVoiceRecognition';

type RecordButtonProps = {
  onTranscriptUpdate: (transcript: string) => void;
};

export const RecordButton = ({ onTranscriptUpdate }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording } = useVoiceRecognition({
    onResult: (transcript) => {
      onTranscriptUpdate(transcript);
    },
  });

  const handleClick = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
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
  );
};
