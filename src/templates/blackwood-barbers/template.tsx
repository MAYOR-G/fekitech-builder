"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

// Theme variables (--font-sans, --color-brand-bg, etc.) are defined in ./index.css
// under @layer theme / @theme, which wires them to Tailwind utilities (bg-brand-bg,
// text-brand-text, font-sans, etc.) applied via .template-wrapper. No inline styles needed.

export default function BlackwoodBarbersTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  return (
    <TemplateContext.Provider value={templateData}>
      <div className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
