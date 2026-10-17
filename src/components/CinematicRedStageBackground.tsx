import React from 'react';

/**
 * ============================================================================
 * CINEMATIC RED STAGE BACKGROUND THEME (SILKY VELVET EDITION)
 * ============================================================================
 * Faithfully replaces the site background with the user's latest reference image:
 * - Soft, rich, diffused top-center crimson spotlight radiating downward
 * - Smooth, silky liquid glowing red wave ribbons on left & right flanks
 * - Seductive dark velvet black center void providing optimal text/reel contrast
 * - Glossy reflective stage floor with ambient red spotlight pools & horizon sheen
 * - 100% fixed GPU-accelerated layer that seamlessly covers the entire website
 */
export const CinematicRedStageBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#000000] select-none transform-gpu will-change-transform"
      style={{ transform: 'translate3d(0, 0, 0)' }}
      aria-hidden="true"
    >
      {/* 1. TOP OVERHEAD DIFFUSED CRIMSON SPOTLIGHT */}
      {/* Wide soft atmospheric aura */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120vw] max-w-[1500px] h-[55vh] sm:h-[65vh]"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(195, 20, 20, 0.55) 0%, rgba(135, 12, 12, 0.34) 28%, rgba(55, 4, 4, 0.12) 58%, transparent 80%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Intense inner spotlight core at the top apex */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[65vw] max-w-[850px] h-[35vh]"
        style={{
          background:
            'radial-gradient(ellipse 50% 32% at 50% 0%, rgba(235, 35, 35, 0.48) 0%, rgba(189, 22, 22, 0.28) 45%, transparent 75%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Subtle diffused mid-center atmospheric haze */}
      <div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[750px] h-[300px] opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 30%, rgba(189, 22, 22, 0.18) 0%, rgba(95, 8, 8, 0.08) 50%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 2. SILKY LIQUID RED LIGHT WAVES ON LEFT & RIGHT FLANKS (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Silky Wave Glow Filters */}
          <filter id="velvet-glow-wide" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="35" result="blurWide" />
            <feMerge>
              <feMergeNode in="blurWide" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="velvet-glow-mid" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" result="blurMid" />
            <feGaussianBlur stdDeviation="6" result="blurTight" />
            <feMerge>
              <feMergeNode in="blurMid" />
              <feMergeNode in="blurTight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Left Wave Gradient: Starts off-screen left, glows bright on curve crest, softens towards floor */}
          <linearGradient id="left-wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#750d0d" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#bd1616" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ff4545" stopOpacity="1" />
            <stop offset="70%" stopColor="#e61e1e" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#8f0f0f" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          {/* Right Wave Gradient: Symmetrical entrance from right flank */}
          <linearGradient id="right-wave-grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#750d0d" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#bd1616" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ff4545" stopOpacity="1" />
            <stop offset="70%" stopColor="#e61e1e" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#8f0f0f" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- LEFT FLANK: SILKY LIQUID RED LIGHT RIBBONS --- */}
        {/* Left Wave: Wide ambient velvet bloom */}
        <path
          d="M -50 490 C 100 520, 240 610, 430 710 C 560 760, 710 785, 840 790"
          fill="none"
          stroke="#bd1616"
          strokeWidth="45"
          opacity="0.35"
          filter="url(#velvet-glow-wide)"
        />

        {/* Left Wave: Main luminous silky crest */}
        <path
          d="M -50 490 C 100 520, 240 610, 430 710 C 560 760, 710 785, 840 790"
          fill="none"
          stroke="url(#left-wave-grad)"
          strokeWidth="18"
          opacity="0.85"
          filter="url(#velvet-glow-mid)"
        />

        {/* Left Wave: Soft hot satin core thread */}
        <path
          d="M -50 490 C 100 520, 240 610, 430 710 C 560 760, 710 785, 840 790"
          fill="none"
          stroke="#ff9999"
          strokeWidth="3.5"
          opacity="0.8"
        />

        {/* Left Wave: Secondary softer lower liquid fold */}
        <path
          d="M -50 580 C 110 630, 260 700, 450 760 C 570 785, 680 798, 790 800"
          fill="none"
          stroke="#bd1616"
          strokeWidth="16"
          opacity="0.45"
          filter="url(#velvet-glow-wide)"
        />

        {/* --- RIGHT FLANK: SILKY LIQUID RED LIGHT RIBBONS --- */}
        {/* Right Wave: Wide ambient velvet bloom */}
        <path
          d="M 1970 490 C 1820 520, 1680 610, 1490 710 C 1360 760, 1210 785, 1080 790"
          fill="none"
          stroke="#bd1616"
          strokeWidth="45"
          opacity="0.35"
          filter="url(#velvet-glow-wide)"
        />

        {/* Right Wave: Main luminous silky crest */}
        <path
          d="M 1970 490 C 1820 520, 1680 610, 1490 710 C 1360 760, 1210 785, 1080 790"
          fill="none"
          stroke="url(#right-wave-grad)"
          strokeWidth="18"
          opacity="0.85"
          filter="url(#velvet-glow-mid)"
        />

        {/* Right Wave: Soft hot satin core thread */}
        <path
          d="M 1970 490 C 1820 520, 1680 610, 1490 710 C 1360 760, 1210 785, 1080 790"
          fill="none"
          stroke="#ff9999"
          strokeWidth="3.5"
          opacity="0.8"
        />

        {/* Right Wave: Secondary softer lower liquid fold */}
        <path
          d="M 1970 580 C 1810 630, 1660 700, 1470 760 C 1350 785, 1240 798, 1130 800"
          fill="none"
          stroke="#bd1616"
          strokeWidth="16"
          opacity="0.45"
          filter="url(#velvet-glow-wide)"
        />
      </svg>

      {/* 3. GLOSSY REFLECTIVE STAGE FLOOR & DIFFUSED LIGHT POOLS */}
      {/* Soft Horizon Ambient Line */}
      <div
        className="absolute top-[73%] sm:top-[74%] left-0 right-0 h-[2px] opacity-75"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(189,22,22,0.2) 15%, rgba(255,60,60,0.7) 45%, rgba(255,80,80,0.85) 50%, rgba(255,60,60,0.7) 55%, rgba(189,22,22,0.2) 85%, transparent 100%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Center Floor Spotlight Flare Pool */}
      <div
        className="absolute top-[73%] sm:top-[74%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[680px] h-[65px] sm:h-[90px]"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(240, 45, 45, 0.48) 0%, rgba(189, 22, 22, 0.22) 48%, transparent 75%)',
          filter: 'blur(22px)',
        }}
      />

      {/* Left Flank Mirrored Wave Floor Reflection */}
      <div
        className="absolute top-[74%] sm:top-[75%] left-[8%] sm:left-[14%] w-[320px] sm:w-[450px] h-[100px]"
        style={{
          background:
            'radial-gradient(ellipse 55% 35% at 40% 20%, rgba(210, 30, 30, 0.32) 0%, rgba(130, 12, 12, 0.12) 50%, transparent 75%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Right Flank Mirrored Wave Floor Reflection */}
      <div
        className="absolute top-[74%] sm:top-[75%] right-[8%] sm:right-[14%] w-[320px] sm:w-[450px] h-[100px]"
        style={{
          background:
            'radial-gradient(ellipse 55% 35% at 60% 20%, rgba(210, 30, 30, 0.32) 0%, rgba(130, 12, 12, 0.12) 50%, transparent 75%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Reflective Ground Floor Plane Sheen */}
      <div
        className="absolute top-[73%] sm:top-[74%] bottom-0 left-0 right-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(130, 12, 12, 0.22) 0%, rgba(60, 5, 5, 0.12) 28%, rgba(15, 2, 2, 0.3) 65%, rgba(0, 0, 0, 0.88) 100%)',
        }}
      >
        {/* Soft Central Floor Glow Radiance */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-[70vw] max-w-[800px] h-[120px]"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(189, 22, 22, 0.32) 0%, rgba(95, 8, 8, 0.12) 50%, transparent 80%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* 4. DEEP VELVET BLACK VIGNETTE */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 42%, rgba(0, 0, 0, 0.6) 82%, #000000 100%)',
        }}
      />
    </div>
  );
};
