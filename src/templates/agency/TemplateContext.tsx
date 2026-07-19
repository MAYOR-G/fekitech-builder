"use client";
import { createContext, useContext } from "react";
import editableData from "./editable.json";

export const TemplateContext = createContext(editableData);
export function useTemplateData() {
  return useContext(TemplateContext);
}
