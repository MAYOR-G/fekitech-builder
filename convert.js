const fs = require('fs');

let html = fs.readFileSync('../MY TEMPLATE/index.html@storefront=envato-elements.html', 'utf8');

// Extract everything inside <body>...</body>
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  html = bodyMatch[1];
}

// Convert class to className
html = html.replace(/class="/g, 'className="');
// Convert for to htmlFor
html = html.replace(/for="/g, 'htmlFor="');

// Fix inline styles
html = html.replace(/style="([^"]*)"/g, (match, p1) => {
  const rules = p1.split(';').filter(r => r.trim());
  const styleObj = {};
  rules.forEach(r => {
    const [key, val] = r.split(':');
    if (key && val) {
      const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      styleObj[camelKey] = val.trim();
    }
  });
  return `style={${JSON.stringify(styleObj)}}`;
});

// Self-close tags
const selfClosing = ['img', 'input', 'br', 'hr', 'meta', 'link', 'source'];
selfClosing.forEach(tag => {
  const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
  html = html.replace(regex, `<${tag}$1 />`);
});

// Remove comments
html = html.replace(/<!--[\s\S]*?-->/g, '');

const component = `
"use client";
import React from 'react';
import { useTemplateData } from './TemplateContext';

export default function Main() {
  const data = useTemplateData();

  return (
    <>
      <link href="https://html.designingmedia.com/roofora/assets/bootstrap/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <link href="https://html.designingmedia.com/roofora/assets/css/style.css" rel="stylesheet" type="text/css" />
      <link href="https://html.designingmedia.com/roofora/assets/css/responsive.css" rel="stylesheet" type="text/css" />
      <link href="https://html.designingmedia.com/roofora/assets/css/owl.carousel.min.css" rel="stylesheet" type="text/css" />
      <link href="https://html.designingmedia.com/roofora/assets/css/owl.theme.default.min.css" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" href="https://html.designingmedia.com/roofora/assets/css/animate.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css" />
      ${html}
    </>
  );
}
`;

fs.writeFileSync('src/templates/roofing-agency-new/Main.tsx', component);
console.log('Done!');
