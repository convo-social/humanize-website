import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const URL = process.env.OG_URL ?? "http://localhost:3000/";
const OUT = process.env.OG_OUT ?? "public/og-image.png";
const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

await mkdir(dirname(OUT), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 2 },
  args: ["--hide-scrollbars"],
});

try {
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });

  // Hide Next.js dev indicator + freeze hero on slide 0.
  await page.addStyleTag({
    content: `
      nextjs-portal, [data-next-mark], [data-nextjs-toast],
      [data-next-badge-root], #__next-build-watcher,
      [data-nextjs-dev-tools-button] { display: none !important; }
    `,
  });

  await page.evaluate(() => {
    document.querySelectorAll(".slide").forEach((el, i) => {
      el.classList.toggle("active", i === 0);
    });
    document.querySelectorAll(".pip-person").forEach((el, i) => {
      el.classList.toggle("active", i === 0);
    });
    document.querySelectorAll(".participant").forEach((el, i) => {
      el.classList.toggle("active", i === 0);
    });
    document.querySelectorAll(".progress-tick").forEach((el, i) => {
      el.classList.remove("complete");
      el.classList.toggle("active", i === 0);
    });
    const q = document.getElementById("question");
    if (q) q.textContent = "Which packaging design drives intent to purchase?";
  });

  // Let videos paint a frame.
  await new Promise((r) => setTimeout(r, 1500));

  await page.screenshot({
    path: OUT,
    type: "png",
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });

  console.log(`wrote ${OUT}`);
} finally {
  await browser.close();
}
