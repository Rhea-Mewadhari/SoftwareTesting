import { test, expect } from '@playwright/test';

test('open home page', async ({ page }) => {
  await page.goto('https://openlibrary.org/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Open Library/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://openlibrary.org/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});