/** Typography pairing system for the visual editor */

export type TypographyPairing = {
  id: string;
  name: string;
  category: string;
  displayFont: string;
  headingFont: string;
  bodyFont: string;
  navFont: string;
  buttonFont: string;
  scale: number;
  headingWeight: number;
  bodyWeight: number;
  lineHeight: number;
  letterSpacing: string;
  googleImport: string;
};

export const TYPOGRAPHY_PAIRINGS: TypographyPairing[] = [
  {
    id: "modern-saas", name: "Modern SaaS", category: "Technology",
    displayFont: "Inter", headingFont: "Inter", bodyFont: "Inter", navFont: "Inter", buttonFont: "Inter",
    scale: 1.25, headingWeight: 700, bodyWeight: 400, lineHeight: 1.6, letterSpacing: "-0.02em",
    googleImport: "Inter:wght@400;500;600;700",
  },
  {
    id: "editorial", name: "Premium Editorial", category: "Publishing",
    displayFont: "Playfair Display", headingFont: "Playfair Display", bodyFont: "Source Sans 3", navFont: "Source Sans 3", buttonFont: "Source Sans 3",
    scale: 1.333, headingWeight: 700, bodyWeight: 400, lineHeight: 1.7, letterSpacing: "0em",
    googleImport: "Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600",
  },
  {
    id: "restaurant", name: "Restaurant", category: "Food & Hospitality",
    displayFont: "Cormorant Garamond", headingFont: "Cormorant Garamond", bodyFont: "Lato", navFont: "Lato", buttonFont: "Lato",
    scale: 1.333, headingWeight: 600, bodyWeight: 400, lineHeight: 1.6, letterSpacing: "0.02em",
    googleImport: "Cormorant+Garamond:wght@400;600;700&family=Lato:wght@400;700",
  },
  {
    id: "creative-studio", name: "Creative Studio", category: "Creative",
    displayFont: "Space Grotesk", headingFont: "Space Grotesk", bodyFont: "DM Sans", navFont: "DM Sans", buttonFont: "Space Grotesk",
    scale: 1.25, headingWeight: 700, bodyWeight: 400, lineHeight: 1.5, letterSpacing: "-0.01em",
    googleImport: "Space+Grotesk:wght@400;500;700&family=DM+Sans:wght@400;500",
  },
  {
    id: "trades", name: "Trades & Construction", category: "Construction & Trades",
    displayFont: "Oswald", headingFont: "Oswald", bodyFont: "Open Sans", navFont: "Open Sans", buttonFont: "Oswald",
    scale: 1.25, headingWeight: 600, bodyWeight: 400, lineHeight: 1.6, letterSpacing: "0em",
    googleImport: "Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;600",
  },
  {
    id: "professional", name: "Professional Services", category: "Corporate",
    displayFont: "Outfit", headingFont: "Outfit", bodyFont: "Outfit", navFont: "Outfit", buttonFont: "Outfit",
    scale: 1.2, headingWeight: 600, bodyWeight: 400, lineHeight: 1.65, letterSpacing: "-0.01em",
    googleImport: "Outfit:wght@300;400;500;600;700",
  },
  {
    id: "luxury", name: "Luxury", category: "Luxury",
    displayFont: "Cormorant", headingFont: "Cormorant", bodyFont: "Montserrat", navFont: "Montserrat", buttonFont: "Montserrat",
    scale: 1.414, headingWeight: 500, bodyWeight: 400, lineHeight: 1.7, letterSpacing: "0.05em",
    googleImport: "Cormorant:wght@400;500;600&family=Montserrat:wght@400;500;600",
  },
  {
    id: "friendly", name: "Friendly Small Business", category: "General",
    displayFont: "Nunito", headingFont: "Nunito", bodyFont: "Nunito Sans", navFont: "Nunito Sans", buttonFont: "Nunito",
    scale: 1.2, headingWeight: 700, bodyWeight: 400, lineHeight: 1.65, letterSpacing: "0em",
    googleImport: "Nunito:wght@400;600;700&family=Nunito+Sans:wght@400;600",
  },
  {
    id: "bold-display", name: "Bold Display", category: "Creative",
    displayFont: "Plus Jakarta Sans", headingFont: "Plus Jakarta Sans", bodyFont: "Plus Jakarta Sans", navFont: "Plus Jakarta Sans", buttonFont: "Plus Jakarta Sans",
    scale: 1.333, headingWeight: 800, bodyWeight: 400, lineHeight: 1.4, letterSpacing: "-0.03em",
    googleImport: "Plus+Jakarta+Sans:wght@400;500;600;700;800",
  },
  {
    id: "minimal-corp", name: "Minimal Corporate", category: "Corporate",
    displayFont: "Roboto", headingFont: "Roboto", bodyFont: "Roboto", navFont: "Roboto", buttonFont: "Roboto",
    scale: 1.2, headingWeight: 500, bodyWeight: 400, lineHeight: 1.6, letterSpacing: "0em",
    googleImport: "Roboto:wght@300;400;500;700",
  },
  {
    id: "health-wellness", name: "Health & Wellness", category: "Health & Wellness",
    displayFont: "Tenor Sans", headingFont: "Tenor Sans", bodyFont: "Work Sans", navFont: "Work Sans", buttonFont: "Work Sans",
    scale: 1.25, headingWeight: 400, bodyWeight: 400, lineHeight: 1.7, letterSpacing: "0.03em",
    googleImport: "Tenor+Sans&family=Work+Sans:wght@400;500;600",
  },
  {
    id: "beauty", name: "Beauty & Fashion", category: "Beauty & Fashion",
    displayFont: "Bodoni Moda", headingFont: "Bodoni Moda", bodyFont: "Poppins", navFont: "Poppins", buttonFont: "Poppins",
    scale: 1.333, headingWeight: 600, bodyWeight: 400, lineHeight: 1.6, letterSpacing: "0.01em",
    googleImport: "Bodoni+Moda:wght@400;600;700&family=Poppins:wght@400;500;600",
  },
  {
    id: "techno", name: "Tech Mono", category: "Technology",
    displayFont: "JetBrains Mono", headingFont: "Sora", bodyFont: "Sora", navFont: "Sora", buttonFont: "JetBrains Mono",
    scale: 1.2, headingWeight: 600, bodyWeight: 400, lineHeight: 1.6, letterSpacing: "-0.01em",
    googleImport: "JetBrains+Mono:wght@400;500;700&family=Sora:wght@400;500;600",
  },
  {
    id: "warm-artisan", name: "Warm Artisan", category: "Food & Hospitality",
    displayFont: "Fraunces", headingFont: "Fraunces", bodyFont: "Commissioner", navFont: "Commissioner", buttonFont: "Commissioner",
    scale: 1.333, headingWeight: 600, bodyWeight: 400, lineHeight: 1.65, letterSpacing: "0em",
    googleImport: "Fraunces:wght@400;600;700&family=Commissioner:wght@400;500;600",
  },
  {
    id: "geometric", name: "Geometric Modern", category: "Creative",
    displayFont: "Manrope", headingFont: "Manrope", bodyFont: "Manrope", navFont: "Manrope", buttonFont: "Manrope",
    scale: 1.25, headingWeight: 700, bodyWeight: 400, lineHeight: 1.5, letterSpacing: "-0.02em",
    googleImport: "Manrope:wght@400;500;600;700;800",
  },
];

export function getTypographyByCategory(): Map<string, TypographyPairing[]> {
  const map = new Map<string, TypographyPairing[]>();
  for (const pairing of TYPOGRAPHY_PAIRINGS) {
    const list = map.get(pairing.category) ?? [];
    list.push(pairing);
    map.set(pairing.category, list);
  }
  return map;
}
