#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Visual Regression Baseline Management
 * Handles snapshot updates and baseline validation
 */
class BaselineManager {
  constructor() {
    this.snapshotDir = path.join(__dirname, '..', 'tests', '__snapshots__');
    this.baselineDir = path.join(__dirname, '..', 'tests', '__baselines__');
    this.currentEnv = process.env.PLAYWRIGHT_ENV || 'local';
  }

  /**
   * Initialize baseline management
   */
  initialize() {
    // Create directories if they don't exist
    if (!fs.existsSync(this.snapshotDir)) {
      fs.mkdirSync(this.snapshotDir, { recursive: true });
    }
    if (!fs.existsSync(this.baselineDir)) {
      fs.mkdirSync(this.baselineDir, { recursive: true });
    }
  }

  /**
   * Update visual baselines
   */
  updateBaselines() {
    this.initialize();

    try {
      console.log('📸 Updating visual regression baselines...');

      // Run visual regression tests with update mode
      const result = execSync('npx playwright test --grep @visual --update-snapshots', {
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8',
        env: {
          ...process.env,
          PLAYWRIGHT_ENV: this.currentEnv
        }
      });

      console.log('✅ Baselines updated successfully');

      // Copy updated snapshots to baseline directory
      this.syncSnapshotsToBaseline();

      return { success: true, output: result };
    } catch (error) {
      console.error('❌ Error updating baselines:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Validate current snapshots against baselines
   */
  validateBaselines() {
    this.initialize();

    try {
      console.log('🔍 Validating visual regression baselines...');

      // Check if baseline directory has files
      const baselineFiles = this.getSnapshotFiles(this.baselineDir);
      const currentFiles = this.getSnapshotFiles(this.snapshotDir);

      if (baselineFiles.length === 0) {
        console.log('ℹ️  No baselines found. This might be the first run.');
        return { valid: true, message: 'No baselines found - initial setup needed' };
      }

      // Compare file counts
      if (baselineFiles.length !== currentFiles.length) {
        return {
          valid: false,
          message: `File count mismatch: baselines(${baselineFiles.length}) vs current(${currentFiles.length})`
        };
      }

      // Detailed comparison would go here
      // For now, just check that baselines exist for all visual tests
      return { valid: true, message: 'Baselines appear valid' };

    } catch (error) {
      console.error('❌ Error validating baselines:', error.message);
      return { valid: false, error: error.message };
    }
  }

  /**
   * Sync current snapshots to baseline directory
   */
  syncSnapshotsToBaseline() {
    const files = this.getSnapshotFiles(this.snapshotDir);

    files.forEach(file => {
      const sourcePath = path.join(this.snapshotDir, file);
      const destPath = path.join(this.baselineDir, file);

      // Copy file to baseline directory
      fs.copyFileSync(sourcePath, destPath);
      console.log(`💾 Synced: ${file}`);
    });
  }

  /**
   * Get snapshot files from directory
   */
  getSnapshotFiles(directory) {
    if (!fs.existsSync(directory)) {
      return [];
    }

    return fs.readdirSync(directory)
      .filter(file => file.endsWith('.png') || file.endsWith('.json'));
  }

  /**
   * Check if baseline update is needed
   */
  needsBaselineUpdate() {
    const baselineFiles = this.getSnapshotFiles(this.baselineDir);
    return baselineFiles.length === 0;
  }

  /**
   * Generate baseline management report
   */
  generateReport() {
    const baselineFiles = this.getSnapshotFiles(this.baselineDir);
    const currentFiles = this.getSnapshotFiles(this.snapshotDir);

    return {
      baselineCount: baselineFiles.length,
      currentSnapshotCount: currentFiles.length,
      needsUpdate: this.needsBaselineUpdate(),
      environment: this.currentEnv,
      recommendations: this.generateRecommendations(baselineFiles.length)
    };
  }

  /**
   * Generate recommendations
   */
  generateRecommendations(baselineCount) {
    const recommendations = [];

    if (baselineCount === 0) {
      recommendations.push(
        '🆕 No baselines exist. Run with --update-snapshots to create initial baselines.'
      );
    } else {
      recommendations.push(
        `✅ ${baselineCount} baseline files exist. Use --update-snapshots to refresh when UI changes.`
      );
    }

    recommendations.push(
      '📊 Consider adding baseline validation to CI pipeline to prevent accidental UI regressions.'
    );

    return recommendations;
  }
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  const manager = new BaselineManager();
  const command = args[0];

  switch (command) {
    case 'update':
      const updateResult = manager.updateBaselines();
      if (!updateResult.success) {
        process.exit(1);
      }
      break;

    case 'validate':
      const validateResult = manager.validateBaselines();
      if (!validateResult.valid) {
        console.error('❌ Baseline validation failed:', validateResult.message);
        process.exit(1);
      } else {
        console.log('✅ Baseline validation passed:', validateResult.message);
      }
      break;

    case 'report':
      const report = manager.generateReport();
      console.log('📊 VISUAL REGRESSION BASELINE REPORT');
      console.log('====================================');
      console.log(`Environment: ${report.environment}`);
      console.log(`Baseline Files: ${report.baselineCount}`);
      console.log(`Current Snapshots: ${report.currentSnapshotCount}`);
      console.log(`Needs Update: ${report.needsUpdate ? 'YES' : 'NO'}`);
      console.log('');

      console.log('📋 RECOMMENDATIONS:');
      report.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
      });
      break;

    default:
      console.log('Visual Regression Baseline Manager');
      console.log('Usage:');
      console.log('  node manage-visual-baselines.js update    - Update baselines');
      console.log('  node manage-visual-baselines.js validate  - Validate current baselines');
      console.log('  node manage-visual-baselines.js report    - Generate baseline report');
      process.exit(1);
  }
}

// Execute main function
if (require.main === module) {
  main();
}

module.exports = BaselineManager;