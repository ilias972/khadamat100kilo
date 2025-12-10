import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('Navigate between main pages @smoke', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');

    // Verify home page loads
    expect(page.url()).toBe('http://localhost:3001/');

    // ✅ Clean, deterministic navigation using data-testid
    await page.getByTestId('nav-services-link').click();
    await page.waitForURL('**/services', { timeout: 10000 });
    expect(page.url()).toContain('/services');

    // Navigate to about - clean, deterministic approach
    await page.getByTestId('nav-about-link').click();
    await page.waitForURL('**/about', { timeout: 10000 });
    expect(page.url()).toContain('/about');

    // Navigate to contact - clean, deterministic approach
    await page.getByTestId('nav-contact-link').click();
    await page.waitForURL('**/contact', { timeout: 10000 });
    expect(page.url()).toContain('/contact');
  });

  test('Navigate to authentication pages @smoke', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');

    // Navigate to login - clean, deterministic approach
    await page.getByTestId('nav-login-link').click();
    await page.waitForURL('**/auth/login', { timeout: 10000 });
    expect(page.url()).toContain('/auth/login');

    // Navigate to signup - clean, deterministic approach
    await page.getByTestId('nav-signup-link').click();
    await page.waitForURL('**/auth/signup', { timeout: 10000 });
    expect(page.url()).toContain('/auth/signup');
  });

  test('Navigate dashboard pages as client @regression', async ({ page }) => {
    const timestamp = Date.now();
    const clientEmail = `nav-client-${timestamp}@test.com`;
    const password = 'Test123!@#';

    // Signup as client
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByTestId('register-role-client-button').click();
    await page.waitForTimeout(500);

    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Client');
    await page.getByTestId('register-email-input').fill(clientEmail);
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);
    await page.getByTestId('register-phone-input').fill('+212600000000');

    await page.getByTestId('register-submit-button').click();
    await page.waitForURL('**/dashboard', { timeout: 15000 });

    // Navigate to profile
    await page.getByTestId('nav-profile-link').click();
    await page.waitForURL('**/profile', { timeout: 10000 });
    expect(page.url()).toContain('/profile');

    // Navigate to messages
    await page.getByTestId('nav-messages-link').click();
    await page.waitForURL('**/messages', { timeout: 10000 });
    expect(page.url()).toContain('/messages');

    // Navigate to bookings
    await page.getByTestId('nav-bookings-link').click();
    await page.waitForURL('**/bookings', { timeout: 10000 });
    expect(page.url()).toContain('/bookings');
  });

  test('Navigate dashboard pages as professional @regression', async ({ page }) => {
    const timestamp = Date.now();
    const proEmail = `nav-pro-${timestamp}@test.com`;
    const password = 'Test123!@#';

    // Signup as professional
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByTestId('register-role-provider-button').click();
    await page.waitForTimeout(500);

    await page.getByTestId('register-email-input').fill(proEmail);
    await page.getByTestId('register-phone-input').fill('+212600000000');
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);

    await page.getByRole('button', { name: /continuer/i }).click();
    await page.waitForTimeout(1000);

    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Pro');
    await page.getByTestId('register-profession-input').fill('Test Professional');

    await page.getByTestId('register-submit-button').click();
    await page.waitForURL('**/dashboard/pro', { timeout: 15000 });

    // Navigate to services
    await page.getByTestId('nav-services-link').click();
    await page.waitForURL('**/services', { timeout: 10000 });
    expect(page.url()).toContain('/services');

    // Navigate to bookings
    await page.getByTestId('nav-bookings-link').click();
    await page.waitForURL('**/bookings', { timeout: 10000 });
    expect(page.url()).toContain('/bookings');

    // Navigate to messages
    await page.getByTestId('nav-messages-link').click();
    await page.waitForURL('**/messages', { timeout: 10000 });
    expect(page.url()).toContain('/messages');
  });
});