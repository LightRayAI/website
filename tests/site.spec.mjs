import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('language navigation preserves a deep project page and all localized content', async ({ page }) => {
  await page.goto('/website/en/research/collideragent/');
  await expect(page.locator('h1')).toHaveText('ColliderAgent');
  await page.locator('[data-language-switch]').click();
  await expect(page).toHaveURL(/\/zh\/research\/collideragent\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('heading', { name: '研究概述' })).toBeVisible();
  await expect(page.locator('[data-full-description]')).toContainText('10篇');
  await page.reload();
  await expect(page.locator('h1')).toHaveText('ColliderAgent');
  await page.goto('/website/');
  await expect(page).toHaveURL(/\/zh\/$/);
});

test('combined filters, empty state, reset, and language query transfer work', async ({ page }) => {
  await page.goto('/website/en/research/');
  await expect(page.locator('[data-project]:visible')).toHaveCount(6);
  await page.getByRole('button', { name: 'AI for Science', exact: true }).click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(2);
  await page.locator('#relationship-filter').selectOption('core_contribution');
  await expect(page.locator('[data-project]:visible')).toHaveCount(1);
  await expect(page.locator('[data-project]:visible')).toHaveAttribute('data-project', 'autoresearchclaw');
  await page.reload();
  await expect(page.locator('[data-project]:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Physics of AI', exact: true }).click();
  await expect(page.locator('[data-empty-state]')).toBeVisible();
  await expect(page.locator('[data-result-count]')).toHaveText('0 projects');
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(6);
  await page.getByRole('button', { name: 'AI Evaluation', exact: true }).click();
  await page.locator('[data-language-switch]').click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(3);
  await expect(page.locator('[data-result-count]')).toHaveText('3 个项目');
  await expect(page).toHaveURL(/\/zh\/research\/\?track=3/);
});

test('mobile navigation supports keyboard dismissal and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/website/en/');
  const toggle = page.locator('.menu-toggle');
  await expect(toggle).toHaveAccessibleName('Open navigation');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAccessibleName('Close navigation');
  await expect(page.locator('#main-nav a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('#main-nav').getByRole('link', { name: 'Scientific Data' }).click();
  await expect(page).toHaveURL(/\/en\/data\/$/);
  await expect(page.getByRole('heading', { name: /The work of discovery/ })).toBeVisible();
});

test('static content and localization remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto((process.env.SITE_URL || 'http://127.0.0.1:4173') + '/website/en/research/');
  await expect(page.locator('[data-project]:visible')).toHaveCount(6);
  await expect(page.locator('[data-filters]')).toBeHidden();
  await page.locator('[data-language-switch]').click();
  await expect(page.locator('h1')).toHaveText('构建、理解、评估。');
  await context.close();
});

for (const lang of ['en', 'zh']) {
  test(`${lang} pages fit desktop and narrow mobile screens with no broken images or runtime errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const routes = ['', 'data/', 'research/', 'team/', 'research/autoresearchclaw/', 'research/detailed_balance/', 'research/phybench/'];
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        const response = await page.goto(`/website/${lang}/${route}`);
        expect(response.status()).toBe(200);
        for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
        await page.locator('footer').scrollIntoViewIfNeeded();
        await expect.poll(() => page.locator('img').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${lang}/${route} overflows at ${width}px`).toBe(true);
      }
    }
    expect(errors).toEqual([]);
  });
}

for (const route of ['en/', 'en/data/', 'en/research/', 'en/team/', 'en/research/collideragent/', 'zh/', 'zh/data/', 'zh/research/', 'zh/team/']) {
  test(`accessible page: ${route}`, async ({ page }) => {
    await page.goto(`/website/${route}`);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('404 offers functional localized recovery links', async ({ page }) => {
  const response = await page.goto('/website/nonexistent-page/');
  expect(response.status()).toBe(404);
  await page.getByRole('link', { name: '返回中文首页' }).click();
  await expect(page).toHaveURL(/\/zh\/$/);
});

for (const lang of ['en', 'zh']) {
  for (const route of ['data', 'team']) {
    test(`${lang} ${route} contact dialog shows Bo Wang's details and restores focus`, async ({ page }) => {
      await page.goto(`/website/${lang}/${route}/`);
      await expect(page.locator('.footer-contact').getByRole('link', { name: /boyuuwang@gmail.com/ })).toHaveAttribute('href', 'mailto:boyuuwang@gmail.com');
      const trigger = page.locator('[data-contact-open]');
      const dialog = page.getByRole('dialog');
      await trigger.click();
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading')).toHaveText(lang === 'zh' ? '王波的联系方式' : 'Contact Bo Wang');
      await expect(dialog.getByRole('link', { name: '15058009729' })).toHaveAttribute('href', 'tel:+8615058009729');
      await expect(dialog.getByRole('link', { name: 'boyuuwang@gmail.com' })).toHaveAttribute('href', 'mailto:boyuuwang@gmail.com');
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
      await page.setViewportSize({ width: 320, height: 700 });
      await trigger.click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await dialog.getByRole('button', { name: lang === 'zh' ? '关闭' : 'Close', exact: true }).click();
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
    });
  }
}

test('deployment update refreshes cached pages without losing query or hash or looping', async ({ page }) => {
  await page.route('**/version.json?*', route => route.fulfill({ json: { version: 'newrelease2026' } }));
  let navigations = 0;
  page.on('framenavigated', frame => { if (frame === page.mainFrame()) navigations += 1; });
  await page.goto('/website/zh/data/?source=test#main');
  await expect(page).toHaveURL(/source=test&v=newrelease2026#main$/);
  const before = navigations;
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect.poll(() => page.locator('h1').innerText()).toContain('科学探索');
  expect(navigations).toBe(before);
});

test('deployment check tolerates network failures and preserves open contact dialogs', async ({ page }) => {
  await page.route('**/version.json?*', route => route.abort());
  await page.goto('/website/en/data/');
  await expect(page.locator('h1')).toContainText('The work of discovery');
  await page.locator('[data-contact-open]').click();
  await page.route('**/version.json?*', route => route.fulfill({ json: { version: 'nextrelease2026' } }));
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page).toHaveURL(/\/en\/data\/$/);
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect(page).toHaveURL(/v=nextrelease2026/);
});
