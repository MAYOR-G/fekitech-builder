import puppeteer from 'puppeteer';
import sharp from 'sharp';

async function test() {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/preview/forno-sixteen?frame=1", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 2000));
  
  const chunks = [];
  for (let i = 0; i < 3; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 900);
    await new Promise(r => setTimeout(r, 800)); // wait for animations
    const buffer = await page.screenshot({ type: 'png' });
    chunks.push({ input: buffer, top: i * 900, left: 0 });
  }

  // Create a blank image of 1440x2700
  await sharp({
    create: { width: 1440, height: 2700, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
  .composite(chunks)
  .png()
  .toFile('test-stitched.png');

  await browser.close();
}
test();
