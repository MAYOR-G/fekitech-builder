"use client";
import { createContext, useContext } from "react";
import editableData from "./editable.json";

export const TemplateContext = createContext<typeof editableData>(editableData);

export function useTemplateData() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplateData must be used within a TemplateProvider");
  }
  return context;
}
