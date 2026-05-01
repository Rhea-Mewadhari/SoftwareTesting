import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPad'],
});

test('TC_OL_019 - Verify layout adjusts for tablet screens', async ({ page }) => {
  await page.goto('https://openlibrary.org/');

  await page.screenshot({
    path: 'test-results/tc_ol_019-01-ipad-home.png',
    fullPage: true,
  });

  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasHorizontalScroll).toBeFalsy();

  await expect(page.getByRole('link', { name: /open library logo/i })).toBeVisible();
  await expect(page.getByRole('search').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /welcome to open library/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /books we love/i })).toBeVisible();

  const firstCard = page.getByRole('listbox').first().locator('a').first();
  await expect(firstCard).toBeVisible();

  const cardBox = await firstCard.boundingBox();
  expect(cardBox).not.toBeNull();
  expect(cardBox!.width).toBeGreaterThan(40);
  expect(cardBox!.height).toBeGreaterThan(40);

  await page.screenshot({
    path: 'test-results/tc_ol_019-02-ipad-layout-verified.png',
    fullPage: true,
  });
});