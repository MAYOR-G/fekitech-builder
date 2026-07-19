"use client";
import { Menu, PhoneCall, X, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function Navbar() {
  const { brand, navLinks } = useTemplateData();

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/86 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-cobalt text-white shadow-blue">
            <Zap className="h-5 w-5 fill-white" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-xl font-extrabold tracking-[-0.04em] text-navy">
              {brand.name}
            </span>
            <span className="mt-1 hidden text-[11px] font-black uppercase tracking-[0.18em] text-cobalt sm:block">
              Licensed electrical contractors
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-extrabold text-steel/76 transition hover:text-cobalt"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="tel:+13125550119" variant="yellow" className="min-h-11">
            Emergency Call
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-navy transition hover:border-cobalt/30 lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-line bg-white transition-all duration-300 lg:hidden",
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
                className="block rounded-xl px-4 py-3 text-[15px] font-extrabold text-steel/80 transition hover:bg-mist hover:text-cobalt"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+13125550119"
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-safety px-5 text-[15px] font-extrabold text-navy"
            >
              <PhoneCall className="h-4 w-4" />
              Emergency Call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
