'use client';
import { usePathname } from 'next/navigation';
import { Session } from '@/app/lib/type';
import Link from 'next/link';

export const SessionListItem = ({
  session,
}: {
  session: Session;
}) => {
  const pathname = usePathname();
  const isActive = pathname === `/session/${session.id}`;
  return (
    <Link
      href={`/session/${session.id}`}
      className={`w-full text-left p-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 border border-blue-200'
          : 'hover:bg-gray-100'
      }`}
    >
      <h3 className="font-medium text-gray-800 truncate">{session.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{session.createdAt.toLocaleDateString()}</p>
    </Link>
  );
};
