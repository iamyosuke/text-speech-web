import { NoteSession } from './components/client/NoteSession';
import { SessionList } from './components/molecules/SessionList';
import { redirect } from 'next/navigation';
export default async function Home() {
  redirect('/session');
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
