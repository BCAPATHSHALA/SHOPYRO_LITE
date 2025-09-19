'use client';

import { useProductImages, useSelectedVariant } from '@/components/products/variant-selector';
import { Product } from '@/lib/shopify/types';
import Image from 'next/image';
import { useState } from 'react';

export const DesktopGallery = ({ product }: { product: Product }) => {
  const selectedVariant = useSelectedVariant(product);
  const images = useProductImages(product, selectedVariant?.selectedOptions);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const thumbKey = (url?: string, options?: { name: string; value: string }[]) =>
    `${url}-${options?.map(o => `${o.name},${o.value}`).join('-')}`;

  if (!activeImage) return null;

  return (
    <div className="grid grid-rows-[auto,auto] gap-4 p-4">
      <div className="relative">
        <Image
          style={{
            aspectRatio: `${activeImage.width} / ${activeImage.height}`,
          }}
          key={thumbKey(activeImage.url, activeImage.selectedOptions)}
          src={activeImage.url}
          alt={activeImage.altText}
          width={activeImage.width}
          height={activeImage.height}
          className="w-full object-cover rounded-md"
          quality={100}
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-3">
          {images.map((img, index) => (
            <button
              key={thumbKey(img.url, img.selectedOptions)}
              aria-label={`View image ${index + 1}`}
              className={`relative overflow-hidden rounded-md border ${
                index === activeIndex ? 'border-foreground' : 'border-transparent opacity-80'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={img.url}
                alt={img.altText}
                width={img.width}
                height={img.height}
                className="w-full h-16 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
