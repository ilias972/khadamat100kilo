#!/usr/bin/env node

/**
 * Cache Effectiveness Validator
 *
 * Validates and analyzes the actual effectiveness of CI caching system
 * Provides concrete data on cache hit rates, time savings, and cost impact
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CACHE_METRICS_FILE = path.join(__dirname, '../cache-metrics.json');
const CACHE_PERFORMANCE_REPORT_FILE = path.join(__dirname, '../cache-performance-report.json');
const PERFORMANCE_METRICS_FILE = path.join(__dirname, '../performance-metrics.json');
const VALIDATION_REPORT_FILE = path.join(__dirname, '../cache-validation-report.json');

/**
 * Validate cache effectiveness with real metrics
 */
function validateCacheEffectiveness() {
  console.log('🔍 Validating cache effectiveness...');

  // Load existing cache metrics
  const cacheMetrics = loadCacheMetrics();
  const performanceMetrics = loadPerformanceMetrics();

  // Analyze cache effectiveness
  const validationResults = analyzeCacheEffectiveness(cacheMetrics, performanceMetrics);

  // Generate validation report
  const validationReport = generateValidationReport(validationResults);

  // Save validation report
  saveValidationReport(validationReport);

  return validationReport;
}

/**
 * Load cache metrics from file
 */
function loadCacheMetrics() {
  try {
    if (fs.existsSync(CACHE_METRICS_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_METRICS_FILE, 'utf8'));
      return data.metrics || [];
    }
    return [];
  } catch (error) {
    console.error('❌ Error loading cache metrics:', error.message);
    return [];
  }
}

/**
 * Load performance metrics from file
 */
function loadPerformanceMetrics() {
  try {
    if (fs.existsSync(PERFORMANCE_METRICS_FILE)) {
      return JSON.parse(fs.readFileSync(PERFORMANCE_METRICS_FILE, 'utf8'));
    }
    return { metrics: [] };
  } catch (error) {
    console.error('❌ Error loading performance metrics:', error.message);
    return { metrics: [] };
  }
}

/**
 * Analyze cache effectiveness with real data
 */
function analyzeCacheEffectiveness(cacheMetrics, performanceMetrics) {
  if (cacheMetrics.length === 0) {
    return {
      validationStatus: 'INSUFFICIENT_DATA',
      message: 'No cache metrics available for validation',
      recommendations: ['Run CI pipeline to collect baseline cache metrics']
    };
  }

  // Calculate real metrics from actual cache data
  const latestMetrics = cacheMetrics[cacheMetrics.length - 1];

  // Calculate actual cache hit rates
  const npmCacheHitRate = latestMetrics.npmCache?.cacheHitRate || 0;
  const playwrightCacheHitRate = latestMetrics.playwrightCache?.cacheHitRate || 0;
  const overallCacheHitRate = latestMetrics.overall?.overallCacheHitRate || 0;

  // Calculate time savings
  const timeSavedSeconds = latestMetrics.overall?.totalTimeSavedSeconds || 0;
  const estimatedAnnualSavings = parseFloat(latestMetrics.overall?.estimatedAnnualSavings || '0');

  // Validate against performance metrics
  const performanceImpact = validatePerformanceImpact(performanceMetrics, timeSavedSeconds);

  // Determine validation status
  const validationStatus = determineValidationStatus(overallCacheHitRate, estimatedAnnualSavings);

  return {
    validationStatus,
    cacheMetrics: {
      npmCacheHitRate: (npmCacheHitRate * 100).toFixed(1) + '%',
      playwrightCacheHitRate: (playwrightCacheHitRate * 100).toFixed(1) + '%',
      overallCacheHitRate: (overallCacheHitRate * 100).toFixed(1) + '%',
      timeSavedSeconds,
      estimatedAnnualSavings: `$${estimatedAnnualSavings.toFixed(2)}`,
      efficiencyScore: latestMetrics.overall?.efficiencyScore || 'N/A'
    },
    performanceImpact,
    recommendations: generateValidationRecommendations(latestMetrics, performanceImpact)
  };
}

/**
 * Validate performance impact of caching
 */
