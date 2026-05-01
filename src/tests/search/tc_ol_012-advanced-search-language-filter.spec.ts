import { test, expect } from '@playwright/test';

test('TC_OL_012 - Verify language filters return filtered results', async ({ page }) => {
  await page.goto('https://openlibrary.org/advancedsearch');

  await page.screenshot({
    path: 'test-results/tc_ol_012-01-advanced-search-page.png',
    fullPage: true,
  });

  // Select language filter
  await page.getByLabel(/language/i).selectOption({ label: 'Afrikaans' });

  await page.screenshot({
    path: 'test-results/tc_ol_012-02-language-selected.png',
    fullPage: true,
  });

  // Submit search
  await page.getByRole('button', { name: /search/i }).click();

  await expect(page).toHaveURL(/search/i);

  await page.screenshot({
    path: 'test-results/tc_ol_012-03-search-results.png',
    fullPage: true,
  });

  // Verify results page loaded
  await expect(page.locator('body')).toContainText(/afrikaans/i);

  // Broad validation for now:
  // confirm visible result metadata references Afrikaans
  const resultsText = await page.locator('body').innerText();
  expect(resultsText).toMatch(/afrikaans/i);

  await page.screenshot({
    path: 'test-results/tc_ol_012-04-language-filter-verified.png',
    fullPage: true,
  });
});