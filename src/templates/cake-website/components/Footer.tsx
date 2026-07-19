"use client";
import { Instagram, Pin } from "lucide-react";

import { useTemplateData } from "../TemplateContext";
export function Footer() {
  const { brand, navLinks, openingHours } = useTemplateData();

  return (
    <footer id="contact" className="border-t border-[#F0F0F0] bg-white px-5 py-16 text-ganache lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr_1fr_0.9fr]">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-ganache font-display text-lg font-semibold text-cream shadow-card">
              VC
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl font-semibold">
                {brand.name}
              </span>
              <span className="mt-1 block text-[11px] font-black uppercase tracking-[0.24em] text-cocoa">
                Cake atelier
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#2D2D2D]">
            {brand.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Pin, label: "Pinterest" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#top"
                className="grid h-10 w-10 place-items-center rounded-full border border-chocolate/15 text-ganache transition hover:-translate-y-0.5 hover:border-rose/40 hover:bg-[#FFFBF7] hover:text-rose"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.22em] text-rose">
            Quick links
          </h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[15px] text-[#2D2D2D] transition hover:text-rose">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.22em] text-rose">
            Visit
          </h3>
          <address className="mt-5 not-italic text-[15px] leading-7 text-[#2D2D2D]">
            {brand.address}
            <br />
            {brand.phone}
            <br />
            {brand.email}
          </address>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.22em] text-rose">
            Opening hours
          </h3>
          <ul className="mt-5 space-y-3 text-[15px] text-[#2D2D2D]">
            {openingHours.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-[#F0F0F0] pt-6 text-[13px] text-[#2D2D2D]/75 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 {brand.name}. All rights reserved.</p>
        <p>Custom cake consultations available by appointment.</p>
      </div>
    </footer>
  );
}
