import puppeteer from 'puppeteer';
import sharp from 'sharp';

async function capture() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/preview/premium-dental-clinic', { waitUntil: 'networkidle2' });
  const buffer = await page.screenshot({ fullPage: true });
  await sharp(buffer).webp({ quality: 80 }).toFile('public/previews/premium-dental-clinic.webp');
  await browser.close();
  console.log('Screenshot captured and saved to public/previews/premium-dental-clinic.webp');
}
capture().catch(console.error);
