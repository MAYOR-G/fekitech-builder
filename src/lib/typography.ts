/** Typography pairing system for the visual editor */

export type TypographyPairing = {
  id: string;
  name: string;
  category: "Original" | "Library";
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

type PairOptions = Partial<Pick<TypographyPairing, "displayFont" | "headingFont" | "bodyFont" | "navFont" | "buttonFont" | "scale" | "headingWeight" | "bodyWeight" | "lineHeight" | "letterSpacing">>;

const SYSTEM_STACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const SERIF_STACK = "Georgia, 'Times New Roman', serif";

function idFromName(name: string) {
  return name.toLowerCase().replace(/—/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function googleFamily(font: string) {
  if (["System Fonts", SYSTEM_STACK, "Times New Roman", "Arial"].includes(font)) return "";
  return font.replace(/\s+/g, "+");
}

function googleImportFor(fonts: string[]) {
  const unique = Array.from(new Set(fonts.map(googleFamily).filter(Boolean)));
  return unique.map((font) => `${font}:wght@300;400;500;600;700;800`).join("&family=");
}

function pair(name: string, heading: string, body: string, options: PairOptions = {}): TypographyPairing {
  const headingWeight = options.headingWeight ?? (name.includes("Bold") ? 800 : name.includes("Light") ? 400 : 700);
  const bodyWeight = options.bodyWeight ?? 400;
  return {
    id: idFromName(name),
    name,
    category: "Library",
    displayFont: options.displayFont ?? heading,
    headingFont: options.headingFont ?? heading,
    bodyFont: options.bodyFont ?? body,
    navFont: options.navFont ?? body,
    buttonFont: options.buttonFont ?? body,
    scale: options.scale ?? 1.25,
    headingWeight,
    bodyWeight,
    lineHeight: options.lineHeight ?? 1.6,
    letterSpacing: options.letterSpacing ?? "0em",
    googleImport: googleImportFor([options.displayFont ?? heading, options.headingFont ?? heading, options.bodyFont ?? body, options.navFont ?? body, options.buttonFont ?? body]),
  };
}

export const ORIGINAL_TYPOGRAPHY: TypographyPairing = {
  id: "original",
  name: "Original typography",
  category: "Original",
  displayFont: "inherit",
  headingFont: "inherit",
  bodyFont: "inherit",
  navFont: "inherit",
  buttonFont: "inherit",
  scale: 1,
  headingWeight: 700,
  bodyWeight: 400,
  lineHeight: 1.6,
  letterSpacing: "0em",
  googleImport: "",
};

export const TYPOGRAPHY_PAIRINGS: TypographyPairing[] = [
  pair("Syne + Plus Jakarta Sans", "Syne", "Plus Jakarta Sans", { headingWeight: 700, letterSpacing: "-0.01em" }),
  pair("Cormorant + Open Sans", "Cormorant", "Open Sans", { headingWeight: 600, lineHeight: 1.65 }),
  pair("Archivo + Inter", "Archivo", "Inter", { headingWeight: 800, letterSpacing: "-0.01em" }),
  pair("Assistant + Assistant", "Assistant", "Assistant", { headingWeight: 700 }),
  pair("Cabin + IBM Plex Sans", "Cabin", "IBM Plex Sans", { headingWeight: 700 }),
  pair("Cormorant Garamond + Open Sans", "Cormorant Garamond", "Open Sans", { headingWeight: 600, lineHeight: 1.65 }),
  pair("Didact Gothic + Open Sans", "Didact Gothic", "Open Sans", { headingWeight: 400 }),
  pair("Dosis + Open Sans", "Dosis", "Open Sans", { headingWeight: 700 }),
  pair("IBM Plex Sans + IBM Plex Sans", "IBM Plex Sans", "IBM Plex Sans", { headingWeight: 700 }),
  pair("Jost + Jost", "Jost", "Jost", { headingWeight: 700 }),
  pair("Lato + Merriweather", "Lato", "Merriweather", { headingWeight: 800 }),
  pair("Libre Baskerville + Open Sans", "Libre Baskerville", "Open Sans", { headingWeight: 700, lineHeight: 1.7 }),
  pair("Montserrat + Lato", "Montserrat", "Lato", { headingWeight: 800, letterSpacing: "-0.01em" }),
  pair("Montserrat + Montserrat", "Montserrat", "Montserrat", { headingWeight: 700 }),
  pair("Montserrat + Montserrat - Bold", "Montserrat", "Montserrat", { headingWeight: 800, buttonFont: "Montserrat" }),
  pair("Montserrat + Montserrat - Light", "Montserrat", "Montserrat", { headingWeight: 400, bodyWeight: 300 }),
  pair("Montserrat + Poppins", "Montserrat", "Poppins", { headingWeight: 800 }),
  pair("Mukta + Mukta", "Mukta", "Mukta", { headingWeight: 700 }),
  pair("Mukta + Muli", "Mukta", "Muli", { headingWeight: 700 }),
  pair("Muli + Muli", "Muli", "Muli", { headingWeight: 700 }),
  pair("Muli + Muli - Bold", "Muli", "Muli", { headingWeight: 800 }),
  pair("Noto Sans + Noto Sans Assistant", "Noto Sans", "Noto Sans", { headingWeight: 700 }),
  pair("Nunito + Nunito", "Nunito", "Nunito", { headingWeight: 800 }),
  pair("Open Sans + Open Sans", "Open Sans", "Open Sans", { headingWeight: 700 }),
  pair("Oranienbaum + Raleway", "Oranienbaum", "Raleway", { headingWeight: 400, letterSpacing: "0.02em" }),
  pair("Oswald + Open Sans", "Oswald", "Open Sans", { headingWeight: 700, letterSpacing: "0.01em" }),
  pair("Oswald + PT Serif", "Oswald", "PT Serif", { headingWeight: 700 }),
  pair("Ovo + Lato", "Ovo", "Lato", { headingWeight: 400, lineHeight: 1.7 }),
  pair("Petit Formal Script + Quicksand", "Petit Formal Script", "Quicksand", { headingWeight: 400 }),
  pair("Playfair Display + Lato", "Playfair Display", "Lato", { headingWeight: 700, lineHeight: 1.65 }),
  pair("Playfair Display + Open Sans", "Playfair Display", "Open Sans", { headingWeight: 700, lineHeight: 1.65 }),
  pair("Playfair Display SC + IBM Plex Serif", "Playfair Display SC", "IBM Plex Serif", { headingWeight: 700, letterSpacing: "0.02em" }),
  pair("Poppins + Nunito", "Poppins", "Nunito", { headingWeight: 800 }),
  pair("Poppins + Open Sans", "Poppins", "Open Sans", { headingWeight: 800 }),
  pair("Poppins + Roboto", "Poppins", "Roboto", { headingWeight: 800 }),
  pair("Poppins + Source Sans Pro", "Poppins", "Source Sans Pro", { headingWeight: 800 }),
  pair("Roboto + Roboto", "Roboto", "Roboto", { headingWeight: 700 }),
  pair("Roboto Slab + Lato", "Roboto Slab", "Lato", { headingWeight: 700 }),
  pair("Roboto Slab + Montserrat", "Roboto Slab", "Montserrat", { headingWeight: 700 }),
  pair("Roboto Slab + PT Sans Caption", "Roboto Slab", "PT Sans Caption", { headingWeight: 700 }),
  pair("Rubik + Lato", "Rubik", "Lato", { headingWeight: 800 }),
  pair("Source Sans Pro + Source Sans Pro", "Source Sans Pro", "Source Sans Pro", { headingWeight: 700 }),
  pair("Source Serif 4 + Source Sans 3", "Source Serif 4", "Source Sans 3", { headingWeight: 700, lineHeight: 1.7 }),
  {
    ...pair("System Fonts", "System Fonts", "System Fonts", { displayFont: SYSTEM_STACK, headingFont: SYSTEM_STACK, bodyFont: SYSTEM_STACK, navFont: SYSTEM_STACK, buttonFont: SYSTEM_STACK }),
    googleImport: "",
  },
  {
    ...pair("Times New Roman + Arial", "Times New Roman", "Arial", { displayFont: SERIF_STACK, headingFont: SERIF_STACK, bodyFont: "Arial, sans-serif", navFont: "Arial, sans-serif", buttonFont: "Arial, sans-serif", lineHeight: 1.65 }),
    googleImport: "",
  },
  pair("Ubuntu + Open Sans", "Ubuntu", "Open Sans", { headingWeight: 700 }),
  pair("Unbounded + Inter", "Unbounded", "Inter", { headingWeight: 700, letterSpacing: "-0.02em" }),
];

export function getTypographyLibrary(): TypographyPairing[] {
  return TYPOGRAPHY_PAIRINGS;
}

export function getTypographyByCategory(): Map<string, TypographyPairing[]> {
  const map = new Map<string, TypographyPairing[]>();
  map.set("Original", [ORIGINAL_TYPOGRAPHY]);
  map.set("Library", TYPOGRAPHY_PAIRINGS);
  return map;
}

export function fontStack(font: string, fallback: "sans" | "serif" = "sans") {
  if (font === "inherit") return "inherit";
  if (font.includes(",") || font.startsWith("-apple-system")) return font;
  const family = font.includes(" ") ? `"${font}"` : font;
  return `${family}, ${fallback === "serif" ? "Georgia, serif" : "Arial, sans-serif"}`;
}

export function googleFontsHref(pairing: TypographyPairing | undefined): string | null {
  if (!pairing?.googleImport) return null;
  return `https://fonts.googleapis.com/css2?family=${pairing.googleImport}&display=swap`;
}

export function isTypographyPairing(value: unknown): value is TypographyPairing {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  const stringFields = ["id", "name", "category", "displayFont", "headingFont", "bodyFont", "navFont", "buttonFont", "letterSpacing", "googleImport"];
  return stringFields.every((field) => typeof record[field] === "string" && String(record[field]).length <= 180) &&
    typeof record.scale === "number" &&
    typeof record.headingWeight === "number" &&
    typeof record.bodyWeight === "number" &&
    typeof record.lineHeight === "number";
}
