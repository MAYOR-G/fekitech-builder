"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import editableData from './editable.json';

type TemplateData = typeof editableData;

const TemplateContext = createContext<TemplateData | null>(null);

export const TemplateProvider = ({ children, data = editableData }: { children: ReactNode, data?: Partial<TemplateData> }) => {
  const mergedData = { ...editableData, ...data } as TemplateData;
  return (
    <TemplateContext.Provider value={mergedData}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplateData = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplateData must be used within a TemplateProvider');
  }
  return context;
};
