"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useMemo } from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";
import "./styles.css";

export default function VelvetScoopTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  const themeStyles = useMemo(() => ({
    "--template-primary": templateData.brand.colors.primary,
    "--template-secondary": templateData.brand.colors.secondary,
    "--template-accent": templateData.brand.colors.accent,
    "--template-background": templateData.brand.colors.background,
    "--template-text": templateData.brand.colors.text,
    "--template-button-text": templateData.brand.colors.buttonText
  }) as React.CSSProperties, [templateData]);

  return (
    <TemplateContext.Provider value={templateData}>
      <div className="velvet-scoop-template" style={themeStyles}>
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
