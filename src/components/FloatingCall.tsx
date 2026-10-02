import React, { useState, useCallback } from 'react';
import { Phone, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const FloatingCall: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPinging, setIsPinging] = useState(false);

  const playHoverSound = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(587, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.11);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.11);
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 200);
    } catch {
      // AudioContext unavailable or restricted
    }
  }, []);

  const handleCallClick = () => {
    setIsPinging(false);
    requestAnimationFrame(() => {
      setIsPinging(true);
      setTimeout(() => {
        setIsPinging(false);
      }, 1000);
    });
  };

  const cleanPhone = siteConfig.business.phone.replace(/[^0-9+]/g, '');

  return (
    <div
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start gap-2 group pb-[env(safe-area-inset-bottom,0px)]"
      id="floating-call-container"
    >
      {/* Tooltip Bubble */}
      {!isDismissed && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-zinc-950/95 text-white text-xs shadow-xl border border-zinc-800 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Call Studio &bull; {siteConfig.business.phone}</span>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-zinc-400 hover:text-white hover:bg-[#bd1616] rounded-full p-0.5 transition-colors cursor-pointer ml-1"
            aria-label="Dismiss notice"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Call Action Button */}
      <a
        href={`tel:${cleanPhone}`}
        onClick={handleCallClick}
        onMouseEnter={playHoverSound}
        aria-label={`Call Snap Shots Studio at ${siteConfig.business.phone}`}
        className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-white shadow-xl shadow-black/50 hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-zinc-900 hover:ring-[#bd1616]/60 border border-[#bd1616]/80 cursor-pointer"
        id="floating-call-btn"
      >
        {/* Subtle Ping Animation Effect Triggered on Click */}
        {isPinging && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#bd1616] animate-ping opacity-75 pointer-events-none duration-700" />
            <span className="absolute -inset-2 rounded-full border-2 border-[#bd1616] animate-ping opacity-50 pointer-events-none duration-1000" />
          </>
        )}
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white relative z-10" />
      </a>
    </div>
  );
};
