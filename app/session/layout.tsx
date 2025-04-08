import { SessionList } from '../components/molecules/SessionList';
export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <SessionList />
      <main className="ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
