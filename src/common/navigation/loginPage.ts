import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/account/login');
  }

  async enterEmail(email: string) {
    await this.page.getByLabel(/email/i).fill(email);
  }

  async enterPassword(password: string) {
    await this.page.getByLabel(/password/i).fill(password);
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: /^log in$/i }).click();
  }

  async expectLoginError() {
    await expect(
      this.page.getByText(/no account was found/i)
    ).toBeVisible();
  }
}