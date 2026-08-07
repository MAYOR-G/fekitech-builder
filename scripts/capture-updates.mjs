import puppeteer from "puppeteer";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;
// Capture approximately 3 viewports of content (hero + 2 sections)
const CAPTURE_HEIGHT = 2700;
const IMAGE_QUALITY = 90;

const TEMPLATES_TO_CAPTURE = [
  "forgefit-training",
  "rivergate-plumbing",
  "hawthorne-fields-academy",
  "mercer-blythe-solicitors",
  "north-ledger-accountants",
  "kindred-paws-vets",
  "little-lanterns-nursery",
  "borough-motor-works",
  "wildmere-gardens",
  "tallow-and-sage",
  "nightjar-and-crown",
  "crumb-and-char",
  "forno-sixteen"
];

const OUTPUT_DIR = path.resolve("public/templates");

async function autoScroll(page, maxY) {
  await page.evaluate(async (targetY) => {
    await new Promise((resolve) => {
      let currentY = 0;
      const step = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        currentY += step;
        if (currentY >= targetY) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  }, maxY);
}

async function captureTemplate(browser, templateId) {
  const page = await browser.newPage();
  await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });

  const url = `${BASE_URL}/preview/${templateId}?frame=1`;
  console.log(`  → Loading ${url}`);

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  } catch {
    console.log(`    ⚠ networkidle0 timed out, proceeding…`);
  }

  await page.waitForFunction(() => document.readyState === "complete", { timeout: 15000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 3000));

  await autoScroll(page, CAPTURE_HEIGHT + 500);
  await new Promise((r) => setTimeout(r, 2000));

  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1500));

  const outputPath = path.join(OUTPUT_DIR, `${templateId}-tall.png`);
  await page.screenshot({
    path: outputPath,
    type: "png",
    clip: {
      x: 0,
      y: 0,
      width: VIEWPORT_WIDTH,
      height: CAPTURE_HEIGHT,
    },
  });

  console.log(`  ✓ Saved ${outputPath}`);
  await page.close();
  return outputPath;
}

async function main() {
  console.log("🔄 Capturing updated previews…\n");

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--font-render-hinting=none",
    ],
  });

  const results = [];
  for (const templateId of TEMPLATES_TO_CAPTURE) {
    try {
      const outputPath = await captureTemplate(browser, templateId);
      results.push({ templateId, status: "ok", path: outputPath });
    } catch (err) {
      console.error(`  ✗ Failed: ${templateId} — ${err.message}`);
      results.push({ templateId, status: "error", error: err.message });
    }
  }

  await browser.close();

  console.log("\n━━━ Results ━━━");
  for (const r of results) {
    console.log(`  ${r.status === "ok" ? "✓" : "✗"} ${r.templateId} ${r.status === "ok" ? r.path : r.error}`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
