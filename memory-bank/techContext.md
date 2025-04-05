# 技術コンテキスト

## 開発環境
1. 必要なツール
   - Node.js v20.x以上
   - npm v10.x以上
   - Git
   - VSCode（推奨）

2. VSCode推奨拡張機能
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin
   - Error Lens

## プロジェクト依存関係
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "tailwindcss": "3.x",
    "@tanstack/react-query": "5.x",
    "@supabase/supabase-js": "2.x",
    "zod": "3.x",
    "openai": "4.x"
  },
  "devDependencies": {
    "typescript": "5.x",
    "@types/react": "18.x",
    "@types/node": "20.x",
    "eslint": "8.x",
    "prettier": "3.x",
    "@typescript-eslint/eslint-plugin": "6.x",
    "@typescript-eslint/parser": "6.x"
  }
}
```

## 外部サービス連携
1. OpenAI API
   - Whisper API: 音声→テキスト変換
   - GPT-4 API: AI対話処理
   - 環境変数: OPENAI_API_KEY

2. Supabase
   - Database: PostgreSQL
   - Real-time subscriptions
   - 環境変数:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
     - SUPABASE_SERVICE_ROLE_KEY

## インフラストラクチャ
1. 開発環境
   - ローカル開発サーバー
   - Supabase Localプロジェクト

2. 本番環境（将来）
   - Vercel（Next.js）
   - Supabase Cloud
   - 独自ドメイン

## 技術的制約
1. ブラウザ対応
   - Chrome最新版
   - Safari最新版
   - Firefox最新版
   - Edge最新版

2. 音声入力
   - MediaRecorder API対応
   - WebSocket接続
   - マイク権限要求

3. パフォーマンス目標
   - 初期読み込み: 2秒以内
   - 音声認識: 3秒以内
   - AIレスポンス: 5秒以内

## 開発プラクティス
1. コーディング規約
   ```typescript
   // ファイル命名
   components/
     Button.tsx      // コンポーネント
     useAuth.ts      // カスタムフック
     types.ts        // 型定義
   
   // インポート順序
   import React from 'react'      // React/Next
   import { useQuery } from '...' // サードパーティ
   import { Button } from '@/...' // 内部モジュール
   ```

2. ブランチ戦略
   - main: 本番環境
   - develop: 開発環境
   - feature/*: 機能開発
   - fix/*: バグ修正

3. コミットメッセージ
   ```
   feat: 新機能追加
   fix: バグ修正
   docs: ドキュメント
   style: スタイル調整
   refactor: リファクタリング
   test: テスト関連
   chore: その他
   ```

## テスト戦略
1. ユニットテスト
   - Jest
   - React Testing Library
   - MSW（APIモック）

2. E2Eテスト（将来）
   - Playwright
   - テストシナリオ
   - CI/CD統合

## モニタリング（将来）
1. エラー追跡
   - Sentry
   - エラーレポート
   - パフォーマンス計測

2. アナリティクス
   - Google Analytics
   - ユーザー行動分析
   - コンバージョン計測
