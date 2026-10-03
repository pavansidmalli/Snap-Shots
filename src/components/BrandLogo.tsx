import React, { useRef, useState } from 'react';
import { Upload, Trash2, Camera, Check } from 'lucide-react';
import { useLogo } from '../context/LogoContext';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: 'header' | 'footer' | 'default';
  allowUpload?: boolean;
  lightBackground?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imageClassName = '',
  variant = 'header',
  allowUpload = true,
  lightBackground = false,
}) => {
  const { customLogoUrl, saveCustomLogo, removeCustomLogo } = useLogo();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isHeader = variant === 'header';
  const displayLogoUrl = customLogoUrl || (lightBackground ? '/snapshots-logo-dark.svg' : '/snapshots-logo.svg');
  const [imgLoadError, setImgLoadError] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

      {/* Brand Logo Image with Mobile Contrast Protection and Generous Sizing */}
      <div className="relative group inline-flex items-center justify-start shrink-0">
        <div className="relative flex items-center justify-start shrink-0">
          {imgLoadError ? (
            <div className="flex items-center gap-1.5 py-0.5 select-none">
              <span
                className={`text-lg xs:text-xl sm:text-2xl font-black tracking-tight ${
                  lightBackground ? 'text-black' : 'text-white'
                } flex items-center`}
              >
                <span>SNAP</span>
                <span className="text-[#bd1616]">SHOTS</span>
              </span>
            </div>
          ) : (
            <img
              src={displayLogoUrl}
              alt="Snap Shots"
              width={160}
              height={40}
              loading="eager"
              decoding="sync"
              className={`${
                isHeader
                  ? 'w-[130px] min-[380px]:w-[150px] sm:w-[175px] md:w-[195px] h-auto max-h-[42px] min-h-[32px] aspect-[520/120]'
                  : 'w-[125px] sm:w-[150px] md:w-[170px] h-auto max-h-[40px] aspect-[520/120]'
              } object-contain object-left block transition-all duration-200 ${
                lightBackground ? '' : 'filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
              } ${imageClassName}`}
              onError={() => {
                setImgLoadError(true);
              }}
            />
          )}
        </div>

        {/* Action Overlay on Hover: Change / Remove Logo */}
        {allowUpload && customLogoUrl && (
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
        )}
      </div>

      {/* Manual Upload Button (Accessible on mobile and desktop) */}
      {allowUpload && !customLogoUrl && (
        <button
          type="button"
          onClick={handleTriggerUpload}
          disabled={isUploading}
          className={`ml-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer shadow-md border ${
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
      )}

      {uploadError && (
        <span className="ml-2 text-[10px] text-red-400 font-medium px-2 py-0.5 rounded bg-red-950/80 border border-red-800">
          {uploadError}
        </span>
      )}
    </div>
  );
};
