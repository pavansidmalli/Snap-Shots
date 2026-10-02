import React, { useState } from 'react';
import { useLogo } from '../context/LogoContext';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: 'header' | 'footer' | 'default';
  allowUpload?: boolean;
}

const STORAGE_KEY_CROP_Y = 'snapshots_logo_crop_y';

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imageClassName = '',
  variant = 'header',
}) => {
  const { customLogoUrl } = useLogo();
  const displayLogo = customLogoUrl || '/snapshots-logo.svg';

  const [verticalCropPercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CROP_Y);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 50) return parsed;
      }
    } catch {}
    return 18;
  });

  const isHeader = variant === 'header';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <div className="relative flex items-center justify-center text-center mx-auto w-full">
        {/* Top and Bottom Cropped Container for Snap Shots Brand Logo */}
        <div className="relative overflow-hidden flex items-center justify-center mx-auto text-center">
          <img
            src={displayLogo}
            alt="Snap Shots"
            style={{
              clipPath:
                verticalCropPercent > 0
                  ? `inset(${verticalCropPercent}% 0 ${verticalCropPercent}% 0)`
                  : 'none',
              transform:
                verticalCropPercent > 0
                  ? `scale(${1 + (verticalCropPercent * 1.5) / 100})`
                  : 'none',
            }}
            className={`${
              isHeader
                ? 'h-18 sm:h-22 md:h-26 lg:h-32 w-auto max-w-[360px] sm:max-w-[460px] md:max-w-[560px]'
                : 'h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[320px] sm:max-w-[420px] md:max-w-[500px]'
            } object-contain object-center mx-auto block drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transition-all duration-200 group-hover:scale-[1.02] ${imageClassName}`}
            loading={isHeader ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
