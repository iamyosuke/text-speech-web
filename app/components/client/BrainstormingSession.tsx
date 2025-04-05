'use client';

import { useState } from 'react';
import { RecordingSection } from './RecordingSection';
import { TranscriptDisplay } from '../molecules/TranscriptDisplay';
import { AIResponseDisplay } from '../molecules/AIResponseDisplay';
import type { AIResponse } from '@/app/actions/processTranscript';

interface BrainstormingSessionProps {
  onTranscriptUpdate: (transcript: string, aiResponse: AIResponse) => Promise<void>;
}

export const BrainstormingSession = ({ onTranscriptUpdate }: BrainstormingSessionProps) => {
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentAIResponse, setCurrentAIResponse] = useState<AIResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdate = async (transcript: string, aiResponse: AIResponse) => {
    setCurrentTranscript(transcript);
    setCurrentAIResponse(aiResponse);
    setIsProcessing(false);
    await onTranscriptUpdate(transcript, aiResponse);
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
