import { createHmac, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
  const secret = process.env.RATE_LIMIT_KEY_SECRET ?? process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("RATE_LIMIT_KEY_SECRET or BETTER_AUTH_SECRET must be configured.");
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
  const now = BigInt(Date.now());
  const windowMs = BigInt(options.windowSeconds * 1000);

  const rows = await prisma.$queryRaw<Array<{ count: number; lastRequest: bigint }>>`
    INSERT INTO "rate_limit" ("id", "key", "count", "lastRequest")
    VALUES (${randomUUID()}, ${key}, 1, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN ${now} - "rate_limit"."lastRequest" >= ${windowMs} THEN 1
        ELSE "rate_limit"."count" + 1
      END,
      "lastRequest" = CASE
        WHEN ${now} - "rate_limit"."lastRequest" >= ${windowMs} THEN ${now}
        ELSE "rate_limit"."lastRequest"
      END
    RETURNING "count", "lastRequest"
  `;

  const result = rows[0];
  if (!result || result.count <= options.max) return null;

  const retryAfter = Math.max(
    1,
    Math.ceil((Number(result.lastRequest + windowMs - now)) / 1000),
  );
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}
