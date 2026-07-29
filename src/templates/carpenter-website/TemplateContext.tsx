"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaultData from './editable.json';

type EditableData = typeof defaultData;

const TemplateContext = createContext<EditableData>(defaultData);

interface TemplateProviderProps {
  children: ReactNode;
  data?: TemplateData;
}

export function TemplateProvider({ children, data }: TemplateProviderProps) {
  const mergedData = mergeTemplateData(defaultData, data) as EditableData;
  return (
    <TemplateContext.Provider value={mergedData}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplateData() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplateData must be used within a TemplateProvider');
  }
  return context;
}
