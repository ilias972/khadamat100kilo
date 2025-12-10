const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugUsers() {
  try {
    console.log('🔍 Debugging users in database...');

    // Find all users
    const users = await prisma.user.findMany({
      include: {
        clientProfile: true,
        proProfile: true
      }
    });

    console.log(`📊 Found ${users.length} users:`);

    users.forEach((user, index) => {
      console.log(`\n👤 User ${index + 1}:`);
      console.log(`  ID: ${user.id}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Phone: ${user.phone}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Email Verified: ${user.isEmailVerified}`);
      console.log(`  Password Hash: ${user.passwordHash ? '✅ Present' : '❌ Missing'}`);

      if (user.proProfile) {
        console.log(`  Pro Profile: ${user.proProfile.firstName} ${user.proProfile.lastName}`);
        console.log(`  Profession: ${user.proProfile.profession}`);
      }

      if (user.clientProfile) {
        console.log(`  Client Profile: ${user.clientProfile.firstName} ${user.clientProfile.lastName}`);
      }
    });

    // Try to find the specific test user
    const hassan = await prisma.user.findUnique({
      where: { email: 'hassan@test.com' },
      include: {
        proProfile: true
      }
    });

    if (hassan) {
      console.log('\n🎯 Found Hassan Pro User:');
      console.log(`  Email: ${hassan.email}`);
      console.log(`  Phone: ${hassan.phone}`);
      console.log(`  Password Hash: ${hassan.passwordHash.substring(0, 20)}...`);
      console.log(`  Pro Profile: ${hassan.proProfile?.firstName} ${hassan.proProfile?.lastName}`);
    } else {
      console.log('\n❌ Hassan Pro user not found!');
    }

  } catch (error) {
    console.error('❌ Error debugging users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugUsers();