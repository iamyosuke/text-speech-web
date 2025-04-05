import { FC } from 'react';

interface SessionListItemProps {
  title: string;
  date: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SessionListItem: FC<SessionListItemProps> = ({
  title,
  date,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 border border-blue-200'
          : 'hover:bg-gray-100'
      }`}
    >
      <h3 className="font-medium text-gray-800 truncate">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{date}</p>
    </button>
  );
};
