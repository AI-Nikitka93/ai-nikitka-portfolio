import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\ae5d75e4-ce37-4c9a-bf4a-331e79ce70ea';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const routes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'career_path', path: '/career-path' },
  { name: 'portfolio', path: '/portfolio' },
  { name: 'blog', path: '/blog' },
  { name: 'services_calculator', path: '/services-calculator' },
  { name: 'ai_assistant', path: '/ai-assistant' },
  { name: 'en', path: '/en' },
  { name: 'lab', path: '/lab' },
  { name: 'links', path: '/links' },
  { name: 'awards_credentials', path: '/awards-credentials' },
  { name: 'privacy', path: '/privacy' }
];

async function run() {
  console.log('Starting screenshot capture...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const route of routes) {
    const url = `http://localhost:3200${route.path}`;
    console.log(`Processing: ${url}`);

    // Desktop Screenshot
    await page.setViewportSize({ width: 1920, height: 1080 });
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
    } catch (e) {
      console.log(`Navigation to ${url} timed out/failed, continuing...`);
    }
    await page.waitForTimeout(1500);
    const desktopPath = path.join(targetDir, `desktop_${route.name}.png`);
    await page.screenshot({ path: desktopPath });
    console.log(`Saved desktop: ${desktopPath}`);

    // Mobile Screenshot
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1500);
    const mobilePath = path.join(targetDir, `mobile_${route.name}.png`);
    await page.screenshot({ path: mobilePath });
    console.log(`Saved mobile: ${mobilePath}`);
  }

  await browser.close();
  console.log('Finished capturing all screenshots!');
}

run().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
