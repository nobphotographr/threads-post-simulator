'use client';

import Image from 'next/image';
import { ImageData } from '@/types';

interface ImageGridProps {
  images: ImageData[];
}

/**
 * Threads風の横スクロールカルーセル
 * - 高さ200px固定
 * - 縦長: 150px幅、横長: 266px幅
 * - border-radius: 12px
 * - 画像間: 6px、最後: 24px
 */
export function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) return null;

  // 画像の縦横比から幅を決定（Threadsの仕様に基づく）
  const getImageWidth = (image: ImageData): number => {
    const aspectRatio = image.width / image.height;

    // 縦長 (portrait, ≥1:1.33) → 150px
    if (aspectRatio <= 0.75) {
      return 150;
    }
    // 横長 (landscape, ≤1:0.75) → 266px
    if (aspectRatio >= 1.33) {
      return 266;
    }
    // 正方形に近い場合 → 200px
    return 200;
  };

  return (
    <div className="relative -ml-3 md:-ml-0">
      {/* カルーセルコンテナ */}
      <div className="flex h-[200px] flex-row flex-nowrap overflow-x-auto scrollbar-hide">
        {/* 先頭スペーサー（プロフィールアイコン分のオフセット） */}
        <div className="h-[200px] w-[72px] flex-shrink-0" />

        {/* 画像アイテム */}
        {images.map((image, index) => {
          const imageWidth = getImageWidth(image);
          const isLast = index === images.length - 1;

          return (
            <div
              key={image.id}
              className="flex-shrink-0"
              style={{
                paddingRight: isLast ? '24px' : '6px',
              }}
            >
              <div
                className="relative overflow-hidden rounded-xl"
                style={{
                  width: `${imageWidth}px`,
                  height: '200px',
                }}
              >
                <Image
                  src={image.url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes={`${imageWidth}px`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
