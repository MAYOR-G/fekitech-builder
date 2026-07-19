"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LogoMark } from "@/components/ui/LogoMark";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-ft-surface px-5 py-12 sm:px-6 sm:py-16">
      <section className="w-full max-w-md rounded-[1.75rem] border border-ft-border bg-white p-6 shadow-[0_24px_70px_rgba(22,31,72,0.12)] sm:p-9" aria-labelledby="forgot-title">
        <Link href="/" className="mb-8 flex w-fit items-center gap-2.5 rounded-xl" aria-label="FekiTech Builder home"><LogoMark /><span className="font-bold text-ft-ink">FekiTech Builder</span></Link>
        <h1 id="forgot-title" className="text-2xl font-semibold text-ft-ink">Reset your password</h1>
        <p className="mt-2 text-sm text-ft-body">Enter your account email. If it exists, we will send a reset link.</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setIsSubmitting(true);
            const email = new FormData(event.currentTarget).get("email");
            await authClient.requestPasswordReset({
              email: String(email),
              redirectTo: "/reset-password",
            });
            setMessage("If an account exists for that email, a reset link has been sent.");
            setIsSubmitting(false);
          }}
        >
          <label htmlFor="reset-email" className="block text-sm font-medium text-ft-ink">Email</label>
          <input id="reset-email" name="email" type="email" autoComplete="email" required className="input-pill w-full !rounded-xl !px-4 !py-3" />
          <button type="submit" disabled={isSubmitting} className="btn-gradient w-full disabled:opacity-50">
            {isSubmitting ? "Sending…" : "Send reset link"}
          </button>
        </form>
        {message ? <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800" role="status">{message}</p> : null}
        <Link href="/login" className="mt-6 inline-block text-sm font-medium text-ft-primary hover:underline">Back to login</Link>
      </section>
    </main>
  );
}
