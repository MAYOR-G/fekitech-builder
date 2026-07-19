import { randomUUID } from "node:crypto";
import { PrismaClient } from "../src/generated/prisma/index.js";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3100";
const runId = randomUUID();
const ownerEmail = `owner-${runId}@example.test`;
const strangerEmail = `stranger-${runId}@example.test`;
const prisma = new PrismaClient();

function cookiesFrom(response) {
  const values = typeof response.headers.getSetCookie === "function"
    ? response.headers.getSetCookie()
    : [response.headers.get("set-cookie")].filter(Boolean);
  return values.map((value) => value.split(";", 1)[0]).join("; ");
}

async function expectStatus(name, response, status) {
  if (response.status !== status) {
    const body = await response.text();
    throw new Error(`${name}: expected ${status}, received ${response.status}: ${body.slice(0, 240)}`);
  }
  return response;
}

async function signUp(email, name) {
  const signUpResponse = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: JSON.stringify({ email, name, password: "Local-smoke-password-42" }),
  });
  await expectStatus(`sign up ${name}`, signUpResponse, 200);

  // The production artifact correctly requires email verification. The test
  // harness marks only its isolated account verified before exercising sign-in.
  const verified = await prisma.user.updateMany({ where: { email }, data: { emailVerified: true } });
  if (verified.count !== 1) throw new Error(`sign up ${name}: account was not persisted`);

  const signInResponse = await fetch(`${baseUrl}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: JSON.stringify({ email, password: "Local-smoke-password-42" }),
  });
  await expectStatus(`sign in ${name}`, signInResponse, 200);
  const cookie = cookiesFrom(signInResponse);
  if (!cookie) throw new Error(`sign in ${name}: session cookie was not returned`);
  return cookie;
}

try {
  const ownerCookie = await signUp(ownerEmail, "Smoke Owner");
  const createResponse = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: ownerCookie,
      origin: baseUrl,
    },
    body: JSON.stringify({ templateId: "barber-website", name: "Auth smoke project" }),
  });
  await expectStatus("owner project creation", createResponse, 201);
  const created = await createResponse.json();
  const projectId = created.project?.id;
  if (typeof projectId !== "string") throw new Error("owner project creation: project ID missing");

  await expectStatus(
    "owner project read",
    await fetch(`${baseUrl}/api/projects/${projectId}`, { headers: { cookie: ownerCookie } }),
    200,
  );
  await expectStatus(
    "owner draft preview",
    await fetch(`${baseUrl}/preview/project/${projectId}`, { headers: { cookie: ownerCookie } }),
    200,
  );
  await expectStatus(
    "free-plan publish denial",
    await fetch(`${baseUrl}/api/projects/${projectId}/publish`, {
      method: "POST",
      headers: { cookie: ownerCookie, origin: baseUrl },
    }),
    403,
  );

  const strangerCookie = await signUp(strangerEmail, "Smoke Stranger");
  await expectStatus(
    "cross-tenant project read denial",
    await fetch(`${baseUrl}/api/projects/${projectId}`, { headers: { cookie: strangerCookie } }),
    404,
  );
  await expectStatus(
    "cross-tenant project update denial",
    await fetch(`${baseUrl}/api/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        cookie: strangerCookie,
        origin: baseUrl,
      },
      body: JSON.stringify({ name: "Unauthorized edit" }),
    }),
    404,
  );

  const signOut = await fetch(`${baseUrl}/api/auth/sign-out`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: ownerCookie, origin: baseUrl },
    body: "{}",
  });
  await expectStatus("sign out", signOut, 200);
  await expectStatus(
    "signed-out API denial",
    await fetch(`${baseUrl}/api/projects`, { headers: { cookie: ownerCookie } }),
    401,
  );

  console.log("Auth workflow passed: sign-up, session, owner project, draft preview, plan denial, cross-tenant denial, and sign-out.");
} finally {
  await prisma.user.deleteMany({ where: { email: { in: [ownerEmail, strangerEmail] } } });
  await prisma.$disconnect();
}
