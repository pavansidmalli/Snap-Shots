import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { TestimonialItem } from '../types';
import { getResponsiveImageSrcSet } from '../utils/imageUtils';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden bg-transparent text-white"
    >
      {/* Ambient background glow (in dark red tones) */}
      <div
        className="absolute pointer-events-none top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(189, 22, 22, 0.15) 0%, rgba(18,18,20,0.8) 60%, transparent 80%)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase text-[#bd1616] font-bold text-xs sm:text-sm tracking-widest">
            TESTIMONIALS
          </p>
          <h2
            className="mt-2 text-center text-white font-black text-3xl sm:text-5xl tracking-tight leading-tight"
            id="testimonials-title"
          >
            Insights from Satisfied Clients
          </h2>
          <p className="mt-3 text-center text-zinc-400 font-normal text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Real stories from couples, brand founders, event hosts, and creators across Telangana, India &amp; USA.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {siteConfig.testimonials.map((test: TestimonialItem) => (
            <div
              key={test.id}
              className="relative rounded-3xl bg-zinc-900/90 border border-zinc-800/80 p-5 sm:p-8 shadow-xl hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
              id={`testimonial-card-${test.id}`}
            >
              <div>
                {/* 5 Stars & Location */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#bd1616] text-[#bd1616]" />
                    ))}
                  </div>

                  <span className="text-xs text-zinc-500 font-medium">
                    {test.location} &bull; {test.date}
                  </span>
                </div>

                {/* Event Name */}
                <div className="mt-4 text-xs font-semibold text-zinc-300">
                  {test.event}
                </div>

                {/* Quote */}
                <p className="mt-3 text-sm sm:text-base text-zinc-200 leading-relaxed italic font-normal">
                  {test.quote}
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-8 pt-5 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={test.avatarUrl}
                    srcSet={getResponsiveImageSrcSet(test.avatarUrl, [60, 100, 150])}
                    sizes="44px"
                    width={44}
                    height={44}
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#bd1616]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{test.name}</span>
                      {test.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#bd1616]" />
                      )}
                    </div>
                    <div className="text-xs text-zinc-400">{test.role}</div>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-zinc-800 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Review Badge */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 shadow-md">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Star className="w-4 h-4 fill-[#bd1616] text-[#bd1616]" />
              <span>4.9 / 5.0</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>Over 1,200 verified reviews across Mumbai, Bangalore &amp; NCR</span>
          </div>
        </div>
      </div>
    </section>
  );
};
