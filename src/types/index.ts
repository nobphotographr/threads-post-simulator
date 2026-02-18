export interface ImageData {
  id: string;
  url: string; // Data URL
  file: File;
  width: number;
  height: number;
}

export type ViewMode = 'mobile' | 'desktop';
