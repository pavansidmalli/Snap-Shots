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
                ? 'h-9 xs:h-10 sm:h-16 md:h-22 lg:h-28 w-auto max-w-[130px] xs:max-w-[155px] sm:max-w-[340px] md:max-w-[480px]'
                : 'h-8 sm:h-14 md:h-20 lg:h-26 w-auto max-w-[120px] sm:max-w-[300px] md:max-w-[420px]'
            } object-contain object-center mx-auto block drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-all duration-200 group-hover:scale-[1.02] ${imageClassName}`}
            loading={isHeader ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
