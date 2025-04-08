import { SessionRepository } from '@/app/(server)/db/session/repository';
import { NoteSession } from '@/app/components/client/NoteSession';
import { notFound } from 'next/navigation';

export default async function SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const repository = new SessionRepository();
  const session = await repository.findById(params.id);

  if (!session) {
    notFound();
  }

  return <NoteSession sessionId={session.id} initialData={session} />;
}
