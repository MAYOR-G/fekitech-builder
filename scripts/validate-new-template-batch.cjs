const puppeteer = require("puppeteer");

const ids = [
  "hawthorne-fields-academy", "the-rowan-house", "mercer-blythe-solicitors",
  "north-ledger-accountants", "wren-vow-events", "kindred-paws-vets",
  "field-stem-florist", "little-lanterns-nursery", "borough-motor-works",
  "wildmere-gardens", "tallow-and-sage", "nightjar-and-crown",
  "crumb-and-char", "forno-sixteen",
];
const widths = [320, 375, 430, 768, 1024, 1280, 1440];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"] });
  const report = [];
  for (const id of ids) {
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewport({ width: 1440, height: 1100 });
    await page.goto(`http://localhost:3000/preview/${id}?frame=1`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await new Promise((resolve) => setTimeout(resolve, 800));

    const pages = await page.$$eval("header nav a", (links) => [...new Set(links.map((link) => link.textContent.trim()).filter((label) => label && label !== "Home"))]);
    for (const label of pages) {
      await page.$$eval("header nav a", (links, target) => links.find((link) => link.textContent.trim() === target)?.click(), label);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    await page.click(".ukb-brand");

    const checks = [];
    for (const width of widths) {
      await page.setViewport({ width, height: 900 });
      checks.push(await page.evaluate((viewportWidth) => {
        const heading = document.querySelector("main h1")?.getBoundingClientRect();
        return {
          width: viewportWidth,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          clippedHeading: Boolean(heading && (heading.left < -1 || heading.right > viewportWidth + 1)),
          brokenImages: [...document.images].filter((image) => image.complete && !image.naturalWidth).map((image) => image.src),
        };
      }, width));
    }

    await page.setViewport({ width: 375, height: 850 });
    await page.click(".ukb-menu");
    const mobileMenuVisible = await page.$eval("header nav", (nav) => getComputedStyle(nav).display !== "none");
    await page.setViewport({ width: 1440, height: 1100 });
    await page.goto(`http://localhost:3000/preview/${id}?frame=1`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.screenshot({ path: `public/templates/${id}.webp`, type: "webp", quality: 84 });
    report.push({ id, pages: pages.length, mobileMenuVisible, checks, errors: [...new Set(errors)] });
    await page.close();
    console.log(`validated ${id}`);
  }
  await browser.close();
  console.log(`BATCH_REPORT=${JSON.stringify(report)}`);
})().catch((error) => { console.error(error); process.exitCode = 1; });
