import { PackageItem, ServiceItem, ReelWorkItem, TestimonialItem, FaqItem, ProcessStepItem } from '../types';
import { instagramReels, InstagramReelItem } from './instagramReels';
import { getDefaultPosterForCategory } from '../utils/instagram';

export { instagramReels };
export type { InstagramReelItem };

// Convert user-configured Instagram Reels into standardized ReelWorkItem objects
const configuredPortfolioReels: ReelWorkItem[] = instagramReels.map((item, idx) => ({
  id: `ig-reel-${idx + 1}`,
  title: item.title,
  category: item.category,
  videoUrl: item.url,
  instagramUrl: item.url,
  isInstagram: true,
  posterUrl: item.posterUrl || getDefaultPosterForCategory(item.category),
  client: item.client || 'Snap Shots Live Coverage',
  views: item.views || '95K+',
  duration: item.duration || '0:30',
  eventDate: 'Instagram Reel',
  description:
    item.description ||
    'Captured on location by Snap Shots certified reel creators. Click to watch original reel on Instagram.',
  aspectRatio: '9:16',
}));

// ============================================================================
// CENTRAL BOOKING CONFIGURATION
// ============================================================================
export const bookingConfig = {
  // WhatsApp phone number for instant booking redirects
  // Format: International format without symbols for wa.me, e.g. '919014319818' or '+91 90143 19818'
  whatsappNumber: '+91 90143 19818',

  // Heading & supporting text
  heading: 'BOOK YOUR SHOOT',
  subheading: "Tell us what you need and we'll get back to you shortly.",
  submitButtonText: 'BOOK MY SHOOT',
  whatsappButtonText: 'BOOK VIA WHATSAPP',

  // Service dropdown options
  services: [
    'Event Reels',
    'Wedding Reels',
    'Birthday Reels',
    'Corporate Reels',
    'Product Reels',
    'Brand Content',
    'Social Media Content',
    'Photography',
    'Videography',
    'Custom Package',
  ],

  // Shoot duration dropdown options
  durations: [
    '1 Hour',
    '2 Hours',
    '3 Hours',
    'Half Day',
    'Full Day',
    'Custom',
  ],

  // Success message
  successHeading: 'BOOKING REQUEST RECEIVED!',
  successMessageLine1: 'Thank you for contacting Snap Shots.',
  successMessageLine2: "We've received your booking request and will contact you shortly.",

  // Backend / Email endpoints for future connection (EmailJS, Nodemailer, Google Sheets, Supabase, Firebase, CRM)
  emailRecipient: 'bookings@snapshotstudio.com',
  webhookUrl: '', // Optional: Endpoint URL for direct form ingestion
};

