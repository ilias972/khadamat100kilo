#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Flaky Test Detection Validation System
 * Measures accuracy, precision, recall, and other metrics for flaky detection
 */
class FlakyDetectionValidator {
  constructor() {
    this.knownFlakyTests = [];
    this.detectedFlakyTests = [];
    this.truePositives = 0;
    this.falsePositives = 0;
    this.falseNegatives = 0;
    this.testResults = [];
  }

  /**
   * Load known flaky test metadata
   */
  loadKnownFlakyTests(metadataPath) {
    try {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      this.knownFlakyTests = metadata.flakyTestTypes.map(test => ({
        type: test.type,
        expectedFailureRate: parseFloat(test.expectedFailureRate) / 100,
        description: test.description
      }));

      console.log(`📊 Loaded ${this.knownFlakyTests.length} known flaky test types`);
      return true;
    } catch (error) {
      console.error('❌ Error loading flaky test metadata:', error.message);
      return false;
    }
  }

  /**
   * Run flaky test detection and capture results
   */
  runDetection(reportPath) {
    try {
      console.log('🔍 Running flaky test detection in validation mode...');

      // Run the enhanced detection script in validation mode
      const result = execSync(`node analyze-flakes.js ${reportPath} --validation-mode`, {
        cwd: __dirname,
        encoding: 'utf8'
      });

      console.log('✅ Detection completed successfully');
      console.log(result);

      // Parse the validation report
      const validationReportPath = path.join(path.dirname(reportPath), 'flaky-validation-report.json');
      if (fs.existsSync(validationReportPath)) {
        const validationReport = JSON.parse(fs.readFileSync(validationReportPath, 'utf8'));
        this.detectedFlakyTests = validationReport.detectionMetrics.flakyTestCount;
        this.truePositives = validationReport.truePositives;
        this.falsePositives = validationReport.falsePositives;
        this.falseNegatives = validationReport.falseNegatives;

        console.log(`📈 Detection Results: ${this.detectedFlakyTests} flaky tests detected`);
        console.log(`✅ True Positives: ${this.truePositives}`);
        console.log(`❌ False Positives: ${this.falsePositives}`);
        console.log(`❌ False Negatives: ${this.falseNegatives}`);
      }

      return true;
    } catch (error) {
      console.error('❌ Error running flaky test detection:', error.message);
      return false;
    }
  }

  /**
   * Calculate accuracy metrics
   */
  calculateMetrics() {
    const precision = this.truePositives / (this.truePositives + this.falsePositives) || 0;
    const recall = this.truePositives / (this.truePositives + this.falseNegatives) || 0;
    const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
    const accuracy = this.truePositives / (this.truePositives + this.falsePositives + this.falseNegatives) || 0;

    return {
      precision: precision * 100,
      recall: recall * 100,
      f1Score: f1Score * 100,
      accuracy: accuracy * 100,
      truePositiveRate: this.truePositives / this.knownFlakyTests.length || 0,
      falsePositiveRate: this.falsePositives / (this.truePositives + this.falsePositives) || 0,
      falseNegativeRate: this.falseNegatives / this.knownFlakyTests.length || 0
    };
  }

  /**
   * Generate comprehensive validation report
   */
  generateValidationReport(outputPath) {
    const metrics = this.calculateMetrics();

    const report = {
      validationTimestamp: new Date().toISOString(),
      knownFlakyTests: this.knownFlakyTests.length,
      detectedFlakyTests: this.detectedFlakyTests,
      accuracyMetrics: {
        precision: metrics.precision.toFixed(2) + '%',
        recall: metrics.recall.toFixed(2) + '%',
        f1Score: metrics.f1Score.toFixed(2) + '%',
        accuracy: metrics.accuracy.toFixed(2) + '%',
        truePositiveRate: (metrics.truePositiveRate * 100).toFixed(2) + '%',
        falsePositiveRate: (metrics.falsePositiveRate * 100).toFixed(2) + '%',
        falseNegativeRate: (metrics.falseNegativeRate * 100).toFixed(2) + '%'
      },
      detectionPerformance: {
        truePositives: this.truePositives,
        falsePositives: this.falsePositives,
        falseNegatives: this.falseNegatives,
        detectionRate: ((this.detectedFlakyTests / this.knownFlakyTests.length) * 100).toFixed(2) + '%'
      },
      recommendations: this.generateRecommendations(metrics),
      validationStatus: this.determineValidationStatus(metrics)
    };

    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`💾 Validation report saved to: ${outputPath}`);

