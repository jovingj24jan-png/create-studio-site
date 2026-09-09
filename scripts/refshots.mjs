/**
 * Capture evenly-spaced viewport frames of any URL for visual comparison.
 *   node scripts/refshots.mjs <url> <width> <height> <count> <tag> [dir]
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [, , url, w = "1440", h = "900", count = "10", tag = "shot", dir = "cmp"] = process.argv;
mkdirSync(dir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h });
await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });
await new Promise((r) => setTimeout(r, 3000));

// prime lazy content
await page.evaluate(async () => {
  const step = window.innerHeight * 0.85;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 110));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
});

const total = await page.evaluate(() => document.body.scrollHeight);
const step = Math.max(1, Math.floor((total - +h) / Math.max(1, +count - 1)));

for (let i = 0; i < +count; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * step);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${dir}/${tag}-${String(i).padStart(2, "0")}.png` });
}

await browser.close();
console.log(`${tag}: ${count} frames @${w} (height ${total}, step ${step})`);
