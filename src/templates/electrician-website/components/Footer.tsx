"use client";

import { useTemplateData } from "../TemplateContext";
export function Footer() {
  const { brand, footerLinks, serviceAreas } = useTemplateData();

  return (
    <footer className="border-t border-spark-electric-line bg-white px-5 py-12 text-spark-electric-ink lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr]">
        <div>
          <p className="font-spark-electric-display text-3xl font-extrabold tracking-[-0.05em] text-spark-electric-navy">
            {brand.name}
          </p>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-spark-electric-steel/70">
            {brand.tagline}
          </p>
          <p className="mt-5 inline-flex rounded-xl bg-spark-electric-mist px-3 py-2 text-sm font-black text-spark-electric-cobalt">
            Emergency: {brand.emergencyPhone}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-spark-electric-cobalt">
            Quick links
          </p>
          <div className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="block text-sm font-bold text-spark-electric-steel/70 transition hover:text-spark-electric-cobalt"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-spark-electric-cobalt">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm font-bold leading-6 text-spark-electric-steel/70">
            <p>{brand.phone}</p>
            <p>{brand.email}</p>
            <p>{brand.address}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-spark-electric-cobalt">
            Service areas
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {serviceAreas.slice(0, 6).map((area) => (
              <span
                key={area}
                className="rounded-full border border-spark-electric-line bg-spark-electric-cloud px-3 py-1.5 text-xs font-black text-spark-electric-steel"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-spark-electric-line pt-6 text-xs font-bold text-spark-electric-steel/56 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 VoltEdge Electrical. All rights reserved.</p>
        <p>{brand.hours}</p>
      </div>
    </footer>
  );
}
