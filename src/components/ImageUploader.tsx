'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, X, GripVertical } from 'lucide-react';
import { ImageData } from '@/types';
import { loadImage, validateImage, revokeImageUrl } from '@/lib/imageUtils';
import { MAX_IMAGES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploaderProps {
  images: ImageData[];
  onImagesChange: (images: ImageData[]) => void;
}

export function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draggedIndexRef = useRef<number | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setError(null);

      const remainingSlots = MAX_IMAGES - images.length;
      if (remainingSlots === 0) {
        setError(`最大${MAX_IMAGES}枚までアップロードできます`);
        return;
      }

      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      const newImages: ImageData[] = [];

      for (const file of filesToProcess) {
        const validationError = validateImage(file);
        if (validationError) {
          setError(validationError);
          continue;
        }

        try {
          const imageData = await loadImage(file);
          newImages.push(imageData);
        } catch (err) {
          setError(err instanceof Error ? err.message : '画像の読み込みに失敗しました');
        }
      }

      if (newImages.length > 0) {
        onImagesChange([...images, ...newImages]);
      }
    },
    [images, onImagesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFiles]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const imageToRemove = images.find((img) => img.id === id);
      if (imageToRemove) {
        revokeImageUrl(imageToRemove.url);
      }
      onImagesChange(images.filter((img) => img.id !== id));
      setError(null);
    },
    [images, onImagesChange]
  );

  const handleDragStart = useCallback((index: number) => {
    draggedIndexRef.current = index;
  }, []);

  const handleDragEnd = useCallback(() => {
    draggedIndexRef.current = null;
  }, []);

  const handleDragOverThumbnail = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();

      if (draggedIndexRef.current === null || draggedIndexRef.current === targetIndex) {
        return;
      }

      const newImages = [...images];
      const draggedImage = newImages[draggedIndexRef.current];
      newImages.splice(draggedIndexRef.current, 1);
      newImages.splice(targetIndex, 0, draggedImage);

      draggedIndexRef.current = targetIndex;
      onImagesChange(newImages);
    },
    [images, onImagesChange]
  );

  return (
    <div className="space-y-4">
      {/* ドロップゾーン */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors md:h-64 ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/25 bg-muted/50 hover:border-muted-foreground/50'
        }`}
      >
        <Upload className="mb-3 h-10 w-10 text-muted-foreground md:mb-4 md:h-12 md:w-12" />
        <p className="text-xs font-medium text-foreground md:text-sm">
          クリックまたはドラッグ＆ドロップ
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground md:mt-2">
          JPEG, PNG, WebP（最大10MB）
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          最大{MAX_IMAGES}枚まで（残り: {MAX_IMAGES - images.length}枚）
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* エラー表示 */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* サムネイルプレビュー */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            アップロード済み（{images.length}枚）
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOverThumbnail(e, index)}
                className="group relative aspect-square cursor-move overflow-hidden rounded-lg border bg-muted"
              >
                <Image
                  src={image.url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />

                {/* ドラッグハンドル */}
                <div className="absolute left-2 top-2 rounded bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVertical className="h-4 w-4 text-white" />
                </div>

                {/* 削除ボタン */}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleRemove(image.id)}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* インデックス表示 */}
                <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
