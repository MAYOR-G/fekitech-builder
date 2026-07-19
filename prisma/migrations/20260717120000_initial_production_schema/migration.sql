CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    CONSTRAINT "user_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "user_role_check" CHECK ("role" IN ('user', 'admin'))
);

CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "rate_limit" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "lastRequest" BIGINT NOT NULL,
    CONSTRAINT "rate_limit_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "rate_limit_count_check" CHECK ("count" >= 0)
);

CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "subdomain" TEXT,
    "customDomain" TEXT,
    "customDomainVerifiedAt" TIMESTAMP(3),
    "customDomainVerificationTokenHash" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "editableData" JSONB NOT NULL,
    "dataVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedVersionId" TEXT,
    CONSTRAINT "project_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "project_name_length_check" CHECK (char_length("name") BETWEEN 1 AND 120),
    CONSTRAINT "project_subdomain_format_check" CHECK ("subdomain" IS NULL OR "subdomain" ~ '^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?$'),
    CONSTRAINT "project_custom_domain_length_check" CHECK ("customDomain" IS NULL OR char_length("customDomain") <= 253)
);

CREATE TABLE "template_version" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "versionName" TEXT NOT NULL,
    "editableData" JSONB NOT NULL,
    "dataVersion" INTEGER NOT NULL DEFAULT 1,
    "isPublishSnapshot" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),
    CONSTRAINT "template_version_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "template_version_name_length_check" CHECK (char_length("versionName") BETWEEN 1 AND 120)
);

CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'payment',
    "provider" TEXT,
    "providerCustomerId" TEXT,
    "providerSubscriptionId" TEXT,
    "currentPeriodEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "subscription_plan_check" CHECK ("planId" IN ('free', 'starter', 'professional', 'agency')),
    CONSTRAINT "subscription_status_check" CHECK ("status" IN ('active', 'canceled', 'past_due', 'expired')),
    CONSTRAINT "subscription_source_check" CHECK ("source" IN ('payment', 'test', 'manual'))
);

CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerPaymentId" TEXT,
    "idempotencyKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "payment_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "payment_amount_check" CHECK ("amountMinor" >= 0),
    CONSTRAINT "payment_currency_check" CHECK ("currency" ~ '^[A-Z]{3}$'),
    CONSTRAINT "payment_status_check" CHECK ("status" IN ('pending', 'succeeded', 'failed', 'refunded'))
);

CREATE TABLE "asset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "byteSize" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    CONSTRAINT "asset_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "asset_byte_size_check" CHECK ("byteSize" > 0),
    CONSTRAINT "asset_dimensions_check" CHECK (("width" IS NULL AND "height" IS NULL) OR ("width" > 0 AND "height" > 0))
);

CREATE TABLE "subdomain_reservation" (
    "subdomain" TEXT NOT NULL,
    "userId" TEXT,
    "projectId" TEXT,
    "reservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "releasedAt" TIMESTAMP(3),
    CONSTRAINT "subdomain_reservation_pkey" PRIMARY KEY ("subdomain")
);

CREATE TABLE "activity_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE INDEX "user_role_idx" ON "user"("role");
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");
CREATE INDEX "session_userId_idx" ON "session"("userId");
CREATE INDEX "session_expiresAt_idx" ON "session"("expiresAt");
CREATE INDEX "account_userId_idx" ON "account"("userId");
CREATE UNIQUE INDEX "account_providerId_accountId_key" ON "account"("providerId", "accountId");
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
CREATE INDEX "verification_expiresAt_idx" ON "verification"("expiresAt");
CREATE UNIQUE INDEX "rate_limit_key_key" ON "rate_limit"("key");
CREATE INDEX "rate_limit_lastRequest_idx" ON "rate_limit"("lastRequest");
CREATE UNIQUE INDEX "project_subdomain_key" ON "project"("subdomain");
CREATE UNIQUE INDEX "project_customDomain_key" ON "project"("customDomain");
CREATE UNIQUE INDEX "project_publishedVersionId_key" ON "project"("publishedVersionId");
CREATE INDEX "project_userId_updatedAt_idx" ON "project"("userId", "updatedAt");
CREATE INDEX "project_isPublished_subdomain_idx" ON "project"("isPublished", "subdomain");
CREATE INDEX "project_isPublished_customDomain_idx" ON "project"("isPublished", "customDomain");
CREATE INDEX "template_version_projectId_createdAt_idx" ON "template_version"("projectId", "createdAt");
CREATE INDEX "template_version_projectId_isPublishSnapshot_createdAt_idx" ON "template_version"("projectId", "isPublishSnapshot", "createdAt");
CREATE UNIQUE INDEX "subscription_providerSubscriptionId_key" ON "subscription"("providerSubscriptionId");
CREATE INDEX "subscription_userId_status_currentPeriodEnd_idx" ON "subscription"("userId", "status", "currentPeriodEnd");
CREATE UNIQUE INDEX "subscription_userId_source_key" ON "subscription"("userId", "source");
CREATE UNIQUE INDEX "payment_providerPaymentId_key" ON "payment"("providerPaymentId");
CREATE UNIQUE INDEX "payment_idempotencyKey_key" ON "payment"("idempotencyKey");
CREATE INDEX "payment_userId_createdAt_idx" ON "payment"("userId", "createdAt");
CREATE INDEX "payment_status_createdAt_idx" ON "payment"("status", "createdAt");
CREATE UNIQUE INDEX "asset_storageKey_key" ON "asset"("storageKey");
CREATE INDEX "asset_userId_createdAt_idx" ON "asset"("userId", "createdAt");
CREATE INDEX "asset_projectId_createdAt_idx" ON "asset"("projectId", "createdAt");
CREATE INDEX "subdomain_reservation_projectId_idx" ON "subdomain_reservation"("projectId");
CREATE INDEX "subdomain_reservation_releasedAt_idx" ON "subdomain_reservation"("releasedAt");
CREATE INDEX "activity_log_userId_createdAt_idx" ON "activity_log"("userId", "createdAt");
CREATE INDEX "activity_log_action_createdAt_idx" ON "activity_log"("action", "createdAt");

ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "project" ADD CONSTRAINT "project_publishedVersionId_fkey" FOREIGN KEY ("publishedVersionId") REFERENCES "template_version"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "template_version" ADD CONSTRAINT "template_version_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "asset" ADD CONSTRAINT "asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "asset" ADD CONSTRAINT "asset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
