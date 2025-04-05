'use client';
import { FC } from 'react';
import { Sidebar } from '../atoms/Sidebar';
import { SessionList } from './SessionList';

interface LayoutProps {
  children: React.ReactNode;
  sessions: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  activeSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
}

export const Layout: FC<LayoutProps> = ({
  children,
  sessions,
  activeSessionId,
  onSessionSelect,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar>
        <SessionList
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSessionSelect={onSessionSelect}
        />
      </Sidebar>
      
      <main className="ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
