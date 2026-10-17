import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Film,
  Upload,
  RotateCcw,
  Save,
  Check,
  CheckCircle2,
  Loader2,
  Instagram,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ReelWorkItem } from '../types';
import { isAiStudioEnvironment } from '../utils/aiStudioEnv';
import { UploadVideoModal } from './UploadVideoModal';
import { subscribeToSlides, saveSlideToFirestore } from '../config/firebase';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  isValidInstagramUrl,
  getInstagramEmbedUrl,
  getCleanInstagramUrl,
} from '../utils/instagram';

interface PortfolioProps {
  onSelectReel?: (reel: ReelWorkItem) => void;
}

/**
 * Individual Video Slide Card:
 * Enforces rule: ONLY the middle video plays. All other side videos are strictly paused.
 * When a video comes to the middle, it plays; when it leaves the middle, it pauses.
 */
interface VideoSlideCardProps {
  videoUrl: string;
  posterUrl?: string;
  isCenter: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  title?: string;
  category?: string;
  instagramUrl?: string;
  slideNumber?: number;
  onVideoRefReady?: (el: HTMLVideoElement | null) => void;
}

const VideoSlideCard: React.FC<VideoSlideCardProps> = ({
  videoUrl,
  posterUrl,
  isCenter,
  isPlaying,
  isMuted,
  title,
  category,
  instagramUrl,
  slideNumber,
  onVideoRefReady,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMediaReady, setIsMediaReady] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Check if this slide is linked to an Instagram Reel
  const effectiveUrl = videoUrl || instagramUrl || '';
  const isInstagram = Boolean(
    effectiveUrl &&
    (isValidInstagramUrl(effectiveUrl) ||
     effectiveUrl.includes('instagram.com/reel') ||
     effectiveUrl.includes('instagram.com/p/'))
  );
  const instagramEmbedUrl = isInstagram ? getInstagramEmbedUrl(effectiveUrl) : null;
  const cleanInstagramLink = isInstagram ? getCleanInstagramUrl(effectiveUrl) : null;

  // Reset loading state if video source URL changes
  useEffect(() => {
    setIsMediaReady(false);
    setHasError(false);
  }, [videoUrl, posterUrl, effectiveUrl]);

  useEffect(() => {
    // For direct video playback
    const video = videoRef.current;
    if (!video || isInstagram) return;

    video.defaultMuted = isCenter ? isMuted : true;
    video.muted = isCenter ? isMuted : true;

    if (isCenter) {
      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Only fall back to muted if initial unmuted autoplay was rejected by browser policy
            if (isMuted) {
              video.muted = true;
              video.play().catch(() => {});
            }
          });
        }
      } else {
        video.pause();
      }
    } else {
      // Side videos MUST be paused and muted at all times
      video.muted = true;
      video.pause();
    }
  }, [isCenter, isPlaying, isMuted, videoUrl, isInstagram]);

  const handleMediaLoaded = () => {
    setIsMediaReady(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* ================================================================ */}
      {/* SKELETON LOADER & SUBTLE ANIMATED PULSE                          */}
      {/* Displayed while video and poster are being fetched & initialized */}
      {/* ================================================================ */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-between p-4 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black select-none pointer-events-none transition-opacity duration-500 ease-out ${
          isMediaReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={isMediaReady}
      >
        {/* Shimmer light sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-shimmer" />

        {/* Top skeleton tag & live pulse dot */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="h-2.5 w-16 rounded-full bg-zinc-800/80 animate-pulse" />
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bd1616] animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#bd1616]/70" />
          </div>
        </div>

        {/* Center reel icon with subtle brand red pulsing glow */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full bg-[#bd1616]/20 animate-ping opacity-30" />
            <div className="relative w-12 h-12 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center shadow-lg backdrop-blur-sm">
              <Film className="w-5 h-5 text-zinc-400 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bd1616]" />
            <span>Loading Reel</span>
          </div>
        </div>

        {/* Bottom metadata skeleton lines */}
        <div className="relative z-10 space-y-2">
          <div className="h-3 w-4/5 rounded-full bg-zinc-800/80 animate-pulse" />
          <div className="h-2 w-1/2 rounded-full bg-zinc-800/50 animate-pulse" />
        </div>
      </div>

      {/* Background Poster: Only displayed if a genuine user-uploaded poster is provided (never Unsplash) */}
      {posterUrl && !posterUrl.includes('unsplash.com') && (
        <img
          src={posterUrl}
          alt={title || ''}
          aria-hidden="true"
          onLoad={handleMediaLoaded}
          onError={() => {
            // Even if poster errors out, don't trap the user in the loading skeleton
            setIsMediaReady(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-500 ease-out will-change-transform group-hover:scale-105 ${
            isMediaReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Case 1: Instagram Reel Embed for center slide */}
      {isInstagram && instagramEmbedUrl && isCenter && (
        <div className="relative z-10 w-full h-full bg-black">
          <iframe
            src={instagramEmbedUrl}
            className="w-full h-full border-0 select-none bg-black"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleMediaLoaded}
            title={title || 'Instagram Reel'}
          />
          {cleanInstagramLink && (
            <a
              href={cleanInstagramLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-2.5 left-2.5 right-2.5 z-30 px-3 py-1.5 rounded-full bg-black/85 hover:bg-[#bd1616] border border-white/20 text-white text-[10px] font-bold flex items-center justify-between backdrop-blur-md transition-colors shadow-lg"
            >
              <span className="flex items-center gap-1.5 truncate">
                <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span className="truncate">Open on Instagram</span>
              </span>
              <ExternalLink className="w-3 h-3 shrink-0 ml-1 text-zinc-300" />
            </a>
          )}
        </div>
      )}

      {/* Case 1b: Instagram Reel badge overlay for side slides */}
      {isInstagram && !isCenter && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
          <Instagram className="w-3 h-3 text-[#bd1616]" />
          <span>Instagram Reel</span>
        </div>
      )}

      {/* Case 2: Primary HTML5 Video Element for direct video files (.mp4, .webm, blob) */}
      {!isInstagram && videoUrl && (
        <video
          ref={(el) => {
            videoRef.current = el;
            if (isCenter && onVideoRefReady) {
              onVideoRefReady(el);
            }
          }}
          src={videoUrl}
          poster={posterUrl && !posterUrl.includes('unsplash.com') ? posterUrl : undefined}
          playsInline
          webkit-playsinline="true"
          loop
          preload="auto"
          muted={isCenter ? isMuted : true}
          onLoadedMetadata={() => {
            setIsMediaReady(true);
            const v = videoRef.current;
            if (v && v.currentTime === 0) {
              try {
                v.currentTime = 0.001;
              } catch {}
            }
            if (isCenter && onVideoRefReady && v) {
              onVideoRefReady(v);
            }
          }}
          onLoadedData={handleMediaLoaded}
          onCanPlay={handleMediaLoaded}
          onPlaying={handleMediaLoaded}
          onError={() => {
            // Local file or remote video failed to load (e.g. 404 on host)
            setHasError(true);
            setIsMediaReady(true);
          }}
          className={`relative z-10 w-full h-full object-cover transition-opacity duration-500 ${
            isMediaReady && !hasError ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Graceful Video Load Fallback: shown when video URL returns 404 or fails */}
      {hasError && !isInstagram && (
        <div className="absolute inset-0 z-15 flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-xs text-center select-none pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/75 border border-white/20 flex items-center justify-center mb-2 shadow-lg">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide line-clamp-1">{title}</span>
          <span className="text-[10px] text-zinc-300 mt-0.5 uppercase tracking-wider font-semibold">
            {category || 'Snap Shots 4K Edit'}
          </span>
        </div>
      )}
    </div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const centerVideoRef = useRef<HTMLVideoElement | null>(null);
  const directFileInputRef = useRef<HTMLInputElement | null>(null);

  // Exact target slide locked when user triggers upload
  const targetSlideRef = useRef<number>(0);

  // Check if running in AI Studio development/workspace mode or logged in as Admin
  const { isAdmin } = useAdminAuth();
  const isAiStudio = isAiStudioEnvironment() || isAdmin;

  // Strict replacement dictionary keyed purely by numeric slide index (0, 1, 2, ...)
  const [replacedBySlide, setReplacedBySlide] = useState<
    Record<number, { videoUrl: string; posterUrl?: string }>
  >(() => {
    try {
      const saved = localStorage.getItem('snapshots_slide_replacements_strict_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        const clean: Record<number, { videoUrl: string; posterUrl?: string }> = {};
        Object.entries(parsed).forEach(([k, v]: [string, any]) => {
          if (v?.videoUrl && !v.videoUrl.startsWith('blob:') && !v.videoUrl.includes('/assets/uploads/')) {
            clean[Number(k)] = v;
          }
        });
        return clean;
      }

      const legacy = localStorage.getItem('snapshots_replaced_videos_map');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const migrated: Record<number, { videoUrl: string; posterUrl?: string }> = {};
        siteConfig.portfolioReels.forEach((reel, idx) => {
          const item = parsed[reel.id] || parsed[`slide-${idx}`];
          if (item?.videoUrl && !item.videoUrl.startsWith('blob:') && !item.videoUrl.includes('/assets/uploads/')) {
            migrated[idx] = item;
          }
        });
        return migrated;
      }
      return {};
    } catch {
      return {};
    }
  });

  // Fetch permanent custom slides from server (/api/custom-slides and /custom-slides.json)
  // Ensures uploaded videos show up reliably on the live website for all visitors
  useEffect(() => {
    let isMounted = true;
    const fetchSavedSlides = async () => {
      try {
        // Try /api/custom-slides first, fall back to /custom-slides.json
        let res = await fetch(`/api/custom-slides?t=${Date.now()}`).catch(() => null);
        if (!res || !res.ok || (res.headers.get('content-type') && !res.headers.get('content-type')!.includes('json'))) {
          // If running on static host (e.g. Vercel) where API routes rewrite to HTML, fetch static JSON
          res = await fetch(`/custom-slides.json?t=${Date.now()}`).catch(() => null);
        }
        if (res && res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('json') || contentType.includes('text/plain') || contentType === '') {
            const data = await res.json();
            if (isMounted && data && typeof data === 'object') {
              const parsed: Record<number, { videoUrl: string; posterUrl?: string }> = {};
              Object.entries(data).forEach(([key, val]: [string, any]) => {
                const numKey = Number(key);
                if (!isNaN(numKey) && val?.videoUrl && !val.videoUrl.startsWith('blob:') && !val.videoUrl.includes('/assets/uploads/')) {
                  parsed[numKey] = {
                    videoUrl: val.videoUrl,
                    posterUrl: val.posterUrl || '',
                  };
                }
              });
              if (Object.keys(parsed).length > 0) {
                setReplacedBySlide((prev) => {
                  const merged = { ...prev, ...parsed };
                  try {
                    localStorage.setItem(
                      'snapshots_slide_replacements_strict_v3',
                      JSON.stringify(merged)
                    );
                  } catch {}
                  return merged;
                });
              }
            }
          }
        }
      } catch (e) {
        console.warn('Could not load custom slides from server:', e);
      }
    };

    fetchSavedSlides();

    // Real-time synchronization with Firebase Firestore
    let unsubscribeFirestore = () => {};
    try {
      unsubscribeFirestore = subscribeToSlides((firestoreSlides) => {
        if (isMounted && Object.keys(firestoreSlides).length > 0) {
          const cleanFirestore: Record<number, { videoUrl: string; posterUrl?: string }> = {};
          Object.entries(firestoreSlides).forEach(([k, v]) => {
            if (v?.videoUrl && !v.videoUrl.includes('/assets/uploads/')) {
              cleanFirestore[Number(k)] = v;
            }
          });
          if (Object.keys(cleanFirestore).length > 0) {
            setReplacedBySlide((prev) => {
              const merged = { ...prev, ...cleanFirestore };
              try {
                localStorage.setItem(
                  'snapshots_slide_replacements_strict_v3',
                  JSON.stringify(merged)
                );
              } catch {}
              return merged;
            });
          }
        }
      });
    } catch (e) {
      console.warn('Firebase slides listener not active:', e);
    }

    return () => {
      isMounted = false;
      unsubscribeFirestore();
    };
  }, []);

  // Map reels: Filter to only slides with active videos (slides 1, 2, 5 & 7 removed)
  const filteredReels: ReelWorkItem[] = siteConfig.portfolioReels
    .map((reel, idx) => {
      const replacement = replacedBySlide[idx];
      const cleanReelPoster = reel.posterUrl && !reel.posterUrl.includes('unsplash.com') ? reel.posterUrl : undefined;
      if (replacement && replacement.videoUrl && !replacement.videoUrl.includes('/assets/uploads/')) {
        const cleanReplacementPoster =
          replacement.posterUrl && !replacement.posterUrl.includes('unsplash.com')
            ? replacement.posterUrl
            : undefined;
        return {
          ...reel,
          videoUrl: replacement.videoUrl,
          posterUrl: cleanReplacementPoster || cleanReelPoster,
        };
      }
      return {
        ...reel,
        videoUrl: reel.videoUrl || '',
        posterUrl: cleanReelPoster,
      };
    })
    .filter((reel) => Boolean(reel.videoUrl && reel.videoUrl.trim() !== ''));

  const totalSlides = filteredReels.length;

  const handleNext = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
    setIsPlaying(true);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsPlaying(true);
  }, [totalSlides]);

  const toggleCenterPlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Synchronous audio toggle ensuring immediate sound playback on mobile & touch devices
  const toggleSound = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    const video = centerVideoRef.current;
    if (video) {
      video.muted = nextMuted;
      if (!nextMuted) {
        video.volume = 1.0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  };

  // Tap on active center video: un-mutes immediately if muted (standard mobile video behavior), or toggles pause/play
  const handleCenterSlideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = centerVideoRef.current;
    if (isMuted && video) {
      toggleSound(e);
      return;
    }
    toggleCenterPlay();
  };

  /**
   * Upload video file to server permanently and update slide
   */
  const uploadVideoToServer = async (
    targetIndex: number,
    file: File,
    posterDataUrl?: string
  ) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('slideIndex', String(targetIndex));
      formData.append('video', file);
      if (posterDataUrl) {
        formData.append('posterDataUrl', posterDataUrl);
      }

      const res = await fetch('/api/upload-video-file', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.videoUrl) {
        // Permanent server-hosted URL
        const permanentVideoUrl = data.videoUrl;
        const permanentPosterUrl = data.posterUrl || posterDataUrl;

        setReplacedBySlide((prev) => {
          const updated = {
            ...prev,
            [targetIndex]: {
              videoUrl: permanentVideoUrl,
              posterUrl: permanentPosterUrl,
            },
          };
          try {
            localStorage.setItem(
              'snapshots_slide_replacements_strict_v3',
              JSON.stringify(updated)
            );
          } catch {}
          return updated;
        });

        // Also synchronize to Firebase Firestore for cloud persistence
        saveSlideToFirestore(targetIndex, permanentVideoUrl, permanentPosterUrl).catch((e) =>
          console.warn('Firebase slide sync notice:', e)
        );

        setHasUnsavedChanges(false);
        setSaveSuccessMessage(`Slide #${targetIndex + 1} video uploaded & saved permanently for live site!`);
        setTimeout(() => setSaveSuccessMessage(null), 4000);
        return;
      }
    } catch (err) {
      console.error('Multipart upload error, trying base64 fallback:', err);
      // Fallback: convert file to base64 and send via /api/upload-video
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = reader.result as string;
          const fallbackRes = await fetch('/api/upload-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              slideIndex: targetIndex,
              videoBase64: base64,
              posterBase64: posterDataUrl,
            }),
          });
          if (fallbackRes.ok) {
            const fbData = await fallbackRes.json();
            if (fbData.success && fbData.videoUrl) {
              setReplacedBySlide((prev) => {
                const updated = {
                  ...prev,
                  [targetIndex]: {
                    videoUrl: fbData.videoUrl,
                    posterUrl: fbData.posterUrl || posterDataUrl,
                  },
                };
                try {
                  localStorage.setItem(
                    'snapshots_slide_replacements_strict_v3',
                    JSON.stringify(updated)
                  );
                } catch {}
                return updated;
              });
              setHasUnsavedChanges(false);
              setSaveSuccessMessage(`Slide #${targetIndex + 1} saved successfully!`);
              setTimeout(() => setSaveSuccessMessage(null), 4000);
            }
          }
        };
        reader.readAsDataURL(file);
      } catch (fbErr) {
        console.error('Fallback upload failed:', fbErr);
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Strictly apply video replacement to ONE single slide index only
  const applySlideReplacement = (
    targetIndex: number,
    newVideoUrl: string,
    newPosterUrl?: string,
    file?: File
  ) => {
    // 1. Immediately update local state so user sees instantaneous responsive feedback
    setReplacedBySlide((prev) => {
      const updated = {
        ...prev,
        [targetIndex]: {
          videoUrl: newVideoUrl,
          posterUrl: newPosterUrl,
        },
      };

      try {
        localStorage.setItem(
          'snapshots_slide_replacements_strict_v3',
          JSON.stringify(updated)
        );
      } catch {}

      return updated;
    });

    // Lock to this slide and play immediately
    setActiveIndex(targetIndex);
    setIsPlaying(true);
    setHasUnsavedChanges(true);

    // 2. If a local File was provided, stream it to server permanently
    if (file) {
      uploadVideoToServer(targetIndex, file, newPosterUrl);
    } else if (newVideoUrl.startsWith('http://') || newVideoUrl.startsWith('https://') || newVideoUrl.startsWith('/')) {
      // Synchronize directly to Firebase Firestore for cloud persistence across all live visitors
      saveSlideToFirestore(targetIndex, newVideoUrl, newPosterUrl).catch((err) =>
        console.warn('Firebase slide sync notice:', err)
      );

      // Also persist to server endpoint if running
      fetch('/api/upload-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slideIndex: targetIndex,
          directUrl: newVideoUrl,
          posterBase64: newPosterUrl,
        }),
      })
        .then(() => {
          setHasUnsavedChanges(false);
          setSaveSuccessMessage(`Slide #${targetIndex + 1} video link saved & live on website!`);
          setTimeout(() => setSaveSuccessMessage(null), 4000);
        })
        .catch(() => {
          setHasUnsavedChanges(false);
          setSaveSuccessMessage(`Slide #${targetIndex + 1} published to live website!`);
          setTimeout(() => setSaveSuccessMessage(null), 4000);
        });
    }
  };

  // Explicit Save Changes handler (pushes state to server /api/save-all-slides)
  const handleSaveChanges = async () => {
    try {
      const cleanSlides: Record<number, { videoUrl: string; posterUrl?: string }> = {};
      Object.entries(replacedBySlide).forEach(([k, v]) => {
        if (v?.videoUrl && !v.videoUrl.startsWith('blob:')) {
          cleanSlides[Number(k)] = v;
        }
      });

      localStorage.setItem(
        'snapshots_slide_replacements_strict_v3',
        JSON.stringify(cleanSlides)
      );

      const res = await fetch('/api/save-all-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides: cleanSlides }),
      });

      // Synchronize to Firebase Firestore in cloud
      Object.entries(cleanSlides).forEach(([k, v]) => {
        saveSlideToFirestore(Number(k), v.videoUrl, v.posterUrl).catch((e) =>
          console.warn('Firebase batch sync notice:', e)
        );
      });

      if (res.ok) {
        setHasUnsavedChanges(false);
        const count = Object.keys(replacedBySlide).length;
        setSaveSuccessMessage(
          count > 0
            ? `Saved! ${count} video slide${count > 1 ? 's' : ''} locked in and live on website.`
            : `Slides state saved.`
        );
      } else {
        setSaveSuccessMessage('Saved locally. Changes active in preview.');
      }
    } catch {
      setSaveSuccessMessage('Saved locally in browser.');
    }

    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4500);
  };

  // Trigger file upload for a specific slide
  const triggerUploadForSlide = (slideIndex: number) => {
    targetSlideRef.current = slideIndex;
    setActiveIndex(slideIndex);
    directFileInputRef.current?.click();
  };

  // Direct file picked callback
  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use locked target slide index
    const targetIndex = targetSlideRef.current;
    const blobUrl = URL.createObjectURL(file);

    // Apply replacement immediately with blob URL so preview is INSTANT and responsive
    applySlideReplacement(targetIndex, blobUrl, undefined, file);

    // Also extract poster frame in background without blocking upload
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = blobUrl;
      video.muted = true;
      video.playsInline = true;
      video.onloadedmetadata = () => {
        video.currentTime = Math.min(0.5, (video.duration || 1) / 2);
      };
      video.onseeked = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || 720;
          canvas.height = video.videoHeight || 1280;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const poster = canvas.toDataURL('image/jpeg', 0.85);
            setReplacedBySlide((prev) => ({
              ...prev,
              [targetIndex]: {
                videoUrl: prev[targetIndex]?.videoUrl || blobUrl,
                posterUrl: poster,
              },
            }));
          }
        } catch {}
      };
    } catch {}

    // Reset input so re-selecting same file triggers change
    e.target.value = '';
  };

  // Reset a specific slide
  const handleResetSlide = async (slideIndex: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setReplacedBySlide((prev) => {
      const updated = { ...prev };
      delete updated[slideIndex];
      try {
        localStorage.setItem(
          'snapshots_slide_replacements_strict_v3',
          JSON.stringify(updated)
        );
      } catch {}
      return updated;
    });

    try {
      await fetch('/api/reset-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideIndex }),
      });
    } catch {}

    setHasUnsavedChanges(false);
    setSaveSuccessMessage(`Slide #${slideIndex + 1} reset to default.`);
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  // Reset all slides
  const handleResetAllSlides = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setReplacedBySlide({});
    try {
      localStorage.removeItem('snapshots_slide_replacements_strict_v3');
      localStorage.removeItem('snapshots_replaced_videos_map');
      localStorage.removeItem('snapshots_replaced_demo_video');
    } catch {}

    try {
      await fetch('/api/reset-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetAll: true }),
      });
    } catch {}

    setActiveIndex(0);
    setIsPlaying(true);
    setHasUnsavedChanges(false);
    setSaveSuccessMessage('All slides reset to default demo videos.');
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  // IMPORTANT: Disable auto-scroll in AI Studio mode so slides NEVER shift while user is editing/uploading!
  useEffect(() => {
    if (isAiStudio || isHovered || totalSlides <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAiStudio, isHovered, totalSlides, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsHovered(false);
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    setTouchStartX(null);
  };

  const isCurrentSlideCustomized = Boolean(replacedBySlide[activeIndex]);
  const hasAnyCustomReplacements = Object.keys(replacedBySlide).length > 0;

  return (
    <div id="work" className="bg-transparent pt-4 sm:pt-6 pb-6 sm:pb-8 relative overflow-hidden select-none">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hidden File Picker directly locked to targetSlideRef */}
        <input
          ref={directFileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime,video/*"
          onChange={handleFilePicked}
          className="hidden"
        />

        {/* 3D-Feel Carousel / Pure Video Slides Stage */}
        <div
          className="relative h-[440px] min-[390px]:h-[480px] sm:h-[530px] md:h-[560px] max-w-5xl lg:max-w-6xl mx-auto flex items-center justify-center overflow-hidden sm:overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {filteredReels.map((reel, index) => {
            // Compute relative offset (-2, -1, 0, 1, 2)
            let diff = index - activeIndex;
            if (diff > totalSlides / 2) diff -= totalSlides;
            if (diff < -totalSlides / 2) diff += totalSlides;

            const isCenter = diff === 0;
            const isAdjacentLeft = diff === -1;
            const isAdjacentRight = diff === 1;
            const isFarLeft = diff === -2;
            const isFarRight = diff === 2;

            // Show 5 slides: center + 2 equal-sized divs on left + 2 equal-sized divs on right
            if (Math.abs(diff) > 2) {
              return null;
            }

            return (
              <div
                key={reel.id || index}
                onClick={(e) => {
                  if (isCenter) {
                    handleCenterSlideClick(e);
                  } else {
                    // Clicking ANY side card selects that exact slide immediately
                    setActiveIndex(index);
                    setIsPlaying(true);
                  }
                }}
                className={`absolute transition-all duration-500 ease-out will-change-transform cursor-pointer ${
                  isCenter
                    ? 'z-30 w-[240px] min-[390px]:w-[265px] sm:w-[290px] md:w-[320px] aspect-[9/16] rounded-[26px] sm:rounded-[34px] overflow-hidden bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(189,22,22,0.3)] border-2 border-zinc-700/80 hover:border-[#bd1616] scale-100 translate-x-0 opacity-100 group'
                    : isAdjacentLeft
                    ? 'z-20 w-[205px] min-[390px]:w-[225px] sm:w-[245px] md:w-[275px] aspect-[9/16] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-zinc-950 shadow-xl border border-zinc-800/80 -translate-x-[140px] min-[390px]:-translate-x-[160px] sm:-translate-x-[200px] md:-translate-x-[240px] scale-[0.88] opacity-80 hover:opacity-95'
                    : isAdjacentRight
                    ? 'z-20 w-[205px] min-[390px]:w-[225px] sm:w-[245px] md:w-[275px] aspect-[9/16] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-zinc-950 shadow-xl border border-zinc-800/80 translate-x-[140px] min-[390px]:translate-x-[160px] sm:translate-x-[200px] md:translate-x-[240px] scale-[0.88] opacity-80 hover:opacity-95'
                    : isFarLeft
                    ? 'z-10 w-[175px] min-[390px]:w-[190px] sm:w-[210px] md:w-[235px] aspect-[9/16] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-zinc-950 shadow-lg border border-zinc-800/60 -translate-x-[250px] min-[390px]:-translate-x-[280px] sm:-translate-x-[360px] md:-translate-x-[430px] scale-[0.76] opacity-50 hover:opacity-75'
                    : 'z-10 w-[175px] min-[390px]:w-[190px] sm:w-[210px] md:w-[235px] aspect-[9/16] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-zinc-950 shadow-lg border border-zinc-800/60 translate-x-[250px] min-[390px]:translate-x-[280px] sm:translate-x-[360px] md:translate-x-[430px] scale-[0.76] opacity-50 hover:opacity-75'
                }`}
              >
                {/* 9:16 Pure Video Slide Stage: ONLY middle plays, all sides are strictly paused */}
                <div className="relative w-full h-full bg-black">
                  {(() => {
                    const isInstagramReel = Boolean(
                      (reel.videoUrl && (isValidInstagramUrl(reel.videoUrl) || reel.videoUrl.includes('instagram.com/reel') || reel.videoUrl.includes('instagram.com/p/'))) ||
                      (reel.instagramUrl && isValidInstagramUrl(reel.instagramUrl))
                    );

                    return (
                      <>
                        <VideoSlideCard
                          videoUrl={reel.videoUrl}
                          posterUrl={reel.posterUrl}
                          isCenter={isCenter}
                          isPlaying={isPlaying}
                          isMuted={isMuted}
                          title={reel.title}
                          category={reel.category}
                          instagramUrl={reel.instagramUrl}
                          slideNumber={index + 1}
                          onVideoRefReady={(el) => {
                            if (isCenter) {
                              centerVideoRef.current = el;
                            }
                          }}
                        />

                        {/* Sound Icon Button - prominent touch target for mobile and desktop */}
                        {isCenter && !isInstagramReel && (
                          <button
                            type="button"
                            onClick={toggleSound}
                            className={`absolute top-3.5 right-3.5 z-40 h-11 w-11 sm:h-10 sm:w-10 flex items-center justify-center rounded-full transition-all cursor-pointer backdrop-blur-md shadow-xl active:scale-90 border ${
                              isMuted
                                ? 'bg-black/80 hover:bg-[#bd1616] text-white border-white/30'
                                : 'bg-[#bd1616] text-white border-white/50 shadow-[#bd1616]/50 shadow-lg'
                            }`}
                            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                            title={isMuted ? 'Tap to enable sound' : 'Mute sound'}
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5 text-white" />
                            ) : (
                              <Volume2 className="w-5 h-5 text-white animate-pulse" />
                            )}
                          </button>
                        )}

                        {/* Mobile-Friendly "Tap for Sound" Floating Pill: Shown when muted and playing */}
                        {isCenter && isPlaying && isMuted && !isInstagramReel && (
                          <button
                            type="button"
                            onClick={toggleSound}
                            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/90 hover:bg-[#bd1616] active:bg-[#750d0d] text-white text-xs font-bold border border-white/25 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
                            aria-label="Tap to enable sound"
                          >
                            <VolumeX className="w-4 h-4 text-[#ffc800]" />
                            <span>Tap for Sound</span>
                          </button>
                        )}

                        {/* Sound On Indicator Badge when unmuted */}
                        {isCenter && !isMuted && !isInstagramReel && (
                          <div className="absolute top-3.5 left-3.5 z-40 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold backdrop-blur-md pointer-events-none shadow-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Sound On</span>
                          </div>
                        )}

                        {/* Center Play Button Overlay: Shown when direct video is paused */}
                        {isCenter && !isPlaying && !isInstagramReel && (
                          <div
                            className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPlaying(true);
                            }}
                          >
                            <div className="w-16 h-16 rounded-full bg-[#bd1616] text-white flex items-center justify-center shadow-[0_0_30px_rgba(189,22,22,0.6)] hover:scale-110 active:scale-95 transition-transform">
                              <Play className="w-7 h-7 text-white fill-white ml-1" />
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation & Indicators */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6">
          {/* Left Circular Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-900 hover:bg-[#bd1616] text-white border border-zinc-800 hover:border-[#bd1616] shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Dots Pagination Indicators */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {filteredReels.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPlaying(true);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#bd1616] shadow-md shadow-[#bd1616]/50'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-zinc-700 hover:bg-zinc-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right Circular Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-900 hover:bg-[#bd1616] text-white border border-zinc-800 hover:border-[#bd1616] shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
