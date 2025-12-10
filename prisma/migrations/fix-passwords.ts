import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('⚠️  Suppression de tous les utilisateurs avec des mots de passe corrompus...');

  const deleted = await prisma.user.deleteMany({});
  console.log(`✅ ${deleted.count} utilisateurs supprimés`);

  console.log('📝 La base est propre. Les nouveaux utilisateurs seront créés avec des mots de passe correctement hachés.');
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
