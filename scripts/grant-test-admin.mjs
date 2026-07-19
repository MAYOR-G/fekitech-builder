import { PrismaClient } from "../src/generated/prisma/index.js";

if (process.env.NODE_ENV === "production") {
  throw new Error("Test administrator bootstrap is disabled in production.");
}
if (process.env.ALLOW_TEST_ADMIN_BOOTSTRAP !== "true") {
  throw new Error("Set ALLOW_TEST_ADMIN_BOOTSTRAP=true for this one command.");
}

const email = process.env.TEST_ADMIN_EMAIL?.trim().toLowerCase();
if (!email) throw new Error("Set TEST_ADMIN_EMAIL to an existing account email.");

const prisma = new PrismaClient();
try {
  const user = await prisma.user.update({
    where: { email },
    data: { role: "admin" },
    select: { id: true, email: true },
  });
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: "admin.test_access_granted",
      details: JSON.stringify({ email: user.email }),
    },
  });
  process.stdout.write(`Test administrator access granted to ${user.email}.\n`);
} finally {
  await prisma.$disconnect();
}
