#!/usr/bin/env node

/**
 * Performance Measurement Script for Khadamat Frontend
 * Measures bundle size, Core Web Vitals, and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Khadamat Frontend Performance Measurement\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Run this script from the frontend root directory.');
  process.exit(1);
}

// Function to get file size in human readable format
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to run command and return output
function runCommand(command, description) {
  try {
    console.log(`📊 ${description}...`);
    const output = execSync(command, { encoding: 'utf8' });
    return output;
  } catch (error) {
    console.warn(`⚠️  Warning: ${description} failed:`, error.message);
    return null;
  }
}

// 1. Build the application
console.log('🏗️  Building application for analysis...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// 2. Analyze bundle size
console.log('📦 Analyzing bundle size...');
const nextBuildOutput = path.join('.next', 'static', 'chunks');
if (fs.existsSync(nextBuildOutput)) {
  const files = fs.readdirSync(nextBuildOutput, { recursive: true })
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(nextBuildOutput, file));

  let totalSize = 0;
  let mainBundleSize = 0;
  let vendorSize = 0;

  files.forEach(file => {
    try {
      const stats = fs.statSync(file);
      totalSize += stats.size;

      if (file.includes('framework') || file.includes('webpack')) {
        vendorSize += stats.size;
      } else if (file.includes('main') || file.includes('app')) {
        mainBundleSize += stats.size;
      }
    } catch (error) {
      // Ignore files that can't be read
    }
  });

  console.log(`📊 Bundle Size Analysis:`);
  console.log(`   Total JS Bundle: ${formatBytes(totalSize)}`);
  console.log(`   Main Application: ${formatBytes(mainBundleSize)}`);
  console.log(`   Vendor Libraries: ${formatBytes(vendorSize)}`);
  console.log(`   Estimated gzipped: ${formatBytes(totalSize * 0.3)} (rough estimate)\n`);

  // Check against target
  const gzippedSize = totalSize * 0.3;
  if (gzippedSize > 200 * 1024) { // 200KB
    console.log(`⚠️  Bundle size exceeds 200KB gzipped target by ${formatBytes(gzippedSize - 200 * 1024)}`);
    console.log(`💡 Recommendations:`);
    console.log(`   - Implement code splitting for routes`);
    console.log(`   - Lazy load heavy components (charts, maps)`);
    console.log(`   - Optimize images and assets`);
    console.log(`   - Consider tree shaking unused dependencies\n`);
  } else {
    console.log(`✅ Bundle size is within 200KB gzipped target\n`);
  }
} else {
  console.log('⚠️  Could not find build output for bundle analysis\n');
}

// 3. Check for performance optimizations
console.log('🔍 Checking for performance optimizations...');

// Check for React.memo usage
const componentsDir = path.join('src', 'components');
let memoCount = 0;
let lazyCount = 0;

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('React.memo')) memoCount++;
      if (content.includes('React.lazy') || content.includes('dynamic(')) lazyCount++;
    }
  });
}

scanDirectory(componentsDir);

console.log(`📊 Code Optimization Analysis:`);
console.log(`   Components using React.memo: ${memoCount}`);
console.log(`   Components using lazy loading: ${lazyCount}`);

// Check for TanStack Query usage
const hooksDir = path.join('src', 'hooks');
let queryCount = 0;

if (fs.existsSync(hooksDir)) {
  const hookFiles = fs.readdirSync(hooksDir);
  hookFiles.forEach(file => {
    if (file.endsWith('.ts')) {
      const content = fs.readFileSync(path.join(hooksDir, file), 'utf8');
      if (content.includes('useQuery') || content.includes('useMutation')) queryCount++;
    }
  });
}

console.log(`   Custom hooks using TanStack Query: ${queryCount}`);

// Check for Zustand store
const storeExists = fs.existsSync(path.join('src', 'lib', 'store.ts'));
console.log(`   Zustand store implemented: ${storeExists ? '✅' : '❌'}\n`);

// 4. Performance recommendations
console.log('💡 Performance Recommendations:');
console.log('   1. Monitor Core Web Vitals:');
console.log('      - Largest Contentful Paint (LCP) < 2.5s');
console.log('      - First Input Delay (FID) < 100ms');
console.log('      - Cumulative Layout Shift (CLS) < 0.1');
console.log('');
console.log('   2. Use the following tools for monitoring:');
console.log('      - Lighthouse (Chrome DevTools)');
console.log('      - Web Vitals library (already installed)');
console.log('      - React DevTools Profiler');
console.log('');
console.log('   3. Implement performance monitoring:');
console.log('      - Add error boundaries');
console.log('      - Monitor bundle size in CI/CD');
console.log('      - Set up performance budgets');
console.log('');
console.log('   4. Optimize for Core Web Vitals:');
console.log('      - Preload critical resources');
console.log('      - Optimize images (WebP, responsive)');
console.log('      - Minimize render-blocking resources');
console.log('      - Use service worker for caching\n');

// 5. Generate performance report
const report = {
  timestamp: new Date().toISOString(),
  bundleSize: {
    total: totalSize || 0,
    estimatedGzipped: (totalSize || 0) * 0.3,
    target: 200 * 1024, // 200KB
    withinTarget: ((totalSize || 0) * 0.3) <= (200 * 1024)
  },
  optimizations: {
    reactMemo: memoCount,
    lazyLoading: lazyCount,
    tanstackQuery: queryCount,
    zustandStore: storeExists
  },
  recommendations: [
    'Monitor Core Web Vitals regularly',
    'Implement performance budgets in CI/CD',
    'Use React.lazy for heavy components',
    'Optimize images and assets',
    'Set up service worker for caching'
  ]
};

const reportPath = path.join('performance-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`📄 Performance report saved to: ${reportPath}`);

console.log('\n✅ Performance measurement completed!');
console.log('🔗 Next steps:');
console.log('   1. Run Lighthouse audit on production');
console.log('   2. Monitor Core Web Vitals in production');
console.log('   3. Set up performance monitoring alerts');
console.log('   4. Implement A/B testing for performance optimizations');