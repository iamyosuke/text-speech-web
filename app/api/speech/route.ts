import { NextResponse } from 'next/server';
import { TranscriptionService } from '@/app/(server)/services/audio/transcriptionService';
import { AudioProcessor } from '@/app/(server)/services/audio/audioProcessor';
import { TranscriptRepository } from '@/app/(server)/db/transcript/repository';
import { SessionRepository } from '@/app/(server)/db/session/repository';

export async function POST(request: Request) {
  try {
    const audioBlob = await request.blob();
    
    // サービスとリポジトリのインスタンス化
    const audioProcessor = new AudioProcessor();
    const transcriptRepo = new TranscriptRepository();
    const sessionRepo = new SessionRepository();
    
    // トランスクリプションサービスの初期化と実行
    const transcriptionService = new TranscriptionService(
      audioProcessor,
      transcriptRepo,
      sessionRepo
    );
    
    const result = await transcriptionService.processAudio(audioBlob);
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error processing speech:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '音声処理中にエラーが発生しました' 
      },
      { status: 500 }
    );
  }
}

// GET リクエストは許可しない
export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}
