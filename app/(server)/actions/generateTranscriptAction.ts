'use server'

import { processAudio } from '../services/audio/transcriptionService'
import { revalidatePath } from 'next/cache'

export async function generateTranscriptAction(audioBlob: Blob, sessionId: string) {
  const transcription = await processAudio(audioBlob, sessionId)
  
  // リバリデートを行う
  revalidatePath(`/session/${sessionId}`)

  return transcription
}