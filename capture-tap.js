const puppeteer = require('puppeteer');
const fs = require('fs');

const templates = [
  "the-copper-tap"
];

(async () => {
  console.log("Starting capture script for the-copper-tap...");
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  
  // Set viewport to normal desktop size (900px height) so 100vh doesn't become 2500px tall.
  await page.setViewport({ width: 1440, height: 900 });

  for (const t of templates) {
    console.log(`Processing: ${t}`);
    
    // Next.js dev server has open SSE connections, so we use 'load'
    await page.goto(`http://localhost:3000/preview/${t}?frame=1`, { waitUntil: 'load', timeout: 0 });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to trigger IntersectionObserver animations and lazy loaded images
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 600));
    
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 600));

    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 600));
    
    // Reset scroll to top before screenshot so sticky headers reset and content is proper
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    
    // Wait for sticky headers to transition back, etc.
    await new Promise(r => setTimeout(r, 800));

    // Capture screenshot
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
