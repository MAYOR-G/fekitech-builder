import puppeteer from 'puppeteer';

async function test() {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/preview/forno-sixteen?frame=1", { waitUntil: "load", timeout: 0 });
  await new Promise(r => setTimeout(r, 2000));
  
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 600));
  
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: "test-scroll-clip.png", clip: { x: 0, y: 0, width: 1440, height: 2700 } });

  await browser.close();
}
test();
