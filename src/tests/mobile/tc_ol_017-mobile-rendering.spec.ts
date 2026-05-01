import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 14'],
});

test('TC_OL_017 - Verify menu accessibility on mobile viewports', async ({ page }) => {
  await page.goto('https://openlibrary.org/');

  await page.screenshot({
    path: 'test-results/tc_ol_017-01-home-mobile.png',
    fullPage: true,
  });

  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasHorizontalScroll).toBeFalsy();

  const menuButton = page.getByAltText(/additional options menu/i);
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  await page.screenshot({
    path: 'test-results/tc_ol_017-02-menu-open.png',
    fullPage: true,
  });

  const mobileMenu = page.locator('#header-bar');

  await expect(page.getByRole('button', { name: /search submit/i })).toBeVisible();
  await expect(mobileMenu.getByRole('link', { name: /^log in$/i })).toBeVisible();
  await expect(mobileMenu.getByRole('link', { name: /^sign up$/i })).toBeVisible();
  await expect(mobileMenu.getByRole('link', { name: /^subjects$/i })).toBeVisible();

  await page.screenshot({
    path: 'test-results/tc_ol_017-03-menu-verified.png',
    fullPage: true,
  });
});