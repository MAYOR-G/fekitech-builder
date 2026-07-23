"use client";
import { Menu, UtensilsCrossed, X } from "lucide-react";
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
      const trigger = hero ? hero.offsetHeight - 16 : 80;
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

  const solid = pastHero || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        solid
          ? "border-b border-oat bg-white/96 text-charcoal shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur"
          : "border-b border-oat/80 bg-[#fbfaf6]/92 text-charcoal backdrop-blur"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full shadow-card transition-colors duration-300",
              solid ? "bg-charcoal text-cream" : "bg-olive text-white"
            )}
          >
            <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold text-charcoal">
              {brand.name}
            </span>
            <span className="mt-1 hidden text-[11px] font-black uppercase tracking-[0.22em] text-olive sm:block">
              London event catering
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-[15px] font-extrabold transition hover:text-gold",
                "text-ink"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="#contact" className="min-h-11 px-5">
            Book a Consultation
          </ButtonLink>
        </div>

        <button
          type="button"
          className={cn(
            "grid h-11 w-11 place-items-center rounded-md border transition hover:-translate-y-0.5 lg:hidden",
            solid
              ? "border-oat bg-white text-charcoal"
              : "border-oat bg-white text-charcoal"
          )}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-oat bg-white transition-all duration-300 lg:hidden",
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
                className="block rounded-md px-4 py-3 text-[15px] font-extrabold text-ink transition hover:bg-linen hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink href="#contact" className="mt-2 w-full">
              Book a Consultation
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
