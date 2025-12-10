#!/usr/bin/env node
/**
 * Comprehensive Performance Dashboard Generator
 *
 * Unified monitoring system that integrates:
 * - Performance tracking
 * - Cache effectiveness validation
 * - Flaky test detection
 * - Real-time monitoring
 * - Historical trend analysis
 * - Alerting system
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { generatePerformanceReport } = require('./performance-tracker.js');
const { validateCacheEffectiveness } = require('./validate-cache-effectiveness.js');
const FlakyDetectionValidator = require('./validate-flaky-detection.js');
const DASHBOARD_DIR = path.join(__dirname, '../dashboard');
const DASHBOARD_HTML = path.join(DASHBOARD_DIR, 'comprehensive-dashboard.html');
const DASHBOARD_DATA = path.join(DASHBOARD_DIR, 'dashboard-data.json');
const DASHBOARD_ASSETS = path.join(DASHBOARD_DIR, 'assets');
const ALERT_THRESHOLDS = {
  CRITICAL: 0.7,
  HIGH: 0.8,
  MEDIUM: 0.85,
  LOW: 0.9
};
const ALERT_SEVERITY_LEVELS = {
  CRITICAL: { color: '#f44336', icon: '🔴', priority: 1 },
  HIGH: { color: '#ff9800', icon: '🟠', priority: 2 },
  MEDIUM: { color: '#ffc107', icon: '🟡', priority: 3 },
  LOW: { color: '#4caf50', icon: '🟢', priority: 4 }
};
/**
 * Initialize dashboard directory
 */
function initializeDashboard() {
  if (!fs.existsSync(DASHBOARD_DIR)) {
    fs.mkdirSync(DASHBOARD_DIR, { recursive: true });
  }
  if (!fs.existsSync(DASHBOARD_ASSETS)) {
    fs.mkdirSync(DASHBOARD_ASSETS, { recursive: true });
  }
}
/**
 * Collect all monitoring data
 */
async function collectMonitoringData() {
  console.log('📊 Collecting comprehensive monitoring data...');
  // Collect performance metrics
  const performanceData = generatePerformanceReport();
  console.log('✅ Performance metrics collected');
  // Validate cache effectiveness
  const cacheValidation = validateCacheEffectiveness();
  console.log('✅ Cache effectiveness validated');
  // Run flaky test detection validation
  const flakyValidator = new FlakyDetectionValidator();
  const flakyMetadataPath = path.join(__dirname, '../tests/flaky-validation/flaky-test-metadata.json');
  const flakyReportPath = path.join(__dirname, '../playwright-results.json');
  let flakyValidation = { status: 'N/A', accuracy: 'N/A', recommendations: [] };
  if (fs.existsSync(flakyMetadataPath) && fs.existsSync(flakyReportPath)) {
    try {
      const success = flakyValidator.runComprehensiveValidation(
        flakyMetadataPath,
        flakyReportPath,
        path.join(__dirname, '../validation-reports')
      );
      if (success) {
        const validationReportPath = path.join(__dirname, '../validation-reports/flaky-detection-validation-report.json');
        if (fs.existsSync(validationReportPath)) {
          const report = JSON.parse(fs.readFileSync(validationReportPath, 'utf8'));
          flakyValidation = {
            status: report.validationStatus,
            accuracy: report.accuracyMetrics.accuracy,
            precision: report.accuracyMetrics.precision,
            recall: report.accuracyMetrics.recall,
            recommendations: report.recommendations
          };
        }
      }
    } catch (error) {
      console.log('⚠️ Flaky detection validation not available:', error.message);
    }
  }
  // Collect real-time system metrics
  const systemMetrics = collectSystemMetrics();
  return {
    timestamp: new Date().toISOString(),
    performance: performanceData,
    cache: cacheValidation,
    flakyDetection: flakyValidation,
    system: systemMetrics,
    alerts: generateAlerts(performanceData, cacheValidation, flakyValidation)
  };
}
/**
 * Collect real-time system metrics
 */
