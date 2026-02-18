// 画像アップロード制限
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_IMAGES = 5;
export const MAX_IMAGE_DIMENSION = 4096; // 4096x4096px
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Threadsモック情報
export const MOCK_USER = {
  username: 'username',
  displayName: 'ユーザー名',
  avatar: '/avatar-placeholder.svg',
  verified: false,
};

// 時間表示
export const MOCK_TIME = '1時間前';
