import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS, PUBLIC_PLAN_IDS } from "@/lib/plans";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-ft-surface-cool px-5 py-16 sm:px-6 sm:py-24 relative overflow-hidden">
      {/* Background abstract blurs for a premium vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-ft-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <section className="relative mx-auto max-w-3xl text-center z-10">
        <p className="eyebrow justify-center tracking-widest uppercase">Simple pricing</p>
        <h1 className="mt-6 text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-[720] leading-[1.05] tracking-[-0.04em] text-ft-ink">
          The perfect plan for your business
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ft-body sm:text-lg">
          Start building for free. Upgrade when you&apos;re ready to publish, remove our branding, or connect a custom domain.
        </p>
      </section>

      <section className="relative z-10 mx-auto mt-16 grid max-w-7xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Publishing plans">
        {PUBLIC_PLAN_IDS.map((planId) => {
          const plan = PLANS[planId];
          const isPro = plan.recommended;

          return (
            <article 
              key={plan.id} 
              className={`group relative flex flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 
                ${isPro 
                  ? "bg-white border-2 border-ft-primary shadow-[0_20px_60px_-15px_rgba(0,185,235,0.25)] ring-4 ring-ft-primary/10" 
                  : "bg-white/80 border border-ft-border shadow-[0_12px_40px_-15px_rgba(22,31,72,0.08)] backdrop-blur-xl hover:shadow-[0_24px_50px_-15px_rgba(22,31,72,0.12)] hover:border-ft-border/80 hover:bg-white"
                }`}
            >
              {isPro ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-ft-ink px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              ) : null}
              
              <h2 className="text-xl font-[720] text-ft-ink">{plan.name}</h2>
              <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-ft-body/90">{plan.description}</p>
              
              <div className="mt-8 mb-8 h-px w-full bg-ft-border/60" />

              <p className="price-figures flex items-end gap-1 text-ft-ink">
                {plan.pricePrefix ? <span className="mb-1.5 text-sm font-semibold text-ft-body">{plan.pricePrefix}</span> : null}
                <span className="text-5xl font-[720] tracking-[-0.05em]">£{(plan.monthlyPriceMinor ?? 0) / 100}</span>
                <span className="mb-1.5 text-sm font-medium text-ft-body">/month</span>
              </p>

              <ul className="mt-10 flex-1 space-y-4">
                {plan.publicFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ft-ink font-medium">
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isPro ? 'bg-ft-primary/15 text-ft-primary' : 'bg-ft-surface-alt text-ft-ink'}`}>
                      <Check aria-hidden="true" size={12} strokeWidth={3} />
                    </span>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.ctaHref} 
                className={`mt-10 min-h-12 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300
                  ${isPro 
                    ? "bg-ft-primary text-white shadow-[0_12px_28px_rgba(0,185,235,0.3)] hover:-translate-y-0.5 hover:bg-ft-primary-deep hover:shadow-[0_16px_36px_rgba(0,185,235,0.4)]" 
                    : "bg-white border border-ft-border text-ft-ink shadow-sm hover:-translate-y-0.5 hover:border-ft-primary hover:text-ft-primary hover:shadow-md"
                  }`}
              >
                {plan.ctaLabel}
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
