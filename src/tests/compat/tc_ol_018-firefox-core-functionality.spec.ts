import { test, expect } from '@playwright/test';

test.describe('TC_OL_018 - Firefox compatibility', () => {
  test.skip(({ browserName }) => browserName !== 'firefox', 'Run this test only in Firefox');

  test('Verify core functionality in Firefox browser', async ({ page }) => {
    await page.goto('https://openlibrary.org/');

    await page.screenshot({
      path: 'test-results/tc_ol_018-01-firefox-home.png',
      fullPage: true,
    });

    const headerSearch = page.locator('#header-bar').getByRole('textbox', { name: /^search$/i });
    const headerSearchButton = page.locator('#header-bar').getByRole('button', { name: /search submit/i });

    await expect(page.getByRole('link', { name: /open library logo/i })).toBeVisible();
    await expect(page.getByRole('search').first()).toBeVisible();
    await expect(headerSearch).toBeVisible();
    await expect(headerSearchButton).toBeVisible();

    await headerSearch.fill('The Stranger');

    await page.screenshot({
      path: 'test-results/tc_ol_018-02-firefox-search-filled.png',
      fullPage: true,
    });

    await headerSearchButton.click();

    await page.screenshot({
      path: 'test-results/tc_ol_018-03-firefox-after-search.png',
      fullPage: true,
    });

    await expect(page.getByRole('heading', { name: /search books/i })).toBeVisible();
    await expect(page.locator('#contentBody').getByRole('textbox', { name: /^search$/i })).toBeVisible();

    await page.screenshot({
      path: 'test-results/tc_ol_018-04-firefox-layout-verified.png',
      fullPage: true,
    });
  });
});