import { Page } from '@playwright/test';

export class AuthFixture {
  constructor(private readonly page: Page) {}

  async login(email: string, password: string) {
    await this.page.goto('http://localhost:3001/auth/login');
    await this.page.waitForLoadState('networkidle');

    await this.page.getByTestId('login-email-input').fill(email);
    await this.page.getByTestId('login-password-input').fill(password);
    await this.page.getByTestId('login-submit-button').click();

    await this.page.waitForURL('**/dashboard', { timeout: 10000 });
  }

  async signupAsClient(email: string, password: string) {
    await this.page.goto('http://localhost:3001/auth/signup');
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', { name: /client/i }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('register-firstname-input').fill('Test');
    await this.page.getByTestId('register-lastname-input').fill('Client');
    await this.page.getByTestId('register-email-input').fill(email);
    await this.page.getByTestId('register-password-input').fill(password);
    await this.page.getByTestId('register-password-confirm-input').fill(password);
    await this.page.getByTestId('register-phone-input').fill('+212600000000');

    await this.page.getByRole('button', { name: /créer mon compte/i }).click();
    await this.page.waitForURL('**/dashboard', { timeout: 15000 });
  }

  async signupAsProfessional(email: string, password: string) {
    await this.page.goto('http://localhost:3001/auth/signup');
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', { name: /professionnel/i }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('register-email-input').fill(email);
    await this.page.getByTestId('register-phone-input').fill('+212600000000');
    await this.page.getByTestId('register-password-input').fill(password);
    await this.page.getByTestId('register-password-confirm-input').fill(password);

    await this.page.getByRole('button', { name: /continuer/i }).click();
    await this.page.waitForTimeout(1000);

    await this.page.getByTestId('register-firstname-input').fill('Test');
    await this.page.getByTestId('register-lastname-input').fill('Pro');
    await this.page.getByTestId('register-profession-input').fill('Test Professional');

    await this.page.getByRole('button', { name: /créer mon compte/i }).click();
    await this.page.waitForURL('**/dashboard/pro', { timeout: 15000 });
  }

  async logout() {
    await this.page.getByTestId('nav-logout-button').click();
    await this.page.waitForURL('**/login', { timeout: 10000 });
  }
}