import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Star, ShieldCheck, CheckCircle2, MapPin, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { getResponsiveImageSrcSet } from '../utils/imageUtils';
import { useCountry } from '../context/CountryContext';
import { ReelWorkItem } from '../types';

interface HeroProps {
  onBookClick?: () => void;
  onViewWorkClick?: () => void;
  onWatchReel?: (reel: ReelWorkItem) => void;
}

interface HeroReel {
  id: string;
  shortcode: string;
  url: string;
  title: string;
  tag: string;
  tagColor: string;
  handle: string;
  views: string;
  badge: string;
}

const HERO_REELS: HeroReel[] = [
  {
    id: 'reel-1',
    shortcode: 'DdUSBbWJaJ9',
    url: 'https://www.instagram.com/reel/DdUSBbWJaJ9/',
    title: 'Special Moments & Candid Snaps',
    tag: 'EVENT VIBES',
    tagColor: 'bg-amber-400',
    handle: '@getursnapshots',
    views: '210K',
    badge: 'Live Snaps',
  },
  {
    id: 'reel-2',
    shortcode: 'DbWch7rCSw_',
    url: 'https://www.instagram.com/reel/DbWch7rCSw_/',
    title: 'Cinematic Mood & Visual Story',
    tag: 'CINEMATIC',
    tagColor: 'bg-emerald-400',
    handle: '@snapshots_by_abhi',
    views: '260K',
    badge: 'Visual Grade',
  },
  {
    id: 'reel-3',
    shortcode: 'DbWdisUCxA2',
    url: 'https://www.instagram.com/reel/DbWdisUCxA2/',
    title: 'Cinematic Nightlife & Gala',
    tag: 'FEATURED 4K',
    tagColor: 'bg-[#bd1616]',
    handle: '@snapshots_by_abhi',
    views: '240K',
    badge: 'Trending Beats',
  },
  {
    id: 'reel-4',
    shortcode: 'DbQ0Hy2OT-h',
    url: 'https://www.instagram.com/reel/DbQ0Hy2OT-h/',
    title: 'Royal Celebration Aesthetics',
    tag: 'WEDDING',
    tagColor: 'bg-rose-400',
    handle: '@snapshots_by_abhi',
    views: '195K',
    badge: '4K HDR',
  },
  {
    id: 'reel-5',
    shortcode: 'DdwIldARQSE',
    url: 'https://www.instagram.com/reel/DdwIldARQSE/',
    title: 'Celebration Rhythm & Pacing',
    tag: 'HIGHLIGHTS',
    tagColor: 'bg-cyan-400',
    handle: '@getursnapshots',
    views: '180K',
    badge: 'Same-Day Edit',
  },
];

