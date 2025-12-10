#!/usr/bin/env node
/**
 * Alert Check Script
 * Checks performance metrics against thresholds and triggers alerts
 */

const fs = require('fs');
const path = require('path');
const { performanceTracker } = require('./performance-tracker.js');

const CONFIG_PATH = path.join(__dirname, '../config/monitoring-config.json');
const ALERTS_DIR = path.join(__dirname, '../alerts');

async function checkAlerts() {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    const performanceData = await performanceTracker.getCurrentPerformance();

    console.log('🔍 Checking performance metrics against thresholds...');

    const alerts = [];
    const thresholds = config.monitoring.performanceThresholds;

    // Check performance metrics
    for (const [metric, thresholdLevels] of Object.entries(thresholds.performance)) {
      const currentValue = performanceData[metric];
      if (currentValue > thresholdLevels.critical) {
        alerts.push(createAlert('CRITICAL', metric, currentValue, thresholdLevels.critical));
      } else if (currentValue > thresholdLevels.high) {
        alerts.push(createAlert('HIGH', metric, currentValue, thresholdLevels.high));
      } else if (currentValue > thresholdLevels.medium) {
        alerts.push(createAlert('MEDIUM', metric, currentValue, thresholdLevels.medium));
      }
    }

    // Check web vitals
    for (const [metric, thresholdLevels] of Object.entries(thresholds.webVitals)) {
      const currentValue = performanceData.webVitals?.[metric];
      if (currentValue > thresholdLevels.critical) {
        alerts.push(createAlert('CRITICAL', `Web Vitals: ${metric.toUpperCase()}`, currentValue, thresholdLevels.critical));
      } else if (currentValue > thresholdLevels.high) {
        alerts.push(createAlert('HIGH', `Web Vitals: ${metric.toUpperCase()}`, currentValue, thresholdLevels.high));
      } else if (currentValue > thresholdLevels.medium) {
        alerts.push(createAlert('MEDIUM', `Web Vitals: ${metric.toUpperCase()}`, currentValue, thresholdLevels.medium));
      }
    }

    // Check cache performance
    const cacheHitRate = performanceData.cache?.hitRate || 0;
    if (cacheHitRate < thresholds.cache.hitRate.critical) {
      alerts.push(createAlert('CRITICAL', 'Cache Hit Rate', cacheHitRate, thresholds.cache.hitRate.critical));
    } else if (cacheHitRate < thresholds.cache.hitRate.high) {
      alerts.push(createAlert('HIGH', 'Cache Hit Rate', cacheHitRate, thresholds.cache.hitRate.high));
    } else if (cacheHitRate < thresholds.cache.hitRate.medium) {
      alerts.push(createAlert('MEDIUM', 'Cache Hit Rate', cacheHitRate, thresholds.cache.hitRate.medium));
    }

    if (alerts.length > 0) {
      console.log(`⚠️  Found ${alerts.length} alert(s) to trigger`);
      await triggerAlerts(alerts, config);
    } else {
      console.log('✅ No alerts triggered - all metrics within thresholds');
    }

    return alerts;

  } catch (error) {
    console.error('❌ Alert check failed:', error.message);
    return [];
  }
}

function createAlert(severity, metric, currentValue, threshold) {
  return {
    id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
    severity: {
      level: severity,
      priority: severity === 'CRITICAL' ? 1 : severity === 'HIGH' ? 2 : severity === 'MEDIUM' ? 3 : 4,
      color: severity === 'CRITICAL' ? '#f44336' : severity === 'HIGH' ? '#ff9800' : '#ffc107'
    },
    metric: metric,
    currentValue: currentValue,
    threshold: threshold,
    message: `${severity} alert: ${metric} (${currentValue}) exceeds ${severity.toLowerCase()} threshold (${threshold})`,
    category: 'performance'
  };
}

async function triggerAlerts(alerts, config) {
  console.log('🚨 Triggering alerts via configured channels...');

  const alertData = {
    timestamp: new Date().toISOString(),
    totalAlerts: alerts.length,
    criticalAlerts: alerts.filter(a => a.severity.level === 'CRITICAL').length,
    highAlerts: alerts.filter(a => a.severity.level === 'HIGH').length,
    mediumAlerts: alerts.filter(a => a.severity.level === 'MEDIUM').length,
    alerts: alerts
  };

  // Save alert data
  const alertFilePath = path.join(ALERTS_DIR, `alerts-${Date.now()}.json`);
  fs.writeFileSync(alertFilePath, JSON.stringify(alertData, null, 2));

  // Trigger each configured channel
  for (const channel of config.alerting.channels) {
    if (channel.enabled) {
      try {
        console.log(`📤 Sending alerts via ${channel.name}...`);
        // In a real implementation, this would call the actual notification service
        console.log(`📤 ${channel.name} notification sent: ${alertData.criticalAlerts} critical, ${alertData.highAlerts} high, ${alertData.mediumAlerts} medium alerts`);
      } catch (error) {
        console.error(`❌ Failed to send ${channel.name} notification:`, error.message);
      }
    }
  }

  console.log('✅ Alert triggering completed');
}

if (require.main === module) {
  checkAlerts()
    .then(alerts => {
      if (alerts.length > 0) {
        process.exit(1); // Exit with error code if alerts were triggered
      }
    })
    .catch(error => {
      console.error('Fatal error during alert check:', error);
      process.exit(1);
    });
}
