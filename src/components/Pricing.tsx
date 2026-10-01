import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PackageItem } from '../types';
import { useCountry } from '../context/CountryContext';

interface PricingProps {
  onSelectPackage: (packageId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  const [activeTab, setActiveTab] = useState<'standard' | 'elite'>('standard');
  const { country, setCountry, getPackagePrice, getEliteStartingPrice, countryConfig } = useCountry();

  return (
    <section id="pricing" className="bg-transparent py-24 relative overflow-hidden border-y border-zinc-900/80">
      {/* Background radial glow */}
      <div
        className="absolute pointer-events-none top-0 right-1/4 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(189, 22, 22,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Matches ReelOnGo hierarchy) */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase text-[#bd1616] font-bold text-xs sm:text-sm tracking-widest">PRICING</p>
          <h2
            className="mt-2 text-center text-white font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight"
            id="pricing-title"
          >
            Pick Your Plan. Book Instantly.
          </h2>
          <p className="mt-3 text-center text-zinc-300 font-normal text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            From a quick hour shoot to a full wedding package — separate local pricing for India and USA with zero hidden charges.
          </p>

          {/* Controls: Country/Currency Selector & Standard/Elite tabs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {/* Country Switcher (India vs USA only) */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner max-w-full overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 pl-3 pr-1 shrink-0">
                Region:
              </span>
              <button
                type="button"
                onClick={() => setCountry('IN')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  country === 'IN'
                    ? 'bg-[#bd1616] text-white shadow-md shadow-[#bd1616]/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
                id="pricing-toggle-in"
              >
                <span>🇮🇳</span>
                <span>India (₹ INR)</span>
              </button>
              <button
                type="button"
                onClick={() => setCountry('US')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  country === 'US'
                    ? 'bg-[#bd1616] text-white shadow-md shadow-[#bd1616]/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
                id="pricing-toggle-us"
              >
                <span>🇺🇸</span>
                <span>USA ($ USD)</span>
              </button>
            </div>

            {/* Switcher tabs */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-zinc-900 border border-zinc-800 shadow-xs max-w-full overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('standard')}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'standard'
                    ? 'bg-[#bd1616] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Standard Packages
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('elite')}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'elite'
                    ? 'bg-[#bd1616] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Wedding &amp; Elite Select
              </button>
            </div>
          </div>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {siteConfig.packages.map((pkg: PackageItem) => {
            const isHighlight = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isHighlight
                    ? 'bg-zinc-950 border-2 border-[#bd1616] shadow-2xl shadow-[#bd1616]/20 md:-translate-y-2'
                    : 'bg-zinc-950 border border-zinc-800 shadow-xl hover:border-zinc-700'
                }`}
                id={`package-card-${pkg.id}`}
              >
                {/* Popular Badge */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#bd1616] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1 border border-[#9e1212]">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>{pkg.badge || 'Most Popular'}</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {pkg.shootTime}
                    </span>
                    {!isHighlight && pkg.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#bd1616] bg-[#bd1616]/15 border border-[#bd1616]/30 px-2 py-0.5 rounded-md">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-2xl font-black text-white tracking-tight">{pkg.name}</h3>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed min-h-[34px]">{pkg.tagline}</p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-zinc-800 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                      {getPackagePrice(pkg.id)}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">+ taxes / shoot</span>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                      What&apos;s Included
                    </p>
                    {pkg.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <span className="flex-shrink-0 mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#bd1616]/20 border border-[#bd1616]/40 text-[#bd1616]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mt-5 pt-4 border-t border-dashed border-zinc-800 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Service Guarantee
                    </p>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#bd1616] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg.id)}
                    className="w-full h-11 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-white shadow-md hover:shadow-lg hover:shadow-[#bd1616]/30"
                  >
                    <span>SELECT THIS PLAN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="mt-2 text-center text-[10px] text-zinc-500">
                    Ideal for: {pkg.idealFor}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Exclusive Tier Banner (Matches ReelOnGo Select pattern) */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-10 text-white shadow-2xl border border-zinc-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#bd1616]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 items-center relative z-10">
            <div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#bd1616] text-white text-xs font-extrabold uppercase tracking-wider border border-[#9e1212] shadow-sm">
                {siteConfig.exclusiveTier.title}
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
                {siteConfig.exclusiveTier.name}
              </h3>
              <p className="mt-2 text-zinc-300 text-sm leading-relaxed max-w-lg">
                {siteConfig.exclusiveTier.tagline}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {siteConfig.exclusiveTier.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bd1616]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end justify-center">
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Starts at</span>
              <div className="text-3xl sm:text-4xl font-black text-white">
                {getEliteStartingPrice()}
              </div>
              <span className="text-xs text-zinc-400">+ taxes {siteConfig.exclusiveTier.period}</span>

              <button
                type="button"
                onClick={() => onSelectPackage('elite-select')}
                className="mt-5 w-full md:w-auto px-7 h-11 rounded-full bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#bd1616]/30 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>BOOK SNAP SHOTS ELITE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
