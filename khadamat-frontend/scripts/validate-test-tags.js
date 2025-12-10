#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Test Tag Validation Script
 * Enforces single-tag policy and detects tag explosion
 */
class TagValidator {
  constructor() {
    this.multiTagTests = [];
    this.tagFrequency = {};
    this.totalTests = 0;
  }

  /**
   * Run tag validation
   */
  validateTags() {
    try {
      // Get test list from Playwright
      const testListOutput = execSync('npx playwright test --list', {
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      // Parse test list to find multi-tagged tests
      this.parseTestList(testListOutput);

      // Generate report
      return this.generateReport();
    } catch (error) {
      console.error('❌ Error running tag validation:', error.message);
      return { error: error.message };
    }
  }

  /**
   * Parse Playwright test list output
   */
  parseTestList(output) {
    const lines = output.split('\n');

    lines.forEach(line => {
      // Look for test lines with @tags
      const testMatch = line.match(/^  \[.*\] › (.*) (@\w+)/);
      if (testMatch) {
        this.totalTests++;

        const testTitle = testMatch[1];
        const tags = line.match(/@\w+/g) || [];

        // Count tag frequency
        tags.forEach(tag => {
          this.tagFrequency[tag] = (this.tagFrequency[tag] || 0) + 1;
        });

        // Check for multi-tag violations
        if (tags.length > 1) {
          this.multiTagTests.push({
            title: testTitle,
            tags: tags,
            tagCount: tags.length
          });
        }
      }
    });
  }

  /**
   * Generate validation report
   */
  generateReport() {
    const multiTagCount = this.multiTagTests.length;
    const multiTagPercentage = (multiTagCount / this.totalTests * 100).toFixed(1);

    return {
      summary: {
        totalTests: this.totalTests,
        multiTagTests: multiTagCount,
        multiTagPercentage: `${multiTagPercentage}%`,
        uniqueTags: Object.keys(this.tagFrequency).length,
        severity: this.calculateSeverity(multiTagCount)
      },
      tagFrequency: this.tagFrequency,
      multiTagViolations: this.multiTagTests,
      recommendations: this.generateRecommendations(multiTagCount)
    };
  }

  /**
   * Calculate severity based on multi-tag count
   */
  calculateSeverity(multiTagCount) {
    const percentage = multiTagCount / this.totalTests;

    if (percentage > 0.5) return 'CRITICAL';
    if (percentage > 0.3) return 'HIGH';
    if (percentage > 0.1) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations(multiTagCount) {
    const recommendations = [];

    if (multiTagCount > 10) {
      recommendations.push(
        `🚨 CRITICAL: ${multiTagCount} tests violate single-tag policy. ` +
        'Immediate refactoring required to prevent CI pipeline failures.'
      );
    } else if (multiTagCount > 5) {
      recommendations.push(
        `⚠️ HIGH: ${multiTagCount} tests have multiple tags. ` +
        'Prioritize fixing tests with 3+ tags first.'
      );
    } else if (multiTagCount > 0) {
      recommendations.push(
        `📊 MEDIUM: ${multiTagCount} tests need tag simplification. ` +
        'Review and consolidate tags.'
      );
    } else {
      recommendations.push('✅ No tag violations detected. Tag system is clean.');
    }

    // Add tag frequency recommendations
    const sortedTags = Object.entries(this.tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    if (sortedTags.length > 0) {
      recommendations.push(
        `🏷️  Top tags: ${sortedTags.map(([tag, count]) => `${tag}(${count})`).join(', ')}`
      );
    }

    return recommendations;
  }
}

/**
 * Main execution
 */
function main() {
  const validator = new TagValidator();
  const report = validator.validateTags();

  // Output results
  console.log('🏷️  TEST TAG VALIDATION REPORT');
  console.log('=============================');
  console.log(`Total Tests: ${report.summary.totalTests}`);
  console.log(`Multi-Tag Tests: ${report.summary.multiTagTests} (${report.summary.multiTagPercentage})`);
  console.log(`Unique Tags: ${report.summary.uniqueTags}`);
  console.log(`Severity: ${report.summary.severity}`);
  console.log('');

  console.log('📋 RECOMMENDATIONS:');
  report.recommendations.forEach((rec, index) => {
    console.log(`  ${index + 1}. ${rec}`);
  });

  // Show top violations if any
  if (report.multiTagViolations.length > 0) {
    console.log('\n🔍 TOP MULTI-TAG VIOLATIONS:');
    report.multiTagViolations
      .sort((a, b) => b.tagCount - a.tagCount)
      .slice(0, 5)
      .forEach((violation, index) => {
        console.log(`  ${index + 1}. "${violation.title}" - ${violation.tagCount} tags: ${violation.tags.join(', ')}`);
      });
  }

  // Create detailed JSON report
  const outputPath = path.join(__dirname, '..', 'test-tag-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n💾 Detailed report saved to: ${outputPath}`);

  // Exit with appropriate code
  if (report.summary.severity === 'CRITICAL') {
    console.log('\n❌ Tag validation FAILED - Critical violations detected');
    process.exit(2);
  } else if (report.summary.severity === 'HIGH') {
    console.log('\n⚠️  Tag validation WARNING - High severity violations');
    process.exit(1);
  } else {
    console.log('\n✅ Tag validation PASSED');
    process.exit(0);
  }
}

// Execute main function
if (require.main === module) {
  main();
}

module.exports = TagValidator;