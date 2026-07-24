"use client";

import React, { createContext, useContext } from "react";
import type { PremiumHospitalityData } from "../_premium-hospitality/PremiumHospitalityTemplate";

const TemplateContext = createContext<PremiumHospitalityData | null>(null);

export function TemplateProvider({ data, children }: { data: PremiumHospitalityData; children: React.ReactNode }) {
  return <TemplateContext.Provider value={data}>{children}</TemplateContext.Provider>;
}

export function useTemplateData() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplateData must be used within a TemplateProvider");
  }
  return context;
}
