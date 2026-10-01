/**
 * Central Logo Configuration for Snap Shots
 *
 * To use a static file:
 * 1. Place your logo file inside /public/assets/ (e.g. /public/assets/logo.png)
 * 2. Set `staticLogoPath` to '/assets/logo.png' (or '/assets/logo.svg', '/assets/logo.webp')
 *
 * If `staticLogoPath` is empty and no custom logo was uploaded via the browser,
 * the website displays the default "SNAP SHOTS" text logo.
 */

export interface LogoConfig {
  /**
   * Relative path to static logo located in /public/assets/
   * e.g. '/assets/logo.png' or '/assets/logo.svg'
   */
  staticLogoPath: string;

  /**
   * Default brand text when no custom logo is uploaded or configured
   */
  defaultBrandText: {
    firstWord: string;
    secondWord: string;
  };

  /**
   * Maximum file size accepted in bytes (default: 5MB)
   */
  maxUploadSizeBytes: number;

  /**
   * Supported file extensions
   */
  supportedExtensions: string[];

  /**
   * Supported MIME types
   */
  supportedMimeTypes: string[];
}

export const logoConfig: LogoConfig = {
  // If staticLogoPath is empty and no custom logo was uploaded, the authentic SNAP SHOTS text logo is displayed
  staticLogoPath: '',
  defaultBrandText: {
    firstWord: 'SNAP',
    secondWord: 'SHOTS',
  },
  maxUploadSizeBytes: 5 * 1024 * 1024, // 5MB
  supportedExtensions: ['.png', '.jpg', '.jpeg', '.webp', '.svg'],
  supportedMimeTypes: [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/svg+xml',
  ],
};
