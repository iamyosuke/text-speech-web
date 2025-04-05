'use client';

import { useState } from 'react';
import { RecordButton } from '../atoms/RecordButton';
import { processAudioData } from '@/app/actions/processTranscript';
import type { AIResponse } from '@/app/actions/processTranscript';

interface RecordingSectionProps {
  onTranscriptUpdate: (audioData: Blob, aiResponse: AIResponse) => void;
}

export const RecordingSection = ({ onTranscriptUpdate }: RecordingSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecording = async (audioBlob: Blob) => {
    if (!audioBlob) return;

    try {
      setIsProcessing(true);
      const aiResponse = await processAudioData(audioBlob);
      onTranscriptUpdate(audioBlob, aiResponse);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <RecordButton onTranscriptUpdate={handleRecording} />
      {isProcessing && (
        <div className="text-sm text-gray-600">
          処理中...
        </div>
      )}
    </div>
  );
};
