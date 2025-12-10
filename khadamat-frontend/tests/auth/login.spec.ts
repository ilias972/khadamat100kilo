import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // ✅ 3 minutes par test
  });

  test('Login with valid credentials @smoke', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Fill login form with fresh test user credentials
    await page.getByTestId('login-email-input').fill('fresh-test-user@test.com');
    await page.getByTestId('login-password-input').fill('password123');

    // ✅ Vérifier que le formulaire est soumis
    await page.getByRole('button', { name: /se connecter/i }).click();

    // ✅ Attendre la redirection avec timeout augmenté
    await page.waitForURL('**/dashboard/client', {
      timeout: 90000 // 90 secondes pour les opérations d'authentification
    });

    // ✅ Vérifier que nous sommes bien sur le dashboard
    expect(page.url()).toMatch(/\/dashboard\/client/);

    // ✅ Vérifier que l'utilisateur est connecté en vérifiant le message de bienvenue
    await expect(page.getByText(/bonjour.*fresh/i)).toBeVisible();

    // ✅ Vérifier que le token est stocké correctement
    const accessToken = await page.evaluate(() => localStorage.getItem('khadamat_access_token'));
    const refreshToken = await page.evaluate(() => localStorage.getItem('khadamat_refresh_token'));
    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
  });

  test('Login with invalid credentials @regression', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Fill login form with invalid credentials
    await page.getByTestId('login-email-input').fill('nonexistent@test.com');
    await page.getByTestId('login-password-input').fill('wrongpassword');
    await page.getByRole('button', { name: /se connecter/i }).click();

    // Verify error message is displayed
    await expect(page.getByText(/identifiants invalides|email ou mot de passe incorrect/i)).toBeVisible({ timeout: 5000 });
  });

  test('Signup as professional @regression', async ({ page }) => {
    const timestamp = Date.now();
    const proEmail = `pro-test-${timestamp}@test.com`;
    const password = 'Test123!@#';

    await page.goto('/auth/signup');
    await page.waitForLoadState('networkidle');

    // Select professional role
    await page.getByTestId('register-role-provider-button').click();
    await page.waitForTimeout(500);

    // Fill signup form
    await page.getByTestId('register-email-input').fill(proEmail);
    await page.getByTestId('register-phone-input').fill('+212600000000');
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);

    // Continue to step 2
    await page.getByRole('button', { name: /continuer/i }).click();
    await page.waitForTimeout(1000);

    // Fill step 2 form
    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Professional');
    await page.getByTestId('register-profession-input').fill('Test Professional');

    // Submit
    await page.getByRole('button', { name: /créer mon compte/i }).click();

    // ✅ Attendre que la page se charge et vérifier le succès
    await page.waitForTimeout(3000); // Attendre que la navigation se termine

    // ✅ Vérifier que nous sommes bien sur le dashboard pro
    await page.waitForURL('**/dashboard/pro', { timeout: 30000 });

    // ✅ Vérifier que l'utilisateur est connecté en vérifiant le message de bienvenue
    // Clean, deterministic approach using data-testid
    await expect(page.getByTestId('auth-welcome-message')).toContainText(/bonjour/i, { timeout: 10000 });

    // ✅ Vérifier que le token est stocké correctement
    const accessToken = await page.evaluate(() => localStorage.getItem('khadamat_access_token'));
    const refreshToken = await page.evaluate(() => localStorage.getItem('khadamat_refresh_token'));
    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();

    // ✅ Vérifier que nous pouvons voir le contenu du dashboard pro
    await expect(page.getByText(/gérez vos réservations/i)).toBeVisible({ timeout: 10000 });
  });

  test('Signup as client @regression', async ({ page }) => {
    const timestamp = Date.now();
    const clientEmail = `client-test-${timestamp}@test.com`;
    const password = 'Test123!@#';

    await page.goto('/auth/signup');
    await page.waitForLoadState('networkidle');

    // Select client role
    await page.getByTestId('register-role-client-button').click();
    await page.waitForTimeout(500);

    // Fill signup form - Step 1 first
    await page.getByTestId('register-email-input').fill(clientEmail);
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);
    await page.getByTestId('register-phone-input').fill('+212600000000');

    // Continue to step 2
    await page.getByRole('button', { name: /continuer/i }).click();
    await page.waitForTimeout(1000);

    // Fill step 2 form
    await page.getByTestId('register-firstname-input').fill('Test');
    await page.getByTestId('register-lastname-input').fill('Client');

    // Submit
    await page.getByRole('button', { name: /créer mon compte/i }).click();

    // ✅ Attendre que la page se charge et vérifier le succès
    await page.waitForTimeout(3000); // Attendre que la navigation se termine

    // ✅ Vérifier que nous sommes bien sur le dashboard client
    await page.waitForURL('**/dashboard/client', { timeout: 30000 });

    // ✅ Vérifier que l'utilisateur est connecté en vérifiant le message de bienvenue
    // Clean, deterministic approach using data-testid
    await expect(page.getByTestId('auth-welcome-message')).toContainText(/bonjour/i, { timeout: 10000 });

    // ✅ Vérifier que le token est stocké correctement
    const accessToken = await page.evaluate(() => localStorage.getItem('khadamat_access_token'));
    const refreshToken = await page.evaluate(() => localStorage.getItem('khadamat_refresh_token'));
    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();

    // ✅ Vérifier que nous pouvons voir le contenu du dashboard client
    await expect(page.getByText(/bonjour.*test.*client/i)).toBeVisible({ timeout: 10000 });
  });
});