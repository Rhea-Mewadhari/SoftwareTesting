import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async search(query: string) {
    await this.page.getByRole('textbox', { name: /search/i }).fill(query);
    await this.page.getByRole('button', { name: /search submit/i }).click();
  }

  async openMobileMenu() {
    await this.page.getByLabel(/additional options menu/i).click();
  }

  async expectNoHorizontalScroll() {
    const hasHorizontalScroll = await this.page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();
  }
}