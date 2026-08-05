const puppeteer = require('puppeteer');

(async () => {
  console.log("Starting extraction of reference template...");
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 2500 });
  await page.goto('http://localhost:8001/template.html', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait for Wix to render
  await new Promise(r => setTimeout(r, 5000));

  const pageData = await page.evaluate(() => {
    // Get text content of elements
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, p, span, a, button'));
    const texts = elements.map(e => {
        const style = window.getComputedStyle(e);
        const rect = e.getBoundingClientRect();
        return {
            tag: e.tagName,
            text: e.innerText.trim(),
            color: style.color,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            fontWeight: style.fontWeight,
            y: rect.y
        };
    }).filter(e => e.text.length > 0 && e.y >= 0).sort((a, b) => a.y - b.y);

    const backgrounds = Array.from(document.querySelectorAll('div, section, header, footer')).map(e => {
        const style = window.getComputedStyle(e);
        const rect = e.getBoundingClientRect();
        if (rect.width > 300 && rect.height > 100) {
            return {
                tag: e.tagName,
                bgColor: style.backgroundColor,
                bgImage: style.backgroundImage,
                className: e.className,
                y: rect.y,
                height: rect.height,
                width: rect.width
            };
        }
        return null;
    }).filter(Boolean).filter(b => b.bgColor !== 'rgba(0, 0, 0, 0)' || (b.bgImage && b.bgImage !== 'none')).sort((a, b) => a.y - b.y);

    return { texts, backgrounds };
  });

  const fs = require('fs');
  fs.writeFileSync('reference-data.json', JSON.stringify(pageData, null, 2));
  console.log("Extracted data saved to reference-data.json");

  await page.screenshot({ 
    path: 'reference-screenshot.webp', 
    type: 'webp', 
    quality: 90,
    clip: { x: 0, y: 0, width: 1440, height: 2500 }
  });
  console.log("Saved screenshot to reference-screenshot.webp");

  await browser.close();
})();
