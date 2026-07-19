"use client";
import { bindTemplateContent, mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import * as staticContent from "./lib/content";
import Main from "./Main";

const themeStyles = {
  "--color-mauve": "#d4a5a5",
  "--color-plum": "#111111",
  "--color-blush": "#fdf8f8",
  "--color-charcoal": "#1a1a1a",
  "--color-ivory": "#ffffff",
  "--color-gold": "#c9a08c",
  "--color-muted": "#6b6b6b",
  "--color-line": "#e8e8e8",
  "--font-serif": "\"Playfair Display\"",
  "--font-sans": "\"Inter\"",
  "--mauve": "#d4a5a5",
  "--plum": "#111111",
  "--blush": "#fdf8f8",
  "--charcoal": "#1a1a1a",
  "--ivory": "#ffffff",
  "--gold": "#c9a08c",
  "--muted": "#6b6b6b",
  "--line": "#e8e8e8",
  "--white": "#ffffff",
  "--font-playfair": "\"Playfair Display\"",
  "--font-inter": "\"Inter\""
} as React.CSSProperties;

export default function PremiumLashTechnicianWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = bindTemplateContent(staticContent, mergeTemplateData(editableData, data));

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
