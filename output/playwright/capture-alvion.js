async (page) => {
  await page.setViewportSize({ width: 1440, height: 2200 });
  await page.goto("http://localhost:3000/preview/alvion-medical?frame=1", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "output/playwright/alvion-medical-desktop.png", fullPage: true, timeout: 60000 });
  const desktop = await page.evaluate(() => ({
    title: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
    missingImages: [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.getAttribute("src")),
  }));

  await page.setViewportSize({ width: 390, height: 1600 });
  await page.goto("http://localhost:3000/preview/alvion-medical?frame=1", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "output/playwright/alvion-medical-mobile.png", fullPage: true, timeout: 60000 });
  const mobile = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
  }));

  await page.setViewportSize({ width: 1440, height: 1800 });
  await page.goto("http://localhost:3000/preview/alvion-medical?frame=1", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "output/playwright/alvion-medical-preview-source.png", fullPage: false, timeout: 60000 });

  console.log(JSON.stringify({ desktop, mobile }, null, 2));
}
