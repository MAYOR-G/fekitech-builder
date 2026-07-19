export const PLAN_IDS = ["free", "starter", "professional", "agency"] as const;
export const PUBLIC_PLAN_IDS = ["starter", "professional", "agency"] as const;

export type PlanId = (typeof PLAN_IDS)[number];

export type PlanEntitlements = {
  maxProjects: number;
  maxPublishedProjects: number;
  maxVersionsPerProject: number;
  maxAssetsPerProject: number;
  maxAssetBytes: number;
  maxStorageBytes: number;
  templateLevel: number;
  canPublish: boolean;
  canUploadImages: boolean;
  canUseCustomDomain: boolean;
};

export type PlanDefinition = {
  id: PlanId;
  name: string;
  description: string;
  monthlyPriceMinor: number | null;
  pricePrefix?: string;
  recommended?: boolean;
  publicFeatures: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  entitlements: PlanEntitlements;
};

export const PLANS: Record<PlanId, PlanDefinition> = {
  free: {
    id: "free",
    name: "Free",
    description: "Create and preview one website before choosing a publishing plan.",
    monthlyPriceMinor: 0,
    publicFeatures: ["Browse templates", "Customize one draft", "Private website previews"],
    ctaLabel: "Start building",
    ctaHref: "/signup",
    entitlements: {
      maxProjects: 1,
      maxPublishedProjects: 0,
      maxVersionsPerProject: 5,
      maxAssetsPerProject: 0,
      maxAssetBytes: 0,
      maxStorageBytes: 0,
      templateLevel: 0,
      canPublish: false,
      canUploadImages: false,
      canUseCustomDomain: false,
    },
  },
  starter: {
    id: "starter",
    name: "Starter",
    description: "For an individual or small business publishing one website.",
    monthlyPriceMinor: 900,
    publicFeatures: [
      "1 published website",
      "Standard templates",
      "Text, color, background, image, and logo customization",
      "Mobile-responsive website",
      "FekiTech Builder subdomain",
      "Secure hosting and website previews",
      "Basic support",
    ],
    ctaLabel: "Start with Starter",
    ctaHref: "/signup",
    entitlements: {
      maxProjects: 3,
      maxPublishedProjects: 1,
      maxVersionsPerProject: 20,
      maxAssetsPerProject: 25,
      maxAssetBytes: 5 * 1024 * 1024,
      maxStorageBytes: 100 * 1024 * 1024,
      templateLevel: 1,
      canPublish: true,
      canUploadImages: true,
      canUseCustomDomain: false,
    },
  },
  professional: {
    id: "professional",
    name: "Growth",
    description: "For freelancers and growing businesses managing several websites.",
    monthlyPriceMinor: 1900,
    recommended: true,
    publicFeatures: [
      "Up to 3 published websites",
      "Everything in Starter",
      "All premium templates",
      "More upload and storage capacity",
      "Expanded version history",
      "Advanced customization",
      "Custom-domain connection",
      "Priority support",
    ],
    ctaLabel: "Choose Growth",
    ctaHref: "/signup",
    entitlements: {
      maxProjects: 10,
      maxPublishedProjects: 3,
      maxVersionsPerProject: 50,
      maxAssetsPerProject: 100,
      maxAssetBytes: 8 * 1024 * 1024,
      maxStorageBytes: 1024 * 1024 * 1024,
      templateLevel: 2,
      canPublish: true,
      canUploadImages: true,
      canUseCustomDomain: true,
    },
  },
  agency: {
    id: "agency",
    name: "Custom",
    description: "For a unique website designed and set up around your requirements.",
    monthlyPriceMinor: 3000,
    pricePrefix: "From",
    publicFeatures: [
      "Unique custom-designed website",
      "Personal domain connection",
      "Design matched to your brand",
      "Content and structure setup",
      "Responsive implementation",
      "Managed updates or support based on scope",
    ],
    ctaLabel: "Request a custom website",
    ctaHref: "/support",
    entitlements: {
      maxProjects: 100,
      maxPublishedProjects: 100,
      maxVersionsPerProject: 100,
      maxAssetsPerProject: 500,
      maxAssetBytes: 12 * 1024 * 1024,
      maxStorageBytes: 10 * 1024 * 1024 * 1024,
      templateLevel: 3,
      canPublish: true,
      canUploadImages: true,
      canUseCustomDomain: true,
    },
  },
};

const TEMPLATE_MINIMUM_PLAN: Record<string, PlanId> = {
  "accountancy-website": "starter",
  "agency": "agency",
  "barber-website": "free",
  "blackwood-barbers": "starter",
  "cake-website": "free",
  "catering-website": "starter",
  "coffee-website": "free",
  "dentist-website": "starter",
  "electrician-website": "free",
  "estate-agent-website": "professional",
  "furniture-website": "starter",
  "gym-website": "starter",
  "hearth-and-harvest": "professional",
  "hotel-website": "professional",
  "ink-and-iron": "professional",
  "oak-and-ivory-barbers": "starter",
  "plumber-website": "starter",
  "premium-coffee-website": "professional",
  "premium-lash-technician-website": "professional",
  "premium-nail-technician-website": "professional",
  "premium-spa-website": "professional",
  "restaurant-website": "starter",
  "salon-website": "free",
  "second-electrician-website": "starter",
  "second-furniture-website": "professional",
  "second-plumber-website": "starter",
  "second-salon-website": "starter",
};

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && PLAN_IDS.includes(value as PlanId);
}

export function normalizePlanId(value: unknown): PlanId {
  return isPlanId(value) ? value : "free";
}

export function getPlan(planId: PlanId): PlanDefinition {
  return PLANS[planId];
}

export function getTemplateMinimumPlan(templateId: string): PlanId {
  return TEMPLATE_MINIMUM_PLAN[templateId] ?? "agency";
}

export function canPlanUseTemplate(planId: PlanId, templateId: string): boolean {
  const minimumPlan = getTemplateMinimumPlan(templateId);
  return PLANS[planId].entitlements.templateLevel >= PLANS[minimumPlan].entitlements.templateLevel;
}

export function formatLimit(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
