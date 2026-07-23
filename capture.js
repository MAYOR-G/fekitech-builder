const puppeteer = require('puppeteer');

const templates = [
  "cake-website",
  "catering-website",
  "coffee-website",
  "dentist-website",
  "electrician-website",
  "ink-and-iron",
  "restaurant-website",
  "second-plumber-website"
];

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  // Set viewport to a nice 3/4 aspect ratio
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });

  for (const t of templates) {
    console.log(`Capturing ${t}...`);
    try {
      await page.goto(`http://localhost:3000/preview/${t}?frame=1`, { waitUntil: 'networkidle2', timeout: 30000 });
      // wait a bit extra for animations/images
      await new Promise(r => setTimeout(r, 2000));
      
      await page.screenshot({ path: `public/templates/${t}-tall.webp`, type: 'webp', quality: 85 });
      console.log(`Saved ${t}`);
    } catch (e) {
      console.error(`Error capturing ${t}:`, e);
    }
  }

  await browser.close();
  console.log("All done!");
})();
