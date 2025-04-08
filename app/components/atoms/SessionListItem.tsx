"use client"

import { usePathname } from "next/navigation"
import type { Session } from "@/app/lib/type"
import Link from "next/link"

export const SessionListItem = ({
  session,
}: {
  session: Session
}) => {
  const pathname = usePathname()
  const isActive = pathname === `/session/${session.id}`

  return (
    <>
      <Link
        href={`/session/${session.id}`}
        className={`block w-full text-left p-3 rounded-lg transition-colors ${
          isActive ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-100"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        <h3 className="font-medium text-gray-800 truncate">{session.title}</h3>
        <p className="text-xs/3 text-gray-500 mt-1">
          {new Date(session.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </Link>
    </>
  )
}
