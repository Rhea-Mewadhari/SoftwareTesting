import { test, expect } from '@playwright/test';

test('open home page', async ({ page }) => {
  await page.goto('https://openlibrary.org/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Open Library/);
});