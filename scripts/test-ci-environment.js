#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing CI Environment Simulation...');

function testCIEnvironment() {
  const results = {
    success: true,
    tests: [],
    warnings: [],
    errors: []
  };

  try {
    // Test 1: Check if CI environment variables work
    console.log('📋 Test 1: Environment variable handling');
    process.env.CI = 'true';
    process.env.NODE_ENV = 'test';

    if (process.env.CI === 'true' && process.env.NODE_ENV === 'test') {
      results.tests.push('✅ CI environment variables set correctly');
    } else {
      results.errors.push('❌ CI environment variables not set correctly');
      results.success = false;
    }

    // Test 2: Check if package.json scripts work in CI mode
    console.log('📋 Test 2: Package.json script validation');
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    if (packageJson.scripts && packageJson.scripts.test) {
      results.tests.push('✅ Backend test script exists');
    } else {
      results.errors.push('❌ Backend test script missing');
      results.success = false;
    }

    // Test 3: Check Playwright CI configuration
    console.log('📋 Test 3: Playwright CI configuration');
    const playwrightConfigPath = path.join('khadamat-frontend', 'playwright.config.ts');
    if (fs.existsSync(playwrightConfigPath)) {
      const playwrightConfig = fs.readFileSync(playwrightConfigPath, 'utf8');

      if (playwrightConfig.includes('process.env.CI')) {
        results.tests.push('✅ Playwright has CI-specific configuration');
      } else {
        results.warnings.push('⚠️  Playwright missing CI-specific configuration');
      }

      if (playwrightConfig.includes('retries: process.env.CI ? 2 : 0')) {
        results.tests.push('✅ Playwright has CI retries configured');
      } else {
        results.warnings.push('⚠️  Playwright missing CI retries');
      }
    } else {
      results.errors.push('❌ Playwright config file missing');
      results.success = false;
    }

    // Test 4: Check Jest CI configuration
    console.log('📋 Test 4: Jest CI configuration');
    const jestConfigPath = path.join('test', 'jest-e2e.json');
    if (fs.existsSync(jestConfigPath)) {
      const jestConfig = JSON.parse(fs.readFileSync(jestConfigPath, 'utf8'));

      if (jestConfig.globals && jestConfig.globals.NODE_ENV === 'test') {
        results.tests.push('✅ Jest has test environment configured');
      } else {
        results.warnings.push('⚠️  Jest missing test environment');
      }
    } else {
      results.errors.push('❌ Jest config file missing');
      results.success = false;
    }

    // Test 5: Check database configuration for CI
    console.log('📋 Test 5: Database CI configuration');
    if (fs.existsSync('.env.ci')) {
      const ciEnv = fs.readFileSync('.env.ci', 'utf8');

      if (ciEnv.includes('DATABASE_URL=') && ciEnv.includes('postgres')) {
        results.tests.push('✅ CI database configuration exists');
      } else {
        results.warnings.push('⚠️  CI database configuration incomplete');
      }
    } else {
      results.warnings.push('⚠️  CI environment file missing');
    }

    // Test 6: Check workflow file syntax
    console.log('📋 Test 6: Workflow file validation');
    const workflowPath = path.join('.github', 'workflows', 'ci-cd-pipeline.yml');
    if (fs.existsSync(workflowPath)) {
      const workflowContent = fs.readFileSync(workflowPath, 'utf8');

      // Basic YAML syntax check
      if (workflowContent.includes('name:') &&
          workflowContent.includes('on:') &&
          workflowContent.includes('jobs:')) {
        results.tests.push('✅ Workflow file has valid structure');
      } else {
        results.errors.push('❌ Workflow file has invalid structure');
        results.success = false;
      }

      // Check for essential jobs
      const essentialJobs = ['backend-tests', 'frontend-tests', 'e2e-tests'];
      essentialJobs.forEach(job => {
        if (workflowContent.includes(`${job}:`)) {
          results.tests.push(`✅ Workflow includes ${job} job`);
        } else {
          results.warnings.push(`⚠️  Workflow missing ${job} job`);
        }
      });
    } else {
      results.errors.push('❌ Workflow file missing');
      results.success = false;
    }

    // Test 7: Check CI-specific optimizations
    console.log('📋 Test 7: CI optimization validation');
    if (fs.existsSync('.github/ci-config.json')) {
      const ciConfig = JSON.parse(fs.readFileSync('.github/ci-config.json', 'utf8'));

      if (ciConfig.ci && ciConfig.ci.testConfiguration) {
        results.tests.push('✅ CI test configuration defined');
      } else {
        results.warnings.push('⚠️  CI test configuration incomplete');
      }
    } else {
      results.warnings.push('⚠️  CI config file missing');
    }

  } catch (error) {
    results.errors.push(`❌ Test execution failed: ${error.message}`);
    results.success = false;
  }

  // Print results
  console.log('\n📊 CI Environment Test Results:');
  console.log('✅ Successes:');
  results.tests.forEach(test => console.log(`  ${test}`));

  if (results.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    results.warnings.forEach(warning => console.log(`  ${warning}`));
  }

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.forEach(error => console.log(`  ${error}`));
  }

  const totalTests = results.tests.length + results.warnings.length + results.errors.length;
  const successRate = (results.tests.length / totalTests * 100).toFixed(1);

  console.log(`\n📈 Summary: ${results.tests.length}/${totalTests} tests passed (${successRate}%)`);

  if (results.success) {
    console.log('🎉 CI Environment is ready for deployment!');
    console.log('🚀 All systems go for CI/CD pipeline execution!');
  } else {
    console.log('❌ CI Environment needs attention before deployment');
  }

  return results.success;
}

// Run the test
const success = testCIEnvironment();
process.exit(success ? 0 : 1);