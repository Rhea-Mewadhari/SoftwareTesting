import { test } from '@playwright/test';
import { LoginPage } from '../../common/navigation/loginPage';

test('Login with unregistered email shows error', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();

  await login.enterEmail('fake@null.com');
  await login.enterPassword('12345');

  await login.clickLogin();

  await login.expectLoginError();
});