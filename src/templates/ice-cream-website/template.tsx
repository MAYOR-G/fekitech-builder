"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useMemo } from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";
import { Pacifico, Nunito } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"], variable: "--font-pacifico" });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "900"], variable: "--font-nunito" });

export default function IceCreamWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  const themeStyles = useMemo(() => {
    return {
      "--color-primary": templateData.brand.colors.primary,
      "--color-secondary": templateData.brand.colors.secondary,
      "--color-bg": templateData.brand.colors.background,
      "--color-text": templateData.brand.colors.text,
    } as React.CSSProperties;
  }, [templateData]);

  return (
    <TemplateContext.Provider value={templateData}>
      <div 
        style={themeStyles} 
        className={`${pacifico.variable} ${nunito.variable} template-wrapper min-h-screen w-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] font-nunito selection:bg-[var(--color-primary)] selection:text-white overflow-hidden`}
      >
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
