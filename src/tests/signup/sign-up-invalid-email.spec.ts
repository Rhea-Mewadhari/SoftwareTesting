import { test } from '@playwright/test';
import { SignUpPage } from '../../common/navigation/signUpPage';

test('Sign up with invalid email shows error', async ({ page }) => {
  const signUp = new SignUpPage(page);

  await signUp.goto();

  await signUp.enterName('testuser');
  await signUp.enterEmail('invalid-email'); // invalid email
  await signUp.enterPassword('Password123!');

  await signUp.clickSignUp();

  await signUp.expectInvalidEmailError();
});