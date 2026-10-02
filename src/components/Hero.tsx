import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Play, Sparkles, Star, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { getResponsiveImageSrcSet } from '../utils/imageUtils';
import { useCountry } from '../context/CountryContext';

interface HeroProps {
  onBookClick: () => void;
  onViewWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onViewWorkClick }) => {
  const { startingPriceLabel } = useCountry();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const shouldReduceMotion = useReducedMotion();

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

  useEffect(() => {
    // Intersection observer to pause hero video when scrolled out of view for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 overflow-hidden bg-transparent">
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
          className="mt-6 sm:mt-12 flex justify-center overflow-hidden sm:overflow-visible px-2 transform-gpu will-change-transform"
        >
          <div className="relative h-[430px] min-[390px]:h-[470px] sm:h-[490px] md:h-[520px] w-full max-w-[760px] md:max-w-[920px] lg:max-w-[980px] flex items-center justify-center">
            {/* Reel 1 (Left Phone - Visible on Desktop/Tablet only): Royal Palace Sangeet */}
            <div className="hidden md:block absolute md:left-4 lg:left-12 xl:left-16 top-6 sm:top-4 z-10 md:w-[215px] lg:w-[235px] aspect-[9/16] rounded-[28px] lg:rounded-[36px] bg-zinc-950 p-2 lg:p-2.5 shadow-2xl shadow-black/50 border border-zinc-700/60 transform -rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-30 cursor-pointer group transform-gpu will-change-transform">
              {/* Dynamic Island */}
              <div className="absolute top-3 sm:top-3.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-3 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-end px-1 sm:px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Screen */}
              <div className="relative w-full h-full rounded-[20px] sm:rounded-[30px] overflow-hidden bg-black">
                <video
                  src="/videos/wedding-reel.mp4"
                  poster="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35 pointer-events-none" />

                {/* Top Overlay */}
                <div className="absolute top-3.5 sm:top-5 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between pointer-events-none z-20">
                  <span className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[8px] sm:text-[10px] font-bold text-white border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bd1616]" />
                    WEDDING
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-white/80 font-mono font-medium">4K HDR</span>
                </div>

                {/* Bottom Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-2 sm:left-3 right-2 sm:right-3 text-left pointer-events-none z-20">
                  <div className="text-[9px] sm:text-[10px] font-extrabold text-[#ffc800] uppercase tracking-wider mb-0.5">
                    Ceremonial Cut
                  </div>
                  <h3 className="text-white text-[10px] sm:text-xs font-bold leading-tight line-clamp-1 drop-shadow-md">
                    Royal Palace Sangeet
                  </h3>
                  <div className="mt-1 sm:mt-1.5 flex items-center justify-between text-[8px] sm:text-[9px] text-white/80 border-t border-white/10 pt-1">
                    <span>⚡ 3h Cut</span>
                    <span className="text-white font-bold">192K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reel 2 (Center Phone - Featured Reel - Visible on Mobile & Desktop): Electric Nightlife Gala */}
            <div className="relative z-20 w-[240px] min-[390px]:w-[260px] sm:w-[275px] md:w-[275px] lg:w-[295px] aspect-[9/16] rounded-[30px] sm:rounded-[40px] bg-zinc-950 p-2 sm:p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-2 border-[#bd1616]/50 ring-4 ring-[#bd1616]/15 transition-all duration-300 animate-float hover:scale-105 group transform-gpu will-change-transform">
              {/* Dynamic Island */}
              <div className="absolute top-3.5 sm:top-4 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-3 sm:h-4 bg-black rounded-full z-30 flex items-center justify-end px-1.5 sm:px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#bd1616] animate-pulse" />
              </div>

              {/* Screen Container */}
              <div className="relative w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src="/videos/hero-reel.mp4"
                  poster="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                />

                {/* Video Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 pointer-events-none" />

                {/* Top Reel Header Overlay */}
                <div className="absolute top-4 sm:top-6 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between pointer-events-none z-20">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-white border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bd1616] animate-ping" />
                    LIVE EDIT
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/80 font-mono font-medium">4K 60FPS</span>
                </div>

                {/* Bottom Reel Description Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 text-left pointer-events-none z-20">
                  <div className="flex items-center gap-1 text-[#bd1616] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3 h-3 text-[#bd1616]" />
                    <span>Trending Audio Sync</span>
                  </div>
                  <h2 className="text-white text-xs sm:text-sm font-bold leading-tight drop-shadow-md">
                    Electric Nightlife Gala
                  </h2>
                  <p className="text-zinc-300 text-[9px] sm:text-[10px] mt-0.5 drop-shadow-sm line-clamp-1">
                    Shot on iPhone 16 Pro Max Cinematic Mode
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[8px] sm:text-[9px] text-white/80 border-t border-white/10 pt-1.5">
                    <span>⚡ Delivered in 2h 45m</span>
                    <span className="text-white font-bold">280K views</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reel 3 (Right Phone - Visible on Desktop/Tablet only): KINETIC Runway */}
            <div className="hidden md:block absolute md:right-4 lg:right-12 xl:right-16 top-6 sm:top-4 z-10 md:w-[215px] lg:w-[235px] aspect-[9/16] rounded-[28px] lg:rounded-[36px] bg-zinc-950 p-2 lg:p-2.5 shadow-2xl shadow-black/50 border border-zinc-700/60 transform rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-30 cursor-pointer group transform-gpu will-change-transform">
              {/* Dynamic Island */}
              <div className="absolute top-3 sm:top-3.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-3 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-end px-1 sm:px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* Screen Container */}
              <div className="relative w-full h-full rounded-[20px] sm:rounded-[30px] overflow-hidden bg-black">
                <video
                  src="/videos/brand-reel.mp4"
                  poster="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop"
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35 pointer-events-none" />

                {/* Top Overlay */}
                <div className="absolute top-3.5 sm:top-5 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between pointer-events-none z-20">
                  <span className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[8px] sm:text-[10px] font-bold text-white border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    EDITORIAL
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-white/80 font-mono font-medium">Color Graded</span>
                </div>

                {/* Bottom Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-2 sm:left-3 right-2 sm:right-3 text-left pointer-events-none z-20">
                  <div className="text-[9px] sm:text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider mb-0.5">
                    Fashion Runway
                  </div>
                  <h3 className="text-white text-[10px] sm:text-xs font-bold leading-tight line-clamp-1 drop-shadow-md">
                    KINETIC Studio Drop
                  </h3>
                  <div className="mt-1 sm:mt-1.5 flex items-center justify-between text-[8px] sm:text-[9px] text-white/80 border-t border-white/10 pt-1">
                    <span>⚡ Same-Day</span>
                    <span className="text-white font-bold">215K</span>
                  </div>
                </div>
              </div>
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

          {/* Primary & Secondary Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onBookClick}
              id="hero-primary-cta"
              className="group w-full sm:w-auto h-12 flex items-center justify-center gap-3 rounded-full bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] px-8 text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-[#bd1616]/30 hover:shadow-xl hover:shadow-[#bd1616]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>BOOK A SHOOT</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </span>
            </button>

            <button
              onClick={onViewWorkClick}
              id="hero-secondary-cta"
              className="w-full sm:w-auto h-12 flex items-center justify-center gap-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 active:bg-zinc-850 border border-zinc-700/80 hover:border-[#bd1616]/50 px-8 text-sm font-bold text-white uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#bd1616] fill-[#bd1616]" />
              <span>VIEW OUR WORK</span>
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
              <span>Trained &amp; Certified Reel-Makers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
              <span>Same-Day Instant Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
              <span>Full 4K Raw Footage Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
              <span>Transparent Pricing from {startingPriceLabel}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
