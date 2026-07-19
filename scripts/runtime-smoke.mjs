import process from "node:process";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3100";

async function check(name, path, expectedStatus, options = {}) {
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
  const response = await fetch(url, { redirect: "manual", ...options });
  const body = await response.text();
  if (response.status !== expectedStatus) {
    throw new Error(`${name}: expected ${expectedStatus}, received ${response.status}`);
  }
  return { name, response, body };
}

const home = await check("home", "/", 200);
const csp = home.response.headers.get("content-security-policy") ?? "";
if (!/script-src [^;]*'nonce-[^']+' [^;]*'strict-dynamic'/.test(csp)) {
  throw new Error("home: nonce-based Content-Security-Policy was not returned");
}
if (home.response.headers.get("x-content-type-options") !== "nosniff") {
  throw new Error("home: security headers were not returned");
}

const dashboard = await check("dashboard auth gate", "/dashboard", 307);
if (!dashboard.response.headers.get("location")?.includes("/login")) {
  throw new Error("dashboard auth gate: missing login redirect");
}

await check("project auth gate", "/api/projects", 401);
await check("cross-origin mutation gate", "/api/projects", 403, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ templateId: "barber-website" }),
});
await check("production test-plan gate", "/api/admin/test-plan", 404);
await check("template preview", "/preview/barber-website", 200);
await check("unknown tenant", "http://unknown.localhost:3100/", 404);

console.log("Runtime smoke checks passed: home/CSP, auth gates, origin gate, test-mode gate, preview, and unknown tenant.");
