const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixEmailVerification() {
  try {
    console.log('🔧 Fixing email verification for test users...');

    // Find the test user
    const user = await prisma.user.findUnique({
      where: { email: 'perf-test-123456789@test.com' }
    });

    if (!user) {
      console.log('❌ Test user not found!');
      return;
    }

    console.log(`👤 Found user: ${user.email} (ID: ${user.id})`);
    console.log(`  Current email verification status: ${user.isEmailVerified}`);

    // Update email verification status
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true }
    });

    console.log(`✅ Updated email verification status: ${updatedUser.isEmailVerified}`);

    // Also update a few other test users for good measure
    const otherUsers = await prisma.user.findMany({
      where: {
        email: {
          contains: 'test-'
        },
        isEmailVerified: false
      },
      take: 3
    });

    console.log(`📋 Found ${otherUsers.length} other unverified test users`);

    for (const otherUser of otherUsers) {
      await prisma.user.update({
        where: { id: otherUser.id },
        data: { isEmailVerified: true }
      });
      console.log(`✅ Verified: ${otherUser.email}`);
    }

    console.log('🎉 Email verification fix complete!');

  } catch (error) {
    console.error('❌ Error fixing email verification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixEmailVerification();