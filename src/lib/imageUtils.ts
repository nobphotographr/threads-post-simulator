import { ImageData } from '@/types';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from './constants';

export const loadImage = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          id: crypto.randomUUID(),
          url: e.target?.result as string,
          file: file,
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
    reader.readAsDataURL(file);
  });
};

export const validateImage = (file: File): string | null => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return '対応していないファイル形式です（JPEG, PNG, WebPのみ）';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'ファイルサイズが大きすぎます（最大10MB）';
  }
  return null;
};

export const revokeImageUrl = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};
