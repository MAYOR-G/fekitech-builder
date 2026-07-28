"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import { TemplateProvider, type FastFoodTemplateData } from "./TemplateContext";
import Main from "./Main";

export default function FastFoodWebsiteTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as unknown as FastFoodTemplateData;
  return (
    <TemplateProvider data={content}>
      <Main />
    </TemplateProvider>
  );
}
