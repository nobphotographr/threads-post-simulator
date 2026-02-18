'use client';

import Image from 'next/image';
import { ImageData } from '@/types';

interface ImageGridProps {
  images: ImageData[];
}

export function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) return null;

  const renderSingleImage = () => (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <Image
        src={images[0].url}
        alt="Upload 1"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const renderTwoImages = () => (
    <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
      {images.slice(0, 2).map((image, index) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={image.url}
            alt={`Upload ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );

  const renderThreeImages = () => (
    <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
      {/* 左側: 1枚目（縦長、2行分） */}
      <div className="relative row-span-2 aspect-square">
        <Image
          src={images[0].url}
          alt="Upload 1"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      {/* 右側: 2-3枚目（正方形、上下） */}
      {images.slice(1, 3).map((image, index) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={image.url}
            alt={`Upload ${index + 2}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );

  const renderFourImages = () => (
    <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
      {images.slice(0, 4).map((image, index) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={image.url}
            alt={`Upload ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );

  const renderFiveImages = () => (
    <div className="space-y-0.5 overflow-hidden rounded-lg">
      {/* 上段: 2枚 */}
      <div className="grid grid-cols-2 gap-0.5">
        {images.slice(0, 2).map((image, index) => (
          <div key={image.id} className="relative aspect-square">
            <Image
              src={image.url}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
      {/* 下段: 3枚 */}
      <div className="grid grid-cols-3 gap-0.5">
        {images.slice(2, 5).map((image, index) => (
          <div key={image.id} className="relative aspect-square">
            <Image
              src={image.url}
              alt={`Upload ${index + 3}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
          </div>
        ))}
      </div>
    </div>
  );

  switch (images.length) {
    case 1:
      return renderSingleImage();
    case 2:
      return renderTwoImages();
    case 3:
      return renderThreeImages();
    case 4:
      return renderFourImages();
    default:
      return renderFiveImages();
  }
}
