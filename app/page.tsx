import { BrainstormingSession } from './components/client/BrainstormingSession';
import { SessionManager } from './components/client/SessionManager';
import type { AIResponse } from './(server)/actions/processTranscript';
import { saveSession } from './(server)/actions/processTranscript';
import { getSessions } from './(server)/actions/getSessions';

export default async function Home() {
  async function handleTranscriptUpdate(audioData: Blob, aiResponse: AIResponse) {
    'use server';
    await saveSession(audioData, aiResponse.response);
  }

  const sessions = await getSessions();
  const formattedSessions = sessions.map(session => ({
    id: session.id,
    title: session.title,
    date: session.createdAt.toLocaleDateString(),
  }));

  return (
    <SessionManager sessions={formattedSessions}>
      <BrainstormingSession onTranscriptUpdate={handleTranscriptUpdate} />
    </SessionManager>
  );
}
