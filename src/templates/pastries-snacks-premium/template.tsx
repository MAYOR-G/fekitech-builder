"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import { TemplateProvider, type PastriesTemplateData } from "./TemplateContext";
import Main from "./Main";

export default function PastriesSnacksWebsiteTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as unknown as PastriesTemplateData;
  return (
    <TemplateProvider data={content}>
      <Main />
    </TemplateProvider>
  );
}
