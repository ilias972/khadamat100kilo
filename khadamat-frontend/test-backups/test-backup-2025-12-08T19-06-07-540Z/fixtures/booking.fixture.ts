import { Page } from '@playwright/test';

export class BookingFixture {
  constructor(private readonly page: Page) {}

  async createBooking() {
    // Go to services page
    await this.page.goto('http://localhost:3001/services');
    await this.page.waitForLoadState('networkidle');

    // Click on first service
    const serviceCards = this.page.locator('[data-testid="service-card"], .service-card, article');
    await serviceCards.first().click();

    // Click book button
    const bookButton = this.page.getByRole('button', { name: /réserver/i });
    await bookButton.click();

    // Fill booking form
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    await this.page.getByLabel(/date/i).fill(dateStr);
    await this.page.getByLabel(/heure/i).fill('10:00');
    await this.page.getByLabel(/adresse/i).fill('123 Test Street, Casablanca');

    // Submit booking
    await this.page.getByRole('button', { name: /réserver|confirmer/i }).click();
    await this.page.waitForTimeout(2000);
  }

  async viewBookingHistory() {
    await this.page.goto('http://localhost:3001/dashboard/client/history');
    await this.page.waitForLoadState('networkidle');
  }

  async viewProBookings() {
    await this.page.goto('http://localhost:3001/dashboard/pro/bookings');
    await this.page.waitForLoadState('networkidle');
  }

  async acceptBooking() {
    await this.viewProBookings();

    // Find and accept the first booking
    const acceptButton = this.page.locator('button', { hasText: /accepter/i }).first();
    await acceptButton.click();
    await this.page.waitForTimeout(1000);
  }
}