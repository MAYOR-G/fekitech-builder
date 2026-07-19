"use client";
import { Facebook, Instagram, Linkedin } from "lucide-react";

import { useTemplateData } from "../TemplateContext";
export function Footer() {
  const { brand, navLinks, openingHours } = useTemplateData();

  return (
    <footer id="contact" className="bg-charcoal px-6 py-20 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <span className="font-display text-3xl font-bold tracking-tight text-white">
              {brand.name}
            </span>
          </a>
          <p className="mt-6 max-w-sm font-sans text-sm leading-[1.7] text-white/70">
            {brand.tagline}
          </p>
          <div className="mt-8 flex gap-4">
            {[Instagram, Facebook, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#top"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white hover:text-charcoal"
                aria-label="Social profile"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-[0.15em] text-white/50">
            Quick links
          </h3>
          <ul className="mt-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-sans text-sm text-white/80 transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-[0.15em] text-white/50">
            Visit
          </h3>
          <address className="mt-6 not-italic font-sans text-sm leading-[1.7] text-white/80">
            {brand.address}
            <br />
            {brand.phone}
            <br />
            {brand.email}
          </address>
        </div>

        <div>
          <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-[0.15em] text-white/50">
            Opening hours
          </h3>
          <ul className="mt-6 space-y-4 font-sans text-sm text-white/80">
            {openingHours.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 font-sans text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 {brand.name}. All rights reserved.</p>
        <p>Private showroom appointments available by request.</p>
      </div>
    </footer>
  );
}
