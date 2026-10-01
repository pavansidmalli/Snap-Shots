import React, { useState, useEffect } from 'react';
import { useLogo } from '../context/LogoContext';
import { trimImagePadding } from '../utils/imageTrim';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  variant?: 'header' | 'footer' | 'default';
  showUploadIndicator?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imageClassName = '',
  textClassName = '',
  variant = 'header',
}) => {
  const { customLogoUrl, hasCustomLogo } = useLogo();
  const [optimizedLogoUrl, setOptimizedLogoUrl] = useState<string | null>(customLogoUrl);

  useEffect(() => {
    let isMounted = true;
    if (customLogoUrl) {
      setOptimizedLogoUrl(customLogoUrl);
      trimImagePadding(customLogoUrl).then((trimmed) => {
        if (isMounted && trimmed) {
          setOptimizedLogoUrl(trimmed);
        }
      });
    } else {
      setOptimizedLogoUrl(null);
    }
    return () => {
      isMounted = false;
    };
  }, [customLogoUrl]);

  // If a custom logo has been uploaded or configured, display it with strict aspect ratio preservation
  if (hasCustomLogo && (optimizedLogoUrl || customLogoUrl)) {
    const srcToUse = optimizedLogoUrl || customLogoUrl || '';
    const defaultImageClass =
      variant === 'header'
        ? 'h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[340px] md:max-w-[400px] object-contain block drop-shadow-lg transition-all duration-200'
        : 'h-12 sm:h-16 md:h-20 w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[360px] object-contain block';

    const isHeader = variant === 'header';

    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={srcToUse}
          alt="Snap Shots"
          className={`${defaultImageClass} ${imageClassName}`}
          style={{ imageRendering: 'auto' }}
          loading={isHeader ? 'eager' : 'lazy'}
          decoding="async"
          width={isHeader ? 360 : 300}
          height={isHeader ? 92 : 76}
        />
      </div>
    );
  }

  // DEFAULT LOGO:
  // If no custom logo has been uploaded, display:
  // SNAP SHOTS as the default text/logo
  const defaultTextClass =
    variant === 'header'
      ? 'text-xl sm:text-2xl md:text-3xl font-black tracking-wider uppercase text-white font-sans'
      : 'text-xl sm:text-2xl font-black tracking-wider uppercase text-white font-sans';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span className={`${defaultTextClass} ${textClassName}`}>
        SNAP <span className="text-[#bd1616]">SHOTS</span>
      </span>
    </div>
  );
};
