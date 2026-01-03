# Pomodoro Focus

集中力を高めるポモドーロタイマーアプリ。美しいUI/UXで生産性を最大化しましょう。

## 機能

- **ポモドーロテクニック**: 25分の集中 + 5分の休憩サイクル
- **カスタマイズ可能**: 集中時間、休憩時間を自由に設定
- **統計機能**: 今日の集中セッション数、合計時間を記録
- **ダークモード**: システム設定に連動した自動切り替え
- **PWA対応**: ホーム画面に追加してネイティブアプリのように使用可能
- **オフライン対応**: インターネット接続なしでも使用可能
- **通知音**: セッション終了時にお知らせ

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データ永続化**: LocalStorage

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番サーバーの起動
npm start
```

## 広告設定

広告収入を得るには、`src/components/features/AdBanner.tsx` の `GoogleAdBanner` コンポーネントを使用し、Google AdSenseのクライアントIDとスロットIDを設定してください。

```tsx
<GoogleAdBanner
  client="ca-pub-XXXXXXXXXXXXXXXX"
  slot="XXXXXXXXXX"
/>
```

## デプロイ

Vercelを使用して簡単にデプロイできます:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Y-Kanekoo/pomodoro-focus)

## ライセンス

MIT License
