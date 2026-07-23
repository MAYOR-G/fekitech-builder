"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import PremiumServiceTemplate, { type PremiumServiceData } from "../_premium-service/PremiumServiceTemplate";
import editableData from "./editable.json";

export default function PlumbingCompanyPremiumTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as unknown as PremiumServiceData;
  return <PremiumServiceTemplate data={content} variant="plumbing" />;
}
