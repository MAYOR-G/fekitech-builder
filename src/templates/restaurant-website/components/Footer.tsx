"use client";

import { useTemplateData } from "../TemplateContext";
export function Footer() {
  const { brand, footerLinks, socialLinks } = useTemplateData();

  return (
    <footer className="border-t border-cream/10 bg-[linear-gradient(180deg,#151511,#0f0f0d)] px-5 py-12 text-cream lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <p className="font-display text-4xl font-semibold">{brand.name}</p>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-cream/58">
            {brand.tagline}
          </p>
          <p className="mt-5 inline-flex rounded-full border border-sage/24 px-3 py-1.5 text-sm font-bold text-sage">
            {brand.instagram}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">
            Quick links
          </p>
          <div className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="block text-sm font-bold text-cream/58 transition hover:text-ember"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm font-bold leading-6 text-cream/58">
            <p>{brand.phone}</p>
            <p>{brand.email}</p>
            <p>{brand.address}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">
            Social
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-cream/12 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-cream/62 transition hover:border-ember/40 hover:text-ember"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-cream/10 pt-6 text-xs font-bold text-cream/42 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Ember & Sage Kitchen. All rights reserved.</p>
        <p>
          Suitable for restaurants in Chicago, Brooklyn, New York, London,
          Manchester, and Los Angeles.
        </p>
      </div>
    </footer>
  );
}
