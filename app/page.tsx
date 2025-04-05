import { BrainstormingSession } from './components/client/BrainstormingSession';
import type { AIResponse } from './(server)/actions/processTranscript';
import { saveSession } from './(server)/actions/processTranscript';

export default function Home() {
  async function handleTranscriptUpdate(audioData: Blob, aiResponse: AIResponse) {
    'use server';
    
    // TODO: 後でデータベースに保存する実装を追加
    await saveSession(audioData, aiResponse.response);
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          音声ブレインストーミング
        </h1>
        
        <BrainstormingSession onTranscriptUpdate={handleTranscriptUpdate} />

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>音声入力を使用してAIとブレインストーミングを行えます。</p>
          <p>「録音開始」ボタンを押して話しかけてください。</p>
        </footer>
      </div>
    </main>
  );
}
