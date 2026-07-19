"use client";
import { bindTemplateContent, mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import * as staticContent from "./data/siteContent";
import Main from "./Main";

const themeStyles = {
  "--magnet-x": "0px",
  "--magnet-y": "0px"
} as React.CSSProperties;

export default function DentistWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = bindTemplateContent(staticContent, mergeTemplateData(editableData, data));

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        <Main />
      </div>
    </TemplateContext.Provider>
  );
}
