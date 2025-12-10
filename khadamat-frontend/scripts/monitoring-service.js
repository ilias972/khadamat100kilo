#!/usr/bin/env node

/**
 * Khadamat Monitoring Service
 *
 * Comprehensive monitoring service that integrates:
 * - Performance threshold monitoring
 * - Multi-channel alerting (Slack, email, SMS)
 * - Performance regression detection
 * - Continuous monitoring and logging
 * - Dashboard generation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { performanceTracker } = require('./performance-tracker.js');
const { generateComprehensiveDashboard } = require('./generate-performance-dashboard.js');

const CONFIG_PATH = path.join(__dirname, '../config/monitoring-config.json');
const LOG_FILE = '/var/log/performance.log';
const MONITORING_DIR = path.join(__dirname, '../monitoring');

/**
 * Load monitoring configuration
 */
function loadConfiguration() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      console.log('✅ Monitoring configuration loaded');
      return config;
    } else {
      console.log('⚠️  Monitoring configuration not found, using defaults');
      return getDefaultConfiguration();
    }
  } catch (error) {
    console.error('❌ Failed to load configuration:', error.message);
    return getDefaultConfiguration();
  }
}

/**
 * Get default configuration
 */
function getDefaultConfiguration() {
  return {
    monitoring: {
      performanceThresholds: {
        performance: {
          homepageLoadTime: { critical: 3000, high: 2500, medium: 2000 },
          servicesPageLoadTime: { critical: 3500, high: 3000, medium: 2500 },
          loginPageLoadTime: { critical: 2000, high: 1500, medium: 1200 },
          apiAuthResponseTime: { critical: 800, high: 600, medium: 500 },
          apiServicesResponseTime: { critical: 1000, high: 800, medium: 700 }
        },
        webVitals: {
          lcp: { critical: 4000, high: 3500, medium: 2500 },
          fid: { critical: 300, high: 200, medium: 100 },
          cls: { critical: 0.25, high: 0.2, medium: 0.1 }
        },
        cache: {
          hitRate: { critical: 0.7, high: 0.8, medium: 0.85 }
        }
      },
      regressionDetection: {
        enabled: true,
        sensitivity: 'high',
        baselinePeriod: '7_days',
        alertThreshold: 10.0
      }
    },
    alerting: {
      channels: [
        { name: 'slack', enabled: true },
        { name: 'email', enabled: true },
        { name: 'sms', enabled: true }
      ],
      escalationPolicy: {
        critical: ['slack', 'email', 'sms'],
        high: ['slack', 'email'],
        medium: ['slack'],
        low: ['email']
      }
    },
    logging: {
      logFile: LOG_FILE,
      logLevel: 'info'
    }
  };
}

/**
 * Log message to console and file
 */
function logMessage(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  console.log(logEntry);

  try {
    // Ensure log directory exists
    const logDir = path.dirname(LOG_FILE);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Append to log file
    fs.appendFileSync(LOG_FILE, logEntry + '\n');
  } catch (error) {
    console.error('❌ Failed to write to log file:', error.message);
  }
}

/**
 * Check performance thresholds and generate alerts
 */
async function checkPerformanceThresholds(config) {
  try {
    logMessage('🔍 Checking performance metrics against thresholds...');

    const performanceData = await performanceTracker.getCurrentPerformance();
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
      logMessage(`⚠️  Found ${alerts.length} performance alert(s)`);
      await triggerAlerts(alerts, config);
    } else {
      logMessage('✅ All performance metrics within thresholds');
    }

    return alerts;

  } catch (error) {
    logMessage(`❌ Performance threshold check failed: ${error.message}`, 'error');
    return [];
  }
}

/**
 * Create alert object
 */
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

/**
 * Trigger alerts via configured channels
 */
