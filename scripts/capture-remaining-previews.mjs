#!/usr/bin/env node
/**
 * Capture tall catalogue previews for registered templates after position 17.
 * Produces a single tall screenshot (hero + next two sections) per template.
 *
 * Usage: node scripts/capture-remaining-previews.mjs
 */
import puppeteer from "puppeteer";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;
// Capture approximately 3 viewports of content (hero + 2 sections)
const CAPTURE_HEIGHT = 2700;
const IMAGE_QUALITY = 90;

// Templates in registry order — positions 18–26 (after the first 17)
const TEMPLATES_TO_CAPTURE = [
  "alder-slate-roofing",
  "burger-dark-premium",
  "crownline-roofworks",
  "ice-cream-website",
  "noir-house-design",
  "northcrest-roofing",
  "second-furniture-website",
  "second-plumber-website",
  "velvet-scoop",
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
    // networkidle0 can time out on some templates; fall back
    console.log(`    ⚠ networkidle0 timed out, proceeding…`);
  }

  // Wait for content to render
  await page.waitForFunction(() => document.readyState === "complete", { timeout: 15000 }).catch(() => {});

  // Wait extra time for fonts, images, and animations
  await new Promise((r) => setTimeout(r, 3000));

  // Scroll down to trigger reveal-on-scroll animations
  await autoScroll(page, CAPTURE_HEIGHT + 500);
  await new Promise((r) => setTimeout(r, 2000));

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1500));

  // Take the tall screenshot
  const outputPath = path.join(OUTPUT_DIR, `${templateId}.webp`);
  await page.screenshot({
    path: outputPath,
    type: "webp",
    quality: IMAGE_QUALITY,
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
  console.log("🔄 Capturing catalogue previews for templates 18–26…\n");

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
  console.log(`\nDone: ${results.filter((r) => r.status === "ok").length}/${results.length} captured.`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
