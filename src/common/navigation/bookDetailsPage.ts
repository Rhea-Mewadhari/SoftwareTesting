import { Page, expect } from '@playwright/test';

export class BookDetailsPage {
  constructor(private page: Page) {}

  async expectBookTitle(title: string) {
    await expect(
      this.page.getByRole('heading', { name: new RegExp(title, 'i') })
    ).toBeVisible();
  }

  async expectPublishDateVisible() {
    await expect(this.page.getByText(/publish date/i)).toBeVisible();
  }

  async expectPublisherVisible() {
    await expect(this.page.getByText(/publisher/i)).toBeVisible();
  }

  async expectMetadataPopulated() {
    // Broad checks for now since site is down and selectors may change.
    await expect(this.page.getByText(/isbn/i)).toBeVisible();
    await expect(this.page.locator('body')).toContainText(/publisher/i);
    await expect(this.page.locator('body')).toContainText(/publish date/i);
  }
}