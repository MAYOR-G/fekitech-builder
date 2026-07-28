import { createServerClient } from "@supabase/ssr";
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
    `connect-src 'self' https://*.supabase.co wss://*.supabase.co ${process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "worker-src 'self' blob:",
  ].join("; ") + upgrade;
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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = hostnameWithoutPort(request);
  const root = rootHostname();

  if (PUBLIC_ASSET_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy(nonce));

  // Handle Supabase Auth
  let supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isRoot = hostname === root || hostname === `www.${root}` || hostname === `app.${root}` || hostname.endsWith(".vercel.app");
  const isTenant = !isRoot && hostname.endsWith(`.${root}`);

  if (isTenant) {
    const subdomain = hostname.slice(0, -(root.length + 1));
    supabaseResponse = NextResponse.rewrite(new URL(`/sites/${encodeURIComponent(subdomain)}${pathname}`, request.url), { request: { headers: requestHeaders } });
  } else if (!isRoot) {
    supabaseResponse = NextResponse.rewrite(new URL(`/sites/domain/${encodeURIComponent(hostname)}${pathname}`, request.url), { request: { headers: requestHeaders } });
  }

  if (pathname.startsWith("/api/")) {
    supabaseResponse.headers.set("Content-Security-Policy", contentSecurityPolicy(nonce));
    return supabaseResponse;
  }

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${request.nextUrl.search}`);
    const response = NextResponse.redirect(loginUrl);
    response.headers.set("Content-Security-Policy", contentSecurityPolicy(nonce));
    return response;
  }
  
  const authPaths = ["/login", "/signup"];
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  if (isAuthPage && user) {
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.headers.set("Content-Security-Policy", contentSecurityPolicy(nonce));
    return response;
  }

  supabaseResponse.headers.set("Content-Security-Policy", contentSecurityPolicy(nonce));
  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|templates/|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