function collectSystemMetrics() {
  return {
    timestamp: new Date().toISOString(),
    cpuUsage: process.cpuUsage(),
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch
  };
}
/**
 * Generate alerts based on monitoring data
 */
function generateAlerts(performanceData, cacheValidation, flakyValidation) {
  const alerts = [];
  // Performance budget alerts
  const compliance = performanceData.compliance;
  if (compliance.overallScore < ALERT_THRESHOLDS.CRITICAL) {
    alerts.push(createAlert(
      'CRITICAL',
      'Performance Budget Compliance Critical',
      `Only ${(compliance.overallScore * 100).toFixed(1)}% of performance budgets are met. Immediate action required.`,
      'performance'
    ));
  } else if (compliance.overallScore < ALERT_THRESHOLDS.HIGH) {
    alerts.push(createAlert(
      'HIGH',
      'Performance Budget Compliance Warning',
      `Only ${(compliance.overallScore * 100).toFixed(1)}% of performance budgets are met. Review required.`,
      'performance'
    ));
  }
  // Cache effectiveness alerts
  if (cacheValidation.validationStatus === 'NEEDS_OPTIMIZATION') {
    alerts.push(createAlert(
      'CRITICAL',
      'Cache System Needs Optimization',
      `Cache effectiveness rated as ${cacheValidation.validationStatus}. Immediate review required.`,
      'cache'
    ));
  } else if (cacheValidation.validationStatus === 'VALIDATED_POOR') {
    alerts.push(createAlert(
      'HIGH',
      'Cache Performance Below Expectations',
      `Cache effectiveness rated as ${cacheValidation.validationStatus}. Review recommended.`,
      'cache'
    ));
  }
  // Flaky detection alerts
  if (flakyValidation.status === 'VALIDATED_POOR') {
    alerts.push(createAlert(
      'HIGH',
      'Flaky Test Detection Performance Poor',
      `Flaky detection accuracy is ${flakyValidation.accuracy}. Review detection algorithms.`,
      'flaky'
    ));
  }
  // Add performance regression alerts
  if (performanceData.trends) {
    const regressedMetrics = Object.entries(performanceData.trends)
      .filter(([key, value]) => value?.trend === 'regressed' && key !== 'timestamp' && key !== 'analysisPeriod');
    regressedMetrics.forEach(([metric, data]) => {
      const regressionPercent = Math.abs(data.improvement);
      if (regressionPercent > 10) {
        alerts.push(createAlert(
          regressionPercent > 20 ? 'HIGH' : 'MEDIUM',
          `${metric} Performance Regression`,
          `${metric} performance has regressed by ${regressionPercent.toFixed(2)}% (from ${data.firstValue}ms to ${data.lastValue}ms).`,
          'performance'
        ));
      }
    });
  }
  return alerts.sort((a, b) => a.severity.priority - b.severity.priority);
}
/**
 * Create alert object
 */
function createAlert(severity, title, message, category) {
  return {
    severity: ALERT_SEVERITY_LEVELS[severity],
    title,
    message,
    category,
    timestamp: new Date().toISOString(),
    acknowledged: false
  };
}
/**
 * Generate HTML dashboard
 */
