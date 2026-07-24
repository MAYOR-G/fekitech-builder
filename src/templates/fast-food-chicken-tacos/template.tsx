"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import type { PremiumHospitalityData } from "../_premium-hospitality/PremiumHospitalityTemplate";
import editableData from "./editable.json";
import { TemplateProvider } from "./TemplateContext";
import Main from "./Main";

export default function FastFoodWebsiteTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as unknown as PremiumHospitalityData;
  return (
    <TemplateProvider data={content}>
      <Main />
    </TemplateProvider>
  );
}
