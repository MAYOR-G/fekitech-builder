import { prisma } from "@/lib/db";

const RESERVED_SUBDOMAINS = new Set([
  "admin", "api", "app", "assets", "auth", "billing", "blog", "cdn", "dashboard",
  "docs", "editor", "help", "mail", "preview", "pricing", "staging", "static",
  "status", "support", "templates", "test", "www",
]);

export type SubdomainValidation = { valid: true; value: string } | { valid: false; error: string };

export function validateSubdomain(input: string): SubdomainValidation {
  const value = input.trim().toLowerCase();
  if (value.length < 3 || value.length > 63) {
    return { valid: false, error: "Subdomains must be between 3 and 63 characters." };
  }
  if (!/^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])$/.test(value)) {
    return { valid: false, error: "Use lowercase letters, numbers, and internal hyphens only." };
  }
  if (RESERVED_SUBDOMAINS.has(value)) {
    return { valid: false, error: "That subdomain is reserved." };
  }
  return { valid: true, value };
}

export function slugifySubdomain(input: string): string {
  const normalized = input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const slug = normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
  return slug.length >= 3 && !RESERVED_SUBDOMAINS.has(slug) ? slug : "site";
}

export async function isSubdomainAvailable(subdomain: string, projectId?: string): Promise<boolean> {
  const [project, reservation] = await Promise.all([
    prisma.project.findUnique({ where: { subdomain }, select: { id: true } }),
    prisma.subdomainReservation.findUnique({ where: { subdomain }, select: { projectId: true } }),
  ]);
  if (project && project.id !== projectId) return false;
  return !reservation || reservation.projectId === projectId;
}
