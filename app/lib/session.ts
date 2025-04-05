'use server';

import { cookies } from 'next/headers';

interface SessionData {
  transcript: string;
  aiResponse: string;
  createdAt: string;
}

export async function getSessionData(): Promise<SessionData | null> {
  const cookieStore = cookies();
  const sessionData = cookieStore.get('session-data')?.value;
  if (!sessionData) return null;
  
  try {
    return JSON.parse(sessionData);
  } catch {
    return null;
  }
}

export async function updateSessionData(data: Omit<SessionData, 'createdAt'>) {
  const cookieStore = cookies();
  const sessionData: SessionData = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  cookieStore.set('session-data', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24時間
  });

  return sessionData;
}

export async function clearSessionData() {
  const cookieStore = cookies();
  cookieStore.delete('session-data');
}
