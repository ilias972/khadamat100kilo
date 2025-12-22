import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed (Remplissage de la base)...');

  // 1. Création des Villes
  console.log('📍 Création des villes...');
  const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Agadir', 'Fès', 'Kénitra'];
  
  // On garde en mémoire les villes créées pour récupérer leurs IDs
  const cityMap = new Map();

  for (const cityName of cities) {
    // On génère un ID simple (ex: 'casablanca') pour la recherche
    const cityId = cityName.toLowerCase().replace('é', 'e').replace('è', 'e');
    
    const city = await prisma.city.upsert({
      where: { id: cityId }, // Assure-toi que ton modèle City a un ID string, sinon utilise 'name'
      update: { name: cityName },
      create: { 
        id: cityId,
        name: cityName,
        isActive: true 
      },
    });
    cityMap.set(cityId, city);
  }
  console.log('✅ Villes synchronisées');

  // 2. Création des Catégories de Service
  console.log('🛠️ Création des catégories...');
  const categories = [
    { id: 'plomberie', name: 'Plomberie' },
    { id: 'electricite', name: 'Électricité' },
    { id: 'menage', name: 'Ménage' },
    { id: 'peinture', name: 'Peinture' },
    { id: 'maconnerie', name: 'Maçonnerie' },
  ];

  for (const cat of categories) {
    await prisma.serviceCategory.upsert({
      where: { id: cat.id },
      update: { name: cat.name },
      create: { 
        id: cat.id, 
        name: cat.name,
        isActive: true,
        icon: 'Wrench' // Valeur par défaut
      },
    });
  }
  console.log('✅ Catégories synchronisées');

  // 3. Gestion des Utilisateurs (Le Cœur du Problème)
  console.log('👥 Gestion des utilisateurs de test...');
  
  // On génère le hash UNE SEULE FOIS pour être sûr qu'il est identique partout
  const passwordRaw = 'password123';
  const hashedPassword = await bcrypt.hash(passwordRaw, 10);

  // --- HASSAN (PRO) ---
  const hassan = await prisma.user.upsert({
    where: { email: 'hassan@test.com' },
    // 👇 C'EST ICI LA CORRECTION MAJEURE : On force la mise à jour du hash
    update: {
      passwordHash: hashedPassword,
      role: 'PRO', // On s'assure que le rôle est bon
    },
    create: {
      email: 'hassan@test.com',
      passwordHash: hashedPassword,
      role: 'PRO',
      phone: '+212600000001',
      isEmailVerified: true,
      proProfile: {
        create: {
          firstName: 'Hassan',
          lastName: 'Bricole',
          profession: 'Plomberie',
          bio: 'Artisan plombier sérieux avec 10 ans d\'expérience.',
          cityId: 'casablanca', // Doit correspondre à un ID de ville créé plus haut
        }
      }
    },
  });
  console.log(`👤 Hassan (PRO) mis à jour avec le mot de passe: ${passwordRaw}`);

  // --- JEAN (CLIENT) ---
  const jean = await prisma.user.upsert({
    where: { email: 'jean.client@test.com' },
    update: {
      passwordHash: hashedPassword,
      role: 'CLIENT',
    },
    create: {
      email: 'jean.client@test.com',
      passwordHash: hashedPassword,
      role: 'CLIENT',
      phone: '+212600000002',
      isEmailVerified: true,
      clientProfile: {
        create: {
          firstName: 'Jean',
          lastName: 'Dupont',
        }
      }
    },
  });
  console.log(`👤 Jean (CLIENT) mis à jour avec le mot de passe: ${passwordRaw}`);

  console.log('🎉 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });