'use client';

import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import { ImageData } from '@/types';
import { ImageGrid } from './ImageGrid';
import { MOCK_USER, MOCK_TIME } from '@/lib/constants';

interface ThreadsPostCardProps {
  images: ImageData[];
}

/**
 * Threads投稿カード（調査結果に基づく実装）
 * - 2カラムグリッド: 48px(avatar) + minmax(0, 1fr)(content)
 * - padding: 12px 24px（調査結果: ただしプレビューでは調整）
 * - アバター: 36px × 36px
 * - フォントサイズ: 15px
 */
export function ThreadsPostCard({ images }: ThreadsPostCardProps) {
  return (
    <div className="w-full border-b bg-card" style={{ borderBottomWidth: '0.625px' }}>
      {/* 投稿カード本体 */}
      <div className="px-4 py-3 md:px-6 md:py-3">
        {/* 2カラムグリッド: アバター列 + コンテンツ列 */}
        <div className="grid" style={{ gridTemplateColumns: '48px minmax(0px, 1fr)' }}>
          {/* アバター列 */}
          <div className="pt-1">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-600">
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                {MOCK_USER.displayName.charAt(0)}
              </div>
            </div>
          </div>

          {/* コンテンツ列 */}
          <div className="min-w-0">
            {/* ヘッダー: ユーザー名 + メニュー */}
            <div className="mb-1 flex items-start justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-semibold leading-[21px]">
                  {MOCK_USER.displayName}
                </span>
                {MOCK_USER.verified && (
                  <svg
                    className="h-3.5 w-3.5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] leading-[21px] text-muted-foreground">
                  {MOCK_TIME}
                </span>
                <button className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted/50">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 投稿テキスト（オプション） */}
            <div className="mb-2 text-[15px] leading-[21px]">
              投稿テキストがここに表示されます
            </div>

            {/* 画像カルーセル */}
            {images.length > 0 && (
              <div className="mb-1.5">
                <ImageGrid images={images} />
              </div>
            )}

            {/* 画像がない場合のプレースホルダー */}
            {images.length === 0 && (
              <div className="mb-1.5 flex h-[200px] items-center justify-center rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  画像をアップロードしてプレビュー
                </p>
              </div>
            )}

            {/* アクションバー */}
            <div className="-ml-2 mb-1.5 flex h-9 items-center">
              <button className="flex h-9 items-center gap-1.5 px-2 text-muted-foreground transition-colors hover:text-foreground">
                <Heart className="h-[18px] w-[18px]" />
              </button>
              <button className="flex h-9 items-center gap-1.5 px-2 text-muted-foreground transition-colors hover:text-foreground">
                <MessageCircle className="h-[18px] w-[18px]" />
              </button>
              <button className="flex h-9 items-center gap-1.5 px-2 text-muted-foreground transition-colors hover:text-foreground">
                <Repeat2 className="h-[18px] w-[18px]" />
              </button>
              <button className="flex h-9 items-center gap-1.5 px-2 text-muted-foreground transition-colors hover:text-foreground">
                <Send className="h-[18px] w-[18px]" />
              </button>
            </div>

            {/* エンゲージメント表示 */}
            <div className="text-[13px] leading-[18.2px] text-muted-foreground">
              123件のいいね · 45件のコメント
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
