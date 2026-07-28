import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templates = [
  "fast-food-chicken-tacos",
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 1080 },
  });

  for (const template of templates) {
    console.log(`Capturing ${template}...`);
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:3000/preview/${template}?frame=1`, { waitUntil: 'networkidle2', timeout: 60000 });
      await page.addStyleTag({ content: '::-webkit-scrollbar { display: none !important; } html, body { overflow-x: hidden; scroll-behavior: auto !important; }' });
      
      console.log('Waiting for Next.js to compile and render...');
      await new Promise(r => setTimeout(r, 12000));
      
      for(let i = 1; i <= 3; i++) {
        await page.evaluate((y) => window.scrollTo(0, y), i * 800);
        await new Promise(r => setTimeout(r, 500));
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise(r => setTimeout(r, 1000));
      const screenshotPath = path.resolve(__dirname, `../public/templates/${template}.webp`);
      await page.screenshot({ 
        path: screenshotPath, 
        type: 'webp', 
        quality: 90,
        clip: { x: 0, y: 0, width: 1440, height: 2800 }
      });
      console.log(`Saved ${screenshotPath}`);
    } catch (err) {
      console.error(`Failed to capture ${template}:`, err);
    }
    await page.close();
  }
  await browser.close();
}

capture().catch(console.error);
