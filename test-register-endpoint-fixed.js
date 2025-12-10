const axios = require('axios');

async function testRegisterEndpoint() {
  console.log('🧪 Testing Register Endpoint Performance...');

  // Generate unique phone numbers for each test
  const testCases = [
    { email: `test-perf-1-${Date.now()}@test.com`, phone: '+212600000101' },
    { email: `test-perf-2-${Date.now()}@test.com`, phone: '+212600000102' },
    { email: `test-perf-3-${Date.now()}@test.com`, phone: '+212600000103' },
    { email: `test-perf-4-${Date.now()}@test.com`, phone: '+212600000104' },
    { email: `test-perf-5-${Date.now()}@test.com`, phone: '+212600000105' }
  ];

  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const startTime = Date.now();

    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', {
        email: testCase.email,
        password: 'Test123!@#',
        firstName: 'Test',
        lastName: `User${i + 1}`,
        phone: testCase.phone,
        role: 'CLIENT'
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      results.push({
        test: i + 1,
        success: true,
        duration: duration,
        userId: response.data.user.id,
        email: testCase.email
      });

      console.log(`✅ Test ${i + 1}: SUCCESS - ${duration}ms`);
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;

      results.push({
        test: i + 1,
        success: false,
        duration: duration,
        error: error.response?.data?.message || error.message
      });

      console.log(`❌ Test ${i + 1}: FAILED - ${duration}ms - ${error.response?.data?.message || error.message}`);
    }
  }

  // Calculate statistics
  const successfulTests = results.filter(r => r.success);
  const averageDuration = successfulTests.reduce((sum, r) => sum + r.duration, 0) / successfulTests.length;

  console.log('\\n📊 Performance Summary:');
  console.log(`- Successful tests: ${successfulTests.length}/${testCases.length}`);
  console.log(`- Average duration: ${averageDuration.toFixed(2)}ms`);
  console.log(`- All tests under 2000ms: ${successfulTests.every(r => r.duration < 2000)}`);

  if (successfulTests.length === testCases.length && successfulTests.every(r => r.duration < 2000)) {
    console.log('\\n🎉 All tests passed! Performance optimization successful.');
  } else {
    console.log('\\n⚠️ Some tests failed or performance issues detected.');
  }

  return results;
}

// Run the test
testRegisterEndpoint().catch(console.error);