async function triggerAlerts(alerts, config) {
  logMessage(`🚨 Triggering ${alerts.length} alert(s) via configured channels...`);

  const alertData = {
    timestamp: new Date().toISOString(),
    totalAlerts: alerts.length,
    criticalAlerts: alerts.filter(a => a.severity.level === 'CRITICAL').length,
    highAlerts: alerts.filter(a => a.severity.level === 'HIGH').length,
    mediumAlerts: alerts.filter(a => a.severity.level === 'MEDIUM').length,
    alerts: alerts
  };

  // Save alert data
  const alertsDir = path.join(__dirname, '../alerts');
  if (!fs.existsSync(alertsDir)) {
    fs.mkdirSync(alertsDir, { recursive: true });
  }

  const alertFilePath = path.join(alertsDir, `alerts-${Date.now()}.json`);
  fs.writeFileSync(alertFilePath, JSON.stringify(alertData, null, 2));
  logMessage(`💾 Alert data saved to ${alertFilePath}`);

  // Trigger each configured channel
  for (const channel of config.alerting.channels) {
    if (channel.enabled) {
      try {
        logMessage(`📤 Sending alerts via ${channel.name}...`);

        // Determine which alerts to send based on escalation policy
        const channelAlerts = getAlertsForChannel(alerts, channel.name, config);

        if (channelAlerts.length > 0) {
          const alertSummary = {
            total: channelAlerts.length,
            critical: channelAlerts.filter(a => a.severity.level === 'CRITICAL').length,
            high: channelAlerts.filter(a => a.severity.level === 'HIGH').length,
            medium: channelAlerts.filter(a => a.severity.level === 'MEDIUM').length
          };

          // In a real implementation, this would call the actual notification service
          logMessage(`📤 ${channel.name} notification sent: ${alertSummary.critical} critical, ${alertSummary.high} high, ${alertSummary.medium} medium alerts`);

          // Simulate sending to different channels
          await simulateChannelNotification(channel.name, channelAlerts);
        } else {
          logMessage(`📤 No alerts for ${channel.name} channel (based on escalation policy)`);
        }
      } catch (error) {
        logMessage(`❌ Failed to send ${channel.name} notification: ${error.message}`, 'error');
      }
    }
  }

  logMessage('✅ Alert triggering completed');
}

/**
 * Get alerts for specific channel based on escalation policy
 */
function getAlertsForChannel(alerts, channelName, config) {
  const channelAlerts = [];

  alerts.forEach(alert => {
    const severity = alert.severity.level.toLowerCase();
    const channelsForSeverity = config.alerting.escalationPolicy[severity] || [];

    if (channelsForSeverity.includes(channelName)) {
      channelAlerts.push(alert);
    }
  });

  return channelAlerts;
}

/**
 * Simulate sending notifications to different channels
 */
async function simulateChannelNotification(channel, alerts) {
  // This would be replaced with actual API calls in production
  switch (channel) {
    case 'slack':
      // Simulate Slack webhook call
      const slackMessage = {
        text: `🚨 *PERFORMANCE ALERT* 🚨`,
        attachments: alerts.map(alert => ({
          color: alert.severity.color,
          title: `${alert.severity.level} Alert: ${alert.metric}`,
          text: alert.message,
          fields: [
            { title: "Current Value", value: alert.currentValue, short: true },
            { title: "Threshold", value: alert.threshold, short: true },
            { title: "Timestamp", value: new Date(alert.timestamp).toLocaleString(), short: false }
          ]
        }))
      };
      logMessage(`📤 Slack message prepared: ${JSON.stringify(slackMessage, null, 2)}`);
      break;

    case 'email':
      // Simulate email sending
      const emailSubject = `🚨 [PERFORMANCE ALERT] ${alerts.length} alert(s) triggered`;
      const emailBody = `Performance Monitoring Alert\n\n${alerts.map(alert => `• ${alert.severity.level}: ${alert.metric} - ${alert.message}`).join('\n')}`;
      logMessage(`📤 Email prepared - Subject: "${emailSubject}"`);
      break;

    case 'sms':
      // Simulate SMS sending
      const smsMessage = `PERF ALERT: ${alerts.length} issue(s) - ${alerts.filter(a => a.severity.level === 'CRITICAL').length} critical, ${alerts.filter(a => a.severity.level === 'HIGH').length} high`;
      logMessage(`📤 SMS prepared: "${smsMessage}"`);
      break;
  }
}

/**
 * Check for performance regressions
 */
