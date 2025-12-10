const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createFreshTestUser() {
  try {
    console.log('🆕 Creating fresh test user for authentication tests...');

    // Hash password
    const passwordHash = await bcrypt.hash('password123', 10);

    // Create fresh test user
    const testUser = await prisma.user.create({
      data: {
        email: 'fresh-test-user@test.com',
        phone: '+212699999999', // Unique phone
        passwordHash: passwordHash,
        role: 'CLIENT',
        isEmailVerified: true,
        clientProfile: {
          create: {
            firstName: 'Fresh',
            lastName: 'TestUser'
          }
        }
      },
      include: {
        clientProfile: true
      }
    });

    console.log('✅ Fresh test user created successfully:');
    console.log(`  ID: ${testUser.id}`);
    console.log(`  Email: ${testUser.email}`);
    console.log(`  Phone: ${testUser.phone}`);
    console.log(`  Role: ${testUser.role}`);
    console.log(`  Email Verified: ${testUser.isEmailVerified}`);
    console.log(`  Profile: ${testUser.clientProfile.firstName} ${testUser.clientProfile.lastName}`);
    console.log(`  Password: password123`);

    return testUser;

  } catch (error) {
    console.error('❌ Error creating fresh test user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createFreshTestUser();