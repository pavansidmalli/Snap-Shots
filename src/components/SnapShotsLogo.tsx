import React from 'react';

interface SnapShotsLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'watermark';
  showTagline?: boolean;
  taglineClassName?: string;
  showBackground?: boolean;
}

/**
 * SnapShotsLogo - Exact recreation of the official Snap Shots profile artwork
 * ("Snap shots_final logo profile.jpg.jpeg").
 *
 * Features:
 * - Pitch black canvas with warm atmospheric glow.
 * - Solid geometric white typography ("snap") with embedded rewind (<<) in 'a' and fast-forward (>>) in 'p'.
 * - Fiery gradient 's' and tall 'h' leading into camera body.
 * - Camera pentaprism housing with red shutter button on top.
 * - Camera lens 'o' with 8-blade aperture iris and central red play button.
 * - Deep red camera base tray (#bd1616) sweeping underneath lens and 'ts'.
 * - Fiery gradient 't'.
 * - Final solid white 's'.
 */
export const SnapShotsLogo: React.FC<SnapShotsLogoProps> = ({
  className = 'h-9 sm:h-10 w-auto',
  showBackground = true,
}) => {
  return (
    <div className="inline-flex flex-col items-start select-none">
      <svg
        viewBox="0 0 900 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Snap Shots Official Logo"
      >
        <defs>
          {/* Atmospheric background glow matching the profile artwork */}
          <radialGradient id="snapBgGlowComponent" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#ff4500" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#801500" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Fiery gradient for 's', 'h', camera top plate, and 't' */}
          <linearGradient id="snapOrangeFireGradComponent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff3a00" />
            <stop offset="35%" stopColor="#ff5e00" />
            <stop offset="75%" stopColor="#ff8c00" />
            <stop offset="100%" stopColor="#ffb300" />
          </linearGradient>

          {/* Horizontal Underline / Camera Tray Red Gradient (#bd1616) */}
          <linearGradient id="snapSwooshGoldGradComponent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e63939" />
            <stop offset="45%" stopColor="#bd1616" />
            <stop offset="100%" stopColor="#9e1212" />
          </linearGradient>

          {/* Shutter Release Button & Lens Play Icon Red */}
          <linearGradient id="snapRedShutterGradComponent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a2a" />
            <stop offset="100%" stopColor="#cc0000" />
          </linearGradient>

          {/* Dimensional Drop Shadow */}
          <filter id="snapLetterShadowComponent" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* Pitch Black Canvas with Atmospheric Glow */}
        {showBackground && (
          <>
            <rect width="900" height="240" rx="16" fill="#000000" />
            <rect width="900" height="240" rx="16" fill="url(#snapBgGlowComponent)" />
          </>
        )}

        {/* 1. "snap" (Solid White Typography with Rewind & Fast-Forward Chevrons) */}
        <g filter="url(#snapLetterShadowComponent)">
          {/* Letter 1: 's' (Solid Pure White) */}
          <path
            d="M 118 92 C 118 74, 102 64, 76 64 L 48 64 C 32 64, 22 74, 22 90 C 22 104, 32 112, 52 116 L 86 122 C 104 125, 116 133, 116 148 C 116 164, 100 174, 74 174 L 42 174 C 24 174, 16 162, 16 144 L 42 144 C 42 151, 49 155, 67 155 L 74 155 C 88 155, 94 151, 94 145 C 94 139, 88 136, 72 133 L 40 127 C 24 124, 14 116, 14 95 C 14 75, 28 64, 52 64 L 71 64 C 92 64, 105 73, 108 92 Z"
            fill="#FFFFFF"
          />

          {/* Letter 2: 'n' (Solid Pure White) */}
          <path
            d="M 134 66 L 159 66 L 159 86 C 167 72, 182 64, 201 64 C 222 64, 234 76, 234 96 L 234 174 L 209 174 L 209 104 C 209 90, 201 84, 188 84 C 175 84, 165 92, 159 102 L 159 174 L 134 174 Z"
            fill="#FFFFFF"
          />

          {/* Letter 3: 'a' with Rewind Chevrons (<<) */}
          <g>
            <path
              d="M 320 66 L 320 174 L 296 174 L 296 156 C 288 168, 274 174, 257 174 C 233 174, 215 158, 215 134 C 215 110, 233 94, 257 94 C 274 94, 288 100, 296 112 L 296 66 Z
                 M 296 134 C 296 118, 284 110, 269 110 C 254 110, 242 118, 242 134 C 242 150, 254 158, 269 158 C 284 158, 296 150, 296 134 Z"
              fill="#FFFFFF"
              fillRule="evenodd"
            />
            {/* Embedded black rewind chevrons */}
            <polygon points="257,134 269,124 269,144" fill="#000000" />
            <polygon points="273,134 285,124 285,144" fill="#000000" />
          </g>

          {/* Letter 4: 'p' with Fast-Forward Chevrons (>>) */}
          <g>
            <path
              d="M 338 66 L 363 66 L 363 84 C 371 72, 385 64, 403 64 C 428 64, 445 80, 445 104 C 445 128, 428 144, 403 144 C 385 144, 371 136, 363 124 L 363 216 L 338 216 Z
                 M 363 104 C 363 120, 374 128, 389 128 C 404 128, 417 120, 417 104 C 417 88, 404 80, 389 80 C 374 80, 363 88, 363 104 Z"
              fill="#FFFFFF"
              fillRule="evenodd"
            />
            {/* Embedded black fast-forward chevrons */}
            <polygon points="397,104 385,94 385,114" fill="#000000" />
            <polygon points="411,104 399,94 399,114" fill="#000000" />
          </g>
        </g>

        {/* 2. "shots" Camera Artwork Section (Fiery Gradient & Camera Structure) */}
        {/* Letter 5: 's' (Fiery Orange/Red Gradient) */}
        <g filter="url(#snapLetterShadowComponent)">
          <path
            d="M 536 92 C 536 74, 520 64, 494 64 L 468 64 C 452 64, 442 74, 442 90 C 442 104, 452 112, 472 116 L 506 122 C 524 125, 536 133, 536 148 C 536 164, 520 174, 494 174 L 462 174 C 444 174, 436 162, 436 144 L 462 144 C 462 151, 469 155, 487 155 L 494 155 C 508 155, 514 151, 514 145 C 514 139, 508 136, 492 133 L 460 127 C 444 124, 434 116, 434 95 C 434 75, 448 64, 472 64 L 491 64 C 512 64, 525 73, 528 92 Z"
            fill="url(#snapOrangeFireGradComponent)"
          />
        </g>

        {/* Camera Pentaprism top hump */}
        <path
          d="M 598 54 L 598 36 C 598 26, 608 24, 620 24 L 672 24 C 684 24, 694 30, 696 40 L 698 54 Z"
          fill="url(#snapOrangeFireGradComponent)"
        />

        {/* Red Shutter Release Button on Camera */}
        <g>
          <rect x="648" y="14" width="28" height="9" rx="4.5" fill="url(#snapRedShutterGradComponent)" />
          <rect x="651" y="16" width="22" height="2.5" rx="1.2" fill="#FFFFFF" fillOpacity="0.55" />
        </g>

        {/* Letter 6: 'h' and Camera Body Frame */}
        <g>
          <path
            d="M 552 20 L 576 20 L 576 174 L 552 174 Z"
            fill="url(#snapOrangeFireGradComponent)"
          />
          <path
            d="M 574 96 C 582 74, 598 64, 618 64 C 640 64, 652 76, 652 98 L 652 162 C 652 182, 666 198, 696 198 L 788 198 C 800 198, 808 195, 794 200 C 760 212, 646 212, 618 192 C 610 186, 608 176, 608 158 L 608 104 C 608 90, 602 82, 590 82 C 578 82, 572 90, 572 96 Z"
            fill="url(#snapOrangeFireGradComponent)"
          />
        </g>

        {/* Red Camera Base Bracket / Underline Swoosh (#bd1616) */}
        <path
          d="M 606 176 C 606 186, 614 195, 626 195 L 794 195 C 804 195, 810 197, 790 201 C 748 209, 646 209, 614 197 C 606 193, 606 184, 606 176 Z"
          fill="url(#snapSwooshGoldGradComponent)"
        />

        {/* Camera Lens 'o' (Aperture Iris + Central Red Play Triangle) */}
        <g transform="translate(688, 118)">
          {/* Outer Lens Housing */}
          <circle cx="0" cy="0" r="44" stroke="url(#snapOrangeFireGradComponent)" strokeWidth="4" fill="#000000" />
          <circle cx="0" cy="0" r="40" fill="#FFFFFF" />

          {/* 8 Geometric Aperture Iris Blades */}
          <g stroke="#000000" strokeWidth="2" strokeLinecap="round">
            <line x1="0" y1="-40" x2="25" y2="-12" />
            <line x1="25" y1="-12" x2="38" y2="15" />
            <line x1="38" y1="15" x2="16" y2="37" />
            <line x1="16" y1="37" x2="-16" y2="37" />
            <line x1="-16" y1="37" x2="-37" y2="16" />
            <line x1="-37" y1="16" x2="-28" y2="-18" />
            <line x1="-28" y1="-18" x2="-8" y2="-38" />
            <line x1="-8" y1="-38" x2="16" y2="-38" />
          </g>

          {/* Center Circular Hole & Red Play Arrow */}
          <circle cx="0" cy="0" r="16" fill="#000000" />
          <polygon points="-5,-9 10,0 -5,9" fill="url(#snapRedShutterGradComponent)" />
        </g>

        {/* Letter 8: 't' (Fiery Orange Gradient) */}
        <g>
          <path d="M 742 76 L 804 76 L 804 92 L 742 92 Z" fill="url(#snapOrangeFireGradComponent)" />
          <path
            d="M 762 48 L 786 48 L 786 146 C 786 158, 794 164, 806 164 L 812 164 L 812 178 C 798 180, 778 179, 770 170 C 762 160, 762 150, 762 136 Z"
            fill="url(#snapOrangeFireGradComponent)"
          />
        </g>

        {/* Letter 9: 's' (Solid Pure White) */}
        <g filter="url(#snapLetterShadowComponent)" fill="#FFFFFF">
          <path
            d="M 888 92 C 888 74, 872 64, 846 64 L 820 64 C 804 64, 794 74, 794 90 C 794 104, 804 112, 824 116 L 858 122 C 876 125, 888 133, 888 148 C 888 164, 872 174, 846 174 L 814 174 C 796 174, 788 162, 788 144 L 814 144 C 814 151, 821 155, 839 155 L 846 155 C 860 155, 866 151, 866 145 C 866 139, 860 136, 844 133 L 812 127 C 796 124, 786 116, 786 95 C 786 75, 800 64, 824 64 L 843 64 C 864 64, 877 73, 880 92 Z"
          />
        </g>
      </svg>
    </div>
  );
};
