import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useCountry } from '../context/CountryContext';
import { AnimatedStatCounter } from './AnimatedStatCounter';

export const HeroStatsBar: React.FC = () => {
  const { startingPriceLabel } = useCountry();
  const [triggerKeys, setTriggerKeys] = useState<{ [key: number]: number }>({});

  const handleCardHover = (idx: number) => {
    setTriggerKeys((prev) => ({ ...prev, [idx]: (prev[idx] || 0) + 1 }));
  };

  return (
    <section id="metrics" className="relative py-10 sm:py-14 bg-transparent overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Key Metrics Bar (Responsive 3-metric display with smooth counter animation starting from 0) */}
        <div className="flex justify-center">
          <div className="grid w-full max-w-3xl grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 px-1" id="hero-stats">
            {siteConfig.stats.map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => handleCardHover(idx)}
                className="flex flex-col items-center justify-center bg-zinc-900/90 hover:bg-zinc-900 text-center py-4 sm:py-6 px-4 rounded-2xl border border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                  <AnimatedStatCounter
                    value={stat.value}
                    triggerKey={triggerKeys[idx] || 0}
                    duration={1600}
                    className="bg-gradient-to-r from-white via-zinc-200 to-red-300 bg-clip-text text-transparent inline-block group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges Bar (Single In-Line Row) */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-zinc-800/80 flex flex-nowrap items-center justify-start lg:justify-center gap-x-5 sm:gap-x-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs text-zinc-400 px-2 sm:px-0 py-1">
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
      </div>
    </section>
  );
};
