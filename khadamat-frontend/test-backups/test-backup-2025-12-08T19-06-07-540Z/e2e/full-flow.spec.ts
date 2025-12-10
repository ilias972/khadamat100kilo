import { test, expect } from '@playwright/test';

test.describe('Khadamat Full Post-Repair Flow', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // ✅ 3 minutes par test
  });
  test('Complete flow: Create PRO, Service, Client, Book, Accept', async ({ page }) => {
    test.setTimeout(300000); // 5 MINUTES
    test.setTimeout(180000); // 3 minutes total

    // Configuration du timeout global pour ce test
    test.setTimeout(120000); // 2 minutes

    const timestamp = Date.now();
    const proEmail = `pro${timestamp}@test.com`;
    const clientEmail = `client${timestamp}@test.com`;
    const password = 'Test123!@#';

    console.log(`🧪 Test with PRO: ${proEmail}, CLIENT: ${clientEmail}`);

    // ============================================
    // ÉTAPE 1 : INSCRIPTION PRESTATAIRE
    // ============================================
    console.log('📝 Step 1: Register Professional');

    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    // Sélectionner le rôle PROFESSIONNEL
    await page.getByRole('button', { name: /professionnel/i }).click();
    await page.waitForTimeout(500);

    // Remplir le formulaire ÉTAPE 1 avec des sélecteurs spécifiques
    await page.getByTestId('register-email-input').fill(proEmail);
    await page.getByTestId('register-phone-input').fill('+212600000001');
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);

    // Cliquer sur "Continuer" pour passer à l'étape 2
    await page.getByRole('button', { name: /continuer/i }).click();
    await page.waitForTimeout(1000);

    // Remplir le formulaire ÉTAPE 2
    await page.getByTestId('register-firstname-input').fill('John');
    await page.getByTestId('register-lastname-input').fill('Doe');

    // Champ spécifique PRO
    await page.getByTestId('register-profession-input').fill('Plombier Expert');

    // Soumettre
    await page.getByRole('button', { name: /créer mon compte/i }).click();

    // Attendre redirection vers dashboard PRO
    await page.waitForURL('**/dashboard/pro', { timeout: 60000 });
    expect(page.url()).toContain('/dashboard/pro');
    console.log('✅ Professional registered and redirected to dashboard');

    // ============================================
    // ÉTAPE 2 : CRÉER UN SERVICE
    // ============================================
    console.log('🛠️ Step 2: Create Service');

    // Attendre que la page soit chargée
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Chercher le bouton "Créer un service" avec plusieurs stratégies
    const createServiceButton = page.locator('button', {
      hasText: /créer.*service/i
    }).first();

    // Vérifier que le bouton existe
    await expect(createServiceButton).toBeVisible({ timeout: 10000 });
    await createServiceButton.click();

    // Remplir le formulaire de création de service
    await page.waitForTimeout(500);

    await page.getByLabel(/nom du service/i).fill('Réparation Plomberie');
    await page.getByLabel(/description/i).fill('Service de plomberie professionnel avec 10 ans d\'expérience');
    await page.getByLabel(/prix/i).fill('150');
    await page.getByLabel(/catégorie/i).selectOption('Plomberie');

    // Soumettre la création
    await page.getByRole('button', { name: /publier|créer/i }).click();

    // Attendre confirmation
    await page.waitForTimeout(2000);
    console.log('✅ Service created');

    // Se déconnecter
    await page.getByRole('button', { name: /déconnexion|logout/i }).click();
    await page.waitForURL('**/login', { timeout: 5000 });

    // ============================================
    // ÉTAPE 3 : INSCRIPTION CLIENT
    // ============================================
    console.log('👤 Step 3: Register Client');

    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    // Sélectionner le rôle CLIENT
    await page.getByRole('button', { name: /client/i }).click();
    await page.waitForTimeout(500);

    // Remplir le formulaire CLIENT
    await page.getByTestId('register-firstname-input').fill('Alice');
    await page.getByTestId('register-lastname-input').fill('Smith');
    await page.getByTestId('register-email-input').fill(clientEmail);
    await page.getByTestId('register-password-input').fill(password);
    await page.getByTestId('register-password-confirm-input').fill(password);
    await page.getByTestId('register-phone-input').fill('+212600000002');

    // Soumettre
    await page.getByRole('button', { name: /créer mon compte/i }).click();

    // Attendre redirection vers dashboard CLIENT
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    expect(page.url()).toMatch(/\/dashboard(?!\/pro)/);
    console.log('✅ Client registered and redirected to dashboard');

    // ============================================
    // ÉTAPE 4 : RÉSERVER UN SERVICE
    // ============================================
    console.log('📅 Step 4: Book Service');

    // Aller sur la page services
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Trouver et cliquer sur le premier service
    const serviceCard = page.locator('[data-testid="service-card"]').first();
    await serviceCard.waitFor({ state: 'visible', timeout: 10000 });
    await serviceCard.click();

    // Attendre la page de détail
    await page.waitForURL('**/services/**', { timeout: 10000 });

    // Cliquer sur "Réserver"
    await page.getByRole('button', { name: /réserver/i }).click();

    // Remplir le formulaire de réservation
    await page.waitForTimeout(500);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    await page.getByLabel(/date/i).fill(dateStr);
    await page.getByLabel(/heure/i).fill('14:00');
    await page.getByLabel(/adresse/i).fill('123 Rue Test, Rabat, 10000');

    // Soumettre la réservation
    await page.getByRole('button', { name: /réserver|confirmer/i }).click();

    // Attendre confirmation ou redirection paiement
    await page.waitForTimeout(2000);
    console.log('✅ Booking created');

    // ============================================
    // ÉTAPE 5 : PRESTATAIRE ACCEPTE
    // ============================================
    console.log('✅ Step 5: Professional accepts booking');

    // Se déconnecter du compte client
    await page.getByRole('button', { name: /déconnexion|logout/i }).click();
    await page.waitForURL('**/login', { timeout: 5000 });

    // Se reconnecter en tant que PRO
    await page.getByTestId('login-email-input').fill(proEmail);
    await page.getByTestId('login-password-input').fill(password);
    await page.getByTestId('login-submit-button').click();

    await page.waitForURL('**/dashboard/pro', { timeout: 15000 });

    // Aller sur les réservations
    await page.goto('http://localhost:3001/dashboard/pro/bookings');
    await page.waitForLoadState('networkidle');

    // Trouver et accepter la première réservation PENDING
    const acceptButton = page.locator('button', { hasText: /accepter/i }).first();
    await expect(acceptButton).toBeVisible({ timeout: 10000 });
    await acceptButton.click();

    // Attendre confirmation
    await page.waitForTimeout(1000);

    // Vérifier que le statut est passé à CONFIRMED
    await expect(page.locator('text=/confirmé|confirmed/i').first()).toBeVisible();

    console.log('✅ Booking accepted by professional');
    console.log('🎉 FULL FLOW COMPLETED SUCCESSFULLY');
  });
});