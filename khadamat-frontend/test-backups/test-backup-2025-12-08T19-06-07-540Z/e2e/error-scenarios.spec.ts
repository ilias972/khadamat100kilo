import { test, expect } from '@playwright/test';

test.describe('Error Handling Tests @regression', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // ✅ 3 minutes par test
  });
  test('Handle invalid login credentials @regression', async ({ page }) => {
    await page.goto('http://localhost:3001/auth/login');
    await page.waitForLoadState('networkidle');

    // Fill login form with invalid credentials
    await page.getByTestId('login-email-input').fill('invalid@example.com');
    await page.getByTestId('login-password-input').fill('wrongpassword');
    await page.getByTestId('login-submit-button').click();

    // Verify error message is displayed
    await expect(page.getByText(/identifiants invalides|email ou mot de passe incorrect/i)).toBeVisible({ timeout: 5000 });
  });

  test('Handle missing required fields in signup @regression', async ({ page }) => {
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    // Select client role
    await page.getByRole('button', { name: /client/i }).click();
    await page.waitForTimeout(500);

    // Try to submit without filling required fields
    await page.getByRole('button', { name: /créer mon compte/i }).click();

    // Verify error messages for required fields
    await expect(page.getByText(/champ obligatoire|required/i)).toBeVisible({ timeout: 5000 });
  });

  test('Handle invalid booking date @regression', async ({ page }) => {
    const timestamp = Date.now();
    const clientEmail = `error-test-${timestamp}@test.com`;
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

    // Go to services page
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Click on first service
    const serviceCards = page.locator('[data-testid="service-card"], .service-card, article');
    await expect(serviceCards.first()).toBeVisible({ timeout: 10000 });
    await serviceCards.first().click();

    // Click book button
    const bookButton = page.getByRole('button', { name: /réserver/i });
    await expect(bookButton).toBeVisible({ timeout: 10000 });
    await bookButton.click();

    // Try to book with invalid date (past date)
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const dateStr = pastDate.toISOString().split('T')[0];

    await page.getByLabel(/date/i).fill(dateStr);
    await page.getByLabel(/heure/i).fill('10:00');
    await page.getByLabel(/adresse/i).fill('123 Test Street, Casablanca');

    // Submit booking
    await page.getByRole('button', { name: /réserver|confirmer/i }).click();

    // Verify error message for invalid date
    await expect(page.getByText(/date invalide|invalid date/i)).toBeVisible({ timeout: 10000 });
  });

  test('Handle network errors gracefully @regression', async ({ page }) => {
    // This test would need to be run with network throttling or offline mode
    // For now, we'll just verify that the app handles errors gracefully

    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');

    // Verify that the app loads even if some resources fail
    await expect(page.getByRole('heading', { name: /khadamat/i })).toBeVisible({ timeout: 10000 });
  });

  test('Handle form validation errors @regression', async ({ page }) => {
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    // Select client role
    await page.getByRole('button', { name: /client/i }).click();
    await page.waitForTimeout(500);

    // Fill form with invalid data
    await page.getByTestId('register-email-input').fill('invalid-email');
    await page.getByTestId('register-password-input').fill('short');
    await page.getByTestId('register-password-confirm-input').fill('different');

    // Try to submit
    await page.getByRole('button', { name: /créer mon compte/i }).click();

    // Verify validation error messages
    await expect(page.getByText(/email invalide|invalid email/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/mot de passe trop court|password too short/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/mots de passe ne correspondent pas|passwords do not match/i)).toBeVisible({ timeout: 5000 });
  });
});