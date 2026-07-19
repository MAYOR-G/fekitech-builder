"use client";
import { Instagram, Pin } from "lucide-react";

import { useTemplateData } from "../TemplateContext";
const socialIcons = {
  Instagram,
  Pinterest: Pin,
};

export function Footer() {
  const { brand, footerLinks, socialLinks } = useTemplateData();

  return (
    <footer id="contact" className="border-t border-oat bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.95fr_0.95fr]">
        <div>
          <p className="font-display text-3xl font-semibold text-charcoal">
            {brand.name}
          </p>
          <p className="mt-4 max-w-sm text-base leading-7 text-ink">
            {brand.tagline}
          </p>
          <p className="mt-5 text-sm font-bold text-olive">{brand.instagram}</p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
            Quick links
          </p>
          <div className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="block text-sm font-bold text-ink transition hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm font-bold leading-6 text-ink">
            <p>{brand.phone}</p>
            <p>{brand.email}</p>
            <p>{brand.address}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
            Hours and social
          </p>
          <p className="mt-4 text-sm font-bold leading-6 text-ink">
            {brand.hours}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks
              .filter((link) => link.label in socialIcons)
              .map((link) => {
                const Icon = socialIcons[link.label as keyof typeof socialIcons];
                return (
              <a
                key={link.label}
                href={link.href}
                className="grid h-10 w-10 place-items-center rounded-md border border-oat text-charcoal transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                aria-label={link.label}
              >
                <Icon className="h-4 w-4" />
              </a>
                );
              })}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-oat pt-6 text-xs font-bold text-olive sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 {brand.name}. All rights reserved.</p>
        <p>Service areas: New York, Brooklyn, Chicago, London, Manchester.</p>
      </div>
    </footer>
  );
}
