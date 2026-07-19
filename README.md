# FekiTech Builder

FekiTech Builder is a multi-tenant Next.js application for selecting a website template, editing structured content, saving versions, previewing drafts, and publishing immutable snapshots to subdomains or verified custom domains.

## Local setup

Requirements: Node.js 22, npm, and PostgreSQL 16.

```bash
cp .env.example .env
docker compose up -d postgres
npm install
npm run prisma:generate
npm run db:deploy
npm run dev
```

The local compose database is available at `127.0.0.1:54329`. Set this non-production connection in `.env`:

```text
DATABASE_URL=postgresql://fekitech:fekitech_local_only@127.0.0.1:54329/fekitech_builder?schema=public
```

Set long, independently generated values for `BETTER_AUTH_SECRET`, `RATE_LIMIT_KEY_SECRET`, and `DOMAIN_VERIFICATION_SECRET`. Do not reuse the local database password in a deployed environment.

## Quality gates

```bash
npm run prisma:generate
npm run db:deploy
npm run lint
npm run typecheck
npm run test
npm run build
```

The GitHub Actions workflow runs the same gates against a disposable PostgreSQL service. Tests with `DATABASE_URL` configured include database tenant-isolation and immutable-snapshot checks.

## Temporary plan testing

Plan testing uses the canonical entitlements in `src/lib/plans.ts`; it does not create payment records.

1. Keep `NODE_ENV` outside production and set `APP_ENV` to `development`, `test`, or `staging`.
2. Set `PLAN_TEST_MODE_ENABLED=true`.
3. Add only authorized administrator email addresses to `PLAN_TEST_ADMIN_EMAILS`, separated by commas.
4. To bootstrap an administrator outside production, set `ALLOW_TEST_ADMIN_BOOTSTRAP=true` and `TEST_ADMIN_EMAIL`, then run `npm run admin:grant-test`. Disable the bootstrap flag immediately afterward.
5. Sign in with that verified account and use the amber Test Mode control on the dashboard.

The server checks both the database `admin` role and the email allowlist. `NODE_ENV=production` disables the feature even if the other variables are misconfigured. Each switch expires after 24 hours and is written to the activity log.

## Deployment requirements

- Use a managed PostgreSQL database and run `npm run db:deploy` before starting the new release.
- Set `ROOT_DOMAIN` and `NEXT_PUBLIC_ROOT_DOMAIN` to the builder host and configure wildcard DNS/TLS for `*.ROOT_DOMAIN`.
- Configure `AUTH_TRUSTED_ORIGINS`, production email verification, and SMTP delivery.
- Use `UPLOAD_STORAGE_DRIVER=s3` in production and configure the S3-compatible variables.
- Forward a trusted client-address header from the edge proxy and set `TRUSTED_CLIENT_IP_HEADER` accordingly.
- Route verified custom domains to the application and provision TLS at the hosting edge. DNS ownership verification in the app does not itself issue certificates.

See `.env.example` for the complete configuration surface.

## Payment boundary

Real checkout, provider customer creation, signed webhooks, refunds, reconciliation, invoice UI, and subscription lifecycle synchronization are intentionally inactive. The schema retains provider identifiers, idempotency keys, and payment/subscription sources so a provider can be integrated without changing the entitlement layer. Normal users cannot create test subscriptions or paid entitlements.
