# Threads投稿シミュレーター

複数画像のThreads投稿プレビューを確認できるツール。1-5枚の画像をアップロードして、Threadsでの表示を事前にチェックできます。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nobphotographr/threads-post-simulator)

## 機能

- **画像アップロード**: ドラッグ＆ドロップまたはファイル選択で最大5枚まで
- **プレビュー表示**: 実際のThreads UIに基づいた投稿カードで表示確認
- **横スクロールカルーセル**:
  - 実際のThreadsと同じ横スクロール形式
  - 画像の高さ200px固定、幅は縦横比で自動調整
  - 縦長画像: 150px幅、横長画像: 266px幅、正方形: 200px幅
- **ダークモード対応**: ライトモード/ダークモード切替
- **レスポンシブデザイン**: モバイル/デスクトップ表示切替

> 実装は Claude in Chrome による実際のThreads UI調査に基づいています

## 技術スタック

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **CSS**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Lucide React
- **Deployment**: Vercel

## 使い方

1. 画像をアップロード（ドラッグ＆ドロップまたはクリック）
2. 右側のプレビューで表示を確認
3. 必要に応じて画像の順序を変更（ドラッグ）
4. ダークモード/ライトモードを切り替え

## 開発

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

http://localhost:3000 にアクセス

### ビルド

```bash
npm run build
```

### デプロイ

このプロジェクトはVercelにデプロイされています。GitHubリポジトリと連携して自動デプロイが設定されています。

## 制限事項

- 最大ファイルサイズ: 10MB/枚
- 対応形式: JPEG, PNG, WebP
- 最大画像数: 5枚
- 画像はクライアント側のみで処理（サーバーに保存されません）

## ライセンス

MIT

## 作者

[@nobphotographr](https://github.com/nobphotographr)
