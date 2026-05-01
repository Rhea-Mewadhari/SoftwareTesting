import { test, expect } from '@playwright/test';

test('TC_OL_010 - Verify bibliographic details load correctly', async ({ page }) => {
  await page.goto('https://openlibrary.org/');

  await page.screenshot({ path: 'test-results/01-home-page.png', fullPage: true });

  await page.getByRole('textbox', { name: /search/i }).fill('The Stranger Albert Camus');
  await page.getByRole('button', { name: /search submit/i }).click();

  await page.screenshot({ path: 'test-results/02-search-results.png', fullPage: true });

  const bookLink = page.getByRole('link', {
    name: /the stranger.*albert camus|albert camus.*the stranger/i,
  }).first();

  await expect(bookLink).toBeVisible();
  await bookLink.click();

  await expect(page).toHaveURL(/\/works\/|\/books\//);
  await page.screenshot({ path: 'test-results/03-book-details-page.png', fullPage: true });

  await expect(page.locator('body')).toContainText(/publish date/i);
  await expect(page.locator('body')).toContainText(/publisher/i);

  await page.screenshot({ path: 'test-results/04-metadata-verified.png', fullPage: true });
});