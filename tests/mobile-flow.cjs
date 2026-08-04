const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function assertNoHorizontalOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (metrics.scrollWidth > metrics.clientWidth) {
    throw new Error(`${label} has horizontal overflow: ${metrics.scrollWidth}px > ${metrics.clientWidth}px.`);
  }
}

async function answerRounds(page, answers) {
  for (const answer of answers) {
    await page.locator('[data-option]').filter({ hasText: answer }).click();
    await page.locator('.primary-action').click();
  }
}

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
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`response: ${response.status()} ${response.url()}`);
  });

  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'How water became 水' }).waitFor();
  await assertNoHorizontalOverflow(page, 'Evolution screen');

  const stageLabels = await page.locator('.stage-label').allTextContents();
  if (JSON.stringify(stageLabels) !== JSON.stringify(['PICTURE', 'SEAL SCRIPT', 'TODAY'])) {
    throw new Error(`Unexpected stage labels: ${JSON.stringify(stageLabels)}`);
  }
  if (await page.locator('[class*="lock"], input[type="range"]').count()) {
    throw new Error('Evolution screen contains a lock or range input.');
  }

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('[data-option="冫"]').click();
  await page.getByText('Look for the form made from three water drops.').waitFor();
  if (!(await page.locator('.primary-action').isDisabled())) {
    throw new Error('A wrong radical answer unlocked Continue.');
  }
  await page.locator('[data-option="氵"]').click();
  await page.getByText('水 becomes the compact form 氵 when it appears on the left.').waitFor();
  await page.getByRole('button', { name: 'Continue' }).click();

  for (const char of ['河', '海', '洗', '池', '泳']) {
    await page.locator(`[data-family="${char}"]`).click();
  }
  if (await page.getByText('5 / 5 explored').count() !== 1) {
    throw new Error('The five-character exploration did not complete.');
  }
  await page.getByRole('button', { name: 'Continue' }).click();

  await answerRounds(page, ['河', '海', '洗', '池', '泳']);
  await answerRounds(page, ['洗手', '海边', '泳池', '黄河', '池塘']);
  await answerRounds(page, ['I swim every day.', 'Please wash your hands.', 'The fish are in the pond.']);

  for (const token of ['我', '每天', '游泳']) {
    await page.locator(`[data-add="${token}"]`).click();
  }
  await page.getByRole('button', { name: 'Check answer' }).click();
  await page.getByRole('button', { name: 'Next sentence' }).click();
  for (const token of ['请', '洗手']) {
    await page.locator(`[data-add="${token}"]`).click();
  }
  await page.getByRole('button', { name: 'Check answer' }).click();
  await page.getByRole('button', { name: 'See results' }).click();

  await page.getByRole('heading', { name: 'You unlocked the water family' }).waitFor();
  await assertNoHorizontalOverflow(page, 'Completion screen');
  if ((await page.locator('.result-grid strong').first().textContent()) !== '16') {
    throw new Error('Completion screen did not record all 16 checks.');
  }
  const learned = await page.locator('.learned-family b').allTextContents();
  if (learned.join('') !== '河海洗池泳') {
    throw new Error(`Unexpected completion family: ${learned.join('')}`);
  }

  const visualAudit = await page.evaluate(() => {
    const all = [...document.querySelectorAll('*')];
    return {
      gradients: all.filter((element) => getComputedStyle(element).backgroundImage.includes('gradient')).length,
      shadows: all.filter((element) => getComputedStyle(element).boxShadow !== 'none').length,
      smallestButton: Math.min(...[...document.querySelectorAll('button')].map((button) => {
        const rect = button.getBoundingClientRect();
        return Math.min(rect.width, rect.height);
      })),
    };
  });
  if (visualAudit.gradients || visualAudit.shadows) {
    throw new Error(`Flat-design audit failed: ${JSON.stringify(visualAudit)}.`);
  }
  if (visualAudit.smallestButton < 44) {
    throw new Error(`A touch target is smaller than 44px: ${visualAudit.smallestButton}px.`);
  }

  await page.waitForTimeout(300);
  const artifactDirectory = path.join(__dirname, '..', 'artifacts');
  fs.mkdirSync(artifactDirectory, { recursive: true });
  await page.screenshot({
    path: path.join(artifactDirectory, 'water-course-complete.png'),
    fullPage: true,
  });

  await browser.close();
  if (errors.length > 0) throw new Error(`Browser errors:\n${errors.join('\n')}`);
  console.log('WATER_COURSE_COMPLETE_OK');
})();
