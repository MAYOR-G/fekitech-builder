import {
  BedDouble,
  Bell,
  CalendarDays,
  Car,
  Coffee,
  Dumbbell,
  GlassWater,
  Heart,
  KeyRound,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Utensils,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Room = {
  name: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
};

export type Experience = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export type Amenity = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type GalleryItem = {
  title: string;
  label: string;
  image: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
};

export const brand = {
  name: "The Marlowe House",
  tagline: "Boutique rooms, quiet service, and thoughtful stays for modern travelers.",
  phone: "+1 212 555 0142",
  email: "stay@marlowehouse.com",
  address: "42 Mercer Street, New York, NY 10013",
  locationNote:
    "A calm boutique address for weekend stays, business travel, and romantic city breaks.",
  instagram: "@marlowehouse",
  policies: "Flexible 48-hour cancellation on standard stays. Check-in from 3 PM.",
};

export const navLinks: NavLink[] = [
  { label: "Rooms", href: "#rooms" },
  { label: "Experience", href: "#experience" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export const heroStats = [
  { value: "32", label: "guest rooms" },
  { value: "4.9", label: "guest rating" },
  { value: "24h", label: "concierge" },
];

export const rooms: Room[] = [
  {
    name: "Classic Queen Room",
    price: "$180/night",
    image: "/images/room_queen.png",
    description:
      "A calm room with tailored textiles, a queen bed, reading corner, and quiet city-facing windows.",
    highlights: ["Queen bed", "Rain shower", "Work desk"],
  },
  {
    name: "Executive King Room",
    price: "$240/night",
    image: "/images/room_king.png",
    description:
      "Designed for longer stays and business travel, with a king bed, lounge chair, and generous workspace.",
    highlights: ["King bed", "Lounge area", "Fast Wi-Fi"],
  },
  {
    name: "Courtyard Suite",
    price: "$320/night",
    image: "/images/room_courtyard.png",
    description:
      "A spacious suite overlooking the courtyard, with separate seating, soft lighting, and premium bath details.",
    highlights: ["Separate lounge", "Courtyard view", "Soaking tub"],
  },
  {
    name: "Penthouse Suite",
    price: "$390/night",
    image: "/images/room_penthouse.png",
    description:
      "Top-floor privacy with a private terrace feel, curated minibar, espresso service, and elevated city views.",
    highlights: ["Top floor", "City view", "Premium minibar"],
  },
];

export const experiences: Experience[] = [
  {
    title: "Quiet comfort",
    description:
      "Layered bedding, blackout drapery, warm lighting, and acoustic attention make each room feel restful.",
    image: "/images/gallery_1_details.png",
    icon: BedDouble,
  },
  {
    title: "Central location",
    description:
      "A polished base for meetings, galleries, restaurants, shopping districts, and quiet morning walks.",
    image: "/images/location_street.png",
    icon: MapPin,
  },
  {
    title: "All-day lounge",
    description:
      "Breakfast, coffee, evening drinks, and casual work sessions flow through a calm guest lounge.",
    image: "/images/gallery_2_evening.png",
    icon: Coffee,
  },
  {
    title: "Concierge care",
    description:
      "Local recommendations, arrival notes, luggage help, and special requests are handled with quiet precision.",
    image: "/images/hotel_hero.png",
    icon: Bell,
  },
];

export const amenities: Amenity[] = [
  {
    title: "Fast Wi-Fi",
    description: "Reliable high-speed access for work, streaming, and video calls.",
    icon: Wifi,
  },
  {
    title: "Breakfast",
    description: "Seasonal breakfast and espresso service in the guest lounge.",
    icon: Utensils,
  },
  {
    title: "Parking",
    description: "Nearby valet and self-park options with front desk guidance.",
    icon: Car,
  },
  {
    title: "Room Service",
    description: "Evening plates, drinks, and comfort essentials delivered quietly.",
    icon: GlassWater,
  },
  {
    title: "Wellness",
    description: "Compact fitness room and in-room wellness recommendations.",
    icon: Dumbbell,
  },
  {
    title: "Concierge",
    description: "Reservations, local notes, transfers, and special occasions.",
    icon: KeyRound,
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Layered guest rooms",
    label: "Rooms",
    image: "/images/gallery_1_details.png",
  },
  {
    title: "Evening lobby",
    label: "Lobby",
    image: "/images/gallery_2_evening.png",
  },
  {
    title: "Breakfast table",
    label: "Dining",
    image: "/images/gallery_3_breakfast.png",
  },
  {
    title: "Heritage exterior",
    label: "Arrival",
    image: "/images/gallery_4_exterior.png",
  },
  {
    title: "Weekend suite ritual",
    label: "Stay",
    image: "/images/gallery_5_champagne.png",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The room felt beautifully considered, the staff remembered our arrival notes, and the whole stay was calm from check-in to checkout.",
    name: "Isabelle Carter",
    title: "Weekend guest",
    initials: "IC",
  },
  {
    quote:
      "A perfect base for a business trip: quiet, polished, close to everything, and the workspace in the room was genuinely useful.",
    name: "Thomas Reed",
    title: "Business traveler",
    initials: "TR",
  },
  {
    quote:
      "It felt like a small luxury hotel without the stiffness. The suite, breakfast, and concierge notes were all excellent.",
    name: "Maya Bennett",
    title: "Anniversary stay",
    initials: "MB",
  },
];

export const bookingFields = [
  { label: "Check-in", value: "Select date", icon: CalendarDays },
  { label: "Check-out", value: "Select date", icon: CalendarDays },
  { label: "Guests", value: "2 adults", icon: Heart },
  { label: "Room type", value: "Suite or room", icon: BedDouble },
];

export const contactCards = [
  { title: "Phone", label: brand.phone, icon: Phone },
  { title: "Email", label: brand.email, icon: Sparkles },
  { title: "Address", label: brand.address, icon: MapPin },
  { title: "Policies", label: brand.policies, icon: ShieldCheck },
];

export const footerLinks = [
  { label: "Rooms and suites", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book your stay", href: "#booking" },
];

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "Tripadvisor", href: "#" },
];

export const locationHighlights = [
  "15 minutes to major galleries",
  "Quiet street-facing rooms",
  "Easy airport transfer support",
  "Walkable dining and shopping",
];
