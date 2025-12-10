#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Artificial Flaky Test Generator
 * Creates controlled flaky test scenarios for validation purposes
 */
class FlakyTestGenerator {
  constructor() {
    this.flakyTestTypes = [
      'timing_dependent',
      'race_condition',
      'random_failure',
      'network_dependency',
      'resource_leak'
    ];

    this.testTemplates = {
      timing_dependent: this.generateTimingDependentTest,
      race_condition: this.generateRaceConditionTest,
      random_failure: this.generateRandomFailureTest,
      network_dependency: this.generateNetworkDependencyTest,
      resource_leak: this.generateResourceLeakTest
    };
  }

  /**
   * Generate timing-dependent flaky test
   */
  generateTimingDependentTest(testId) {
    return `
test('Timing dependent test ${testId} @flaky-validation', async ({ page }) => {
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
  console.log(\`Timing test ${testId} completed in \${duration}ms\`);
});
`.trim();
  }

  /**
   * Generate race condition flaky test
   */
  generateRaceConditionTest(testId) {
    return `
test('Race condition test ${testId} @flaky-validation', async ({ page }) => {
  // Simulate race condition between two async operations
  const [result1, result2] = await Promise.all([
    this.simulateAsyncOperation('operation1', 50 + Math.random() * 100),
    this.simulateAsyncOperation('operation2', 50 + Math.random() * 100)
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

async function simulateAsyncOperation(name, delay) {
  await new Promise(resolve => setTimeout(resolve, delay));
  return {
    name,
    completedAt: Date.now(),
    completedBefore: function(other) {
      return this.completedAt < other.completedAt;
    }
  };
}
`.trim();
  }

  /**
   * Generate random failure flaky test
   */
  generateRandomFailureTest(testId) {
    return `
test('Random failure test ${testId} @flaky-validation', async ({ page }) => {
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
`.trim();
  }

  /**
   * Generate network dependency flaky test
   */
  generateNetworkDependencyTest(testId) {
    return `
test('Network dependency test ${testId} @flaky-validation', async ({ page }) => {
  // Simulate flaky network-dependent behavior
  const networkSuccessRate = 0.7; // 70% success rate
  const isNetworkAvailable = Math.random() < networkSuccessRate;

  if (isNetworkAvailable) {
    // Network available - test passes
    const response = await page.goto('http://localhost:3001/api/test');
    expect(response.status()).toBe(200);
    await expect(page.getByTestId('api-success')).toBeVisible();
  } else {
    // Network unavailable - test fails
    try {
      await page.goto('http://localhost:3001/api/test', { timeout: 5000 });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      // Expected network failure
      console.log('Network failure simulated:', error.message);
    }
  }
});
`.trim();
  }

  /**
   * Generate resource leak flaky test
   */
  generateResourceLeakTest(testId) {
    return `
test('Resource leak test ${testId} @flaky-validation', async ({ page }) => {
  // Simulate resource leak that causes intermittent failures
  const resources = [];
  const resourceCount = 5 + Math.floor(Math.random() * 10); // 5-15 resources

  // Create resources
  for (let i = 0; i < resourceCount; i++) {
    resources.push({
      id: \`resource-\${i}\`,
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
`.trim();
  }

  /**
   * Generate a complete test file with multiple flaky test types
   */
  generateFlakyTestFile(outputPath, testCount = 5) {
    const testFileContent = [];
    testFileContent.push(`import { test, expect } from '@playwright/test';`);
    testFileContent.push('');
    testFileContent.push(`test.describe('Flaky Test Validation Suite @flaky-validation', () => {`);

    // Generate different types of flaky tests
    for (let i = 0; i < testCount; i++) {
      const testType = this.flakyTestTypes[i % this.flakyTestTypes.length];
      const testContent = this.testTemplates[testType](i + 1);
      testFileContent.push(testContent);
      testFileContent.push('');
    }

    testFileContent.push(`});`);

    // Write the file
    fs.writeFileSync(outputPath, testFileContent.join('\n'));
    console.log(`✅ Generated flaky test file: ${outputPath}`);
    console.log(`📊 Created ${testCount} artificial flaky tests`);

    return outputPath;
  }

  /**
   * Generate metadata file describing the flaky tests
   */
  generateFlakyTestMetadata(outputPath) {
    const metadata = {
      generatedAt: new Date().toISOString(),
      testCount: this.flakyTestTypes.length,
      flakyTestTypes: this.flakyTestTypes.map(type => ({
        type,
        description: this.getTestTypeDescription(type),
        expectedFailureRate: this.getExpectedFailureRate(type)
      })),
      purpose: 'Validation of flaky test detection accuracy',
      validationMetrics: {
        truePositiveRate: 'To be measured',
        falsePositiveRate: 'To be measured',
        precision: 'To be measured',
        recall: 'To be measured'
      }
    };

    fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
    console.log(`✅ Generated flaky test metadata: ${outputPath}`);

    return metadata;
  }

  getTestTypeDescription(type) {
    const descriptions = {
      timing_dependent: 'Tests with inconsistent timing causing intermittent failures',
      race_condition: 'Tests with unpredictable execution order between async operations',
      random_failure: 'Tests that fail randomly without specific pattern',
      network_dependency: 'Tests dependent on network availability with variable success rates',
      resource_leak: 'Tests that fail due to improper resource cleanup'
    };
    return descriptions[type] || 'Unknown flaky test type';
  }

  getExpectedFailureRate(type) {
    const rates = {
      timing_dependent: '30%',
      race_condition: '25%',
      random_failure: '40%',
      network_dependency: '30%',
      resource_leak: '40%'
    };
    return rates[type] || '25%';
  }
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  const outputDir = args[0] || path.join(__dirname, '..', 'tests', 'flaky-validation');
  const testCount = parseInt(args[1]) || 5;

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const generator = new FlakyTestGenerator();

  // Generate flaky test file
  const testFilePath = path.join(outputDir, 'flaky-validation-tests.spec.ts');
  generator.generateFlakyTestFile(testFilePath, testCount);

  // Generate metadata
  const metadataPath = path.join(outputDir, 'flaky-test-metadata.json');
  generator.generateFlakyTestMetadata(metadataPath);

  console.log('🎯 Flaky test generation complete!');
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`📊 Generated ${testCount} artificial flaky tests for validation`);
  console.log(`📈 Use these tests to validate flaky detection accuracy`);
}

if (require.main === module) {
  main();
}

module.exports = FlakyTestGenerator;