import { Page } from '@playwright/test';

export class TestUtils {
  static async generateTestEmail(prefix: string = 'test'): Promise<string> {
    const timestamp = Date.now();
    return `${prefix}-${timestamp}@test.com`;
  }

  static async generateTestPassword(): Promise<string> {
    return 'Test123!@#';
  }

  static async generateFutureDate(daysInFuture: number = 1): Promise<string> {
    const date = new Date();
    date.setDate(date.getDate() + daysInFuture);
    return date.toISOString().split('T')[0];
  }

  static async generateTestPhoneNumber(): Promise<string> {
    return '+212600000000';
  }

  static async waitForElement(page: Page, selector: string, timeout: number = 10000) {
    await page.waitForSelector(selector, { timeout });
  }

  static async waitForText(page: Page, text: string | RegExp, timeout: number = 10000) {
    await page.waitForFunction((t) => {
      const regex = typeof text === 'string' ? new RegExp(text, 'i') : text;
      return document.body.textContent?.match(regex) !== null;
    }, text, { timeout });
  }

  static async waitForUrl(page: Page, urlPattern: string | RegExp, timeout: number = 10000) {
    await page.waitForURL(urlPattern, { timeout });
  }
}