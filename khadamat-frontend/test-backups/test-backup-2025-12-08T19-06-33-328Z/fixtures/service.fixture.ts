import { Page } from '@playwright/test';

export class ServiceFixture {
  constructor(private readonly page: Page) {}

  async createService() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);

    const createButton = this.page.getByRole('button', { name: /créer.*service/i });
    await createButton.click();

    await this.page.getByLabel(/nom du service/i).fill('Test Service');
    await this.page.getByLabel(/description/i).fill('Test service description');
    await this.page.getByLabel(/prix/i).fill('100');
    await this.page.getByLabel(/catégorie/i).selectOption('Test');

    await this.page.getByRole('button', { name: /publier|créer/i }).click();
    await this.page.waitForTimeout(2000);
  }

  async viewServices() {
    await this.page.goto('http://localhost:3001/services');
    await this.page.waitForLoadState('networkidle');
  }

  async viewServiceDetails() {
    await this.viewServices();

    const serviceCards = this.page.locator('[data-testid="service-card"], .service-card, article');
    await serviceCards.first().click();

    await this.page.waitForURL('**/services/**', { timeout: 10000 });
  }

  async filterServicesByCategory(category: string) {
    await this.viewServices();

    const categoryFilter = this.page.getByRole('button', { name: new RegExp(category, 'i') }).first();
    await categoryFilter.click();

    await this.page.waitForTimeout(2000);
  }
}