const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const targetUrl = process.env.TEST_URL || 'https://crystal-102510.github.io/build-light/';
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('requestfailed', (request) => {
    errors.push(`request: ${request.url()} — ${request.failure()?.errorText || 'failed'}`);
  });

  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Start lesson/ }).click();
  await page.getByRole('button', { name: /I've got it/ }).click();

  await page.locator('.piece.red').click();
  await page.locator('.drop-zone').click();
  await page.locator('.piece.yellow').click();
  await page.locator('.drop-zone').click();
  await page.getByRole('button', { name: /Cast the spell/ }).click();

  await page.getByRole('button', { name: /Trace 明/ }).click();
  const canvas = page.locator('canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Trace canvas was not rendered.');
  await page.mouse.move(box.x + 20, box.y + 20);
  await page.mouse.down();
  for (let index = 0; index < 18; index += 1) {
    await page.mouse.move(
      box.x + 20 + ((index % 6) * Math.max(18, (box.width - 40) / 5)),
      box.y + 20 + (Math.floor(index / 6) * Math.max(24, (box.height - 40) / 2)),
    );
  }
  await page.mouse.up();
  await page.getByRole('button', { name: /Use it in real life/ }).click();

  await page.getByRole('button', { name: 'Tomorrow' }).click();
  await page.getByRole('button', { name: /Finish lesson/ }).click();
  await page.getByText('LESSON COMPLETE').waitFor();

  const artifactDirectory = path.join(__dirname, '..', 'artifacts');
  fs.mkdirSync(artifactDirectory, { recursive: true });
  await page.screenshot({
    path: path.join(artifactDirectory, 'github-pages-mobile-complete.png'),
    fullPage: true,
  });

  await browser.close();
  if (errors.length > 0) {
    throw new Error(`Browser errors:\n${errors.join('\n')}`);
  }
  console.log('MOBILE_FLOW_OK');
})();
