import { getSessionWithTranscripts } from '@/app/(server)/db/session';
import { NoteSession } from '@/app/components/client/NoteSession';
import { SessionList } from '@/app/components/molecules/SessionList';
import { notFound } from 'next/navigation';

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSessionWithTranscripts(id);
  if (!session) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <SessionList />
      <main className="ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <NoteSession session={session} />
        </div>
      </main>
    </div>
  );
}
