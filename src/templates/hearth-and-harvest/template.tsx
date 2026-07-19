"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

const themeStyles = {
  "--color-brand-dark": "#0F0F0F",
  "--color-brand-light": "#F5F0E8",
  "--color-brand-accent": "#C84B31",
  "--color-brand-green": "#2d4a22",
  "--color-brand-white": "#FFFFFF",
  "--color-brand-gray": "#8A8A8A",
  "--font-sans": "var(--font-inter)",
  "--font-heading": "var(--font-bebas)",
  "--font-script": "var(--font-playfair)",
  "--animate-marquee": "marquee 25s linear infinite",
  "--background": "var(--color-brand-dark)",
  "--foreground": "var(--color-brand-white)"
} as React.CSSProperties;

export default function HearthAndHarvestTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
