import { eq, asc } from 'drizzle-orm';
import { sessions, transcripts } from '@/app/db/schema';
import type { CreateSessionParams, SessionData, SessionWithTranscript } from './types';
import db from '@/app/db';

export class SessionRepository {
  async create(data: CreateSessionParams): Promise<SessionData> {
    const now = new Date();
    const result = await db.insert(sessions).values({
      ...data,
      createdAt: now,
      updatedAt: now,
    }).returning();

    return result[0];
  }

  async findById(id: string): Promise<SessionWithTranscript | null> {
    const session = await db
      .select({
        id: sessions.id,
        title: sessions.title,
        createdAt: sessions.createdAt,
        updatedAt: sessions.updatedAt
      })
      .from(sessions)
      .where(eq(sessions.id, id))
      .limit(1);

    if (!session[0]) return null;

    const sessionTranscripts = await db
      .select({
        id: transcripts.id,
        sessionId: transcripts.sessionId,
        content: transcripts.content,
        createdAt: transcripts.createdAt,
        updatedAt: transcripts.updatedAt
      })
      .from(transcripts)
      .where(eq(transcripts.sessionId, id))
      .orderBy(asc(transcripts.createdAt));

    return {
      ...session[0],
      transcripts: sessionTranscripts
    };
  }

  async updateTitle(id: string, title: string): Promise<void> {
    await db
      .update(sessions)
      .set({ 
        title,
        updatedAt: new Date()
      })
      .where(eq(sessions.id, id));
  }

  async findAll(): Promise<SessionWithTranscript[]> {
    const allSessions = await db
      .select({
        id: sessions.id,
        title: sessions.title,
        createdAt: sessions.createdAt,
        updatedAt: sessions.updatedAt
      })
      .from(sessions)
      .orderBy(asc(sessions.createdAt));

    const sessionsWithTranscripts = await Promise.all(
      allSessions.map(async (session) => {
        const sessionTranscripts = await db
          .select({
            id: transcripts.id,
            sessionId: transcripts.sessionId,
            content: transcripts.content,
            analysis: transcripts.analysis,
            createdAt: transcripts.createdAt,
            updatedAt: transcripts.updatedAt
          })
          .from(transcripts)
          .where(eq(transcripts.sessionId, session.id))
          .orderBy(asc(transcripts.createdAt));

        return {
          ...session,
          transcripts: sessionTranscripts
        };
      })
    );

    return sessionsWithTranscripts;
  }
}
