#!/usr/bin/env node

/**
 * Automated Performance Tests for CI/CD Pipeline
 *
 * This script runs comprehensive performance tests including:
 * - Lighthouse audits
 * - Web Vitals measurements
 * - API response time testing
 * - Performance budget validation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Performance budgets configuration
const PERFORMANCE_BUDGETS = {
  lighthouse: {
    performance: 0.9,
    accessibility: 0.9,
    'best-practices': 0.9,
    seo: 0.9,
    pwa: 0.8
  },
  webVitals: {
    fcp: 1800,    // First Contentful Paint
    lcp: 2500,    // Largest Contentful Paint
    cls: 0.1,     // Cumulative Layout Shift
    tti: 3800,    // Time to Interactive
    speedIndex: 4300
  },
  apiResponse: {
    max: 1000,   // Maximum API response time
    p95: 500     // 95th percentile response time
  }
};

/**
 * Run Lighthouse audits
 */
async function runLighthouseAudits() {
  console.log('🚀 Starting Lighthouse audits...');

  try {
    // Run Lighthouse on key pages
    const pages = [
      'http://localhost:3000',
      'http://localhost:3000/dashboard',
      'http://localhost:3000/search'
    ];

    const results = [];

    for (const page of pages) {
      console.log(`📊 Auditing: ${page}`);

      const reportPath = `lighthouse-report-${new Date().getTime()}.json`;

      try {
        // Run Lighthouse with JSON output
        execSync(`lighthouse ${page} --output=json --output-path=${reportPath} --chrome-flags="--headless"`, {
          stdio: 'inherit'
        });

        // Read and parse results
        const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        results.push({
          url: page,
          ...reportData
        });

        console.log(`✅ Completed audit for ${page}`);
      } catch (error) {
        console.error(`❌ Failed to audit ${page}:`, error.message);
      }
    }

    return results;
  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error.message);
    return [];
  }
}

/**
 * Check performance budgets
 */
function checkPerformanceBudgets(results) {
  console.log('💰 Checking performance budgets...');

  let allPassed = true;

  // Check Lighthouse scores
  results.forEach(result => {
    const categories = result.categories || {};

    Object.entries(PERFORMANCE_BUDGETS.lighthouse).forEach(([category, budget]) => {
      const score = categories[category]?.score || 0;

      if (score < budget) {
        console.warn(`⚠️  ${category}: ${score} < ${budget} (FAIL)`);
        allPassed = false;
      } else {
        console.log(`✅ ${category}: ${score} ≥ ${budget} (PASS)`);
      }
    });

    // Check Web Vitals
    const metrics = result.audits?.metrics?.details?.items?.[0] || {};
    Object.entries(PERFORMANCE_BUDGETS.webVitals).forEach(([metric, budget]) => {
      const actualValue = metrics[`observed${metric.charAt(0).toUpperCase() + metric.slice(1)}`];

      if (actualValue && actualValue > budget) {
        console.warn(`⚠️  ${metric}: ${actualValue}ms > ${budget}ms (FAIL)`);
        allPassed = false;
      } else {
        console.log(`✅ ${metric}: ${actualValue || 0}ms ≤ ${budget}ms (PASS)`);
      }
    });
  });

  return allPassed;
}

/**
 * Run API performance tests
 */
async function runApiPerformanceTests() {
  console.log('🔄 Testing API performance...');

  const apiEndpoints = [
    'http://localhost:3001/api/auth/login',
    'http://localhost:3001/api/pro/services',
    'http://localhost:3001/api/search'
  ];

  const results = [];

  for (const endpoint of apiEndpoints) {
    try {
      const startTime = Date.now();
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      results.push({
        endpoint,
        responseTime,
        status: response.status
      });

      console.log(`✅ ${endpoint}: ${responseTime}ms`);

      // Check against budgets
      if (responseTime > PERFORMANCE_BUDGETS.apiResponse.max) {
        console.warn(`⚠️  API response time exceeds maximum budget: ${responseTime}ms > ${PERFORMANCE_BUDGETS.apiResponse.max}ms`);
        return false;
      }

      if (responseTime > PERFORMANCE_BUDGETS.apiResponse.p95) {
        console.warn(`⚠️  API response time exceeds 95th percentile budget: ${responseTime}ms > ${PERFORMANCE_BUDGETS.apiResponse.p95}ms`);
      }
    } catch (error) {
      console.error(`❌ API test failed for ${endpoint}:`, error.message);
      return false;
    }
  }

  return true;
}

/**
 * Generate performance report
 */
function generatePerformanceReport(results, budgetCheckPassed) {
  console.log('📊 Generating performance report...');

  const report = {
    timestamp: new Date().toISOString(),
    lighthouseResults: results,
    budgetCheckPassed,
    performanceBudgets: PERFORMANCE_BUDGETS,
    summary: {
      overallStatus: budgetCheckPassed ? 'PASS' : 'FAIL',
      lighthouseScore: results.length > 0 ?
        results.reduce((sum, result) => sum + (result.categories?.performance?.score || 0), 0) / results.length : 0,
      apiPerformance: 'GOOD'
    }
  };

  // Write report to file
  const reportPath = 'performance-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`✅ Performance report generated: ${reportPath}`);
  return report;
}

/**
 * Main performance test runner
 */
async function runPerformanceTests() {
  console.log('🚀 Starting automated performance tests...');
  console.log('==========================================');

  try {
    // 1. Run Lighthouse audits
    const lighthouseResults = await runLighthouseAudits();

    // 2. Check performance budgets
    const budgetCheckPassed = checkPerformanceBudgets(lighthouseResults);

    // 3. Run API performance tests
    const apiTestsPassed = await runApiPerformanceTests();

    // 4. Generate report
    const report = generatePerformanceReport(lighthouseResults, budgetCheckPassed && apiTestsPassed);

    // 5. Exit with appropriate code
    if (budgetCheckPassed && apiTestsPassed) {
      console.log('✅ All performance tests PASSED!');
      process.exit(0);
    } else {
      console.log('❌ Some performance tests FAILED!');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Performance test execution failed:', error);
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runPerformanceTests();
}

module.exports = {
  runPerformanceTests,
  runLighthouseAudits,
  checkPerformanceBudgets,
  runApiPerformanceTests,
  generatePerformanceReport,
  PERFORMANCE_BUDGETS
};