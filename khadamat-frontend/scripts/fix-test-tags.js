#!/usr/bin/env node

/**
 * Automated Test Tag Cleanup Script
 *
 * This script identifies and removes duplicate tags from Playwright test files.
 * It analyzes test.describe() and test() declarations to find duplicate tag patterns
 * and removes tags from individual test() declarations when they already exist
 * in the parent test.describe() declaration.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEST_DIR = path.join(__dirname, '..', 'tests');
const BACKUP_DIR = path.join(__dirname, '..', 'test-backups');

/**
 * Extract tags from a test description string
 * @param {string} description - Test description string
 * @returns {string[]} Array of tags found
 */
function extractTags(description) {
  const tagRegex = /@\w+/g;
  return description.match(tagRegex) || [];
}

/**
 * Remove tags from a test description string
 * @param {string} description - Test description string
 * @param {string[]} tagsToRemove - Tags to remove
 * @returns {string} Cleaned description
 */
function removeTags(description, tagsToRemove) {
  let result = description;
  tagsToRemove.forEach(tag => {
    // Remove the tag and any surrounding whitespace
    result = result.replace(new RegExp(`\\s*${tag}\\s*`, 'g'), ' ');
  });
  // Clean up multiple spaces
  return result.trim().replace(/\s+/g, ' ');
}

/**
 * Process a single test file
 * @param {string} filePath - Path to test file
 * @returns {boolean} True if file was modified
 */
function processTestFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;

  // Find all test.describe blocks and their tags
  const describeBlocks = [];
  const describeStack = [];

  lines.forEach((line, index) => {
    // Check for test.describe declarations
    const describeMatch = line.match(/test\.describe\(['"`](.+)['"`]/);
    if (describeMatch) {
      const description = describeMatch[1];
      const tags = extractTags(description);
      console.log(`🎯 Found describe block at line ${index + 1}: ${description}`);
      console.log(`  Describe tags: ${tags.join(', ')}`);
      describeBlocks.push({
        startLine: index,
        description: description,
        tags: tags,
        endLine: null
      });
      describeStack.push(describeBlocks.length - 1);
    }

    // Check for closing braces of describe blocks - only if it's not inside another block
    if (line.trim() === '});' && describeStack.length > 0) {
      const currentBlockIndex = describeStack.pop();
      if (currentBlockIndex >= 0 && currentBlockIndex < describeBlocks.length) {
        describeBlocks[currentBlockIndex].endLine = index;
        console.log(`🏁 Describe block ended at line ${index + 1}`);
      }
    }

    // Check for test() declarations within describe blocks
    const testMatch = line.match(/test\(['"`](.+)['"`]/);
    if (testMatch) {
      const description = testMatch[1];
      const testTags = extractTags(description);

      // Find the current describe block (if any)
      const currentDescribeBlock = describeStack.length > 0
        ? describeBlocks[describeStack[describeStack.length - 1]]
        : null;

      console.log(`🔍 Test line ${index + 1}: ${description}`);
      console.log(`  Test tags: ${testTags.join(', ')}`);
      console.log(`  Current describe block: ${currentDescribeBlock ? currentDescribeBlock.description : 'None'}`);
      console.log(`  Describe tags: ${currentDescribeBlock ? currentDescribeBlock.tags.join(', ') : 'None'}`);

      if (currentDescribeBlock && testTags.length > 0) {
        // Check for duplicate tags
        const duplicateTags = testTags.filter(tag =>
          currentDescribeBlock.tags.includes(tag)
        );

        console.log(`  Duplicate tags found: ${duplicateTags.join(', ')}`);

        if (duplicateTags.length > 0) {
          console.log(`Found duplicate tags in ${filePath}:${index + 1}`);
          console.log(`  Describe: ${currentDescribeBlock.description}`);
          console.log(`  Test: ${description}`);
          console.log(`  Duplicate tags: ${duplicateTags.join(', ')}`);

          // Remove duplicate tags from test description
          const cleanedDescription = removeTags(description, duplicateTags);
          const newLine = line.replace(description, cleanedDescription);
          lines[index] = newLine;
          modified = true;

          console.log(`  Fixed: ${cleanedDescription}`);
        }
      }
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`✅ Updated ${filePath}`);
  }

  return modified;
}

/**
 * Create backup of test files
 */
function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(BACKUP_DIR, `test-backup-${dateStr}`);

  try {
    // Use copy approach instead of zip for Windows compatibility
    function copyDirSync(src, dest) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const entries = fs.readdirSync(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          copyDirSync(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }

    copyDirSync(TEST_DIR, backupDir);
    console.log(`✅ Backup created: ${backupDir}`);
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Starting test tag cleanup...');

  // Create backup first
  createBackup();

  let totalFilesProcessed = 0;
  let totalFilesModified = 0;

  // Find all test files
  const testFiles = [];
  function findTestFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findTestFiles(filePath);
      } else if (file.endsWith('.spec.ts')) {
        testFiles.push(filePath);
      }
    });
  }

  findTestFiles(TEST_DIR);
  console.log(`📁 Found ${testFiles.length} test files`);

  // Process each test file
  testFiles.forEach(filePath => {
    console.log(`📁 Processing file: ${filePath}`);
    totalFilesProcessed++;
    if (processTestFile(filePath)) {
      totalFilesModified++;
    }
  });

  console.log(`📊 Processed ${totalFilesProcessed} files, modified ${totalFilesModified} files`);
  console.log('✅ Test tag cleanup completed!');
}

if (require.main === module) {
  main();
}

module.exports = {
  extractTags,
  removeTags,
  processTestFile,
  createBackup,
  main
};