import db  from '@/app/db';
import { sessions } from '@/app/db/schema';
import { CreateSession } from '@/app/lib/type';

export async function createSession(data: CreateSession) {
  const session = await db.insert(sessions).values({
    ...data,
  });
  return session;
}
