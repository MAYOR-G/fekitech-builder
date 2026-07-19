import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS, PUBLIC_PLAN_IDS } from "@/lib/plans";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-16 sm:px-6 sm:py-24">
      <section className="mx-auto max-w-3xl text-center">
        <p className="eyebrow justify-center">Simple pricing</p>
        <h1 className="mt-5 text-balance text-[clamp(2.5rem,5vw,4.75rem)] font-[700] leading-[0.98] tracking-[-0.05em] text-ft-ink">Choose a plan when you are ready to publish</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ft-body sm:text-lg">
          Browse templates and test the editor without paying. Publishing requires an active plan. Checkout remains inactive during platform testing, so no payment will be collected yet.
        </p>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-3" aria-label="Publishing plans">
        {PUBLIC_PLAN_IDS.map((planId) => {
          const plan = PLANS[planId];
          return (
            <article key={plan.id} className={`relative flex flex-col rounded-[1.5rem] border bg-white p-6 shadow-[0_18px_50px_rgba(22,31,72,0.08)] sm:p-8 ${plan.recommended ? "border-ft-primary ring-4 ring-ft-primary/8" : "border-ft-border"}`}>
              {plan.recommended ? <p className="absolute right-5 top-5 rounded-full bg-ft-surface-cool px-3 py-1 text-xs font-bold text-ft-primary">Most popular</p> : null}
              <h2 className="text-xl font-bold text-ft-ink">{plan.name}</h2>
              <p className="mt-3 min-h-14 text-sm leading-6 text-ft-body">{plan.description}</p>
              <p className="price-figures mt-7 flex items-end gap-1 text-ft-ink">
                {plan.pricePrefix ? <span className="mb-1.5 text-sm font-semibold text-ft-body">{plan.pricePrefix}</span> : null}
                <span className="text-5xl font-[720] tracking-[-0.055em]">${(plan.monthlyPriceMinor ?? 0) / 100}</span>
                <span className="mb-1.5 text-sm text-ft-body">/month</span>
              </p>
              <p className="mt-2 text-xs text-ft-muted">No payment is collected during testing.</p>
              <ul className="mt-7 flex-1 space-y-3.5">
                {plan.publicFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ft-body">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ft-cyan-soft text-ft-primary"><Check aria-hidden="true" size={13} strokeWidth={2.5} /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={plan.ctaHref} className={`mt-8 min-h-12 rounded-xl px-4 py-3 text-center text-sm font-bold transition-all ${plan.recommended ? "bg-ft-primary text-white shadow-[0_12px_28px_rgba(24,59,211,0.2)] hover:-translate-y-0.5 hover:bg-ft-primary-deep" : "border border-ft-border text-ft-ink hover:-translate-y-0.5 hover:border-ft-primary hover:text-ft-primary"}`}>
                {plan.ctaLabel}
              </Link>
              {plan.id === "agency" ? <p className="mt-3 text-center text-xs leading-5 text-ft-muted">Final scope and price depend on your requirements.</p> : null}
            </article>
          );
        })}
      </section>
    </main>
  );
}
