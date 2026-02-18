'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ImageUploader } from '@/components/ImageUploader';
import { ThreadsPostCard } from '@/components/ThreadsPostCard';
import { ImageData, ViewMode } from '@/types';

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* 左カラム: 画像アップローダー */}
          <div className="space-y-4 md:space-y-6">
            <div className="rounded-lg border bg-card p-4 md:p-6">
              <h2 className="mb-4 text-xl font-semibold">画像をアップロード</h2>
              <ImageUploader images={images} onImagesChange={setImages} />
            </div>

            {/* コントロールパネル */}
            <div className="rounded-lg border bg-card p-4 md:p-6">
              <h3 className="mb-4 text-lg font-semibold">表示設定</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">表示モード</label>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setViewMode('mobile')}
                      className={`rounded-md px-4 py-2 text-sm font-medium ${
                        viewMode === 'mobile'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      モバイル
                    </button>
                    <button
                      onClick={() => setViewMode('desktop')}
                      className={`rounded-md px-4 py-2 text-sm font-medium ${
                        viewMode === 'desktop'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      デスクトップ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右カラム: Threads投稿プレビュー */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <div className="rounded-lg border bg-card p-4 md:p-6">
              <h2 className="mb-4 text-xl font-semibold">プレビュー</h2>
              <div
                className={`mx-auto ${
                  viewMode === 'mobile' ? 'max-w-[480px]' : 'max-w-full'
                }`}
              >
                <ThreadsPostCard images={images} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
