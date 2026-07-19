"use client";
import { isTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import Main from "./Main";

const themeStyles = {} as React.CSSProperties;

// editable.json wraps content under `siteContent` for legacy reasons; flatten it so
// `useTemplateData()` returns the inner hero/about/services/etc. directly.
const baseData = editableData.siteContent ?? editableData;

export default function CoffeeWebsiteTemplate({ data }: { data: TemplateData }) {
  const overrides = isTemplateData(data.siteContent) ? data.siteContent : data;
  const templateData = { ...baseData, ...overrides };

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
