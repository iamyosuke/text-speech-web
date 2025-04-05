'use client';

import { useState } from 'react';
import { RecordButton } from '../atoms/RecordButton';
import { processAudioData } from '@/app/(server)/actions/processTranscript';
import type { AIResponse } from '@/app/(server)/actions/processTranscript';

interface RecordingSectionProps {
  onTranscriptUpdate: (audioData: Blob, aiResponse: AIResponse) => void;
}

export const RecordingSection = ({ onTranscriptUpdate }: RecordingSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecording = async (audioBlob: Blob) => {
    console.log('Recording handler called, received audio blob:', {
      size: audioBlob?.size,
      type: audioBlob?.type
    });
    
    if (!audioBlob) {
      console.log('No audio blob received, aborting processing');
      return;
    }

    try {
      console.log('Starting audio processing...');
      setIsProcessing(true);
      const aiResponse = await processAudioData(audioBlob);
      console.log('AI response received:', aiResponse);
      onTranscriptUpdate(audioBlob, aiResponse);
      console.log('Transcript update completed');
    } catch (error) {
      console.error('Error processing audio:', error);
    } finally {
      console.log('Processing completed, resetting state');
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
