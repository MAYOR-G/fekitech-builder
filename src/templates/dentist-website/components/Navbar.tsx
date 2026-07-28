"use client";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function Navbar() {
  const { brand, navLinks } = useTemplateData();

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-bright-dental-ink/8 bg-bright-dental-porcelain/82 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-bright-dental-ocean font-bright-dental-display text-xl font-semibold text-white shadow-glow">
            L
          </span>
          <span className="leading-none">
            <span className="block font-bright-dental-display text-xl font-semibold text-bright-dental-ink">
              {brand.name}
            </span>
            <span className="mt-1 hidden text-[11px] font-bold uppercase tracking-[0.24em] text-bright-dental-mist sm:block">
              {brand.tagline}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-bright-dental-graphite/72 transition hover:text-bright-dental-ink focus:outline-none focus-visible:rounded-full focus-visible:ring-4 focus-visible:ring-bright-dental-ocean/18"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-bright-dental-ink/10 bg-white/68 px-4 text-sm font-semibold text-bright-dental-ink transition hover:border-bright-dental-ocean/25 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-bright-dental-ocean/18"
          >
            <Phone className="h-4 w-4 text-bright-dental-ocean" aria-hidden="true" />
            {brand.phone}
          </a>
          <ButtonLink href="#appointment" className="min-h-11 px-5">
            Book
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-bright-dental-ink/12 bg-white/76 text-bright-dental-ink transition hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-bright-dental-ocean/18 lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-bright-dental-ink/8 bg-bright-dental-porcelain/96 transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div className="space-y-2 px-5 pb-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-full px-4 py-3 text-sm font-semibold text-bright-dental-graphite transition hover:bg-white hover:text-bright-dental-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-bright-dental-ocean/18"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink
              href="#appointment"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Book an Appointment
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
