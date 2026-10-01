import React, { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { X, Upload, Check, Trash2, Image as ImageIcon, AlertCircle, FileCode, CheckCircle2 } from 'lucide-react';
import { useLogo } from '../context/LogoContext';
import { logoConfig } from '../config/logoConfig';
import { trimImagePadding } from '../utils/imageTrim';

export const LogoUploadModal: React.FC = () => {
  const {
    isUploadModalOpen,
    closeUploadModal,
    saveCustomLogo,
    resetLogoToDefault,
    hasCustomLogo,
    logoFileName: currentFileName,
  } = useLogo();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewDimensions, setPreviewDimensions] = useState<{ width: number; height: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset local state when modal closes or opens
  useEffect(() => {
    if (!isUploadModalOpen) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setPreviewDimensions(null);
      setError(null);
      setIsSuccess(false);
    }
  }, [isUploadModalOpen]);

  if (!isUploadModalOpen) return null;

  const validateAndProcessFile = (file: File) => {
    setError(null);
    setIsSuccess(false);

    // 1. Validate file extension and MIME type
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    const isValidExtension = logoConfig.supportedExtensions.includes(fileExt);
    const isValidMime =
      logoConfig.supportedMimeTypes.includes(file.type) ||
      file.type.startsWith('image/');

    if (!isValidExtension && !isValidMime) {
      setError(`Unsupported file format. Please upload ${logoConfig.supportedExtensions.join(', ')}`);
      return;
    }

    // 2. Validate file size (5MB max)
    if (file.size > logoConfig.maxUploadSizeBytes) {
      setError(`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a smaller image.`);
      return;
    }

    // 3. Read file as persistent Data URL (Base64) - NOT a temporary blob URL
    const reader = new FileReader();
    reader.onload = async (e) => {
      const rawResult = e.target?.result as string;
      if (rawResult) {
        setSelectedFile(file);
        
        // Auto-trim dead borders so logo graphics are as large and impactful as possible
        const optimizedResult = await trimImagePadding(rawResult);
        setPreviewUrl(optimizedResult);

        // Calculate natural image dimensions for preview
        const img = new Image();
        img.onload = () => {
          setPreviewDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = optimizedResult;
      }
    };
    reader.onerror = () => {
      setError('Failed to read image file from your computer. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleApplyLogo = () => {
    if (!previewUrl) return;

    // Persist immediately to localStorage and active state
    saveCustomLogo(previewUrl, selectedFile?.name || 'custom-logo');
    setIsSuccess(true);

    setTimeout(() => {
      closeUploadModal();
    }, 900);
  };

  const handleResetToDefault = () => {
    resetLogoToDefault();
    setSelectedFile(null);
    setPreviewUrl(null);
    setPreviewDimensions(null);
    setIsSuccess(true);

    setTimeout(() => {
      closeUploadModal();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeUploadModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logo-upload-title"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-7 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#bd1616]/10 border border-[#bd1616]/25 text-[#bd1616]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 id="logo-upload-title" className="text-base sm:text-lg font-bold text-white tracking-wide">
                Upload Custom Logo
              </h3>
              <p className="text-xs text-zinc-400">
                Update the header and footer logo across mobile &amp; desktop
              </p>
            </div>
          </div>
          <button
            onClick={closeUploadModal}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Logo updated successfully! Header and footer have been synchronized.</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Dropzone */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            id="logo-file-input"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? 'border-[#bd1616] bg-[#bd1616]/5 scale-[0.99]'
                : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900'
            }`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 mb-3">
              <Upload className="w-5 h-5 text-[#bd1616]" />
            </div>
            <p className="text-sm font-semibold text-white mb-1">
              Click to select image or drag and drop
            </p>
            <p className="text-xs text-zinc-400">
              Supports <strong className="text-zinc-300">PNG, JPG, JPEG, WebP, SVG</strong> (transparent PNG supported, up to 5MB)
            </p>
          </div>
        </div>

        {/* LOGO PREVIEW (as specified in requirements) */}
        {previewUrl && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-zinc-300">
                Logo Preview
              </span>
              {previewDimensions && (
                <span className="text-[11px] text-zinc-500 font-mono">
                  {previewDimensions.width} &times; {previewDimensions.height} px
                  {selectedFile && ` • ${(selectedFile.size / 1024).toFixed(0)} KB`}
                </span>
              )}
            </div>

            {/* Preview Box - Dual checkerboard/dark frame to preview transparency */}
            <div className="relative rounded-lg overflow-hidden border border-zinc-800/80 bg-black/90 p-6 flex items-center justify-center min-h-[90px]">
              {/* Checkerboard hint for transparent logos */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                }}
              />
              <img
                src={previewUrl}
                alt="Logo Preview"
                className="relative z-10 max-h-12 sm:max-h-14 w-auto object-contain"
              />
            </div>

            {/* USE THIS LOGO BUTTON (as required) */}
            <button
              onClick={handleApplyLogo}
              id="use-this-logo-btn"
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[#bd1616]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>USE THIS LOGO</span>
            </button>
          </div>
        )}

        {/* Current Logo Status & Reset Action */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/70 text-xs">
          <div className="text-zinc-400">
            Current Logo:{' '}
            <span className="font-semibold text-white">
              {hasCustomLogo ? currentFileName || 'Custom Logo' : 'Default SNAP SHOTS'}
            </span>
          </div>

          {hasCustomLogo && (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset to default</span>
            </button>
          )}
        </div>

        {/* Static Deployment Reference Note (as requested) */}
        <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/60 p-3.5 text-[11px] text-zinc-400 leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-zinc-300">
            <FileCode className="w-3.5 h-3.5 text-[#bd1616]" />
            <span>Static Website Configuration:</span>
          </div>
          <p>
            Your uploaded logo is saved persistently in browser storage. For code repository deployments, you can also place your logo inside:
          </p>
          <code className="block px-2.5 py-1.5 rounded bg-black/60 font-mono text-[10px] text-amber-300 border border-zinc-800">
            /public/assets/logo.png
          </code>
          <p className="text-[10px] text-zinc-500">
            And reference it in <span className="font-mono text-zinc-400">src/config/logoConfig.ts</span> by setting <span className="font-mono text-zinc-400">staticLogoPath: &apos;/assets/logo.png&apos;</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
