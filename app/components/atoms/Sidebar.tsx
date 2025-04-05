import { FC } from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 overflow-y-auto fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Sessions</h2>
        {children}
      </div>
    </aside>
  );
};
