import { createHmac, randomBytes } from "node:crypto";
import { domainToASCII } from "node:url";

export type DomainValidation = { valid: true; value: string } | { valid: false; error: string };

export function normalizeCustomDomain(input: string): DomainValidation {
  const value = domainToASCII(input.trim().toLowerCase().replace(/\.$/, ""));
  if (!value || value.length > 253 || !value.includes(".")) {
    return { valid: false, error: "Enter a valid fully-qualified domain." };
  }
  if (value === "localhost" || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(value)) {
    return { valid: false, error: "IP addresses and localhost cannot be custom domains." };
  }
  if (!value.split(".").every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) {
    return { valid: false, error: "The domain contains an invalid label." };
  }

  const rootDomain = (process.env.ROOT_DOMAIN ?? "localhost:3000").split(":", 1)[0].toLowerCase();
  if (value === rootDomain || value.endsWith(`.${rootDomain}`)) {
    return { valid: false, error: "Builder hostnames cannot be registered as custom domains." };
  }
  return { valid: true, value };
}

function verificationSecret(): string {
  const secret = process.env.DOMAIN_VERIFICATION_SECRET;
  if (!secret) throw new Error("DOMAIN_VERIFICATION_SECRET must be configured.");
  return secret;
}

export function createDomainVerificationToken(): string {
  return `fekitech-verification=${randomBytes(24).toString("base64url")}`;
}

export function hashDomainVerificationToken(token: string): string {
  return createHmac("sha256", verificationSecret()).update(token).digest("hex");
}
