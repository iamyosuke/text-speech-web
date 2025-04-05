'use client';

import { FC } from 'react';
import { Layout } from '../molecules/Layout';

interface Session {
  id: string;
  title: string;
  date: string;
}

interface SessionManagerProps {
  sessions: Session[];
  children: React.ReactNode;
}

export const SessionManager: FC<SessionManagerProps> = ({ sessions, children }) => {
  return (
    <Layout
      sessions={sessions}
      activeSessionId="1"
      onSessionSelect={(id) => {
        // This will be implemented later with real navigation
        console.log('Selected session:', id);
      }}
    >
      {children}
    </Layout>
  );
};
