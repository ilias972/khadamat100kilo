import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function diagnose() {
  console.log('🔍 DIAGNOSTIC D\'AUTHENTIFICATION');
  console.log('═══════════════════════════════════════\n');

  // Test 1: Vérifier bcrypt
  const testPassword = 'password123';
  const testHash = await bcrypt.hash(testPassword, 10);
  const compare = await bcrypt.compare(testPassword, testHash);
  
  if (!compare) {
    console.log('❌ CRITIQUE: bcrypt ne fonctionne pas sur cette machine.');
    return;
  }
  console.log('✅ bcrypt fonctionne correctement.');

  // Test 2: Vérifier Hassan
  console.log('\n👤 Vérification de l\'utilisateur hassan@test.com...');
  const hassan = await prisma.user.findUnique({ where: { email: 'hassan@test.com' } });

  if (!hassan) {
    console.log('❌ Utilisateur hassan@test.com introuvable.');
    console.log('👉 Solution: Lance "npx prisma db seed"');
    return;
  }

  console.log(`   ID: ${hassan.id}`);
  console.log(`   Hash en base: ${hassan.passwordHash?.substring(0, 30)}...`);
  
  if (!hassan.passwordHash || hassan.passwordHash.length < 50) {
    console.log('❌ Le hash en base est invalide ou corrompu.');
  } else {
    // Test réel
    const isMatch = await bcrypt.compare('password123', hassan.passwordHash);
    if (isMatch) {
      console.log('✅ LE MOT DE PASSE EST BON ! Tu devrais pouvoir te connecter.');
      console.log('   Login: hassan@test.com');
      console.log('   Pass : password123');
    } else {
      console.log('❌ LE MOT DE PASSE EST INCORRECT.');
      console.log('   Le hash en base ne correspond pas à "password123".');
      console.log('   Le seed n\'a pas mis à jour le mot de passe.');
    }
  }
}

diagnose()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
