const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  
  // Set viewport to normal desktop size so 100vh = 900px
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/preview/gym-website?frame=1', { waitUntil: 'load', timeout: 0 });
  await new Promise(r => setTimeout(r, 2000));
  
  // scroll down and up to trigger animations
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ 
    path: 'test-gym.webp', 
    type: 'webp', 
    clip: { x: 0, y: 0, width: 1440, height: 2500 }
  });

  await browser.close();
  console.log('Saved test-gym.webp');
})();
