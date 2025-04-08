'use client';

import { useState, useEffect } from 'react';
import { RecordButton } from '../atoms/RecordButton';
import type { SessionWithTranscript } from '../../(server)/db/session/types';

interface NoteSessionProps {
  sessionId: string;
  initialData?: SessionWithTranscript;
}

export const NoteSession = ({ sessionId, initialData }: NoteSessionProps) => {
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    if (initialData?.transcripts) {
      setNotes(initialData.transcripts.map(t => t.content));
    } else {
      setNotes([]);
    }
  }, [initialData, sessionId]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Voice Note</h2>
        
        {notes.length === 0 && !isProcessing && (
          <div className="text-center text-gray-500 mb-8">
            <p>Use voice input to create notes.</p>
            <p>Click &quot;Start Recording&quot; to begin.</p>
          </div>
        )}

        <div className="mb-6 h-[400px] overflow-y-auto">
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                {note}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
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
          
          <div className="flex justify-center">
            <RecordButton 
              sessionId={sessionId}
              onNoteUpdate={(transcript) => {
                setNotes(prev => [...prev, transcript]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
