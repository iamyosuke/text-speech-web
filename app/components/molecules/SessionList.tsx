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
      
      <div className="p-3">
        <SessionListItem
          title="New Project"
          date="Create a new project"
          isActive={activeSessionId === "new"}
          onClick={() => onSessionSelect("new")}
        />
        <SessionListItem
          title="Marketing Ideas"
          date="Apr 5, 2024"
          isActive={false}
          onClick={() => onSessionSelect("marketing")}
        />
        <SessionListItem
          title="Team Meeting"
          date="Apr 4, 2024"
          isActive={false}
          onClick={() => onSessionSelect("team")}
        />
        <SessionListItem
          title="Feature Planning"
          date="Apr 3, 2024"
          isActive={false}
          onClick={() => onSessionSelect("feature")}
        />
      </div>
      
      {sessions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No sessions yet</p>
        </div>
      )}
    </div>
  );
};
