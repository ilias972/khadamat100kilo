import { PrismaClient, City, ServiceCategory } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding cities and service categories...');

  try {
    // Create cities
    const cities = [
      { id: 'casablanca', name: 'Casablanca', region: 'Grand Casablanca' },
      { id: 'rabat', name: 'Rabat', region: 'Rabat-Salé-Zemmour-Zaër' },
      { id: 'marrakech', name: 'Marrakech', region: 'Marrakech-Tensift-Al Haouz' },
      { id: 'tanger', name: 'Tanger', region: 'Tanger-Tétouan' },
      { id: 'fes', name: 'Fès', region: 'Fès-Boulemane' },
      { id: 'agadir', name: 'Agadir', region: 'Souss-Massa' },
      { id: 'meknes', name: 'Meknès', region: 'Meknès-Tafilalet' },
      { id: 'oujda', name: 'Oujda', region: 'Oriental' },
    ];

    const createdCities: City[] = [];
    for (const city of cities) {
      const createdCity = await prisma.city.upsert({
        where: { id: city.id },
        update: {},
        create: {
          id: city.id,
          name: city.name,
          region: city.region,
          isActive: true,
        },
      });
      createdCities.push(createdCity);
      console.log(`✅ City created/updated: ${createdCity.name} (ID: ${createdCity.id})`);
    }

    // Create service categories
    const serviceCategories = [
      { id: 'plomberie', name: 'Plomberie', description: 'Réparations et installations de plomberie', icon: 'Wrench' },
      { id: 'electricite', name: 'Électricité', description: 'Travaux électriques et installations', icon: 'Zap' },
      { id: 'menage', name: 'Ménage', description: 'Services de nettoyage et ménage', icon: 'Home' },
      { id: 'peinture', name: 'Peinture', description: 'Peinture intérieure et extérieure', icon: 'Paintbrush' },
      { id: 'jardinage', name: 'Jardinage', description: 'Entretien des jardins et espaces verts', icon: 'Leaf' },
      { id: 'maconnerie', name: 'Maçonnerie', description: 'Travaux de maçonnerie et construction', icon: 'Hammer' },
    ];

    const createdCategories: ServiceCategory[] = [];
    for (const category of serviceCategories) {
      const createdCategory = await prisma.serviceCategory.upsert({
        where: { id: category.id },
        update: {},
        create: {
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          isActive: true,
        },
      });
      createdCategories.push(createdCategory);
      console.log(`✅ Service category created/updated: ${createdCategory.name} (ID: ${createdCategory.id})`);
    }

    // Create test users
    console.log('\n👥 Creating test users...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Hassan Pro
    const hassanPro = await prisma.user.upsert({
      where: { email: 'hassan@test.com' },
      update: {},
      create: {
        email: 'hassan@test.com',
        phone: '+212600000001',
        passwordHash: hashedPassword,
        role: 'PRO',
        isEmailVerified: true,
      },
    });
    console.log(`✅ Pro user created: ${hassanPro.email}`);

    // Create Hassan Pro Profile
    await prisma.proProfile.upsert({
      where: { userId: hassanPro.id },
      update: {},
      create: {
        userId: hassanPro.id,
        firstName: 'Hassan',
        lastName: 'Pro',
        profession: 'Ménage',
        bio: 'Professional cleaner with 5 years experience',
        cityId: createdCities.find(c => c.name === 'Marrakech')?.id,
      },
    });

    // Create Jean Client
    const jeanClient = await prisma.user.upsert({
      where: { email: 'jean.client@test.com' },
      update: {},
      create: {
        email: 'jean.client@test.com',
        phone: '+212600000002',
        passwordHash: hashedPassword,
        role: 'CLIENT',
        isEmailVerified: true,
      },
    });
    console.log(`✅ Client user created: ${jeanClient.email}`);

    // Create Jean Client Profile
    await prisma.clientProfile.upsert({
      where: { userId: jeanClient.id },
      update: {},
      create: {
        userId: jeanClient.id,
        firstName: 'Jean',
        lastName: 'Client',
      },
    });

    console.log('\n🎉 Seeding completed successfully!');
    console.log(`📍 Cities seeded: ${createdCities.length}`);
    console.log(`🛠️  Service categories seeded: ${createdCategories.length}`);
    console.log(`👥 Test users created: 2`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });