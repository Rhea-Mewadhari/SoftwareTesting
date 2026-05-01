import { test, expect } from '@playwright/test';

function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrast(rgb1: number[], rgb2: number[]) {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

test('TC_OL_020 - Verify text contrast meets accessibility needs', async ({ page }) => {
  await page.goto('https://openlibrary.org/');

  await page.screenshot({
    path: 'test-results/tc_ol_020-01-page.png',
    fullPage: true,
  });

  const title = page.getByRole('heading', { name: /welcome to open library/i });
  await expect(title).toBeVisible();

  // Extract colors
  const { color, backgroundColor } = await title.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      color: style.color,
      backgroundColor: style.backgroundColor,
    };
  });

  function parseRGB(rgb: string): [number, number, number] {
    return rgb.match(/\d+/g)!.map(Number) as [number, number, number];
  }

  const textRGB = parseRGB(color);
  const bgRGB = parseRGB(backgroundColor === 'rgba(0, 0, 0, 0)' ? 'rgb(255,255,255)' : backgroundColor);

  const contrast = getContrast(textRGB, bgRGB);

  console.log(`Contrast ratio: ${contrast}`);

  // WCAG AA for normal text
  expect(contrast).toBeGreaterThanOrEqual(4.5);

  await page.screenshot({
    path: 'test-results/tc_ol_020-02-contrast-checked.png',
    fullPage: true,
  });
});