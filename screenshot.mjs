import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import fs from 'fs';

const templates = [
  'freshbite-fast-food'
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const template of templates) {
    console.log(`Taking screenshot for ${template}...`);
    try {
      await page.goto(`http://localhost:3000/preview/${template}?frame=1&isolate=${template}`, { waitUntil: 'networkidle0', timeout: 30000 });
      // Extra delay for animations
      await new Promise(r => setTimeout(r, 2000));
      
      const pngPath = `public/templates/${template}.png`;
      const webpPath = `public/templates/${template}.webp`;
      
      await page.screenshot({ 
        path: pngPath,
        clip: { x: 0, y: 0, width: 1440, height: 2800 }
      });
      console.log(`Saved PNG: ${pngPath}`);
      
      // Convert to webp using Node's canvas or sharp? We don't have those. We can use cwebp if available, or just leave it as PNG and rename to webp? 
      // Fekitech Builder uses Next.js Image component, which can serve pngs even if they are named webp (though not ideal).
      // Wait, let's see if cwebp is available.
      try {
        execSync(`cwebp -q 80 ${pngPath} -o ${webpPath}`);
        console.log(`Converted to WebP: ${webpPath}`);
        fs.unlinkSync(pngPath);
      } catch (err) {
        console.log(`cwebp not found or failed, falling back to just renaming the file to .webp (browsers support it via magic bytes)`);
        fs.renameSync(pngPath, webpPath);
      }
    } catch (e) {
      console.error(`Failed on ${template}:`, e.message);
    }
  }

  await browser.close();
  console.log('Done!');
})();