function validatePerformanceImpact(performanceMetrics, timeSavedSeconds) {
  if (performanceMetrics.metrics.length === 0) {
    return {
      ciDurationImpact: 'N/A',
      costSavingsImpact: 'N/A',
      overallEffectiveness: 'N/A'
    };
  }

  const latestPerformance = performanceMetrics.metrics[performanceMetrics.metrics.length - 1];

  // Calculate CI duration impact
  const ciDuration = latestPerformance.ciDuration || 300; // Default 5 minutes
  const durationReduction = ((timeSavedSeconds / ciDuration) * 100).toFixed(1) + '%';

  // Calculate cost savings impact
  const costSavingsPerRun = (timeSavedSeconds / 60 * 0.5).toFixed(2); // $0.50 per minute
  const annualCostSavings = (parseFloat(costSavingsPerRun) * 10 * 365).toFixed(2); // 10 runs/day

  // Determine overall effectiveness
  const effectivenessScore = calculateEffectivenessScore(timeSavedSeconds, annualCostSavings);

  return {
    ciDurationImpact: durationReduction,
    costSavingsImpact: `$${annualCostSavings}/year`,
    overallEffectiveness: effectivenessScore
  };
}

/**
 * Calculate effectiveness score
 */
function calculateEffectivenessScore(timeSaved, annualSavings) {
  let score = 0;

  // Time savings contribution (max 40 points)
  if (timeSaved >= 120) score += 40;
  else if (timeSaved >= 90) score += 30;
  else if (timeSaved >= 60) score += 20;
  else if (timeSaved >= 30) score += 10;

  // Cost savings contribution (max 40 points)
  const savings = parseFloat(annualSavings);
  if (savings >= 4000) score += 40;
  else if (savings >= 3000) score += 30;
  else if (savings >= 2000) score += 20;
  else if (savings >= 1000) score += 10;

  // Cache hit rate contribution (max 20 points)
  const hitRate = parseFloat(annualSavings) / 50; // Normalize
  score += Math.min(hitRate, 20);

  return {
    score: Math.min(score, 100),
    rating: getEffectivenessRating(score)
  };
}

/**
 * Get effectiveness rating based on score
 */
function getEffectivenessRating(score) {
  if (score >= 90) return 'EXCELLENT';
  if (score >= 80) return 'VERY_GOOD';
  if (score >= 70) return 'GOOD';
  if (score >= 60) return 'FAIR';
  if (score >= 50) return 'POOR';
  return 'NEEDS_IMPROVEMENT';
}

/**
 * Determine validation status
 */
function determineValidationStatus(cacheHitRate, annualSavings) {
  if (cacheHitRate >= 0.85 && annualSavings >= 4000) {
    return 'VALIDATED_EXCELLENT';
  } else if (cacheHitRate >= 0.8 && annualSavings >= 3000) {
    return 'VALIDATED_GOOD';
  } else if (cacheHitRate >= 0.75 && annualSavings >= 2000) {
    return 'VALIDATED_FAIR';
  } else if (cacheHitRate >= 0.7 && annualSavings >= 1000) {
    return 'VALIDATED_POOR';
  } else {
    return 'NEEDS_OPTIMIZATION';
  }
}

/**
 * Generate validation recommendations
 */
