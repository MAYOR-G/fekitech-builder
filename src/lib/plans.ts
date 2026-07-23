export const PLAN_IDS = ["free", "business", "pro", "agency"] as const;
export const PUBLIC_PLAN_IDS = ["free", "business", "pro", "agency"] as const;

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
    description: "Create and preview websites before choosing a publishing plan.",
    monthlyPriceMinor: 0,
    publicFeatures: ["Subdomain", "Limited templates", "Branding included"],
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
  business: {
    id: "business",
    name: "Business",
    description: "For an individual or small business publishing one website.",
    monthlyPriceMinor: 1500,
    publicFeatures: [
      "Custom domain",
      "Remove branding",
      "Analytics",
      "Forms"
    ],
    ctaLabel: "Start with Business",
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
      canUseCustomDomain: true,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "For growing businesses needing advanced features.",
    monthlyPriceMinor: 3900,
    recommended: true,
    publicFeatures: [
      "Everything in Business",
      "AI copywriting",
      "More pages",
      "SEO, AEO, and GEO",
      "Integrations"
    ],
    ctaLabel: "Choose Pro",
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
    name: "Agency",
    description: "For agencies and freelancers managing several websites.",
    monthlyPriceMinor: 9900,
    publicFeatures: [
      "Everything in Pro",
      "Multiple websites",
      "Client management"
    ],
    ctaLabel: "Choose Agency",
    ctaHref: "/signup",
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
  "barber-website": "free",
  "cake-website": "free",
  "catering-website": "business",
  "coffee-website": "free",
  "dentist-website": "business",
  "electrician-website": "free",
  "gym-website": "business",
  "burger-dark-premium": "business",
  "burger-light-clean": "business",
  "pizza-dark-premium": "business",
  "pizza-light-clean": "business",
  "cleaning-agency-premium": "business",
  "roofing-agency-premium": "business",
  "premium-restaurant": "business",
  "fast-food-chicken-tacos": "business",
  "cake-bakery-premium": "business",
  "pastries-snacks-premium": "business",
  "catering-company-premium": "business",
  "plumbing-company-premium": "business",
  "ink-and-iron": "pro",
  "premium-coffee-website": "pro",
  "restaurant-website": "business",
  "second-furniture-website": "pro",
  "second-plumber-website": "business",
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
