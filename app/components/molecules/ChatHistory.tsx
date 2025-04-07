import React from 'react';

export interface ChatMessage {
  type: 'transcript' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  isProcessing: boolean;
}

export const ChatHistory = ({ messages, isProcessing }: ChatHistoryProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.type === 'transcript' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              message.type === 'transcript'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p>{message.content}</p>
            <div className={`text-xs mt-2 ${
              message.type === 'transcript' ? 'text-blue-100' : 'text-gray-500'
            }`}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      {isProcessing && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg p-4 text-gray-500">
            Processing...
          </div>
        </div>
      )}
    </div>
  );
};