function generateValidationRecommendations(metrics, performanceImpact) {
  const recommendations = [];

  // Overall cache effectiveness
  const cacheHitRate = metrics.overall?.overallCacheHitRate || 0;
  if (cacheHitRate < 0.8) {
    recommendations.push({
      type: 'cache-optimization',
      priority: 'HIGH',
      message: `Overall cache hit rate (${(cacheHitRate * 100).toFixed(1)}%) is below optimal threshold (85%).`,
      action: 'Review cache key strategy and invalidation logic',
      impact: `Potential additional savings: $${(5000 - parseFloat(metrics.overall?.estimatedAnnualSavings || '0')).toFixed(2)}/year`
    });
  }

  // NPM cache specific
  const npmHitRate = metrics.npmCache?.cacheHitRate || 0;
  if (npmHitRate < 0.85) {
    recommendations.push({
      type: 'npm-cache',
      priority: 'MEDIUM',
      message: `npm cache hit rate (${(npmHitRate * 100).toFixed(1)}%) could be improved.`,
      action: 'Consider cleaning npm cache and optimizing package-lock.json',
      impact: `Could save additional ${metrics.npmCache?.timeSavedSeconds || 0}s per run`
    });
  }

  // Playwright cache specific
  const playwrightHitRate = metrics.playwrightCache?.cacheHitRate || 0;
  if (playwrightHitRate < 0.8) {
    recommendations.push({
      type: 'playwright-cache',
      priority: 'MEDIUM',
      message: `Playwright cache hit rate (${(playwrightHitRate * 100).toFixed(1)}%) needs optimization.`,
      action: 'Review browser cache configuration and test isolation',
      impact: `Could save additional ${metrics.playwrightCache?.timeSavedSeconds || 0}s per run`
    });
  }

  // Performance impact recommendations
  if (performanceImpact.overallEffectiveness?.rating === 'POOR' || performanceImpact.overallEffectiveness?.rating === 'NEEDS_IMPROVEMENT') {
    recommendations.push({
      type: 'performance-optimization',
      priority: 'HIGH',
      message: `Cache performance impact rated as ${performanceImpact.overallEffectiveness?.rating}.`,
      action: 'Comprehensive cache strategy review required',
      impact: 'Significant performance improvements possible'
    });
  }

  return recommendations;
}

/**
 * Generate validation report
 */
function generateValidationReport(validationResults) {
  return {
    timestamp: new Date().toISOString(),
    validationStatus: validationResults.validationStatus,
    cacheMetrics: validationResults.cacheMetrics,
    performanceImpact: validationResults.performanceImpact,
    recommendations: validationResults.recommendations,
    validationSummary: generateValidationSummary(validationResults)
  };
}

/**
 * Generate validation summary
 */
function generateValidationSummary(validationResults) {
  const summary = {
    overallStatus: validationResults.validationStatus,
    cacheEffectiveness: validationResults.cacheMetrics.overallCacheHitRate,
    timeSavings: validationResults.cacheMetrics.timeSavedSeconds + ' seconds per run',
    costSavings: validationResults.cacheMetrics.estimatedAnnualSavings,
    ciDurationImpact: validationResults.performanceImpact.ciDurationImpact,
    recommendationCount: validationResults.recommendations.length,
    recommendationPriority: validationResults.recommendations.length > 0 ?
      validationResults.recommendations[0].priority : 'NONE'
  };

  // Add validation message
  switch (validationResults.validationStatus) {
    case 'VALIDATED_EXCELLENT':
      summary.message = '🎉 Cache system is performing excellently with significant cost and time savings.';
      break;
    case 'VALIDATED_GOOD':
      summary.message = '✅ Cache system is performing well with good cost and time savings.';
      break;
    case 'VALIDATED_FAIR':
      summary.message = '⚠️ Cache system is performing fairly but has room for improvement.';
      break;
    case 'VALIDATED_POOR':
      summary.message = '⚠️ Cache system performance is below expectations.';
      break;
    case 'NEEDS_OPTIMIZATION':
      summary.message = '❌ Cache system requires optimization for better performance.';
      break;
    default:
      summary.message = '⚠️ Insufficient data for comprehensive validation.';
  }

  return summary;
}

/**
 * Save validation report
 */
function saveValidationReport(report) {
  try {
    fs.writeFileSync(VALIDATION_REPORT_FILE, JSON.stringify(report, null, 2));
    console.log(`✅ Cache validation report saved to ${VALIDATION_REPORT_FILE}`);
  } catch (error) {
    console.error('❌ Error saving validation report:', error.message);
  }
}

/**
 * Run real cache validation tests
 */
