import puppeteer from 'puppeteer';
import fs from 'fs';

async function test() {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  
  // Method 1: viewport 900 + clip 2700
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/preview/wildmere-gardens?frame=1", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: "test-clip.png", clip: { x: 0, y: 0, width: 1440, height: 2700 } });

  // Method 2: viewport 2700 + fullPage false
  await page.setViewport({ width: 1440, height: 2700 });
  await page.goto("http://localhost:3000/preview/wildmere-gardens?frame=1", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: "test-vp2700.png", fullPage: false });

  await browser.close();
}
test();
