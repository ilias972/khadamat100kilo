const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...');

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        passwordHash: true,
        roles: true,
        status: true,
        isEmailVerified: true,
      },
    });

    console.log('\n👥 Users found:');
    users.forEach(user => {
      console.log(`- ${user.email}: ${user.passwordHash.substring(0, 20)}... (roles: ${user.roles})`);
    });

    console.log('\n✅ Check completed!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();