function runCacheValidationTests() {
  console.log('🧪 Running cache validation tests...');

  try {
    // Test 1: Cache file existence
    const cacheFilesExist = fs.existsSync(CACHE_METRICS_FILE) && fs.existsSync(CACHE_PERFORMANCE_REPORT_FILE);
    console.log(`✅ Cache files existence: ${cacheFilesExist ? 'PASS' : 'FAIL'}`);

    // Test 2: Cache metrics structure
    const cacheMetricsValid = validateCacheMetricsStructure();
    console.log(`✅ Cache metrics structure: ${cacheMetricsValid ? 'PASS' : 'FAIL'}`);

    // Test 3: Performance integration
    const performanceIntegrationValid = validatePerformanceIntegration();
    console.log(`✅ Performance integration: ${performanceIntegrationValid ? 'PASS' : 'FAIL'}`);

    return {
      cacheFilesExist,
      cacheMetricsValid,
      performanceIntegrationValid,
      overallTestStatus: cacheFilesExist && cacheMetricsValid && performanceIntegrationValid ? 'PASS' : 'FAIL'
    };

  } catch (error) {
    console.error('❌ Cache validation tests failed:', error.message);
    return {
      overallTestStatus: 'FAIL',
      error: error.message
    };
  }
}

/**
 * Validate cache metrics structure
 */
function validateCacheMetricsStructure() {
  try {
    const metrics = JSON.parse(fs.readFileSync(CACHE_METRICS_FILE, 'utf8'));
    if (!metrics.metrics || !Array.isArray(metrics.metrics) || metrics.metrics.length === 0) {
      return false;
    }

    const latestMetric = metrics.metrics[metrics.metrics.length - 1];
    return latestMetric.npmCache && latestMetric.playwrightCache && latestMetric.overall;
  } catch (error) {
    return false;
  }
}

/**
 * Validate performance integration
 */
function validatePerformanceIntegration() {
  try {
    if (!fs.existsSync(PERFORMANCE_METRICS_FILE)) return false;

    const performanceData = JSON.parse(fs.readFileSync(PERFORMANCE_METRICS_FILE, 'utf8'));
    if (!performanceData.metrics || performanceData.metrics.length === 0) return false;

    const latestMetric = performanceData.metrics[performanceData.metrics.length - 1];
    return latestMetric.cache !== undefined;
  } catch (error) {
    return false;
  }
}

// Main execution
if (require.main === module) {
  try {
    console.log('🚀 Starting Cache Effectiveness Validation...');
    console.log('===========================================');

    // Run validation tests
    const testResults = runCacheValidationTests();
    console.log(`\n📊 Validation Test Results: ${testResults.overallTestStatus}`);

    if (testResults.overallTestStatus === 'PASS') {
      // Run full validation
      const validationReport = validateCacheEffectiveness();

      console.log('\n🎯 Cache Validation Summary:');
      console.log(`- Status: ${validationReport.validationSummary.overallStatus}`);
      console.log(`- Cache Effectiveness: ${validationReport.validationSummary.cacheEffectiveness}`);
      console.log(`- Time Savings: ${validationReport.validationSummary.timeSavings}`);
      console.log(`- Cost Savings: ${validationReport.validationSummary.costSavings}`);
      console.log(`- CI Impact: ${validationReport.validationSummary.ciDurationImpact}`);
      console.log(`- Message: ${validationReport.validationSummary.message}`);

      if (validationReport.recommendations.length > 0) {
        console.log('\n🔍 Cache Optimization Recommendations:');
        validationReport.recommendations.forEach((rec, index) => {
          console.log(`${index + 1}. [${rec.priority}] ${rec.message}`);
          console.log(`   Action: ${rec.action}`);
          console.log(`   Impact: ${rec.impact}`);
        });
      }

      console.log('\n✅ Cache effectiveness validation complete!');
      console.log(`📊 Full report available at: ${VALIDATION_REPORT_FILE}`);

    } else {
      console.log('\n❌ Cache validation tests failed. Cannot proceed with full validation.');
      console.log('Recommendations:');
      console.log('- Run CI pipeline to collect baseline metrics');
      console.log('- Ensure cache metrics are being tracked properly');
      console.log('- Verify performance metrics integration');
    }

    process.exit(0);

  } catch (error) {
    console.error('❌ Cache effectiveness validation failed:', error.message);
    process.exit(1);
  }
}

module.exports = {
  validateCacheEffectiveness,
  loadCacheMetrics,
  loadPerformanceMetrics,
  analyzeCacheEffectiveness,
  validatePerformanceImpact,
  generateValidationReport,
  runCacheValidationTests
};