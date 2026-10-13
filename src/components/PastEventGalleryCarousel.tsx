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

interface LazyCarouselCardProps {
  imgUrl: string;
  idx: number;
  slideWidthPercent: number;
  isNearActive: boolean;
  onOpenModal: (index: number) => void;
}

/**
 * Individual carousel slide utilizing an IntersectionObserver to lazy-load
 * images only when they approach the viewport (vertically or horizontally).
 */
const LazyCarouselCard: React.FC<LazyCarouselCardProps> = ({
  imgUrl,
  idx,
  slideWidthPercent,
  isNearActive,
  onOpenModal,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Trigger fetch if marked near active index
  useEffect(() => {
    if (isNearActive && !shouldFetch) {
      setShouldFetch(true);
    }
  }, [isNearActive, shouldFetch]);

  // IntersectionObserver to observe when slide approaches viewport
  useEffect(() => {
    if (shouldFetch) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldFetch(true);
      return;
    }

    const currentEl = cardRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setShouldFetch(true);
          observer.disconnect();
        }
      },
      {
        root: null, // Viewport
        rootMargin: '300px 150px', // Fetch when within 300px vertical or 150px horizontal
        threshold: 0.01,
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [shouldFetch]);

  return (
    <div
      ref={cardRef}
      className="shrink-0 px-1 sm:px-2.5"
      style={{ width: `${slideWidthPercent}%` }}
    >
      <div
        onClick={() => onOpenModal(idx)}
        className="relative group rounded-xl sm:rounded-2xl overflow-hidden aspect-square sm:aspect-[4/5] bg-zinc-900 border border-white/10 hover:border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
      >
        {/* Skeleton pulse loader shown while not fetched or still decoding */}
        {(!shouldFetch || (!isLoaded && !hasError)) && (
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800/80 animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/30 animate-spin opacity-50" />
          </div>
        )}

        {/* Image fetched only when near viewport with smooth hover scale */}
        {shouldFetch && !hasError && (
          <img
            src={imgUrl}
            srcSet={getResponsiveImageSrcSet(imgUrl, [320, 480, 640, 800])}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-108 pointer-events-none ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Fallback in case of image load error */}
        {hasError && (
          <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center text-zinc-600 text-xs">
            Preview unavailable
          </div>
        )}

        {/* Subtle aesthetic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

        {/* Expand icon on hover/tap (No text) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(idx);
          }}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-[#bd1616] active:bg-[#750d0d] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md cursor-pointer hover:scale-105"
          aria-label="Expand image"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export const PastEventGalleryCarousel: React.FC<PastEventGalleryCarouselProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(4);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);

  // Drag & Touch states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const totalItems = GALLERY_IMAGES.length;

  // Responsive items per view: 4 on desktop, 3 on tablet, 2 on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2); // 2 image slides in one frame on mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4); // 4 images per frame on desktop
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
    if (!isAutoplay || isDragging || modalImageIndex !== null) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoplay, isDragging, modalImageIndex, handleNext]);

  // Touch handlers for mobile
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
      const threshold = 35;
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
    const threshold = 40;
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

  // Modal navigation
  const handleModalPrev = useCallback(() => {
    setModalImageIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1) : null
    );
  }, []);

  const handleModalNext = useCallback(() => {
    setModalImageIndex((prev) =>
      prev !== null ? (prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0) : null
    );
  }, []);

  // Modal key listeners
  useEffect(() => {
    if (modalImageIndex === null) return;
    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImageIndex(null);
      if (e.key === 'ArrowLeft') handleModalPrev();
      if (e.key === 'ArrowRight') handleModalNext();
    };
    window.addEventListener('keydown', handleModalKeyDown);
    return () => window.removeEventListener('keydown', handleModalKeyDown);
  }, [modalImageIndex, handleModalPrev, handleModalNext]);

  const slideWidthPercent = 100 / itemsPerView;

  return (
    <section
      id="past-work"
      className="relative py-6 sm:py-10 bg-transparent overflow-hidden select-none"
      aria-label="Image gallery carousel"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Slider Area without boxed background */}
        <div className="relative group/carousel">
          {/* Track Container */}
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
            className={`relative overflow-hidden focus:outline-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ touchAction: 'pan-y' }}
          >
            {/* Slider Track */}
            <div
              className={`flex transition-transform ${
                isDragging ? 'duration-75 ease-out' : 'duration-500 ease-out'
              }`}
              style={{
                transform: `translateX(calc(-${currentIndex * slideWidthPercent}% + ${dragOffset}px))`,
              }}
            >
              {GALLERY_IMAGES.map((imgUrl, idx) => {
                // Check if slide is within the current visible or adjacent window
                const isNearActive =
                  idx >= currentIndex - 1 &&
                  idx <= currentIndex + itemsPerView + 1;

                return (
                  <LazyCarouselCard
                    key={idx}
                    imgUrl={imgUrl}
                    idx={idx}
                    slideWidthPercent={slideWidthPercent}
                    isNearActive={isNearActive}
                    onOpenModal={(i) => setModalImageIndex(i)}
                  />
                );
              })}
            </div>
          </div>

          {/* Desktop Left / Right floating hover buttons (outside image center so photos remain clean) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-black/80 hover:bg-[#bd1616] active:bg-[#750d0d] border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-black/80 hover:bg-[#bd1616] active:bg-[#750d0d] border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Clean, Elegant Bottom Controls Bar (No text, cleanly positioned below images to prevent overlapping photos) */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3">
          {/* Mobile Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="sm:hidden w-8 h-8 rounded-full bg-zinc-900/90 hover:bg-[#bd1616] active:bg-[#750d0d] border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator & Autoplay Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-lg">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    dotIdx === currentIndex
                      ? 'w-5 sm:w-6 bg-[#bd1616]'
                      : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="w-px h-3 bg-white/20 mx-1 shrink-0" />

            {/* Play / Pause toggle */}
            <button
              type="button"
              onClick={() => setIsAutoplay((prev) => !prev)}
              className="text-white/80 hover:text-[#ffc800] transition cursor-pointer p-0.5 shrink-0"
              aria-label="Toggle autoplay"
            >
              {isAutoplay ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Mobile Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="sm:hidden w-8 h-8 rounded-full bg-zinc-900/90 hover:bg-[#bd1616] active:bg-[#750d0d] border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal (Textless full-resolution preview with Prev/Next arrows) */}
      {modalImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-fade-in"
          onClick={() => setModalImageIndex(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setModalImageIndex(null)}
              className="absolute -top-12 right-0 sm:top-2 sm:right-2 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-[#bd1616] active:bg-[#750d0d] text-white flex items-center justify-center border border-white/20 transition cursor-pointer shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Prev Button */}
            <button
              type="button"
              onClick={handleModalPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#bd1616] active:bg-[#750d0d] text-white flex items-center justify-center border border-white/20 transition cursor-pointer shadow-lg hover:scale-105"
              aria-label="Previous modal image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <img
              src={GALLERY_IMAGES[modalImageIndex]}
              alt=""
              className="max-h-[85vh] max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl border border-zinc-800"
            />

            {/* Modal Next Button */}
            <button
              type="button"
              onClick={handleModalNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#bd1616] active:bg-[#750d0d] text-white flex items-center justify-center border border-white/20 transition cursor-pointer shadow-lg hover:scale-105"
              aria-label="Next modal image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
