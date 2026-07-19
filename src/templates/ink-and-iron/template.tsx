"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

const themeStyles = {
  "--color-charcoal": "#141414",
  "--color-deep-black": "#0A0A0A",
  "--color-gold": "#C9A84C",
  "--color-blood": "#8B2635",
  "--color-off-white": "#F5F5F5",
  "--color-muted-gray": "#6B6B6B",
  "--font-display": "var(--font-anton), sans-serif",
  "--font-sans": "var(--font-inter), sans-serif",
  "--background": "#0A0A0A",
  "--foreground": "#F5F5F5"
} as React.CSSProperties;

export default function InkAndIronTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
