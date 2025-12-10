import { test, expect } from '@playwright/test';

test.describe('Messaging Tests @regression', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // ✅ 3 minutes par test
  });
  test('Send message between client and professional @regression', async ({ page }) => {
    const timestamp = Date.now();
    const proEmail = `messaging-pro-${timestamp}@test.com`;
    const clientEmail = `messaging-client-${timestamp}@test.com`;
    const password = 'Test123!@#';

    // Signup as professional
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /professionnel/i }).click();
    await page.waitForTimeout(500);

    await page.getByTestId('register-email-input').fill(proEmail);
    await page.getByTestId('register-phone-input').fill('+212600000001');
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);

    await page.getByRole('button', { name: /continuer/i }).click();
    await page.waitForTimeout(1000);

    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Pro');
    await page.getByTestId('register-profession-input').fill('Test Professional');

    await page.getByRole('button', { name: /créer mon compte/i }).click();
    await page.waitForURL('**/dashboard/pro', { timeout: 15000 });

    // Create a service
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const createButton = page.getByRole('button', { name: /créer.*service/i });
    await expect(createButton).toBeVisible({ timeout: 15000 });
    await createButton.click();

    await page.getByLabel(/nom du service/i).fill('Test Service');
    await page.getByLabel(/description/i).fill('Test service description');
    await page.getByLabel(/prix/i).fill('100');
    await page.getByLabel(/catégorie/i).selectOption('Test');

    await page.getByRole('button', { name: /publier|créer/i }).click();
    await page.waitForTimeout(2000);

    // Logout
    await page.getByRole('button', { name: /déconnexion|logout/i }).click();
    await page.waitForURL('**/login', { timeout: 5000 });

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
    await page.getByTestId('register-phone-input').fill('+212600000002');

    await page.getByRole('button', { name: /créer mon compte/i }).click();
    await page.waitForURL('**/dashboard', { timeout: 15000 });

    // Book the service
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

    // Go to messages
    await page.goto('http://localhost:3001/dashboard/client/messages');
    await page.waitForLoadState('networkidle');

    // Send a message
    await page.getByPlaceholder(/votre message|type a message/i).fill('Hello, this is a test message');
    await page.getByRole('button', { name: /envoyer|send/i }).click();

    // Verify message is sent
    await expect(page.getByText(/message envoyé|message sent/i)).toBeVisible({ timeout: 10000 });
  });

  test('View message history @regression', async ({ page }) => {
    const timestamp = Date.now();
    const proEmail = `history-pro-${timestamp}@test.com`;
    const clientEmail = `history-client-${timestamp}@test.com`;
    const password = 'Test123!@#';

    // Setup: Create pro, service, client, and booking
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /professionnel/i }).click();
    await page.waitForTimeout(500);

    await page.getByTestId('register-email-input').fill(proEmail);
    await page.getByTestId('register-phone-input').fill('+212600000001');
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);

    await page.getByRole('button', { name: /continuer/i }).click();
    await page.waitForTimeout(1000);

    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Pro');
    await page.getByTestId('register-profession-input').fill('Test Professional');

    await page.getByRole('button', { name: /créer mon compte/i }).click();
    await page.waitForURL('**/dashboard/pro', { timeout: 15000 });

    // Create service
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const createButton = page.getByRole('button', { name: /créer.*service/i });
    await expect(createButton).toBeVisible({ timeout: 15000 });
    await createButton.click();

    await page.getByLabel(/nom du service/i).fill('Test Service');
    await page.getByLabel(/description/i).fill('Test service description');
    await page.getByLabel(/prix/i).fill('100');
    await page.getByLabel(/catégorie/i).selectOption('Test');

    await page.getByRole('button', { name: /publier|créer/i }).click();
    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: /déconnexion|logout/i }).click();
    await page.waitForURL('**/login', { timeout: 5000 });

    // Signup as client and book
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /client/i }).click();
    await page.waitForTimeout(500);

    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Client');
    await page.getByTestId('register-email-input').fill(clientEmail);
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);
    await page.getByTestId('register-phone-input').fill('+212600000002');

    await page.getByRole('button', { name: /créer mon compte/i }).click();
    await page.waitForURL('**/dashboard', { timeout: 15000 });

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

    // Send a message
    await page.goto('http://localhost:3001/dashboard/client/messages');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder(/votre message|type a message/i).fill('Test message');
    await page.getByRole('button', { name: /envoyer|send/i }).click();
    await page.waitForTimeout(1000);

    // Go to messages and verify history
    await page.goto('http://localhost:3001/dashboard/client/messages');
    await page.waitForLoadState('networkidle');

    // Verify message is visible in history
    await expect(page.getByText('Test message')).toBeVisible({ timeout: 10000 });
  });
});