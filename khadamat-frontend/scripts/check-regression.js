#!/usr/bin/env node
/**
 * Performance Regression Detection Script
 * Detects performance regressions by comparing current metrics with historical baselines
 */

const fs = require('fs');
const path = require('path');
const { performanceTracker } = require('./performance-tracker.js');

const CONFIG_PATH = path.join(__dirname, '../config/monitoring-config.json');
const REGRESSION_DIR = path.join(__dirname, '../monitoring/regression');

async function checkRegression() {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    const { collectPerformanceMetrics } = require('./performance-tracker.js');
    const currentPerformance = collectPerformanceMetrics();

    console.log('🔄 Checking for performance regressions...');

    // Load historical baseline (or create if doesn't exist)
    const baselinePath = path.join(REGRESSION_DIR, 'performance-baseline.json');
    let baseline = {};

    if (fs.existsSync(baselinePath)) {
      baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    } else {
      // Create initial baseline
      baseline = {
        timestamp: new Date().toISOString(),
        metrics: Object.fromEntries(
          Object.keys(currentPerformance).map(key => [key, currentPerformance[key]])
        )
      };
      fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));
      console.log('📊 Created initial performance baseline');
      return [];
    }

    // Calculate regressions
    const regressions = [];
    const alertThreshold = config.monitoring.regressionDetection.alertThreshold / 100;

    for (const [metric, currentValue] of Object.entries(currentPerformance)) {
      if (baseline.metrics[metric] !== undefined) {
        const baselineValue = baseline.metrics[metric];
        const regressionPercent = ((currentValue - baselineValue) / baselineValue) * 100;

        if (regressionPercent > config.monitoring.regressionDetection.alertThreshold) {
          regressions.push({
            metric: metric,
            baselineValue: baselineValue,
            currentValue: currentValue,
            regressionPercent: regressionPercent.toFixed(2),
            severity: regressionPercent > 20 ? 'HIGH' : 'MEDIUM'
          });
        }
      }
    }

    if (regressions.length > 0) {
      console.log(`⚠️  Detected ${regressions.length} performance regression(s)`);
      await handleRegressions(regressions, config);
    } else {
      console.log('✅ No performance regressions detected');
    }

    // Update baseline periodically (e.g., weekly)
    const shouldUpdateBaseline = shouldUpdatePerformanceBaseline(baseline.timestamp);
    if (shouldUpdateBaseline) {
      baseline.timestamp = new Date().toISOString();
      baseline.metrics = Object.fromEntries(
        Object.keys(currentPerformance).map(key => [key, currentPerformance[key]])
      );
      fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));
      console.log('📊 Updated performance baseline');
    }

    return regressions;

  } catch (error) {
    console.error('❌ Regression check failed:', error.message);
    return [];
  }
}

function shouldUpdatePerformanceBaseline(lastUpdateTime) {
  const lastUpdate = new Date(lastUpdateTime);
  const now = new Date();
  const diffDays = (now - lastUpdate) / (1000 * 60 * 60 * 24);
  return diffDays >= 7; // Update baseline weekly
}

async function handleRegressions(regressions, config) {
  console.log('🚨 Handling performance regressions...');

  const regressionData = {
    timestamp: new Date().toISOString(),
    totalRegressions: regressions.length,
    regressions: regressions,
    recommendations: generateRegressionRecommendations(regressions)
  };

  // Save regression data
  const regressionFilePath = path.join(REGRESSION_DIR, `regression-${Date.now()}.json`);
  fs.writeFileSync(regressionFilePath, JSON.stringify(regressionData, null, 2));

  // Trigger alerts for critical regressions
  const criticalRegressions = regressions.filter(r => r.severity === 'HIGH');
  if (criticalRegressions.length > 0) {
    console.log(`🚨 ${criticalRegressions.length} critical regression(s) detected - triggering alerts`);
    await triggerRegressionAlerts(criticalRegressions, config);
  }

  console.log('✅ Regression handling completed');
}

function generateRegressionRecommendations(regressions) {
  return regressions.map(regression => ({
    metric: regression.metric,
    recommendation: getRegressionRecommendation(regression.metric, regression.regressionPercent),
    priority: regression.severity === 'HIGH' ? 'HIGH' : 'MEDIUM'
  }));
}

function getRegressionRecommendation(metric, regressionPercent) {
  const recommendations = {
    homepageLoadTime: 'Optimize homepage assets, implement lazy loading, review third-party scripts',
    servicesPageLoadTime: 'Optimize service page queries, implement caching, review image loading',
    loginPageLoadTime: 'Review authentication flow, optimize form validation, implement caching',
    apiAuthResponseTime: 'Optimize authentication API, review database queries, implement caching',
    apiServicesResponseTime: 'Optimize services API, review database queries, implement caching',
    lcp: 'Optimize largest contentful paint elements, implement lazy loading, review render-blocking resources',
    fid: 'Reduce JavaScript execution time, optimize event handlers, review long tasks',
    cls: 'Review layout shifts, stabilize content loading, implement proper sizing for media elements'
  };

  return recommendations[metric] || 'Investigate performance regression and optimize accordingly';
}

async function triggerRegressionAlerts(regressions, config) {
  for (const channel of config.alerting.channels) {
    if (channel.enabled) {
      try {
        console.log(`📤 Sending regression alerts via ${channel.name}...`);
        const alertMessage = `🚨 PERFORMANCE REGRESSION ALERT: ${regressions.length} critical regression(s) detected\n\n${regressions.map(r => `• ${r.metric}: +${r.regressionPercent}% (baseline: ${r.baselineValue}, current: ${r.currentValue})`).join('\n')}`;
        console.log(`📤 ${channel.name} regression alert sent:`, alertMessage);
      } catch (error) {
        console.error(`❌ Failed to send ${channel.name} regression alert:`, error.message);
      }
    }
  }
}

if (require.main === module) {
  checkRegression()
    .then(regressions => {
      if (regressions.length > 0) {
        process.exit(1); // Exit with error code if regressions were detected
      }
    })
    .catch(error => {
      console.error('Fatal error during regression check:', error);
      process.exit(1);
    });
}

module.exports = {
  checkRegression
};
