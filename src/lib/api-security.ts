import { createHmac, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/db";

export function enforceJsonRequest(request: NextRequest, maxBytes = 512 * 1024): NextResponse | null {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim();
  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
  }
  return null;
}

export function enforceSameOrigin(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (!origin) {
    if (process.env.NODE_ENV === "production" || (fetchSite && fetchSite !== "same-origin")) {
      return NextResponse.json({ error: "A valid request origin is required." }, { status: 403 });
    }
    return null;
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",", 1)[0].trim();
  const host = forwardedHost ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto")?.split(",", 1)[0].trim() ?? request.nextUrl.protocol.replace(":", "");
  let parsedOrigin: URL;
  try {
    parsedOrigin = new URL(origin);
  } catch {
    return NextResponse.json({ error: "A valid request origin is required." }, { status: 403 });
  }
  if (!host || parsedOrigin.host !== host || parsedOrigin.protocol !== `${protocol}:`) {
    return NextResponse.json({ error: "Cross-origin mutation rejected." }, { status: 403 });
  }

  return null;
}

function rateLimitSecret(): string {
  const secret = process.env.RATE_LIMIT_KEY_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("RATE_LIMIT_KEY_SECRET or SUPABASE_SERVICE_ROLE_KEY must be configured.");
  return secret;
}

export function getClientAddress(request: NextRequest): string {
  const headerName = process.env.TRUSTED_CLIENT_IP_HEADER ?? "x-forwarded-for";
  const headerValue = request.headers.get(headerName);
  return headerValue?.split(",", 1)[0].trim() || "unknown";
}

function protectedRateLimitKey(scope: string, identifier: string): string {
  return createHmac("sha256", rateLimitSecret()).update(`${scope}:${identifier}`).digest("hex");
}

export async function enforceRateLimit(options: {
  scope: string;
  identifier: string;
  max: number;
  windowSeconds: number;
}): Promise<NextResponse | null> {
  const key = `api:${options.scope}:${protectedRateLimitKey(options.scope, options.identifier)}`;
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;

  const db = getAdminDb();

  // Try to get existing record
  const { data: existing } = await db
    .from("rate_limits")
    .select("id, count, last_request")
    .eq("key", key)
    .single();

  if (existing) {
    const elapsed = now - Number(existing.last_request);
    if (elapsed >= windowMs) {
      // Window expired, reset
      await db
        .from("rate_limits")
        .update({ count: 1, last_request: now })
        .eq("id", existing.id);
      return null;
    } else {
      // Within window, increment
      const newCount = existing.count + 1;
      await db
        .from("rate_limits")
        .update({ count: newCount })
        .eq("id", existing.id);

      if (newCount > options.max) {
        const retryAfter = Math.max(1, Math.ceil((Number(existing.last_request) + windowMs - now) / 1000));
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429, headers: { "Retry-After": String(retryAfter) } },
        );
      }
      return null;
    }
  } else {
    // First request in this window
    await db
      .from("rate_limits")
      .insert({ id: randomUUID(), key, count: 1, last_request: now });
    return null;
  }
}
