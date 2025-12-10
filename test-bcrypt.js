const bcrypt = require('bcrypt');

async function testBcrypt() {
  const password = 'password123';
  const hash = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

  console.log('Testing bcrypt comparison...');
  console.log('Password:', password);
  console.log('Hash:', hash);

  const isValid = await bcrypt.compare(password, hash);
  console.log('bcrypt.compare result:', isValid);

  // Test with a new hash
  console.log('\nGenerating new hash...');
  const newHash = await bcrypt.hash(password, 10);
  console.log('New hash:', newHash);

  const isValidNew = await bcrypt.compare(password, newHash);
  console.log('New hash comparison:', isValidNew);
}

testBcrypt();