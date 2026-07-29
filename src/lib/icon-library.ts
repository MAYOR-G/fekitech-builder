export type EditorIcon = {
  name: string;
  category: "Business" | "Contact" | "Social" | "Navigation" | "Food" | "Health" | "Construction" | "Home services" | "Shopping" | "Media" | "Location" | "Arrows" | "Interface";
  paths: string[];
};

export const EDITOR_ICONS: EditorIcon[] = [
  { name: "Briefcase", category: "Business", paths: ["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 8h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"] },
  { name: "Handshake", category: "Business", paths: ["m11 17 2 2a2.8 2.8 0 0 0 4-4", "m7 11 4-4 3 3 4-4", "M2 12h5l3 3", "M22 12h-5l-3 3"] },
  { name: "Phone", category: "Contact", paths: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8 9.69a16 16 0 0 0 6.31 6.31l1.25-1.25a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92Z"] },
  { name: "Mail", category: "Contact", paths: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z", "m22 6-10 7L2 6"] },
  { name: "Instagram", category: "Social", paths: ["M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z", "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z", "M17.5 6.5h.01"] },
  { name: "Facebook", category: "Social", paths: ["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"] },
  { name: "Menu", category: "Navigation", paths: ["M4 12h16", "M4 6h16", "M4 18h16"] },
  { name: "Home", category: "Navigation", paths: ["m3 10 9-8 9 8", "v10a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2Z"] },
  { name: "Utensils", category: "Food", paths: ["M3 2v7a4 4 0 0 0 4 4v9", "M7 2v20", "M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2Z"] },
  { name: "Cake", category: "Food", paths: ["M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8", "M4 16h16", "M2 21h20", "M7 8v3", "M12 8v3", "M17 8v3"] },
  { name: "HeartPulse", category: "Health", paths: ["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z", "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"] },
  { name: "Stethoscope", category: "Health", paths: ["M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3", "M8 15a6 6 0 0 0 12 0v-3", "M20 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4"] },
  { name: "Hammer", category: "Construction", paths: ["m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9", "m17.64 15 4.34-4.34", "m20.49 7.8-1.94 1.94a2 2 0 0 1-2.83 0l-1.45-1.45a2 2 0 0 1 0-2.83l1.94-1.94Z"] },
  { name: "Wrench", category: "Home services", paths: ["M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.8 2.8-2-2 2.8-2.8Z"] },
  { name: "ShoppingBag", category: "Shopping", paths: ["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"] },
  { name: "Image", category: "Media", paths: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m21 15-5-5L5 21", "M14 8h.01"] },
  { name: "MapPin", category: "Location", paths: ["M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z", "M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"] },
  { name: "Map", category: "Location", paths: ["M14.5 4.5 9.5 2 3 5.5v16l6.5-3.5 5 2.5 6.5-3.5v-16Z", "M9.5 2v16", "M14.5 4.5v16"] },
  { name: "ArrowRight", category: "Arrows", paths: ["M5 12h14", "m12 5 7 7-7 7"] },
  { name: "ChevronRight", category: "Arrows", paths: ["m9 18 6-6-6-6"] },
  { name: "Check", category: "Interface", paths: ["M20 6 9 17l-5-5"] },
  { name: "Star", category: "Interface", paths: ["m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01Z"] },
];

export function iconSvg(name: string) {
  const icon = EDITOR_ICONS.find((entry) => entry.name === name);
  if (!icon) return "";
  const paths = icon.paths.map((path) => `<path d="${path}"></path>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}
