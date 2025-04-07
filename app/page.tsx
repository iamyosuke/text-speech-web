import { NoteSession } from './components/client/NoteSession';
import { SessionManager } from './components/client/SessionManager';
import type { TranscriptionResult } from './(server)/actions/processTranscript';
import { saveSession } from './(server)/actions/processTranscript';
import { getSessions } from './(server)/actions/getSessions';

export default async function Home() {
  async function handleTranscriptUpdate(audioData: Blob, transcription: TranscriptionResult) {
    'use server';
    await saveSession(audioData, transcription.transcript);
  }

  const sessions = await getSessions();
  const formattedSessions = sessions.map(session => ({
    id: session.id,
    title: session.title,
    date: session.createdAt.toLocaleDateString(),
  }));

  return (
    <SessionManager sessions={formattedSessions}>
      <NoteSession onTranscriptUpdate={handleTranscriptUpdate} />
    </SessionManager>
  );
}
