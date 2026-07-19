"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";

export function ResetPasswordForm({ token }: { token: string | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!token) {
    return <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">This reset link is invalid or incomplete.</p>;
  }

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");
        const password = String(new FormData(event.currentTarget).get("password"));
        const result = await authClient.resetPassword({ newPassword: password, token });
        if (result.error) setError(result.error.message ?? "The reset link is invalid or expired.");
        else setMessage("Your password has been changed. You can now sign in.");
        setIsSubmitting(false);
      }}
    >
      <label htmlFor="new-password" className="block text-sm font-medium text-ft-ink">New password</label>
      <div className="relative">
        <input id="new-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={10} maxLength={128} required className="input-pill w-full !rounded-xl !py-3 !pl-4 !pr-12" />
        <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-1 flex min-w-11 items-center justify-center rounded-lg text-ft-muted transition-colors hover:text-ft-primary" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
          {showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
        </button>
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-gradient w-full disabled:opacity-50">
        {isSubmitting ? "Updating…" : "Update password"}
      </button>
      {error ? <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">{message} <Link href="/login" className="font-semibold underline">Sign in</Link></p> : null}
    </form>
  );
}
