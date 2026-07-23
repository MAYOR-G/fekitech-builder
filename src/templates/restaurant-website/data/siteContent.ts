import {
  Beef,
  CalendarCheck,
  ChefHat,
  Clock3,
  Flame,
  GlassWater,
  Leaf,
  Mail,
  MapPin,
  Martini,
  Phone,
  Salad,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type FeaturedDish = {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
};

export type MenuItem = {
  name: string;
  price: string;
  description: string;
};

export type MenuCategory = {
  title: string;
  icon: LucideIcon;
  items: MenuItem[];
};

export type Experience = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export type Reason = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type GalleryItem = {
  title: string;
  label: string;
  image: string;
};

export type Review = {
  quote: string;
  name: string;
  title: string;
  initials: string;
  rating: string;
};

export const brand = {
  name: "The Rustic Plate Restaurant",
  tagline: "Seasonal British cooking, thoughtful drinks and warm Yorkshire hospitality.",
  phone: "+44 1904 555 018",
  email: "bookings@therusticplate.co.uk",
  address: "12 Stonegate, York YO1 8AS",
  locationNote: "Private dining, Sunday lunch and group bookings in the heart of York.",
  instagram: "@therusticplate",
};

export const hero = {
  eyebrow: "Independent dining in York",
  title: "Seasonal food, simply done.",
  subtitle:
    "A relaxed British restaurant serving thoughtful plates, good wine and warm hospitality in the heart of York.",
  image: "/templates/assets/halcyon-dining.webp",
  imageAlt: "Elegant candlelit restaurant dining room prepared for evening service",
  primaryLabel: "Reserve a table",
  primaryHref: "#reservation",
  secondaryLabel: "View the menu",
  secondaryHref: "#menu",
};

export const navLinks: NavLink[] = [
  { label: "Dishes", href: "#dishes" },
  { label: "Menu", href: "#menu" },
  { label: "Experience", href: "#experience" },
  { label: "Hours", href: "#hours" },
  { label: "Reviews", href: "#reviews" },
];

export const heroStats = [
  { value: "4.8", label: "guest rating" },
  { value: "6-10 PM", label: "dinner service" },
  { value: "$65", label: "tasting menu from" },
];

export const featuredDishes: FeaturedDish[] = [
  {
    name: "Charred Ribeye with Sage Butter",
    category: "Chef special",
    price: "$35",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=88",
    description:
      "Dry-aged ribeye, ember-roasted garlic, sage butter, crispy potatoes, and red wine jus.",
  },
  {
    name: "Wild Mushroom Tagliatelle",
    category: "House pasta",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=88",
    description:
      "Hand-cut pasta, roasted mushrooms, parmesan cream, toasted hazelnut, and lemon thyme.",
  },
  {
    name: "Seared Sea Bass & Fennel",
    category: "Fresh catch",
    price: "$32",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=88",
    description:
      "Crisp-skinned sea bass, shaved fennel, herb oil, citrus beurre blanc, and baby greens.",
  },
  {
    name: "Amber Citrus Pavlova",
    category: "Dessert",
    price: "$14",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=88",
    description:
      "Meringue, mascarpone cream, burnt honey, blood orange, pistachio, and mint.",
  },
];

export const menuCategories: MenuCategory[] = [
  {
    title: "Starters",
    icon: Salad,
    items: [
      {
        name: "Smoked Burrata & Tomato Jam",
        price: "$18",
        description: "Creamy burrata, fire-roasted tomato, basil oil, grilled sourdough.",
      },
      {
        name: "Crispy Sage Arancini",
        price: "$16",
        description: "Risotto fritters, parmesan, black garlic aioli, herb salt.",
      },
      {
        name: "Coal-Roasted Carrots",
        price: "$15",
        description: "Whipped feta, dukkah, burnt orange glaze, tender herbs.",
      },
    ],
  },
  {
    title: "Mains",
    icon: Beef,
    items: [
      {
        name: "Heritage Chicken Under Brick",
        price: "$29",
        description: "Lemon jus, charred broccolini, crispy shallots, herb potatoes.",
      },
      {
        name: "Short Rib Ragu Pappardelle",
        price: "$28",
        description: "Slow-braised short rib, tomato, parmesan, rosemary pangrattato.",
      },
      {
        name: "Ember-Grilled Salmon",
        price: "$31",
        description: "Sage chimichurri, pearl couscous, cucumber, charred lemon.",
      },
    ],
  },
  {
    title: "Chef Specials",
    icon: Flame,
    items: [
      {
        name: "Open-Fire Tasting Menu",
        price: "$65",
        description: "Four seasonal courses built around the grill, market produce, and dessert.",
      },
      {
        name: "Date Night Table",
        price: "$98",
        description: "Two starters, two mains, one dessert to share, and two house cocktails.",
      },
      {
        name: "Private Dining Supper",
        price: "$75",
        description: "Group menu for 8+ guests with shared starters and family-style mains.",
      },
    ],
  },
  {
    title: "Desserts",
    icon: Sparkles,
    items: [
      {
        name: "Dark Chocolate Pot de Creme",
        price: "$13",
        description: "Sea salt, espresso cream, cocoa nib crumble.",
      },
      {
        name: "Burnt Honey Cheesecake",
        price: "$14",
        description: "Citrus curd, pistachio, whipped creme fraiche.",
      },
      {
        name: "Pear & Sage Galette",
        price: "$12",
        description: "Warm pastry, vanilla bean ice cream, caramel drizzle.",
      },
    ],
  },
  {
    title: "Drinks",
    icon: Martini,
    items: [
      {
        name: "Sage Old Fashioned",
        price: "$17",
        description: "Bourbon, burnt sugar, sage bitters, orange peel.",
      },
      {
        name: "Amber Spritz",
        price: "$15",
        description: "Aperitivo, sparkling wine, blood orange, rosemary.",
      },
      {
        name: "Zero-Proof Garden Tonic",
        price: "$11",
        description: "Cucumber, basil, citrus, elderflower, tonic.",
      },
    ],
  },
];

export const experiences: Experience[] = [
  {
    title: "Atmospheric Dining Room",
    description:
      "Low amber light, tactile materials, and comfortable seating create a room that works for date nights, family dinners, and celebrations.",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=88",
    icon: GlassWater,
  },
  {
    title: "Private Dining",
    description:
      "Reserve a semi-private table or full dining room area for birthdays, client dinners, rehearsal meals, and group celebrations.",
    image:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1000&q=88",
    icon: CalendarCheck,
  },
  {
    title: "Seasonal Ingredients",
    description:
      "Menus evolve around market produce, quality proteins, fresh herbs, and a kitchen built for wood, flame, and finesse.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=88",
    icon: Leaf,
  },
  {
    title: "Chef-Led Menus",
    description:
      "Daily specials, tasting menus, and thoughtful pairings let returning guests discover something new each visit.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=88",
    icon: ChefHat,
  },
];

export const reasons: Reason[] = [
  {
    title: "Reservation-ready journeys",
    description: "Clear CTAs, hours, address, and menu previews help guests decide and book quickly.",
    icon: CalendarCheck,
  },
  {
    title: "Food-first storytelling",
    description: "Signature dishes, chef specials, and seasonal language create appetite without clutter.",
    icon: UtensilsCrossed,
  },
  {
    title: "Warm premium atmosphere",
    description: "The palette and imagery feel intimate, polished, and suited to evening dining.",
    icon: Flame,
  },
  {
    title: "Flexible for many concepts",
    description: "The structure can adapt to cafés, grills, lounges, bistros, and fine dining brands.",
    icon: Wine,
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Open-fire mains",
    label: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Dinner service glow",
    label: "Ambience",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Cocktail hour",
    label: "Drinks",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Chef plating",
    label: "Craft",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Shared table",
    label: "Dining",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Golden dessert finish",
    label: "Dessert",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=88",
  },
];

export const hours = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday-Thursday", time: "5:00 PM-10:00 PM" },
  { day: "Friday-Saturday", time: "5:00 PM-11:30 PM" },
  { day: "Sunday", time: "11:00 AM-3:00 PM, 5:00 PM-9:00 PM" },
];

