"use client";
import { bindTemplateContent, mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import * as staticContent from "./lib/content";
import Main from "./Main";

const themeStyles = {
  "--color-berry": "#9b4b6b",
  "--color-blush": "#f4e7ec",
  "--color-charcoal": "#2c2c2c",
  "--color-ivory": "#faf8f6",
  "--color-rose-gold": "#c9a19c",
  "--color-muted": "#7a7a7a",
  "--font-serif": "\"Cormorant Garamond\"",
  "--font-sans": "\"Inter\"",
  "--berry": "#9b4b6b",
  "--blush": "#f4e7ec",
  "--charcoal": "#2c2c2c",
  "--ivory": "#faf8f6",
  "--rose-gold": "#c9a19c",
  "--muted": "#7a7a7a",
  "--white": "#ffffff",
  "--font-cormorant": "\"Cormorant Garamond\"",
  "--font-inter": "\"Inter\""
} as React.CSSProperties;

export default function PremiumNailTechnicianWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = bindTemplateContent(staticContent, mergeTemplateData(editableData, data));

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
