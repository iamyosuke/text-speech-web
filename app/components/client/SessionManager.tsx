'use client';

import { FC, useState } from 'react';
import { Layout } from '../molecules/Layout';
import { useRouter } from 'next/navigation';

interface Session {
  id: string;
  title: string;
  date: string;
}

interface SessionManagerProps {
  sessions: Session[];
  initialSessionId?: string;
  children: React.ReactNode;
}

export const SessionManager: FC<SessionManagerProps> = ({ 
  sessions, 
  initialSessionId,
  children 
}) => {
  const router = useRouter();
  const [activeSessionId, setActiveSessionId] = useState<string>(
    initialSessionId || (sessions[0]?.id || '1')
  );
  const handleSessionSelect = (id: string) => {
    setActiveSessionId(id);
    router.push(`/session/${id}`);
  };

  return (
    <Layout
      sessions={sessions}
      activeSessionId={activeSessionId}
      onSessionSelect={handleSessionSelect}
    >
      {children}
    </Layout>
  );
};
