'server only'
import { CreateSession } from "@/app/lib/type";
import db from "@/app/db";
import { eq } from "drizzle-orm";
import { sessions } from "@/app/db/schema";
export async function createSession(data: CreateSession) {
  const session = await db.insert(sessions).values({
    ...data,
  }).returning();
  return session[0];
}

export async function getSessionWithTranscripts(id: string) {
  const session = await db.query.sessions.findFirst({
    with: {
      transcripts: true,
    },
    where: eq(sessions.id, id),
  });
  return session;
}

export async function getSessions() {
  const allSessions = await db.select().from(sessions);
  return allSessions;
}

