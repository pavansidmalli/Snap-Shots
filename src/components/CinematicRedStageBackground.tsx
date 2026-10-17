import React from 'react';

/**
 * ============================================================================
 * CINEMATIC RED STAGE BACKGROUND THEME
 * ============================================================================
 * Faithfully recreates the user's uploaded reference image across the entire site:
 * - Dramatic overhead crimson spotlight beaming downward from the top-center
 * - Twin glowing neon red curved ribbon arcs with lens flares and ember trails
 * - Fine red stardust particle spray along the sweeping wings
 * - Glossy dark reflective stage floor with ambient red light pool & horizon flare
 * - Fixed GPU-accelerated layer that seamlessly frames every section and page
 */
export const CinematicRedStageBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#000000] select-none transform-gpu will-change-transform"
      style={{ transform: 'translate3d(0, 0, 0)' }}
      aria-hidden="true"
    >
      {/* 1. TOP OVERHEAD DRAMATIC CRIMSON SPOTLIGHT */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1800px] h-[65vh] sm:h-[75vh]"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(189, 22, 22, 0.42) 0%, rgba(125, 13, 13, 0.26) 30%, rgba(55, 5, 5, 0.12) 60%, transparent 85%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Volumetric Top Spotlight Conical Angled Beams */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[60vh] opacity-35"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 0%, transparent 60deg, rgba(189, 22, 22, 0.28) 85deg, rgba(230, 45, 45, 0.38) 90deg, rgba(189, 22, 22, 0.28) 95deg, transparent 120deg)',
          filter: 'blur(45px)',
        }}
      />

      {/* Upper-Center Crimson Ambient Flare */}
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px]"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(220, 28, 28, 0.28) 0%, rgba(140, 15, 15, 0.14) 45%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* 2. SVG LAYER: NEON RED CURVED LIGHT RIBBONS & DUST PARTICLES */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="neon-glow-primary" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feGaussianBlur stdDeviation="28" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="soft-glow-wide" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="22" result="blurWide" />
            <feMerge>
              <feMergeNode in="blurWide" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients for Ribbons */}
          <linearGradient id="neon-ribbon-upper" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bd1616" stopOpacity="0.95" />
            <stop offset="12%" stopColor="#ff4d4d" stopOpacity="1" />
            <stop offset="35%" stopColor="#ff2222" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ff7878" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#ff2222" stopOpacity="0.85" />
            <stop offset="88%" stopColor="#ff4d4d" stopOpacity="1" />
            <stop offset="100%" stopColor="#bd1616" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="neon-ribbon-lower" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#750d0d" stopOpacity="0.8" />
            <stop offset="20%" stopColor="#bd1616" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ff3a3a" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#bd1616" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#750d0d" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="floor-horizon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="25%" stopColor="#750d0d" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ff3b3b" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#750d0d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* --- CURVED RIBBON 1: Primary Upper Neon Arc --- */}
        {/* Wide ambient bloom */}
        <path
          d="M -40 220 C 320 540, 680 750, 960 760 C 1240 750, 1600 540, 1960 220"
          fill="none"
          stroke="#bd1616"
          strokeWidth="32"
          opacity="0.25"
          filter="url(#soft-glow-wide)"
        />

        {/* Mid-level neon bloom */}
        <path
          d="M -40 220 C 320 540, 680 750, 960 760 C 1240 750, 1600 540, 1960 220"
          fill="none"
          stroke="url(#neon-ribbon-upper)"
          strokeWidth="10"
          opacity="0.8"
          filter="url(#neon-glow-primary)"
        />

        {/* Intense hot core line */}
        <path
          d="M -40 220 C 320 540, 680 750, 960 760 C 1240 750, 1600 540, 1960 220"
          fill="none"
          stroke="#ffe6e6"
          strokeWidth="2.5"
          opacity="0.95"
        />

        {/* --- CURVED RIBBON 2: Secondary Lower Neon Arc --- */}
        {/* Soft shadow/glow layer */}
        <path
          d="M -40 380 C 360 670, 720 780, 960 785 C 1200 780, 1560 670, 1960 380"
          fill="none"
          stroke="#750d0d"
          strokeWidth="22"
          opacity="0.3"
          filter="url(#soft-glow-wide)"
        />

        {/* Mid glow */}
        <path
          d="M -40 380 C 360 670, 720 780, 960 785 C 1200 780, 1560 670, 1960 380"
          fill="none"
          stroke="url(#neon-ribbon-lower)"
          strokeWidth="6"
          opacity="0.75"
          filter="url(#neon-glow-primary)"
        />

        {/* Core filament */}
        <path
          d="M -40 380 C 360 670, 720 780, 960 785 C 1200 780, 1560 670, 1960 380"
          fill="none"
          stroke="#ff8888"
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* --- CURVED RIBBON 3: Whispering Shadow Flow --- */}
        <path
          d="M -40 480 C 400 730, 750 810, 960 812 C 1170 810, 1520 730, 1960 480"
          fill="none"
          stroke="#bd1616"
          strokeWidth="3"
          opacity="0.35"
        />

        {/* --- SPARKLING EMBER DUST & PARTICLES ALONG THE WINGS --- */}
        {/* Left wing particle clusters */}
        <g opacity="0.85">
          <circle cx="120" cy="280" r="1.5" fill="#ffffff" opacity="0.9" />
          <circle cx="160" cy="330" r="2" fill="#ff7a7a" opacity="0.8" />
          <circle cx="190" cy="310" r="1.2" fill="#ffc800" opacity="0.7" />
          <circle cx="220" cy="380" r="2.5" fill="#ff4d4d" opacity="0.85" />
          <circle cx="250" cy="410" r="1.8" fill="#ffffff" opacity="0.9" />
          <circle cx="280" cy="450" r="1.5" fill="#ff8080" opacity="0.75" />
          <circle cx="320" cy="490" r="2.2" fill="#ff4d4d" opacity="0.8" />
          <circle cx="350" cy="540" r="1.8" fill="#ffc800" opacity="0.7" />
          <circle cx="390" cy="570" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="430" cy="610" r="1.4" fill="#ff6666" opacity="0.8" />
          <circle cx="470" cy="650" r="2" fill="#ff3333" opacity="0.75" />
          <circle cx="510" cy="680" r="1.2" fill="#ffffff" opacity="0.8" />
        </g>

        {/* Right wing particle clusters */}
        <g opacity="0.85">
          <circle cx="1800" cy="280" r="1.5" fill="#ffffff" opacity="0.9" />
          <circle cx="1760" cy="330" r="2" fill="#ff7a7a" opacity="0.8" />
          <circle cx="1730" cy="310" r="1.2" fill="#ffc800" opacity="0.7" />
          <circle cx="1700" cy="380" r="2.5" fill="#ff4d4d" opacity="0.85" />
          <circle cx="1670" cy="410" r="1.8" fill="#ffffff" opacity="0.9" />
          <circle cx="1640" cy="450" r="1.5" fill="#ff8080" opacity="0.75" />
          <circle cx="1600" cy="490" r="2.2" fill="#ff4d4d" opacity="0.8" />
          <circle cx="1570" cy="540" r="1.8" fill="#ffc800" opacity="0.7" />
          <circle cx="1530" cy="570" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="1490" cy="610" r="1.4" fill="#ff6666" opacity="0.8" />
          <circle cx="1450" cy="650" r="2" fill="#ff3333" opacity="0.75" />
          <circle cx="1410" cy="680" r="1.2" fill="#ffffff" opacity="0.8" />
        </g>
      </svg>

      {/* 3. GLOSSY REFLECTIVE STAGE FLOOR & HORIZON REFLECTION POOL */}
      {/* Floor Horizon Neon Baseline */}
      <div
        className="absolute top-[75%] sm:top-[77%] left-0 right-0 h-[2px] opacity-80"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(189,22,22,0.3) 25%, rgba(255,77,77,0.95) 50%, rgba(189,22,22,0.3) 75%, transparent 100%)',
          boxShadow: '0 0 16px 2px rgba(255, 60, 60, 0.65)',
        }}
      />

      {/* Center Stage Floor Spotlight Flare Pool */}
      <div
        className="absolute top-[75%] sm:top-[77%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[700px] h-[70px] sm:h-[100px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 60, 60, 0.5) 0%, rgba(189, 22, 22, 0.25) 45%, transparent 75%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Lower Glossy Stage Reflection Floor Sheen */}
      <div
        className="absolute top-[75%] sm:top-[77%] bottom-0 left-0 right-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(140, 14, 14, 0.24) 0%, rgba(70, 7, 7, 0.14) 25%, rgba(15, 2, 2, 0.35) 60%, rgba(0, 0, 0, 0.85) 100%)',
        }}
      >
        {/* Mirrored Central Floor Radiance */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-[80vw] max-w-[900px] h-[140px]"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(189, 22, 22, 0.35) 0%, rgba(100, 10, 10, 0.15) 50%, transparent 80%)',
            filter: 'blur(25px)',
          }}
        />
      </div>

      {/* 4. SUBTLE PERIMETER VIGNETTE */}
      {/* Guarantees deep true blacks on the outer bounds while maintaining glowing red stage center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.65) 85%, #000000 100%)',
        }}
      />
    </div>
  );
};
