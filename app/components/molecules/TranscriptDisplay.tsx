import { FC } from 'react';


interface TranscriptDisplayProps {
  transcript: string;
  isProcessing?: boolean;
}

export const TranscriptDisplay: FC<TranscriptDisplayProps> = ({ transcript, isProcessing = false }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">文字起こし</h2>
        {isProcessing && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            処理中...
          </span>
        )}
      </div>
      <div className="min-h-[100px] p-3 bg-gray-50 rounded border border-gray-200">
        {transcript ? (
          <p className="whitespace-pre-wrap text-gray-800">{transcript}</p>
        ) : (
          <p className="text-gray-400 italic">ここに音声の文字起こしが表示されます</p>
        )}
      </div>
    </div>
  );
};
