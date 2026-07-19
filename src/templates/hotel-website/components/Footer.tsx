"use client";

import { useTemplateData } from "../TemplateContext";
export function Footer() {
  const { brand, footerLinks, socialLinks } = useTemplateData();

  return (
    <footer className="bg-onyx px-5 py-16 text-pureWhite lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">
        <div>
          <p className="font-display text-3xl">{brand.name}</p>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-pureWhite/70">
            {brand.tagline}
          </p>
          <p className="mt-5 inline-flex rounded-[4px] border border-white/20 px-3 py-1.5 text-sm font-bold text-bronze">
            {brand.instagram}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
            Quick links
          </p>
          <div className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="block text-sm font-semibold text-pureWhite/70 transition hover:text-bronze"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm font-semibold leading-6 text-pureWhite/70">
            <p>{brand.phone}</p>
            <p>{brand.email}</p>
            <p>{brand.address}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
            Social
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-pureWhite transition hover:border-bronze hover:text-bronze"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-pureWhite/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 The Marlowe House. All rights reserved.</p>
        <p>{brand.policies}</p>
      </div>
    </footer>
  );
}
