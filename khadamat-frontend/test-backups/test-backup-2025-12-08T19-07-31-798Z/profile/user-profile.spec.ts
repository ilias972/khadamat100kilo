import { test, expect } from '@playwright/test';

test.describe('Profile Management Tests @regression', () => {
  test('Update client profile', async ({ page }) => {
    const timestamp = Date.now();
    const clientEmail = `profile-test-${timestamp}@test.com`;
    const password = 'Test123!@#';

    // Signup as client
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /client/i }).click();
    await page.waitForTimeout(500);

    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Client');
    await page.getByTestId('register-email-input').fill(clientEmail);
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);
    await page.getByTestId('register-phone-input').fill('+212600000000');

    await page.getByRole('button', { name: /créer mon compte/i }).click();
    await page.waitForURL('**/dashboard', { timeout: 15000 });

    // Go to profile page
    await page.goto('http://localhost:3001/dashboard/client/profile');
    await page.waitForLoadState('networkidle');

    // Update profile information - clean, deterministic approach
    await page.getByTestId('profile-firstname-input').fill('Updated');
    await page.getByTestId('profile-lastname-input').fill('User');
    await page.getByTestId('profile-phone-input').fill('+212611111111');

    // Save changes - clean, deterministic approach
    await page.getByTestId('profile-save-button').click();
    await page.waitForTimeout(1000);

    // Verify profile update - single, explicit contract
    await expect(page.getByTestId('profile-update-success')).toContainText(/profil mis à jour/i, { timeout: 10000 });
  });

  test('Update professional profile @regression', async ({ page }) => {
    const timestamp = Date.now();
    const proEmail = `profile-pro-${timestamp}@test.com`;
    const password = 'Test123!@#';

    // Signup as professional
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /professionnel/i }).click();
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

    await page.getByRole('button', { name: /créer mon compte/i }).click();
    await page.waitForURL('**/dashboard/pro', { timeout: 15000 });

    // Go to profile page
    await page.goto('http://localhost:3001/dashboard/pro/settings');
    await page.waitForLoadState('networkidle');

    // Update profile information - clean, deterministic approach
    await page.getByTestId('profile-firstname-input').fill('Updated');
    await page.getByTestId('profile-lastname-input').fill('Pro');
    await page.getByTestId('profile-profession-input').fill('Updated Professional');

    // Save changes - clean, deterministic approach
    await page.getByTestId('profile-save-button').click();
    await page.waitForTimeout(1000);

    // Verify profile update - single, explicit contract
    await expect(page.getByTestId('profile-update-success')).toContainText(/profil mis à jour/i, { timeout: 10000 });
  });

  test('View profile information @regression', async ({ page }) => {
    const timestamp = Date.now();
    const clientEmail = `view-profile-${timestamp}@test.com`;
    const password = 'Test123!@#';

    // Signup as client
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /client/i }).click();
    await page.waitForTimeout(500);

    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Client');
    await page.getByTestId('register-email-input').fill(clientEmail);
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);
    await page.getByTestId('register-phone-input').fill('+212600000000');

    await page.getByRole('button', { name: /créer mon compte/i }).click();
    await page.waitForURL('**/dashboard', { timeout: 15000 });

    // Go to profile page
    await page.goto('http://localhost:3001/dashboard/client/profile');
    await page.waitForLoadState('networkidle');

    // Verify profile information is displayed
    await expect(page.getByText('Test')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Client')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(clientEmail)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('+212600000000')).toBeVisible({ timeout: 5000 });
  });
});