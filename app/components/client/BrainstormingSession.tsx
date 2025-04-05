'use client';

import { useState } from 'react';
import { RecordingSection } from './RecordingSection';
import { TranscriptDisplay } from '../molecules/TranscriptDisplay';
import { AIResponseDisplay } from '../molecules/AIResponseDisplay';
import type { AIResponse } from '@/app/(server)/actions/processTranscript';

interface BrainstormingSessionProps {
  onTranscriptUpdate: (audioData: Blob, aiResponse: AIResponse) => Promise<void>;
}

export const BrainstormingSession = ({ onTranscriptUpdate }: BrainstormingSessionProps) => {
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentAIResponse, setCurrentAIResponse] = useState<AIResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdate = async (audioData: Blob, aiResponse: AIResponse) => {
    // 一時的に音声データのサイズを表示
    setCurrentTranscript(`録音データサイズ: ${Math.round(audioData.size / 1024)}KB`);
    setCurrentAIResponse(aiResponse);
    setIsProcessing(false);
    await onTranscriptUpdate(audioData, aiResponse);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex justify-center">
        <RecordingSection 
          onTranscriptUpdate={handleUpdate}
        />
      </div>

      <TranscriptDisplay 
        transcript={currentTranscript}
        isProcessing={isProcessing}
      />
      
      <AIResponseDisplay 
        response={currentAIResponse?.response || ''}
        error={currentAIResponse?.error}
      />
    </div>
  );
};
