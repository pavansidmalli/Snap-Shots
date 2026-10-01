import React, { useState, useRef, useEffect } from 'react';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PortfolioCard } from './PortfolioCard';
import { ReelWorkItem } from '../types';

interface PortfolioProps {
  onSelectReel: (reel: ReelWorkItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectReel }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'scroll' | 'grid'>('scroll');
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const categories = [
    'All',
    'Wedding Reels',
    'Event Reels',
    'Corporate Reels',
    'Birthday Reels',
    'Product Reels',
    'Brand Content',
  ];

  const matchesCategory = (reelCat: string, activeCat: string) => {
    if (activeCat === 'All') return true;
    if (reelCat === activeCat) return true;
    const cleanReel = reelCat.toLowerCase().replace(/reels?|content/g, '').trim();
    const cleanActive = activeCat.toLowerCase().replace(/reels?|content/g, '').trim();
    return cleanReel === cleanActive;
  };

  const filteredReels =
    activeCategory === 'All'
      ? siteConfig.portfolioReels
      : siteConfig.portfolioReels.filter((reel) => matchesCategory(reel.category, activeCategory));

  const updateScrollState = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = 320;
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentPage(Math.min(filteredReels.length - 1, Math.max(0, index)));
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
    }
    return () => {
      if (el) el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [filteredReels.length, viewMode]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(0);
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollerRef.current && viewMode === 'scroll') {
      const cardStep = Math.min(scrollerRef.current.clientWidth * 0.8, 340);
      scrollerRef.current.scrollBy({ left: -cardStep, behavior: 'smooth' });
    } else {
      setCurrentPage((prev) => (prev === 0 ? Math.max(0, filteredReels.length - 1) : prev - 1));
    }
  };

  const handleNext = () => {
    if (scrollerRef.current && viewMode === 'scroll') {
      const cardStep = Math.min(scrollerRef.current.clientWidth * 0.8, 340);
      scrollerRef.current.scrollBy({ left: cardStep, behavior: 'smooth' });
    } else {
      setCurrentPage((prev) => (prev >= filteredReels.length - 1 ? 0 : prev + 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollerRef.current && viewMode === 'scroll') {
      const cardWidth = 320;
      scrollerRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
    setCurrentPage(index);
  };

  // Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollerRef.current || viewMode !== 'scroll') return;
    isDragging.current = true;
    startX.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeftStart.current = scrollerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollerRef.current || viewMode !== 'scroll') return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <section id="work" className="bg-transparent pt-24 pb-20 relative overflow-hidden">
      {/* Subtle Ambient Light Gradients (same structure as ReelOnGo) */}
      <div
        className="absolute pointer-events-none -top-40 left-1/2 -translate-x-1/2"
        style={{
          width: '720px',
          height: '360px',
          opacity: 0.15,
          borderRadius: '540px',
          background: 'radial-gradient(circle, #bd1616 0%, #1a0000 50%, transparent 80%)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none top-1/2 -translate-y-1/2 -right-40"
        style={{
          width: '500px',
          height: '400px',
          opacity: 0.1,
          borderRadius: '50%',
          background: '#bd1616',
          filter: 'blur(120px)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase text-[#bd1616] font-bold text-xs sm:text-sm tracking-widest">
            WORK THAT PERFORMS
          </p>
          <h2
            className="mt-2 text-center text-white font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight"
            id="portfolio-title"
          >
            Real Events. Real Reels.
          </h2>
          <div className="mt-3 text-center text-zinc-300 font-medium text-sm sm:text-base leading-relaxed flex items-center justify-center flex-wrap gap-2">
            <span>Explore our recents from our Snap Shots reel-makers</span>
            <a
              href={siteConfig.business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bd1616]/15 border border-[#bd1616]/30 text-[#bd1616] text-xs font-semibold hover:bg-[#bd1616] hover:text-white transition-all duration-300 shadow-xs group"
            >
              <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Follow {siteConfig.business.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Category Filters and View Controls */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-1 px-2 -mx-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 w-full touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#bd1616] text-white shadow-md shadow-[#bd1616]/30 scale-105 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 9:16 Vertical Reel Scroller / Grid Container */}
        <div className="mt-8 relative max-w-6xl mx-auto">
          {/* Edge Fade Overlays (Scroll Mode Only) */}
          {viewMode === 'scroll' && canScrollLeft && (
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-20 transition-opacity" />
          )}
          {viewMode === 'scroll' && canScrollRight && (
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-20 transition-opacity" />
          )}

          <div
            ref={scrollerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={
              viewMode === 'scroll'
                ? 'flex gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-6 sm:py-8 px-2 sm:px-6 cursor-grab active:cursor-grabbing touch-pan-x'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-4'
            }
            id="portfolio-scroller-container"
          >
            {filteredReels.map((reel, idx) => (
              <div
                key={reel.id}
                className={
                  viewMode === 'scroll'
                    ? 'w-[78vw] max-w-[280px] sm:w-[280px] md:w-[320px] shrink-0 snap-center sm:snap-start relative hover:z-30 transition-all'
                    : 'w-full relative hover:z-30 transition-all'
                }
              >
                <PortfolioCard reel={reel} index={idx} onSelect={onSelectReel} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Carousel / Reel Pagination Controls (Reference Pattern) */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={viewMode === 'scroll' && !canScrollLeft}
            className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-all cursor-pointer shadow-md ${
              viewMode === 'scroll' && !canScrollLeft
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-white hover:scale-105 active:scale-95'
            }`}
            aria-label="Previous Reel"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-2">
            {filteredReels.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentPage === i ? 'w-6 bg-[#bd1616]' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                }`}
                aria-label={`Go to reel ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={viewMode === 'scroll' && !canScrollRight}
            className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-all cursor-pointer shadow-md ${
              viewMode === 'scroll' && !canScrollRight
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-white hover:scale-105 active:scale-95'
            }`}
            aria-label="Next Reel"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Instant IG Prompt */}
        <div className="mt-10 text-center">
          <a
            href={siteConfig.business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-[#bd1616] transition-colors"
          >
            <span>View 100+ more live event reels on Instagram</span>
            <span className="text-[#bd1616]">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

