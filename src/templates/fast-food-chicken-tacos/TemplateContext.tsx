"use client";

import React, { createContext, useContext } from "react";

export type FastFoodTemplateData = {
  colors: { primary: string; secondary: string; background: string; text: string };
  brand: { name: string; tagline: string; logo: string; phone: string; email: string; address: string };
  navigation: { links: Array<{ label: string; href: string }> };
  hero: { headline: string; subheadline: string; description: string; cta: string; ctaLink: string; images: string[] };
  products: { title?: string; description?: string; subtitle: string; buttonLabel: string; buttonHref: string; items: Array<{ name: string; price: string; image: string; description?: string; imageAlt?: string }> };
  feature: { title: string; description: string; image: string; imageAlt: string; buttonLabel: string; buttonHref: string };
  gallery: { rowOne: Array<{ image: string; imageAlt: string }>; rowTwo: Array<{ image: string; imageAlt: string }> };
  testimonials: { title: string; description: string; items: Array<{ quote: string; name: string; detail: string }> };
  social: { instagramHref: string; facebookHref: string; tiktokHref: string };
  footer: { title: string; description: string; buttonLabel: string; copyright: string };
};

const TemplateContext = createContext<FastFoodTemplateData | null>(null);

export function TemplateProvider({ data, children }: { data: FastFoodTemplateData; children: React.ReactNode }) {
  return <TemplateContext.Provider value={data}>{children}</TemplateContext.Provider>;
}

export function useTemplateData() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplateData must be used within a TemplateProvider");
  }
  return context;
}
