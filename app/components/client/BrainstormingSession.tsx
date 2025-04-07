'use client';

import { useState } from 'react';
import { RecordingSection } from './RecordingSection';
import { ChatHistory, type ChatMessage } from '../molecules/ChatHistory';
import type { AIResponse } from '@/app/(server)/actions/processTranscript';

interface BrainstormingSessionProps {
  onTranscriptUpdate: (audioData: Blob, aiResponse: AIResponse) => Promise<void>;
}

export const BrainstormingSession = ({ onTranscriptUpdate }: BrainstormingSessionProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdate = async (audioData: Blob, aiResponse: AIResponse) => {
    try {
      setIsProcessing(true);
      
      // トランスクリプトとAI応答をメッセージリストに追加
      if (aiResponse.transcript) {
        setMessages(prev => [...prev, {
          type: 'transcript',
          content: aiResponse.transcript || '',
          timestamp: new Date()
        }]);
      }
      
      if (aiResponse.response) {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: aiResponse.response,
          timestamp: new Date()
        }]);
      }
      
      // データを保存
      await onTranscriptUpdate(audioData, aiResponse);
    } catch (error) {
      console.error('Error in handleUpdate:', error);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'データの処理中にエラーが発生しました。',
        timestamp: new Date()
      }]);
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

        {messages.length === 0 && !isProcessing && (
          <div className="text-center text-gray-500 mt-8">
            <p>Use voice input to brainstorm with AI.</p>
            <p>Click &ldquo;Start Recording&rdquo; to begin.</p>
          </div>
        )}

        <div className="mt-6">
          <ChatHistory 
            messages={messages}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};
