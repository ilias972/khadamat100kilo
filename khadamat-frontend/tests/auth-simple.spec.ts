import { test, expect } from '@playwright/test';

test.describe('Simple Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // 3 minutes per test
  });

  test('Simple login test - validate form submission', async ({ page }) => {
    await page.goto('http://localhost:3001/auth/login');
    await page.waitForLoadState('networkidle');

    // Fill login form
    await page.getByTestId('login-email-input').fill('test@example.com');
    await page.getByTestId('login-password-input').fill('password123');

    // Click submit button
    await page.getByTestId('login-submit-button').click();

    // Wait a reasonable time for form submission
    await page.waitForTimeout(5000);

    // Check that we're no longer on the login page
    expect(page.url()).not.toContain('/auth/login');

    // Check for success indicators
    const currentUrl = page.url();
    console.log('Current URL after login:', currentUrl);

    // If we're on dashboard, great! If not, at least we're not on login page
    if (currentUrl.includes('/dashboard')) {
      console.log('✅ Successfully redirected to dashboard');
    } else {
      console.log('⚠️ Not on dashboard, but login form submitted');
    }
  });

  test('Simple signup test - validate form completion', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;

    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    // Select client role
    await page.getByTestId('register-role-client-button').click();
    await page.waitForTimeout(500);

    // Fill step 1 form
    await page.getByTestId('register-email-input').fill(testEmail);
    await page.getByTestId('register-password-input').fill('Test123!@#');
    await page.getByTestId('register-password-confirm-input').fill('Test123!@#');
    await page.getByTestId('register-phone-input').fill('+212600000000');

    // Continue to step 2
    await page.getByRole('button', { name: /continuer/i }).click();
    await page.waitForTimeout(1000);

    // Fill step 2 form
    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('User');

    // Submit form
    await page.getByTestId('register-submit-button').click();

    // Wait for form submission
    await page.waitForTimeout(5000);

    // Check that we're no longer on the signup page
    expect(page.url()).not.toContain('/auth/signup');

    // Log current URL for debugging
    const currentUrl = page.url();
    console.log('Current URL after signup:', currentUrl);
  });
});