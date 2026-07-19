"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

const themeStyles = {
  "--color-forest-900": "#1a3c2f",
  "--color-forest-800": "#2d5a4a",
  "--color-forest-700": "#3f7865",
  "--color-gold-500": "#d4af37",
  "--color-gold-400": "#e6c555",
  "--color-gold-600": "#b5952f",
  "--color-cream": "#fbfbf9",
  "--color-charcoal": "#1f2937",
  "--color-offwhite": "#faf8f5",
  "--font-serif": "\"Cormorant Garamond\", serif",
  "--font-sans": "\"Inter\", sans-serif"
} as React.CSSProperties;

export default function AccountancyWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
