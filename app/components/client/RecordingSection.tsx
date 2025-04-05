'use client';

import { useState } from 'react';
import { RecordButton } from '../atoms/RecordButton';
import { processTranscript } from '@/app/actions/processTranscript';
import type { AIResponse } from '@/app/actions/processTranscript';

interface RecordingSectionProps {
  onTranscriptUpdate: (transcript: string, aiResponse: AIResponse) => void;
}

export const RecordingSection = ({ onTranscriptUpdate }: RecordingSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTranscript = async (transcript: string) => {
    if (!transcript.trim()) return;

    try {
      setIsProcessing(true);
      const aiResponse = await processTranscript(transcript);
      onTranscriptUpdate(transcript, aiResponse);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <RecordButton onTranscriptUpdate={handleTranscript} />
      {isProcessing && (
        <div className="text-sm text-gray-600">
          処理中...
        </div>
      )}
    </div>
  );
};
