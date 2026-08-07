import puppeteer from 'puppeteer';
import fs from 'fs';

const templates = [
  "forgefit-training",
  "rivergate-plumbing",
  "hawthorne-fields-academy",
  "mercer-blythe-solicitors",
  "north-ledger-accountants",
  "kindred-paws-vets",
  "little-lanterns-nursery",
  "borough-motor-works"
];

(async () => {
  console.log("Starting capture script for requested templates...");

  for (const t of templates) {
    console.log(`Processing: ${t}`);
    
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      const page = await browser.newPage();
      
      await page.setViewport({ width: 1440, height: 900 });
      
      console.log(`  -> Navigating to http://localhost:3000/preview/${t}?frame=1`);
      try {
        await page.goto(`http://localhost:3000/preview/${t}?frame=1`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        console.log(`  -> Navigation complete`);
      } catch (e) {
        console.log(`  -> Navigation error for ${t}, proceeding anyway: ${e}`);
      }
      
      console.log(`  -> Waiting for initial load`);
      await new Promise(r => setTimeout(r, 2000));

      // Scroll down to trigger lazy loading and animations
      console.log(`  -> Scrolling to trigger lazy loading...`);
      await page.evaluate(() => window.scrollBy(0, 800));
      await new Promise(r => setTimeout(r, 800));
      await page.evaluate(() => window.scrollBy(0, 800));
      await new Promise(r => setTimeout(r, 800));
      await page.evaluate(() => window.scrollBy(0, 800));
      await new Promise(r => setTimeout(r, 800));

      // Reset scroll to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise(r => setTimeout(r, 1000));

      console.log(`  -> Taking screenshot (height 2700px)`);
      // Capture screenshot with clip height 2700 (3 pages)
      await page.screenshot({ 
        path: `public/templates/${t}.webp`, 
        type: 'webp', 
        quality: 90,
        clip: { x: 0, y: 0, width: 1440, height: 2700 }
      });
      
      console.log(`✅ Saved: public/templates/${t}.webp`);
    } catch(e) {
      console.log(`❌ Error processing ${t}: ${e}`);
    } finally {
      if (browser) await browser.close();
    }
  }

  console.log("All screenshots captured successfully.");
})();
