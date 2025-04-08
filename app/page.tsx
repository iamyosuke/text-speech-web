import { NoteSession } from './components/client/NoteSession';
import { getSessionWithTranscripts } from './(server)/db/session';
import { SessionList } from './components/molecules/SessionList';
export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SessionList />
      <main className="ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <NoteSession session={null} />
        </div>
      </main>
    </div>
  );
}
