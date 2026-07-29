/** Semantic color palette system for the visual editor */

export type PaletteTokens = {
  pageBackground: string;
  sectionAlt: string;
  cardBackground: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  background: string;
  surface: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  secondary: string;
  accent: string;
  accentSecondary: string;
  buttonBg: string;
  buttonText: string;
  secondaryButtonBg: string;
  secondaryButtonBorder: string;
  secondaryButtonText: string;
  link: string;
  border: string;
  icon: string;
  formBackground: string;
  formText: string;
  formPlaceholder: string;
  formBorder: string;
  headerBg: string;
  headerText: string;
  footerBg: string;
  footerText: string;
  footerMuted: string;
  success: string;
  warning: string;
  error: string;
};

export type Palette = {
  id: string;
  name: string;
  group: string;
  tokens: PaletteTokens;
};

export const PALETTE_GROUPS = [
  "Light Neutral",
  "Dark Premium",
  "Corporate",
  "Creative",
  "Warm",
  "Natural",
  "Food & Hospitality",
  "Construction & Trades",
  "Health & Wellness",
  "Beauty & Fashion",
  "Technology",
  "Luxury",
  "High Contrast",
  "Pastel",
] as const;

type BasePaletteTokens = Pick<
  PaletteTokens,
  "background" | "surface" | "card" | "textPrimary" | "textSecondary" | "accent" | "accentSecondary" | "buttonBg" | "buttonText" | "border"
> & Partial<PaletteTokens>;

function completeTokens(tokens: BasePaletteTokens): PaletteTokens {
  return {
    pageBackground: tokens.pageBackground ?? tokens.background,
    sectionAlt: tokens.sectionAlt ?? tokens.surface,
    cardBackground: tokens.cardBackground ?? tokens.card,
    headingText: tokens.headingText ?? tokens.textPrimary,
    bodyText: tokens.bodyText ?? tokens.textPrimary,
    mutedText: tokens.mutedText ?? tokens.textSecondary,
    primary: tokens.primary ?? tokens.accent,
    secondary: tokens.secondary ?? tokens.accentSecondary,
    secondaryButtonBg: tokens.secondaryButtonBg ?? tokens.card,
    secondaryButtonBorder: tokens.secondaryButtonBorder ?? tokens.border,
    secondaryButtonText: tokens.secondaryButtonText ?? tokens.accent,
    link: tokens.link ?? tokens.accent,
    icon: tokens.icon ?? tokens.accent,
    formBackground: tokens.formBackground ?? tokens.card,
    formText: tokens.formText ?? tokens.textPrimary,
    formPlaceholder: tokens.formPlaceholder ?? tokens.textSecondary,
    formBorder: tokens.formBorder ?? tokens.border,
    headerBg: tokens.headerBg ?? tokens.background,
    headerText: tokens.headerText ?? tokens.textPrimary,
    footerBg: tokens.footerBg ?? tokens.textPrimary,
    footerText: tokens.footerText ?? tokens.buttonText,
    footerMuted: tokens.footerMuted ?? tokens.textSecondary,
    success: tokens.success ?? "#16A34A",
    warning: tokens.warning ?? "#D97706",
    error: tokens.error ?? "#DC2626",
    ...tokens,
  };
}

function p(id: string, name: string, group: string, tokens: BasePaletteTokens): Palette {
  return { id, name, group, tokens: completeTokens(tokens) };
}

