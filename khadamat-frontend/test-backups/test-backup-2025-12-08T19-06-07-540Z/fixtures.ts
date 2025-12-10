import { test as base } from '@playwright/test';
import { AuthFixture } from './fixtures/auth.fixture';
import { BookingFixture } from './fixtures/booking.fixture';
import { ServiceFixture } from './fixtures/service.fixture';
import { TestDataFactory } from './fixtures/test-data';
import { getCurrentEnvironment, environments } from './fixtures/environments';

export const test = base.extend<{
  auth: AuthFixture;
  booking: BookingFixture;
  service: ServiceFixture;
  testData: TestDataFactory;
  environment: typeof environments;
  currentEnv: ReturnType<typeof getCurrentEnvironment>;
}>({
  auth: async ({ page }, use) => {
    const auth = new AuthFixture(page);
    await use(auth);
  },

  booking: async ({ page }, use) => {
    const booking = new BookingFixture(page);
    await use(booking);
  },

  service: async ({ page }, use) => {
    const service = new ServiceFixture(page);
    await use(service);
  },

  testData: async ({ }, use) => {
    const testData = new TestDataFactory();
    await use(testData);
  },

  environment: async ({ }, use) => {
    await use(environments);
  },

  currentEnv: async ({ }, use) => {
    const currentEnv = getCurrentEnvironment();
    await use(currentEnv);
  },
});

export { expect } from '@playwright/test';