export const siteConfig = {
  booking: bookingConfig,
  business: {
    name: 'SNAP SHOTS',
    legalName: 'Snap Shots Visual Media Studio',
    tagline: 'your moments our snaps',
    headline: 'YOUR MOMENTS OUR SNAPS',
    subheadline:
      'Professional reels, photography and visual content created for events, brands, businesses and social media.',
    phone: '+91 90143 19818',
    whatsapp: '+91 90143 19818',
    whatsappMessage: 'Hi Snap Shots, I would like to book a shoot in Telangana / USA!',
    email: 'bookings@snapshotstudio.com',
    supportEmail: 'hello@snapshotstudio.com',
    instagram: 'https://instagram.com/snapshots.reels',
    instagramHandle: '@snapshots.reels',
    youtube: 'https://youtube.com/@snapshotsreels',
    facebook: 'https://facebook.com/snapshotsreels',
    cities: ['Telangana, India', 'USA', 'Hyderabad', 'Warangal', 'Dallas, TX', 'New York, NY', 'San Jose, CA'],
    cityNotice: 'Now live for bookings across Telangana, India & USA!',
  },

  stats: [
    { value: '5,000+', label: 'Reels Delivered' },
    { value: '1,200+', label: 'Shoots Completed' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '3 Hours', label: 'Fastest Delivery' },
    { value: '100%', label: 'On-Time Rate' },
    { value: '50M+', label: 'Views Generated' },
  ],

  trustBadges: [
    { title: 'Trained & Certified Reel-Makers', desc: 'Every creator passes 6 rigorous storytelling & pacing filters' },
    { title: 'Transparent Upfront Pricing', desc: 'No hidden fees, no surprise add-ons. Clear inclusions' },
    { title: 'Instant Booking & Delivery', desc: 'Book in minutes. Receive polished edits within hours' },
    { title: 'Secure Cloud Backup', desc: 'Permanent access to 4K raw clips and final master exports' },
  ],

  packages: [
    {
      id: 'quick-shot',
      name: 'QUICK SHOT',
      price: '₹5,000',
      priceNum: 5000,
      tagline: 'Fast, vibrant, high-impact reel for personal moments & creators',
      description: 'Perfect for creators, birthdays, cafe visits, or anyone wanting a single fast, high-quality viral reel.',
      badge: 'Starter Rhythms',
      shootTime: 'Up to 1 Hour Shoot Time',
      deliverables: [
        '1 Edited Viral Reel (up to 60s)',
        '5 High-Resolution Color-Graded Photos',
        'Shot on iPhone 16 Pro / Cinema Rig',
        'Delivered within 4 Hours',
        'Trending Audio & Beat Syncing',
      ],
      features: [
        'Certified Reel-Maker on ground',
        'Direct shoot coordination',
        '1 round of minor revisions',
        'Full cloud download link',
      ],
      idealFor: 'Birthdays, dining, quick portraits & individual creators',
    },
    {
      id: 'event-reel',
      name: 'EVENT REEL',
      price: '₹10,000',
      priceNum: 10000,
      tagline: 'Comprehensive event storytelling with same-day delivery',
      description: 'Our most requested package for parties, corporate mixers, anniversaries, and celebratory events.',
      badge: 'Most Popular',
      isPopular: true,
      shootTime: 'Up to 3 Hours Shoot Time',
      deliverables: [
        '2–3 High-Impact Edited Reels (30–60s each)',
        '15 High-Resolution Color-Graded Photos',
        'Access to Complete 4K Raw Footage',
        'Same-Day Delivery (within 6 hours)',
        'Custom Typography & Beat Matching',
      ],
      features: [
        'Senior Certified Reel Creator',
        'Stabilizer gimbal & wireless audio kit',
        'Storyline planning before event',
        '2 rounds of revisions included',
        'Instant Google Drive & iCloud delivery',
      ],
      idealFor: 'Engagements, cocktail parties, store launches & conferences',
    },
    {
      id: 'full-content',
      name: 'FULL CONTENT',
      price: '₹20,000',
      priceNum: 20000,
      tagline: 'The ultimate cinematic coverage engine for grand occasions',
      description: 'End-to-end multi-angle content coverage built for high-stakes events, weddings, and brand campaigns.',
      badge: 'Complete Suite',
      shootTime: 'Up to 6 Hours Shoot Time',
      deliverables: [
        '5 Curated Edited Reels + 1 Cinematic Recap (90s)',
        '35+ Master Graded Photographs',
        'Full 4K Raw Archive with zero compression',
        'Express Priority 2–4 Hour Turnaround',
        'Custom Sound Design & Brand Graphics',
      ],
      features: [
        'Lead Creative Director + Assistant Operator',
        'Dual-camera multi-angle coverage',
        'Comprehensive timeline consultation',
        'Priority same-day delivery guarantee',
        'Permanent cloud vault for 12 months',
      ],
      idealFor: 'Weddings, multi-day summits, festivals & product launches',
    },
  ] as PackageItem[],

  exclusiveTier: {
    title: 'Our Most Exclusive Experience.',
    name: 'SNAP SHOTS ELITE',
    tagline: 'Handpicked creators, cinematic direction, and an experience built for the finest events.',
    startingPrice: '₹25,000',
    period: 'per event',
    features: [
      'iPhone 16 Pro Max & Cinema Camera Hybrid',
      'Top 1% Senior Storytellers Only',
      'Dedicated Creative Director on-site',
      'Express Same-Day Priority Delivery',
      'Custom LUT color grading & sound mix',
    ],
  },

  services: [
    {
      id: 'event-reels',
      title: 'Event Reels',
      tagline: 'Capture the pulse, high energy, and unforgettable highlights.',
      description: 'From electrifying concerts and sundowners to intimate galas, we capture fast-paced, scroll-stopping reels.',
      category: 'Events',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
      deliverables: ['Live mood captures', 'Crowd reactions', 'Trending transitions', 'Rapid turnaround'],
      tags: ['Concerts', 'Sundowners', 'Flea Markets', 'Nightlife'],
    },
    {
      id: 'wedding-reels',
      title: 'Wedding Reels',
      tagline: 'Timeless emotion, royal aesthetics, delivered before your reception ends.',
      description: 'Specialized wedding reel makers capturing haldi, sangeet, bridal entries, and emotional vows with cinematic polish.',
      category: 'Weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      deliverables: ['Bridal look reveals', 'Family ceremonies', 'Dance performance reels', 'Romantic slow-mo'],
      tags: ['Haldi', 'Sangeet', 'Pheras', 'Reception'],
    },
    {
      id: 'birthday-reels',
      title: 'Birthday Reels',
      tagline: 'Cherish every year in style with cinematic celebration memories.',
      description: 'Milestone birthdays, kids parties, and surprise bashes filmed with candid joy and lively editing.',
      category: 'Private',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop',
      deliverables: ['Cake cutting focus', 'Guest highlights', 'Party ambience', 'Story-ready edits'],
      tags: ['Milestone 30th/50th', 'Kids Parties', 'Surprises', 'Dinners'],
    },
    {
      id: 'corporate-reels',
      title: 'Corporate Reels',
      tagline: 'Professional, sharp visual storytelling that builds brand authority.',
      description: 'Store launches, conferences, retail activations, and company town halls captured with pristine executive polish.',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop',
      deliverables: ['Keynote snippets', 'Networking energy', 'Executive portraits', 'B2B social edits'],
      tags: ['Store Launches', 'Tech Summits', 'Award Galas', 'Team Meets'],
    },
    {
      id: 'product-reels',
      title: 'Product Reels',
      tagline: 'High-conversion vertical product videos that drive instant sales.',
      description: 'Dynamic unboxings, 360 aesthetic turns, texture close-ups, and lifestyle product placements for e-commerce and DTC.',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
      deliverables: ['Macro product shots', 'Speed-ramped reveals', 'Stop-motion effects', 'Ad hook variations'],
      tags: ['Fashion & Apparel', 'Cosmetics', 'Jewelry', 'Tech Gear'],
    },
    {
      id: 'brand-content',
      title: 'Brand Content',
      tagline: 'Strategic visual narratives crafted to amplify brand identity.',
      description: 'Full-spectrum social storytelling connecting your company mission with modern social-first audiences.',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
      deliverables: ['Founder spotlights', 'Behind-the-scenes', 'Culture reels', 'Campaign hooks'],
      tags: ['DTC Brands', 'Agencies', 'Hospitality', 'Real Estate'],
    },
    {
      id: 'social-media-content',
      title: 'Social Media Content',
      tagline: 'Batch-produced vertical reels tailored for consistent algorithm growth.',
      description: 'Designed for lifestyle influencers, fitness coaches, restaurants, and aesthetic clinics needing recurring content.',
      category: 'Creators',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
      deliverables: ['Monthly reel batches', 'Trending hook scripts', 'Carousel stills', 'Story bundles'],
      tags: ['Influencers', 'Fitness Coaches', 'Cafes & Bars', 'Artists'],
    },
    {
      id: 'photography',
      title: 'Photography',
      tagline: 'High-resolution editorial and candid photography with magazine-grade color.',
      description: 'Portraiture, event documentation, and detail shots composed to complement vertical reels seamlessly.',
      category: 'Stills',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
      deliverables: ['Curated digital album', 'High-res RAW grading', 'Social square/portrait formats', 'Web master files'],
      tags: ['Portraits', 'Candid Moments', 'Detail Highlights', 'Group Snaps'],
    },
    {
      id: 'videography',
      title: 'Videography',
      tagline: 'Cinematic widescreen and vertical moving imagery for large productions.',
      description: 'Multi-cam setups, gimbal-stabilized cinematography, and aerial drone captures for weddings and major festivals.',
      category: 'Cinema',
      image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800&auto=format&fit=crop',
      deliverables: ['4K 60fps cinematic', 'Gimbal stability', 'High-fidelity audio recording', 'Long-form recap'],
      tags: ['Multi-Cam', 'Drone 4K', 'Audio Recording', 'Extended Recaps'],
    },
  ] as ServiceItem[],

  portfolioReels: configuredPortfolioReels,

  processSteps: [
    {
      number: '01',
      title: 'Tell Us What You Need',
      subtitle: 'Instant Specification',
      description:
        'Share your shoot date, venue location, occasion type, and visual mood through our instant booking form or WhatsApp desk.',
      highlights: ['2-minute quick enquiry', 'Instant pricing estimate', 'Styling mood board match'],
    },
    {
      number: '02',
      title: 'Book Your Shoot',
      subtitle: 'Creator Matching',
      description:
        'We match you with a certified, top-tier Reel Maker equipped with professional cinema-grade gear and lock in your slot.',
      highlights: ['Direct creator coordination', 'Pre-shoot shot list', 'Zero hassle confirmation'],
    },
    {
      number: '03',
      title: 'We Capture It',
      subtitle: 'On-Ground Artistry',
      description:
        'Our creator arrives on time, guides angles and poses naturally, and captures smooth, high-impact vertical footage without interrupting the event flow.',
      highlights: ['Subtle non-intrusive presence', '4K 60fps & gimbal stability', 'Real-time trend framing'],
    },
    {
      number: '04',
      title: 'Get Your Content',
      subtitle: 'Express Same-Day Delivery',
      description:
        'Receive fully edited, beat-synced, and color-graded reels delivered via cloud download while the event energy is still fresh.',
      highlights: ['Ready within 2–6 hours', 'Full access to raw 4K footage', 'Instant Instagram upload ready'],
    },
  ] as ProcessStepItem[],

  testimonials: [
    {
      id: 'test-1',
      name: 'Pooja & Siddharth Verma',
      role: 'Bride & Groom',
      event: 'Wedding at Taj Lands End, Mumbai',
      rating: 5,
      quote:
        '“We were literally watching and reposting our wedding reels before our reception dinner was even over! The quality, trending audio sync, and angles were unbelievable. Our friends couldn’t stop asking who shot it.”',
      location: 'Mumbai',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      verified: true,
      date: 'September 2026',
    },
    {
      id: 'test-2',
      name: 'Vikram Menon',
      role: 'Head of Marketing',
      event: 'Fintech Summit Bangalore',
      rating: 5,
      quote:
        '“Snap Shots covered our 2-day conference and delivered 4 punchy reels every single evening. The engagement on our company LinkedIn and Instagram skyrocketed by 400%. Absolute game changer.”',
      location: 'Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      verified: true,
      date: 'August 2026',
    },
    {
      id: 'test-3',
      name: 'Ananya Roy',
      role: 'Fashion & Lifestyle Creator',
      event: 'Private Birthday & Brand Launch',
      rating: 5,
      quote:
        '“As an influencer, I need high-aesthetic footage that looks effortless. The Snap Shots reel maker knew exactly how to direct natural movement and lighting. Delivered 3 viral-ready clips in 3 hours!”',
      location: 'Delhi NCR',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      verified: true,
      date: 'September 2026',
    },
    {
      id: 'test-4',
      name: 'Rohan Mehra',
      role: 'Founder, Urban Crust Artisan Pizza',
      event: 'New Outlet Grand Launch',
      rating: 5,
      quote:
        '“The product shots of our woodfired pizzas and the cocktail bar went crazy on Instagram. Gained 1,800 local followers in 48 hours thanks to the reel hooks they designed.”',
      location: 'Hyderabad',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      verified: true,
      date: 'August 2026',
    },
  ] as TestimonialItem[],

  faqs: [
    {
      id: 'faq-1',
      question: 'How do I book a shoot?',
      answer:
        'Booking takes less than 2 minutes. Fill out our simple booking form with your event date, time, and location, or click the WhatsApp button to chat directly with our booking team. We confirm creator availability and lock in your slot immediately with zero friction.',
    },
    {
      id: 'faq-2',
      question: 'What types of reels do you create?',
      answer:
        'We specialize in vertical (9:16) video storytelling across Event Reels, Wedding & Sangeet Reels, Birthday Celebrations, Corporate Summits, Brand Activations, Product Unboxings, Cafe & Nightlife, and Influencer Content. Each reel is edited with current trending audio, dynamic pacing, and cinema-grade color grading.',
    },
    {
      id: 'faq-3',
      question: 'Do you cover events?',
      answer:
        'Yes! On-ground live event coverage is our core specialty. Whether it is an intimate 20-person sundowner dinner, an elaborate 3-day destination wedding, a live music festival, or an executive conference, our certified reel makers are trained to capture all key highlights without disrupting your guests.',
    },
    {
      id: 'faq-4',
      question: 'Do you provide photography?',
      answer:
        'Yes! Every package comes with a bundle of high-resolution, color-graded photographs. We also offer dedicated photography options with curated portrait albums, candid guest captures, and carousel-ready crops for social media.',
    },
    {
      id: 'faq-5',
      question: 'How quickly will I receive my content?',
      answer:
        'Speed is our defining hallmark. Standard packages deliver edited reels within 2 to 6 hours after your shoot wraps. For weddings and corporate events, we frequently deliver your first teaser reel while the event is still taking place so you can post in real-time!',
    },
    {
      id: 'faq-6',
      question: 'Can I request a custom package?',
      answer:
        'Absolutely. If you require multi-day coverage, multiple camera operators, licensed drone cinematography, specialized lighting rigs, or monthly recurring retainer shoots for your business, we will gladly prepare a custom tailored quotation.',
    },
    {
      id: 'faq-7',
      question: 'Do you provide raw footage?',
      answer:
        'Yes. In addition to your finished edited reels, we provide a secure cloud link containing all the uncompressed 4K raw video clips and photos captured during your shoot. You own 100% of your footage forever.',
    },
    {
      id: 'faq-8',
      question: 'Can I book a shoot for social media content?',
      answer:
        'Definitely. We frequently partner with creators, restaurants, gyms, aesthetic clinics, and personal brands for dedicated content batch days. You can knock out 10–15 reels in a single session with our structured content pacing.',
    },
  ] as FaqItem[],
};
