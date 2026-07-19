import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const SOURCE_DIR = path.join(process.cwd(), 'raw-templates');
const TARGET_DIR = path.join(process.cwd(), 'src/templates');
const REGISTRY_FILE = path.join(process.cwd(), 'src/registry/index.ts');
const GLOBALS_CSS_FILE = path.join(process.cwd(), 'src/app/globals.css');

const allThemeVars = new Set<string>();

function processTemplate(templateName: string) {
  if (templateName === 'templates' || templateName.startsWith('.')) return;
  console.log(`\nPorting ${templateName}...`);
  
  const srcDir = path.join(SOURCE_DIR, templateName, 'src');
  if (!fs.existsSync(srcDir)) {
    console.log(`Skipping ${templateName} (no src dir)`);
    return;
  }
  
  const targetTemplateDir = path.join(TARGET_DIR, templateName);
  if (!fs.existsSync(targetTemplateDir)) {
    fs.mkdirSync(targetTemplateDir, { recursive: true });
  }

  // 1. Copy data as editable.json
  const siteContentPath = path.join(srcDir, 'data', 'siteContent.ts');
  let editableData = {};
  if (fs.existsSync(siteContentPath)) {
    let content = fs.readFileSync(siteContentPath, 'utf8');
    // Convert unquoted icon references to strings so they serialize cleanly (e.g. icon: Sparkles -> icon: "Sparkles")
    content = content.replace(/icon:\s*([A-Z]\w*)/g, 'icon: "$1"');
    
    // Strip imports, handling multiline
    content = content.replace(/import[\s\S]*?from\s*['"][^'"]+['"];?/g, '');
    content = content.replace(/import\s*['"][^'"]+['"];?/g, '');
    
    // Convert export const siteContent to module.exports
    content = content.replace(/ as const/g, '');
    const tempPath = path.join(process.cwd(), 'scripts', `temp-${templateName}.ts`);
    fs.writeFileSync(tempPath, content);
    try {
      editableData = require(tempPath);
    } catch (e) {
      console.log(`Could not parse data for ${templateName}, creating empty JSON:`, e);
    }
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
  fs.writeFileSync(path.join(targetTemplateDir, 'editable.json'), JSON.stringify(editableData, null, 2));

  // 2. Create config.json
  const config = {
    id: templateName,
    name: templateName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: "Business",
    image: "/templates/" + templateName + ".jpg"
  };
  fs.writeFileSync(path.join(targetTemplateDir, 'config.json'), JSON.stringify(config, null, 2));

  // 3. Extract CSS variables and copy cleaned CSS files
  let themeStyles: Record<string, string> = {};
  let cssFiles = ['index.css', 'App.css', 'app/globals.css', 'globals.css'];
  cssFiles.forEach(cf => {
    let cp = path.join(srcDir, cf);
    if (fs.existsSync(cp)) {
      let content = fs.readFileSync(cp, 'utf8');
      const regex = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        let varName = match[1];
        let varVal = match[2].trim();
        themeStyles[varName] = varVal;
        allThemeVars.add(varName);
      }
      
      // Convert Tailwind v3 directives to v4
      let cleanedCss = content.replace(/@tailwind\s+base;[\s\S]*?@tailwind\s+utilities;/g, '@import "tailwindcss";');

      // Scope body styles to the template wrapper
      cleanedCss = cleanedCss.replace(/\bbody\s*\{/g, '.template-wrapper {');
      
      // Fix arbitrary colors in @apply (Tailwind v4 / LightningCSS bug)
      let changed = true;
      while (changed) {
        let prev = cleanedCss;
        cleanedCss = cleanedCss.replace(/@apply([^;]*?)\s+bg-\[#([a-fA-F0-9]+)\]([^;]*);/g, '@apply$1$3;\n  background-color: #$2;');
        cleanedCss = cleanedCss.replace(/@apply([^;]*?)\s+text-\[#([a-fA-F0-9]+)\]([^;]*);/g, '@apply$1$3;\n  color: #$2;');
        if (prev === cleanedCss) changed = false;
      }
      cleanedCss = cleanedCss.replace(/@apply\s*;/g, '');
      
      // Fix @import ordering for Tailwind v4
      const urlImports: string[] = [];
      cleanedCss = cleanedCss.replace(/@import\s+url\([^)]+\)\s*;/g, (match) => {
        urlImports.push(match.replace(/[\n\r]+/g, ''));
        return '';
      });
      cleanedCss = cleanedCss.replace(/@import\s+['"][^'"]+['"]\s*;/g, (match) => {
        if (!match.includes('tailwindcss')) {
          urlImports.push(match.replace(/[\n\r]+/g, ''));
          return '';
        }
        return match;
      });

      if (urlImports.length > 0) {
        cleanedCss = urlImports.join('\n') + '\n\n' + cleanedCss;
      }
      
      const destPath = path.join(targetTemplateDir, cf.replace('app/', ''));
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, cleanedCss);
    }
  });

  // 4. Copy components
  const componentsSrc = path.join(srcDir, 'components');
  const componentsDest = path.join(targetTemplateDir, 'components');
  if (fs.existsSync(componentsSrc)) {
    if (!fs.existsSync(componentsDest)) fs.mkdirSync(componentsDest, { recursive: true });
    const files = fs.readdirSync(componentsSrc);
    files.forEach(file => {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        let compContent = fs.readFileSync(path.join(componentsSrc, file), 'utf8');
        compContent = compContent.replace(/@\/lib\//g, '../lib/');
        compContent = compContent.replace(/@\/assets\//g, '../assets/');
        compContent = compContent.replace(/@\/components\//g, './');
        compContent = compContent.replace(/@\/data\//g, '../data/');
        compContent = compContent.replace(/@\/hooks\//g, '../hooks/');
        compContent = compContent.replace(/@\/utils\//g, '../utils/');
        compContent = compContent.replace(/import\s+\{[^}]*siteContent[^}]*\}\s+from\s+['"][^'"]+['"];?/g, '');
        
        const originalCompContent = compContent;
        compContent = compContent.replace(/(export (?:default )?function \w+\([^)]*\)\s*\{)/, `$1\n  const siteContent = useTemplateData();\n`);
        
        if (!compContent.includes('"use client"')) {
          compContent = '"use client";\n' + compContent;
        }
        if (compContent !== originalCompContent) {
          compContent = compContent.replace(/("use client";\n?|'use client';\n?)/, `$1import { useTemplateData } from '../TemplateContext';\nimport EditableText from '@/components/editor/blocks/EditableText';\n`);
        }
        compContent = compContent.replace(/\{siteContent\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\}/g, (match, section, field) => {
          return `<EditableText section="${section}" field="${field}" value={siteContent?.${section}?.${field}} as="span" />`;
        });
        fs.writeFileSync(path.join(componentsDest, file), compContent);
      }
    });
  }

  // 5. Copy other dirs
  ['assets', 'data', 'lib', 'utils', 'hooks'].forEach(dir => {
    const dSrc = path.join(srcDir, dir);
    const dDest = path.join(targetTemplateDir, dir);
    if (fs.existsSync(dSrc)) {
      fs.cpSync(dSrc, dDest, { recursive: true });
    }
  });

  // 6. Find and port Main component
  let mainFileSrc = '';
  ['App.tsx', 'App.jsx', 'app/page.tsx', 'pages/index.tsx'].forEach(f => {
    if (fs.existsSync(path.join(srcDir, f)) && !mainFileSrc) {
      mainFileSrc = path.join(srcDir, f);
    }
  });

  if (mainFileSrc) {
    let mainContent = fs.readFileSync(mainFileSrc, 'utf8');
    
    // Fix imports
    mainContent = mainContent.replace(/@\/lib\//g, './lib/');
    mainContent = mainContent.replace(/@\/assets\//g, './assets/');
    mainContent = mainContent.replace(/@\/components\//g, './components/');
    mainContent = mainContent.replace(/@\/data\//g, './data/');
    mainContent = mainContent.replace(/@\/hooks\//g, './hooks/');
    mainContent = mainContent.replace(/@\/utils\//g, './utils/');
    mainContent = mainContent.replace(/from\s+['"]\.\.\/components/g, 'from "./components');
    
    if (!mainContent.includes('"use client"')) {
       mainContent = '"use client";\n' + mainContent;
    }
    
    // Convert named exports of Main to default export if necessary
    if (!mainContent.includes('export default') && mainContent.includes('export function Main')) {
      mainContent = mainContent.replace('export function Main', 'export default function Main');
    } else if (!mainContent.includes('export default') && mainContent.includes('export const Main')) {
      mainContent += '\nexport default Main;\n';
    }
    // Inject imports if not present
    if (!mainContent.includes('useTemplateData')) {
      mainContent = `import { useTemplateData } from './TemplateContext';\n` + mainContent;
    }
    if (!mainContent.includes('EditableText')) {
      mainContent = `import { EditableText } from '@/components/editable/EditableText';\n` + mainContent;
    }
    
    // Ensure "use client" is at the absolute top of the file
    mainContent = mainContent.replace(/['"]use client['"];?\s*/g, '');
    mainContent = `"use client";\n` + mainContent;
    
    fs.writeFileSync(path.join(targetTemplateDir, 'Main.tsx'), mainContent);
  }

  // 7. Create template.tsx
  // editable.json may exist as either a flat object (`{ hero: {...} }`) or
  // wrapped under `siteContent` (`{ siteContent: { hero: {...} } }`). Flatten
  // the wrapped form at runtime so `useTemplateData()` consumers can read
  // inner keys directly. Older per-project overrides may also be wrapped —
  // unwrap those, too.
  const hasSiteContentWrapper = JSON.stringify(editableData) !== '{}' && typeof editableData === 'object' && 'siteContent' in (editableData as Record<string, unknown>);
  const unwrapExpr = hasSiteContentWrapper
    ? `// editable.json wraps content under \`siteContent\`; flatten it.\nconst baseData = (editableData as { siteContent: Record<string, unknown> }).siteContent;\n`
    : `const baseData = editableData;\n`;
  const templateCode = `"use client";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
${mainFileSrc ? `import Main from "./Main";` : `// No Main file found`}

${unwrapExpr}const themeStyles = ${JSON.stringify(themeStyles, null, 2)} as React.CSSProperties;

export default function ${config.name.replace(/\s+/g, '')}Template({ data }: { data: any }) {
  const overrides = data && data.siteContent ? data.siteContent : (data ?? {});
  const templateData = { ...baseData, ...overrides };

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper h-full w-full">
        ${mainFileSrc ? `<Main />` : `<div>Main component missing</div>`}
      </div>
    </TemplateContext.Provider>
  );
}
`;
  fs.writeFileSync(path.join(targetTemplateDir, 'template.tsx'), templateCode);

  // 8. Create TemplateContext.tsx
  const contextCode = `"use client";
import { createContext, useContext } from 'react';
export const TemplateContext = createContext<any>({});
export function useTemplateData() { return useContext(TemplateContext); }
`;
  fs.writeFileSync(path.join(targetTemplateDir, 'TemplateContext.tsx'), contextCode);
}

const templates = fs.readdirSync(SOURCE_DIR).filter(f => fs.statSync(path.join(SOURCE_DIR, f)).isDirectory());
templates.forEach(processTemplate);

// Update Global CSS
let globalsCss = fs.readFileSync(GLOBALS_CSS_FILE, 'utf8');
let themeBlock = '';
allThemeVars.forEach(v => {
  themeBlock += `  ${v}: var(${v});\n`;
});
globalsCss = globalsCss.replace(/\/\* --- INJECTED TEMPLATE VARS --- \*\/[\s\S]*?\/\* --- END INJECTED --- \*\//, '');
if (globalsCss.includes('@theme')) {
  globalsCss = globalsCss.replace(/@theme\s*\{/, `@theme {\n/* --- INJECTED TEMPLATE VARS --- */\n${themeBlock}/* --- END INJECTED --- */\n`);
} else {
  globalsCss += `\n@theme {\n/* --- INJECTED TEMPLATE VARS --- */\n${themeBlock}/* --- END INJECTED --- */\n}\n`;
}
fs.writeFileSync(GLOBALS_CSS_FILE, globalsCss);
console.log("Globals CSS updated.");

const portedTemplates = templates.filter(t => fs.existsSync(path.join(TARGET_DIR, t, 'config.json')));
let registryCode = `// Auto-generated registry\n`;
portedTemplates.forEach(t => {
  const identifier = t.replace(/[^a-zA-Z0-9]/g, '');
  registryCode += `import ${identifier}Template from "../templates/${t}/template";\n`;
  registryCode += `import ${identifier}Config from "../templates/${t}/config.json";\n`;
  // editable.json holds the seed content used by the template rendering and the
  // in-editor default; surface it as `defaultData` so /api/projects can seed new
  // projects with real content instead of starting from `{}`.
  registryCode += `import ${identifier}Editable from "../templates/${t}/editable.json";\n`;
});
registryCode += `\nexport const TEMPLATE_REGISTRY: Record<string, any> = {\n`;
portedTemplates.forEach(t => {
  const identifier = t.replace(/[^a-zA-Z0-9]/g, '');
  registryCode += `  "${t}": {\n`;
  registryCode += `    config: ${identifier}Config,\n`;
  registryCode += `    component: ${identifier}Template,\n`;
  // Some legacy editable.json wraps content under `siteContent`; unwrap at
  // registry time so consumers (API + editor) get the flat shape the components
  // already expect from `useTemplateData()`.
  registryCode += `    defaultData: (${identifier}Editable && typeof ${identifier}Editable === "object" && "siteContent" in ${identifier}Editable)\n      ? (${identifier}Editable as { siteContent: Record<string, unknown> }).siteContent\n      : ${identifier}Editable,\n`;
  registryCode += `  },\n`;
});
registryCode += `};\n\nexport function getTemplate(id: string) { return TEMPLATE_REGISTRY[id]; }\n`;
registryCode += `export function getAllTemplates() { return Object.values(TEMPLATE_REGISTRY).map(t => t.config); }\n`;

fs.writeFileSync(REGISTRY_FILE, registryCode);
console.log("Registry updated.");
