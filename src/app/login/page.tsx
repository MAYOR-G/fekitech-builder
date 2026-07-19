"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ft-surface px-5 py-12 sm:px-6 sm:py-16">
      {/* Ambient blobs */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,210,255,0.05) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(58,0,255,0.04) 0%, transparent 70%)" }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative z-10 w-full max-w-[440px] rounded-[1.75rem] border border-ft-border bg-white p-6 shadow-[0_24px_70px_rgba(22,31,72,0.12)] sm:p-9">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-lg font-bold tracking-tight text-ft-ink">FekiTech <span className="font-medium text-ft-body">Builder</span></span>
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-ft-ink text-center mb-2">Welcome back</h1>
        <p className="text-ft-body text-sm text-center mb-8">Log in to manage your websites</p>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          const formData = new FormData(e.currentTarget);
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          
          try {
            const { error: authError } = await authClient.signIn.email({
              email,
              password,
            }, {
              onSuccess: () => {
                const requested = new URLSearchParams(window.location.search).get("redirect");
                const destination = requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard";
                router.push(destination);
              },
              onError: (ctx) => {
                setError(ctx.error.message || "Failed to sign in");
              }
            });
            if (authError) {
              setError(authError.message || "Invalid email or password");
            }
          } finally {
            setLoading(false);
          }
        }}>
          {error && <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <div>
            <label htmlFor="login-email" className="text-sm font-medium text-ft-ink mb-1.5 block">Email</label>
            <input id="login-email" name="email" type="email" autoComplete="email" required placeholder="name@example.com" className="w-full input-pill !rounded-xl !py-3 !px-4 text-sm" disabled={loading} />
          </div>
          <div>
            <label htmlFor="login-password" className="text-sm font-medium text-ft-ink mb-1.5 block">Password</label>
            <div className="relative">
              <input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your password" className="w-full input-pill !rounded-xl !py-3 !pl-4 !pr-12 text-sm" disabled={loading} />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-1 flex min-w-11 items-center justify-center rounded-lg text-ft-muted transition-colors hover:text-ft-primary" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                {showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-xs text-ft-primary hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" disabled={loading} className="btn-gradient w-full mt-2 disabled:opacity-50">
            {loading ? "Signing in…" : "Log in"}
          </button>
        </form>

        <p className="text-ft-body text-sm text-center mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-ft-primary font-medium hover:underline">Sign up free</Link>
        </p>
      </motion.div>
    </main>
  );
}
