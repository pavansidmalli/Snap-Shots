# Assets Directory (/public/assets/)

Place your static logo and brand assets here.

### Example Logo Placement:
1. Copy your logo file to `/public/assets/logo.png` (or `.svg`, `.webp`, `.jpg`).
2. Open `src/config/logoConfig.ts` and set:
   ```ts
   export const logoConfig: LogoConfig = {
     staticLogoPath: '/assets/logo.png', // or '/assets/logo.svg'
     // ...
   };
   ```
3. Your logo will be served directly by the web server across all desktop and mobile header and footer locations.

You can also upload logos directly in the browser via the "Upload Brand Logo" control, which persists the image in browser localStorage automatically without any file copying needed!
