import { test, expect } from '@playwright/test';

test.describe('Bookings Tests @regression', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // ✅ 3 minutes par test
  });
  test('Create a booking as client', async ({ page }) => {
    const timestamp = Date.now();
    const clientEmail = `booking-test-${timestamp}@test.com`;
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
    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards.first()).toBeVisible({ timeout: 10000 });
    await serviceCards.first().click();

    // Click book button
    const bookButton = page.getByRole('button', { name: /réserver/i });
    await expect(bookButton).toBeVisible({ timeout: 10000 });
    await bookButton.click();

    // Fill booking form - clean, deterministic approach
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    // Single, explicit contract using data-testid
    await page.getByTestId('booking-date-input').fill(dateStr);
    await page.getByTestId('booking-time-input').fill('10:00');
    await page.getByTestId('booking-address-input').fill('123 Test Street, Casablanca');

    // Submit booking - clean, deterministic approach
    await page.getByTestId('booking-submit-button').click();
    await page.waitForTimeout(2000);

    // Verify booking confirmation - single, explicit contract
    await expect(page.getByTestId('booking-confirmation-message')).toContainText(/réservation confirmée/i, { timeout: 10000 });
  });

  test('View booking history', async ({ page }) => {
    const timestamp = Date.now();
    const clientEmail = `history-test-${timestamp}@test.com`;
    const password = 'Test123!@#';

    // Signup and create booking
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

    // Create a booking
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards.first()).toBeVisible({ timeout: 10000 });
    await serviceCards.first().click();

    const bookButton = page.getByRole('button', { name: /réserver/i });
    await expect(bookButton).toBeVisible({ timeout: 10000 });
    await bookButton.click();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    await page.getByLabel(/date/i).fill(dateStr);
    await page.getByLabel(/heure/i).fill('10:00');
    await page.getByLabel(/adresse/i).fill('123 Test Street, Casablanca');

    await page.getByRole('button', { name: /réserver|confirmer/i }).click();
    await page.waitForTimeout(2000);

    // Go to booking history
    await page.goto('http://localhost:3001/dashboard/client/history');
    await page.waitForLoadState('networkidle');

    // Verify booking is visible in history
    await expect(page.locator('[data-testid="booking-card"]').first()).toBeVisible({ timeout: 10000 });
  });
});