import { SessionManager } from './components/client/SessionManager';
import { getSessions } from './(server)/actions/getSessions';
import { NoteSession } from './components/client/NoteSession';

export default async function Home() {
  const sessions = await getSessions();
  const formattedSessions = sessions.map(session => ({
    id: session.id,
    title: session.title,
    date: session.createdAt.toLocaleDateString(),
  }));

  return (
    <SessionManager sessions={formattedSessions}>
      <NoteSession sessionId="" />
    </SessionManager>
  );
}
