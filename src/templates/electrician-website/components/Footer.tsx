"use client";

import { useTemplateData } from "../TemplateContext";
export function Footer() {
  const { brand, footerLinks, serviceAreas } = useTemplateData();

  return (
    <footer className="border-t border-line bg-white px-5 py-12 text-ink lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr]">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-[-0.05em] text-navy">
            {brand.name}
          </p>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-steel/70">
            {brand.tagline}
          </p>
          <p className="mt-5 inline-flex rounded-xl bg-mist px-3 py-2 text-sm font-black text-cobalt">
            Emergency: {brand.emergencyPhone}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cobalt">
            Quick links
          </p>
          <div className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="block text-sm font-bold text-steel/70 transition hover:text-cobalt"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cobalt">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm font-bold leading-6 text-steel/70">
            <p>{brand.phone}</p>
            <p>{brand.email}</p>
            <p>{brand.address}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cobalt">
            Service areas
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {serviceAreas.slice(0, 6).map((area) => (
              <span
                key={area}
                className="rounded-full border border-line bg-cloud px-3 py-1.5 text-xs font-black text-steel"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-line pt-6 text-xs font-bold text-steel/56 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 VoltEdge Electrical. All rights reserved.</p>
        <p>{brand.hours}</p>
      </div>
    </footer>
  );
}
