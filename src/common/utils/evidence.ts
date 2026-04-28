import { Page, TestInfo } from '@playwright/test';

export async function captureEvidence(
  page: Page,
  testInfo: TestInfo,
  name: string
) {
  const path = testInfo.outputPath(`${name}.png`);
  await page.screenshot({
    path,
    fullPage: true,
  });

  await testInfo.attach(name, {
    path,
    contentType: 'image/png',
  });
}