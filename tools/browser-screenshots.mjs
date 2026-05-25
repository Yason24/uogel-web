import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.BROWSER_CHECK_BASE_URL ?? "https://rtc.rdk-invest.ru";
const outputDir = path.resolve("docs/browser-checks");

const pages = [
  { slug: "home", path: "/" },
  { slug: "pergolas", path: "/pergolas" },
  { slug: "gallery", path: "/gallery" },
  { slug: "contacts", path: "/contacts" },
];

const viewports = [
  { slug: "desktop", width: 1280, height: 900 },
  { slug: "mobile", width: 390, height: 844 },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    for (const item of pages) {
      const url = new URL(item.path, baseUrl).toString();
      const filePath = path.join(outputDir, `${item.slug}-${viewport.slug}.png`);

      await page.goto(url, { waitUntil: "networkidle" });
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`${url} -> ${filePath}`);
    }

    await context.close();
  }
} finally {
  await browser.close();
}
