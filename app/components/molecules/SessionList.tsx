'use client';
import { FC } from 'react';
import { SessionListItem } from '../atoms/SessionListItem';

interface Session {
  id: string;
  title: string;
  date: string;
}

interface SessionListProps {
  sessions: Session[];
  activeSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
}

export const SessionList: FC<SessionListProps> = ({
  sessions,
  activeSessionId,
  onSessionSelect,
}) => {
  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <SessionListItem
          key={session.id}
          title={session.title}
          date={session.date}
          isActive={session.id === activeSessionId}
          onClick={() => onSessionSelect(session.id)}
        />
      ))}
      
      {sessions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No sessions yet</p>
        </div>
      )}
    </div>
  );
};
