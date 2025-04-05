import { BrainstormingSession } from './components/client/BrainstormingSession';
import { SessionManager } from './components/client/SessionManager';
import type { AIResponse } from './(server)/actions/processTranscript';
import { saveSession } from './(server)/actions/processTranscript';

export default function Home() {
  async function handleTranscriptUpdate(audioData: Blob, aiResponse: AIResponse) {
    'use server';
    await saveSession(audioData, aiResponse.response);
  }

  // Note: This is a temporary mock data. In real implementation, 
  // this would come from your database
  const mockSessions = [
    {
      id: '1',
      title: 'First Brainstorming Session',
      date: '2024-04-06',
    },
    {
      id: '2',
      title: 'Product Ideas Discussion',
      date: '2024-04-05',
    },
  ];

  return (
    <SessionManager sessions={mockSessions}>
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
        Voice Brainstorming
      </h1>
      
      <BrainstormingSession onTranscriptUpdate={handleTranscriptUpdate} />

      <footer className="mt-12 text-sm text-gray-500">
        <p>Use voice input to brainstorm with AI.</p>
        <p>Click &quot;Start Recording&quot; to begin.</p>
      </footer>
    </SessionManager>
  );
}
