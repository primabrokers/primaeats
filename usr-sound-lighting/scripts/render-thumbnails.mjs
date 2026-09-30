/**
 * Renders every product's 3D model to public/renders/<slug>.png for the catalogue.
 *
 *   npm run renders             # all products
 *   npm run renders -- club-pa  # just one
 *
 * Needs a Chromium for Playwright: `npx playwright install chromium`,
 * or point CHROMIUM_PATH at an existing Chrome/Chromium binary.
 */
import { createServer } from "vite";
import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "renders");

const source = await readFile(path.join(root, "src", "data", "catalogue.ts"), "utf8");
const productsBlock = source.slice(source.indexOf("export const products"), source.indexOf("export interface Package"));
const all = [...productsBlock.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const only = process.argv.slice(2);
const slugs = only.length ? all.filter((s) => only.includes(s)) : all;

const server = await createServer({ root, logLevel: "error", server: { port: 5199, strictPort: false } });
await server.listen();
const base = server.resolvedUrls.local[0].replace(/\/$/, "");

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 1 });
await mkdir(outDir, { recursive: true });

for (const slug of slugs) {
  await page.goto(`${base}/render/${slug}`, { waitUntil: "networkidle" });
  await page.waitForSelector("canvas");
  await page.waitForTimeout(2500);
  const file = path.join(outDir, `${slug}.png`);
  await page.screenshot({ path: file, omitBackground: true });
  console.log("rendered", path.relative(root, file));
}

await browser.close();
await server.close();
