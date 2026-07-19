"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

const themeStyles = {
  "--font-serif": "var(--font-serif)",
  "--font-sans": "var(--font-sans)",
  "--color-brand-bg": "var(--color-brand-bg)",
  "--color-brand-text": "var(--color-brand-text)",
  "--color-brand-accent": "var(--color-brand-accent)",
  "--color-brand-surface": "var(--color-brand-surface)"
} as React.CSSProperties;

export default function OakAndIvoryBarbersTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
