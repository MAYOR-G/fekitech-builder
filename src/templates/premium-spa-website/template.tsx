"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

const themeStyles = {
  "--color-brand-sage": "#7A9E7A",
  "--color-brand-forest": "#3D5A4C",
  "--color-brand-sand": "#E5D3B3",
  "--color-brand-white": "#FFFFFF",
  "--color-brand-linen": "#F7F5F0",
  "--color-brand-stone": "#E8E4DE",
  "--color-brand-charcoal": "#2C332E",
  "--color-brand-muted": "#7A8B7A",
  "--font-serif": "var(--font-cormorant)",
  "--font-sans": "var(--font-inter)"
} as React.CSSProperties;

export default function PremiumSpaWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
