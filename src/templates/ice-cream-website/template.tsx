"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useMemo } from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

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
      <div style={themeStyles} className="minted-scoop-template min-h-screen w-full overflow-hidden">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
