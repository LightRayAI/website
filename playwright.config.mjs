import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.mjs',
  fullyParallel: true,
  workers: 3,
  timeout: 45000,
  expect: { timeout: 7000 },
  use: { baseURL: process.env.SITE_URL || 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  reporter: 'list',
  webServer: process.env.SITE_URL ? undefined : { command: 'npm run preview', url: 'http://127.0.0.1:4173/website/', reuseExistingServer: !process.env.CI },
});