export const Hero: React.FC<HeroProps> = ({ onWatchReel }) => {
  const { startingPriceLabel } = useCountry();
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-scroll hero video reels carousel smoothly
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_REELS.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePlayReel = useCallback((reel: HeroReel) => {
    if (onWatchReel) {
      onWatchReel({
        id: reel.id,
        title: reel.title,
        category: reel.tag,
        videoUrl: reel.url,
        posterUrl: '',
        views: reel.views,
        duration: '0:35',
        client: reel.handle,
        instagramUrl: reel.url,
        isInstagram: true,
        description: `${reel.title} - Captured in 4K HDR with dynamic motion by Snap Shots (${reel.handle}).`,
      });
    }
  }, [onWatchReel]);

  const nextReel = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_REELS.length);
  }, []);

  const prevReel = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HERO_REELS.length) % HERO_REELS.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 45) {
      prevReel();
    } else if (deltaX < -45) {
      nextReel();
    }
    setTouchStartX(null);
  };

  // Track scroll progress of the hero section relative to viewport for subtle parallax depth
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Multi-layered subtle parallax drifts (calibrated for high visual polish without motion sickness)
  // 1. Background glows drift slightly down & out
  const yBackgroundGlow = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 85]);

  // 2. Headline & description drift gently downward with soft fade
  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 35]);
  const opacityHeadline = useTransform(scrollYProgress, [0, 0.9], [1, shouldReduceMotion ? 1 : 0.85]);

  // 3. Floating 9:16 phone reels move at distinct parallax speed and micro-scale to create true foreground depth
  const yReels = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 65]);
  const scaleReels = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 0.98]);

  // 4. Metrics & CTA buttons drift gently with the page
  const yStats = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 25]);

  return (
    <section id="home" ref={heroRef} className="relative pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 overflow-hidden bg-transparent">
      {/* Background Ambient Glows with Subtle Parallax Float */}
      <motion.div style={{ y: yBackgroundGlow }} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden transform-gpu will-change-transform">
        <div
          className="absolute hidden lg:block"
          style={{
            width: '520px',
            height: '750px',
            top: '-120px',
            right: '-80px',
            borderRadius: '500px',
            background: 'radial-gradient(circle, rgba(189, 22, 22,0.22) 0%, rgba(117, 13, 13,0.08) 60%, transparent 80%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute hidden lg:block"
          style={{
            width: '600px',
            height: '700px',
            top: '40px',
            left: '-150px',
            borderRadius: '500px',
            background: 'radial-gradient(circle, rgba(189, 22, 22,0.16) 0%, rgba(30,30,35,0.3) 50%, transparent 80%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Notice Pill & Main Headline with Subtle Drift & Fade Parallax */}
        <motion.div
          style={{ y: yHeadline, opacity: opacityHeadline }}
          className="text-center max-w-4xl mx-auto transform-gpu will-change-transform"
        >
          {/* Top Notice Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#bd1616]/15 border border-[#bd1616]/30 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#bd1616] animate-ping" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#bd1616]">
                Your Moments &bull; Our Snaps
              </span>
            </div>
          </div>

          <h1
            className="text-[34px] sm:text-[58px] lg:text-[68px] font-black text-white tracking-tight leading-[1.08]"
            id="hero-headline"
          >
            TURN YOUR MOMENTS{' '}
            <br className="hidden sm:block" />
            INTO{' '}
            <span className="relative inline-block ml-1.5 sm:ml-2">
              <span className="animate-white-red-gradient tracking-tight font-black inline-block">
                REELS.
              </span>
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal" id="hero-subheadline">
            <span className="font-semibold text-white lowercase">your moments our snaps.</span> Professional reels, photography and visual content created for events, brands, businesses and social media.
          </p>

          {/* Live Cities Notice */}
          <p className="mt-3 text-xs sm:text-sm font-medium text-zinc-400 inline-flex items-center justify-center gap-1.5 flex-wrap">
            Booking live in{' '}
            <span className="text-[#bd1616] font-bold inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#bd1616] fill-[#bd1616]/20 inline-block shrink-0" />
              Telangana, India &amp; USA
            </span>
          </p>
        </motion.div>

        {/* Floating Phones / 9:16 Reel Showcase Mockup with Foreground Depth Parallax */}
        <motion.div
          style={{ y: yReels, scale: scaleReels }}
          className="mt-6 sm:mt-12 flex flex-col items-center justify-center overflow-hidden sm:overflow-visible px-2 transform-gpu will-change-transform"
        >
          {/* 5-Video Phones Stage Container (CSS selector 1) */}
          <div
            className="relative h-[450px] min-[390px]:h-[485px] sm:h-[510px] md:h-[545px] w-full max-w-[760px] md:max-w-[960px] lg:max-w-[1150px] flex items-center justify-center select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Ambient Radial Spotlight & Stage Glow */}
            <div className="absolute inset-0 max-w-[550px] h-[380px] mx-auto my-auto -z-10 bg-radial from-[#bd1616]/35 via-[#bd1616]/12 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 max-w-[620px] h-[60px] bg-gradient-to-r from-transparent via-[#bd1616]/40 to-transparent blur-2xl pointer-events-none -z-10" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 max-w-[380px] h-[1px] bg-gradient-to-r from-transparent via-[#bd1616]/70 to-transparent pointer-events-none" />

            {/* Left Previous Button */}
            <button
              onClick={prevReel}
              aria-label="Previous Reel"
              className="absolute left-1 sm:left-3 md:left-6 lg:left-8 z-40 p-2.5 sm:p-3 rounded-full bg-black/80 hover:bg-[#bd1616] text-white border border-white/15 hover:border-[#bd1616] shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 group-hover:text-white transition-colors" />
            </button>

            {/* Right Next Button */}
            <button
              onClick={nextReel}
              aria-label="Next Reel"
              className="absolute right-1 sm:right-3 md:right-6 lg:right-8 z-40 p-2.5 sm:p-3 rounded-full bg-black/80 hover:bg-[#bd1616] text-white border border-white/15 hover:border-[#bd1616] shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 group-hover:text-white transition-colors" />
            </button>

            {/* Render 5 Phones with Smooth 3D Perspective Transformations */}
            {HERO_REELS.map((reel, index) => {
              // Calculate relative distance to active reel (-2, -1, 0, 1, 2)
              let diff = index - activeIndex;
              if (diff > 2) diff -= HERO_REELS.length;
              if (diff < -2) diff += HERO_REELS.length;

              const isCenter = diff === 0;
              const isAdjacentLeft = diff === -1;
              const isAdjacentRight = diff === 1;
              const isOuterLeft = diff === -2;

              if (Math.abs(diff) > 2) return null;

              return (
                <div
                  key={reel.id}
                  onClick={() => (!isCenter ? setActiveIndex(index) : handlePlayReel(reel))}
                  className={`absolute transition-all duration-500 ease-out will-change-transform ${
                    isCenter
                      ? 'z-30 w-[245px] min-[390px]:w-[265px] sm:w-[280px] md:w-[285px] lg:w-[305px] aspect-[9/16] rounded-[32px] sm:rounded-[42px] bg-gradient-to-b from-zinc-700 via-zinc-900 to-black p-1.5 sm:p-2.5 shadow-[0_25px_65px_-10px_rgba(189,22,22,0.55),0_0_35px_rgba(189,22,22,0.25)] border-2 border-[#bd1616] ring-4 ring-[#bd1616]/25 scale-100 sm:scale-105 translate-x-0 rotate-0 opacity-100 animate-float cursor-pointer group/centerphone'
                      : isAdjacentLeft
                      ? 'z-20 w-[215px] sm:w-[235px] lg:w-[250px] aspect-[9/16] rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-zinc-800 to-zinc-950 p-1.5 sm:p-2 shadow-2xl border border-zinc-700/80 -translate-x-[115px] sm:-translate-x-[170px] md:-translate-x-[200px] lg:-translate-x-[255px] xl:-translate-x-[295px] -rotate-6 scale-90 sm:scale-95 opacity-80 hover:opacity-100 hover:scale-100 cursor-pointer hidden min-[420px]:block'
                      : isAdjacentRight
                      ? 'z-20 w-[215px] sm:w-[235px] lg:w-[250px] aspect-[9/16] rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-zinc-800 to-zinc-950 p-1.5 sm:p-2 shadow-2xl border border-zinc-700/80 translate-x-[115px] sm:translate-x-[170px] md:translate-x-[200px] lg:translate-x-[255px] xl:translate-x-[295px] rotate-6 scale-90 sm:scale-95 opacity-80 hover:opacity-100 hover:scale-100 cursor-pointer hidden min-[420px]:block'
                      : isOuterLeft
                      ? 'z-10 w-[195px] sm:w-[210px] lg:w-[225px] aspect-[9/16] rounded-[24px] sm:rounded-[32px] bg-zinc-950 p-1.5 shadow-xl border border-zinc-800/80 -translate-x-[230px] md:-translate-x-[340px] lg:-translate-x-[425px] xl:-translate-x-[495px] -rotate-12 scale-[0.8] sm:scale-[0.85] opacity-60 hover:opacity-90 hover:scale-[0.88] cursor-pointer hidden md:block'
                      : 'z-10 w-[195px] sm:w-[210px] lg:w-[225px] aspect-[9/16] rounded-[24px] sm:rounded-[32px] bg-zinc-950 p-1.5 shadow-xl border border-zinc-800/80 translate-x-[230px] md:translate-x-[340px] lg:translate-x-[425px] xl:translate-x-[495px] rotate-12 scale-[0.8] sm:scale-[0.85] opacity-60 hover:opacity-90 hover:scale-[0.88] cursor-pointer hidden md:block'
                  }`}
                >
                  {/* Dynamic Island / Camera Notch (Desktop & Tablet only - REMOVED on mobile for full clean edge-to-edge video preview) */}
                  <div className="hidden sm:flex absolute top-3 sm:top-3.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-3 sm:h-3.5 bg-black rounded-full z-30 items-center justify-end px-1 sm:px-2 shadow-inner border border-white/5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCenter ? 'bg-[#bd1616] animate-pulse' : 'bg-emerald-400'
                      }`}
                    />
                  </div>

                  {/* Screen Container */}
                  <div className="relative w-full h-full rounded-[24px] sm:rounded-[34px] overflow-hidden bg-black flex flex-col items-center justify-center">
                    {/* Top glass reflection gradient */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none z-20" />

                    {/* Top Info Bar */}
                    <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between z-20 pointer-events-none">
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[9px] font-extrabold text-white border border-white/10 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bd1616] animate-ping" />
                        <span>{reel.tag}</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[8px] font-mono text-white/80 border border-white/10 font-bold">
                        4K HDR
                      </span>
                    </div>

                    <iframe
                      src={`https://www.instagram.com/reel/${reel.shortcode}/embed/?utm_source=ig_embed`}
                      className="w-full h-full border-0 rounded-[22px] sm:rounded-[30px] bg-black"
                      scrolling="no"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      title={reel.title}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Smooth Carousel Pagination & Reel Selection Tabs */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3 z-30">
            {/* 5 Interactive Indicators */}
            <div className="flex items-center justify-center gap-2">
              {HERO_REELS.map((reel, idx) => (
                <button
                  key={reel.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx
                      ? 'w-9 h-2.5 bg-[#bd1616] shadow-lg shadow-[#bd1616]/60'
                      : 'w-2.5 h-2.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Jump to ${reel.title}`}
                  title={reel.title}
                />
              ))}
            </div>

            {/* Active Reel Tagline & Swipe Prompt */}
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 font-bold text-[#ffc800] text-[11px] shadow-xs">
                {HERO_REELS[activeIndex].tag}
              </span>
              <span className="text-zinc-200 font-semibold">
                {HERO_REELS[activeIndex].title}
              </span>
              <span className="hidden sm:inline text-zinc-500">&bull; Tap any video to center</span>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Bar & Primary CTAs with Subtle Parallax Travel */}
        <motion.div style={{ y: yStats }} className="transform-gpu will-change-transform">
          {/* Key Metrics Bar (Responsive 6-metric display) */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <div className="grid w-full max-w-5xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 px-1" id="hero-stats">
              {siteConfig.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center bg-zinc-900/90 hover:bg-zinc-900 text-center py-3 sm:py-5 px-2 rounded-2xl border border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                    <span className="bg-gradient-to-r from-white via-zinc-200 to-red-300 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-medium text-zinc-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges Bar (Single In-Line Row) */}
          <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-nowrap items-center justify-start lg:justify-center gap-x-5 sm:gap-x-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs text-zinc-400 px-2 sm:px-0 py-1">
            <div className="shrink-0 flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
              <span>Trained &amp; Certified Reel-Makers</span>
            </div>
            <span className="text-zinc-700 hidden sm:inline select-none">&bull;</span>
            <div className="shrink-0 flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
              <span>Same-Day Instant Delivery</span>
            </div>
            <span className="text-zinc-700 hidden sm:inline select-none">&bull;</span>
            <div className="shrink-0 flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
              <span>Full 4K Raw Footage Access</span>
            </div>
            <span className="text-zinc-700 hidden sm:inline select-none">&bull;</span>
            <div className="shrink-0 flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
              <span>Transparent Pricing from {startingPriceLabel}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
