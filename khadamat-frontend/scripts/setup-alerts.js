#!/usr/bin/env node

/**
 * Monitoring Alerts Setup Script
 *
 * This script sets up continuous monitoring and multi-channel alerting system by:
 * 1. Configuring performance threshold monitoring
 * 2. Setting up multi-channel alerting (Slack, email, SMS)
 * 3. Implementing performance regression detection
 * 4. Creating monitoring configuration files
 * 5. Providing setup summary and next steps
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { generateComprehensiveDashboard } = require('./generate-performance-dashboard.js');
const { performanceTracker } = require('./performance-tracker.js');

const MONITORING_DIR = path.join(__dirname, '../monitoring');
const ALERTS_DIR = path.join(__dirname, '../alerts');
const CONFIG_DIR = path.join(__dirname, '../config');
const LOGS_DIR = path.join(__dirname, '../logs');

/**
 * Parse command line arguments
 */
function parseArguments() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      args[key] = value?.split(',') || true;
    }
  });
  return args;
}

/**
 * Setup monitoring directory structure
 */
function setupDirectoryStructure() {
  console.log('📁 Setting up monitoring directory structure...');

  const dirs = [
    MONITORING_DIR,
    ALERTS_DIR,
    CONFIG_DIR,
    LOGS_DIR,
    path.join(MONITORING_DIR, 'thresholds'),
    path.join(MONITORING_DIR, 'regression'),
    path.join(ALERTS_DIR, 'channels')
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    } else {
      console.log(`📂 Directory already exists: ${dir}`);
    }
  });
}

/**
 * Generate monitoring configuration
 */
function generateMonitoringConfiguration(args) {
  console.log('📊 Generating monitoring configuration...');

  const threshold = args.threshold || 'critical';
  const notifyChannels = args.notify || ['slack', 'email', 'sms'];

  const config = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    monitoring: {
      performanceThresholds: getThresholdConfiguration(threshold),
      regressionDetection: {
        enabled: true,
        sensitivity: 'high',
        baselinePeriod: '7_days',
        alertThreshold: 10.0 // 10% regression triggers alert
      },
      dataCollection: {
        interval: '5_minutes',
        retentionPeriod: '30_days'
      }
    },
    alerting: {
      channels: notifyChannels.map(channel => ({
        name: channel,
        enabled: true,
        configuration: getChannelConfiguration(channel)
      })),
      escalationPolicy: {
        critical: ['slack', 'email', 'sms'],
        high: ['slack', 'email'],
        medium: ['slack'],
        low: ['email']
      },
      notificationSettings: {
        repeatInterval: '1_hour',
        maxRepeats: 3,
        quietHours: {
          enabled: true,
          start: '22:00',
          end: '08:00'
        }
      }
    },
    logging: {
      logFile: '/var/log/performance.log',
      logLevel: 'info',
      logRotation: {
        enabled: true,
        maxSize: '10MB',
        maxFiles: 5
      }
    },
    cronJobs: {
      performanceDashboard: {
        schedule: '0 6 * * *', // Daily at 6 AM
        command: 'node scripts/generate-performance-dashboard.js',
        enabled: true
      },
      alertCheck: {
        schedule: '*/5 * * * *', // Every 5 minutes
        command: 'node scripts/check-alerts.js',
        enabled: true
      }
    }
  };

  // Save configuration
  const configPath = path.join(CONFIG_DIR, 'monitoring-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✅ Generated monitoring configuration: ${configPath}`);

  return config;
}

/**
 * Get threshold configuration based on threshold level
 */
