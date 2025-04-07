import { SessionRepository } from '@/app/(server)/db/session/repository';
import { NoteSession } from '@/app/components/client/NoteSession';
import { notFound } from 'next/navigation';
import type { TranscriptionResult } from '@/app/(server)/actions/processTranscript';
import { saveSession } from '@/app/(server)/actions/processTranscript';

export default async function SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const repository = new SessionRepository();
  const session = await repository.findById(params.id);
  const handleTranscriptUpdate = async (audioData: Blob, transcription: TranscriptionResult) => {
    'use server';
    await saveSession(audioData, transcription.transcript);
  }
  if (!session) {
    notFound();
  }

  return <NoteSession sessionId={session.id} initialData={session} onTranscriptUpdate={handleTranscriptUpdate} />;
}
