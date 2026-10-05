import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Eye } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ReelWorkItem } from '../types';
import { getResponsiveImageSrcSet } from '../utils/imageUtils';

interface PortfolioProps {
  onSelectReel: (reel: ReelWorkItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectReel }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredReels = siteConfig.portfolioReels;
  const totalSlides = filteredReels.length;

  const handleNext = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-scroll effect: advances slides every 3.5 seconds when not hovered/touched
  useEffect(() => {
    if (isHovered || totalSlides <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, totalSlides, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsHovered(false);
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    setTouchStartX(null);
  };

  return (
    <div id="work" className="bg-transparent pt-4 sm:pt-6 pb-6 sm:pb-8 relative overflow-hidden select-none">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3D-Feel Carousel / Image Slides Stage (5 visible slides with equal-sized side cards) */}
        <div
          className="relative h-[440px] min-[390px]:h-[480px] sm:h-[530px] md:h-[560px] max-w-5xl lg:max-w-6xl mx-auto flex items-center justify-center overflow-hidden sm:overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {filteredReels.map((reel, index) => {
            // Compute relative offset (-2, -1, 0, 1, 2)
            let diff = index - activeIndex;
            if (diff > totalSlides / 2) diff -= totalSlides;
            if (diff < -totalSlides / 2) diff += totalSlides;

            const isCenter = diff === 0;
            const isAdjacentLeft = diff === -1;
            const isAdjacentRight = diff === 1;
            const isFarLeft = diff === -2;
            const isFarRight = diff === 2;

            // Show 5 slides: center + 2 equal-sized divs on left + 2 equal-sized divs on right
            if (Math.abs(diff) > 2) {
              return null;
            }

            return (
              <div
                key={reel.id}
                onClick={() => {
                  if (isCenter) {
                    onSelectReel(reel);
                  } else if (isAdjacentLeft) {
                    handlePrev();
                  } else if (isAdjacentRight) {
                    handleNext();
                  } else if (isFarLeft) {
                    setActiveIndex((prev) => (prev - 2 + totalSlides) % totalSlides);
                  } else if (isFarRight) {
                    setActiveIndex((prev) => (prev + 2) % totalSlides);
                  }
                }}
                className={`absolute transition-all duration-500 ease-out will-change-transform cursor-pointer ${
                  isCenter
                    ? 'z-30 w-[240px] min-[390px]:w-[265px] sm:w-[290px] md:w-[320px] aspect-[9/16] rounded-[26px] sm:rounded-[34px] overflow-hidden bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(189,22,22,0.3)] border-2 border-zinc-700/80 hover:border-[#bd1616] scale-100 translate-x-0 opacity-100 group'
                    : isAdjacentLeft
                    ? 'z-20 w-[205px] min-[390px]:w-[225px] sm:w-[245px] md:w-[275px] aspect-[9/16] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-zinc-950 shadow-xl border border-zinc-800/80 -translate-x-[140px] min-[390px]:-translate-x-[160px] sm:-translate-x-[200px] md:-translate-x-[240px] scale-[0.88] opacity-80 hover:opacity-95'
                    : isAdjacentRight
                    ? 'z-20 w-[205px] min-[390px]:w-[225px] sm:w-[245px] md:w-[275px] aspect-[9/16] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-zinc-950 shadow-xl border border-zinc-800/80 translate-x-[140px] min-[390px]:translate-x-[160px] sm:translate-x-[200px] md:translate-x-[240px] scale-[0.88] opacity-80 hover:opacity-95'
                    : isFarLeft
                    ? 'z-10 w-[175px] min-[390px]:w-[190px] sm:w-[210px] md:w-[235px] aspect-[9/16] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-zinc-950 shadow-lg border border-zinc-800/60 -translate-x-[250px] min-[390px]:-translate-x-[280px] sm:-translate-x-[360px] md:-translate-x-[430px] scale-[0.76] opacity-50 hover:opacity-75'
                    : 'z-10 w-[175px] min-[390px]:w-[190px] sm:w-[210px] md:w-[235px] aspect-[9/16] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-zinc-950 shadow-lg border border-zinc-800/60 translate-x-[250px] min-[390px]:translate-x-[280px] sm:translate-x-[360px] md:translate-x-[430px] scale-[0.76] opacity-50 hover:opacity-75'
                }`}
              >
                {/* 9:16 Vertical Image Poster */}
                <img
                  src={reel.posterUrl}
                  srcSet={getResponsiveImageSrcSet(reel.posterUrl, [320, 480, 640, 800])}
                  sizes="(max-width: 640px) 280px, 340px"
                  alt={reel.title}
                  loading={isCenter ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient Soft Top & Bottom Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none" />

                {/* Subtle Brand Watermark (matching screenshot's top watermark) */}
                <div className="absolute top-3 right-3 z-20 pointer-events-none">
                  <span className="text-[10px] font-black tracking-widest text-white/90 drop-shadow-md">
                    SNAP SHOTS
                  </span>
                </div>

                {/* Center Play Button (reveals prominently on center slide) */}
                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#bd1616]/90 text-white shadow-2xl backdrop-blur-xs border border-white/20 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom Overlay Title & Views */}
                <div className="absolute bottom-3 left-3 right-3 z-20 text-left pointer-events-none">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold text-white border border-white/10 uppercase tracking-wider">
                      {reel.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-zinc-300 bg-black/50 px-2 py-0.5 rounded-full">
                      <Eye className="w-3 h-3 text-[#bd1616]" />
                      <span>{reel.views}</span>
                    </span>
                  </div>
                  <h3 className="text-white text-xs sm:text-sm font-bold line-clamp-1 drop-shadow-md">
                    {reel.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation & Indicators (Identical to Reference Screenshot) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6">
          {/* Left Circular Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-900 hover:bg-[#bd1616] text-white border border-zinc-800 hover:border-[#bd1616] shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Dots Pagination Indicators */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {filteredReels.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#bd1616] shadow-md shadow-[#bd1616]/50'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-zinc-700 hover:bg-zinc-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right Circular Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-900 hover:bg-[#bd1616] text-white border border-zinc-800 hover:border-[#bd1616] shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
