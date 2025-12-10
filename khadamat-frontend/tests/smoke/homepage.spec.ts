import { test, expect } from '@playwright/test';

test.describe('Homepage Smoke Tests', () => {
  test('Homepage loads successfully @smoke', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify page loads
    expect(page.url()).toBe('http://localhost:3000/');

    // Verify basic page structure
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    // Verify navigation exists
    const navLinks = page.locator('nav a');
    await expect(navLinks.first()).toBeVisible();
  });

  test('Search button is present @smoke', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');

    // Verify search button exists in header
    const searchButton = page.locator('button[aria-label="Rechercher"]').first();
    await expect(searchButton).toBeVisible({ timeout: 5000 });
  });
});