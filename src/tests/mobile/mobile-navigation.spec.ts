import { test, expect } from '@playwright/test';
import { HomePage } from '../../common/navigation/homePage';
import { captureEvidence } from '../../common/utils/evidence';

test.use({
  viewport: { width: 390, height: 844 },
});

test('Navigation menu is accessible on mobile viewports', async ({ page }, testInfo) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await captureEvidence(page, testInfo, '01-home-mobile');

  await homePage.expectNoHorizontalScroll();

  await homePage.openMobileMenu();
  await captureEvidence(page, testInfo, '02-mobile-menu-open');

  await expect(page.getByRole('link', { name: /search/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /log in|login/i })).toBeVisible();
});