#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Simple validation runner
 */
function main() {
  try {
    console.log('🚀 Starting flaky detection validation...');

    // Step 1: Generate flaky tests
    console.log('📊 Generating artificial flaky tests...');
    execSync('node generate-flaky-tests.js', {
      cwd: __dirname,
      stdio: 'inherit'
    });

    // Step 2: Run detection in validation mode
    console.log('🔍 Running flaky test detection...');
    execSync('node analyze-flakes.js ..\\playwright-results.json --validation-mode', {
      cwd: __dirname,
      stdio: 'inherit'
    });

    // Step 3: Generate performance dashboard with flaky test metrics
    console.log('📈 Generating performance dashboard...');
    execSync('node generate-performance-dashboard.js', {
      cwd: __dirname,
      stdio: 'inherit'
    });

    console.log('✅ Flaky detection validation completed successfully!');
    console.log('📊 Validation results available in flaky-validation-report.json');
    console.log('📈 Performance dashboard updated with flaky test metrics');

  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}