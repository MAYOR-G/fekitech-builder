"use client";
import { Flame, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function Navbar() {
  const { brand, navLinks } = useTemplateData();

  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-coal/28">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ember text-coal shadow-ember">
            <Flame className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl font-semibold text-cream">
              {brand.name}
            </span>
            <span className="mt-1 hidden text-[11px] font-black uppercase tracking-[0.22em] text-sage sm:block">
              Seasonal British dining
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-bold text-cream/68 transition hover:text-ember"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="#reservation" className="min-h-11 px-5">
            Reserve a Table
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/14 bg-cream/[0.06] text-cream transition hover:bg-cream/[0.1] lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-cream/10 bg-coal/96 transition-all duration-300 lg:hidden",
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
                className="block rounded-full px-4 py-3 text-[15px] font-bold text-cream/76 transition hover:bg-cream/[0.08] hover:text-ember"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink href="#reservation" className="mt-2 w-full">
              Reserve a Table
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
