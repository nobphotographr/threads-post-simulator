'use client';

import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import { ImageData } from '@/types';
import { ImageGrid } from './ImageGrid';
import { MOCK_USER, MOCK_TIME } from '@/lib/constants';

interface ThreadsPostCardProps {
  images: ImageData[];
}

export function ThreadsPostCard({ images }: ThreadsPostCardProps) {
  return (
    <div className="w-full rounded-2xl border bg-card">
      {/* プロフィールヘッダー */}
      <div className="flex items-center gap-2.5 p-3 pb-2.5 md:gap-3 md:p-4 md:pb-3">
        {/* アバター */}
        <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-600 md:h-9 md:w-9">
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
            {MOCK_USER.displayName.charAt(0)}
          </div>
        </div>

        {/* ユーザー情報 */}
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">
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
          <div className="text-xs text-muted-foreground">{MOCK_TIME}</div>
        </div>

        {/* メニューボタン */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted">
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      {/* 画像グリッド */}
      {images.length > 0 && (
        <div className="px-3 pb-2.5 md:px-4 md:pb-3">
          <ImageGrid images={images} />
        </div>
      )}

      {/* 画像がない場合のプレースホルダー */}
      {images.length === 0 && (
        <div className="mx-3 mb-2.5 flex aspect-square items-center justify-center rounded-lg bg-muted/50 md:mx-4 md:mb-3">
          <p className="text-sm text-muted-foreground">
            画像をアップロードしてプレビュー
          </p>
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex items-center gap-3 px-3 pb-1.5 md:gap-4 md:px-4 md:pb-2">
        <button className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <Heart className="h-5 w-5" />
        </button>
        <button className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <MessageCircle className="h-5 w-5" />
        </button>
        <button className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <Repeat2 className="h-5 w-5" />
        </button>
        <button className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <Send className="h-5 w-5" />
        </button>
      </div>

      {/* エンゲージメント表示 */}
      <div className="px-3 pb-3 md:px-4 md:pb-4">
        <p className="text-xs text-muted-foreground">
          123件のいいね · 45件のコメント
        </p>
      </div>
    </div>
  );
}
