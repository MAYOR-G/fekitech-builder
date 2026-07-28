"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  };

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

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-ft-border bg-white py-3 px-4 text-sm font-medium text-ft-ink transition-all hover:bg-gray-50 hover:shadow-sm disabled:opacity-50 mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          {googleLoading ? "Redirecting…" : "Continue with Google"}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ft-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-ft-muted">or</span>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          const formData = new FormData(e.currentTarget);
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          
          const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (authError) {
            setError(authError.message || "Invalid email or password");
            setLoading(false);
          } else {
            const requested = new URLSearchParams(window.location.search).get("redirect");
            const destination = requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard";
            router.push(destination);
            router.refresh();
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
