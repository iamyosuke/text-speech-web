'use server'

import { SessionRepository } from "../db/session/repository";
import { SessionWithTranscript } from "../db/session/types";

export async function getSessions(): Promise<SessionWithTranscript[]> {
  const sessionRepo = new SessionRepository();
  return await sessionRepo.findAll();
}
