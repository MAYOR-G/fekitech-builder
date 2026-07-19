import {
  BadgeCheck,
  CalendarCheck,
  HeartPulse,
  LifeBuoy,
  Microscope,
  ScanLine,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  TimerReset,
  Users,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const unsplash = (id: string, width = 1500) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=88`;

export type NavLink = {
  label: string;
  href: string;
};

export type HeroSlide = {
  title: string;
  image: string;
  alt: string;
};

export type TrustStat = {
  value: string;
  label: string;
  detail: string;
  icon: LucideIcon;
};

export type Service = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  detail: string;
};

export type JourneyStep = {
  title: string;
  description: string;
  image: string;
  label: string;
};

export type StoryCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ResultCase = {
  title: string;
  treatment: string;
  timeline: string;
  beforeImage: string;
  afterImage: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  treatment: string;
  rating: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export const brand = {
  name: "Luma Dental Studio",
  tagline: "Private dentistry with calm precision.",
  phone: "+1 (312) 555-0198",
  email: "care@lumadentalstudio.com",
  address: "118 West Oak Street, Chicago, IL 60610",
  hours: "Mon-Fri 8:00-6:00, Sat 9:00-2:00",
};

export const navLinks: NavLink[] = [
  { label: "Treatments", href: "#treatments" },
  { label: "Experience", href: "#experience" },
  { label: "Results", href: "#results" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export const heroSlides: HeroSlide[] = [
  {
    title: "Bright private treatment suite with modern dental chair",
    image: "/images/dentist_hero_1.png",
    alt: "Dentist consulting with a patient in a bright modern treatment room.",
  },
  {
    title: "Clean dental equipment in a calm treatment room",
    image: "/images/dentist_hero_2.png",
    alt: "Bright dental treatment room with clean equipment and daylight.",
  },
  {
    title: "Professional dental care with a patient",
    image: "/images/dentist_hero_3.png",
    alt: "Dental professional caring for a patient in a clean clinic.",
  },
  {
    title: "Smile consultation in a warm clinic setting",
    image: "/images/dentist_hero_4.png",
    alt: "Dental consultation in a bright, professional clinic setting.",
  },
];

export const heroBadges = [
  "Same-day appointments",
  "Family dental care",
  "Cosmetic dentistry",
];

export const trustStats: TrustStat[] = [
  {
    value: "4.9/5",
    label: "patient rating",
    detail: "Based on verified post-visit feedback",
    icon: Star,
  },
  {
    value: "18+",
    label: "years of care",
    detail: "Private practice experience across preventive and cosmetic dentistry",
    icon: BadgeCheck,
  },
  {
    value: "12k+",
    label: "patients served",
    detail: "Long-term care for families, professionals, and smile makeovers",
    icon: Users,
  },
  {
    value: "24 hr",
    label: "emergency support",
    detail: "Rapid guidance for urgent dental pain, trauma, and repairs",
    icon: LifeBuoy,
  },
];

export const services: Service[] = [
  {
    title: "General dentistry",
    description:
      "Comprehensive exams, cleanings, fillings, night guards, and preventive care for lasting oral health.",
    detail: "Preventive plans",
    image: "/images/dentist_service_1.png",
    icon: Stethoscope,
  },
  {
    title: "Cosmetic dentistry",
    description:
      "Veneers, bonding, contouring, and smile design with natural proportions and conservative planning.",
    detail: "Smile design",
    image: "/images/dentist_service_2.png",
    icon: Smile,
  },
  {
    title: "Teeth whitening",
    description:
      "Professional whitening options selected around sensitivity, timeline, and your natural tooth shade.",
    detail: "Brighten safely",
    image: "/images/dentist_service_3.png",
    icon: Sparkles,
  },
  {
    title: "Invisalign / clear aligners",
    description:
      "Discreet alignment planning with digital scans, clear timelines, and progress checks that fit real life.",
    detail: "Digital scan",
    image: "/images/dentist_service_4.png",
    icon: ScanLine,
  },
  {
    title: "Dental implants",
    description:
      "Thoughtful implant coordination, restoration planning, and maintenance support for missing teeth.",
    detail: "Restorative care",
    image: "/images/dentist_service_5.png",
    icon: Syringe,
  },
  {
    title: "Emergency dental care",
    description:
      "Prompt help for tooth pain, chipped teeth, swelling, lost crowns, and urgent dental concerns.",
    detail: "Urgent visits",
    image: "/images/dentist_service_6.png",
    icon: HeartPulse,
  },
];

export const journeySteps: JourneyStep[] = [
  {
    label: "01",
    title: "Consultation",
    description:
      "We listen first, review your goals, and explain options without pressure or rushed treatment plans.",
    image: unsplash("photo-1609207825181-52d3214556dd", 1200),
  },
  {
    label: "02",
    title: "Digital scan",
    description:
      "High-resolution imaging and intraoral scanning help us plan precisely and show you what we see.",
    image: unsplash("photo-1629909615184-74f495363b67", 1200),
  },
  {
    label: "03",
    title: "Personalized treatment plan",
    description:
      "Your care plan balances comfort, budget, timing, and long-term oral health rather than one-size-fits-all dentistry.",
    image: "/images/dentist_journey_3.png",
  },
  {
    label: "04",
    title: "Comfortable treatment",
    description:
      "Gentle techniques, quiet rooms, and clear check-ins help visits feel calm from start to finish.",
    image: "/images/dentist_journey_4.png",
  },
  {
    label: "05",
    title: "Follow-up care",
    description:
      "We monitor healing, answer questions, and schedule maintenance so results stay healthy and natural.",
    image: unsplash("photo-1609840114035-3c981b782dfe", 1200),
  },
];

export const storyCards: StoryCard[] = [
  {
    title: "Comfort-led rooms",
    description:
      "Soft lighting, private suites, and easy conversation help patients feel grounded before treatment begins.",
    icon: HeartPulse,
  },
  {
    title: "Modern diagnostics",
    description:
      "Digital scans and low-radiation imaging create clearer treatment plans and fewer surprises.",
    icon: Microscope,
  },
  {
    title: "Visible hygiene standards",
    description:
      "Sterilization protocols, organized operatories, and transparent workflows support patient confidence.",
    icon: ShieldCheck,
  },
  {
    title: "Personalized pacing",
    description:
      "We make room for questions, sensitivity concerns, and phased treatment when that is the better path.",
    icon: TimerReset,
  },
];

export const resultCases: ResultCase[] = [
  {
    title: "Subtle whitening refresh",
    treatment: "Professional whitening",
    timeline: "Two visits",
    beforeImage: unsplash("photo-1606811971618-4486d14f3f99", 900),
    afterImage: unsplash("photo-1606811971618-4486d14f3f99", 900),
  },
  {
    title: "Conservative bonding",
    treatment: "Edge bonding and polish",
    timeline: "One appointment",
    beforeImage: unsplash("photo-1606811841689-23dfddce3e95", 900),
    afterImage: unsplash("photo-1606811841689-23dfddce3e95", 900),
  },
  {
    title: "Alignment planning",
    treatment: "Clear aligner plan",
    timeline: "Estimated 7-10 months",
    beforeImage: unsplash("photo-1606811842243-af7e16970b5f", 900),
    afterImage: unsplash("photo-1606811842243-af7e16970b5f", 900),
  },
];

export const team: TeamMember[] = [
  {
    name: "Dr. Elena Hart, DDS",
    role: "Cosmetic and restorative dentist",
    bio: "Known for calm chairside communication and smile designs that preserve a patient natural expression.",
    image: unsplash("photo-1594824476967-48c8b964273f", 900),
  },
  {
    name: "Dr. Marcus Lee, DMD",
    role: "Implant and emergency care",
    bio: "Coordinates surgical referrals, urgent care, and restorative plans with a practical, reassuring approach.",
    image: unsplash("photo-1622253692010-333f2da6031d", 900),
  },
  {
    name: "Avery Brooks, RDH",
    role: "Dental hygienist",
    bio: "Leads preventive visits, periodontal maintenance, and patient education with a gentle, detail-led style.",
    image: unsplash("photo-1559839734-2b71ea197ec2", 900),
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The team explained every step and never made me feel rushed. The office feels calm, bright, and genuinely thoughtful.",
    name: "Maya R.",
    treatment: "Preventive care and whitening",
    rating: "5.0",
  },
  {
    quote:
      "I came in anxious about a cracked tooth. They handled the urgent visit quickly and gave me a clear plan before doing anything.",
    name: "Jordan P.",
    treatment: "Emergency visit",
    rating: "5.0",
  },
  {
    quote:
      "My aligner consultation was refreshingly honest. I understood the timeline, tradeoffs, and what would actually improve my bite.",
    name: "Sofia L.",
    treatment: "Clear aligner consultation",
    rating: "4.9",
  },
  {
    quote:
      "The hygiene visit was thorough but gentle. This is the first dental office I have returned to without delaying the appointment.",
    name: "Nolan B.",
    treatment: "Hygiene therapy",
    rating: "5.0",
  },
];

export const faqs: FAQ[] = [
  {
    question: "Do you accept same-day appointments?",
    answer:
      "Same-day appointments are available when the schedule allows, especially for dental pain, chipped teeth, swelling, and urgent concerns. Calling early in the day gives the team the best chance to help.",
  },
  {
    question: "Is cosmetic dentistry right for every patient?",
    answer:
      "Not always. We start with oral health, bite function, and realistic goals. Cosmetic treatments are recommended only when they support a stable, healthy result.",
  },
  {
    question: "What happens during a new patient visit?",
    answer:
      "Your first visit usually includes a conversation about goals and concerns, digital imaging if needed, a comprehensive exam, and a clear discussion of options before treatment begins.",
  },
  {
    question: "Do clear aligners hurt?",
    answer:
      "Most patients feel pressure for a few days after switching trays. We review fit, hygiene, and comfort tips so the process feels manageable.",
  },
  {
    question: "Can I use this template with real booking software?",
    answer:
      "Yes. The appointment form and CTA links are frontend placeholders and can be connected to a booking system, CRM, or secure patient intake workflow.",
  },
];

export const clinicImages = {
  about: unsplash("photo-1598256989800-fe5f95da9787", 1500),
  videoPoster: unsplash("photo-1588776814546-daab30f310ce", 1500),
  storyBackground: unsplash("photo-1629909613654-28e377c37b09", 2200),
  booking: "/images/dentist_patient_bg_1781688652799.png",
};

export const appointmentOptions = [
  "New patient exam",
  "Cleaning and prevention",
  "Cosmetic consultation",
  "Emergency concern",
];

export const careHighlights = [
  { label: "Digital dentistry", icon: ScanLine },
  { label: "Gentle care", icon: Stethoscope },
  { label: "Natural results", icon: WandSparkles },
  { label: "Clear planning", icon: CalendarCheck },
];
