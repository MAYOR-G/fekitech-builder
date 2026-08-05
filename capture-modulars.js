const puppeteer = require('puppeteer');
const fs = require('fs');

const templates = [
  "modulars"
];

(async () => {
  console.log("Starting capture script for modulars...");
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });

  for (const t of templates) {
    console.log(`Processing: ${t}`);
    
    await page.goto(`http://localhost:3000/preview/${t}?frame=1`, { waitUntil: 'load', timeout: 0 });
    await new Promise(r => setTimeout(r, 2000));

    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 600));
    
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 600));

    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 600));
    
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({ 
      path: `public/templates/${t}.webp`, 
      type: 'webp', 
      quality: 90,
      clip: { x: 0, y: 0, width: 1440, height: 2500 }
    });
    
    console.log(`✅ Saved: public/templates/${t}.webp`);
  }

  await browser.close();
  console.log("All screenshots captured successfully.");
})();
