"use client";

import { useTemplateData } from "../TemplateContext";
export function Footer() {
  const { brand, footerLinks, socialLinks } = useTemplateData();

  return (
    <footer className="border-t border-plum/10 bg-pearl px-5 py-12 text-plum lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">
        <div>
          <p className="font-display text-3xl font-semibold">{brand.name}</p>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-mink/66">
            {brand.tagline}
          </p>
          <p className="mt-5 inline-flex rounded-full border border-rose/28 px-3 py-1.5 text-sm font-black text-rose">
            {brand.instagram}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-rose">
            Quick links
          </p>
          <div className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="block text-sm font-bold text-mink/68 transition hover:text-plum"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-rose">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm font-bold leading-6 text-mink/68">
            <p>{brand.phone}</p>
            <p>{brand.email}</p>
            <p>{brand.address}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-rose">
            Social
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-plum/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-mink transition hover:border-rose/40 hover:text-plum"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-plum/10 pt-6 text-xs font-bold text-mink/56 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {brand.name}. All rights reserved.</p>
        <p>{brand.hours}</p>
      </div>
    </footer>
  );
}
