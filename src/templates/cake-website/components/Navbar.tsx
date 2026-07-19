"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function Navbar() {
  const { brand, navLinks } = useTemplateData();

  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      const hero = document.querySelector<HTMLElement>("#top");
      const trigger = hero ? hero.offsetHeight - 24 : 80;
      setPastHero(window.scrollY > trigger);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,opacity,transform] duration-500 ease-out",
        pastHero || open
          ? "translate-y-0 border-b border-black/[0.04] bg-[#FFFBF7] opacity-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          : "-translate-y-1 border-b border-transparent bg-transparent opacity-100 shadow-none"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ganache font-display text-lg font-semibold text-cream shadow-card">
            VC
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold tracking-wide text-ganache">
              {brand.name}
            </span>
            <span className="mt-1 hidden text-[11px] font-black uppercase tracking-[0.24em] text-cocoa/80 sm:block">
              Cake atelier
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-extrabold text-chocolate/76 transition hover:text-ganache"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="#order" className="min-h-11 px-5">
            Start an Order
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-chocolate/15 bg-white/75 text-ganache transition hover:-translate-y-0.5 hover:bg-white lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-chocolate/10 bg-[#FFFBF7] transition-all duration-300 lg:hidden",
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
                className="block rounded-full px-4 py-3 text-[15px] font-extrabold text-chocolate/78 transition hover:bg-white/70 hover:text-ganache"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink href="#order" className="mt-2 w-full">
              Start an Order
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
