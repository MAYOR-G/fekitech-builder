# FekiTech Builder - Production Deployment Guide

This guide provides a complete, step-by-step walkthrough to configure your application for production on Vercel, utilizing **Supabase** for the database, storage, and authentication.

The codebase has been migrated to use the official Supabase clients, completely replacing Prisma and Better Auth. You just need to set up your Supabase project and add the keys to Vercel.

---

## Step 1: Set Up Supabase

Supabase provides a powerful, scalable PostgreSQL database, secure asset storage, and authentication.

1. Go to [Supabase](https://supabase.com) and create an account/log in.
2. Click **New Project**, select your organization, name your project (e.g., "Fekitech Builder"), and generate a secure database password.
3. Wait for the project to finish provisioning.
4. Apply the initial database schema:
   - In the Supabase dashboard, go to the **SQL Editor**.
   - Create a new query.
   - Copy the contents of `supabase/migrations/001_initial_schema.sql` from the codebase and paste it into the editor.
   - Click **Run** to create all necessary tables (profiles, projects, assets, activity_logs, etc.) and Row Level Security (RLS) policies.
5. Create a Storage Bucket for user assets:
   - Go to **Storage** > **New Bucket**.
   - Name the bucket `fekitech` (or update the storage config in the codebase if you use a different name).
   - Ensure the bucket is **Private** (RLS policies will control access).
6. Get your API Keys:
   - Go to **Project Settings** (the gear icon) > **API**.
   - Copy your **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`).
   - Copy your **anon** `public` key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`).
   - Copy your **service_role` `secret` key (`SUPABASE_SERVICE_ROLE_KEY`).

---

## Step 2: Set Up Authentication (Email & Google)

Supabase handles authentication directly. 

1. Go to **Authentication** > **Providers**.
2. **Email**: Ensure the Email provider is enabled. You can configure SMTP settings under **Authentication** > **Emails** if you want to use a custom sender (like Resend) instead of Supabase's default infrastructure.
3. **Google (Optional but recommended)**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project, configure the OAuth consent screen, and create an **OAuth client ID** (Web application).
   - Under **Authorized redirect URIs**, add your Supabase Auth callback: `https://<YOUR-SUPABASE-PROJECT-REF>.supabase.co/auth/v1/callback`
   - Copy the Google Client ID and Secret, and paste them into the Google Provider settings in your Supabase dashboard.

---

## Step 3: Configure Vercel Environment Variables

Head over to your project on **Vercel**. 
Go to **Settings** > **Environment Variables** and add the following:

### Supabase Keys
*   `NEXT_PUBLIC_SUPABASE_URL` = `https://xxxx.supabase.co` *(From Step 1)*
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhb...` *(From Step 1)*
*   `SUPABASE_SERVICE_ROLE_KEY` = `eyJhb...` *(From Step 1 - **Keep this secret!**)*

### Application
*   `NEXT_PUBLIC_APP_URL` = `https://<your-app-name>.vercel.app` *(Your production domain)*

*(Note: You no longer need `DATABASE_URL`, `BETTER_AUTH_SECRET`, or SMTP variables in Vercel. Remove them if they exist.)*

---

## Step 4: Deploy!

Once all environment variables are saved in Vercel:

1. Ensure the `postinstall` script in your `package.json` no longer runs `prisma generate`.
2. Go to the **Deployments** tab in Vercel.
3. Click **Redeploy** on your latest commit.

### Result
- Users can sign up via Email or Google using Supabase Auth.
- Their data (projects, templates, versions) is securely isolated via Supabase Row Level Security (RLS).
- The application uses direct API routes to Supabase rather than managing Prisma connections, improving cold start times and serverless reliability.
