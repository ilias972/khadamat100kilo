export interface TestUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'client' | 'professional';
}

export interface TestService {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface TestBooking {
  serviceId: number;
  date: string;
  time: string;
  address: string;
  notes?: string;
}

export interface TestMessage {
  content: string;
  sender: 'client' | 'professional';
  timestamp: string;
}

export class TestDataFactory {
  private static timestamp = Date.now();
  private static firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Paul', 'Camille'];
  private static lastNames = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit'];
  private static professions = ['Électricien', 'Plombier', 'Ménagère', 'Déménageur', 'Jardinier', 'Peintre', 'Maçon', 'Cuisinier'];
  private static serviceNames = ['Installation Électrique', 'Réparation Plomberie', 'Nettoyage Complet', 'Déménagement Express', 'Jardinage Professionnel', 'Peinture Intérieure', 'Maçonnerie Générale', 'Cuisine à Domicile'];
  private static serviceDescriptions = [
    'Service professionnel avec garantie',
    'Réparation rapide et efficace',
    'Nettoyage complet avec produits écologiques',
    'Déménagement avec assurance incluse',
    'Jardinage et entretien d\'espaces verts',
    'Peinture intérieure et extérieure',
    'Maçonnerie et rénovation',
    'Cuisine traditionnelle et moderne'
  ];
  private static categories = ['Électricité', 'Plomberie', 'Ménage', 'Déménagement', 'Jardinage'];

  static generateTestUser(role: 'client' | 'professional' = 'client'): TestUser {
    this.timestamp++;
    const baseEmail = `${role}-${this.timestamp}@test.com`;

    const firstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
    const lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];

    return {
      email: baseEmail,
      password: 'Test123!@#',
      firstName,
      lastName,
      phone: '+2126' + Math.floor(10000000 + Math.random() * 90000000).toString(),
      role
    };
  }

  static generateTestService(): TestService {
    return {
      name: this.serviceNames[Math.floor(Math.random() * this.serviceNames.length)],
      description: this.serviceDescriptions[Math.floor(Math.random() * this.serviceDescriptions.length)],
      price: Math.floor(Math.random() * 450) + 50,
      category: this.categories[Math.floor(Math.random() * this.categories.length)]
    };
  }

  static generateTestBooking(serviceId: number = 1): TestBooking {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const hours = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
    const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return {
      serviceId,
      date: tomorrow.toISOString().split('T')[0],
      time: timeString,
      address: `${Math.floor(Math.random() * 100) + 1} Rue Test, ${this.categories[Math.floor(Math.random() * this.categories.length)]}`,
      notes: `Test booking notes for service ${serviceId}`
    };
  }

  static generateTestMessage(sender: 'client' | 'professional' = 'client'): TestMessage {
    const messages = [
      'Bonjour, je suis intéressé par votre service',
      'Quand seriez-vous disponible pour une intervention ?',
      'Pouvez-vous me donner un devis pour ce travail ?',
      'Merci pour votre réponse rapide',
      'Je confirme la réservation pour la date convenue',
      'Avez-vous des références pour ce type de travail ?',
      'Quel est votre tarif horaire ?',
      'Je vous envoie les détails par message'
    ];

    return {
      content: messages[Math.floor(Math.random() * messages.length)],
      sender,
      timestamp: new Date().toISOString()
    };
  }

  static generateFreshTestUser(): TestUser {
    return {
      email: 'fresh-test-user@test.com',
      password: 'password123',
      firstName: 'Fresh',
      lastName: 'TestUser',
      phone: '+212600000000',
      role: 'client'
    };
  }

  // Generate a batch of test users for bulk operations
  static generateTestUsers(count: number = 5, role: 'client' | 'professional' = 'client'): TestUser[] {
    return Array.from({ length: count }, () => this.generateTestUser(role));
  }
}