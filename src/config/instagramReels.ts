/**
 * ============================================================================
 * SNAP SHOTS - WORK THAT PERFORMS REELS CONFIGURATION
 * ============================================================================
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
    title: "Haldi Vibes & Traditional Rituals",
    category: "Wedding",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    posterUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-with-wedding-decorations-and-candlesticks-43301-large.mp4",
    client: "Snap Shots Weddings",
    views: "285K",
    duration: "0:38",
    description: "Vibrant Haldi celebration with marigold backdrop, traditional rituals and candid smiles in cinematic 4K.",
  },
  {
    title: "Royal Groom & Grand Entry",
    category: "Wedding",
    url: "https://www.instagram.com/reel/DbQ0Hy2OT-h/",
    posterUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-41221-large.mp4",
    client: "Snap Shots Royal Weddings",
    views: "340K",
    duration: "0:42",
    description: "Grand groom procession, royal attire styling, and slow-motion floral shower.",
  },
  {
    title: "Pastel Outdoor Celebration & Decor",
    category: "Event",
    url: "https://www.instagram.com/reel/DdUSBbWJaJ9/",
    posterUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cocktails-on-the-counter-of-a-bar-42777-large.mp4",
    client: "Snap Shots Events",
    views: "210K",
    duration: "0:35",
    description: "Whimsical pastel outdoor setting with retro aesthetic details and live guest interactions.",
  },
  {
    title: "Sundowner Rhythm & Nightlife Energy",
    category: "Event",
    url: "https://www.instagram.com/reel/DbWdisUCxA2/",
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-controlling-the-mixer-in-a-nightclub-43309-large.mp4",
    client: "Snap Shots Nightlife",
    views: "310K",
    duration: "0:45",
    description: "High-energy sundowner with beat-synced pacing, dynamic camera rotation, and neon grading.",
  },
  {
    title: "Sangeet Dance & Stage Fireworks",
    category: "Wedding",
    url: "https://www.instagram.com/reel/DdwIldARQSE/",
    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-41221-large.mp4",
    client: "Snap Shots Live Stage",
    views: "195K",
    duration: "0:34",
    description: "Electrifying Sangeet choreography with cold pyros and smooth cinematic gimbal glide.",
  },
  {
    title: "Golden Hour 25th Milestone Birthday",
    category: "Birthday",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    posterUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-41221-large.mp4",
    client: "Snap Shots Birthdays",
    views: "145K",
    duration: "0:30",
    description: "Sun-drenched rooftop celebration with champagne pop slow-motion and candid laughter.",
  },
  {
    title: "Streetwear Fashion Drop & Runway",
    category: "Brand Content",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    posterUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-makeup-39875-large.mp4",
    client: "KINETIC Apparel",
    views: "260K",
    duration: "0:38",
    description: "Urban runway aesthetics, quick-cut lookbook reels with heavy bass rhythm.",
  },
  {
    title: "Corporate Flagship Store Activation",
    category: "Corporate",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    posterUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cocktails-on-the-counter-of-a-bar-42777-large.mp4",
    client: "AURA Retail Opening",
    views: "180K",
    duration: "0:48",
    description: "VIP ribbon cutting, architectural walkthrough, and executive portraits in crisp 4K.",
  },
  {
    title: "Artisanal Coffee & Product Texture",
    category: "Product",
    url: "https://www.instagram.com/reel/DbWch7rCSw_/",
    posterUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-with-wedding-decorations-and-candlesticks-43301-large.mp4",
    client: "Velvet Roast Coffee",
    views: "120K",
    duration: "0:25",
    description: "Macro espresso extraction, steam wand textures, and aesthetic packaging reveals.",
  },
];
