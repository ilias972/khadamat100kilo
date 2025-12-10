const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addTestServices() {
  console.log('🔧 Adding test professional services...');

  try {
    // Find Hassan Pro user
    const hassanPro = await prisma.user.findUnique({
      where: { email: 'hassan@test.com' },
    });

    if (!hassanPro) {
      console.error('❌ Hassan Pro user not found');
      return;
    }

    console.log(`✅ Found Hassan Pro user: ${hassanPro.id}`);

    // Find Hassan's pro profile
    const hassanProfile = await prisma.proProfile.findUnique({
      where: { userId: hassanPro.id },
    });

    if (!hassanProfile) {
      console.error('❌ Hassan Pro profile not found');
      return;
    }

    console.log(`✅ Found Hassan Pro profile: ${hassanProfile.id}`);

    // Find cities and service categories
    const marrakech = await prisma.city.findUnique({
      where: { id: 'marrakech' },
    });

    const casablanca = await prisma.city.findUnique({
      where: { id: 'casablanca' },
    });

    const menageCategory = await prisma.serviceCategory.findUnique({
      where: { id: 'menage' },
    });

    const electriciteCategory = await prisma.serviceCategory.findUnique({
      where: { id: 'electricite' },
    });

    if (!marrakech || !casablanca || !menageCategory || !electriciteCategory) {
      console.error('❌ Required cities or categories not found');
      return;
    }

    // Add professional services for Hassan
    const services = [
      {
        proProfileId: hassanProfile.id,
        serviceCategoryId: menageCategory.id,
        cityId: marrakech.id,
        basePrice: 150,
        description: 'Nettoyage complet de maison - 3 heures',
        isActive: true,
      },
      {
        proProfileId: hassanProfile.id,
        serviceCategoryId: menageCategory.id,
        cityId: casablanca.id,
        basePrice: 200,
        description: 'Nettoyage d\'appartement - 2 heures',
        isActive: true,
      },
      {
        proProfileId: hassanProfile.id,
        serviceCategoryId: electriciteCategory.id,
        cityId: marrakech.id,
        basePrice: 300,
        description: 'Installation électrique complète',
        isActive: true,
      },
    ];

    for (const service of services) {
      const createdService = await prisma.proService.create({
        data: service,
      });
      console.log(`✅ Service created: ${createdService.description} (ID: ${createdService.id})`);
    }

    // Update Hassan's profile to be verified and add ratings
    await prisma.proProfile.update({
      where: { userId: hassanPro.id },
      data: {
        isVerifiedPro: true,
        averageRating: 4.5,
        totalReviews: 12,
        bio: 'Professionnel de nettoyage avec 5 ans d\'expérience. Service rapide et de qualité.',
      },
    });

    console.log('✅ Hassan profile updated with ratings and verification');

    // Create a few more test professionals
    const testUsers = [
      {
        email: 'amina.cleaner@test.com',
        firstName: 'Amina',
        lastName: 'Cleaner',
        cityId: 'rabat',
        profession: 'Nettoyage',
        services: [
          { categoryId: 'menage', cityId: 'rabat', basePrice: 180, description: 'Nettoyage de bureaux' },
          { categoryId: 'menage', cityId: 'casablanca', basePrice: 220, description: 'Nettoyage après construction' },
        ],
        rating: 4.8,
        reviews: 8,
      },
      {
        email: 'karim.electric@test.com',
        firstName: 'Karim',
        lastName: 'Electric',
        cityId: 'casablanca',
        profession: 'Électricien',
        services: [
          { categoryId: 'electricite', cityId: 'casablanca', basePrice: 250, description: 'Installation électrique' },
          { categoryId: 'electricite', cityId: 'rabat', basePrice: 300, description: 'Dépannage électrique urgent' },
        ],
        rating: 4.2,
        reviews: 15,
      },
    ];

    for (const userData of testUsers) {
      // Create user
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
          email: userData.email,
          phone: `+21260000000${Math.floor(Math.random() * 90) + 10}`,
          passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
          role: 'PRO',
          isEmailVerified: true,
        },
      });

      // Create pro profile
      const proProfile = await prisma.proProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profession: userData.profession,
          bio: `Professionnel ${userData.profession} avec plusieurs années d'expérience`,
          cityId: userData.cityId,
          isVerifiedPro: true,
          averageRating: userData.rating,
          totalReviews: userData.reviews,
        },
      });

      // Create services
      for (const service of userData.services) {
        await prisma.proService.create({
          data: {
            proProfileId: proProfile.id,
            serviceCategoryId: service.categoryId,
            cityId: service.cityId,
            basePrice: service.basePrice,
            description: service.description,
            isActive: true,
          },
        });
      }

      console.log(`✅ Professional ${userData.firstName} ${userData.lastName} created with services`);
    }

    console.log('🎉 Test services and professionals added successfully!');

  } catch (error) {
    console.error('❌ Error adding test services:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addTestServices();