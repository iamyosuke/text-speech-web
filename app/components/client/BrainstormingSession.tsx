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
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">New Project</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 flex items-center">
          <div className="text-blue-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
          </div>
          <div>Press Start Recording to begin speaking</div>
        </div>
        
        <div className="flex justify-center mb-4">
          <RecordingSection 
            onTranscriptUpdate={handleUpdate}
          />
        </div>

        {!currentAIResponse && !isProcessing && (
          <div className="text-center text-gray-500 mt-8">
            <p>Use voice input to brainstorm with AI.</p>
            <p>Click &ldquo;Start Recording&rdquo; to begin.</p>
          </div>
        )}

        {isProcessing && (
          <div className="text-center text-blue-500 mt-8">
            <p>処理中...</p>
          </div>
        )}

        {currentTranscript && (
          <div className="mt-6">
            <TranscriptDisplay 
              transcript={currentTranscript}
              isProcessing={isProcessing}
            />
          </div>
        )}
        
        {currentAIResponse && (
          <div className="mt-4">
            <AIResponseDisplay 
              response={currentAIResponse.response || ''}
              error={currentAIResponse.error}
            />
          </div>
        )}
      </div>
    </div>
  );
};
