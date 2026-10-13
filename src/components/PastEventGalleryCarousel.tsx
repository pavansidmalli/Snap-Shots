import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
} from 'lucide-react';
import { getResponsiveImageSrcSet } from '../utils/imageUtils';

interface PastEventGalleryCarouselProps {
  onBookClick?: (category?: string) => void;
}

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
];

export const PastEventGalleryCarousel: React.FC<PastEventGalleryCarouselProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(4);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  // Drag & Touch states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const totalItems = GALLERY_IMAGES.length;

  // Responsive items per view: 4 on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay || isDragging || activeModalImage) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoplay, isDragging, activeModalImage, handleNext]);

  // Touch handlers for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
        isHorizontalSwipeRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      let offset = diffX;
      if (
        (currentIndex === 0 && offset > 0) ||
        (currentIndex === maxIndex && offset < 0)
      ) {
        offset = offset * 0.35;
      }
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (isHorizontalSwipeRef.current) {
      const threshold = 40;
      if (dragOffset < -threshold) {
        handleNext();
      } else if (dragOffset > threshold) {
        handlePrev();
      }
    }

    setDragOffset(0);
    isHorizontalSwipeRef.current = null;
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    touchStartXRef.current = e.clientX;
    isHorizontalSwipeRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const diffX = e.clientX - touchStartXRef.current;
    let offset = diffX;
    if (
      (currentIndex === 0 && offset > 0) ||
      (currentIndex === maxIndex && offset < 0)
    ) {
      offset = offset * 0.35;
    }
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 45;
    if (dragOffset < -threshold) {
      handleNext();
    } else if (dragOffset > threshold) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const slideWidthPercent = 100 / itemsPerView;

  return (
    <section
      id="past-work"
      className="relative py-6 sm:py-10 bg-transparent overflow-hidden select-none"
      aria-label="Image gallery carousel"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Container */}
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-zinc-950/70 border border-zinc-800/80 shadow-2xl focus:outline-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ touchAction: 'pan-y' }}
        >
          {/* Slider Track showing 4 images on desktop screen */}
          <div
            className={`flex transition-transform ${
              isDragging ? 'duration-75 ease-out' : 'duration-500 ease-out'
            }`}
            style={{
              transform: `translateX(calc(-${currentIndex * slideWidthPercent}% + ${dragOffset}px))`,
            }}
          >
            {GALLERY_IMAGES.map((imgUrl, idx) => (
              <div
                key={idx}
                className="shrink-0 px-1.5 sm:px-2"
                style={{ width: `${slideWidthPercent}%` }}
              >
                <div
                  onClick={() => setActiveModalImage(imgUrl)}
                  className="relative group rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] bg-black border border-zinc-800/80 shadow-md cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    srcSet={getResponsiveImageSrcSet(imgUrl, [320, 480, 640, 800])}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    alt=""
                    loading={idx < 4 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 pointer-events-none"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                  {/* Expand icon on hover (No text) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalImage(imgUrl);
                    }}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 hover:bg-[#bd1616] active:bg-[#750d0d] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
                    aria-label="Expand image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow Button (Brand red hover/active #bd1616, no text) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/75 hover:bg-[#bd1616] active:bg-[#750d0d] border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button (Brand red hover/active #bd1616, no text) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/75 hover:bg-[#bd1616] active:bg-[#750d0d] border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Floating Controls: Indicator Dots & Autoplay Toggle (No text) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-lg">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(dotIdx);
                  }}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    dotIdx === currentIndex
                      ? 'w-6 bg-[#bd1616]'
                      : 'w-2 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="w-px h-3 bg-white/20 mx-1" />

            {/* Play / Pause toggle icon */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoplay((prev) => !prev);
              }}
              className="text-white hover:text-[#ffc800] transition cursor-pointer p-0.5"
              aria-label="Toggle autoplay"
            >
              {isAutoplay ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal (Textless full-resolution preview) */}
      {activeModalImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalImage(null)}
              className="absolute -top-12 right-0 sm:top-2 sm:right-2 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-[#bd1616] active:bg-[#750d0d] text-white flex items-center justify-center border border-white/20 transition cursor-pointer shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeModalImage}
              alt=""
              className="max-h-[85vh] max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl border border-zinc-800"
            />
          </div>
        </div>
      )}
    </section>
  );
};
