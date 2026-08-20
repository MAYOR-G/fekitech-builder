"use client";
import React, { createContext, useContext } from "react";
import editableData from "./editable.json";

export type TemplateData = typeof editableData;

export const TemplateContext = createContext<TemplateData>(editableData);

export function useTemplateData() {
  return useContext(TemplateContext);
}

export function TemplateProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TemplateData;
}) {
  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
}