export const PALETTES: Palette[] = [
  // ── Light Neutral ──
  p("ln-1","Snow White","Light Neutral",{background:"#FFFFFF",surface:"#F8F9FA",card:"#FFFFFF",textPrimary:"#1A1A2E",textSecondary:"#6B7280",accent:"#3B82F6",accentSecondary:"#60A5FA",buttonBg:"#3B82F6",buttonText:"#FFFFFF",border:"#E5E7EB"}),
  p("ln-2","Warm Ivory","Light Neutral",{background:"#FFFDF7",surface:"#FAF7F2",card:"#FFFFFF",textPrimary:"#2D2A26",textSecondary:"#78716C",accent:"#D97706",accentSecondary:"#F59E0B",buttonBg:"#D97706",buttonText:"#FFFFFF",border:"#E7E5E4"}),
  p("ln-3","Cool Mist","Light Neutral",{background:"#F8FAFC",surface:"#F1F5F9",card:"#FFFFFF",textPrimary:"#0F172A",textSecondary:"#64748B",accent:"#6366F1",accentSecondary:"#818CF8",buttonBg:"#6366F1",buttonText:"#FFFFFF",border:"#E2E8F0"}),
  p("ln-4","Pearl","Light Neutral",{background:"#FAFAFA",surface:"#F5F5F5",card:"#FFFFFF",textPrimary:"#171717",textSecondary:"#737373",accent:"#0EA5E9",accentSecondary:"#38BDF8",buttonBg:"#0EA5E9",buttonText:"#FFFFFF",border:"#E5E5E5"}),
  p("ln-5","Almond Cream","Light Neutral",{background:"#FFFCF5",surface:"#FEF7EC",card:"#FFFFFF",textPrimary:"#292524",textSecondary:"#A8A29E",accent:"#EA580C",accentSecondary:"#FB923C",buttonBg:"#EA580C",buttonText:"#FFFFFF",border:"#E7E5E4"}),

  // ── Dark Premium ──
  p("dp-1","Midnight","Dark Premium",{background:"#0A0A0F",surface:"#111118",card:"#1A1A24",textPrimary:"#F1F1F4",textSecondary:"#9CA3AF",accent:"#818CF8",accentSecondary:"#6366F1",buttonBg:"#818CF8",buttonText:"#0A0A0F",border:"#27272A"}),
  p("dp-2","Charcoal","Dark Premium",{background:"#111111",surface:"#1A1A1A",card:"#222222",textPrimary:"#EEEEEE",textSecondary:"#999999",accent:"#F97316",accentSecondary:"#FB923C",buttonBg:"#F97316",buttonText:"#111111",border:"#333333"}),
  p("dp-3","Deep Ocean","Dark Premium",{background:"#0C1222",surface:"#111827",card:"#1E293B",textPrimary:"#F1F5F9",textSecondary:"#94A3B8",accent:"#38BDF8",accentSecondary:"#0EA5E9",buttonBg:"#38BDF8",buttonText:"#0C1222",border:"#334155"}),
  p("dp-4","Obsidian","Dark Premium",{background:"#09090B",surface:"#18181B",card:"#27272A",textPrimary:"#FAFAFA",textSecondary:"#A1A1AA",accent:"#A78BFA",accentSecondary:"#8B5CF6",buttonBg:"#A78BFA",buttonText:"#09090B",border:"#3F3F46"}),
  p("dp-5","Noir Gold","Dark Premium",{background:"#0D0D0D",surface:"#171717",card:"#1F1F1F",textPrimary:"#F5F5F5",textSecondary:"#A3A3A3",accent:"#EAB308",accentSecondary:"#FACC15",buttonBg:"#EAB308",buttonText:"#0D0D0D",border:"#2E2E2E"}),

  // ── Corporate ──
  p("co-1","Executive Blue","Corporate",{background:"#FFFFFF",surface:"#F0F4F8",card:"#FFFFFF",textPrimary:"#1E293B",textSecondary:"#475569",accent:"#1D4ED8",accentSecondary:"#3B82F6",buttonBg:"#1D4ED8",buttonText:"#FFFFFF",border:"#CBD5E1"}),
  p("co-2","Slate Pro","Corporate",{background:"#FAFBFC",surface:"#F1F3F5",card:"#FFFFFF",textPrimary:"#212529",textSecondary:"#6C757D",accent:"#0D6EFD",accentSecondary:"#6610F2",buttonBg:"#0D6EFD",buttonText:"#FFFFFF",border:"#DEE2E6"}),
  p("co-3","Teal Corporate","Corporate",{background:"#FFFFFF",surface:"#F0FDFA",card:"#FFFFFF",textPrimary:"#134E4A",textSecondary:"#5F8A87",accent:"#0D9488",accentSecondary:"#14B8A6",buttonBg:"#0D9488",buttonText:"#FFFFFF",border:"#CCFBF1"}),
  p("co-4","Navy Edge","Corporate",{background:"#FFFFFF",surface:"#EFF6FF",card:"#FFFFFF",textPrimary:"#1E3A5F",textSecondary:"#64748B",accent:"#2563EB",accentSecondary:"#3B82F6",buttonBg:"#1E3A5F",buttonText:"#FFFFFF",border:"#BFDBFE"}),
  p("co-5","Graphite","Corporate",{background:"#FAFAFA",surface:"#F4F4F5",card:"#FFFFFF",textPrimary:"#27272A",textSecondary:"#71717A",accent:"#18181B",accentSecondary:"#3F3F46",buttonBg:"#18181B",buttonText:"#FFFFFF",border:"#D4D4D8"}),

  // ── Creative ──
  p("cr-1","Electric Violet","Creative",{background:"#FAFAFE",surface:"#F3F0FF",card:"#FFFFFF",textPrimary:"#1E1B4B",textSecondary:"#6B7280",accent:"#7C3AED",accentSecondary:"#A78BFA",buttonBg:"#7C3AED",buttonText:"#FFFFFF",border:"#DDD6FE"}),
  p("cr-2","Coral Pop","Creative",{background:"#FFFBF5",surface:"#FFF1E6",card:"#FFFFFF",textPrimary:"#1C1917",textSecondary:"#78716C",accent:"#F43F5E",accentSecondary:"#FB7185",buttonBg:"#F43F5E",buttonText:"#FFFFFF",border:"#FECDD3"}),
  p("cr-3","Neon Mint","Creative",{background:"#F0FDF9",surface:"#ECFDF5",card:"#FFFFFF",textPrimary:"#064E3B",textSecondary:"#6B7280",accent:"#10B981",accentSecondary:"#34D399",buttonBg:"#10B981",buttonText:"#FFFFFF",border:"#A7F3D0"}),
  p("cr-4","Sunset Gradient","Creative",{background:"#FFFBEB",surface:"#FEF3C7",card:"#FFFFFF",textPrimary:"#1C1917",textSecondary:"#78716C",accent:"#E11D48",accentSecondary:"#F97316",buttonBg:"#E11D48",buttonText:"#FFFFFF",border:"#FDE68A"}),
  p("cr-5","Cosmic Dark","Creative",{background:"#0F0720",surface:"#1A103A",card:"#241854",textPrimary:"#EDE9FE",textSecondary:"#A78BFA",accent:"#C084FC",accentSecondary:"#E879F9",buttonBg:"#C084FC",buttonText:"#0F0720",border:"#3B2878"}),

  // ── Warm ──
  p("wa-1","Terracotta","Warm",{background:"#FFFBF5",surface:"#FEF5EC",card:"#FFFFFF",textPrimary:"#3B1F0B",textSecondary:"#92400E",accent:"#C2410C",accentSecondary:"#EA580C",buttonBg:"#C2410C",buttonText:"#FFFFFF",border:"#FED7AA"}),
  p("wa-2","Honey","Warm",{background:"#FFFDF5",surface:"#FEF9E7",card:"#FFFFFF",textPrimary:"#422006",textSecondary:"#854D0E",accent:"#CA8A04",accentSecondary:"#EAB308",buttonBg:"#CA8A04",buttonText:"#FFFFFF",border:"#FDE68A"}),
  p("wa-3","Brick","Warm",{background:"#FFF5F5",surface:"#FEE2E2",card:"#FFFFFF",textPrimary:"#450A0A",textSecondary:"#991B1B",accent:"#DC2626",accentSecondary:"#EF4444",buttonBg:"#DC2626",buttonText:"#FFFFFF",border:"#FECACA"}),
  p("wa-4","Amber Glow","Warm",{background:"#FFFBEB",surface:"#FEF3C7",card:"#FFFFFF",textPrimary:"#451A03",textSecondary:"#92400E",accent:"#D97706",accentSecondary:"#F59E0B",buttonBg:"#D97706",buttonText:"#FFFFFF",border:"#FDE68A"}),
  p("wa-5","Burnt Sienna","Warm",{background:"#FAF5F0",surface:"#F5EDE4",card:"#FFFFFF",textPrimary:"#3E2723",textSecondary:"#795548",accent:"#BF360C",accentSecondary:"#E64A19",buttonBg:"#BF360C",buttonText:"#FFFFFF",border:"#D7CCC8"}),

  // ── Natural ──
  p("na-1","Forest","Natural",{background:"#F6FAF6",surface:"#ECFDF5",card:"#FFFFFF",textPrimary:"#14532D",textSecondary:"#4B7A5E",accent:"#16A34A",accentSecondary:"#22C55E",buttonBg:"#16A34A",buttonText:"#FFFFFF",border:"#BBF7D0"}),
  p("na-2","Stone","Natural",{background:"#FAF9F6",surface:"#F5F3EE",card:"#FFFFFF",textPrimary:"#3C3836",textSecondary:"#7C7872",accent:"#78716C",accentSecondary:"#A8A29E",buttonBg:"#57534E",buttonText:"#FFFFFF",border:"#D6D3D1"}),
  p("na-3","Ocean Breeze","Natural",{background:"#F0F9FF",surface:"#E0F2FE",card:"#FFFFFF",textPrimary:"#0C4A6E",textSecondary:"#0369A1",accent:"#0284C7",accentSecondary:"#38BDF8",buttonBg:"#0284C7",buttonText:"#FFFFFF",border:"#BAE6FD"}),
  p("na-4","Sage","Natural",{background:"#F8FAF5",surface:"#EFF3E8",card:"#FFFFFF",textPrimary:"#1E3A1E",textSecondary:"#6B8E6B",accent:"#4D7C4D",accentSecondary:"#6B9E6B",buttonBg:"#4D7C4D",buttonText:"#FFFFFF",border:"#C7DBC7"}),
  p("na-5","Sand Dune","Natural",{background:"#FDFAF5",surface:"#F7F0E6",card:"#FFFFFF",textPrimary:"#3E3527",textSecondary:"#8B7D6B",accent:"#A67B5B",accentSecondary:"#C4956A",buttonBg:"#A67B5B",buttonText:"#FFFFFF",border:"#DDD3C4"}),

  // ── Food & Hospitality ──
  p("fh-1","Bistro Red","Food & Hospitality",{background:"#FFFAF5",surface:"#FFF1E6",card:"#FFFFFF",textPrimary:"#2D1810",textSecondary:"#7C5A4A",accent:"#C92A2A",accentSecondary:"#E03131",buttonBg:"#C92A2A",buttonText:"#FFFFFF",border:"#F5D5C8"}),
  p("fh-2","Fresh Green","Food & Hospitality",{background:"#F0FFF4",surface:"#E6FFED",card:"#FFFFFF",textPrimary:"#1A3C1A",textSecondary:"#4A784A",accent:"#2F9E44",accentSecondary:"#40C057",buttonBg:"#2F9E44",buttonText:"#FFFFFF",border:"#B2F2BB"}),
  p("fh-3","Coffee House","Food & Hospitality",{background:"#FAF6F1",surface:"#F0E8DD",card:"#FFFFFF",textPrimary:"#3E2723",textSecondary:"#6D4C41",accent:"#5D4037",accentSecondary:"#795548",buttonBg:"#5D4037",buttonText:"#FFFFFF",border:"#D7CCC8"}),
  p("fh-4","Citrus","Food & Hospitality",{background:"#FFFDF0",surface:"#FFFCE0",card:"#FFFFFF",textPrimary:"#1A1A00",textSecondary:"#666600",accent:"#F59E0B",accentSecondary:"#FBBF24",buttonBg:"#D97706",buttonText:"#FFFFFF",border:"#FDE68A"}),
  p("fh-5","Seafood Blue","Food & Hospitality",{background:"#F5FAFE",surface:"#E1F0FA",card:"#FFFFFF",textPrimary:"#0C3547",textSecondary:"#3D7A9E",accent:"#1A7FAA",accentSecondary:"#2CA1D4",buttonBg:"#1A7FAA",buttonText:"#FFFFFF",border:"#B3D9EC"}),

  // ── Construction & Trades ──
  p("ct-1","Safety Orange","Construction & Trades",{background:"#FAFAFA",surface:"#F5F5F5",card:"#FFFFFF",textPrimary:"#1C1C1E",textSecondary:"#636366",accent:"#EA580C",accentSecondary:"#F97316",buttonBg:"#EA580C",buttonText:"#FFFFFF",border:"#D1D5DB"}),
  p("ct-2","Steel Blue","Construction & Trades",{background:"#F8FAFC",surface:"#F1F5F9",card:"#FFFFFF",textPrimary:"#1E293B",textSecondary:"#64748B",accent:"#2563EB",accentSecondary:"#3B82F6",buttonBg:"#1E293B",buttonText:"#FFFFFF",border:"#CBD5E1"}),
  p("ct-3","Concrete","Construction & Trades",{background:"#F4F4F5",surface:"#E4E4E7",card:"#FFFFFF",textPrimary:"#18181B",textSecondary:"#52525B",accent:"#EAB308",accentSecondary:"#FACC15",buttonBg:"#18181B",buttonText:"#FACC15",border:"#A1A1AA"}),
  p("ct-4","Hardhat","Construction & Trades",{background:"#1A1A1A",surface:"#262626",card:"#2E2E2E",textPrimary:"#F5F5F5",textSecondary:"#A3A3A3",accent:"#FBBF24",accentSecondary:"#F59E0B",buttonBg:"#FBBF24",buttonText:"#1A1A1A",border:"#404040"}),

  // ── Health & Wellness ──
  p("hw-1","Medical Clean","Health & Wellness",{background:"#FFFFFF",surface:"#F0F9FF",card:"#FFFFFF",textPrimary:"#1E3A5F",textSecondary:"#64748B",accent:"#0891B2",accentSecondary:"#22D3EE",buttonBg:"#0891B2",buttonText:"#FFFFFF",border:"#BAE6FD"}),
  p("hw-2","Spa Zen","Health & Wellness",{background:"#FEFCF3",surface:"#F5F0E6",card:"#FFFFFF",textPrimary:"#3C3427",textSecondary:"#8B7D6B",accent:"#7C9A6E",accentSecondary:"#94B386",buttonBg:"#7C9A6E",buttonText:"#FFFFFF",border:"#D6CFC0"}),
  p("hw-3","Vitality","Health & Wellness",{background:"#FAFFFA",surface:"#ECFDF5",card:"#FFFFFF",textPrimary:"#14532D",textSecondary:"#4D7C5E",accent:"#059669",accentSecondary:"#10B981",buttonBg:"#059669",buttonText:"#FFFFFF",border:"#A7F3D0"}),
  p("hw-4","Calm Blue","Health & Wellness",{background:"#F0F5FF",surface:"#E0ECFF",card:"#FFFFFF",textPrimary:"#1E3A5F",textSecondary:"#5478A0",accent:"#3B82F6",accentSecondary:"#60A5FA",buttonBg:"#3B82F6",buttonText:"#FFFFFF",border:"#BFDBFE"}),

  // ── Beauty & Fashion ──
  p("bf-1","Blush","Beauty & Fashion",{background:"#FFF5F7",surface:"#FFE4E9",card:"#FFFFFF",textPrimary:"#2D1F24",textSecondary:"#8B6B74",accent:"#E11D48",accentSecondary:"#FB7185",buttonBg:"#E11D48",buttonText:"#FFFFFF",border:"#FECDD3"}),
  p("bf-2","Noir Elegance","Beauty & Fashion",{background:"#0A0A0A",surface:"#171717",card:"#1F1F1F",textPrimary:"#F5F5F5",textSecondary:"#A3A3A3",accent:"#F5F5F5",accentSecondary:"#D4D4D4",buttonBg:"#F5F5F5",buttonText:"#0A0A0A",border:"#2E2E2E"}),
  p("bf-3","Rose Gold","Beauty & Fashion",{background:"#FFF9F5",surface:"#FFF0E8",card:"#FFFFFF",textPrimary:"#2D1F1A",textSecondary:"#8B6B5C",accent:"#B76E79",accentSecondary:"#D4919A",buttonBg:"#B76E79",buttonText:"#FFFFFF",border:"#F5D5CC"}),
  p("bf-4","Lilac","Beauty & Fashion",{background:"#FAF5FF",surface:"#F3E8FF",card:"#FFFFFF",textPrimary:"#2E1065",textSecondary:"#7C3AED",accent:"#8B5CF6",accentSecondary:"#A78BFA",buttonBg:"#8B5CF6",buttonText:"#FFFFFF",border:"#DDD6FE"}),

  // ── Technology ──
  p("te-1","Dev Dark","Technology",{background:"#0D1117",surface:"#161B22",card:"#21262D",textPrimary:"#E6EDF3",textSecondary:"#8B949E",accent:"#58A6FF",accentSecondary:"#79C0FF",buttonBg:"#238636",buttonText:"#FFFFFF",border:"#30363D"}),
  p("te-2","Electric","Technology",{background:"#0A0E1A",surface:"#111827",card:"#1F2937",textPrimary:"#F9FAFB",textSecondary:"#9CA3AF",accent:"#06B6D4",accentSecondary:"#22D3EE",buttonBg:"#06B6D4",buttonText:"#0A0E1A",border:"#374151"}),
  p("te-3","Clean Tech","Technology",{background:"#FFFFFF",surface:"#F9FAFB",card:"#FFFFFF",textPrimary:"#111827",textSecondary:"#6B7280",accent:"#6366F1",accentSecondary:"#818CF8",buttonBg:"#4F46E5",buttonText:"#FFFFFF",border:"#E5E7EB"}),
  p("te-4","Matrix","Technology",{background:"#0A0F0A",surface:"#0D140D",card:"#111C11",textPrimary:"#22C55E",textSecondary:"#15803D",accent:"#4ADE80",accentSecondary:"#86EFAC",buttonBg:"#22C55E",buttonText:"#0A0F0A",border:"#1A2F1A"}),

  // ── Luxury ──
  p("lu-1","Black Gold","Luxury",{background:"#0C0C0C",surface:"#161616",card:"#1E1E1E",textPrimary:"#F0E6D2",textSecondary:"#B8A88A",accent:"#C5A55A",accentSecondary:"#D4B96A",buttonBg:"#C5A55A",buttonText:"#0C0C0C",border:"#2A2A2A"}),
  p("lu-2","Marble White","Luxury",{background:"#FFFFFF",surface:"#F8F6F3",card:"#FFFFFF",textPrimary:"#1A1A1A",textSecondary:"#666666",accent:"#1A1A1A",accentSecondary:"#333333",buttonBg:"#1A1A1A",buttonText:"#FFFFFF",border:"#E8E4DF"}),
  p("lu-3","Royal Purple","Luxury",{background:"#0D0015",surface:"#170025",card:"#1E0033",textPrimary:"#F0E6FF",textSecondary:"#B8A3D4",accent:"#9333EA",accentSecondary:"#A855F7",buttonBg:"#9333EA",buttonText:"#FFFFFF",border:"#2E0050"}),
  p("lu-4","Champagne","Luxury",{background:"#FAF7F2",surface:"#F5EFE4",card:"#FFFFFF",textPrimary:"#2C2418",textSecondary:"#7A6E5E",accent:"#B8860B",accentSecondary:"#DAA520",buttonBg:"#B8860B",buttonText:"#FFFFFF",border:"#E0D6C4"}),

  // ── High Contrast ──
  p("hc-1","Black & White","High Contrast",{background:"#FFFFFF",surface:"#F5F5F5",card:"#FFFFFF",textPrimary:"#000000",textSecondary:"#333333",accent:"#000000",accentSecondary:"#333333",buttonBg:"#000000",buttonText:"#FFFFFF",border:"#000000"}),
  p("hc-2","White on Black","High Contrast",{background:"#000000",surface:"#111111",card:"#1A1A1A",textPrimary:"#FFFFFF",textSecondary:"#CCCCCC",accent:"#FFFFFF",accentSecondary:"#DDDDDD",buttonBg:"#FFFFFF",buttonText:"#000000",border:"#333333"}),
  p("hc-3","Blue & Yellow","High Contrast",{background:"#003366",surface:"#004080",card:"#004D99",textPrimary:"#FFFFFF",textSecondary:"#CCE0FF",accent:"#FFD700",accentSecondary:"#FFE44D",buttonBg:"#FFD700",buttonText:"#003366",border:"#336699"}),
  p("hc-4","Red Alert","High Contrast",{background:"#FFFFFF",surface:"#FFF5F5",card:"#FFFFFF",textPrimary:"#1A1A1A",textSecondary:"#4A4A4A",accent:"#DC2626",accentSecondary:"#EF4444",buttonBg:"#DC2626",buttonText:"#FFFFFF",border:"#FECACA"}),

  // ── Pastel ──
  p("pa-1","Soft Lavender","Pastel",{background:"#F5F3FF",surface:"#EDE9FE",card:"#FFFFFF",textPrimary:"#3B2E6E",textSecondary:"#7C6FA0",accent:"#8B5CF6",accentSecondary:"#A78BFA",buttonBg:"#8B5CF6",buttonText:"#FFFFFF",border:"#DDD6FE"}),
  p("pa-2","Peach Dream","Pastel",{background:"#FFF5EE",surface:"#FFE8D6",card:"#FFFFFF",textPrimary:"#4A2C1A",textSecondary:"#8B6B54",accent:"#F97316",accentSecondary:"#FB923C",buttonBg:"#EA580C",buttonText:"#FFFFFF",border:"#FECBA1"}),
  p("pa-3","Mint Cream","Pastel",{background:"#ECFDF5",surface:"#D1FAE5",card:"#FFFFFF",textPrimary:"#14532D",textSecondary:"#4D7C5E",accent:"#10B981",accentSecondary:"#34D399",buttonBg:"#059669",buttonText:"#FFFFFF",border:"#A7F3D0"}),
  p("pa-4","Baby Blue","Pastel",{background:"#EFF6FF",surface:"#DBEAFE",card:"#FFFFFF",textPrimary:"#1E3A5F",textSecondary:"#5478A0",accent:"#3B82F6",accentSecondary:"#60A5FA",buttonBg:"#2563EB",buttonText:"#FFFFFF",border:"#93C5FD"}),
  p("pa-5","Cotton Candy","Pastel",{background:"#FDF2F8",surface:"#FCE7F3",card:"#FFFFFF",textPrimary:"#4A1942",textSecondary:"#8B5C84",accent:"#EC4899",accentSecondary:"#F472B6",buttonBg:"#DB2777",buttonText:"#FFFFFF",border:"#F9A8D4"}),
];

/** Map palette tokens to the color structure templates and the editor understand. */
export function paletteToEditorColors(tokens: PaletteTokens): PaletteTokens & {
  primary: string;
  secondary: string;
  background: string;
  text: string;
} {
  return {
    ...tokens,
    primary: tokens.primary,
    secondary: tokens.secondary,
    background: tokens.pageBackground,
    surface: tokens.surface,
    card: tokens.cardBackground,
    text: tokens.bodyText,
  };
}

/** Group palettes by their group */
export function getPalettesByGroup(): Map<string, Palette[]> {
  const map = new Map<string, Palette[]>();
  for (const palette of PALETTES) {
    const list = map.get(palette.group) ?? [];
    list.push(palette);
    map.set(palette.group, list);
  }
  return map;
}
