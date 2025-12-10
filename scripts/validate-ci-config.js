#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating CI/CD Configuration...');

function validateCIConfig() {
  const errors = [];
  const warnings = [];
  const successes = [];

  // Check if GitHub workflows directory exists
  const workflowsDir = path.join(__dirname, '..', '.github', 'workflows');
  if (fs.existsSync(workflowsDir)) {
    successes.push('✅ GitHub workflows directory exists');
  } else {
    errors.push('❌ GitHub workflows directory missing');
  }

  // Check if main workflow file exists
  const workflowFile = path.join(workflowsDir, 'ci-cd-pipeline.yml');
  if (fs.existsSync(workflowFile)) {
    successes.push('✅ Main CI/CD workflow file exists');

    // Validate workflow file content
    const workflowContent = fs.readFileSync(workflowFile, 'utf8');
    if (workflowContent.includes('name:')) {
      successes.push('✅ Workflow has a name');
    } else {
      warnings.push('⚠️  Workflow missing name');
    }

    if (workflowContent.includes('on:')) {
      successes.push('✅ Workflow has triggers defined');
    } else {
      errors.push('❌ Workflow missing triggers');
    }

    if (workflowContent.includes('jobs:')) {
      successes.push('✅ Workflow has jobs defined');
    } else {
      errors.push('❌ Workflow missing jobs');
    }

    // Check for essential jobs
    const essentialJobs = ['backend-tests', 'frontend-tests', 'e2e-tests'];
    essentialJobs.forEach(job => {
      if (workflowContent.includes(job + ':')) {
        successes.push(`✅ Workflow includes ${job} job`);
      } else {
        warnings.push(`⚠️  Workflow missing ${job} job`);
      }
    });

  } else {
    errors.push('❌ Main CI/CD workflow file missing');
  }

  // Check for CI environment file
  const ciEnvFile = path.join(__dirname, '..', '.env.ci');
  if (fs.existsSync(ciEnvFile)) {
    successes.push('✅ CI environment configuration file exists');
  } else {
    warnings.push('⚠️  CI environment configuration file missing');
  }

  // Check for CI config file
  const ciConfigFile = path.join(__dirname, '..', '.github', 'ci-config.json');
  if (fs.existsSync(ciConfigFile)) {
    successes.push('✅ CI configuration file exists');
  } else {
    warnings.push('⚠️  CI configuration file missing');
  }

  // Check package.json for test scripts
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    if (packageJson.scripts && packageJson.scripts.test) {
      successes.push('✅ Backend test script defined');
    } else {
      errors.push('❌ Backend test script missing');
    }

    if (packageJson.scripts && packageJson.scripts['test:e2e']) {
      successes.push('✅ E2E test script defined');
    } else {
      warnings.push('⚠️  E2E test script missing');
    }
  }

  // Check frontend package.json
  const frontendPackageJsonPath = path.join(__dirname, '..', 'khadamat-frontend', 'package.json');
  if (fs.existsSync(frontendPackageJsonPath)) {
    const frontendPackageJson = JSON.parse(fs.readFileSync(frontendPackageJsonPath, 'utf8'));

    if (frontendPackageJson.devDependencies && frontendPackageJson.devDependencies['@playwright/test']) {
      successes.push('✅ Playwright dependency installed');
    } else {
      errors.push('❌ Playwright dependency missing');
    }
  }

  // Check for Playwright config
  const playwrightConfigPath = path.join(__dirname, '..', 'khadamat-frontend', 'playwright.config.ts');
  if (fs.existsSync(playwrightConfigPath)) {
    successes.push('✅ Playwright configuration file exists');
  } else {
    warnings.push('⚠️  Playwright configuration file missing');
  }

  // Check for Jest config
  const jestConfigPath = path.join(__dirname, '..', 'test', 'jest-e2e.json');
  if (fs.existsSync(jestConfigPath)) {
    successes.push('✅ Jest configuration file exists');
  } else {
    warnings.push('⚠️  Jest configuration file missing');
  }

  // Print results
  console.log('\n📋 Validation Results:');
  console.log('✅ Successes:');
  successes.forEach(success => console.log(`  ${success}`));

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(warning => console.log(`  ${warning}`));
  }

  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(error => console.log(`  ${error}`));
  }

  // Summary
  const totalChecks = successes.length + warnings.length + errors.length;
  const successRate = (successes.length / totalChecks * 100).toFixed(1);

  console.log(`\n📊 Summary: ${successes.length}/${totalChecks} checks passed (${successRate}%)`);

  if (errors.length === 0 && warnings.length <= 3) {
    console.log('🎉 CI/CD Configuration is ready for deployment!');
    return true;
  } else if (errors.length === 0) {
    console.log('⚠️  CI/CD Configuration has some warnings but is functional');
    return true;
  } else {
    console.log('❌ CI/CD Configuration needs fixes before deployment');
    return false;
  }
}

// Run validation
const isValid = validateCIConfig();
process.exit(isValid ? 0 : 1);