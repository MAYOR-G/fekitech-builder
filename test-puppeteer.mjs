import puppeteer from 'puppeteer';
async function test() {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/preview/forno-sixteen?frame=1", { waitUntil: "networkidle0" });
  
  const metrics = await page.evaluate(() => {
    const hero = document.querySelector('.ukb-hero-pizza');
    return {
      bodyHeight: document.body.scrollHeight,
      heroHeight: hero ? hero.getBoundingClientRect().height : null,
      heroCSSHeight: hero ? window.getComputedStyle(hero).height : null,
    };
  });
  console.log("Metrics 900:", metrics);

  await page.setViewport({ width: 1440, height: 2700 });
  await page.waitForTimeout(1000);
  const metrics2700 = await page.evaluate(() => {
    const hero = document.querySelector('.ukb-hero-pizza');
    return {
      bodyHeight: document.body.scrollHeight,
      heroHeight: hero ? hero.getBoundingClientRect().height : null,
      heroCSSHeight: hero ? window.getComputedStyle(hero).height : null,
    };
  });
  console.log("Metrics 2700:", metrics2700);

  await browser.close();
}
test();