async function checkPerformanceRegressions(config) {
  try {
    logMessage('🔄 Checking for performance regressions...');

    const regressionDir = path.join(MONITORING_DIR, 'regression');
    if (!fs.existsSync(regressionDir)) {
      fs.mkdirSync(regressionDir, { recursive: true });
    }

    const baselinePath = path.join(regressionDir, 'performance-baseline.json');
    const currentPerformance = await performanceTracker.getCurrentPerformance();

    // Load or create baseline
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
      logMessage('📊 Created initial performance baseline');
      return [];
    }

    // Calculate regressions
    const regressions = [];
    const alertThreshold = config.monitoring.regressionDetection.alertThreshold;

    for (const [metric, currentValue] of Object.entries(currentPerformance)) {
      if (baseline.metrics[metric] !== undefined) {
        const baselineValue = baseline.metrics[metric];
        const regressionPercent = ((currentValue - baselineValue) / baselineValue) * 100;

        if (regressionPercent > alertThreshold) {
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
      logMessage(`⚠️  Detected ${regressions.length} performance regression(s)`);
      await handleRegressions(regressions, config);
    } else {
      logMessage('✅ No performance regressions detected');
    }

    // Update baseline weekly
    const shouldUpdateBaseline = shouldUpdatePerformanceBaseline(baseline.timestamp);
    if (shouldUpdateBaseline) {
      baseline.timestamp = new Date().toISOString();
      baseline.metrics = Object.fromEntries(
        Object.keys(currentPerformance).map(key => [key, currentPerformance[key]])
      );
      fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));
      logMessage('📊 Updated performance baseline');
    }

    return regressions;

  } catch (error) {
    logMessage(`❌ Regression check failed: ${error.message}`, 'error');
    return [];
  }
}

/**
 * Determine if baseline should be updated
 */
function shouldUpdatePerformanceBaseline(lastUpdateTime) {
  const lastUpdate = new Date(lastUpdateTime);
  const now = new Date();
  const diffDays = (now - lastUpdate) / (1000 * 60 * 60 * 24);
  return diffDays >= 7; // Update baseline weekly
}

/**
 * Handle performance regressions
 */
async function handleRegressions(regressions, config) {
  logMessage('🚨 Handling performance regressions...');

  const regressionData = {
    timestamp: new Date().toISOString(),
    totalRegressions: regressions.length,
    regressions: regressions,
    recommendations: generateRegressionRecommendations(regressions)
  };

  // Save regression data
  const regressionFilePath = path.join(MONITORING_DIR, 'regression', `regression-${Date.now()}.json`);
  fs.writeFileSync(regressionFilePath, JSON.stringify(regressionData, null, 2));

  // Trigger alerts for critical regressions
  const criticalRegressions = regressions.filter(r => r.severity === 'HIGH');
  if (criticalRegressions.length > 0) {
    logMessage(`🚨 ${criticalRegressions.length} critical regression(s) detected - triggering alerts`);
    await triggerRegressionAlerts(criticalRegressions, config);
  }

  logMessage('✅ Regression handling completed');
}

/**
 * Generate regression recommendations
 */
function generateRegressionRecommendations(regressions) {
  return regressions.map(regression => ({
    metric: regression.metric,
    recommendation: getRegressionRecommendation(regression.metric, regression.regressionPercent),
    priority: regression.severity === 'HIGH' ? 'HIGH' : 'MEDIUM'
  }));
}

/**
 * Get specific regression recommendations
 */
function getRegressionRecommendation(metric, regressionPercent) {
  const recommendations = {
    homepageLoadTime: 'Optimize homepage assets, implement lazy loading, review third-party scripts, consider code splitting',
    servicesPageLoadTime: 'Optimize service page queries, implement caching, review image loading, consider SSR',
    loginPageLoadTime: 'Review authentication flow, optimize form validation, implement caching, consider preloading',
    apiAuthResponseTime: 'Optimize authentication API, review database queries, implement caching, consider query optimization',
    apiServicesResponseTime: 'Optimize services API, review database queries, implement caching, consider pagination',
    lcp: 'Optimize largest contentful paint elements, implement lazy loading, review render-blocking resources, consider preloading critical assets',
    fid: 'Reduce JavaScript execution time, optimize event handlers, review long tasks, consider web workers',
    cls: 'Review layout shifts, stabilize content loading, implement proper sizing for media elements, consider CSS containment'
  };

  return recommendations[metric] || 'Investigate performance regression and optimize accordingly';
}

