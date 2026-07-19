"use client";
import { bindTemplateContent } from "@/lib/template-data";
import { createContext, useContext } from "react";
import editableData from "./editable.json";
import * as staticContent from "./lib/content";

const defaultContent = bindTemplateContent(staticContent, editableData);

export const TemplateContext = createContext(defaultContent);

export function useTemplateData() {
  return useContext(TemplateContext);
}
