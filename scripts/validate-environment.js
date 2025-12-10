#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment files
const envFiles = ['.env', '.env.test', '.env.docker'];
const requiredVars = [
  'NODE_ENV', 'PORT', 'DATABASE_URL',
  'JWT_SECRET', 'JWT_REFRESH_SECRET'
];

console.log('🔍 Validating environment configurations...\\n');

envFiles.forEach(envFile => {
  const filePath = path.join(__dirname, '..', envFile);
  if (fs.existsSync(filePath)) {
    console.log(`📄 Checking ${envFile}:`);

    const envConfig = dotenv.parse(fs.readFileSync(filePath));
    let allVarsPresent = true;

    requiredVars.forEach(varName => {
      if (envConfig[varName]) {
        console.log(`  ✅ ${varName}: ${envConfig[varName]}`);
      } else {
        console.log(`  ❌ ${varName}: MISSING`);
        allVarsPresent = false;
      }
    });

    console.log(`  ${allVarsPresent ? '✅ All required variables present' : '❌ Missing required variables'}\\n`);
  } else {
    console.log(`📄 ${envFile}: NOT FOUND\\n`);
  }
});

// Check for port conflicts
console.log('🔍 Checking for port conflicts...');

const envConfigs = envFiles
  .map(envFile => {
    const filePath = path.join(__dirname, '..', envFile);
    if (fs.existsSync(filePath)) {
      const envConfig = dotenv.parse(fs.readFileSync(filePath));
      return {
        name: envFile,
        port: envConfig.PORT || '3000',
        nodeEnv: envConfig.NODE_ENV || 'development'
      };
    }
    return null;
  })
  .filter(config => config !== null);

const ports = envConfigs.map(config => config.port);
const uniquePorts = [...new Set(ports)];

if (ports.length !== uniquePorts.length) {
  console.log('❌ PORT CONFLICT DETECTED:');
  envConfigs.forEach(config => {
    console.log(`  ${config.name}: PORT=${config.port} (${config.nodeEnv})`);
  });
  console.log('💡 Recommendation: Use different ports for different environments\\n');
} else {
  console.log('✅ No port conflicts detected\\n');
}

// Check environment consistency
console.log('🔍 Checking environment consistency...');

const testEnv = dotenv.parse(fs.readFileSync(path.join(__dirname, '..', '.env.test')));
const devEnv = dotenv.parse(fs.readFileSync(path.join(__dirname, '..', '.env')));

if (testEnv.DATABASE_URL === devEnv.DATABASE_URL) {
  console.log('❌ TEST AND DEV DATABASES ARE THE SAME!');
  console.log('💡 Recommendation: Use different databases for testing vs development');
} else {
  console.log('✅ Test and development databases are different');
}

console.log('\\n🎉 Environment validation complete!');