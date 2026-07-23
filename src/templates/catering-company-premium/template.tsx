"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import PremiumHospitalityTemplate, { type PremiumHospitalityData } from "../_premium-hospitality/PremiumHospitalityTemplate";
import editableData from "./editable.json";

export default function CateringCompanyPremiumTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as unknown as PremiumHospitalityData;
  return <PremiumHospitalityTemplate data={content} variant="catering" />;
}
