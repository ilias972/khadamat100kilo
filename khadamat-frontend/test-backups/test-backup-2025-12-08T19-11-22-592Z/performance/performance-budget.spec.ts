import { test, expect } from '@playwright/test';

test.describe('Performance Budget Tests', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // 3 minutes per test
  });

  test('Homepage performance budget @critical', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`Homepage loaded in ${loadTime}ms`);

    // Assert performance budgets
    expect(loadTime).toBeLessThan(3000); // < 3s load time

    // Check resource count
    const resourceCount = await page.evaluate(() => performance.getEntriesByType('resource').length);
    expect(resourceCount).toBeLessThan(50); // < 50 resources
  });

  test('Services page performance budget @performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`Services page loaded in ${loadTime}ms`);

    // Assert performance budgets
    expect(loadTime).toBeLessThan(4000); // < 4s load time

    // Check resource count
    const resourceCount = await page.evaluate(() => performance.getEntriesByType('resource').length);
    expect(resourceCount).toBeLessThan(60); // < 60 resources
  });

  test('Login page performance budget @performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3001/auth/login');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`Login page loaded in ${loadTime}ms`);

    // Assert performance budgets
    expect(loadTime).toBeLessThan(2500); // < 2.5s load time

    // Check resource count
    const resourceCount = await page.evaluate(() => performance.getEntriesByType('resource').length);
    expect(resourceCount).toBeLessThan(40); // < 40 resources
  });

  test('Signup page performance budget @performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3001/auth/signup');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`Signup page loaded in ${loadTime}ms`);

    // Assert performance budgets
    expect(loadTime).toBeLessThan(3000); // < 3s load time

    // Check resource count
    const resourceCount = await page.evaluate(() => performance.getEntriesByType('resource').length);
    expect(resourceCount).toBeLessThan(45); // < 45 resources
  });

  test('Service detail page performance budget @performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Click on first service
    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards.first()).toBeVisible({ timeout: 10000 });
    await serviceCards.first().click();

    await page.waitForURL('**/services/**', { timeout: 10000 });
    const loadTime = Date.now() - startTime;

    console.log(`Service detail page loaded in ${loadTime}ms`);

    // Assert performance budgets
    expect(loadTime).toBeLessThan(3500); // < 3.5s load time

    // Check resource count
    const resourceCount = await page.evaluate(() => performance.getEntriesByType('resource').length);
    expect(resourceCount).toBeLessThan(55); // < 55 resources
  });

  test('API response time budget @api', async ({ request }) => {
    // Test critical API endpoints for response time
    const startTime = Date.now();

    // Test auth endpoint
    const authResponse = await request.post('/api/auth/login', {
      data: {
        email: 'fresh-test-user@test.com',
        password: 'password123'
      }
    });

    const authTime = Date.now() - startTime;
    expect(authResponse.status()).toBe(200);
    expect(authTime).toBeLessThan(1000); // < 1s API response time

    // Test services endpoint
    const servicesStart = Date.now();
    const servicesResponse = await request.get('/api/services');
    const servicesTime = Date.now() - servicesStart;

    expect(servicesResponse.status()).toBe(200);
    expect(servicesTime).toBeLessThan(1500); // < 1.5s API response time

    console.log(`API Performance: Auth=${authTime}ms, Services=${servicesTime}ms`);
  });
});