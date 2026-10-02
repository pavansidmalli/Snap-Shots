/**
 * ============================================================================
 * SNAP SHOTS - INSTAGRAM REELS CONFIGURATION
 * ============================================================================
 * 
 * WHERE TO PASTE YOUR INSTAGRAM REEL URLS:
 * Replace the "PASTE INSTAGRAM REEL URL HERE" strings below with your public
 * Instagram Reel links (e.g., https://www.instagram.com/reel/C8q7Xj9v0mQ/).
 * 
 * HOW TO ADD MORE REELS:
 * Simply copy & paste a block below and change the title, category, and url.
 * You can add 10, 20, or more reels without any extra code!
 * 
 * SUPPORTED URL FORMATS:
 * - https://www.instagram.com/reel/CODE/
 * - https://www.instagram.com/p/CODE/
 * - https://www.instagram.com/reels/CODE/
 * ============================================================================
 */

export interface InstagramReelItem {
  title: string;
  category: string;
  url: string;
  // Optional custom details (all optional, defaults will be filled automatically):
  client?: string;
  views?: string;
  duration?: string;
  posterUrl?: string;
  description?: string;
}

export const instagramReels: InstagramReelItem[] = [
  // ==========================================================================
  // 👇 PASTE YOUR INSTAGRAM REEL URLS HERE 👇
  // ==========================================================================
  {
    title: "Cinematic Mood & Visual Grade",
    category: "Event",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    client: "Snapshots by Abhi",
    views: "260K",
    duration: "0:42",
    description: "High-energy nightlife and celebration reel with signature rhythm cut by @snapshots_by_abhi.",
  },
  {
    title: "Special Moments & Live Snaps",
    category: "Event",
    url: "https://www.instagram.com/reel/DdUSBbWJaJ9/",
    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    client: "Snapshots Official",
    views: "210K",
    duration: "0:36",
    description: "Vibrant party moments and live crowd energy captured by @getursnapshots.",
  },
  {
    title: "Cinematic Event Highlights",
    category: "Event",
    url: "https://www.instagram.com/reel/DbWdisUCxA2/",
    posterUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    client: "Snapshots by Abhi",
    views: "240K",
    duration: "0:45",
    description: "Cinematic vertical visual storytelling by @snapshots_by_abhi with dynamic motion and color grade.",
  },
  {
    title: "Royal Celebration & Moments",
    category: "Wedding",
    url: "https://www.instagram.com/reel/DbQ0Hy2OT-h/",
    posterUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    client: "Snapshots by Abhi",
    views: "195K",
    duration: "0:38",
    description: "Pure celebration aesthetics captured in ultra-smooth 4K cinematic mode.",
  },
  {
    title: "Special Occasion Snaps",
    category: "Event",
    url: "https://www.instagram.com/reel/DdwIldARQSE/",
    posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    client: "Snapshots Live",
    views: "180K",
    duration: "0:32",
    description: "Vibrant candid moments captured with signature pacing and trending audio sync.",
  },
  {
    title: "Flagship Luxury Brand Launch",
    category: "Corporate",
    url: "PASTE INSTAGRAM REEL URL HERE",
    posterUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    client: "AURA Retail Opening",
    views: "95K",
    duration: "0:48",
    description: "VIP ribbon cutting, architectural walkthrough, and celebrity styling.",
  },
  {
    title: "Golden Hour Rooftop 25th Bash",
    category: "Birthday",
    url: "PASTE INSTAGRAM REEL URL HERE", // <-- PASTE REEL 04 URL HERE
    posterUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
    client: "Kavya Birthday Party",
    views: "110K",
    duration: "0:30",
    description: "Sun-drenched rooftop celebration with champagne pop slow-motion and candid laughter.",
  },
  {
    title: "Artisanal Coffee & Roastery Drop",
    category: "Product",
    url: "PASTE INSTAGRAM REEL URL HERE", // <-- PASTE REEL 05 URL HERE
    posterUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    client: "Velvet Roast Coffee",
    views: "78K",
    duration: "0:25",
    description: "Macro espresso extraction, steam wand textures, and packaging highlights.",
  },
  {
    title: "Streetwear Summer Drop Showcase",
    category: "Brand Content",
    url: "PASTE INSTAGRAM REEL URL HERE", // <-- PASTE REEL 06 URL HERE
    posterUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    client: "KINETIC Apparel",
    views: "215K",
    duration: "0:38",
    description: "Urban runway aesthetics, quick-cut lookbook reels with heavy bass rhythm.",
  },
  {
    title: "Luxury Editorial Fashion Drop",
    category: "Brand Content",
    url: "PASTE INSTAGRAM REEL URL HERE", // <-- PASTE REEL 07 URL HERE
    posterUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    client: "Noir Atelier",
    views: "185K",
    duration: "0:32",
    description: "High-contrast editorial street cinematography with 9:16 vertical runway styling.",
  },
  {
    title: "Grand Ballroom Anniversary Gala",
    category: "Event",
    url: "PASTE INSTAGRAM REEL URL HERE", // <-- PASTE REEL 08 URL HERE
    posterUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    client: "Grand Ballroom Anniversary",
    views: "160K",
    duration: "0:45",
    description: "Multi-camera ballroom waltz and chandelier lighting capture with seamless speed ramps.",
  },
  {
    title: "Signature Rooftop Cocktail Drop",
    category: "Event",
    url: "PASTE INSTAGRAM REEL URL HERE", // <-- PASTE REEL 09 URL HERE
    posterUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    client: "Lumina Sky Lounge",
    views: "135K",
    duration: "0:28",
    description: "Flair bartending, dusk skyline transitions, and neon reflections in 4K 60fps.",
  },
  // ==========================================================================
  // 💡 TO ADD REEL 10, REEL 11, ETC., COPY AND PASTE THIS TEMPLATE:
  // --------------------------------------------------------------------------
  // {
  //   title: "Reel Title Here",
  //   category: "Event", // "Wedding" | "Event" | "Corporate" | "Birthday" | "Product" | "Brand Content"
  //   url: "PASTE INSTAGRAM REEL URL HERE",
  // },
  // ==========================================================================
];
