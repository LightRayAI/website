import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('a Chinese example switches independently to English and preserves disclosure state', async ({ page }) => {
  await page.goto('/website/zh/data/');
  const card = page.locator('[data-offering="reasoning"] [data-example-card]');
  const sibling = page.locator('[data-offering="agentic"] [data-example-card]');
  const toggle = card.locator('[data-example-language-toggle]');
  await expect(toggle).toHaveAccessibleName(/^English /);
  await expect(toggle).toHaveAttribute('lang', 'zh-CN');
  await expect(card.locator('[data-example-language-note]')).toHaveText('（翻译）');
  await expect(card.locator('[data-example-locale="zh"]')).toBeVisible();
  await card.locator('[data-example-locale="zh"] summary').click();
  await expect(card.locator('[data-example-locale="zh"] details')).toHaveAttribute('open', '');
  await toggle.click();
  await expect(card.locator('[data-example-locale="en"]')).toBeVisible();
  await expect(card.locator('[data-example-locale="zh"]')).toBeHidden();
  await expect(card.locator('[data-example-language-note]')).toHaveText('English original');
  await expect(toggle).toHaveAccessibleName(/^中文 /);
  await expect(toggle).toHaveAttribute('lang', 'zh-CN');
  await expect(card.locator('[data-example-locale="en"] details')).toHaveAttribute('open', '');
  await expect(sibling.locator('[data-example-locale="zh"]')).toBeVisible();
  await expect(sibling.locator('[data-example-language-note]')).toHaveText('（翻译）');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page).toHaveURL(/\/zh\/data\/$/);
  await expect(toggle).toBeFocused();
  await toggle.click();
  await expect(card.locator('[data-example-locale="zh"]')).toBeVisible();
  await expect(card.locator('[data-example-locale="zh"] details')).toHaveAttribute('open', '');
  await expect(card.locator('[data-example-language-note]')).toHaveText('（翻译）');
});

test('example controls work by keyboard and expanded translated equations fit mobile', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/website/en/data/');
  for (const id of ['reasoning', 'agentic', 'rsi']) {
    const card = page.locator(`[data-offering="${id}"] [data-example-card]`);
    const toggle = card.locator('[data-example-language-toggle]');
    await expect(toggle).toHaveAccessibleName(/^中文 /);
    await expect(toggle).toHaveAttribute('lang', 'en');
    await toggle.focus();
    await page.keyboard.press('Enter');
    const panel = card.locator('[data-example-locale="zh"]');
    await expect(panel).toBeVisible();
    await panel.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(panel.locator('details')).toHaveAttribute('open', '');
    await expect(panel.locator('math')).not.toHaveCount(0);
  }
  const placeholder = page.locator('[data-offering="trajectories"] [data-example-card]');
  await placeholder.locator('[data-example-language-toggle]').click();
  await expect(placeholder.locator('[data-example-locale="zh"]')).toContainText('示例待补充');
  await expect(placeholder.locator('details, .example-brief')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});

test('task excerpts, equations and acceptance disclosures remain readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto((process.env.SITE_URL || 'http://127.0.0.1:4173') + '/website/zh/data/');
  const card = page.locator('[data-offering="reasoning"] [data-example-card]');
  await expect(card.locator('[data-example-language-toggle]')).toBeHidden();
  await expect(card.locator('[data-example-locale="zh"]')).toBeVisible();
  await expect(card.locator('[data-example-locale="en"]')).toBeHidden();
  await expect(card.locator('[data-example-locale="zh"] .example-brief')).toBeVisible();
  await expect(card.locator('[data-example-locale="zh"] math')).not.toHaveCount(0);
  await card.locator('[data-example-locale="zh"] summary').click();
  await expect(card.locator('[data-example-locale="zh"] .example-facts')).toBeVisible();
  await context.close();
});