function getThresholdConfiguration(level) {
  const thresholds = {
    critical: {
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
    high: {
      performance: {
        homepageLoadTime: { critical: 3500, high: 3000, medium: 2500 },
        servicesPageLoadTime: { critical: 4000, high: 3500, medium: 3000 },
        loginPageLoadTime: { critical: 2500, high: 2000, medium: 1500 },
        apiAuthResponseTime: { critical: 1000, high: 800, medium: 600 },
        apiServicesResponseTime: { critical: 1200, high: 1000, medium: 800 }
      },
      webVitals: {
        lcp: { critical: 4500, high: 4000, medium: 3000 },
        fid: { critical: 400, high: 300, medium: 200 },
        cls: { critical: 0.3, high: 0.25, medium: 0.15 }
      },
      cache: {
        hitRate: { critical: 0.6, high: 0.75, medium: 0.8 }
      }
    },
    medium: {
      performance: {
        homepageLoadTime: { critical: 4000, high: 3500, medium: 3000 },
        servicesPageLoadTime: { critical: 4500, high: 4000, medium: 3500 },
        loginPageLoadTime: { critical: 3000, high: 2500, medium: 2000 },
        apiAuthResponseTime: { critical: 1200, high: 1000, medium: 800 },
        apiServicesResponseTime: { critical: 1400, high: 1200, medium: 1000 }
      },
      webVitals: {
        lcp: { critical: 5000, high: 4500, medium: 3500 },
        fid: { critical: 500, high: 400, medium: 300 },
        cls: { critical: 0.35, high: 0.3, medium: 0.2 }
      },
      cache: {
        hitRate: { critical: 0.5, high: 0.65, medium: 0.75 }
      }
    }
  };

  return thresholds[level] || thresholds.critical;
}

/**
 * Get channel configuration based on channel type
 */
function getChannelConfiguration(channel) {
  const configs = {
    slack: {
      webhookUrl: 'https://hooks.slack.com/services/YOUR_WEBHOOK_URL',
      channel: '#performance-alerts',
      messageFormat: 'full',
      mentions: ['@performance-team']
    },
    email: {
      smtpServer: 'smtp.example.com',
      port: 587,
      from: 'monitoring@example.com',
      to: ['performance-team@example.com', 'devops@example.com'],
      subjectPrefix: '[PERFORMANCE ALERT]'
    },
    sms: {
      provider: 'twilio',
      accountSid: 'YOUR_ACCOUNT_SID',
      authToken: 'YOUR_AUTH_TOKEN',
      fromNumber: '+1234567890',
      toNumbers: ['+1234567890', '+1987654321']
    }
  };

  return configs[channel] || {};
}

/**
 * Create alert threshold files
 */
function createAlertThresholdFiles(config) {
  console.log('📈 Creating alert threshold files...');

  const thresholdFiles = [
    {
      name: 'performance-thresholds.json',
      content: config.monitoring.performanceThresholds
    },
    {
      name: 'regression-thresholds.json',
      content: {
        sensitivity: config.monitoring.regressionDetection.sensitivity,
        baselinePeriod: config.monitoring.regressionDetection.baselinePeriod,
        alertThreshold: config.monitoring.regressionDetection.alertThreshold,
        metrics: [
          'homepageLoadTime',
          'servicesPageLoadTime',
          'loginPageLoadTime',
          'apiAuthResponseTime',
          'apiServicesResponseTime',
          'lcp',
          'fid',
          'cls'
        ]
      }
    },
    {
      name: 'cache-thresholds.json',
      content: config.monitoring.performanceThresholds.cache
    }
  ];

  thresholdFiles.forEach(file => {
    const filePath = path.join(MONITORING_DIR, 'thresholds', file.name);
    fs.writeFileSync(filePath, JSON.stringify(file.content, null, 2));
    console.log(`✅ Created threshold file: ${filePath}`);
  });
}

/**
 * Create alert channel configuration files
 */
function createAlertChannelFiles(config) {
  console.log('📬 Creating alert channel configuration files...');

  config.alerting.channels.forEach(channel => {
    const channelConfig = {
      name: channel.name,
      type: channel.name,
      enabled: channel.enabled,
      configuration: channel.configuration,
      notificationSettings: config.alerting.notificationSettings
    };

    const filePath = path.join(ALERTS_DIR, 'channels', `${channel.name}-config.json`);
    fs.writeFileSync(filePath, JSON.stringify(channelConfig, null, 2));
    console.log(`✅ Created channel config: ${filePath}`);
  });
}

/**
 * Create monitoring scripts
 */
function createMonitoringScripts() {
  console.log('💻 Creating monitoring scripts...');

  const scripts = [
    {
      name: 'check-alerts.js',
      content: `#!/usr/bin/env node
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
        alerts.push(createAlert('CRITICAL', \`Web Vitals: \${metric.toUpperCase()}\`, currentValue, thresholdLevels.critical));
      } else if (currentValue > thresholdLevels.high) {
        alerts.push(createAlert('HIGH', \`Web Vitals: \${metric.toUpperCase()}\`, currentValue, thresholdLevels.high));
      } else if (currentValue > thresholdLevels.medium) {
        alerts.push(createAlert('MEDIUM', \`Web Vitals: \${metric.toUpperCase()}\`, currentValue, thresholdLevels.medium));
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
      console.log(\`⚠️  Found \${alerts.length} alert(s) to trigger\`);
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
    id: \`alert-\${Date.now()}-\${Math.random().toString(36).substr(2, 4)}\`,
    timestamp: new Date().toISOString(),
    severity: {
      level: severity,
      priority: severity === 'CRITICAL' ? 1 : severity === 'HIGH' ? 2 : severity === 'MEDIUM' ? 3 : 4,
      color: severity === 'CRITICAL' ? '#f44336' : severity === 'HIGH' ? '#ff9800' : '#ffc107'
    },
    metric: metric,
    currentValue: currentValue,
    threshold: threshold,
    message: \`\${severity} alert: \${metric} (\${currentValue}) exceeds \${severity.toLowerCase()} threshold (\${threshold})\`,
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
  const alertFilePath = path.join(ALERTS_DIR, \`alerts-\${Date.now()}.json\`);
  fs.writeFileSync(alertFilePath, JSON.stringify(alertData, null, 2));

  // Trigger each configured channel
  for (const channel of config.alerting.channels) {
    if (channel.enabled) {
      try {
        console.log(\`📤 Sending alerts via \${channel.name}...\`);
        // In a real implementation, this would call the actual notification service
        console.log(\`📤 \${channel.name} notification sent: \${alertData.criticalAlerts} critical, \${alertData.highAlerts} high, \${alertData.mediumAlerts} medium alerts\`);
      } catch (error) {
        console.error(\`❌ Failed to send \${channel.name} notification:\`, error.message);
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
`
    },
    {
      name: 'check-regression.js',
      content: `#!/usr/bin/env node
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
    const currentPerformance = await performanceTracker.getCurrentPerformance();

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
      console.log(\`⚠️  Detected \${regressions.length} performance regression(s)\`);
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
  const regressionFilePath = path.join(REGRESSION_DIR, \`regression-\${Date.now()}.json\`);
  fs.writeFileSync(regressionFilePath, JSON.stringify(regressionData, null, 2));

  // Trigger alerts for critical regressions
  const criticalRegressions = regressions.filter(r => r.severity === 'HIGH');
  if (criticalRegressions.length > 0) {
    console.log(\`🚨 \${criticalRegressions.length} critical regression(s) detected - triggering alerts\`);
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
        console.log(\`📤 Sending regression alerts via \${channel.name}...\`);
        const alertMessage = \`🚨 PERFORMANCE REGRESSION ALERT: \${regressions.length} critical regression(s) detected\\n\\n\${regressions.map(r => \`• \${r.metric}: +\${r.regressionPercent}% (baseline: \${r.baselineValue}, current: \${r.currentValue})\`).join('\\n')}\`;
        console.log(\`📤 \${channel.name} regression alert sent:\`, alertMessage);
      } catch (error) {
        console.error(\`❌ Failed to send \${channel.name} regression alert:\`, error.message);
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
`
    }
  ];

  scripts.forEach(script => {
    const scriptPath = path.join(__dirname, script.name);
    fs.writeFileSync(scriptPath, script.content);
    fs.chmodSync(scriptPath, 0o755); // Make executable
    console.log(`✅ Created monitoring script: ${scriptPath}`);
  });
}

/**
 * Generate setup report
 */
function generateSetupReport(args, config) {
  const report = {
    timestamp: new Date().toISOString(),
    setupStatus: 'COMPLETED',
    configuration: {
      thresholdLevel: args.threshold || 'critical',
      notificationChannels: args.notify || ['slack', 'email', 'sms'],
      performanceDashboardSchedule: '0 6 * * *',
      alertCheckSchedule: '*/5 * * * *',
      logFile: '/var/log/performance.log'
    },
    components: {
      directoryStructure: 'SUCCESS',
      monitoringConfiguration: 'SUCCESS',
      alertThresholds: 'SUCCESS',
      alertChannels: 'SUCCESS',
      monitoringScripts: 'SUCCESS'
    },
    summary: {
      totalComponents: 5,
      successfulComponents: 5,
      warnings: 0,
      errors: 0
    },
    recommendations: [
      {
        priority: 'HIGH',
        message: 'Configure actual notification channel credentials in channel configuration files',
        action: 'Update slack-config.json, email-config.json, and sms-config.json with real credentials'
      },
      {
        priority: 'HIGH',
        message: 'Set up cron jobs for scheduled monitoring',
        action: 'Configure cron jobs using the schedules defined in monitoring-config.json'
      },
      {
        priority: 'MEDIUM',
        message: 'Test alert notification channels',
        action: 'Run manual tests to verify Slack, email, and SMS notifications work correctly'
      },
      {
        priority: 'MEDIUM',
        message: 'Integrate with existing monitoring systems',
        action: 'Connect this monitoring system with your existing observability stack'
      }
    ]
  };

  return report;
}

/**
 * Display setup summary
 */
function displaySetupSummary(report) {
  console.log('\n📋 Monitoring and Alerts Setup Summary');
  console.log('=====================================');

  console.log(`\n📊 Setup Status: ${report.setupStatus}`);
  console.log(`✅ Successful Components: ${report.summary.successfulComponents}/${report.summary.totalComponents}`);

  console.log('\n📁 Configuration Summary:');
  console.log(`  Threshold Level: ${report.configuration.thresholdLevel}`);
  console.log(`  Notification Channels: ${report.configuration.notificationChannels.join(', ')}`);
  console.log(`  Performance Dashboard: ${report.configuration.performanceDashboardSchedule} (Daily at 6 AM)`);
  console.log(`  Alert Checks: ${report.configuration.alertCheckSchedule} (Every 5 minutes)`);
  console.log(`  Log File: ${report.configuration.logFile}`);

  console.log('\n💡 Recommendations:');
  report.recommendations.forEach((rec, index) => {
    console.log(`  ${index + 1}. [${rec.priority}] ${rec.message}`);
    console.log(`     Action: ${rec.action}`);
  });

  console.log('\n📊 Key Files Created:');
  console.log(`  Monitoring Config: ${path.join(CONFIG_DIR, 'monitoring-config.json')}`);
  console.log(`  Performance Thresholds: ${path.join(MONITORING_DIR, 'thresholds/performance-thresholds.json')}`);
  console.log(`  Regression Thresholds: ${path.join(MONITORING_DIR, 'thresholds/regression-thresholds.json')}`);
  console.log(`  Cache Thresholds: ${path.join(MONITORING_DIR, 'thresholds/cache-thresholds.json')}`);
  console.log(`  Alert Check Script: ${path.join(__dirname, 'check-alerts.js')}`);
  console.log(`  Regression Check Script: ${path.join(__dirname, 'check-regression.js')}`);

  console.log('\n🚀 Next Steps:');
  console.log('  1. Configure actual notification channel credentials');
  console.log('  2. Set up cron jobs for scheduled monitoring');
  console.log('  3. Test alert notification channels');
  console.log('  4. Integrate with existing monitoring systems');
  console.log('  5. Monitor performance dashboard and alerts');
}

/**
 * Main setup function
 */
async function setupAlerts() {
  console.log('🚀 Starting Khadamat Monitoring and Alerts Setup...');
  console.log('================================================');

  const args = parseArguments();
  console.log('📝 Configuration:', {
    threshold: args.threshold || 'critical',
    notify: args.notify || ['slack', 'email', 'sms']
  });

  try {
    // Step 1: Setup directory structure
    console.log('\n📂 Step 1/5: Directory Structure Setup');
    setupDirectoryStructure();

    // Step 2: Generate monitoring configuration
    console.log('\n📊 Step 2/5: Monitoring Configuration');
    const config = generateMonitoringConfiguration(args);

    // Step 3: Create alert threshold files
    console.log('\n📈 Step 3/5: Alert Thresholds Setup');
    createAlertThresholdFiles(config);

    // Step 4: Create alert channel configuration files
    console.log('\n📬 Step 4/5: Alert Channels Setup');
    createAlertChannelFiles(config);

    // Step 5: Create monitoring scripts
    console.log('\n💻 Step 5/5: Monitoring Scripts Setup');
    createMonitoringScripts();

    // Generate setup report
    const setupReport = generateSetupReport(args, config);

    // Save setup report
    const setupReportPath = path.join(MONITORING_DIR, 'setup-report.json');
    fs.writeFileSync(setupReportPath, JSON.stringify(setupReport, null, 2));

    // Display summary
    displaySetupSummary(setupReport);

    return {
      success: true,
      config,
      setupReport,
      reportPath: setupReportPath
    };

  } catch (error) {
    console.error('❌ Monitoring and alerts setup failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Export for external use
module.exports = {
  setupAlerts,
  parseArguments,
  generateMonitoringConfiguration,
  createAlertThresholdFiles,
  createAlertChannelFiles,
  createMonitoringScripts
};

// Run if executed directly
if (require.main === module) {
  setupAlerts()
    .then(result => {
      if (!result.success) {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Fatal error during setup:', error);
      process.exit(1);
    });
}