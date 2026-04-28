import { Page, expect } from '@playwright/test';

export class SignUpPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://openlibrary.org/account/create');
  }

  async enterName(name: string) {
    await this.page.getByLabel(/username|name/i).fill(name);
  }

  async enterEmail(email: string) {
    await this.page.getByLabel(/email/i).fill(email);
  }

  async enterPassword(password: string) {
    await this.page.getByLabel(/password/i).fill(password);
  }

  async clickSignUp() {
    await this.page.getByRole('button', { name: /sign up with email/i }).click();
  }

  async expectInvalidEmailError() {
    const emailInput = this.page.getByLabel(/email/i);

    await expect(emailInput).toBeVisible();

    const isInvalid = await emailInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity()
    );

    expect(isInvalid).toBeTruthy();
  }

}