export const reviews: Review[] = [
  {
    quote:
      "A beautiful room, confident food, and the kind of service that makes dinner feel unhurried without ever slowing down.",
    name: "Claire Morgan",
    title: "Private dining guest",
    initials: "CM",
    rating: "5.0",
  },
  {
    quote:
      "The menu reads clearly online and tastes even better in person. The ribeye and sage cocktail were both excellent.",
    name: "Daniel Price",
    title: "Weekend dinner guest",
    initials: "DP",
    rating: "4.9",
  },
  {
    quote:
      "We booked for a family celebration and the team handled the pacing, wine suggestions, and table details perfectly.",
    name: "Sofia Bennett",
    title: "Celebration booking",
    initials: "SB",
    rating: "5.0",
  },
];

export const contactCards = [
  { label: brand.phone, icon: Phone },
  { label: brand.email, icon: Mail },
  { label: brand.address, icon: MapPin },
  { label: "Dinner reservations recommended Thursday-Saturday", icon: Clock3 },
  { label: brand.locationNote, icon: Star },
];

export const footerLinks = [
  { label: "Featured dishes", href: "#dishes" },
  { label: "Menu preview", href: "#menu" },
  { label: "Restaurant experience", href: "#experience" },
  { label: "Hours and location", href: "#hours" },
];

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "OpenTable", href: "#" },
];
