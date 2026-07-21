# FekiTech Builder - Production Deployment Guide

This guide provides a complete, step-by-step walkthrough to configure your application for production on Vercel, utilizing **Supabase** for the database, **Google & Email** for authentication, and **SMTP** for transactional emails.

Everything has been configured in the codebase (including adding Google Auth support). You just need to set up the external platforms and add their keys to Vercel.

---

## Step 1: Set Up Supabase (Database)
Supabase provides a powerful, scalable PostgreSQL database that works perfectly with Prisma.

1. Go to [Supabase](https://supabase.com) and create an account/log in.
2. Click **New Project**, select your organization, name your project (e.g., "Fekitech Builder"), and generate a secure database password.
3. Once the project finishes provisioning, go to **Project Settings** (the gear icon) > **Database**.
4. Scroll down to **Connection String** and select **URI**.
5. Copy the connection string. It will look like this:
   `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxx.supabase.co:5432/postgres`
   *(Remember to replace `[YOUR-PASSWORD]` with the password you created in step 2).*

---

## Step 2: Set Up Google Authentication
To allow users to log in with Google, you need an OAuth Client ID.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., "Fekitech Auth").
3. Go to **APIs & Services** > **OAuth consent screen**.
   - Choose **External** and click Create.
   - Fill in the required fields (App name, support email, developer contact email).
   - Save and continue through the next steps (you don't need to add specific scopes yet).
4. Go to **Credentials** > **Create Credentials** > **OAuth client ID**.
5. Select **Web application**.
6. Under **Authorized redirect URIs**, add your production Vercel URL with the Better Auth callback path:
   `https://<your-app-name>.vercel.app/api/auth/callback/google`
   *(Also add `http://localhost:3000/api/auth/callback/google` if you want to test Google login locally).*
7. Click **Create**. You will receive your **Client ID** and **Client Secret**. Save these.

---

## Step 3: Set Up SMTP (Email)
Since the app uses `nodemailer` for password resets and email verification, you need an SMTP provider. [Resend](https://resend.com) or [SendGrid](https://sendgrid.com) are highly recommended.

**If using Resend:**
1. Create an account at [Resend](https://resend.com).
2. Go to **API Keys** and generate a new key.
3. Your SMTP details will be:
   - **Host:** smtp.resend.com
   - **Port:** 465
   - **Username:** resend
   - **Password:** [Your API Key]

---

## Step 4: Configure Vercel Environment Variables
Now, head over to your project on **Vercel**. 
Go to **Settings** > **Environment Variables** and add the following:

### Database & Auth Base
*   `DATABASE_URL` = `postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres` *(from Step 1)*
*   `BETTER_AUTH_SECRET` = *(Generate a random 32-character string. You can use `openssl rand -base64 32` in your terminal to generate one)*
*   `BETTER_AUTH_URL` = `https://<your-app-name>.vercel.app` *(Your production domain)*
*   `NEXT_PUBLIC_APP_URL` = `https://<your-app-name>.vercel.app`

### Google Auth
*   `GOOGLE_CLIENT_ID` = *(From Step 2)*
*   `GOOGLE_CLIENT_SECRET` = *(From Step 2)*

### Email Setup (SMTP)
*   `SMTP_HOST` = `smtp.resend.com`
*   `SMTP_PORT` = `465`
*   `SMTP_USER` = `resend`
*   `SMTP_PASSWORD` = `re_your_api_key_here`
*   `EMAIL_FROM` = `noreply@yourdomain.com` *(Make sure this email is verified in your SMTP provider)*

---

## Step 5: Deploy!
Once all environment variables are saved in Vercel:

1. Go to the **Deployments** tab in Vercel.
2. Click **Redeploy** on your latest commit.
3. **What happens during deployment?**
   Because we configured your `package.json` with `prisma generate && prisma migrate deploy`, Vercel will automatically connect to your new Supabase database, create all the necessary tables (Users, Projects, ActivityLogs, etc.), and start the app.

### Result
- Users can sign up via Email or Google.
- Their data (projects, continued works, generated templates) is securely saved in Supabase.
- They will be able to manage their websites and view their payment plans, all handled seamlessly by the existing database schema.
