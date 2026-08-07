import puppeteer from 'puppeteer';
import fs from 'fs';

const templates = [
  "forno-sixteen",
  "crumb-and-char",
  "nightjar-and-crown",
  "tallow-and-sage",
  "wildmere-gardens"
];

(async () => {
  console.log("Starting capture script for new templates...");

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
      
      console.log(`  -> Waiting 5s for page to settle and images to load`);
      await new Promise(r => setTimeout(r, 5000));

      console.log(`  -> Taking screenshot`);
      // Capture screenshot with clip height 2700
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
