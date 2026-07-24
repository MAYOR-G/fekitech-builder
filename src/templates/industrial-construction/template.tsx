import React from 'react';
import { TemplateProvider } from './TemplateContext';
import Main from './Main';

import { TemplateData } from '@/lib/template-data';

export default function Template({ data }: { data: TemplateData }) {
  return (
    <TemplateProvider data={data}>
      <Main />
    </TemplateProvider>
  );
}