    return report;
  }

  /**
   * Generate actionable recommendations based on metrics
   */
  generateRecommendations(metrics) {
    const recommendations = [];

    if (metrics.accuracy < 70) {
      recommendations.push(
        `🔴 CRITICAL: Detection accuracy (${metrics.accuracy.toFixed(2)}%) is below acceptable threshold. ` +
        'Immediate review and algorithm improvement required.'
      );
    } else if (metrics.accuracy < 85) {
      recommendations.push(
        `🟡 HIGH: Detection accuracy (${metrics.accuracy.toFixed(2)}%) needs improvement. ` +
        'Consider refining detection algorithms and adding more validation scenarios.'
      );
    } else {
      recommendations.push(
        `✅ GOOD: Detection accuracy (${metrics.accuracy.toFixed(2)}%) is acceptable. ` +
        'Continue monitoring and maintain current approach.'
      );
    }

    if (metrics.falsePositiveRate > 0.2) {
      recommendations.push(
        `⚠️ HIGH FALSE POSITIVE RATE: ${(metrics.falsePositiveRate * 100).toFixed(2)}%. ` +
        'Review detection criteria to reduce false alarms.'
      );
    }

    if (metrics.falseNegativeRate > 0.3) {
      recommendations.push(
        `🔍 HIGH FALSE NEGATIVE RATE: ${(metrics.falseNegativeRate * 100).toFixed(2)}%. ` +
        'Detection is missing real flaky tests. Expand detection patterns.'
      );
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Flaky test detection is performing well. No immediate action required.');
    }

    return recommendations;
  }

  /**
   * Determine overall validation status
   */
  determineValidationStatus(metrics) {
    if (metrics.accuracy >= 85) {
      return 'VALIDATED_EXCELLENT';
    } else if (metrics.accuracy >= 70) {
      return 'VALIDATED_GOOD';
    } else if (metrics.accuracy >= 50) {
      return 'VALIDATED_FAIR';
    } else {
      return 'VALIDATED_POOR';
    }
  }

  /**
   * Run comprehensive validation workflow
   */
  runComprehensiveValidation(metadataPath, reportPath, outputDir) {
    console.log('🚀 Starting comprehensive flaky detection validation...');

    // Step 1: Load known flaky test metadata
    if (!this.loadKnownFlakyTests(metadataPath)) {
      console.error('❌ Validation aborted: Could not load flaky test metadata');
      return false;
    }

    // Step 2: Run flaky test detection
    if (!this.runDetection(reportPath)) {
      console.error('❌ Validation aborted: Detection failed');
      return false;
    }

    // Step 3: Calculate metrics
    const metrics = this.calculateMetrics();
    console.log('📊 Validation Metrics:');
    console.log(`  Precision: ${metrics.precision.toFixed(2)}%`);
    console.log(`  Recall: ${metrics.recall.toFixed(2)}%`);
    console.log(`  F1 Score: ${metrics.f1Score.toFixed(2)}%`);
    console.log(`  Accuracy: ${metrics.accuracy.toFixed(2)}%`);

    // Step 4: Generate comprehensive report
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const validationReportPath = path.join(outputDir, 'flaky-detection-validation-report.json');
    const report = this.generateValidationReport(validationReportPath);

    // Step 5: Display summary
    console.log('🎯 VALIDATION SUMMARY');
    console.log('===================');
    console.log(`📈 Overall Status: ${report.validationStatus}`);
    console.log(`📊 Accuracy: ${report.accuracyMetrics.accuracy}`);
    console.log(`🎯 Precision: ${report.accuracyMetrics.precision}`);
    console.log(`🔍 Recall: ${report.accuracyMetrics.recall}`);
    console.log('');
    console.log('📋 RECOMMENDATIONS:');
    report.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });

    return true;
  }
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node validate-flaky-detection.js <metadata-path> <report-path> [output-dir]');
    console.log('');
    console.log('Example:');
    console.log('  node validate-flaky-detection.js tests/flaky-validation/flaky-test-metadata.json playwright-results.json validation-reports');
    process.exit(1);
  }

  const metadataPath = args[0];
  const reportPath = args[1];
  const outputDir = args[2] || path.join(__dirname, '..', 'validation-reports');

  const validator = new FlakyDetectionValidator();
  const success = validator.runComprehensiveValidation(metadataPath, reportPath, outputDir);

  if (!success) {
    console.error('❌ Flaky detection validation failed');
    process.exit(1);
  }

  console.log('✅ Flaky detection validation completed successfully!');
  console.log(`📁 Results saved to: ${outputDir}`);

  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = FlakyDetectionValidator;