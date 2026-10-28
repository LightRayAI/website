import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('a Chinese example switches independently to English and back', async ({ page }) => {
  await page.goto('/website/zh/data/');
  const card = page.locator('[data-offering="reasoning"] [data-example-card]');
  const sibling = page.locator('[data-offering="agentic"] [data-example-card]');
  const toggle = card.locator('[data-example-language-toggle]');
  await expect(toggle).toHaveAccessibleName(/^English /);
  await expect(toggle).toHaveAttribute('lang', 'zh-CN');
  await expect(card.locator('[data-example-language-note]')).toHaveText('（翻译）');
  await expect(card.locator('[data-example-locale="zh"]')).toBeVisible();
  await toggle.click();
  await expect(card.locator('[data-example-locale="en"]')).toBeVisible();
  await expect(card.locator('[data-example-locale="zh"]')).toBeHidden();
  await expect(card.locator('[data-example-language-note]')).toHaveText('English original');
  await expect(toggle).toHaveAccessibleName(/^中文 /);
  await expect(toggle).toHaveAttribute('lang', 'zh-CN');
  await expect(sibling.locator('[data-example-locale="zh"]')).toBeVisible();
  await expect(sibling.locator('[data-example-language-note]')).toHaveText('（翻译）');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page).toHaveURL(/\/zh\/data\/$/);
  await expect(toggle).toBeFocused();
  await toggle.click();
  await expect(card.locator('[data-example-locale="zh"]')).toBeVisible();
  await expect(card.locator('[data-example-language-note]')).toHaveText('（翻译）');
});

test('example controls work by keyboard and translated equations fit mobile', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/website/en/data/');
  for (const id of ['reasoning', 'agentic', 'trajectories', 'rsi']) {
    const card = page.locator(`[data-offering="${id}"] [data-example-card]`);
    const toggle = card.locator('[data-example-language-toggle]');
    await expect(toggle).toHaveAccessibleName(/^中文 /);
    await expect(toggle).toHaveAttribute('lang', 'en');
    await toggle.focus();
    await page.keyboard.press('Enter');
    const panel = card.locator('[data-example-locale="zh"]');
    await expect(panel).toBeVisible();
    await expect(panel.locator('math')).not.toHaveCount(0);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});

test('task excerpts and equations remain readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto((process.env.SITE_URL || 'http://127.0.0.1:4173') + '/website/zh/data/');
  const card = page.locator('[data-offering="reasoning"] [data-example-card]');
  await expect(card.locator('[data-example-language-toggle]')).toBeHidden();
  await expect(card.locator('[data-example-locale="zh"]')).toBeVisible();
  await expect(card.locator('[data-example-locale="en"]')).toBeHidden();
  await expect(card.locator('[data-example-locale="zh"] .example-brief')).toBeVisible();
  await expect(card.locator('[data-example-locale="zh"] math')).not.toHaveCount(0);
  await context.close();
});
