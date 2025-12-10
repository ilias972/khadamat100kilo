// Test environment setup
require('dotenv').config({ path: '.env.test' });

// Set test-specific environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./prisma/test.db';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test_jwt_refresh_secret_key';

// Ensure test database is different from development
if (process.env.DATABASE_URL === 'postgresql://admin:password123@localhost:5432/khadamat_db?schema=public') {
  process.env.DATABASE_URL = 'file:./prisma/test.db';
}

console.log('Test environment configured with:', {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3002
});