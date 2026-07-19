import { ResetPasswordForm } from "./ResetPasswordForm";
import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-ft-surface px-5 py-12 sm:px-6 sm:py-16">
      <section className="w-full max-w-md rounded-[1.75rem] border border-ft-border bg-white p-6 shadow-[0_24px_70px_rgba(22,31,72,0.12)] sm:p-9" aria-labelledby="reset-title">
        <Link href="/" className="mb-8 flex w-fit items-center gap-2.5 rounded-xl" aria-label="FekiTech Builder home"><LogoMark /><span className="font-bold text-ft-ink">FekiTech Builder</span></Link>
        <h1 id="reset-title" className="text-2xl font-semibold text-ft-ink">Choose a new password</h1>
        <p className="mt-2 text-sm text-ft-body">Use at least 10 characters and avoid a password used elsewhere.</p>
        <ResetPasswordForm token={token ?? null} />
      </section>
    </main>
  );
}
