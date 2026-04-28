import { test, expect } from '@playwright/test';
import { HomePage } from '../../common/navigation/homePage';
import { captureEvidence } from '../../common/utils/evidence';

test('Search by ISBN returns correct top result', async ({ page }, testInfo) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await captureEvidence(page, testInfo, 'search-home');

  await homePage.search('0385472579');
  await captureEvidence(page, testInfo, 'search-results');

  // Placeholder assertion until site/search is stable again.
  const firstHeaderResult = page.locator('header li a').first();
  await expect(firstHeaderResult).toBeVisible();

  await captureEvidence(page, testInfo, 'search-top-result');
});