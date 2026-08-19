"use client";

import { createContext, useContext } from "react";
import type { TemplateData } from "@/lib/template-data";

export type LocalTemplateData = TemplateData & {
  brand?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  navLinks?: Array<{ label: string; href: string }>;
  hero?: {
    title?: string;
    subtitle?: string;
    cta?: string;
    image?: string;
  };
  about?: {
    tagline?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  programs?: {
    title?: string;
    items?: Array<{
      title: string;
      description: string;
      image: string;
    }>;
  };
  footer?: {
    text?: string;
    social?: Array<{ name: string; href: string }>;
  };
};

const TemplateContext = createContext<LocalTemplateData | null>(null);

export function TemplateProvider({ children, value }: { children: React.ReactNode; value: LocalTemplateData }) {
  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
}

export function useTemplateData() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplateData must be used within a TemplateProvider");
  }
  return context;
}
