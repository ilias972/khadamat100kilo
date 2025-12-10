import { test, expect } from '@playwright/test';

test.describe('Services Tests @smoke', () => {
  test('Search and view services @smoke', async ({ page }) => {
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Verify services page loads
    expect(page.url()).toContain('/services');

    // Verify service cards are visible
    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards.first()).toBeVisible({ timeout: 10000 });

    // Click on first service
    await serviceCards.first().click();

    // Verify service detail page loads
    await page.waitForURL('**/services/**', { timeout: 10000 });
    expect(page.url()).toContain('/services/');
  });

  test('Filter services by category @regression', async ({ page }) => {
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Click on a category filter
    const categoryFilter = page.getByRole('button', { name: /plomberie|électricité|ménage/i }).first();
    await categoryFilter.click();

    // Wait for filtering to complete
    await page.waitForTimeout(2000);

    // Verify filtered results
    const filteredServices = page.locator('[data-testid="service-card"]');
    await expect(filteredServices.first()).toBeVisible({ timeout: 10000 });
  });

  test('View service details @regression', async ({ page }) => {
    await page.goto('http://localhost:3001/services');
    await page.waitForLoadState('networkidle');

    // Click on first service
    const serviceCards = page.locator('[data-testid="service-card"]');
    await serviceCards.first().click();

    // Verify service detail page loads
    await page.waitForURL('**/services/**', { timeout: 10000 });

    // Verify service information is displayed
    await expect(page.getByText(/description/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/prix/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: /réserver/i })).toBeVisible({ timeout: 5000 });
  });
});