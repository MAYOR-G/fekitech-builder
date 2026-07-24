import React from 'react';
import { TemplateProvider } from './TemplateContext';
import Main from './Main';

export default function CarpenterWebsiteTemplate({ data }: { data?: any }) {
  return (
    <TemplateProvider data={data}>
      <Main />
    </TemplateProvider>
  );
}
