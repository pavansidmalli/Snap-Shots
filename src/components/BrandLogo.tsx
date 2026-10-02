import React, { useRef, useState } from 'react';
import { Upload, Trash2, Camera, Check } from 'lucide-react';
import { useLogo } from '../context/LogoContext';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: 'header' | 'footer' | 'default';
  allowUpload?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imageClassName = '',
  variant = 'header',
}) => {
  const { customLogoUrl, saveCustomLogo, removeCustomLogo } = useLogo();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isHeader = variant === 'header';

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image format
    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose a PNG, JPG, SVG, or WebP image');
      setTimeout(() => setUploadError(null), 3500);
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        saveCustomLogo(dataUrl, file.name);
        setIsUploading(false);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      setUploadError('Unable to read the image file. Please try another.');
      setTimeout(() => setUploadError(null), 3500);
    };
    reader.readAsDataURL(file);

    // Reset input so re-uploading the same file still triggers onChange
    e.target.value = '';
  };

  const handleTriggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* Hidden File Input for Manual Logo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        id={`logo-file-input-${variant}`}
      />

      {customLogoUrl ? (
        /* If custom logo uploaded: Display image with hover controls to change or remove */
        <div className="relative group inline-flex items-center justify-center">
          <div className="relative overflow-hidden flex items-center justify-center">
            <img
              src={customLogoUrl}
              alt="Snap Shots Custom Logo"
              className={`${
                isHeader
                  ? 'h-6 xs:h-7 sm:h-8 md:h-10 lg:h-11 w-auto max-w-[85px] xs:max-w-[100px] sm:max-w-[130px] md:max-w-[160px]'
                  : 'h-6 sm:h-8 md:h-10 w-auto max-w-[90px] sm:max-w-[140px]'
              } object-contain object-center block drop-shadow-md transition-all duration-200 ${imageClassName}`}
            />
          </div>

          {/* Action Overlay on Hover: Change / Remove Logo */}
          <div className="absolute inset-0 bg-black/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 px-2">
            <button
              type="button"
              onClick={handleTriggerUpload}
              className="p-1 rounded-full bg-[#bd1616] hover:bg-[#9e1212] text-white cursor-pointer transition-transform hover:scale-110 shadow-md"
              title="Change logo"
            >
              <Upload className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeCustomLogo();
              }}
              className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-red-400 hover:text-white cursor-pointer transition-transform hover:scale-110 shadow-md"
              title="Remove logo"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        /* No logo uploaded yet: Display Brand typography + prominent manual upload CTA button */
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Brand Name Typography */}
          <div className="flex flex-col items-start leading-tight">
            <span className="text-base xs:text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-0.5">
              <span>SNAP</span>
              <span className="text-[#bd1616]">SHOTS</span>
            </span>
            {isHeader && (
              <span className="text-[7px] sm:text-[8px] uppercase tracking-widest text-zinc-400 font-bold -mt-0.5">
                CREATIVE STUDIO
              </span>
            )}
          </div>

          {/* Manual Upload Button - Desktop only to keep mobile header clean */}
          <button
            type="button"
            onClick={handleTriggerUpload}
            disabled={isUploading}
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer shadow-md border ${
              uploadSuccess
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] border-[#9e1212] text-white hover:scale-105 active:scale-95'
            }`}
            title="Upload your logo manually (PNG, JPG, SVG, WebP)"
            id={`upload-logo-button-${variant}`}
          >
            {uploadSuccess ? (
              <>
                <Check className="w-3 h-3" />
                <span className="hidden xs:inline">Uploaded!</span>
              </>
            ) : isUploading ? (
              <span className="animate-spin text-[10px]">⏳</span>
            ) : (
              <>
                <Camera className="w-3 h-3" />
                <span>Upload Logo</span>
              </>
            )}
          </button>
          {uploadError && (
            <span className="text-[10px] text-red-400 font-medium px-2 py-0.5 rounded bg-red-950/80 border border-red-800">
              {uploadError}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
