"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

const themeStyles = {} as React.CSSProperties;

export default function FarmShopWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  // Initialize Lenis or GSAP if needed here globally for this template

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="fresh-market-template min-h-screen w-full flex flex-col bg-[#FDFBF7] text-[#1E201E] font-sans selection:bg-[#E3E8CD] selection:text-[#1E201E] overflow-hidden">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
