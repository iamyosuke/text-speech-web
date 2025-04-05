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
    try {
      setIsProcessing(true);
      
      // 文字起こし結果を表示
      setCurrentTranscript(aiResponse.transcript || '');
      
      // AI分析結果を表示
      setCurrentAIResponse(aiResponse);
      
      // データを保存
      await onTranscriptUpdate(audioData, aiResponse);
    } catch (error) {
      console.error('Error in handleUpdate:', error);
      setCurrentAIResponse({
        response: '',
        error: 'データの処理中にエラーが発生しました。'
      });
    } finally {
      setIsProcessing(false);
    }
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
