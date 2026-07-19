import fs from 'node:fs';
import path from 'node:path';

const TEMPLATES = path.join(process.cwd(), 'src/templates');
const broken = ['cake-website', 'furniture-website', 'hotel-website', 'restaurant-website'];

for (const t of broken) {
  const mainFile = path.join(TEMPLATES, t, 'Main.tsx');
  let content = fs.readFileSync(mainFile, 'utf8');
  
  // Remove the bad import
  content = content.replace(/import '\.\/index\.css';\n/g, '');
  
  // Add it properly after the "use client"
  content = content.replace(/['"]use client['"];?\n/, '"use client";\nimport "./index.css";\n');
  
  fs.writeFileSync(mainFile, content);
  console.log('Fixed', t);
}
