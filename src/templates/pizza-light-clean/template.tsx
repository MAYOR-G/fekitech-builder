"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import PremiumFoodTemplate, { type PremiumFoodData } from "../_premium-food/PremiumFoodTemplate";
import editableData from "./editable.json";

export default function PizzaLightCleanTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as unknown as PremiumFoodData;
  return <PremiumFoodTemplate data={content} variant="pizza-light" />;
}
