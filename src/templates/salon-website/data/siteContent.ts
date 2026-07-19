import {
  CalendarCheck,
  Clock3,
  Gem,
  Heart,
  Mail,
  MapPin,
  Palette,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  UserRound,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
  price: string;
  icon: LucideIcon;
  image: string;
};

export type PricingPackage = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type TrustPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type GalleryItem = {
  title: string;
  label: string;
  image: string;
};

export type Stylist = {
  name: string;
  role: string;
  image: string;
  note: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
};

export const brand = {
  name: "Lumière Beauty Studio",
  tagline: "Premium hair, beauty, nails, makeup, and grooming appointments in a calm studio setting.",
  phone: "+1 212 555 0136",
  email: "hello@lumierebeautystudio.com",
  address: "74 West Broadway, New York, NY 10007",
  hours: "Tue-Sat 9:00 AM-7:00 PM, Sun by appointment",
  instagram: "@lumierebeautystudio",
};

export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Stylists", href: "#stylists" },
  { label: "Reviews", href: "#reviews" },
];

export const heroStats = [
  { value: "4.9", label: "client rating" },
  { value: "12+", label: "beauty services" },
  { value: "24h", label: "easy booking" },
];

export const services: Service[] = [
  {
    title: "Hair Styling",
    description:
      "Blowouts, precision cuts, silk press styling, event looks, and polished everyday finishes.",
    price: "$80",
    icon: Scissors,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Hair Treatment",
    description:
      "Hydration, scalp care, bond repair, glossing, and restorative treatments for healthy shine.",
    price: "$120",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Nails",
    description:
      "Clean manicures, gel finishes, soft nail art, strengthening care, and refined polish changes.",
    price: "$45",
    icon: Gem,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Makeup",
    description:
      "Soft glam, editorial beauty, photoshoot looks, complexion work, and evening makeup.",
    price: "$95",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Bridal Beauty",
    description:
      "Trial sessions, wedding-day hair and makeup, touch-up kits, and bridal party coordination.",
    price: "$250",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Spa Care",
    description:
      "Facial refresh, hand care, relaxing add-ons, and skin-focused treatments for a studio reset.",
    price: "$85",
    icon: SprayCan,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Consultations",
    description:
      "Personalized beauty planning for color direction, treatment needs, bridal looks, and routines.",
    price: "$35",
    icon: UserRound,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
  },
];

export const packages: PricingPackage[] = [
  {
    name: "Studio Refresh",
    price: "$120",
    description:
      "A polished maintenance visit for hair styling, treatment support, or grooming refreshes.",
    features: ["Consultation", "Shampoo and finish", "Product guidance", "Style notes"],
  },
  {
    name: "Glow Session",
    price: "$180",
    description:
      "A complete beauty appointment combining hair finish, nails, and soft studio-ready polish.",
    features: ["Hair finish", "Gel manicure", "Hydration add-on", "Appointment plan"],
    highlighted: true,
  },
  {
    name: "Bridal Edit",
    price: "$250",
    description:
      "A calm beauty plan for brides, events, photoshoots, and elevated celebration appointments.",
    features: ["Trial planning", "Hair and makeup", "Touch-up notes", "Party add-ons"],
  },
];

export const trustPoints: TrustPoint[] = [
  {
    title: "Expert stylists",
    description:
      "Experienced beauty professionals guide each look with care, technique, and honest recommendations.",
    icon: WandSparkles,
  },
  {
    title: "Premium products",
    description:
      "Treatments, styling, polish, and makeup are supported by quality products chosen for lasting finish.",
    icon: Sparkles,
  },
  {
    title: "Clean environment",
    description:
      "A calm, hygienic studio experience with thoughtful appointment spacing and tidy workstations.",
    icon: ShieldCheck,
  },
  {
    title: "Personalized care",
    description:
      "Every appointment begins with your lifestyle, hair history, event needs, and comfort in mind.",
    icon: Heart,
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Soft glam finish",
    label: "Makeup",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Studio hair detail",
    label: "Hair",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Polished nails",
    label: "Nails",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Bridal glow",
    label: "Bridal",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Treatment ritual",
    label: "Care",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=88",
  },
];

export const stylists: Stylist[] = [
  {
    name: "Mara Ellison",
    role: "Lead Hair Artist",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=88",
    note: "Cuts, color direction, silk finishes, and treatment planning.",
  },
  {
    name: "Ava Monroe",
    role: "Makeup and Bridal",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88",
    note: "Soft glam, complexion work, bridal trials, and event beauty.",
  },
  {
    name: "Lena Brooks",
    role: "Nail and Spa Specialist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=88",
    note: "Gel manicure, hand care, nail art, and relaxing studio treatments.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Choose service",
    description: "Select the treatment, styling, nails, makeup, or bridal service that fits your goal.",
    icon: Sparkles,
  },
  {
    title: "Pick a time",
    description: "Choose a preferred appointment window or request availability for special events.",
    icon: CalendarCheck,
  },
  {
    title: "Consultation",
    description: "Share your inspiration, routine, comfort level, hair history, and event details.",
    icon: UserRound,
  },
  {
    title: "Visit studio",
    description: "Arrive for a calm appointment with clear guidance, polished finish, and aftercare notes.",
    icon: Star,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The consultation felt thoughtful and the finish lasted all weekend. The studio has such a calm, premium feel.",
    name: "Claire Morgan",
    title: "Hair styling client",
    initials: "CM",
  },
  {
    quote:
      "My bridal trial was organized, relaxed, and beautifully detailed. I left knowing exactly what the wedding morning would look like.",
    name: "Sofia Bennett",
    title: "Bridal client",
    initials: "SB",
  },
  {
    quote:
      "The nail service was precise without feeling rushed. Everything from booking to checkout felt polished.",
    name: "Maya Collins",
    title: "Nail care client",
    initials: "MC",
  },
];

export const contactCards = [
  { title: "Phone", label: brand.phone, icon: Phone },
  { title: "Email", label: brand.email, icon: Mail },
  { title: "Address", label: brand.address, icon: MapPin },
  { title: "Hours", label: brand.hours, icon: Clock3 },
];

export const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book appointment", href: "#booking" },
];

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Pinterest", href: "#" },
];
