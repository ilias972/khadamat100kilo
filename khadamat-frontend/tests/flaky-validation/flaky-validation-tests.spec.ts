import { test, expect } from '@playwright/test';

test.describe('Flaky Test Validation Suite @flaky-validation', () => {
test('Timing dependent test 1 @flaky-validation', async ({ page }) => {
  // This test has inconsistent timing that causes flakiness
  const startTime = Date.now();

  // Simulate variable processing time
  const processingTime = 100 + Math.random() * 300; // 100-400ms
  await page.waitForTimeout(processingTime);

  // Sometimes the element appears, sometimes it doesn't
  const elementVisible = Math.random() > 0.3; // 70% chance of being visible

  if (elementVisible) {
    await page.getByTestId('dynamic-element').click();
    await expect(page.getByTestId('success-message')).toBeVisible();
  } else {
    // This path will cause test failure
    await expect(page.getByTestId('fallback-element')).toBeVisible();
  }

  const duration = Date.now() - startTime;
  console.log(`Timing test 1 completed in ${duration}ms`);
});

test('Race condition test 2 @flaky-validation', async ({ page }) => {
  // Simulate race condition between two async operations
  const [result1, result2] = await Promise.all([
    simulateAsyncOperation('operation1', 50 + Math.random() * 100),
    simulateAsyncOperation('operation2', 50 + Math.random() * 100)
  ]);

  // Race condition: which operation completes first is unpredictable
  if (result1.completedBefore(result2)) {
    await page.getByTestId('result-1').click();
    await expect(page.getByTestId('success-1')).toBeVisible();
  } else {
    await page.getByTestId('result-2').click();
    await expect(page.getByTestId('success-2')).toBeVisible();
  }
});

async function simulateAsyncOperation(
  name: string,
  delay: number
): Promise<{
  name: string;
  completedAt: number;
  completedBefore(other: { completedAt: number }): boolean;
}> {
  await new Promise(resolve => setTimeout(resolve, delay));
  return {
    name,
    completedAt: Date.now(),
    completedBefore: function(this: { name: string; completedAt: number; completedBefore(other: { completedAt: number }): boolean }, other: { completedAt: number }) {
      return this.completedAt < other.completedAt;
    }
  };
}

test('Random failure test 3 @flaky-validation', async ({ page }) => {
  // This test fails randomly to simulate flaky behavior
  const shouldFail = Math.random() > 0.6; // 40% chance of failure

  await page.goto('http://localhost:3001/test-page');
  await page.waitForLoadState('networkidle');

  if (shouldFail) {
    // This will cause the test to fail
    await expect(page.getByTestId('non-existent-element')).toBeVisible();
  } else {
    // This path succeeds
    await page.getByTestId('existing-element').click();
    await expect(page.getByTestId('success-message')).toBeVisible();
  }
});

test('Network dependency test 4 @flaky-validation', async ({ page }) => {
  // Simulate flaky network-dependent behavior
  const networkSuccessRate = 0.7; // 70% success rate
  const isNetworkAvailable = Math.random() < networkSuccessRate;

  if (isNetworkAvailable) {
    // Network available - test passes
    const response = await page.goto('http://localhost:3001/api/test');
    if (response) {
      expect(response.status()).toBe(200);
    }
    await expect(page.getByTestId('api-success')).toBeVisible();
  } else {
    // Network unavailable - test fails
    try {
      await page.goto('http://localhost:3001/api/test', { timeout: 5000 });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      // Expected network failure
      if (error instanceof Error) {
        console.log('Network failure simulated:', error.message);
      } else {
        console.log('Network failure simulated:', String(error));
      }
    }
  }
});

test('Resource leak test 5 @flaky-validation', async ({ page }) => {
  // Simulate resource leak that causes intermittent failures
  const resources = [];
  const resourceCount = 5 + Math.floor(Math.random() * 10); // 5-15 resources

  // Create resources
  for (let i = 0; i < resourceCount; i++) {
    resources.push({
      id: `resource-${i}`,
      data: new Array(10000).fill('x').join('') // Large data
    });
  }

  // Sometimes resources are properly cleaned up, sometimes not
  const cleanupSuccessful = Math.random() > 0.4; // 60% cleanup success rate

  if (cleanupSuccessful) {
    // Proper cleanup - test passes
    resources.length = 0;
    await page.getByTestId('resource-cleanup').click();
    await expect(page.getByTestId('cleanup-success')).toBeVisible();
  } else {
    // Resource leak - test may fail due to memory issues
    // This simulates the flaky behavior
    if (resourceCount > 10) {
      // High resource count causes failure
      await expect(page.getByTestId('memory-error')).toBeVisible();
    } else {
      // Low resource count still passes
      await page.getByTestId('resource-operation').click();
      await expect(page.getByTestId('operation-success')).toBeVisible();
    }
  }
});

});