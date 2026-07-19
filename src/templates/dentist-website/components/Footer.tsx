"use client";
import { Mail, MapPin, Phone } from "lucide-react";

import { useTemplateData } from "../TemplateContext";
export function Footer() {
  const { brand, navLinks } = useTemplateData();

  return (
    <footer className="bg-ink px-5 py-12 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 border-b border-white/12 pb-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <a href="#top" className="inline-flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-mint font-display text-xl font-semibold text-ink">
              L
            </span>
            <span>
              <span className="block font-display text-2xl font-semibold">
                {brand.name}
              </span>
              <span className="mt-1 block text-sm text-white/62">
                {brand.tagline}
              </span>
            </span>
          </a>
          <p className="mt-6 max-w-md text-base leading-8 text-white/68">
            Premium private dentistry with preventive, cosmetic, restorative,
            and urgent care pathways in one polished website template.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-mint">
            Navigate
          </h3>
          <nav className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/68 transition hover:text-white focus:outline-none focus-visible:rounded-full focus-visible:ring-4 focus-visible:ring-white/20"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div id="contact">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-mint">
            Contact
          </h3>
          <div className="mt-5 space-y-4 text-sm text-white/70">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
              {brand.address}
            </p>
            <a
              href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`}
              className="flex gap-3 transition hover:text-white focus:outline-none focus-visible:rounded-full focus-visible:ring-4 focus-visible:ring-white/20"
            >
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
              {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="flex gap-3 transition hover:text-white focus:outline-none focus-visible:rounded-full focus-visible:ring-4 focus-visible:ring-white/20"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
              {brand.email}
            </a>
            <p>{brand.hours}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 pt-8 text-sm text-white/54 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        <p>Frontend template only. Replace content and clinical imagery before launch.</p>
      </div>
    </footer>
  );
}
