import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Sparkles,
  ArrowUpRight,
  Check,
  Instagram,
} from 'lucide-react';
import { ReelWorkItem } from '../types';
import { extractInstagramId, isValidInstagramUrl, getCleanInstagramUrl } from '../utils/instagram';
import { getResponsiveImageSrcSet } from '../utils/imageUtils';
import { siteConfig } from '../config/siteConfig';

interface PortfolioModalProps {
  reel: ReelWorkItem | null;
  onClose: () => void;
  onBookShoot: (category: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ reel, onClose, onBookShoot }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const isInstagram = Boolean(reel?.isInstagram || reel?.instagramUrl);
  const instagramShortcode = reel ? extractInstagramId(reel.instagramUrl || reel.videoUrl) : null;
  const isDirectVideo = Boolean(reel?.videoUrl && reel.videoUrl.endsWith('.mp4'));

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (reel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [reel]);

  if (!reel) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleShare = async () => {
    const shareUrl = isValidInstagramUrl(reel.instagramUrl)
      ? getCleanInstagramUrl(reel.instagramUrl)
      : window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: reel.title,
          text: `Check out this reel by Snap Shots: ${reel.title}`,
          url: shareUrl,
        });
      } catch {
        // Fallback to clipboard if share cancelled
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const instagramTargetUrl = isValidInstagramUrl(reel.instagramUrl)
    ? getCleanInstagramUrl(reel.instagramUrl)
    : siteConfig.business.instagram;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-[#bd1616] text-white hover:bg-[#9e1212] transition-colors cursor-pointer shadow-md border border-[#9e1212]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Column (9:16 vertical presentation) */}
        <div className="relative w-full md:w-[380px] lg:w-[410px] aspect-[9/16] max-h-[55vh] md:max-h-[85vh] bg-black flex-shrink-0 mx-auto flex items-center justify-center overflow-hidden">
          {isInstagram ? (
            instagramShortcode ? (
              /* Official Instagram Embed (Requirement 11) */
              <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                <iframe
                  src={`https://www.instagram.com/reel/${instagramShortcode}/embed/?utm_source=ig_embed`}
                  className="w-full h-full border-0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  title={reel.title}
                />
                {/* Floating Quick Action Overlay (Requirement 10) */}
                <div className="absolute bottom-3 right-3 z-30 pointer-events-auto">
                  <a
                    href={instagramTargetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#bd1616] hover:bg-[#9e1212] text-white text-[11px] font-bold shadow-lg shadow-black/80 transition-all border border-[#9e1212] cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5 text-white" />
                    <span>OPEN ON INSTAGRAM</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </a>
                </div>
              </div>
            ) : (
              /* Visually matching placeholder card if direct embedding not possible from URL alone (Requirement 12) */
              <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <img
                  src={reel.posterUrl}
                  srcSet={getResponsiveImageSrcSet(reel.posterUrl, [360, 540, 720])}
                  sizes="(max-width: 768px) 100vw, 400px"
                  width={400}
                  height={711}
                  loading="lazy"
                  decoding="async"
                  alt={reel.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-[#bd1616]/20" />

                <div className="relative z-20 flex flex-col items-center max-w-xs">
                  <div className="h-16 w-16 rounded-full bg-[#bd1616] border border-[#9e1212] flex items-center justify-center text-white mb-4 shadow-xl">
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-bold text-[#bd1616] uppercase tracking-wider mb-2">
                    {reel.category} Reel
                  </span>
                  <h4 className="text-white text-base sm:text-lg font-bold leading-tight mb-2">
                    {reel.title}
                  </h4>
                  <p className="text-zinc-400 text-xs mb-6">
                    Ready to watch on Instagram with complete audio, music tags, and original high-definition color grade.
                  </p>
                  <a
                    href={instagramTargetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-black/80 transition-all hover:scale-105 border border-[#9e1212] cursor-pointer"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                    <span>WATCH ON INSTAGRAM</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            )
          ) : isDirectVideo ? (
            /* Direct MP4 Video Player */
            <>
              <video
                ref={videoRef}
                src={reel.videoUrl}
                poster={reel.posterUrl}
                loop
                playsInline
                autoPlay
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              {/* Top category info */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                  {reel.category}
                </span>
              </div>

              {/* Audio & Play Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#bd1616] hover:bg-[#9e1212] text-white transition-colors cursor-pointer shadow-sm"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-white" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#bd1616] hover:bg-[#9e1212] text-white transition-colors cursor-pointer shadow-sm"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <span className="text-xs font-mono font-medium text-white/90 bg-black/50 px-2 py-1 rounded-md">
                  {reel.duration}
                </span>
              </div>

              {/* Progress Scrubber */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
                <div
                  className="h-full bg-[#bd1616] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            /* Fallback Poster Card */
            <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
              <img
                src={reel.posterUrl}
                srcSet={getResponsiveImageSrcSet(reel.posterUrl, [360, 540, 720])}
                sizes="(max-width: 768px) 100vw, 400px"
                width={400}
                height={711}
                loading="lazy"
                decoding="async"
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="p-4 sm:p-8 flex flex-col justify-between flex-grow overflow-y-auto text-white">
          <div>
            <div className="flex items-center gap-2 text-white text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#bd1616]" />
              <span>{reel.eventDate || (isInstagram ? 'Delivered via Instagram' : 'Instant Same-Day Delivery')}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">{reel.title}</h2>
            <p className="text-zinc-400 text-sm mt-1">{reel.client}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
                Category: <strong className="text-white">{reel.category}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
                Views: <strong className="text-white">{reel.views}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
                Aspect: <strong className="text-white">9:16 Vertical</strong>
              </span>
            </div>

            <div className="mt-6 border-t border-zinc-800/80 pt-4">
              <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2">
                About this Reel
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{reel.description}</p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400">
              <span className="text-white font-semibold block mb-1">Need this style of content?</span>
              Our Snap Shots creators shoot on location and deliver edited reels within hours.
            </div>
          </div>

          {/* Modal Actions (Requirements 9, 10, and Booking CTA) */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
            {isInstagram && (
              <a
                href={instagramTargetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 h-12 flex items-center justify-center gap-2 rounded-full bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-black/40 transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#9e1212] cursor-pointer"
                id="modal-watch-on-instagram-btn"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span>WATCH ON INSTAGRAM</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            )}

            <button
              onClick={() => {
                onClose();
                onBookShoot(reel.category);
              }}
              className={`w-full ${
                isInstagram ? 'sm:w-auto px-5' : 'sm:flex-1'
              } h-12 flex items-center justify-center gap-2 rounded-full ${
                isInstagram
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-[#bd1616] hover:text-[#bd1616]'
                  : 'bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-white shadow-lg shadow-[#bd1616]/30 border border-[#9e1212]'
              } text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
            >
              <span>BOOK SHOOT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="w-full sm:w-auto h-12 px-5 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent hover:bg-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-[#bd1616]" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied' : 'Share Reel'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
