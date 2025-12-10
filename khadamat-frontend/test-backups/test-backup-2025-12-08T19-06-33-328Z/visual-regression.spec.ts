import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests @visual', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // 3 minutes per test
  });

  test('Homepage visual regression @visual', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.01
    });
  });

  test('Services page visual regression @visual', async ({ page }) => {
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('services-page.png', {
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.01
    });
  });

  test('Login page visual regression @visual', async ({ page }) => {
    await page.goto('http://localhost:3001/auth/login');
    await page.waitForLoadState('networkidle');

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 50,
      maxDiffPixelRatio: 0.005
    });
  });

  test('Signup page visual regression @visual', async ({ page }) => {
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('signup-page.png', {
      maxDiffPixels: 50,
      maxDiffPixelRatio: 0.005
    });
  });

  test('Service detail page visual regression @visual', async ({ page }) => {
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Click on first service
    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards.first()).toBeVisible({ timeout: 10000 });
    await serviceCards.first().click();

    // Wait for service detail page to load
    await page.waitForURL('**/services/**', { timeout: 10000 });

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('service-detail-page.png', {
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.01
    });
  });
});