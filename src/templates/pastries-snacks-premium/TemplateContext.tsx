"use client";

import React, { createContext, useContext } from "react";

export type PastriesTemplateData = {
  colors: { primary: string; secondary: string; background: string; text: string };
  brand: { name: string; tagline: string; logo: string; phone: string; email: string; address: string };
  navigation: { links: Array<{ label: string; href: string }>; ctaLabel?: string; ctaHref?: string; };
  hero: { note: string; title: string; description: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string; image: string; imageAlt: string; badge: string };
  products: { title: string; description: string; items: Array<{ name: string; description: string; price: string; image: string; imageAlt: string }> };
  feature: { note: string; title: string; description: string; image: string; imageAlt: string; buttonLabel: string; buttonHref: string };
  process: { title: string; description: string; steps: Array<{ title: string; description: string }> };
  gallery: { title: string; description: string; rowOne: Array<{ image: string; imageAlt: string; caption: string }>; rowTwo: Array<{ image: string; imageAlt: string; caption: string }> };
  social: { instagram: string; instagramHref: string; facebook: string; facebookHref: string; tiktok: string; tiktokHref: string };
  footer: { note: string; copyright: string };
  packages?: { title: string; description: string; items: Array<{ name: string; description: string; price: string; note: string; features: string[]; buttonLabel: string; buttonHref: string }> };
  visit?: { title: string; description: string; areasLabel: string; areas: string[]; hours: Array<{ day: string; time: string }>; primaryLabel: string; primaryHref: string; };
};

const TemplateContext = createContext<PastriesTemplateData | null>(null);

export function TemplateProvider({ data, children }: { data: PastriesTemplateData; children: React.ReactNode }) {
  return <TemplateContext.Provider value={data}>{children}</TemplateContext.Provider>;
}

export function useTemplateData() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplateData must be used within a TemplateProvider");
  }
  return context;
}
