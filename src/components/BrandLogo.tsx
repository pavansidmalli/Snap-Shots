import React, { useRef, useState, useEffect, ChangeEvent, DragEvent } from 'react';
import { Upload, Camera, Trash2, X, Sparkles, FolderOpen, Scissors } from 'lucide-react';
import { useLogo } from '../context/LogoContext';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: 'header' | 'footer' | 'default';
  allowUpload?: boolean;
}

const STORAGE_KEY_CROP_Y = 'snapshots_logo_crop_y';

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imageClassName = '',
  variant = 'header',
  allowUpload = true,
}) => {
  const { customLogoUrl, hasCustomLogo, saveCustomLogo, removeCustomLogo } = useLogo();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Default to 18% top and bottom cut as requested
  const [verticalCropPercent, setVerticalCropPercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CROP_Y);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 50) return parsed;
      }
    } catch {}
    return 18;
  });

  const handleCropChange = (newVal: number) => {
    const clamped = Math.max(0, Math.min(50, newVal));
    setVerticalCropPercent(clamped);
    try {
      localStorage.setItem(STORAGE_KEY_CROP_Y, clamped.toString());
    } catch {}
  };

  const isHeader = variant === 'header';
  const inputId = `logo-upload-input-${variant}`;

  // Canvas auto-trim helper to strip empty top/bottom pixels
  const autoTrimTopBottom = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(dataUrl);

          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          let top = 0;
          let bottom = canvas.height - 1;

          // Find first non-empty pixel row from top
          let foundTop = false;
          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const alpha = data[(y * canvas.width + x) * 4 + 3];
              if (alpha > 20) {
                top = y;
                foundTop = true;
                break;
              }
            }
            if (foundTop) break;
          }

          // Find last non-empty pixel row from bottom
          let foundBottom = false;
          for (let y = canvas.height - 1; y >= 0; y--) {
            for (let x = 0; x < canvas.width; x++) {
              const alpha = data[(y * canvas.width + x) * 4 + 3];
              if (alpha > 20) {
                bottom = y;
                foundBottom = true;
                break;
              }
            }
            if (foundBottom) break;
          }

          const trimmedH = bottom - top + 1;
          if (trimmedH > 10 && trimmedH < canvas.height * 0.98) {
            const trimmedCanvas = document.createElement('canvas');
            trimmedCanvas.width = canvas.width;
            trimmedCanvas.height = trimmedH;
            const tCtx = trimmedCanvas.getContext('2d');
            if (tCtx) {
              tCtx.drawImage(
                canvas,
                0, top, canvas.width, trimmedH,
                0, 0, canvas.width, trimmedH
              );
              return resolve(trimmedCanvas.toDataURL('image/png'));
            }
          }
        } catch {}
        resolve(dataUrl);
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const processFile = (file: File) => {
    setModalError(null);
    const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!file.type.startsWith('image/') && !validExtensions.includes(ext)) {
      setModalError('Please upload an image file (PNG, SVG, JPG, or WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setModalError('File size exceeds 8MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        // Automatically trim any empty top/bottom borders on upload
        const trimmed = await autoTrimTopBottom(dataUrl);
        saveCustomLogo(trimmed, file.name);
        setModalOpen(false);
      }
    };
    reader.onerror = () => {
      setModalError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleNativeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = '';
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUseOfficialLogo = () => {
    saveCustomLogo('/snapshots-logo.svg', 'snapshots-official-logo.svg');
    setModalOpen(false);
  };

  return (
    <>
      <div
        className={`relative group inline-flex items-center select-none ${className}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Real accessible HTML file input */}
        {allowUpload && (
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept=".png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleNativeInputChange}
            className="sr-only"
            title="Upload studio logo"
          />
        )}

        {/* State 1: Active Custom Logo */}
        {hasCustomLogo && customLogoUrl ? (
          <div className="relative flex items-center justify-center text-center mx-auto w-full">
            {/* Top and Bottom Cropped Container */}
            <div className="relative overflow-hidden flex items-center justify-center mx-auto text-center">
              <img
                src={customLogoUrl}
                alt="Snap Shots Logo"
                style={{
                  clipPath:
                    verticalCropPercent > 0
                      ? `inset(${verticalCropPercent}% 0 ${verticalCropPercent}% 0)`
                      : 'none',
                  transform:
                    verticalCropPercent > 0
                      ? `scale(${1 + (verticalCropPercent * 1.5) / 100})`
                      : 'none',
                }}
                className={`${
                  isHeader
                    ? 'h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[340px] sm:max-w-[440px] md:max-w-[540px]'
                    : 'h-12 sm:h-14 md:h-16 w-auto max-w-[260px] sm:max-w-[320px]'
                } object-contain object-center mx-auto block drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] transition-all duration-200 group-hover:scale-[1.02] ${imageClassName}`}
                loading={isHeader ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>

            {/* Quick hover buttons: positioned out of flow so they don't offset logo centering */}
            {allowUpload && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-zinc-900/95 backdrop-blur-md px-1.5 py-1 rounded-xl border border-zinc-700/80 shadow-2xl z-30 pointer-events-none group-hover:pointer-events-auto">
                {/* Cut Top & Bottom Quick Toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const next =
                      verticalCropPercent === 0
                        ? 15
                        : verticalCropPercent === 15
                        ? 22
                        : verticalCropPercent === 22
                        ? 30
                        : 0;
                    handleCropChange(next);
                  }}
                  title={`Cut top & bottom (${verticalCropPercent}% active). Click to cycle.`}
                  className={`p-1 px-1.5 rounded-lg border text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    verticalCropPercent > 0
                      ? 'bg-[#bd1616] text-white border-[#bd1616]'
                      : 'bg-zinc-800 text-zinc-300 hover:text-white border-zinc-700'
                  }`}
                >
                  <Scissors className="w-3 h-3" />
                  <span className="text-[10px]">{verticalCropPercent}%</span>
                </button>

                {/* Change Logo */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalOpen(true);
                  }}
                  title="Change custom logo"
                  className="p-1 rounded-lg bg-zinc-800 hover:bg-[#bd1616] text-zinc-300 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                {/* Remove Logo */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeCustomLogo();
                  }}
                  title="Remove logo and return to empty upload slot"
                  className="p-1 rounded-lg bg-zinc-800 hover:bg-rose-900 text-zinc-300 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* State 2: Empty Logo Slot with Direct Native <label> Activation */
          <label
            htmlFor={inputId}
            id={`empty-logo-slot-${variant}`}
            onClick={(e) => {
              if (e.detail > 1) {
                e.preventDefault();
                setModalOpen(true);
              }
            }}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-dashed transition-all duration-200 cursor-pointer ${
              isDragging
                ? 'border-[#bd1616] bg-[#bd1616]/20 scale-[1.02]'
                : 'border-zinc-700 hover:border-[#bd1616] bg-zinc-900/70 hover:bg-zinc-900'
            }`}
            title="Click to select logo file (or drag & drop here)"
          >
            {/* Upload Icon */}
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[#bd1616]/15 text-[#bd1616] border border-[#bd1616]/30 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
              <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>

            {/* Prompt Text */}
            <div className="flex flex-col text-left pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                  Upload Logo
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#bd1616] animate-pulse" />
              </div>
              <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                PNG, SVG, JPG
              </span>
            </div>

            {/* Helper modal button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setModalOpen(true);
              }}
              className="ml-1 p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Open logo upload dialog"
            >
              <Camera className="w-3 h-3" />
            </button>
          </label>
        )}
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl shadow-black space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#bd1616]/20 text-[#bd1616]">
                  <Upload className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Studio Logo Settings</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
                {modalError}
              </div>
            )}

            {/* Cut Top & Bottom Slider */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#bd1616]" />
                  Cut Top & Bottom Margins
                </span>
                <span className="font-mono font-bold text-[#bd1616] text-sm">
                  {verticalCropPercent}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-zinc-500 font-mono">0%</span>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="2"
                  value={verticalCropPercent}
                  onChange={(e) => handleCropChange(parseInt(e.target.value, 10))}
                  className="w-full accent-[#bd1616] cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500 font-mono">40%</span>
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                {[0, 15, 20, 28].map((cropVal) => (
                  <button
                    key={cropVal}
                    type="button"
                    onClick={() => handleCropChange(cropVal)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                      verticalCropPercent === cropVal
                        ? 'bg-[#bd1616] text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cropVal === 0 ? 'None' : `${cropVal}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Drag & Drop or Browse Area */}
            <label
              htmlFor={`modal-${inputId}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#bd1616] bg-[#bd1616]/10'
                  : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/70'
              }`}
            >
              <input
                id={`modal-${inputId}`}
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleNativeInputChange}
                className="sr-only"
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-[#bd1616] mb-3">
                <FolderOpen className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white mb-1">
                Upload New Image File
              </p>
              <p className="text-xs text-zinc-400 text-center">
                Click to browse files on your device, or drag and drop here
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-2">
                Supports PNG, SVG, JPG, WebP (max 8MB)
              </p>
            </label>

            {/* 1-Click Preset to Use Official Logo */}
            <div className="pt-2 border-t border-zinc-800/80">
              <span className="text-[11px] font-semibold text-zinc-400 block mb-2">
                Preset Option:
              </span>
              <button
                type="button"
                onClick={handleUseOfficialLogo}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-200 hover:text-white flex items-center justify-between transition-colors cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#bd1616]" />
                  <span>Use Official Snap Shots Logo</span>
                </span>
                <span className="text-[10px] text-zinc-400 group-hover:text-zinc-200">
                  Select &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
