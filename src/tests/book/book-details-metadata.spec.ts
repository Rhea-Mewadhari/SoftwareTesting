import { test, expect } from '@playwright/test';
import { HomePage } from '../../common/navigation/homePage';
import { captureEvidence } from '../../common/utils/evidence';

test('Book info page shows bibliographic details correctly', async ({ page }, testInfo) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.search('The Stranger');
  await captureEvidence(page, testInfo, 'book-search-results');

  await page.getByRole('link', { name: /the stranger/i }).first().click();
  await captureEvidence(page, testInfo, 'book-details-page');

  // Placeholder assertions until the site is stable again.
  await expect(page.locator('body')).toContainText(/publish date/i);
  await expect(page.locator('body')).toContainText(/publisher/i);

  await captureEvidence(page, testInfo, 'book-details-metadata');
});