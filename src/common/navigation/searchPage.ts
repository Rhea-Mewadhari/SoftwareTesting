import { Page, expect } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async gotoHome() {
    await this.page.goto('https://openlibrary.org/');
  }

  async searchFor(query: string) {
    await this.page.getByRole('textbox', { name: /search/i }).fill(query);
    await this.page.getByRole('button', { name: /search/i }).click();
    await expect(this.page).toHaveURL(/search/);
  }

  async clickBookTitle(title: string) {
    await this.page.getByRole('link', { name: new RegExp(title, 'i') }).first().click();
  }
}