import { getSessionWithTranscripts } from '@/app/(server)/db/session';
import { NoteSession } from '@/app/components/client/NoteSession';
import { notFound } from 'next/navigation';

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSessionWithTranscripts(id);
  if (!session) {
    notFound();
  }

  return (
    <NoteSession session={session} />
  );
}
