import { test, expect } from '@playwright/test';

test.describe('Khadamat E2E Walkthrough @regression', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // ✅ 3 minutes par test
  });
  test('Complete Pro and Client workflow @regression', async ({ page }) => {
    test.setTimeout(300000); // 5 MINUTES
    test.setTimeout(180000); // 3 minutes total

    test.setTimeout(120000); // 2 minutes

    const timestamp = Date.now();
    const proEmail = `walkthrough-pro-${timestamp}@test.com`;
    const clientEmail = `walkthrough-client-${timestamp}@test.com`;
    const password = 'SecurePass123!';

    // ============================================
    // PARTIE 1 : PRESTATAIRE
    // ============================================
    console.log('🏢 PROFESSIONAL WORKFLOW');

    // Inscription
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /professionnel/i }).click();
    await page.waitForTimeout(500);

    // Remplir le formulaire ÉTAPE 1
    await page.getByTestId('register-email-input').fill(proEmail);
    await page.getByTestId('register-phone-input').fill('+212611111111');
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);

    // Cliquer sur "Continuer" pour passer à l'étape 2
    await page.getByRole('button', { name: /continuer/i }).click();
    await page.waitForTimeout(1000);

    // Remplir le formulaire ÉTAPE 2
    await page.getByTestId('register-firstname-input').fill('Marc');
    await page.getByTestId('register-lastname-input').fill('Dupont');
    await page.getByTestId('register-profession-input').fill('Électricien');
await page.getByRole('button', { name: /créer mon compte/i }).click();

await page.waitForURL('**/dashboard/pro', { timeout: 60000 });

    console.log('✅ Professional registered');

    // Créer un service
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Stratégie multiple pour trouver le bouton
    let createButton = page.getByRole('button', { name: /créer.*service/i });

    if (await createButton.count() === 0) {
      // Alternative : chercher par texte
      createButton = page.locator('button:has-text("Créer")').first();
    }

    if (await createButton.count() === 0) {
      // Alternative : chercher un lien
      createButton = page.locator('a[href*="service"]').first();
    }

    await expect(createButton).toBeVisible({ timeout: 15000 });
    await createButton.click();

    await page.waitForTimeout(1000);

    // Remplir le formulaire de service
    await page.getByLabel(/nom/i).fill('Installation Électrique');
    await page.getByLabel(/description/i).fill('Installation complète avec garantie');
    await page.getByLabel(/prix/i).fill('200');

    // Gérer la catégorie (select ou input)
    const categoryField = page.getByLabel(/catégorie/i);
    const fieldType = await categoryField.evaluate(el => el.tagName);

    if (fieldType === 'SELECT') {
      await categoryField.selectOption('Électricité');
    } else {
      await categoryField.fill('Électricité');
    }

    await page.getByRole('button', { name: /publier|créer|enregistrer/i }).click();
    await page.waitForTimeout(2000);

    console.log('✅ Service created');

    // Déconnexion
    const logoutButton = page.locator('button', { hasText: /déconnexion|logout/i });
    await logoutButton.click();
    await page.waitForURL('**/login', { timeout: 10000 });

    // ============================================
    // PARTIE 2 : CLIENT
    // ============================================
    console.log('👤 CLIENT WORKFLOW');

    // Inscription client
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /client/i }).click();
    await page.waitForTimeout(500);

    await page.getByTestId('register-firstname-input').fill('Sophie');
    await page.getByTestId('register-lastname-input').fill('Martin');
    await page.getByTestId('register-email-input').fill(clientEmail);
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);
    await page.getByTestId('register-phone-input').fill('+212622222222');

    await page.getByRole('button', { name: /créer mon compte/i }).click();
    await page.waitForURL('**/dashboard', { timeout: 15000 });

    console.log('✅ Client registered');

    // Parcourir les services
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Cliquer sur un service
    const firstService = page.locator('[data-testid="service-card"], .service-card, article').first();
    await expect(firstService).toBeVisible({ timeout: 10000 });
    await firstService.click();

    await page.waitForTimeout(1000);

    // Réserver
    const bookButton = page.getByRole('button', { name: /réserver/i });
    await expect(bookButton).toBeVisible({ timeout: 10000 });
    await bookButton.click();

    await page.waitForTimeout(500);

    // Remplir formulaire de réservation
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const dateStr = tomorrow.toISOString().split('T')[0];

    await page.getByLabel(/date/i).fill(dateStr);
    await page.getByLabel(/heure/i).fill('10:00');
    await page.getByLabel(/adresse/i).fill('456 Avenue Test, Casablanca');

    await page.getByRole('button', { name: /réserver|confirmer/i }).click();
    await page.waitForTimeout(2000);

    console.log('✅ Booking created');
    console.log('🎉 E2E WALKTHROUGH COMPLETED');
  });
});