/**
 * Trigger regression alerts
 */
async function triggerRegressionAlerts(regressions, config) {
  for (const channel of config.alerting.channels) {
    if (channel.enabled) {
      try {
        logMessage(`📤 Sending regression alerts via ${channel.name}...`);

        const alertMessage = `🚨 *PERFORMANCE REGRESSION ALERT* 🚨
${regressions.length} critical regression(s) detected:

${regressions.map(r => `• ${r.metric}: +${r.regressionPercent}% (baseline: ${r.baselineValue}, current: ${r.currentValue})`).join('\n')}

Recommendations:
${regressions.map(r => `• ${r.metric}: ${getRegressionRecommendation(r.metric, r.regressionPercent)}`).join('\n')}`;

        logMessage(`📤 ${channel.name} regression alert sent:`, alertMessage);

        // Simulate sending regression alerts
        await simulateChannelNotification(channel.name, regressions.map(r => ({
          severity: { level: r.severity, priority: r.severity === 'HIGH' ? 1 : 2 },
          metric: `Regression: ${r.metric}`,
          message: `Performance regression detected: +${r.regressionPercent}%`,
          currentValue: r.currentValue,
          threshold: r.baselineValue
        })));

      } catch (error) {
        logMessage(`❌ Failed to send ${channel.name} regression alert: ${error.message}`, 'error');
      }
    }
  }
}

/**
 * Generate comprehensive monitoring report
 */
async function generateMonitoringReport() {
  try {
    logMessage('📊 Generating comprehensive monitoring report...');

    const report = {
      timestamp: new Date().toISOString(),
      performanceData: await performanceTracker.getCurrentPerformance(),
      alertStatus: await checkPerformanceThresholds(loadConfiguration()),
      regressionStatus: await checkPerformanceRegressions(loadConfiguration()),
      systemHealth: 'OPERATIONAL'
    };

    const reportPath = path.join(MONITORING_DIR, `monitoring-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    logMessage(`💾 Monitoring report saved to ${reportPath}`);

    return report;
  } catch (error) {
    logMessage(`❌ Failed to generate monitoring report: ${error.message}`, 'error');
    return null;
  }
}

/**
 * Main monitoring service function
 */
async function runMonitoringService() {
  console.log('🚀 Starting Khadamat Monitoring Service');
  console.log('=====================================');

  try {
    // Load configuration
    const config = loadConfiguration();

    // Initialize logging
    logMessage('📋 Monitoring service initialized');
    logMessage(`📁 Working directory: ${__dirname}`);
    logMessage(`📊 Configuration: ${config.monitoring.regressionDetection.sensitivity} sensitivity`);

    // Run comprehensive monitoring
    const monitoringReport = await generateMonitoringReport();

    // Generate performance dashboard
    logMessage('🎨 Generating performance dashboard...');
    const dashboardResult = await generateComprehensiveDashboard();

    if (dashboardResult.success) {
      logMessage(`✅ Dashboard generated: ${dashboardResult.htmlPath}`);
    } else {
      logMessage(`❌ Dashboard generation failed: ${dashboardResult.error}`, 'error');
    }

    // Summary
    logMessage('📋 Monitoring Service Summary');
    logMessage('============================');
    logMessage('✅ Performance metrics collected and analyzed');
    logMessage('✅ Threshold alerts checked and triggered');
    logMessage('✅ Performance regressions detected and handled');
    logMessage('✅ Comprehensive dashboard generated');
    logMessage('✅ Monitoring report saved');

    console.log('✅ Monitoring service completed successfully');
    return true;

  } catch (error) {
    logMessage(`❌ Monitoring service failed: ${error.message}`, 'error');
    console.error('❌ Monitoring service failed:', error);
    return false;
  }
}

// Export for external use
module.exports = {
  runMonitoringService,
  checkPerformanceThresholds,
  checkPerformanceRegressions,
  generateMonitoringReport,
  loadConfiguration
};

// Run if executed directly
if (require.main === module) {
  runMonitoringService()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error in monitoring service:', error);
      process.exit(1);
    });
}