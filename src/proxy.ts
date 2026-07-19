import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/editor"];
const PUBLIC_ASSET_PATHS = ["/_next/", "/images/", "/api/public/assets/", "/favicon.ico", "/favicon.svg"];

function contentSecurityPolicy(nonce: string): string {
  const developmentEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
  const upgrade = process.env.NODE_ENV === "production" ? "; upgrade-insecure-requests" : "";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${developmentEval}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
  ].join("; ") + upgrade;
}

function pageResponse(request: NextRequest, rewriteUrl?: URL): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy(nonce));
  const response = rewriteUrl
    ? NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", contentSecurityPolicy(nonce));
  return response;
}

function hostnameWithoutPort(request: NextRequest): string {
  return (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.hostname)
    .split(",", 1)[0]
    .trim()
    .split(":", 1)[0]
    .toLowerCase();
}

function rootHostname(): string {
  const domain =
    process.env.ROOT_DOMAIN ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "localhost:3000";
  return domain.split(":", 1)[0].toLowerCase();
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = hostnameWithoutPort(request);
  const root = rootHostname();

  if (PUBLIC_ASSET_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const isRoot = hostname === root || hostname === `www.${root}` || hostname === `app.${root}` || hostname.endsWith(".vercel.app");
  const isTenant = !isRoot && hostname.endsWith(`.${root}`);

  if (isTenant) {
    const subdomain = hostname.slice(0, -(root.length + 1));
    return pageResponse(request, new URL(`/sites/${encodeURIComponent(subdomain)}${pathname}`, request.url));
  }

  if (!isRoot) {
    return pageResponse(request, new URL(`/sites/domain/${encodeURIComponent(hostname)}${pathname}`, request.url));
  }

  if (pathname.startsWith("/api/")) return NextResponse.next();

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (isProtected) {
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ??
      request.cookies.get("__Secure-better-auth.session_token");
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", `${pathname}${request.nextUrl.search}`);
      const response = NextResponse.redirect(loginUrl);
      response.headers.set("Content-Security-Policy", contentSecurityPolicy(Buffer.from(crypto.randomUUID()).toString("base64")));
      return response;
    }
  }

  return pageResponse(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
