"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

const themeStyles = {
  "--color-brand-mauve": "#FF3366",
  "--color-brand-plum": "#7B3B4A",
  "--color-brand-cream": "#FAF7F5",
  "--color-brand-charcoal": "#1A1A1A",
  "--color-brand-gray": "#6B6B6B",
  "--color-brand-gold": "#D4AF37",
  "--font-serif": "var(--font-playfair)",
  "--font-sans": "var(--font-inter)",
  "--background": "#ffffff",
  "--foreground": "#1A1A1A"
} as React.CSSProperties;

export default function SecondSalonWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
