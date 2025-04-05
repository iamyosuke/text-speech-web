# 技術コンテキスト

## 技術スタック
### フロントエンド
- **Next.js** - Reactフレームワーク
  - App Router
  - Server Components（優先使用）
  - Client Components（音声認識機能用）
  - Server Actions（テキスト処理）

### バックエンド
- **Server Actions** - サーバーサイド処理
- **Web Speech API** - 音声認識
- **OpenAI API** - テキスト処理

### データ層
- **Drizzle ORM** - データベース操作
  - 型安全なクエリ構築
  - スキーマファーストアプローチ
  - マイグレーション管理

### フロントエンド型定義
```typescript
// アプリケーションの型定義
interface VoiceRecognitionState {
  isRecording: boolean;
  transcript: string;
  error: Error | null;
}

interface AIResponse {
  content: string;
  timestamp: string;
  sessionId: string;
}

// Web Speech API型定義拡張
interface CustomSpeechRecognition extends SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
}
```

## プロジェクト構成
```
app/
├── actions/              # Server Actions
│   └── processTranscript.ts
├── components/          # UIコンポーネント
│   ├── atoms/
│   │   └── RecordButton.tsx
│   ├── molecules/
│   │   ├── TranscriptDisplay.tsx
│   │   └── AIResponseDisplay.tsx
│   └── client/
│       └── RecordingSection.tsx
├── hooks/              # カスタムフック
│   └── useVoiceRecognition.ts
├── lib/               # ユーティリティ
│   └── session.ts
├── types/             # 型定義
│   └── webSpeechAPI.d.ts
└── db/               # データベース
    ├── index.ts
    └── schema.ts
```

## 開発要件
### 基本要件
- Node.js >= 18.x
- TypeScript 5.x（Strict Mode）
- ESLint + Prettier
- React 18.x
- Next.js 14.x

### 環境変数
```bash
# OpenAI
OPENAI_API_KEY=

# Database
DATABASE_URL=

# Application
NEXT_PUBLIC_APP_URL=
```

## API仕様
### Web Speech API
```typescript
// 音声認識フック
const useVoiceRecognition = () => {
  const [state, setState] = useState<VoiceRecognitionState>({
    isRecording: false,
    transcript: '',
    error: null
  });

  // 音声認識の初期化と制御
  const startRecording = () => {/* ... */};
  const stopRecording = () => {/* ... */};
  
  return { ...state, startRecording, stopRecording };
};
```

### Server Actions
```typescript
// テキスト処理アクション
export async function processTranscript(text: string): Promise<AIResponse> {
  // OpenAI APIを使用したテキスト処理
  // セッション管理
  // データ永続化
}
```

## データベーススキーマ
```sql
-- セッションテーブル
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- トランスクリプトテーブル
CREATE TABLE transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AIレスポンステーブル
CREATE TABLE ai_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transcript_id UUID REFERENCES transcripts(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## パフォーマンス要件
1. **音声認識**
   - レイテンシ: < 100ms
   - 認識精度: > 95%
   - メモリ使用: < 50MB

2. **AI処理**
   - 応答時間: < 2秒
   - 同時処理: 10リクエスト/秒
   - タイムアウト: 10秒

3. **UI/UX**
   - First Load: < 2秒
   - Time to Interactive: < 3秒
   - FPS: 60fps維持

## セキュリティ要件
1. **データ保護**
   - 音声データの一時的な保持のみ
   - テキストデータの暗号化保存
   - セッションデータの適切な破棄

2. **API保護**
   - レート制限の実装
   - APIキーのローテーション
   - リクエストの検証

3. **フロントエンド**
   - XSS対策
   - CSRF対策
   - Content Security Policy

## テスト要件
1. **ユニットテスト**
   - フックのテスト
   - ユーティリティ関数のテスト
   - コンポーネントのテスト

2. **統合テスト**
   - 音声認識フローのテスト
   - AI処理フローのテスト
   - データ永続化のテスト

3. **E2Eテスト**
   - ユーザーフローのテスト
   - エラーハンドリングのテスト
   - パフォーマンステスト

## デプロイメント
1. **開発環境**
   - ローカル開発サーバー
   - テストデータベース
   - モックAI応答

2. **ステージング環境**
   - 本番同等の設定
   - 完全なE2Eテスト
   - パフォーマンステスト

3. **本番環境**
   - スケーリング設定
   - モニタリング
   - バックアップ体制
