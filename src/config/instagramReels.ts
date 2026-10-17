/**
 * ============================================================================
 * SNAP SHOTS - WORK THAT PERFORMS REELS CONFIGURATION
 * ============================================================================
 * Direct video links configured strictly to read the user's uploaded MP4
 * files from `/videos/` directory. Slides 1, 2, 5 & 7 have videos removed
 * as requested. Active videos: reel-3, reel-4, reel-6, reel-8, reel-9, reel-10.
 */

export interface InstagramReelItem {
  title: string;
  category: string;
  url: string;
  client?: string;
  views?: string;
  duration?: string;
  posterUrl?: string;
  description?: string;
  videoUrl?: string;
}

export const instagramReels: InstagramReelItem[] = [
  {
    title: "Lord Ganesha Grand Utsav & Divine Celebrations",
    category: "Events & Festivals",
    url: "https://www.instagram.com/reel/SnapShotsGaneshaUtsav/",
    client: "Snap Shots Utsav Coverage",
    views: "520K",
    duration: "0:17",
    description: "Cinematic black & white fine art coverage of Lord Ganesha Utsav with dramatic spotlight illumination, incense mist, and sacred devotional rhythm.",
  },
  {
    title: "Haldi Vibes & Traditional Rituals",
    category: "Wedding",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    client: "Snap Shots Weddings",
    views: "285K",
    duration: "0:25",
    description: "Vibrant Haldi celebration with marigold backdrop, traditional rituals and candid smiles in cinematic 4K.",
  },
  {
    title: "Royal Groom & Grand Entry",
    category: "Wedding",
    url: "https://www.instagram.com/reel/DbQ0Hy2OT-h/",
    videoUrl: "/videos/reel-3.mp4",
    client: "Snap Shots Royal Weddings",
    views: "340K",
    duration: "0:34",
    description: "Grand groom procession, royal attire styling, and slow-motion floral shower.",
  },
  {
    title: "Pastel Outdoor Celebration & Decor",
    category: "Event",
    url: "https://www.instagram.com/reel/DdUSBbWJaJ9/",
    videoUrl: "/videos/reel-4.mp4",
    client: "Snap Shots Utsav Coverage",
    views: "480K",
    duration: "0:25",
    description: "Outdoor celebration in cinematic 4K master grade with dramatic overhead illumination and floral decor.",
  },
  {
    title: "Sundowner Rhythm & Nightlife Energy",
    category: "Event",
    url: "https://www.instagram.com/reel/DbWdisUCxA2/",
    client: "Snap Shots Nightlife",
    views: "310K",
    duration: "0:20",
    description: "High-energy sundowner with beat-synced pacing, dynamic camera rotation, and neon grading.",
  },
  {
    title: "Sangeet Dance & Stage Fireworks",
    category: "Wedding",
    url: "https://www.instagram.com/reel/DdwIldARQSE/",
    videoUrl: "/videos/reel-6.mp4",
    client: "Snap Shots Live Stage",
    views: "195K",
    duration: "0:26",
    description: "Electrifying Sangeet choreography with cold pyros and smooth cinematic gimbal glide.",
  },
  {
    title: "Golden Hour 25th Milestone Birthday",
    category: "Birthday",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    client: "Snap Shots Birthdays",
    views: "145K",
    duration: "0:30",
    description: "Sun-drenched rooftop celebration with champagne pop slow-motion and candid laughter.",
  },
  {
    title: "Streetwear Fashion Drop & Runway",
    category: "Brand Content",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    videoUrl: "/videos/reel-8.mp4",
    client: "KINETIC Apparel",
    views: "260K",
    duration: "0:18",
    description: "Urban runway aesthetics, quick-cut lookbook reels with heavy bass rhythm.",
  },
  {
    title: "Corporate Flagship Store Activation",
    category: "Corporate",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    videoUrl: "/videos/reel-9.mp4",
    client: "AURA Retail Opening",
    views: "180K",
    duration: "0:25",
    description: "VIP ribbon cutting, architectural walkthrough, and executive portraits in crisp 4K.",
  },
  {
    title: "Artisanal Coffee & Product Texture",
    category: "Product",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    videoUrl: "/videos/reel-10.mp4",
    client: "Velvet Roast Coffee",
    views: "120K",
    duration: "0:18",
    description: "Macro espresso extraction, steam wand textures, and aesthetic packaging reveals.",
  },
];
