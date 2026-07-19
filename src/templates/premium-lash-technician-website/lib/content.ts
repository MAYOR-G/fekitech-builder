const heroCloseup = "/images/lashed-premium-hero.png";

const realLashImages = {
  studio: "/images/real-studio-treatment.jpg",
  classic: "/images/real-classic-closeup.jpg",
  hybrid: "/images/real-hybrid-side.jpg",
  volume: "/images/real-volume-closed.jpg",
  megaVolume: "/images/real-mega-volume.jpg",
  lashLift: "/images/real-lash-lift.jpg",
  brow: "/images/real-brow-lamination.jpg",
  fullEye: "/images/real-full-eye-design.jpg",
  infill: "/images/real-client-result.jpg",
  beforeClassic: "/images/real-before-classic.jpg",
  afterClassic: "/images/real-after-classic.jpg",
  beforeVolume: "/images/real-before-volume.jpg",
  afterVolume: "/images/real-after-volume.jpg",
  beforeBrow: "/images/real-before-classic.jpg",
  afterBrow: "/images/real-brow-lamination.jpg",
  artist: "/images/real-artist-working.jpg",
};

export const heroImage = heroCloseup;
export const studioImage = realLashImages.studio;
export const testimonialBg = realLashImages.volume;
export const artistImage = realLashImages.artist;

export const portfolioItems = [
  {
    title: "Feather Classic",
    category: "Classic",
    src: realLashImages.classic,
    featured: true,
    alt: "Real close-up of a classic eyelash extension set",
  },
  {
    title: "Soft Hybrid",
    category: "Hybrid",
    src: realLashImages.hybrid,
    alt: "Real eye close-up with hybrid lash extensions",
  },
  {
    title: "Velvet Volume",
    category: "Volume",
    src: realLashImages.volume,
    alt: "Real close-up of full volume lash extensions",
  },
  {
    title: "Brow Architecture",
    category: "Brow",
    src: realLashImages.brow,
    alt: "Real brow lamination close-up with lifted brow hairs",
  },
  {
    title: "Lifted Natural",
    category: "Lash Lift",
    src: realLashImages.lashLift,
    alt: "Real close-up of natural lashes after a lash lift",
  },
  {
    title: "Mega Drama",
    category: "Mega Volume",
    src: realLashImages.megaVolume,
    featured: true,
    alt: "Real close-up of dramatic mega volume lash extensions",
  },
  {
    title: "Classic Mapping",
    category: "Classic",
    src: realLashImages.studio,
    alt: "Real lash technician applying extensions with tweezers",
  },
  {
    title: "Full Eye Design",
    category: "Hybrid",
    src: realLashImages.fullEye,
    alt: "Real eye and brow close-up showing full eye design",
  },
  {
    title: "Sculpted Brow",
    category: "Brow",
    src: realLashImages.brow,
    alt: "Real sculpted brow lamination result",
  },
];

export const services = [
  {
    name: "The Classic Set",
    description: "One extension per natural lash",
    price: "From £85",
    image: realLashImages.classic,
  },
  {
    name: "The Hybrid Set",
    description: "Classic + volume mix for texture",
    price: "From £105",
    image: realLashImages.hybrid,
  },
  {
    name: "The Volume Set",
    description: "3D fans for a full, fluffy look",
    price: "From £125",
    image: realLashImages.volume,
  },
  {
    name: "The Mega Volume",
    description: "6D+ fans for maximum drama",
    price: "From £155",
    image: realLashImages.megaVolume,
  },
  {
    name: "The Lash Lift",
    description: "Natural curl and tint, no extensions",
    price: "From £55",
    image: realLashImages.lashLift,
  },
  {
    name: "Brow Lamination",
    description: "Sculpted, lifted brows",
    price: "From £50",
    image: realLashImages.brow,
  },
  {
    name: "The Full Eye Design",
    description: "Lashes + brows, mapped together",
    price: "From £160",
    image: realLashImages.fullEye,
  },
  {
    name: "Infill & Maintenance",
    description: "Keep your set flawless",
    price: "From £45",
    image: realLashImages.infill,
  },
];

export const transformations = [
  {
    title: "Classic Set",
    before: realLashImages.beforeClassic,
    after: realLashImages.afterClassic,
    alt: "Real before and after classic lash transformation",
  },
  {
    title: "Volume Set",
    before: realLashImages.beforeVolume,
    after: realLashImages.afterVolume,
    alt: "Real before and after volume lash transformation",
  },
  {
    title: "Brow Lamination",
    before: realLashImages.beforeBrow,
    after: realLashImages.afterBrow,
    alt: "Real before and after brow lamination transformation",
  },
];

export const pricing = [
  {
    name: "The Classic",
    price: "From £85",
    duration: "Full set, one-to-one, 60 min",
    features: ["Soft definition", "Custom eye map", "Natural curl pattern", "Aftercare ritual"],
  },
  {
    name: "The Hybrid",
    price: "From £105",
    duration: "Mixed texture, 90 min",
    badge: "Most Popular",
    features: ["Classic + volume blend", "Airy texture", "Bespoke density", "2-week styling check"],
  },
  {
    name: "The Volume",
    price: "From £125",
    duration: "Full fan application, 90 min",
    features: ["Full fan mapping", "Fluffy finish", "Dramatic curl lift", "Retention care guide"],
  },
];

export const testimonials = [
  {
    quote:
      "I have never felt more confident without makeup. My lashes are my new signature.",
    name: "Sophia L.",
    service: "The Volume Set",
  },
  {
    quote:
      "The precision is unreal. Every lash is perfectly placed. Worth every penny.",
    name: "Amelia R.",
    service: "The Hybrid Set",
  },
  {
    quote:
      "I came for lashes and left with a whole new level of self-esteem.",
    name: "Jessica M.",
    service: "The Mega Volume",
  },
];

export const instagramImages = [
  realLashImages.classic,
  realLashImages.hybrid,
  realLashImages.volume,
  realLashImages.lashLift,
  realLashImages.brow,
  realLashImages.studio,
];
