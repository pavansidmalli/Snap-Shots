import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Film,
  CheckCircle2,
  AlertCircle,
  Play,
  Sparkles,
  Link as LinkIcon,
  Video,
} from 'lucide-react';
import { ReelWorkItem } from '../types';
import { getDefaultPosterForCategory } from '../utils/instagram';

interface UploadVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReel: (reel: ReelWorkItem) => void;
}

export const UploadVideoModal: React.FC<UploadVideoModalProps> = ({
  isOpen,
  onClose,
  onAddReel,
}) => {
  const [sourceType, setSourceType] = useState<'file' | 'url'>('file');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState<string>('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string>('');
  const [generatedPoster, setGeneratedPoster] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Weddings');
  const [views, setViews] = useState<string>('120K');
  const [description, setDescription] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement | null>(null);

  if (!isOpen) return null;

  // Extract a high-quality frame from the uploaded video file to use as vertical poster
  const extractPosterFrame = (fileOrBlobUrl: string) => {
    setIsProcessing(true);
    const video = document.createElement('video');
    video.src = fileOrBlobUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.currentTime = 0.8;

    video.onloadeddata = () => {
      video.currentTime = Math.min(1.0, video.duration > 1 ? 1.0 : 0.2);
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 720;
        canvas.height = video.videoHeight || 1280;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setGeneratedPoster(dataUrl);
        }
      } catch (e) {
        console.warn('Could not extract video frame poster:', e);
        setGeneratedPoster(getDefaultPosterForCategory(category));
      } finally {
        setIsProcessing(false);
      }
    };

    video.onerror = () => {
      setIsProcessing(false);
      setGeneratedPoster(getDefaultPosterForCategory(category));
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file (.mp4, .webm, .mov)');
      return;
    }

    setVideoFile(file);
    const blobUrl = URL.createObjectURL(file);
    setPreviewVideoUrl(blobUrl);

    // Auto fill title if empty
    if (!title.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    extractPosterFrame(blobUrl);
  };

  const handleUrlChange = (url: string) => {
    setVideoUrlInput(url);
    setError('');
    if (url.trim().startsWith('http')) {
      setPreviewVideoUrl(url.trim());
      extractPosterFrame(url.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const effectiveVideo = sourceType === 'file' ? previewVideoUrl : videoUrlInput.trim();

    if (!effectiveVideo) {
      setError(
        sourceType === 'file'
          ? 'Please select a video file to upload.'
          : 'Please enter a valid video URL.'
      );
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title for your video.');
      return;
    }

    const newReel: ReelWorkItem = {
      id: `custom-reel-${Date.now()}`,
      title: title.trim(),
      category: category || 'Custom Reel',
      videoUrl: effectiveVideo,
      instagramUrl: effectiveVideo,
      posterUrl: generatedPoster || getDefaultPosterForCategory(category),
      client: 'Uploaded by You',
      views: views.trim() || 'New',
      duration: '0:30',
      eventDate: 'Custom Upload',
      description:
        description.trim() ||
        'Uploaded by client to showcase custom reels and videography style.',
      aspectRatio: '9:16',
      isCustomUpload: true,
    };

    onAddReel(newReel);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-video-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#bd1616]/20 border border-[#bd1616]/40 flex items-center justify-center text-[#bd1616]">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h2 id="upload-video-title" className="text-base font-black text-white">
                Upload Your Video
              </h2>
              <p className="text-xs text-zinc-400">
                Add your custom reel to the 3D showcase
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Source Toggle Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSourceType('file')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                sourceType === 'file'
                  ? 'bg-[#bd1616] text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Video File (Local)</span>
            </button>
            <button
              type="button"
              onClick={() => setSourceType('url')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                sourceType === 'url'
                  ? 'bg-[#bd1616] text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Video URL (Link)</span>
            </button>
          </div>

          {/* File Picker Zone */}
          {sourceType === 'file' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="custom-video-file-input"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) {
                    handleFileChange({
                      target: { files: e.dataTransfer.files },
                    } as any);
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  videoFile
                    ? 'border-emerald-500/60 bg-emerald-950/10'
                    : 'border-zinc-700 hover:border-[#bd1616] bg-zinc-900/50 hover:bg-zinc-900/80'
                }`}
              >
                {videoFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    <p className="text-xs sm:text-sm font-bold text-white truncate max-w-xs">
                      {videoFile.name}
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      {(videoFile.size / (1024 * 1024)).toFixed(1)} MB &bull; Click to change video
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <Film className="w-5 h-5 text-[#bd1616]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-white">
                        Click or drag &amp; drop your video here
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        MP4, WebM, MOV (9:16 vertical reels recommended)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Video Direct URL (MP4 / WebM / Reel Stream)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={videoUrlInput}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://example.com/videos/my-reel.mp4"
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#bd1616]"
                />
              </div>
              <p className="text-[10.5px] text-zinc-500 mt-1">
                Provide a direct link to any MP4/WebM vertical video.
              </p>
            </div>
          )}

          {/* Video Preview If Available */}
          {previewVideoUrl && (
            <div className="p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800 flex items-center gap-3">
              <div className="w-14 h-24 rounded-lg overflow-hidden bg-black shrink-0 relative border border-zinc-700">
                <video
                  src={previewVideoUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  autoPlay
                  loop
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Video Loaded &amp; Ready</span>
                </div>
                <p className="text-[11px] text-zinc-300 truncate mt-0.5 font-medium">
                  {title || 'Untitled Reel'}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  Poster frame automatically extracted for 3D carousel.
                </p>
              </div>
            </div>
          )}

          {/* Title Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Reel Title <span className="text-[#bd1616]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Royal Hyderabad Wedding Highlights"
              className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#bd1616]"
            />
          </div>

          {/* Category & Views */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#bd1616]"
              >
                <option value="Weddings">Weddings</option>
                <option value="Event Reels">Event Reels</option>
                <option value="Commercial">Commercial</option>
                <option value="Fashion">Fashion</option>
                <option value="Birthday Reels">Birthday Reels</option>
                <option value="Corporate">Corporate</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Custom Reel">Custom Reel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Views Badge
              </label>
              <input
                type="text"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                placeholder="e.g. 150K"
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#bd1616]"
              >
              </input>
            </div>
          </div>

          {/* Optional Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Description / Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Behind the scenes details, client name, or shoot concept..."
              className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#bd1616] resize-none"
            />
          </div>

          {/* Error notice */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Footer Submit Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-900">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-white font-bold text-xs tracking-wide shadow-lg shadow-[#bd1616]/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-white" />
              <span>{isProcessing ? 'Processing Video...' : 'Add to Showcase'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
