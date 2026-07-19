import {
  Award,
  CalendarCheck,
  ChefHat,
  ClipboardList,
  Clock3,
  GlassWater,
  HeartHandshake,
  Mail,
  MapPin,
  PartyPopper,
  Phone,
  Salad,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  UtensilsCrossed,
  Wine,
  BriefcaseBusiness,
} from "lucide-react";

export type HeroSlide = {
  title: string;
  label: string;
  image: string;
};

export type Service = {
  title: string;
  description: string;
  detail: string;
  image: string;
  icon: React.ElementType;
};

export type Package = {
  name: string;
  price: string;
  eyebrow: string;
  guestRange: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type ProcessStep = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export type GalleryItem = {
  title: string;
  occasion: string;
  image: string;
  notes: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
  location?: string;
};

export const brand = {
  name: "Gild & Gather",
  shortName: "Gild & Gather",
  tagline: "Fine catering for momentous occasions.",
  description:
    "We orchestrate beautiful, ingredient-driven dining experiences for weddings, corporate events, and private dinners. From the first bite to the final pour, every detail is managed with quiet precision.",
  email: "events@gildandgather.com",
  phone: "+1 (555) 283-9110",
  studioNote: "Tastings by appointment in our Brooklyn kitchen.",
  address: "124 Culinary Lane, Suite 2",
  location: "Brooklyn, NY 11201",
  hours: "Mon-Sat, 9am - 6pm",
  instagram: "@gildandgather",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const heroSlides: HeroSlide[] = [
  {
    title: "Exceptional Culinary Experiences",
    label: "Luxury Catering",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Impeccable Wedding Receptions",
    label: "Weddings",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Chef-Led Private Dining",
    label: "Private Events",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=90",
  },
];

export const contactHighlights = [
  { label: "Bespoke Menus", icon: UtensilsCrossed },
  { label: "Impeccable Service", icon: Award },
  { label: "Curated Experiences", icon: GlassWater },
];

export const services: Service[] = [
  {
    title: "Wedding Catering",
    description:
      "From elegant cocktail hours to multi-course plated dinners, we design menus that reflect your story and serve your guests flawlessly.",
    detail: "Full-service wedding dining",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=90",
    icon: HeartHandshake,
  },
  {
    title: "Corporate Events",
    description:
      "Elevated boardroom lunches, launch parties, and gala dinners delivered with professional timing and discreet service.",
    detail: "Office delivery or hosted service",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=90",
    icon: BriefcaseBusiness,
  },
  {
    title: "Private Dinners",
    description:
      "Chef-led dinner party experiences with composed courses, bespoke wine pairings, and quiet, attentive service in your home.",
    detail: "Intimate homes and venues",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=90",
    icon: ChefHat,
  },
  {
    title: "Celebration Gatherings",
    description:
      "Premium celebration menus for milestone birthdays, garden parties, and rehearsal dinners requiring a touch of elegance.",
    detail: "Buffet, passed bites, stations",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=90",
    icon: PartyPopper,
  },
  {
    title: "Artisan Buffets",
    description:
      "Beautifully styled buffet stations with premium warmers, bespoke servingware, clear dietary markers, and elegant guest flow.",
    detail: "Staffed presentation",
    image:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=90",
    icon: Salad,
  },
  {
    title: "Cocktail Receptions",
    description:
      "Exquisite passed canapés, elaborate grazing tables, and sommelier-selected pairings for standing receptions.",
    detail: "Canapés and grazing boards",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=90",
    icon: GlassWater,
  },
];

export const packages: Package[] = [
  {
    name: "The Intimate Table",
    price: "$1,800",
    eyebrow: "Small events",
    guestRange: "20-45 guests",
    description:
      "A refined starter package for intimate celebrations, executive lunches, and exclusive private dinners.",
    features: [
      "Seasonal starter and main selection",
      "Styled family-style or buffet service",
      "Dietary preference coordination",
      "Delivery, setup, and service staff",
    ],
  },
  {
    name: "The Signature Reception",
    price: "$3,500",
    eyebrow: "Most requested",
    guestRange: "45-110 guests",
    description:
      "A complete event package for weddings, milestone parties, and corporate receptions requiring high-end polish.",
    features: [
      "Passed canapés plus two-course menu",
      "Dedicated event captain and service team",
      "Complimentary menu tasting session",
      "Venue coordination and timeline planning",
    ],
    highlighted: true,
  },
  {
    name: "The Grand Gala",
    price: "$7,200",
    eyebrow: "Premium service",
    guestRange: "110-250 guests",
    description:
      "A highly bespoke catering experience for large luxury weddings, brand events, and formal galas.",
    features: [
      "Custom multi-course menu design",
      "Plated dining or premium station service",
      "Sommelier consultation and rentals guidance",
      "Senior event producer for seamless flow",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Inquiry & Vision",
    description:
      "Share your event date, location, guest count, and the atmosphere you wish to create for your guests.",
    icon: Send,
  },
  {
    title: "Consultation",
    description:
      "We discuss venue logistics, menu preferences, service style, and the finer details of your event flow.",
    icon: CalendarCheck,
  },
  {
    title: "Menu Design",
    description:
      "Our chefs draft a tailored menu proposal, complete with service notes, timing, and transparent pricing.",
    icon: ClipboardList,
  },
  {
    title: "Tasting & Confirmation",
    description:
      "Experience your menu firsthand. We refine the selections, finalize the deposit, and lock in the team.",
    icon: ShieldCheck,
  },
  {
    title: "Event Preparation",
    description:
      "Our team coordinates all rentals, delivery windows, and kitchen prep to ensure a flawless setup.",
    icon: Truck,
  },
  {
    title: "Flawless Execution",
    description:
      "From the first passed hors d'oeuvre to the final sweep of the venue, our service is calm and precise.",
    icon: UtensilsCrossed,
  },
];

export const features: Feature[] = [
  {
    title: "Event-first planning",
    description:
      "Menus are designed around venue access, guest flow, service timing, and the atmosphere you want to create.",
    icon: CalendarCheck,
  },
  {
    title: "Exquisite presentation",
    description:
      "Every station, platter, and passed bite is composed to feel intentional in photos and effortless in person.",
    icon: Sparkles,
  },
  {
    title: "Reliable operations",
    description:
      "Clear quotes, staffing notes, delivery windows, dietary markers, and event-day communication keep the work calm.",
    icon: Award,
  },
  {
    title: "Flexible service styles",
    description:
      "Choose drop-off, staffed buffet, grazing table, plated dinner, cocktail service, or a custom hybrid format.",
    icon: Wine,
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Garden wedding supper",
    occasion: "Weddings",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=90",
    notes: "Plated dinner, champagne hour, and late-night dessert table.",
  },
  {
    title: "Boardroom lunch spread",
    occasion: "Corporate",
    image:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1400&q=90",
    notes: "Warm mains, salad boards, boxed desserts, and discreet setup.",
  },
  {
    title: "Private chef evening",
    occasion: "Private dining",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=90",
    notes: "Four-course menu with chef plating and table-side service.",
  },
  {
    title: "Cocktail canape service",
    occasion: "Receptions",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=90",
    notes: "Passed bites, grazing table, and bar-friendly small plates.",
  },
  {
    title: "Milestone birthday buffet",
    occasion: "Celebrations",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=90",
    notes: "Styled buffet with warm service and a sweets station.",
  },
  {
    title: "Chef's counter plating",
    occasion: "Kitchen action",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=90",
    notes: "Chef-led finishing, warm pass service, and precise timing.",
  },
  {
    title: "Late afternoon table",
    occasion: "Fine venues",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=90",
    notes: "Elegant table settings prepared for a seated seasonal menu.",
  },
  {
    title: "Champagne and canapes",
    occasion: "Cocktail hour",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=90",
    notes: "Passed bites, chilled pours, and a composed reception flow.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The menu felt entirely bespoke without making the planning process complicated. Guests kept asking who catered the reception—it was that exceptional.",
    name: "Amelia Hart",
    title: "Wedding Client",
    initials: "AH",
    location: "Brooklyn, NY",
  },
  {
    quote:
      "Their team handled our investor lunch with the kind of impeccable timing and presentation you usually only see at private members' clubs.",
    name: "Marcus Lee",
    title: "Operations Director",
    initials: "ML",
    location: "Chicago, IL",
  },
  {
    quote:
      "The tasting, proposal, setup, and service were completely calm from start to finish. It made hosting a dinner party at home feel genuinely luxurious.",
    name: "Priya Shah",
    title: "Private Dinner Host",
    initials: "PS",
    location: "London, UK",
  },
];

export const footerLinks = [
  { label: "Wedding Catering", href: "#services" },
  { label: "Corporate Events", href: "#services" },
  { label: "Curated Packages", href: "#packages" },
  { label: "Event Portfolio", href: "#gallery" },
];

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
];

export const contactCards = [
  { label: brand.phone, icon: Phone },
  { label: brand.email, icon: Mail },
  { label: brand.studioNote, icon: MapPin },
  { label: "Typical quote turnaround: 1-2 business days", icon: Clock3 },
  { label: "Tastings available for confirmed full-service events", icon: Star },
];

export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "Do you accommodate dietary restrictions and allergies?",
    answer: "Yes, absolutely. We design menus to accommodate all dietary requirements, including vegan, gluten-free, dairy-free, and severe allergies. We ensure these meals are prepared safely and served seamlessly.",
  },
  {
    question: "How far in advance should we book our event?",
    answer: "For weddings and large corporate events, we recommend booking 6 to 12 months in advance. For private dinners and smaller gatherings, 4 to 8 weeks is typically sufficient, though dates do fill up quickly during peak seasons.",
  },
  {
    question: "Do you provide staff, rentals, and bar service?",
    answer: "Yes. Our full-service packages include professional event captains, servers, and chefs. We can also coordinate rentals (tables, linens, glassware) and provide TIPS-certified bartenders to manage your beverage program.",
  },
  {
    question: "Do you offer menu tastings?",
    answer: "We offer complimentary tasting sessions for clients who have booked a full-service wedding or large-scale event with us. For other events, tastings can be arranged for a fee, which is credited toward your final invoice if you book.",
  },
];
