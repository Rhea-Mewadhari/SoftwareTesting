import { test } from '@playwright/test';
import { LoginPage } from '../../common/navigation/loginPage';
import { captureEvidence } from '../../common/utils/evidence';

test('Login with unregistered email shows error', async ({ page }, testInfo) => {
  const login = new LoginPage(page);

  await login.goto();
  await captureEvidence(page, testInfo, 'login-page');

  await login.enterEmail('fake@null.com');
  await login.enterPassword('12345');

  await captureEvidence(page, testInfo, 'login-form-filled');

  await login.clickLogin();
  await login.expectLoginError();

  await captureEvidence(page, testInfo, 'login-error-result');
});