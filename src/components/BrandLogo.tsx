import React from 'react';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: 'header' | 'footer' | 'default';
  allowUpload?: boolean;
  lightBackground?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imageClassName = '',
  variant = 'header',
  lightBackground = false,
}) => {
  const isHeader = variant === 'header';
  const displayLogoUrl = lightBackground ? '/snapshots-logo-dark.svg' : '/snapshots-logo.svg';

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative group inline-flex items-center justify-start shrink-0">
        <img
          src={displayLogoUrl}
          alt="Snap Shots"
          width={160}
          height={42}
          loading="eager"
          decoding="sync"
          className={`${
            isHeader
              ? 'w-[135px] min-[380px]:w-[155px] sm:w-[175px] md:w-[195px] h-auto max-h-[44px] min-h-[32px] aspect-[500/130]'
              : 'w-[130px] sm:w-[155px] md:w-[175px] h-auto max-h-[42px] aspect-[500/130]'
          } object-contain object-left block transition-all duration-200 ${
            lightBackground ? '' : 'filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
          } ${imageClassName}`}
        />
      </div>
    </div>
  );
};
