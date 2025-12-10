#!/usr/bin/env node

/**
 * Performance Budget Checker
 *
 * This script validates that performance metrics meet established budgets
 * and fails the build if budgets are exceeded.
 */

const fs = require('fs');
const path = require('path');

// Load performance budgets
const BUDGETS = JSON.parse(fs.readFileSync(path.join(__dirname, '../performance-budgets.json'), 'utf8'));

/**
 * Check Lighthouse performance budgets
 */
function checkLighthouseBudgets(lighthouseReport) {
  console.log('📊 Checking Lighthouse performance budgets...');

  const categories = lighthouseReport.categories || {};
  let allPassed = true;

  Object.entries(BUDGETS.lighthouse).forEach(([category, budget]) => {
    const score = categories[category]?.score || 0;

    if (score < budget) {
      console.error(`❌ ${category}: ${score} < ${budget} (FAIL)`);
      allPassed = false;
    } else {
      console.log(`✅ ${category}: ${score} ≥ ${budget} (PASS)`);
    }
  });

  return allPassed;
}

/**
 * Check Web Vitals budgets
 */
function checkWebVitalsBudgets(lighthouseReport) {
  console.log('📊 Checking Web Vitals budgets...');

  const metrics = lighthouseReport.audits?.metrics?.details?.items?.[0] || {};
  let allPassed = true;

  Object.entries(BUDGETS.webVitals).forEach(([metric, budget]) => {
    const actualValue = metrics[`observed${metric.charAt(0).toUpperCase() + metric.slice(1)}`];

    if (actualValue && actualValue > budget) {
      console.error(`❌ ${metric}: ${actualValue}ms > ${budget}ms (FAIL)`);
      allPassed = false;
    } else {
      console.log(`✅ ${metric}: ${actualValue || 0}ms ≤ ${budget}ms (PASS)`);
    }
  });

  return allPassed;
}

/**
 * Check API response time budgets
 */
function checkApiBudgets(apiResults) {
  console.log('📊 Checking API response time budgets...');

  let allPassed = true;

  apiResults.forEach(result => {
    const endpoint = result.endpoint;
    const responseTime = result.responseTime;

    // Find specific budget for this endpoint or use general budgets
    const endpointKey = Object.keys(BUDGETS.apiResponse).find(key =>
      endpoint.includes(key)
    );

    const budget = endpointKey ?
      BUDGETS.apiResponse[endpointKey] :
      BUDGETS.apiResponse.max;

    if (responseTime > budget) {
      console.error(`❌ ${endpoint}: ${responseTime}ms > ${budget}ms (FAIL)`);
      allPassed = false;
    } else {
      console.log(`✅ ${endpoint}: ${responseTime}ms ≤ ${budget}ms (PASS)`);
    }
  });

  return allPassed;
}

/**
 * Check bundle size budgets
 */
function checkBundleSizeBudgets(bundleStats) {
  console.log('📊 Checking bundle size budgets...');

  let allPassed = true;

  Object.entries(BUDGETS.bundleSize).forEach(([bundleName, budget]) => {
    const actualSize = bundleStats[bundleName] || 0;

    if (actualSize > budget) {
      console.error(`❌ ${bundleName}: ${actualSize} bytes > ${budget} bytes (FAIL)`);
      allPassed = false;
    } else {
      console.log(`✅ ${bundleName}: ${actualSize} bytes ≤ ${budget} bytes (PASS)`);
    }
  });

  return allPassed;
}

/**
 * Main budget checking function
 */
function checkPerformanceBudgets() {
  console.log('🚀 Starting performance budget validation...');
  console.log('=============================================');

  try {
    // Load performance report
    const performanceReportPath = path.join(__dirname, '../performance-report-for-validation.json');
    if (!fs.existsSync(performanceReportPath)) {
      console.error('❌ Performance report not found. Run performance tests first.');
      return false;
    }

    const performanceReport = JSON.parse(fs.readFileSync(performanceReportPath, 'utf8'));

    // Check all budget categories
    const lighthousePassed = checkLighthouseBudgets(performanceReport.lighthouseResults[0] || {});
    const webVitalsPassed = checkWebVitalsBudgets(performanceReport.lighthouseResults[0] || {});
    const apiPassed = checkApiBudgets(performanceReport.apiResults || []);
    const bundlePassed = checkBundleSizeBudgets(performanceReport.bundleStats || {});

    const allPassed = lighthousePassed && webVitalsPassed && apiPassed && bundlePassed;

    if (allPassed) {
      console.log('✅ All performance budgets PASSED!');
      return true;
    } else {
      console.log('❌ Some performance budgets FAILED!');
      return false;
    }
  } catch (error) {
    console.error('❌ Performance budget check failed:', error.message);
    return false;
  }
}

/**
 * Generate budget validation report
 */
function generateBudgetReport(passed) {
  const report = {
    timestamp: new Date().toISOString(),
    budgets: BUDGETS,
    status: passed ? 'PASS' : 'FAIL',
    message: passed ?
      'All performance budgets met' :
      'Some performance budgets exceeded'
  };

  const reportPath = path.join(__dirname, '../budget-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`✅ Budget validation report generated: ${reportPath}`);
  return report;
}

// Run budget check if this script is executed directly
if (require.main === module) {
  const passed = checkPerformanceBudgets();
  generateBudgetReport(passed);
  process.exit(passed ? 0 : 1);
}

module.exports = {
  checkPerformanceBudgets,
  checkLighthouseBudgets,
  checkWebVitalsBudgets,
  checkApiBudgets,
  checkBundleSizeBudgets,
  generateBudgetReport,
  BUDGETS
};