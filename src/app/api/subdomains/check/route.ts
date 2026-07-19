import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { isSubdomainAvailable, validateSubdomain } from "@/lib/subdomains";

export async function GET(request: NextRequest) {
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const rateLimit = await enforceRateLimit({
    scope: "subdomain-check",
    identifier: sessionOrResponse.user.id,
    max: 60,
    windowSeconds: 60,
  });
  if (rateLimit) return rateLimit;

  const validation = validateSubdomain(request.nextUrl.searchParams.get("subdomain") ?? "");
  if (!validation.valid) {
    return NextResponse.json({ available: false, error: validation.error }, { status: 400 });
  }

  const available = await isSubdomainAvailable(validation.value);
  return NextResponse.json({ subdomain: validation.value, available });
}
