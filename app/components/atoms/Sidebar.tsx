import { FC } from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-3">Brainstorming App</h2>
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">Sessions</h3>
          {children}
        </div>
        <div className="mt-4">
          <button className="w-full flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Session
          </button>
        </div>
      </div>
    </aside>
  );
};
