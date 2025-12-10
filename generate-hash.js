const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'password123';
  console.log('Generating bcrypt hash for password:', password);

  const hash = await bcrypt.hash(password, 10);
  console.log('Generated hash:', hash);

  // Test the hash
  const isValid = await bcrypt.compare(password, hash);
  console.log('Hash verification:', isValid);

  // Copy this hash to use in the seed
  console.log('\nCopy this hash to prisma/seed.ts:');
  console.log(hash);
}

generateHash();