async function generateHTMLDashboard(data) {
  console.log('🎨 Generating HTML dashboard...');
  // Generate chart images
  const chartImages = await generateChartImages(data);
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Khadamat Comprehensive Monitoring Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1600px;
      margin: 0 auto;
    }
    header {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 30px;
      text-align: center;
    }
    h1 {
      color: #667eea;
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    .subtitle {
      color: #666;
      font-size: 1.1em;
    }
    .alerts-section {
      background: white;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 30px;
    }
    .alert-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .alert {
      background: white;
      border-left: 4px solid #667eea;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      transition: all 0.3s;
    }
    .alert:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    }
    .alert-critical {
      border-left-color: #f44336;
      background: #fff0f0;
    }
    .alert-high {
      border-left-color: #ff9800;
      background: #fff8e1;
    }
    .alert-medium {
      border-left-color: #ffc107;
      background: #fffde7;
    }
    .alert-low {
      border-left-color: #4caf50;
      background: #f1f8e9;
    }
    .alert-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .alert-title {
      font-weight: bold;
      font-size: 1.1em;
    }
    .alert-severity {
      font-weight: bold;
      padding: 3px 8px;
      border-radius: 3px;
      font-size: 0.85em;
    }
    .alert-message {
      color: #666;
      margin-top: 8px;
      font-size: 0.95em;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .stat-card:hover {
      transform: translateY(-5px);
    }
    .stat-value {
      font-size: 2.5em;
      font-weight: bold;
      color: #667eea;
      margin: 10px 0;
    }
    .stat-label {
      color: #666;
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .stat-trend {
      font-size: 0.85em;
      margin-top: 10px;
      padding: 5px 10px;
      border-radius: 5px;
      display: inline-block;
    }
    .trend-up {
      background: #e3f2fd;
      color: #1976d2;
    }
    .trend-down {
      background: #ffebee;
      color: #c62828;
    }
    .charts-section {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 1.8em;
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #667eea;
    }
    .chart-container {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .chart-title {
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
      font-size: 1.1em;
    }
    .chart-image {
      width: 100%;
      height: auto;
      border-radius: 5px;
      margin-top: 10px;
    }
    .performance-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .performance-table th,
    .performance-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .performance-table th {
      background: #667eea;
      color: white;
      font-weight: bold;
    }
    .performance-table tr:hover {
      background: #f5f5f5;
    }
    .compliance-badge {
      padding: 5px 10px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 0.85em;
    }
    .compliance-pass {
      background: #e8f5e9;
      color: #2e7d32;
    }
    .compliance-fail {
      background: #ffebee;
      color: #c62828;
    }
    .recommendations {
      background: #fff3e0;
      padding: 20px;
      border-radius: 10px;
      border-left: 4px solid #ff9800;
    }
    .recommendation-item {
      margin-bottom: 15px;
      padding: 10px;
      background: white;
      border-radius: 5px;
    }
    .priority-high {
      border-left: 3px solid #f44336;
    }
    .priority-medium {
      border-left: 3px solid #ff9800;
    }
    .priority-low {
      border-left: 3px solid #4caf50;
    }
    .dashboard-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .metric-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 3px 8px rgba(0,0,0,0.1);
    }
    .metric-title {
      font-weight: bold;
      color: #667eea;
      margin-bottom: 10px;
      font-size: 1.1em;
    }
    .metric-value {
      font-size: 1.8em;
      font-weight: bold;
      color: #333;
    }
    .metric-detail {
      color: #666;
      font-size: 0.9em;
      margin-top: 5px;
    }
    footer {
      text-align: center;
      margin-top: 30px;
      color: white;
      padding: 20px;
    }
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      h1 {
        font-size: 1.8em;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🚀 Khadamat Comprehensive Monitoring Dashboard</h1>
      <p class="subtitle">Unified real-time monitoring, historical trends, and alerting system</p>
      <p style="color: #999; font-size: 0.9em; margin-top: 10px;">
        Last Updated: ${new Date().toLocaleString()}
      </p>
    </header>
    <!-- Active Alerts Section -->
    <div class="alerts-section">
      <div class="alert-header">
        <h2 class="section-title">🚨 Active Alerts (${data.alerts.length})</h2>
        <span style="color: #666; font-size: 0.9em;">
          ${data.alerts.length > 0 ? `${data.alerts.filter(a => a.severity.priority <= 2).length} critical/high` : 'No active alerts'}
        </span>
      </div>
      ${data.alerts.length > 0 ? data.alerts.map(alert => `
        <div class="alert alert-${alert.severity.priority === 1 ? 'critical' :
                   alert.severity.priority === 2 ? 'high' :
                   alert.severity.priority === 3 ? 'medium' : 'low'}">
          <div class="alert-header">
            <div class="alert-title">
              <span style="color: ${alert.severity.color}; font-size: 1.2em;">${alert.severity.icon}</span>
              ${alert.title}
            </div>
            <span class="alert-severity" style="background: ${alert.severity.color}; color: white;">
              ${alert.severity.priority === 1 ? 'CRITICAL' :
                alert.severity.priority === 2 ? 'HIGH' :
                alert.severity.priority === 3 ? 'MEDIUM' : 'LOW'}
            </span>
          </div>
          <div class="alert-message">${alert.message}</div>
          <div style="color: #999; font-size: 0.8em; margin-top: 8px;">
            Category: ${alert.category.toUpperCase()} | ${new Date(alert.timestamp).toLocaleTimeString()}
          </div>
        </div>
      `).join('') : '<p style="text-align: center; color: #4caf50; font-weight: bold;">✅ All systems operating normally</p>'}
    </div>
    <!-- Key Metrics Dashboard -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Overall Compliance</div>
        <div class="stat-value">${(data.performance.compliance.overallScore * 100).toFixed(1)}%</div>
        <div class="stat-trend ${data.performance.compliance.overallScore >= 0.9 ? 'trend-up' : 'trend-down'}>
          ${data.performance.compliance.overallScore >= 0.9 ? 'Excellent' : 'Needs Attention'}
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Cache Effectiveness</div>
        <div class="stat-value">${data.cache.validationSummary ? data.cache.validationSummary.cacheEffectiveness : 'N/A'}</div>
        <div class="stat-trend ${data.cache.validationStatus === 'VALIDATED_GOOD' || data.cache.validationStatus === 'VALIDATED_EXCELLENT' ? 'trend-up' : 'trend-down'}>
          ${data.cache.validationStatus || 'N/A'}
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Flaky Detection Accuracy</div>
        <div class="stat-value">${data.flakyDetection.accuracy}</div>
        <div class="stat-trend ${data.flakyDetection.status === 'VALIDATED_GOOD' || data.flakyDetection.status === 'VALIDATED_EXCELLENT' ? 'trend-up' : 'trend-down'}>
          ${data.flakyDetection.status || 'N/A'}
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Active Alerts</div>
        <div class="stat-value">${data.alerts.length}</div>
        <div class="stat-trend ${data.alerts.filter(a => a.severity.priority <= 2).length > 0 ? 'trend-down' : 'trend-up'}>
          ${data.alerts.filter(a => a.severity.priority <= 2).length} Critical/High
        </div>
      </div>
    </div>
    <!-- Performance Metrics Section -->
    <div class="charts-section">
      <h2 class="section-title">📈 Performance Metrics</h2>
      <div class="chart-container">
        <h3 class="chart-title">Page Load Time Trends</h3>
        <img src="assets/load-time-chart.png" alt="Load Time Chart" class="chart-image">
      </div>
      <div class="chart-container">
        <h3 class="chart-title">API Response Time Trends</h3>
        <img src="assets/api-time-chart.png" alt="API Time Chart" class="chart-image">
      </div>
      <div class="chart-container">
        <h3 class="chart-title">Cache Effectiveness Over Time</h3>
        <img src="assets/cache-chart.png" alt="Cache Chart" class="chart-image">
      </div>
    </div>
    <!-- Detailed Performance Table -->
    <div class="charts-section">
      <h2 class="section-title">📊 Detailed Performance Metrics</h2>
      <table class="performance-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Current Value</th>
            <th>Budget</th>
            <th>Compliance</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Homepage Load Time</td>
            <td>${data.performance.currentMetrics.performanceTests.homepageLoadTime}ms</td>
            <td>${data.performance.currentMetrics.budgets.webVitals.lcp}ms</td>
            <td><span class="compliance-badge compliance-${data.performance.compliance.homepage ? 'pass' : 'fail'}">
              ${data.performance.compliance.homepage ? 'PASS' : 'FAIL'}
            </span></td>
            <td>${data.performance.trends?.homepageLoadTime?.trend === 'improved' ? '↑ Improved' : '↓ Regressed'}</td>
          </tr>
          <tr>
            <td>Services Page Load Time</td>
            <td>${data.performance.currentMetrics.performanceTests.servicesPageLoadTime}ms</td>
            <td>4000ms</td>
            <td><span class="compliance-badge compliance-${data.performance.compliance.servicesPage ? 'pass' : 'fail'}">
              ${data.performance.compliance.servicesPage ? 'PASS' : 'FAIL'}
            </span></td>
            <td>${data.performance.trends?.servicesPageLoadTime?.trend === 'improved' ? '↑ Improved' : '↓ Regressed'}</td>
          </tr>
          <tr>
            <td>Login Page Load Time</td>
            <td>${data.performance.currentMetrics.performanceTests.loginPageLoadTime}ms</td>
            <td>2500ms</td>
            <td><span class="compliance-badge compliance-${data.performance.compliance.loginPage ? 'pass' : 'fail'}">
              ${data.performance.compliance.loginPage ? 'PASS' : 'FAIL'}
            </span></td>
            <td>${data.performance.trends?.loginPageLoadTime?.trend === 'improved' ? '↑ Improved' : '↓ Regressed'}</td>
          </tr>
          <tr>
            <td>API Auth Response Time</td>
            <td>${data.performance.currentMetrics.performanceTests.apiAuthResponseTime}ms</td>
            <td>${data.performance.currentMetrics.budgets.apiResponse.auth}ms</td>
            <td><span class="compliance-badge compliance-${data.performance.compliance.apiAuth ? 'pass' : 'fail'}">
              ${data.performance.compliance.apiAuth ? 'PASS' : 'FAIL'}
            </span></td>
            <td>${data.performance.trends?.apiAuthResponseTime?.trend === 'improved' ? '↑ Improved' : '↓ Regressed'}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Cache Validation Results -->
    <div class="charts-section">
      <h2 class="section-title">🔍 Cache Validation Results</h2>
      <div class="chart-container">
        <h3 class="chart-title">Cache Effectiveness Summary</h3>
        <table class="performance-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Validation Status</td>
              <td>${data.cache.validationStatus || 'N/A'}</td>
              <td><span class="compliance-badge compliance-${data.cache.validationStatus === 'VALIDATED_GOOD' || data.cache.validationStatus === 'VALIDATED_EXCELLENT' ? 'pass' : 'fail'}>
                ${data.cache.validationStatus ? data.cache.validationStatus.split('_')[1] : 'N/A'}
              </span></td>
              <td>${data.cache.validationSummary?.message || 'Cache system validation'}</td>
            </tr>
            <tr>
              <td>Cache Hit Rate</td>
              <td>${data.cache.cacheMetrics?.overallCacheHitRate || 'N/A'}</td>
              <td><span class="compliance-badge compliance-pass">Optimal</span></td>
              <td>Overall cache effectiveness</td>
            </tr>
            <tr>
              <td>Time Savings</td>
              <td>${data.cache.cacheMetrics?.timeSavedSeconds || 'N/A'} seconds/run</td>
              <td><span class="compliance-badge compliance-pass">Active</span></td>
              <td>Time saved per CI run</td>
            </tr>
            <tr>
              <td>Annual Cost Savings</td>
              <td>${data.cache.cacheMetrics?.estimatedAnnualSavings || 'N/A'}</td>
              <td><span class="compliance-badge compliance-pass">Active</span></td>
              <td>Estimated annual savings from caching</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Flaky Test Detection Results -->
    <div class="charts-section">
      <h2 class="section-title">🎯 Flaky Test Detection</h2>
      <div class="chart-container">
        <h3 class="chart-title">Detection Accuracy Metrics</h3>
        <table class="performance-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Validation Status</td>
              <td>${data.flakyDetection.status || 'N/A'}</td>
              <td><span class="compliance-badge compliance-${data.flakyDetection.status === 'VALIDATED_GOOD' || data.flakyDetection.status === 'VALIDATED_EXCELLENT' ? 'pass' : 'fail'}>
                ${data.flakyDetection.status ? data.flakyDetection.status.split('_')[1] : 'N/A'}
              </span></td>
            </tr>
            <tr>
              <td>Accuracy</td>
              <td>${data.flakyDetection.accuracy}</td>
              <td><span class="compliance-badge compliance-${parseFloat(data.flakyDetection.accuracy) >= 85 ? 'pass' : 'fail'}>
                ${parseFloat(data.flakyDetection.accuracy) >= 85 ? 'GOOD' : 'NEEDS IMPROVEMENT'}
              </span></td>
            </tr>
            <tr>
              <td>Precision</td>
              <td>${data.flakyDetection.precision || 'N/A'}</td>
              <td><span class="compliance-badge compliance-${parseFloat(data.flakyDetection.precision) >= 80 ? 'pass' : 'fail'}>
                ${parseFloat(data.flakyDetection.precision) >= 80 ? 'GOOD' : 'NEEDS IMPROVEMENT'}
              </span></td>
            </tr>
            <tr>
              <td>Recall</td>
              <td>${data.flakyDetection.recall || 'N/A'}</td>
              <td><span class="compliance-badge compliance-${parseFloat(data.flakyDetection.recall) >= 75 ? 'pass' : 'fail'}>
                ${parseFloat(data.flakyDetection.recall) >= 75 ? 'GOOD' : 'NEEDS IMPROVEMENT'}
              </span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Performance Recommendations -->
    <div class="charts-section">
      <h2 class="section-title">💡 Performance Recommendations</h2>
      <div class="recommendations">
        ${data.performance.recommendations.map((rec, index) => `
          <div class="recommendation-item priority-${rec.priority.toLowerCase()}">
            <strong>${index + 1}. [${rec.priority.toUpperCase()}] ${rec.message}</strong>
            <div style="color: #666; font-size: 0.9em; margin-top: 5px;">${rec.impact}</div>
          </div>
        `).join('')}
        ${data.cache.recommendations?.map((rec, index) => `
          <div class="recommendation-item priority-${rec.priority.toLowerCase()}">
            <strong>${data.performance.recommendations.length + index + 1}. [${rec.priority}] ${rec.message}</strong>
            <div style="color: #666; font-size: 0.9em; margin-top: 5px;">${rec.action}</div>
            <div style="color: #666; font-size: 0.8em; margin-top: 3px;">Impact: ${rec.impact}</div>
          </div>
        `).join('') || ''}
        ${data.flakyDetection.recommendations?.map((rec, index) => `
          <div class="recommendation-item priority-medium">
            <strong>${data.performance.recommendations.length + (data.cache.recommendations?.length || 0) + index + 1}. ${rec}</strong>
          </div>
        `).join('') || ''}
      </div>
    </div>
    <!-- System Metrics -->
    <div class="charts-section">
      <h2 class="section-title">💻 System Metrics</h2>
      <div class="dashboard-metrics">
        <div class="metric-card">
          <div class="metric-title">Node Version</div>
          <div class="metric-value">${data.system.nodeVersion}</div>
          <div class="metric-detail">Runtime environment</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Platform</div>
          <div class="metric-value">${data.system.platform}</div>
          <div class="metric-detail">Operating system</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Uptime</div>
          <div class="metric-value">${data.system.uptime.toFixed(1)}s</div>
          <div class="metric-detail">Process uptime</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Memory Usage</div>
          <div class="metric-value">${(data.system.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB</div>
          <div class="metric-detail">Heap memory used</div>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <p>🚀 Comprehensive Monitoring Dashboard | Generated: ${new Date().toLocaleString()}</p>
    <p style="font-size: 0.8em; margin-top: 5px; color: #ddd;">
      Unified monitoring system with real-time data, historical trends, and alerting
    </p>
  </footer>
</body>
</html>
  `;
  return htmlContent;
}
/**
 * Generate chart images using Chart.js
 */
async function generateChartImages(data) {
  const width = 800;
  const height = 400;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
  // Generate load time chart
  const loadTimeChart = {
    type: 'line',
    data: {
      labels: (data.performance.currentMetrics.metrics || []).map((_, index) => `Run ${index + 1}`),
      datasets: [
        {
          label: 'Homepage',
          data: (data.performance.currentMetrics.metrics || []).map(m => m.performanceTests?.homepageLoadTime || 0),
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4
        },
        {
          label: 'Services Page',
          data: (data.performance.currentMetrics.metrics || []).map(m => m.performanceTests?.servicesPageLoadTime || 0),
          borderColor: '#764ba2',
          backgroundColor: 'rgba(118, 75, 162, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Page Load Time Trends (ms)' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  };
  // Generate API time chart
  const apiTimeChart = {
    type: 'line',
    data: {
      labels: (data.performance.currentMetrics.metrics || []).map((_, index) => `Run ${index + 1}`),
      datasets: [
        {
          label: 'Auth API',
          data: (data.performance.currentMetrics.metrics || []).map(m => m.performanceTests?.apiAuthResponseTime || 0),
          borderColor: '#f093fb',
          backgroundColor: 'rgba(240, 147, 251, 0.1)',
          tension: 0.4
        },
        {
          label: 'Services API',
          data: (data.performance.currentMetrics.metrics || []).map(m => m.performanceTests?.apiServicesResponseTime || 0),
          borderColor: '#4facfe',
          backgroundColor: 'rgba(79, 172, 254, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'API Response Time Trends (ms)' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  };
  // Generate cache chart
  const cacheChart = {
    type: 'bar',
    data: {
      labels: ['Cache Hit Rate', 'Time Savings', 'Cost Savings'],
      datasets: [
        {
          label: 'Cache Effectiveness',
          data: [
            data.cache.cacheMetrics?.overallCacheHitRate || 0,
            data.cache.cacheMetrics?.timeSavedSeconds || 0,
            data.cache.cacheMetrics?.estimatedAnnualSavings || 0
          ],
          backgroundColor: [
            'rgba(102, 126, 234, 0.7)',
            'rgba(79, 172, 254, 0.7)',
            'rgba(76, 175, 80, 0.7)'
          ],
          borderColor: [
            '#667eea',
            '#4facfe',
            '#4caf50'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Cache Effectiveness Metrics' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  };
  // Generate chart images and save them
  const loadTimeImage = await chartJSNodeCanvas.renderToBuffer(loadTimeChart);
  const apiTimeImage = await chartJSNodeCanvas.renderToBuffer(apiTimeChart);
  const cacheImage = await chartJSNodeCanvas.renderToBuffer(cacheChart);
  // Save images to assets directory
  fs.writeFileSync(path.join(DASHBOARD_ASSETS, 'load-time-chart.png'), loadTimeImage);
  fs.writeFileSync(path.join(DASHBOARD_ASSETS, 'api-time-chart.png'), apiTimeImage);
  fs.writeFileSync(path.join(DASHBOARD_ASSETS, 'cache-chart.png'), cacheImage);
  return {
    loadTimeChart: 'assets/load-time-chart.png',
    apiTimeChart: 'assets/api-time-chart.png',
    cacheChart: 'assets/cache-chart.png'
  };
}
/**
 * Main function to generate comprehensive dashboard
 */
async function generateComprehensiveDashboard() {
  try {
    console.log('🚀 Starting comprehensive dashboard generation...');
    // Initialize dashboard directory
    initializeDashboard();
    // Collect all monitoring data
    const monitoringData = await collectMonitoringData();
    // Save raw data for reference
    fs.writeFileSync(DASHBOARD_DATA, JSON.stringify(monitoringData, null, 2));
    console.log('💾 Monitoring data saved to dashboard-data.json');
    // Generate HTML dashboard
    const htmlDashboard = await generateHTMLDashboard(monitoringData);
    // Write HTML file
    fs.writeFileSync(DASHBOARD_HTML, htmlDashboard);
    console.log('📄 HTML dashboard generated successfully');
    console.log('✅ Comprehensive dashboard generation completed!');
    console.log(`📊 Dashboard available at: ${DASHBOARD_HTML}`);
    console.log(`📈 Data available at: ${DASHBOARD_DATA}`);
    return {
      htmlPath: DASHBOARD_HTML,
      dataPath: DASHBOARD_DATA,
      success: true
    };
  } catch (error) {
    console.error('❌ Error generating comprehensive dashboard:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
/**
 * Export the main function for external use
 */
module.exports = {
  generateComprehensiveDashboard,
  collectMonitoringData,
  generateHTMLDashboard,
  generateChartImages
};
// Run if executed directly
if (require.main === module) {
  generateComprehensiveDashboard().catch(console.error);
}
