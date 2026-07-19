import fs from 'node:fs';
import path from 'node:path';

const TEMPLATES = path.join(process.cwd(), 'src/templates');

const templates = fs.readdirSync(TEMPLATES).filter(f => fs.statSync(path.join(TEMPLATES, f)).isDirectory());

for (const t of templates) {
  const cssFile = path.join(TEMPLATES, t, 'index.css');
  if (!fs.existsSync(cssFile)) continue;
  
  let content = fs.readFileSync(cssFile, 'utf8');
  
  // 1. Convert things like `h1, h2, h3` to `:where(.template-wrapper) h1, :where(.template-wrapper) h2`
  // Actually, a simpler regex is to find `@layer base {` and carefully wrap the tags.
  // Since parsing CSS with regex is hard, let's just do a simpler trick.
  // Replace `body::before` with `.template-wrapper::before`
  content = content.replace(/\bbody::before/g, '.template-wrapper::before');
  
  // Replace tag selectors in @layer base. We can just add `.template-wrapper ` before them if they are at the start of a line.
  // Or even better: use a quick string replacement for common ones:
  content = content.replace(/^([ \t]*)(h1|h2|h3|h4|h5|h6|p|a|img|button|select)([, \t{])/gm, '$1.template-wrapper $2$3');
  
  fs.writeFileSync(cssFile, content);
  
  // 2. Ensure Main.tsx imports index.css
  const mainFile = path.join(TEMPLATES, t, 'Main.tsx');
  if (fs.existsSync(mainFile)) {
    let mainContent = fs.readFileSync(mainFile, 'utf8');
    if (!mainContent.includes("import './index.css';") && !mainContent.includes('import "./index.css";')) {
      // insert right after other imports
      const lastImportIndex = mainContent.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextNewline = mainContent.indexOf('\n', lastImportIndex);
        mainContent = mainContent.slice(0, nextNewline + 1) + "import './index.css';\n" + mainContent.slice(nextNewline + 1);
      } else {
        // just put it after use client
        mainContent = mainContent.replace(/['"]use client['"];?\n/, "'use client';\nimport './index.css';\n");
      }
      fs.writeFileSync(mainFile, mainContent);
      console.log(`Added import './index.css' to ${t}/Main.tsx`);
    }
  }
}
console.log('Done!');
